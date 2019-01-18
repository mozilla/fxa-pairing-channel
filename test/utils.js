/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

describe('bytesAreEqual', () => {
  it('returns true for a variety of equal byte arrays', () => {
    assert.ok(bytesAreEqual(zeros(0), zeros(0)));
    assert.ok(bytesAreEqual(zeros(7), zeros(7)));
    assert.ok(bytesAreEqual(arrayToBytes([1,2,3]), arrayToBytes([1,2,3])));
  });

  it('returns false for a variety of non-equal byte arrays', () => {
    assert.ok(! bytesAreEqual(zeros(0), zeros(1)));
    assert.ok(! bytesAreEqual(zeros(1), zeros(0)));
    assert.ok(! bytesAreEqual(arrayToBytes([1, 2, 3]), arrayToBytes([2, 2, 3])));
    assert.ok(! bytesAreEqual(arrayToBytes([1, 2, 3]), arrayToBytes([1, 1, 3])));
    assert.ok(! bytesAreEqual(arrayToBytes([1, 2, 3]), arrayToBytes([1, 2, 4])));
    assert.ok(! bytesAreEqual(arrayToBytes([1, 2, 3]), arrayToBytes([1, 2, 3, 4])));
    assert.ok(! bytesAreEqual(arrayToBytes([1, 2, 3, 4]), arrayToBytes([1, 2, 3])));
  });

  it('throws on a variety of bad inputs', () => {
    assert.throws(() => bytesAreEqual(0, 0));
    assert.throws(() => bytesAreEqual(null, 0));
    assert.throws(() => bytesAreEqual({ some: 'object' }, { another: 'object'}));
  });
});

describe('the BufferReader class', () => {

  it('handles basic reading and seeking correctly', () => {
    const buf = new BufferReader(utf8ToBytes('hello world'));
    assert.equal(buf.length(), 11);
    assert.equal(buf.tell(), 0);
    assert.equal(bytesToUtf8(buf.readBytes(5)), 'hello');
    assert.ok(buf.hasMoreBytes());
    assert.equal(buf.tell(), 5);
    buf.incr(2);
    assert.equal(buf.tell(), 7);
    assert.ok(buf.hasMoreBytes());
    assert.equal(bytesToUtf8(buf.readBytes(4)), 'orld');
    assert.ok(! buf.hasMoreBytes());
    buf.seek(2);
    assert.equal(buf.tell(), 2);
    assert.equal(bytesToUtf8(buf.readBytes(5)), 'llo w');
  });

  it('errors if attempting to seek beyond the start of the buffer', () => {
    const buf = new BufferReader(utf8ToBytes('hello world'));
    assert.throws(() => {
      buf.seek(-1);
    }, TLSError, 'DECODE_ERROR');
    assert.equal(buf.tell(), 0);
  });

  it('errors if attempting to seek beyond the end of the buffer', () => {
    const buf = new BufferReader(utf8ToBytes('hello world'));
    assert.throws(() => {
      buf.seek(12);
    }, TLSError, 'DECODE_ERROR');
    assert.equal(buf.tell(), 0);
  });

  it('errors if attempting to read beyond the end of the buffer', () => {
    const buf = new BufferReader(utf8ToBytes('hello world'));
    buf.seek(2);
    assert.throws(() => {
      buf.readBytes(12);
    }, TLSError, 'DECODE_ERROR');
    assert.equal(buf.tell(), 2);
  });

  it('correctly reads integer primitives at various offsets', () => {
    const buf = new BufferReader(arrayToBytes([132, 42, 17, 4, 0]));
    assert.equal(buf.readUint8(), 132);
    assert.equal(buf.tell(), 1);
    assert.equal(buf.readUint8(), 42);
    assert.equal(buf.tell(), 2);
    assert.equal(buf.readUint8(), 17);
    assert.equal(buf.tell(), 3);
    assert.equal(buf.readUint8(), 4);
    assert.equal(buf.tell(), 4);
    assert.equal(buf.readUint8(), 0);
    assert.equal(buf.tell(), 5);

    buf.seek(0);
    buf.seek(0);
    assert.equal(buf.readUint16(), 33834);
    assert.equal(buf.tell(), 2);
    buf.incr(-1);
    assert.equal(buf.readUint16(), 10769);
    assert.equal(buf.tell(), 3);
    assert.equal(buf.readUint16(), 1024);
    assert.equal(buf.tell(), 5);

    buf.seek(0);
    assert.equal(buf.readUint24(), 8661521);
    assert.equal(buf.tell(), 3);
    buf.seek(1);
    assert.equal(buf.readUint24(), 2756868);
    assert.equal(buf.tell(), 4);

    buf.seek(0);
    assert.equal(buf.readUint32(), 2217349380);
    assert.equal(buf.tell(), 4);
    buf.seek(1);
    assert.equal(buf.readUint32(), 705758208);
    assert.equal(buf.tell(), 5);
  });

  it('errors if reading integer primitives past the end of the buffer', () => {
    const buf = new BufferReader(arrayToBytes([132, 42, 17, 4, 1]));
    buf.seek(5);
    assert.throws(() => {
      buf.readUint8();
    }, TLSError, 'DECODE_ERROR');
    buf.seek(5);
    assert.throws(() => {
      buf.readUint16();
    }, TLSError, 'DECODE_ERROR');
    buf.seek(5);
    assert.throws(() => {
      buf.readUint24();
    }, TLSError, 'DECODE_ERROR');
    buf.seek(5);
    assert.throws(() => {
      buf.readUint32();
    }, TLSError, 'DECODE_ERROR');

    buf.seek(4);
    assert.ok(buf.readUint8());
    buf.seek(4);
    assert.throws(() => {
      buf.readUint16();
    }, TLSError, 'DECODE_ERROR');
    buf.seek(4);
    assert.throws(() => {
      buf.readUint24();
    }, TLSError, 'DECODE_ERROR');
    buf.seek(4);
    assert.throws(() => {
      buf.readUint32();
    }, TLSError, 'DECODE_ERROR');

    buf.seek(3);
    assert.ok(buf.readUint8());
    buf.seek(3);
    assert.ok(buf.readUint16());
    buf.seek(3);
    assert.throws(() => {
      buf.readUint24();
    }, TLSError, 'DECODE_ERROR');
    buf.seek(3);
    assert.throws(() => {
      buf.readUint32();
    }, TLSError, 'DECODE_ERROR');

    buf.seek(2);
    assert.ok(buf.readUint8());
    buf.seek(2);
    assert.ok(buf.readUint16());
    buf.seek(2);
    assert.ok(buf.readUint24());
    buf.seek(2);
    assert.throws(() => {
      buf.readUint32();
    }, TLSError, 'DECODE_ERROR');
  });

  it('correctly reads variable-length vectors of bytes', () => {
    let buf = new BufferReader(arrayToBytes([4, 1, 2, 3, 4, 5]));
    assert.ok(bytesAreEqual(buf.readVectorBytes8(), arrayToBytes([1, 2, 3, 4])));
    assert.equal(buf.tell(), 5);
    buf = new BufferReader(arrayToBytes([0, 0, 0]));
    assert.ok(bytesAreEqual(buf.readVectorBytes8(), arrayToBytes([])));
    assert.equal(buf.tell(), 1);

    buf = new BufferReader(arrayToBytes([0, 4, 1, 2, 3, 4, 5]));
    assert.ok(bytesAreEqual(buf.readVectorBytes16(), arrayToBytes([1, 2, 3, 4])));
    assert.equal(buf.tell(), 6);

    buf = new BufferReader(arrayToBytes([0, 0, 4, 1, 2, 3, 4, 5]));
    assert.ok(bytesAreEqual(buf.readVectorBytes24(), arrayToBytes([1, 2, 3, 4])));
    assert.equal(buf.tell(), 7);
  });

  it('correctly reads variable-length vectors using a callback', () => {
    let readValues = [];
    // We ignore the leading `42` in order to test reading at an offset.
    let buf = new BufferReader(arrayToBytes([42, 4, 1, 2, 3, 4, 5]));
    buf.seek(1);
    buf.readVector8((contentsBuf, n) => {
      assert.equal(contentsBuf.length(), 4);
      assert.equal(n, readValues.length);
      readValues.push(contentsBuf.readUint8());
    });
    assert.deepEqual(readValues, [1, 2, 3, 4]);
    assert.equal(buf.tell(), 6);

    readValues = [];
    buf = new BufferReader(arrayToBytes([42, 0, 4, 1, 2, 3, 4, 5]));
    buf.seek(1);
    buf.readVector16((contentsBuf, n) => {
      assert.equal(contentsBuf.length(), 4);
      assert.equal(n, readValues.length);
      readValues.push(contentsBuf.readUint16());
    });
    assert.deepEqual(readValues, [(1 << 8) | 2, (3 << 8) | 4]);
    assert.equal(buf.tell(), 7);

    readValues = [];
    buf = new BufferReader(arrayToBytes([42, 0, 0, 4, 1, 2, 3, 4, 5]));
    buf.seek(1);
    buf.readVector24((contentsBuf, n) => {
      assert.equal(contentsBuf.length(), 4);
      assert.equal(n, readValues.length);
      readValues.push(contentsBuf.readUint8());
    });
    assert.deepEqual(readValues, [1, 2, 3, 4]);
    assert.equal(buf.tell(), 8);
  });

  it('errors if a vector read consumes too many bytes', () => {
    const buf = new BufferReader(arrayToBytes([2, 1, 2, 3]));
    assert.throws(() => {
      buf.readVector8(contentsBuf => {
        assert.equal(contentsBuf.length(), 2);
        contentsBuf.readUint24();
      });
    }, TLSError, 'DECODE_ERROR');
  });

  it('errors if a vector read somehow consumes too few bytes', () => {
    const buf = new BufferReader(arrayToBytes([3, 1, 2, 3]));
    assert.throws(() => {
      buf.readVector8(contentsBuf => {
        assert.equal(contentsBuf.length(), 3);
        assert.equal(contentsBuf.readUint8(), 1);
        assert.equal(contentsBuf.readUint8(), 2);
        assert.equal(contentsBuf.readUint8(), 3);
        // simulate some bug that changes the underlying buffer.
        buf.incr(-1);
      });
    }, TLSError, 'DECODE_ERROR');
  });

  it('errors if a vector read consumes no bytes', () => {
    const buf = new BufferReader(arrayToBytes([3, 1, 2, 3]));
    assert.throws(() => {
      buf.readVector8(contentsBuf => {
        assert.equal(contentsBuf.length(), 3);
        // don't consume anything, risking an infinite loop of callback invocations.
      });
    }, TLSError, 'DECODE_ERROR');
  });

  it('errors if a nested vector read would exceed the outer buffer length', () => {
    // A vector of length 5, inside a vector of length 3.
    const buf = new BufferReader(arrayToBytes([3, 5, 1, 2, 3, 4, 5]));
    assert.throws(() => {
      buf.readVector8(contentsBuf => {
        assert.equal(contentsBuf.length(), 3);
        contentsBuf.readVector8(() => {
          assert.fail('the callback should not get called');
        });
      });
    }, TLSError, 'DECODE_ERROR');
  });
});

describe('the BufferWriter class', () => {
  it('grows appropriately as data is written', () => {
    const buf = new BufferWriter(2);
    buf.writeBytes(arrayToBytes([1,2,3,4,5]));
    assert.equal(buf.tell(), 5);
    assert.equal(buf.length(), 6);
  });

  it('can read back written data using `slice`', () => {
    const buf = new BufferWriter(2);
    buf.writeBytes(arrayToBytes([1, 2, 3, 4, 5]));
    assert.equal(buf.tell(), 5);
    assert.ok(bytesAreEqual(buf.slice(), arrayToBytes([1, 2, 3, 4, 5])));
    assert.equal(buf.tell(), 5);
    assert.ok(bytesAreEqual(buf.slice(1), arrayToBytes([2, 3, 4, 5])));
    assert.equal(buf.tell(), 5);
    assert.ok(bytesAreEqual(buf.slice(1, 3), arrayToBytes([2, 3])));
    assert.equal(buf.tell(), 5);
    assert.ok(bytesAreEqual(buf.slice(1, -1), arrayToBytes([2, 3, 4])));
    assert.equal(buf.tell(), 5);
  });

  it('refuses to slice past the start of the buffer', () => {
    const buf = new BufferWriter(2);
    buf.writeBytes(arrayToBytes([1, 2, 3, 4, 5]));
    assert.throws(() => {
      buf.slice(-1);
    }, TLSError, 'INTERNAL_ERROR');
    assert.throws(() => {
      buf.slice(0, -50);
    }, TLSError, 'INTERNAL_ERROR');
  });

  it('refuses to slice past the end of the buffer', () => {
    const buf = new BufferWriter(2);
    buf.writeBytes(arrayToBytes([1, 2, 3, 4, 5]));
    assert.throws(() => {
      buf.slice(2, 50);
    }, TLSError, 'INTERNAL_ERROR');
  });

  it('returns and resets the buffer on flush', () => {
    const buf = new BufferWriter();
    buf.writeBytes(arrayToBytes([1, 2, 3, 4, 5]));
    assert.ok(bytesAreEqual(buf.flush(), arrayToBytes([1, 2, 3, 4, 5])));
    assert.equal(buf.tell(), 0);
    assert.ok(bytesAreEqual(buf.slice(), arrayToBytes([])));
  });

  it('truncates at the current position on flush', () => {
    const buf = new BufferWriter();
    buf.writeBytes(arrayToBytes([1, 2, 3, 4, 5]));
    buf.incr(-2);
    assert.ok(bytesAreEqual(buf.flush(), arrayToBytes([1, 2, 3])));
    assert.equal(buf.tell(), 0);
  });

  it('correctly writes integer primitives at various offsets', () => {
    const buf = new BufferWriter();
    for (let i = 0; i < 10; i++) {
      buf.writeUint8(i);
    }
    assert.equal(buf.tell(), 10);
    assert.ok(bytesAreEqual(buf.flush(), arrayToBytes([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    ])));

    for (let i = 0; i < 9; i++) {
      buf.writeUint16(i);
    }
    buf.writeUint16(3079);
    assert.equal(buf.tell(), 20);
    assert.ok(bytesAreEqual(buf.flush(), arrayToBytes([
      0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 0, 8, 12, 7
    ])));

    for (let i = 0; i < 5; i++) {
      buf.writeUint24(i);
    }
    buf.writeUint24(788229);
    assert.equal(buf.tell(), 18);
    assert.ok(bytesAreEqual(buf.flush(), arrayToBytes([
      0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4, 12, 7, 5
    ])));

    for (let i = 0; i < 5; i++) {
      buf.writeUint32(i);
    }
    buf.writeUint32(201786627);
    assert.equal(buf.tell(), 24);
    assert.ok(bytesAreEqual(buf.flush(), arrayToBytes([
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 12, 7, 5, 3
    ])));

    buf.writeUint8(1);
    buf.writeUint16(2);
    buf.writeUint24(3);
    buf.writeUint8(4);
    buf.writeUint32(5);
    assert.ok(bytesAreEqual(buf.flush(), arrayToBytes([
      1, 0, 2, 0, 0, 3, 4, 0, 0, 0, 5
    ])));
  });

  it('correctly writes variable-length vectors of bytes', () => {
    let buf = new BufferWriter();
    buf.writeVectorBytes8(arrayToBytes([1, 2, 3, 4, 5]));
    assert.ok(bytesAreEqual(buf.flush(), arrayToBytes([5, 1, 2, 3, 4, 5])));

    buf = new BufferWriter();
    buf.writeVectorBytes16(arrayToBytes([1, 2, 3, 4, 5]));
    assert.ok(bytesAreEqual(buf.flush(), arrayToBytes([0, 5, 1, 2, 3, 4, 5])));

    buf = new BufferWriter();
    buf.writeVectorBytes24(arrayToBytes([1, 2, 3, 4, 5]));
    assert.ok(bytesAreEqual(buf.flush(), arrayToBytes([0, 0, 5, 1, 2, 3, 4, 5])));
  });

  it('correctly writes variable-length vectors using a callback', () => {
    let buf = new BufferWriter();
    buf.writeVector8(buf => {
      buf.writeUint8(1);
      buf.writeUint8(2);
      buf.writeUint8(3);
      buf.writeUint8(4);
      buf.writeUint8(5);
    });
    assert.ok(bytesAreEqual(buf.flush(), arrayToBytes([5, 1, 2, 3, 4, 5])));

    buf = new BufferWriter();
    buf.writeVector16(buf => {
      buf.writeUint8(1);
      buf.writeUint8(2);
      buf.writeUint8(3);
      buf.writeUint8(4);
      buf.writeUint8(5);
    });
    assert.ok(bytesAreEqual(buf.flush(), arrayToBytes([0, 5, 1, 2, 3, 4, 5])));

    buf = new BufferWriter();
    buf.writeVector24(buf => {
      buf.writeUint8(1);
      buf.writeUint8(2);
      buf.writeUint8(3);
      buf.writeUint8(4);
      buf.writeUint8(5);
    });
    assert.ok(bytesAreEqual(buf.flush(), arrayToBytes([0, 0, 5, 1, 2, 3, 4, 5])));
  });

  it('correctly writes nested variable-length vectors using nested callback', () => {
    const buf = new BufferWriter();
    buf.writeVector16(buf => {
      buf.writeVector8(buf => {
        buf.writeUint8(1);
        buf.writeUint8(2);
        buf.writeUint8(3);
        buf.writeUint8(4);
        buf.writeUint8(5);
      });
    });
    assert.ok(bytesAreEqual(buf.flush(), arrayToBytes([0, 6, 5, 1, 2, 3, 4, 5])));
  });

  it('errors if a vector write exceeds the maximum size representable in its length field', () => {
    let buf = new BufferWriter();
    buf.writeVectorBytes8(zeros(255));
    assert.throws(() => {
      buf.writeVectorBytes8(zeros(256));
    }, TLSError, 'INTERNAL_ERROR');

    buf = new BufferWriter();
    buf.writeVectorBytes16(zeros(65535));
    assert.throws(() => {
      buf.writeVectorBytes16(zeros(65536));
    }, TLSError, 'INTERNAL_ERROR');

    buf = new BufferWriter();
    buf.writeVectorBytes24(zeros(16777215));
    assert.throws(() => {
      buf.writeVectorBytes16(zeros(16777216));
    }, TLSError, 'INTERNAL_ERROR');

    buf = new BufferWriter();
    assert.throws(() => {
      buf.writeVector8(buf => {
        buf.writeBytes(zeros(256));
      });
    }, TLSError, 'INTERNAL_ERROR');

    buf = new BufferWriter();
    assert.throws(() => {
      buf.writeVector16(buf => {
        buf.writeBytes(zeros(65536));
      });
    }, TLSError, 'INTERNAL_ERROR');

    buf = new BufferWriter();
    assert.throws(() => {
      buf.writeVector24(buf => {
        buf.writeBytes(zeros(16777216));
      });
    }, TLSError, 'INTERNAL_ERROR');
  });
});
