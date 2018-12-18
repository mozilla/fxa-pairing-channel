/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

describe('tls', function () {

  it('tls interface', () => {
    const tls = new window.fxaTls.Exchange();

    assert.equal(tls.thing(), 1);
  });

});
