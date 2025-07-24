"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _react = _interopRequireWildcard(require("react"));
var _managerApi = require("@storybook/manager-api");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var ADDON_ID = 'visual-overlay';
var OverlayIcon = function OverlayIcon() {
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isActive = _useState2[0],
    setIsActive = _useState2[1];
  var _useState3 = (0, _react.useState)(0.5),
    _useState4 = _slicedToArray(_useState3, 2),
    opacity = _useState4[0],
    setOpacity = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  var _useState7 = (0, _react.useState)({
      x: 0,
      y: 0
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    position = _useState8[0],
    setPosition = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    isDragging = _useState10[0],
    setIsDragging = _useState10[1];
  var _useState11 = (0, _react.useState)({
      x: 0,
      y: 0
    }),
    _useState12 = _slicedToArray(_useState11, 2),
    dragStart = _useState12[0],
    setDragStart = _useState12[1];
  var _useState13 = (0, _react.useState)(99999),
    _useState14 = _slicedToArray(_useState13, 2),
    zIndex = _useState14[0],
    setZIndex = _useState14[1];
  var _useState15 = (0, _react.useState)(false),
    _useState16 = _slicedToArray(_useState15, 2),
    isLoading = _useState16[0],
    setIsLoading = _useState16[1];
  var _useState17 = (0, _react.useState)(true),
    _useState18 = _slicedToArray(_useState17, 2),
    showHandle = _useState18[0],
    setShowHandle = _useState18[1];
  var _useState19 = (0, _react.useState)(function () {
      var _addonConfig$options;
      var addonConfig = _managerApi.addons.getConfig('visual-overlay');
      return (addonConfig === null || addonConfig === void 0 || (_addonConfig$options = addonConfig.options) === null || _addonConfig$options === void 0 ? void 0 : _addonConfig$options.defaultOpacity) || 0.5;
    }),
    _useState20 = _slicedToArray(_useState19, 2),
    defaultOpacity = _useState20[0],
    setDefaultOpacity = _useState20[1];

  // Get viewport configurations
  var _useState21 = (0, _react.useState)(function () {
      try {
        var viewports = require('../../../../tests/config/viewports.js');
        return viewports.VIEWPORTS;
      } catch (error) {
        console.error('Error loading viewport config:', error);
        return [{
          width: 320,
          height: 568,
          name: 'mobile'
        }, {
          width: 768,
          height: 1024,
          name: 'tablet'
        }, {
          width: 1024,
          height: 768,
          name: 'desktop'
        }, {
          width: 1440,
          height: 900,
          name: 'large'
        }];
      }
    }),
    _useState22 = _slicedToArray(_useState21, 2),
    viewportConfig = _useState22[0],
    setViewportConfig = _useState22[1];
  var getStoryInfo = (0, _react.useCallback)(function () {
    try {
      // Get the path from the URL query parameters
      var urlParams = new URLSearchParams(window.location.search);
      console.log('Full URL:', window.location.href);
      console.log('Search params:', window.location.search);
      var path = urlParams.get('path');
      console.log('Current path:', path);
      if (!path) {
        console.log('No path found in URL');
        return null;
      }

      // Extract story path from the full path
      var storyPath = path.replace('/story/', '');
      console.log('Story path after replace:', storyPath);

      // Split into component and story name
      var _storyPath$split = storyPath.split('--'),
        _storyPath$split2 = _slicedToArray(_storyPath$split, 2),
        componentPath = _storyPath$split2[0],
        storyName = _storyPath$split2[1];
      console.log('Split results - componentPath:', componentPath, 'storyName:', storyName);
      if (componentPath && storyName) {
        // Get viewport from URL params
        var viewportParam = urlParams.get('viewport') || 'desktop';
        console.log('Raw viewport param:', viewportParam);

        // If viewport is in the format "viewport:large", extract just "large"
        if (viewportParam.includes(':')) {
          viewportParam = viewportParam.split(':')[1];
        }
        console.log('Processed viewport:', viewportParam);

        // Remove prefixes from component name
        var componentName = componentPath.replace('components-', '').replace('core-components-', '').replace('pages-', '');
        console.log('Component name after removing prefixes:', componentName);
        var result = {
          component: componentName,
          story: storyName,
          viewport: viewportParam
        };
        console.log('Final extracted story info:', result);
        return result;
      }
      console.log('Could not extract component and story from path:', storyPath);
      return null;
    } catch (error) {
      console.error('Error parsing story info:', error);
      console.error('Error stack:', error.stack);
      return null;
    }
  }, []);
  var removeOverlay = (0, _react.useCallback)(function () {
    var overlayContainer = document.getElementById('visual-overlay-container');
    if (overlayContainer) {
      overlayContainer.remove();
    }
    setError(null);
    setPosition({
      x: 0,
      y: 0
    });
    setIsLoading(false);
  }, []);
  var updateOverlayOpacity = (0, _react.useCallback)(function (opacity) {
    var storyIframe = document.getElementById('storybook-preview-iframe');
    if (!storyIframe) return;
    var overlayDiv = storyIframe.contentDocument.getElementById('visual-overlay');
    if (!overlayDiv) return;

    // Update opacity
    overlayDiv.style.opacity = opacity;

    // Update slider value if it exists
    var slider = storyIframe.contentDocument.getElementById('opacity-slider');
    if (slider) {
      slider.value = opacity;
    }

    // Update opacity label if it exists
    var opacityLabel = storyIframe.contentDocument.getElementById('opacity-label');
    if (opacityLabel) {
      opacityLabel.textContent = "Opacity: ".concat(Math.round(opacity * 100), "%");
    }
  }, []);
  var updateOverlayPosition = (0, _react.useCallback)(function (x, y) {
    var storyIframe = document.getElementById('storybook-preview-iframe');
    if (storyIframe) {
      var overlayDiv = storyIframe.contentDocument.getElementById('visual-overlay');
      if (overlayDiv) {
        overlayDiv.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
        setPosition({
          x: x,
          y: y
        });
      }
    }
  }, []);
  var createKeyboardHints = function createKeyboardHints() {
    var hints = document.createElement('div');
    hints.style.cssText = "\n      position: fixed;\n      bottom: 10px;\n      right: 10px;\n      z-index: 10000;\n      pointer-events: none;\n      background: rgba(255, 255, 255, 0.9);\n      padding: 8px;\n      border-radius: 4px;\n      font-size: 12px;\n      color: #333;\n      box-shadow: 0 2px 5px rgba(0,0,0,0.1);\n    ";
    hints.innerHTML = "\n      <div style=\"margin-bottom: 4px\"><b>Keyboard Shortcuts:</b></div>\n      <div>O - Toggle overlay</div>\n      <div>+/- - Adjust opacity</div>\n      <div>\u2191/\u2193/\u2190/\u2192 - Move 1px</div>\n      <div>Shift + Arrows - Move 10px</div>\n      <div>R - Reset position</div>\n      <div>L - Toggle layer</div>\n      <div>H - Toggle handle</div>\n    ";
    return hints;
  };
  var toggleOverlay = (0, _react.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var storyInfo, storyIframe, overlayContainer, controls, overlayDiv, storybookRoot, picture, viewports, img, fallbackImageName, fallbackImagePath, grabIcon, _isDragging, dragStartX, dragStartY, controlsStartX, controlsStartY, _handleMouseMove, _handleMouseUp, iframeDoc, cleanup, existingCleanup, sliderContainer, sliderLabel, slider, sliderStyle, buttonsContainer, visibilityBtn, style, isVisible, _grabIcon, _isDragging2, _dragStartX, _dragStartY, _controlsStartX, _controlsStartY, _handleMouseMove2, _handleMouseUp2, _iframeDoc, _cleanup, _existingCleanup, _sliderContainer, _sliderLabel, _slider, _sliderStyle, _buttonsContainer, _visibilityBtn;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          storyInfo = getStoryInfo();
          console.log('Story info:', storyInfo);
          if (storyInfo) {
            _context.next = 8;
            break;
          }
          console.log('No story info available - removing overlay if active');
          if (isActive) {
            removeOverlay();
            setIsActive(false);
          }
          setError('Please navigate to a story first');
          return _context.abrupt("return");
        case 8:
          // Check if overlay already exists
          storyIframe = document.getElementById('storybook-preview-iframe');
          if (storyIframe) {
            _context.next = 12;
            break;
          }
          console.error('Story iframe not found');
          return _context.abrupt("return");
        case 12:
          // Get or create elements
          overlayContainer = storyIframe.contentDocument.getElementById('visual-overlay-container');
          controls = storyIframe.contentDocument.getElementById('visual-overlay-controls');
          overlayDiv = storyIframe.contentDocument.getElementById('visual-overlay');
          if (overlayContainer) {
            _context.next = 112;
            break;
          }
          // First time activation - create and show elements
          setIsLoading(true);
          _context.prev = 17;
          // Make storybook-root relatively positioned
          storybookRoot = storyIframe.contentDocument.getElementById('storybook-root');
          if (storybookRoot) {
            _context.next = 22;
            break;
          }
          console.error('Storybook root element not found');
          return _context.abrupt("return");
        case 22:
          storybookRoot.style.cssText = "\n            position: relative;\n            min-height: 100%;\n            width: 100%;\n            display: block;\n          ";

          // Create container
          overlayContainer = document.createElement('div');
          overlayContainer.id = 'visual-overlay-container';
          overlayContainer.className = 'visual-overlay-container';
          overlayContainer.style.cssText = "\n              position: absolute;\n              top: 0;\n              left: 0;\n              width: 100%;\n              height: 100%;\n              z-index: ".concat(zIndex, ";\n              pointer-events: none;\n            ");
          storybookRoot.appendChild(overlayContainer);

          // Create overlay
          overlayDiv = document.createElement('div');
          overlayDiv.id = 'visual-overlay';
          overlayDiv.className = 'visual-overlay';
          overlayDiv.style.cssText = "\n              position: absolute;\n              top: 0;\n              left: 0;\n              width: 100%;\n              height: 100%;\n              background-size: contain;\n            background-position: center;\n              background-repeat: no-repeat;\n            pointer-events: none;\n            opacity: ".concat(defaultOpacity, ";\n          ");

          // Create picture element with media queries
          picture = document.createElement('picture');
          picture.style.cssText = "\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: auto;\n            height: 100%;\n            pointer-events: none;\n          ";

          // Add source elements for each viewport
          viewports = viewportConfig.sort(function (a, b) {
            return b.width - a.width;
          }); // Add source elements for each viewport
          viewports.forEach(function (viewport, index) {
            var source = document.createElement('source');
            var imageName = "".concat(storyInfo.component, "-").concat(storyInfo.story, "-").concat(viewport.name, ".png");
            var imagePath = "/visual.spec.ts-snapshots/".concat(imageName);
            if (index === 0) {
              // First viewport (largest) - no min-width
              source.media = "(min-width: ".concat(viewport.width, "px)");
            } else {
              // Other viewports - min-width from previous viewport
              source.media = "(min-width: ".concat(viewport.width, "px) and (max-width: ").concat(viewports[index - 1].width - 1, "px)");
            }
            source.srcset = imagePath;
            picture.appendChild(source);
          });

          // Add fallback img element
          img = document.createElement('img');
          fallbackImageName = "".concat(storyInfo.component, "-").concat(storyInfo.story, "-mobile.png");
          fallbackImagePath = "/visual.spec.ts-snapshots/".concat(fallbackImageName);
          img.src = fallbackImagePath;
          img.style.cssText = "\n            width: 100%;\n            height: 100%;\n            object-fit: contain;\n            object-position: top;\n          ";
          picture.appendChild(img);
          overlayDiv.appendChild(picture);
          overlayContainer.appendChild(overlayDiv);

          // Create controls
          controls = document.createElement('div');
          controls.id = 'visual-overlay-controls';
          controls.className = 'visual-overlay-controls';
          controls.style.cssText = "\n              position: fixed;\n              top: 10px;\n              right: 10px;\n              z-index: ".concat(zIndex + 1, ";\n              pointer-events: auto;\n              display: flex;\n              gap: 8px;\n              align-items: center;\n              background: white;\n              padding: 8px;\n              border-radius: 4px;\n              box-shadow: 0 2px 5px rgba(0,0,0,0.1);\n              width: max-content;\n            ");
          storyIframe.contentDocument.body.appendChild(controls);

          // Add grab icon
          grabIcon = document.createElement('div');
          grabIcon.innerHTML = "\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <circle cx=\"9\" cy=\"5\" r=\"1\"></circle>\n              <circle cx=\"9\" cy=\"12\" r=\"1\"></circle>\n              <circle cx=\"9\" cy=\"19\" r=\"1\"></circle>\n              <circle cx=\"15\" cy=\"5\" r=\"1\"></circle>\n              <circle cx=\"15\" cy=\"12\" r=\"1\"></circle>\n              <circle cx=\"15\" cy=\"19\" r=\"1\"></circle>\n            </svg>\n          ";
          grabIcon.style.cssText = "\n            cursor: grab;\n            padding: 4px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            color: #666;\n          ";
          controls.insertBefore(grabIcon, controls.firstChild);

          // Add drag functionality to grab icon
          _isDragging = false;
          dragStartX = 0;
          dragStartY = 0;
          controlsStartX = 0;
          controlsStartY = 0;
          grabIcon.addEventListener('mousedown', function (e) {
            _isDragging = true;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            var rect = controls.getBoundingClientRect();
            controlsStartX = rect.left;
            controlsStartY = rect.top;
            grabIcon.style.cursor = 'grabbing';
            e.preventDefault();
            e.stopPropagation();
          });
          _handleMouseMove = function _handleMouseMove(e) {
            if (_isDragging) {
              var dx = e.clientX - dragStartX;
              var dy = e.clientY - dragStartY;
              var newLeft = controlsStartX + dx;
              var newTop = controlsStartY + dy;

              // Keep controls within viewport bounds
              var maxX = window.innerWidth - controls.offsetWidth;
              var maxY = window.innerHeight - controls.offsetHeight;
              controls.style.left = "".concat(Math.max(0, Math.min(newLeft, maxX)), "px");
              controls.style.top = "".concat(Math.max(0, Math.min(newTop, maxY)), "px");
            }
          };
          _handleMouseUp = function _handleMouseUp() {
            if (_isDragging) {
              _isDragging = false;
              grabIcon.style.cursor = 'grab';
            }
          }; // Add event listeners to iframe's document
          iframeDoc = storyIframe.contentDocument;
          iframeDoc.addEventListener('mousemove', _handleMouseMove);
          iframeDoc.addEventListener('mouseup', _handleMouseUp);
          iframeDoc.addEventListener('mouseleave', _handleMouseUp);

          // Add cleanup for drag event listeners
          cleanup = function cleanup() {
            iframeDoc.removeEventListener('mousemove', _handleMouseMove);
            iframeDoc.removeEventListener('mouseup', _handleMouseUp);
            iframeDoc.removeEventListener('mouseleave', _handleMouseUp);
          }; // Add cleanup to existing cleanup function
          existingCleanup = storyIframe.contentDocument.body.removeChild;
          storyIframe.contentDocument.body.removeChild = function (node) {
            if (node === controls) {
              cleanup();
            }
            return existingCleanup.call(this, node);
          };

          // Add opacity slider
          sliderContainer = document.createElement('div');
          sliderContainer.style.cssText = "\n            display: flex;\n            align-items: center;\n            gap: 4px;\n          ";
          sliderLabel = document.createElement('span');
          sliderLabel.textContent = 'Opacity:';
          sliderLabel.style.fontSize = '12px';
          slider = document.createElement('input');
          slider.type = 'range';
          slider.min = '0';
          slider.max = '1';
          slider.step = '0.01';
          slider.value = defaultOpacity;
          slider.style.cssText = "\n            width: 100px;\n            cursor: pointer;\n            -webkit-appearance: none;\n            background: transparent;\n            margin: 0;\n            padding: 0;\n          ";

          // Add custom slider styles
          sliderStyle = document.createElement('style');
          sliderStyle.textContent = "\n            input[type=\"range\"] {\n              -webkit-appearance: none;\n              width: 100%;\n              margin: 0;\n              padding: 0;\n            }\n            input[type=\"range\"]:focus {\n              outline: none;\n            }\n            input[type=\"range\"]::-webkit-slider-runnable-track {\n              width: 100%;\n              height: 6px;\n              cursor: pointer;\n              background: #ddd;\n              border-radius: 3px;\n            }\n            input[type=\"range\"]::-webkit-slider-thumb {\n              -webkit-appearance: none;\n              width: 16px;\n              height: 16px;\n              background: #666;\n              border-radius: 50%;\n              cursor: pointer;\n              margin-top: -5px;\n              transition: background 0.1s;\n            }\n            input[type=\"range\"]::-webkit-slider-thumb:hover {\n              background: #333;\n            }\n            input[type=\"range\"]::-webkit-slider-thumb:active {\n              background: #000;\n            }\n          ";
          storyIframe.contentDocument.head.appendChild(sliderStyle);

          // Update opacity on input
          slider.addEventListener('input', function (e) {
            e.stopPropagation(); // Prevent event bubbling
            var newOpacity = parseFloat(e.target.value);
            setOpacity(newOpacity);
            updateOverlayOpacity(newOpacity);
          });

          // Prevent toggleOverlay when interacting with slider
          slider.addEventListener('mousedown', function (e) {
            e.stopPropagation();
          });

          // Add touch event handling for mobile
          slider.addEventListener('touchstart', function (e) {
            e.stopPropagation();
          });
          sliderContainer.appendChild(sliderLabel);
          sliderContainer.appendChild(slider);

          // Add buttons container
          buttonsContainer = document.createElement('div');
          buttonsContainer.style.cssText = "\n            display: flex;\n            gap: 4px;\n            align-items: center;\n          ";

          // Add visibility toggle button
          visibilityBtn = document.createElement('button');
          visibilityBtn.innerHTML = "\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\">\n              <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z\" fill=\"currentColor\"/>\n            </svg>\n          ";
          visibilityBtn.title = 'Toggle Overlay Visibility';
          visibilityBtn.style.cssText = "\n            padding: 4px 8px;\n            border: 1px solid #ccc;\n            border-radius: 4px;\n            background: white;\n            cursor: pointer;\n            font-size: 16px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            color: #333;\n          ";
          visibilityBtn.addEventListener('click', function () {
            var isVisible = !overlayDiv.classList.contains('hidden');
            if (isVisible) {
              overlayDiv.classList.add('hidden');
              visibilityBtn.innerHTML = "\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\">\n                  <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L14.032 8.55382C13.4365 8.20193 12.7418 8 12 8C9.79086 8 8 9.79086 8 12C8 12.7418 8.20193 13.4365 8.55382 14.032L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L9.96803 15.4462C10.5635 15.7981 11.2582 16 12 16C14.2091 16 16 14.2091 16 12C16 11.2582 15.7981 10.5635 15.4462 9.96803L19.7071 5.70711ZM12.518 10.0677C12.3528 10.0236 12.1792 10 12 10C10.8954 10 10 10.8954 10 12C10 12.1792 10.0236 12.3528 10.0677 12.518L12.518 10.0677ZM11.482 13.9323L13.9323 11.482C13.9764 11.6472 14 11.8208 14 12C14 13.1046 13.1046 14 12 14C11.8208 14 11.6472 13.9764 11.482 13.9323ZM15.7651 4.8207C14.6287 4.32049 13.3675 4 12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C1.92276 13.7326 2.86706 15.0637 4.21194 16.3739L5.62626 14.9596C4.4555 13.8229 3.61144 12.6531 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C12.7719 6 13.5135 6.13385 14.2193 6.36658L15.7651 4.8207ZM12 18C11.2282 18 10.4866 17.8661 9.78083 17.6334L8.23496 19.1793C9.37136 19.6795 10.6326 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C22.0773 10.2674 21.133 8.93627 19.7881 7.62611L18.3738 9.04043C19.5446 10.1771 20.3887 11.3469 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18Z\" fill=\"currentColor\"/>\n              </svg>\n            ";
              visibilityBtn.style.color = '#666';
            } else {
              overlayDiv.classList.remove('hidden');
              visibilityBtn.innerHTML = "\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\">\n                  <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z\" fill=\"currentColor\"/>\n                </svg>\n              ";
              visibilityBtn.style.color = '#333';
            }
          });
          buttonsContainer.appendChild(visibilityBtn);
          controls.appendChild(sliderContainer);
          controls.appendChild(buttonsContainer);

          // Add CSS for visibility management
          style = document.createElement('style');
          style.textContent = "\n            .visual-overlay-container.hidden,\n            .visual-overlay-controls.hidden,\n            .visual-overlay.hidden {\n              display: none !important;\n            }\n          ";
          storyIframe.contentDocument.head.appendChild(style);
          setIsActive(true);
          setIsLoading(false);
          _context.next = 110;
          break;
        case 105:
          _context.prev = 105;
          _context.t0 = _context["catch"](17);
          console.error('Error setting up overlay:', _context.t0);
          setError('Failed to setup overlay');
          setIsLoading(false);
        case 110:
          _context.next = 114;
          break;
        case 112:
          // Subsequent clicks - toggle visibility
          isVisible = !overlayContainer.classList.contains('hidden');
          if (isVisible) {
            overlayContainer.classList.add('hidden');
            if (controls) {
              controls.remove();
            }
            setIsActive(false);
          } else {
            overlayContainer.classList.remove('hidden');
            // Recreate controls
            controls = document.createElement('div');
            controls.id = 'visual-overlay-controls';
            controls.className = 'visual-overlay-controls';
            controls.style.cssText = "\n            position: fixed;\n            top: 10px;\n            right: 10px;\n            z-index: ".concat(zIndex + 1, ";\n            pointer-events: auto;\n            display: flex;\n            gap: 8px;\n            align-items: center;\n            background: white;\n            padding: 8px;\n            border-radius: 4px;\n            box-shadow: 0 2px 5px rgba(0,0,0,0.1);\n            width: max-content;\n          ");
            storyIframe.contentDocument.body.appendChild(controls);

            // Add grab icon
            _grabIcon = document.createElement('div');
            _grabIcon.innerHTML = "\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <circle cx=\"9\" cy=\"5\" r=\"1\"></circle>\n              <circle cx=\"9\" cy=\"12\" r=\"1\"></circle>\n              <circle cx=\"9\" cy=\"19\" r=\"1\"></circle>\n              <circle cx=\"15\" cy=\"5\" r=\"1\"></circle>\n              <circle cx=\"15\" cy=\"12\" r=\"1\"></circle>\n              <circle cx=\"15\" cy=\"19\" r=\"1\"></circle>\n            </svg>\n          ";
            _grabIcon.style.cssText = "\n            cursor: grab;\n            padding: 4px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            color: #666;\n          ";
            controls.insertBefore(_grabIcon, controls.firstChild);

            // Add drag functionality to grab icon
            _isDragging2 = false;
            _dragStartX = 0;
            _dragStartY = 0;
            _controlsStartX = 0;
            _controlsStartY = 0;
            _grabIcon.addEventListener('mousedown', function (e) {
              _isDragging2 = true;
              _dragStartX = e.clientX;
              _dragStartY = e.clientY;
              var rect = controls.getBoundingClientRect();
              _controlsStartX = rect.left;
              _controlsStartY = rect.top;
              _grabIcon.style.cursor = 'grabbing';
              e.preventDefault();
              e.stopPropagation();
            });
            _handleMouseMove2 = function _handleMouseMove2(e) {
              if (_isDragging2) {
                var dx = e.clientX - _dragStartX;
                var dy = e.clientY - _dragStartY;
                var newLeft = _controlsStartX + dx;
                var newTop = _controlsStartY + dy;

                // Keep controls within viewport bounds
                var maxX = window.innerWidth - controls.offsetWidth;
                var maxY = window.innerHeight - controls.offsetHeight;
                controls.style.left = "".concat(Math.max(0, Math.min(newLeft, maxX)), "px");
                controls.style.top = "".concat(Math.max(0, Math.min(newTop, maxY)), "px");
              }
            };
            _handleMouseUp2 = function _handleMouseUp2() {
              if (_isDragging2) {
                _isDragging2 = false;
                _grabIcon.style.cursor = 'grab';
              }
            }; // Add event listeners to iframe's document
            _iframeDoc = storyIframe.contentDocument;
            _iframeDoc.addEventListener('mousemove', _handleMouseMove2);
            _iframeDoc.addEventListener('mouseup', _handleMouseUp2);
            _iframeDoc.addEventListener('mouseleave', _handleMouseUp2);

            // Add cleanup for drag event listeners
            _cleanup = function _cleanup() {
              _iframeDoc.removeEventListener('mousemove', _handleMouseMove2);
              _iframeDoc.removeEventListener('mouseup', _handleMouseUp2);
              _iframeDoc.removeEventListener('mouseleave', _handleMouseUp2);
            }; // Add cleanup to existing cleanup function
            _existingCleanup = storyIframe.contentDocument.body.removeChild;
            storyIframe.contentDocument.body.removeChild = function (node) {
              if (node === controls) {
                _cleanup();
              }
              return _existingCleanup.call(this, node);
            };

            // Add opacity slider
            _sliderContainer = document.createElement('div');
            _sliderContainer.style.cssText = "\n            display: flex;\n            align-items: center;\n            gap: 4px;\n          ";
            _sliderLabel = document.createElement('span');
            _sliderLabel.textContent = 'Opacity:';
            _sliderLabel.style.fontSize = '12px';
            _slider = document.createElement('input');
            _slider.type = 'range';
            _slider.min = '0';
            _slider.max = '1';
            _slider.step = '0.01';
            _slider.value = defaultOpacity;
            _slider.style.cssText = "\n            width: 100px;\n            cursor: pointer;\n            -webkit-appearance: none;\n            background: transparent;\n            margin: 0;\n            padding: 0;\n          ";

            // Add custom slider styles
            _sliderStyle = document.createElement('style');
            _sliderStyle.textContent = "\n            input[type=\"range\"] {\n              -webkit-appearance: none;\n              width: 100%;\n              margin: 0;\n              padding: 0;\n            }\n            input[type=\"range\"]:focus {\n              outline: none;\n            }\n            input[type=\"range\"]::-webkit-slider-runnable-track {\n              width: 100%;\n              height: 6px;\n              cursor: pointer;\n              background: #ddd;\n              border-radius: 3px;\n            }\n            input[type=\"range\"]::-webkit-slider-thumb {\n              -webkit-appearance: none;\n              width: 16px;\n              height: 16px;\n              background: #666;\n              border-radius: 50%;\n              cursor: pointer;\n              margin-top: -5px;\n              transition: background 0.1s;\n            }\n            input[type=\"range\"]::-webkit-slider-thumb:hover {\n              background: #333;\n            }\n            input[type=\"range\"]::-webkit-slider-thumb:active {\n              background: #000;\n            }\n          ";
            storyIframe.contentDocument.head.appendChild(_sliderStyle);

            // Update opacity on input
            _slider.addEventListener('input', function (e) {
              e.stopPropagation(); // Prevent event bubbling
              var newOpacity = parseFloat(e.target.value);
              setOpacity(newOpacity);
              updateOverlayOpacity(newOpacity);
            });

            // Prevent toggleOverlay when interacting with slider
            _slider.addEventListener('mousedown', function (e) {
              e.stopPropagation();
            });

            // Add touch event handling for mobile
            _slider.addEventListener('touchstart', function (e) {
              e.stopPropagation();
            });
            _sliderContainer.appendChild(_sliderLabel);
            _sliderContainer.appendChild(_slider);

            // Add buttons container
            _buttonsContainer = document.createElement('div');
            _buttonsContainer.style.cssText = "\n            display: flex;\n            gap: 4px;\n            align-items: center;\n          ";

            // Add visibility toggle button
            _visibilityBtn = document.createElement('button');
            _visibilityBtn.innerHTML = "\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\">\n              <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z\" fill=\"currentColor\"/>\n            </svg>\n          ";
            _visibilityBtn.title = 'Toggle Overlay Visibility';
            _visibilityBtn.style.cssText = "\n            padding: 4px 8px;\n            border: 1px solid #ccc;\n            border-radius: 4px;\n            background: white;\n            cursor: pointer;\n            font-size: 16px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            color: #333;\n          ";
            _visibilityBtn.addEventListener('click', function () {
              var isVisible = !overlayDiv.classList.contains('hidden');
              if (isVisible) {
                overlayDiv.classList.add('hidden');
                _visibilityBtn.innerHTML = "\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\">\n                  <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L14.032 8.55382C13.4365 8.20193 12.7418 8 12 8C9.79086 8 8 9.79086 8 12C8 12.7418 8.20193 13.4365 8.55382 14.032L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L9.96803 15.4462C10.5635 15.7981 11.2582 16 12 16C14.2091 16 16 14.2091 16 12C16 11.2582 15.7981 10.5635 15.4462 9.96803L19.7071 5.70711ZM12.518 10.0677C12.3528 10.0236 12.1792 10 12 10C10.8954 10 10 10.8954 10 12C10 12.1792 10.0236 12.3528 10.0677 12.518L12.518 10.0677ZM11.482 13.9323L13.9323 11.482C13.9764 11.6472 14 11.8208 14 12C14 13.1046 13.1046 14 12 14C11.8208 14 11.6472 13.9764 11.482 13.9323ZM15.7651 4.8207C14.6287 4.32049 13.3675 4 12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C1.92276 13.7326 2.86706 15.0637 4.21194 16.3739L5.62626 14.9596C4.4555 13.8229 3.61144 12.6531 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C12.7719 6 13.5135 6.13385 14.2193 6.36658L15.7651 4.8207ZM12 18C11.2282 18 10.4866 17.8661 9.78083 17.6334L8.23496 19.1793C9.37136 19.6795 10.6326 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C22.0773 10.2674 21.133 8.93627 19.7881 7.62611L18.3738 9.04043C19.5446 10.1771 20.3887 11.3469 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18Z\" fill=\"currentColor\"/>\n                </svg>\n              ";
                _visibilityBtn.style.color = '#666';
              } else {
                overlayDiv.classList.remove('hidden');
                _visibilityBtn.innerHTML = "\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\">\n                  <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z\" fill=\"currentColor\"/>\n                </svg>\n              ";
                _visibilityBtn.style.color = '#333';
              }
            });
            _buttonsContainer.appendChild(_visibilityBtn);
            controls.appendChild(_sliderContainer);
            controls.appendChild(_buttonsContainer);
            setIsActive(true);
          }
        case 114:
          _context.next = 121;
          break;
        case 116:
          _context.prev = 116;
          _context.t1 = _context["catch"](0);
          console.error('Error in toggleOverlay:', _context.t1);
          setError('An error occurred');
          setIsLoading(false);
        case 121:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 116], [17, 105]]);
  })), [isActive, getStoryInfo, removeOverlay]);

  // Listen for URL changes and view mode changes
  (0, _react.useEffect)(function () {
    var handleUrlChange = function handleUrlChange() {
      var storyInfo = getStoryInfo();
      console.log('Story info from URL:', storyInfo);

      // Get current view mode
      var viewMode = window.location.pathname.includes('/docs/') ? 'docs' : 'story';
      console.log('Current view mode:', viewMode);
      if (storyInfo && viewMode === 'story') {
        console.log('Setting current story:', storyInfo);
        // Hide both container and controls
        var storyIframe = document.getElementById('storybook-preview-iframe');
        if (storyIframe) {
          var overlayContainer = storyIframe.contentDocument.getElementById('visual-overlay-container');
          var _controls = storyIframe.contentDocument.getElementById('visual-overlay-controls');
          var overlayDiv = storyIframe.contentDocument.getElementById('visual-overlay');
          if (overlayContainer) {
            overlayContainer.classList.add('hidden');
          }
          if (_controls) {
            _controls.remove(); // Remove controls completely instead of just hiding
          }
        }

        // Update overlay image if needed
        if (isActive) {
          setTimeout(function () {
            toggleOverlay();
          }, 100);
        }
      } else {
        console.log('No story info found in URL or in docs view');
        // Remove overlay and controls when switching to docs or when no story info
        var _storyIframe = document.getElementById('storybook-preview-iframe');
        if (_storyIframe) {
          var _overlayContainer = _storyIframe.contentDocument.getElementById('visual-overlay-container');
          var _controls2 = _storyIframe.contentDocument.getElementById('visual-overlay-controls');
          if (_overlayContainer) {
            _overlayContainer.remove();
          }
          if (_controls2) {
            _controls2.remove();
          }
        }
        if (isActive) {
          setIsActive(false);
        }
      }
    };

    // Listen for Storybook navigation events
    var channel = _managerApi.addons.getChannel();
    var handleStoryChange = function handleStoryChange(storyId) {
      var isDocs = storyId === null || storyId === void 0 ? void 0 : storyId.endsWith('--docs');
      console.log('Story changed:', storyId, 'Is docs:', isDocs);
      if (isDocs) {
        // Remove overlay and controls when switching to docs
        var storyIframe = document.getElementById('storybook-preview-iframe');
        if (storyIframe) {
          var overlayContainer = storyIframe.contentDocument.getElementById('visual-overlay-container');
          var _controls3 = storyIframe.contentDocument.getElementById('visual-overlay-controls');
          if (overlayContainer) {
            overlayContainer.remove();
          }
          if (_controls3) {
            _controls3.remove();
          }
        }
        if (isActive) {
          setIsActive(false);
        }
      } else {
        handleUrlChange();
      }
    };

    // Listen for story rendered event
    channel.on('storyRendered', handleStoryChange);

    // Initial check
    handleUrlChange();
    return function () {
      channel.off('storyRendered', handleStoryChange);
    };
  }, [isActive, removeOverlay, toggleOverlay, getStoryInfo]);

  // Update keyboard shortcuts
  (0, _react.useEffect)(function () {
    var handleKeyPress = function handleKeyPress(e) {
      if (isActive) {
        switch (e.key) {
          case 'o':
            toggleOverlay();
            break;
          case '+':
            var newOpacityUp = Math.min(opacity + 0.1, 1);
            setOpacity(newOpacityUp);
            updateOverlayOpacity(newOpacityUp);
            break;
          case '-':
            var newOpacityDown = Math.max(opacity - 0.1, 0);
            setOpacity(newOpacityDown);
            updateOverlayOpacity(newOpacityDown);
            break;
          case 'ArrowUp':
            if (e.shiftKey) {
              updateOverlayPosition(position.x, position.y - 10);
            } else {
              updateOverlayPosition(position.x, position.y - 1);
            }
            break;
          case 'ArrowDown':
            if (e.shiftKey) {
              updateOverlayPosition(position.x, position.y + 10);
            } else {
              updateOverlayPosition(position.x, position.y + 1);
            }
            break;
          case 'ArrowLeft':
            if (e.shiftKey) {
              updateOverlayPosition(position.x - 10, position.y);
            } else {
              updateOverlayPosition(position.x - 1, position.y);
            }
            break;
          case 'ArrowRight':
            if (e.shiftKey) {
              updateOverlayPosition(position.x + 10, position.y);
            } else {
              updateOverlayPosition(position.x + 1, position.y);
            }
            break;
          case 'r':
            updateOverlayPosition(0, 0);
            break;
          case 'l':
            var newZIndex = zIndex === 99999 ? -1 : 99999;
            setZIndex(newZIndex);
            var storyIframe = document.getElementById('storybook-preview-iframe');
            if (storyIframe) {
              var overlayContainer = storyIframe.contentDocument.getElementById('visual-overlay-container');
              var _controls4 = storyIframe.contentDocument.getElementById('visual-overlay-controls');
              if (overlayContainer) {
                overlayContainer.style.zIndex = newZIndex;
              }
              if (_controls4) {
                _controls4.style.zIndex = newZIndex === -1 ? -1 : newZIndex + 1;
              }
            }
            break;
          case 'h':
            setShowHandle(!showHandle);
            var handle = document.querySelector('#visual-overlay-handle');
            if (handle) {
              handle.style.display = showHandle ? 'none' : 'flex';
            }
            break;
        }
      } else if (e.key === 'o') {
        toggleOverlay();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return function () {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isActive, opacity, position, zIndex, showHandle, toggleOverlay, updateOverlayOpacity, updateOverlayPosition]);
  (0, _react.useEffect)(function () {
    // Cleanup function to remove event listeners and overlay
    return function () {
      var storyIframe = document.getElementById('storybook-preview-iframe');
      if (storyIframe) {
        storyIframe.contentDocument.removeEventListener('keydown', handleKeyDown);
        storyIframe.contentDocument.removeEventListener('mousemove', handleMouseMove);
        storyIframe.contentDocument.removeEventListener('mouseup', handleMouseUp);
      }
      removeOverlay();
      setIsActive(false);
      setError(null);
      setPosition({
        x: 0,
        y: 0
      });
      setIsLoading(false);
    };
  }, [removeOverlay, handleKeyDown, handleMouseMove, handleMouseUp]);

  // Add event handler functions
  var handleKeyDown = (0, _react.useCallback)(function (e) {
    if (isActive) {
      switch (e.key) {
        case 'o':
          toggleOverlay();
          break;
        case '+':
          var newOpacityUp = Math.min(opacity + 0.1, 1);
          setOpacity(newOpacityUp);
          updateOverlayOpacity(newOpacityUp);
          break;
        case '-':
          var newOpacityDown = Math.max(opacity - 0.1, 0);
          setOpacity(newOpacityDown);
          updateOverlayOpacity(newOpacityDown);
          break;
        case 'ArrowUp':
          if (e.shiftKey) {
            updateOverlayPosition(position.x, position.y - 10);
          } else {
            updateOverlayPosition(position.x, position.y - 1);
          }
          break;
        case 'ArrowDown':
          if (e.shiftKey) {
            updateOverlayPosition(position.x, position.y + 10);
          } else {
            updateOverlayPosition(position.x, position.y + 1);
          }
          break;
        case 'ArrowLeft':
          if (e.shiftKey) {
            updateOverlayPosition(position.x - 10, position.y);
          } else {
            updateOverlayPosition(position.x - 1, position.y);
          }
          break;
        case 'ArrowRight':
          if (e.shiftKey) {
            updateOverlayPosition(position.x + 10, position.y);
          } else {
            updateOverlayPosition(position.x + 1, position.y);
          }
          break;
        case 'r':
          updateOverlayPosition(0, 0);
          break;
        case 'l':
          var newZIndex = zIndex === 99999 ? -1 : 99999;
          setZIndex(newZIndex);
          var storyIframe = document.getElementById('storybook-preview-iframe');
          if (storyIframe) {
            var overlayContainer = storyIframe.contentDocument.getElementById('visual-overlay-container');
            var _controls5 = storyIframe.contentDocument.getElementById('visual-overlay-controls');
            if (overlayContainer) {
              overlayContainer.style.zIndex = newZIndex;
            }
            if (_controls5) {
              _controls5.style.zIndex = newZIndex === -1 ? -1 : newZIndex + 1;
            }
          }
          break;
        case 'h':
          setShowHandle(!showHandle);
          break;
      }
    }
  }, [isActive, opacity, position, zIndex, showHandle, toggleOverlay, updateOverlayOpacity, updateOverlayPosition]);
  var handleMouseDown = (0, _react.useCallback)(function (e) {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }, [position]);
  var handleMouseMove = (0, _react.useCallback)(function (e) {
    if (isDragging) {
      var x = e.clientX - dragStart.x;
      var y = e.clientY - dragStart.y;
      updateOverlayPosition(x, y);
    }
  }, [isDragging, dragStart, updateOverlayPosition]);
  var handleMouseUp = (0, _react.useCallback)(function () {
    setIsDragging(false);
  }, []);

  // Helper function to create overlay
  function createOverlay() {
    var overlayDiv = document.createElement('div');
    overlayDiv.id = 'visual-overlay';
    overlayDiv.style.cssText = "\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      opacity: ".concat(opacity, ";\n      transform: translate(").concat(position.x, "px, ").concat(position.y, "px);\n      pointer-events: auto;\n      mix-blend-mode: difference;\n      background-color: transparent;\n      cursor: move;\n      z-index: ").concat(zIndex, ";\n    ");

    // Add drag functionality
    overlayDiv.addEventListener('mousedown', handleMouseDown);
    return overlayDiv;
  }
  return /*#__PURE__*/_react.default.createElement("button", {
    id: "visual-overlay-toggle-button",
    onClick: toggleOverlay,
    style: {
      margin: '0',
      padding: '8px',
      border: 'none',
      backgroundColor: isActive ? 'rgba(255, 165, 0, 0.07)' : 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      transition: 'background-color 150ms ease-out, color 150ms ease-out',
      color: error ? '#FF4785' : isLoading ? '#FFA500' : isActive ? '#FFA500' : 'inherit'
    },
    onMouseEnter: function onMouseEnter(e) {
      if (!isActive && !isLoading) {
        e.currentTarget.style.backgroundColor = 'rgba(30, 167, 253, 0.07)';
        e.currentTarget.style.color = '#1EA7FD';
      }
    },
    onMouseLeave: function onMouseLeave(e) {
      if (!isActive && !isLoading) {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = error ? '#FF4785' : 'inherit';
      }
    },
    title: error || (isLoading ? 'Loading overlay...' : 'Visual Overlay (Press "o" to toggle)'),
    disabled: isLoading
  }, /*#__PURE__*/_react.default.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 202.83 202.83",
    style: {
      color: 'inherit',
      animation: isLoading ? 'spin 1s linear infinite' : 'none'
    }
  }, /*#__PURE__*/_react.default.createElement("style", null, "\n            @keyframes spin {\n              from { transform: rotate(0deg); }\n              to { transform: rotate(360deg); }\n            }\n          "), /*#__PURE__*/_react.default.createElement("path", {
    d: "M198.933 66.346h-62.345V4.001c0-2.152-1.743-3.897-3.897-3.897H4.105C1.951.105.208 1.85.208 4.001v37.958a3.9 3.9 0 000 2.502v88.126c0 2.152 1.743 3.897 3.897 3.897H66.45v62.345c0 2.152 1.743 3.897 3.897 3.897h128.586c2.154 0 3.897-1.745 3.897-3.897V70.243c-.001-2.152-1.744-3.897-3.897-3.897zm-70.138-17.2l-17.2 17.2h-35.74l52.939-52.938v35.738zm-6.18 17.2l6.18-6.18v6.18h-6.18zm6.18 7.793v54.552H74.243V74.139h54.552zM8.002 7.898h25.66L8.002 33.56V7.898zm0 36.682L43.927 8.653c.223-.223.344-.497.502-.755h32.096L8.002 76.42V44.58zm58.448 84.111h-6.18l6.18-6.18v6.18zm0-17.199l-17.2 17.2H13.51l52.94-52.939v35.739zM8.002 123.179V87.18c.265-.16.547-.286.776-.516L86.762 8.68c.231-.231.358-.515.519-.782h36.003L8.002 123.179zm187.034 71.753H74.243v-58.448h58.448c2.154 0 3.897-1.745 3.897-3.897V74.139h58.448v120.793z",
    fill: "currentColor"
  })));
};

// Register the addon
_managerApi.addons.register(ADDON_ID, function () {
  console.log('Visual Overlay Addon registered');

  // Add a toolbar item
  _managerApi.addons.add('visual-overlay/button', {
    type: _managerApi.types.TOOL,
    title: 'Visual Overlay',
    match: function match(_ref2) {
      var viewMode = _ref2.viewMode;
      return viewMode === 'story';
    },
    render: function render() {
      return /*#__PURE__*/_react.default.createElement(OverlayIcon, null);
    }
  });
});