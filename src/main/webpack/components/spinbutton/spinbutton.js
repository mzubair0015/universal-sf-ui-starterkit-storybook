/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   datepicker-spinbuttons.js
 */

"use strict";

/* global SpinButtonDate */
export default class DatePickerSpinButtons {
  constructor(domNode) {
    this.domNode = domNode;
    this.monthNode = domNode.querySelector(".spinbutton.month");
    this.dayNode = domNode.querySelector(".spinbutton.day");
    this.yearNode = domNode.querySelector(".spinbutton.year");
    this.dateNode = domNode.querySelector(".date");

    this.valuesWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    this.valuesDay = [
      "",
      "first",
      "second",
      "third",
      "fourth",
      "fifth",
      "sixth",
      "seventh",
      "eighth",
      "ninth",
      "tenth",
      "eleventh",
      "twelfth",
      "thirteenth",
      "fourteenth",
      "fifteenth",
      "sixteenth",
      "seventeenth",
      "eighteenth",
      "nineteenth",
      "twentieth",
      "twenty first",
      "twenty second",
      "twenty third",
      "twenty fourth",
      "twenty fifth",
      "twenty sixth",
      "twenty seventh",
      "twenty eighth",
      "twenty ninth",
      "thirtieth",
      "thirty first",
    ];
    this.valuesMonth = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    this.spinbuttonDay = new SpinButtonDate(
      this.dayNode,
      null,
      this.updateDay.bind(this)
    );
    this.spinbuttonDay.init();

    this.spinbuttonMonth = new SpinButtonDate(
      this.monthNode,
      this.valuesMonth,
      this.updateMonth.bind(this)
    );
    this.spinbuttonMonth.init();

    this.spinbuttonYear = new SpinButtonDate(
      this.yearNode,
      null,
      this.updateYear.bind(this)
    );
    this.spinbuttonYear.init();
    this.spinbuttonYear.noWrap();

    this.minYear = this.spinbuttonYear.getValueMin();
    this.maxYear = this.spinbuttonYear.getValueMax();

    this.currentDate = new Date();

    this.day = this.currentDate.getDate();
    this.month = this.currentDate.getMonth();
    this.year = this.currentDate.getFullYear();
    this.daysInMonth = this.getDaysInMonth(this.year, this.month);

    this.spinbuttonDay.setValue(this.day, false);
    this.spinbuttonMonth.setValue(this.month, false);
    this.spinbuttonYear.setValue(this.year, false);

    this.updateSpinButtons();
  }

  static init(el) {
    return new DatePickerSpinButtons(el);
  }
}

DatePickerSpinButtons.prototype.getDaysInMonth = function (year, month) {
  return new Date(year, month + 1, 0).getDate();
};

DatePickerSpinButtons.prototype.updateDay = function (day) {
  this.day = day;
  this.updateSpinButtons();
};

DatePickerSpinButtons.prototype.updateMonth = function (month) {
  this.month = month;
  this.updateSpinButtons();
};

DatePickerSpinButtons.prototype.updateYear = function (year) {
  this.year = year;
  this.updateSpinButtons();
};

DatePickerSpinButtons.prototype.updatePreviousDayMonthAndYear = function () {
  this.previousYear = this.year - 1;

  this.previousMonth = this.month ? this.month - 1 : 11;

  this.previousDay = this.day - 1;
  if (this.previousDay < 1) {
    this.previousDay = this.getDaysInMonth(this.year, this.month);
  }
};

DatePickerSpinButtons.prototype.updateNextDayMonthAndYear = function () {
  this.nextYear = this.year + 1;
  this.nextMonth = this.month >= 11 ? 0 : this.month + 1;

  this.nextDay = this.day + 1;
  var maxDay = this.getDaysInMonth(this.year, this.month);
  if (this.nextDay > maxDay) {
    this.nextDay = 1;
  }
};

DatePickerSpinButtons.prototype.updateSpinButtons = function () {
  this.daysInMonth = this.getDaysInMonth(this.year, this.month);
  this.spinbuttonDay.setValueMax(this.daysInMonth);
  if (this.day > this.daysInMonth) {
    this.spinbuttonDay.setValue(this.daysInMonth);
    return;
  }

  this.updatePreviousDayMonthAndYear();
  this.updateNextDayMonthAndYear();

  this.spinbuttonDay.setValueText(this.valuesDay[this.day]);

  this.spinbuttonDay.setPreviousValue(this.previousDay);
  this.spinbuttonMonth.setPreviousValue(this.previousMonth);
  this.spinbuttonYear.setPreviousValue(this.previousYear);

  this.spinbuttonDay.setNextValue(this.nextDay);
  this.spinbuttonMonth.setNextValue(this.nextMonth);
  this.spinbuttonYear.setNextValue(this.nextYear);

  this.currentDate = new Date(
    this.year + "-" + (this.month + 1) + "-" + this.day
  );

  this.dateNode.innerHTML =
    "current value is " +
    this.valuesWeek[this.currentDate.getDay()] +
    ", " +
    this.spinbuttonMonth.getValueText() +
    " " +
    this.spinbuttonDay.getValueText() +
    ", " +
    this.spinbuttonYear.getValue();
};

/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   spinbutton-date.js
 */

class SpinButtonDate {
  constructor(domNode, values, callback) {
    this.domNode = domNode;
    this.values = values;
    this.callback = callback;
    this.wrap = true;

    var initialValue = domNode.getAttribute("aria-valuetext");

    this.spinbuttonNode = domNode.querySelector('[role="spinbutton"]');

    this.previousValueNode = domNode.querySelector(".previous");
    this.nextValueNode = domNode.querySelector(".next");

    this.increaseNode = domNode.querySelector(".increase");
    this.decreaseNode = domNode.querySelector(".decrease");

    if (values) {
      this.valueMin = 0;
      this.valueMax = values.length - 1;
      if (initialValue) {
        this.valueNow = values.indexOf(initialValue);
        this.valueText = initialValue;
      } else {
        this.valueNow = values.length / 2;
        this.valueText = values[this.valueNow];
      }
    } else {
      this.valueMin = parseInt(
        this.spinbuttonNode.getAttribute("aria-valuemin")
      );
      this.valueMax = parseInt(
        this.spinbuttonNode.getAttribute("aria-valuemax")
      );
      this.valueNow = parseInt(
        this.spinbuttonNode.getAttribute("aria-valuenow")
      );
      this.valueText = this.spinbuttonNode.getAttribute("aria-valuenow");
    }

    this.keyCode = Object.freeze({
      UP: 38,
      DOWN: 40,
      PAGEUP: 33,
      PAGEDOWN: 34,
      END: 35,
      HOME: 36,
    });
  }
}

// Initialize slider
SpinButtonDate.prototype.init = function () {
  this.spinbuttonNode.addEventListener(
    "keydown",
    this.handleKeyDown.bind(this)
  );
  this.spinbuttonNode.addEventListener("focus", this.handleFocus.bind(this));
  this.spinbuttonNode.addEventListener("blur", this.handleBlur.bind(this));

  this.increaseNode.addEventListener(
    "click",
    this.handleIncreaseClick.bind(this)
  );
  this.decreaseNode.addEventListener(
    "click",
    this.handleDecreaseClick.bind(this)
  );
};

SpinButtonDate.prototype.noWrap = function () {
  this.wrap = false;
};

SpinButtonDate.prototype.getValue = function () {
  return this.valueNow;
};

SpinButtonDate.prototype.getValueText = function () {
  return this.valueText;
};

SpinButtonDate.prototype.setValue = function (value, flag) {
  if (typeof flag !== "boolean") {
    flag = true;
  }

  if (value > this.valueMax) {
    if (this.wrap) {
      value = this.valueMin;
    } else {
      value = this.valueMax;
    }
  }

  if (value < this.valueMin) {
    if (this.wrap) {
      value = this.valueMax;
    } else {
      value = this.valueMin;
    }
  }

  this.valueNow = value;
  if (this.values) {
    this.valueText = this.values[this.valueNow];
  } else {
    if (typeof value === "number") {
      this.valueText = parseInt(value);
    }
  }

  this.spinbuttonNode.setAttribute("aria-valuenow", this.valueNow);

  if (this.values) {
    this.spinbuttonNode.setAttribute("aria-valuetext", this.valueText);
  }

  this.spinbuttonNode.innerHTML = this.valueText;

  if ((flag, this.callback)) {
    this.callback(this.valueNow);
  }
};

SpinButtonDate.prototype.setValueText = function (value) {
  this.valueText = value;
  this.spinbuttonNode.setAttribute("aria-valuetext", value);
};

SpinButtonDate.prototype.getValueMin = function () {
  return parseInt(this.spinbuttonNode.getAttribute("aria-valuemin"));
};

SpinButtonDate.prototype.getValueMax = function () {
  return parseInt(this.spinbuttonNode.getAttribute("aria-valuemax"));
};

SpinButtonDate.prototype.setValueMax = function (value) {
  this.spinbuttonNode.setAttribute("aria-valuemax", value);
  this.valueMax = value;
};

SpinButtonDate.prototype.setPreviousValue = function (value) {
  if (this.values) {
    value = this.values[value];
  }

  if (typeof value === "number") {
    if (value < this.valueMin) {
      value = "&nbsp;";
    } else {
      value = parseInt(value);
    }
  }

  this.previousValueNode.innerHTML = value;
};

SpinButtonDate.prototype.setNextValue = function (value) {
  if (this.values) {
    value = this.values[value];
  }

  if (typeof value === "number") {
    if (value > this.valueMax) {
      value = "&nbsp;";
    } else {
      value = parseInt(value);
    }
  }

  this.nextValueNode.innerHTML = value;
};

SpinButtonDate.prototype.handleKeyDown = function (event) {
  var flag = false;

  switch (event.keyCode) {
    case this.keyCode.DOWN:
      this.setValue(this.valueNow - 1);
      flag = true;
      break;

    case this.keyCode.UP:
      this.setValue(this.valueNow + 1);
      flag = true;
      break;

    case this.keyCode.PAGEDOWN:
      this.setValue(this.valueNow - 5);
      flag = true;
      break;

    case this.keyCode.PAGEUP:
      this.setValue(this.valueNow + 5);
      flag = true;
      break;

    case this.keyCode.HOME:
      this.setValue(this.valueMin);
      flag = true;
      break;

    case this.keyCode.END:
      this.setValue(this.valueMax);
      flag = true;
      break;

    default:
      break;
  }

  if (flag) {
    event.preventDefault();
    event.stopPropagation();
  }
};

SpinButtonDate.prototype.handleFocus = function () {
  this.domNode.classList.add("focus");
};

SpinButtonDate.prototype.handleBlur = function () {
  this.domNode.classList.remove("focus");
};

SpinButtonDate.prototype.handleIncreaseClick = function (event) {
  this.setValue(this.valueNow + 1);

  event.preventDefault();
  event.stopPropagation();
};

SpinButtonDate.prototype.handleDecreaseClick = function (event) {
  this.setValue(this.valueNow - 1);

  event.preventDefault();
  event.stopPropagation();
};
