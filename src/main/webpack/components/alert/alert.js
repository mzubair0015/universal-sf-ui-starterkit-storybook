/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */

"use strict";

import Event from "../../site/js/event";

export default class Alert {
  constructor(el) {
    this.el = el;
    Event.subscribe("SHOW_ALERT", this.addAlert);
  }

  /*
   * @function addAlert
   *
   * @desc Adds an alert to the page
   *
   * @param   {object}  event  -  Standard W3C event object
   *
   */

  addAlert() {
    var example = this.el.getElementById("example");
    var template = this.el.getElementById("alert-template").innerHTML;

    example.innerHTML = template;
  }

  static init(el) {
    return new Alert(el);
  }
}
