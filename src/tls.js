/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */


class Exchange {
  /**
   * @constructor
   */
  constructor() {
    this.state = null;
  }

  thing() {
    console.log('2');
    return 1;
  }

}

module.exports = {
  Exchange: Exchange,
};
