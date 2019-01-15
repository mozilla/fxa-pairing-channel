
from binascii import hexlify
import threading
import queue

from tlslite.api import *
from tlslite.constants import CipherSuite, HashAlgorithm, SignatureAlgorithm, \
    GroupName, SignatureScheme
from tlslite import __version__
from tlslite.utils.compat import b2a_hex, a2b_hex, time_stamp
from tlslite.utils.dns_utils import is_valid_hostname
from tlslite.utils.cryptomath import getRandomBytes

settings = HandshakeSettings()
settings.cipherNames = ['aes128gcm']
settings.pskConfigs = [(b'testkey', b'aabbccddeeff', 'sha256')]
settings.psk_modes = ['psk_ke']
settings.useEncryptThenMAC = False
settings.useExtendedMasterSecret = False
settings.use_heartbeat_extension = False
settings.minVersion = (3, 4)
settings.maxVersion = (3, 4)

# Mock out os.urandom so we can generate stable test vectors.
MOCKED_URANDOM_CALLS = [
    # Components of ClientHello
    b'00000000000000000000000000000001', # Client sessionid
    b'00000000000000000000000000000002', # Client ECDH key generation
    b'00000000000000000000000000000003',
    b'01010101010101010101010101010101', # Client random
    # Components of ServerHello
    b'02020202020202020202020202020202', # Server random
]
MOCKED_URANDOM_CALLS.reverse() # so we can cheaply pop() items in order.
def mock_urandom(size):
    print(size)
    mocked_value = MOCKED_URANDOM_CALLS.pop()
    assert size == len(mocked_value), 'unexpected call to os.urandom({})'.format(size)
    return mocked_value

import os
orig_urandom = os.urandom
os.urandom = mock_urandom

class Mocket:

    def __init__(self, name, send_queue, recv_queue):
        self.name = name
        self._send_queue = send_queue
        self._recv_queue = recv_queue
        self._buffer = b''
        self._closed = False

    def close(self):
        self._send_queue.put(None)

    def send(self, bytes):
        print("SEND", self.name, hexlify(bytes))
        self._send_queue.put(bytes)
        return len(bytes)

    def sendall(self, bytes):
        self.send(bytes)

    def recv(self, bufsize):
        if self._closed:
            return b''
        while len(self._buffer) < bufsize:
            bytes = self._recv_queue.get(timeout=5)
            if bytes is None:
                self._closed = True
                break
            self._buffer += bytes
        bytes = self._buffer[:bufsize]
        self._buffer = self._buffer[len(bytes):]
        return bytes


def mocketpair(name1='client', name2='server'):
    a2b = queue.Queue()
    b2a = queue.Queue()
    return (Mocket(name1, a2b, b2a), Mocket(name2, b2a, a2b))


c, s = mocketpair()
client = TLSConnection(c)
server = TLSConnection(s)


def run_client():
    client.handshakeClientCert(settings=settings)
    client.send(b'hello world')
    client.close()


def run_server():
    server.handshakeServer(settings=settings)
    assert server.recv(1024) == b'hello world'


tc = threading.Thread(target=run_client)
ts = threading.Thread(target=run_server)
tc.start()
ts.start()
tc.join()
ts.join()
