/**
 * Header class
 */

export default class Header {
  constructor(el) {
    this.el = el;

  }


  static init(el) {
    return new Header(el);
  }
}
