"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _managerApi = require("@storybook/manager-api");
var _react = _interopRequireWildcard(require("react"));
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
var ADDON_ID = 'visual-test';
var PANEL_ID = "".concat(ADDON_ID, "/panel");

// Helper function to extract story name from URL
var getStoryInfo = function getStoryInfo() {
  // Get the path from the URL query parameters
  var urlParams = new URLSearchParams(window.location.search);
  var path = urlParams.get('path');
  console.log('Current path:', path);
  if (!path) {
    console.log('No path found in URL');
    return null;
  }

  // Extract story path from the full path
  var storyPath = path.replace('/story/', '');
  console.log('Story path:', storyPath);

  // Split into component and story name
  var _storyPath$split = storyPath.split('--'),
    _storyPath$split2 = _slicedToArray(_storyPath$split, 2),
    componentName = _storyPath$split2[0],
    storyName = _storyPath$split2[1];
  if (componentName && storyName) {
    console.log('Extracted component:', componentName, 'story:', storyName);
    return {
      component: componentName.split('-')[1],
      story: storyName
    };
  }
  console.log('Could not extract component and story from path:', storyPath);
  return null;
};
_managerApi.addons.register(ADDON_ID, function () {
  _managerApi.addons.add(PANEL_ID, {
    type: _managerApi.types.PANEL,
    title: 'Visual Test',
    match: function match(_ref) {
      var viewMode = _ref.viewMode;
      return viewMode === 'story';
    },
    render: function render(_ref2) {
      var active = _ref2.active;
      if (!active) {
        return null;
      }
      var VisualTestPanel = function VisualTestPanel() {
        var _useState = (0, _react.useState)('checking'),
          _useState2 = _slicedToArray(_useState, 2),
          serverStatus = _useState2[0],
          setServerStatus = _useState2[1];
        var _useState3 = (0, _react.useState)(false),
          _useState4 = _slicedToArray(_useState3, 2),
          isRunning = _useState4[0],
          setIsRunning = _useState4[1];
        var _useState5 = (0, _react.useState)(''),
          _useState6 = _slicedToArray(_useState5, 2),
          output = _useState6[0],
          setOutput = _useState6[1];
        var _useState7 = (0, _react.useState)(null),
          _useState8 = _slicedToArray(_useState7, 2),
          currentStory = _useState8[0],
          setCurrentStory = _useState8[1];
        var _useState9 = (0, _react.useState)(false),
          _useState10 = _slicedToArray(_useState9, 2),
          hasRunTest = _useState10[0],
          setHasRunTest = _useState10[1];
        var _useState11 = (0, _react.useState)(false),
          _useState12 = _slicedToArray(_useState11, 2),
          testSuccess = _useState12[0],
          setTestSuccess = _useState12[1];
        var _useState13 = (0, _react.useState)(Date.now()),
          _useState14 = _slicedToArray(_useState13, 2),
          reportTimestamp = _useState14[0],
          setReportTimestamp = _useState14[1];
        var _useState15 = (0, _react.useState)(false),
          _useState16 = _slicedToArray(_useState15, 2),
          isLogExpanded = _useState16[0],
          setIsLogExpanded = _useState16[1];
        var reportRef = _react.default.useRef(null);
        var checkServer = /*#__PURE__*/function () {
          var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var portResponse, port, healthUrl, healthResponse, healthData, errorText;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  console.log('Checking server status...');
                  // First try to get the port from the server
                  _context.next = 4;
                  return fetch('http://localhost:3001/port.txt');
                case 4:
                  portResponse = _context.sent;
                  console.log('Port response status:', portResponse.status);
                  if (portResponse.ok) {
                    _context.next = 8;
                    break;
                  }
                  throw new Error("Failed to get port: ".concat(portResponse.status));
                case 8:
                  _context.next = 10;
                  return portResponse.text();
                case 10:
                  port = _context.sent;
                  console.log('Server port:', port);

                  // Then check the server health
                  healthUrl = "http://localhost:".concat(port, "/api/health");
                  console.log('Checking health at:', healthUrl);
                  _context.next = 16;
                  return fetch(healthUrl);
                case 16:
                  healthResponse = _context.sent;
                  console.log('Health check response status:', healthResponse.status);
                  if (!healthResponse.ok) {
                    _context.next = 27;
                    break;
                  }
                  _context.next = 21;
                  return healthResponse.json();
                case 21:
                  healthData = _context.sent;
                  console.log('Health check response:', healthData);
                  setServerStatus('running');
                  console.log('Server status set to running');
                  _context.next = 33;
                  break;
                case 27:
                  _context.next = 29;
                  return healthResponse.text();
                case 29:
                  errorText = _context.sent;
                  console.error('Health check failed:', errorText);
                  setServerStatus('stopped');
                  console.log('Server status set to stopped');
                case 33:
                  _context.next = 39;
                  break;
                case 35:
                  _context.prev = 35;
                  _context.t0 = _context["catch"](0);
                  console.error('Server check error:', _context.t0);
                  setServerStatus('stopped');
                case 39:
                case "end":
                  return _context.stop();
              }
            }, _callee, null, [[0, 35]]);
          }));
          return function checkServer() {
            return _ref3.apply(this, arguments);
          };
        }();
        var handleCapture = /*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var response, data;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(isRunning || !currentStory)) {
                    _context2.next = 2;
                    break;
                  }
                  return _context2.abrupt("return");
                case 2:
                  setIsRunning(true);
                  setOutput('Running visual tests...');
                  setHasRunTest(true);
                  setTestSuccess(false); // Reset success state when starting new test
                  setIsLogExpanded(true); // Expand log when test starts
                  _context2.prev = 7;
                  _context2.next = 10;
                  return fetch('http://localhost:3001/api/run-visual-test', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      command: 'test:visual:story',
                      component: currentStory.component,
                      story: currentStory.story
                    })
                  });
                case 10:
                  response = _context2.sent;
                  _context2.next = 13;
                  return response.json();
                case 13:
                  data = _context2.sent;
                  if (response.ok) {
                    _context2.next = 16;
                    break;
                  }
                  throw new Error(data.error || 'Failed to run visual test');
                case 16:
                  // Always show the command output, whether success or failure
                  setOutput(data.output || 'Test completed');
                  setTestSuccess(data.success || false);

                  // Update the report timestamp to force reload after test completion
                  setReportTimestamp(Date.now());

                  // Scroll to report section after a short delay to ensure it's rendered
                  setTimeout(function () {
                    var _reportRef$current;
                    (_reportRef$current = reportRef.current) === null || _reportRef$current === void 0 || _reportRef$current.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }, 100);
                  _context2.next = 27;
                  break;
                case 22:
                  _context2.prev = 22;
                  _context2.t0 = _context2["catch"](7);
                  setOutput("Error: ".concat(_context2.t0.message, "\n\nCommand output:\n").concat(_context2.t0.output || 'No output available'));
                  setTestSuccess(false);
                  // Also update report timestamp on error to show any error reports
                  setReportTimestamp(Date.now());
                case 27:
                  _context2.prev = 27;
                  // Always reset isRunning state, regardless of success or failure
                  setIsRunning(false);
                  return _context2.finish(27);
                case 30:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, null, [[7, 22, 27, 30]]);
          }));
          return function handleCapture() {
            return _ref4.apply(this, arguments);
          };
        }();

        // Check server status when component mounts
        (0, _react.useEffect)(function () {
          checkServer();
          // Check server status every 5 seconds
          var interval = setInterval(checkServer, 5000);
          return function () {
            return clearInterval(interval);
          };
        }, []);

        // Update current story when URL changes
        (0, _react.useEffect)(function () {
          var handleHashChange = function handleHashChange() {
            var storyInfo = getStoryInfo();
            console.log('Story info from URL:', storyInfo);
            if (storyInfo) {
              console.log('Setting current story:', storyInfo);
              setCurrentStory(storyInfo);
            } else {
              console.log('No story info found in URL');
              setCurrentStory(null);
            }
          };
          window.addEventListener('hashchange', handleHashChange);
          handleHashChange(); // Initial check
          return function () {
            return window.removeEventListener('hashchange', handleHashChange);
          };
        }, []);

        // Log state changes
        (0, _react.useEffect)(function () {
          console.log('State updated:', {
            isRunning: isRunning,
            serverStatus: serverStatus,
            currentStory: currentStory,
            buttonDisabled: isRunning || serverStatus !== 'running' || !currentStory,
            disabledReasons: {
              isRunning: isRunning,
              serverNotRunning: serverStatus !== 'running',
              noCurrentStory: !currentStory
            }
          });
        }, [isRunning, serverStatus, currentStory]);
        return /*#__PURE__*/_react.default.createElement("div", {
          style: {
            padding: '20px'
          }
        }, /*#__PURE__*/_react.default.createElement("style", null, "\n                @keyframes spin {\n                  0% { transform: rotate(0deg); }\n                  100% { transform: rotate(360deg); }\n                }\n                .loader {\n                  display: inline-block;\n                  width: 16px;\n                  height: 16px;\n                  border: 2px solid #1ea7fd;\n                  border-top: 2px solid transparent;\n                  border-radius: 50%;\n                  animation: spin 1s linear infinite;\n                }\n                .chevron-icon {\n                  display: inline-flex;\n                  align-items: center;\n                  justify-content: center;\n                  width: 8px;\n                  height: 8px;\n                  transition: transform 0.2s ease;\n                  transform-origin: center;\n                }\n                .chevron-icon svg {\n                  width: 100%;\n                  height: 100%;\n                }\n                details[open] .chevron-icon {\n                  transform: rotate(90deg);\n                }\n                summary {\n                  display: flex;\n                  align-items: center;\n                  gap: 8px;\n                }\n              "), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            marginBottom: '10px',
            color: serverStatus === 'running' ? 'green' : 'orange'
          }
        }, "Server Status: ", serverStatus === 'running' ? 'Running' : 'Not Running'), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '10px'
          }
        }, currentStory && /*#__PURE__*/_react.default.createElement("div", {
          style: {
            fontSize: '14px'
          }
        }, "Current Story: ", currentStory.component, " / ", currentStory.story), !currentStory && /*#__PURE__*/_react.default.createElement("div", {
          style: {
            fontSize: '14px',
            color: 'orange'
          }
        }, "No story selected. Please select a story from the sidebar."), /*#__PURE__*/_react.default.createElement("button", {
          onClick: handleCapture,
          disabled: isRunning || serverStatus !== 'running' || !currentStory,
          style: {
            padding: '8px 16px',
            backgroundColor: isRunning || serverStatus !== 'running' || !currentStory ? '#ccc' : '#1ea7fd',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isRunning || serverStatus !== 'running' || !currentStory ? 'not-allowed' : 'pointer',
            marginLeft: 'auto'
          }
        }, isRunning ? 'Running...' : 'Run Test')), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            marginTop: '20px'
          }
        }, /*#__PURE__*/_react.default.createElement("details", {
          open: isRunning,
          style: {
            marginBottom: '20px'
          }
        }, /*#__PURE__*/_react.default.createElement("summary", {
          style: {
            padding: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            listStyle: 'none'
          }
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "chevron-icon"
        }, /*#__PURE__*/_react.default.createElement("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          width: "8",
          height: "8",
          fill: "none"
        }, /*#__PURE__*/_react.default.createElement("path", {
          fill: "#73828C",
          fillRule: "evenodd",
          d: "M1.896 7.146a.5.5 0 1 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 1 0-.708.708L5.043 4 1.896 7.146Z",
          clipRule: "evenodd"
        }))), "Log", isRunning && /*#__PURE__*/_react.default.createElement("span", {
          className: "loader"
        }), !isRunning && hasRunTest && /*#__PURE__*/_react.default.createElement("span", {
          style: {
            color: testSuccess ? '#4caf50' : '#f44336',
            fontSize: '18px'
          }
        }, testSuccess ? '✓' : '✕')), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            padding: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            height: '300px',
            overflowY: 'auto',
            marginTop: '10px'
          }
        }, output || 'No output yet')), hasRunTest && /*#__PURE__*/_react.default.createElement("details", {
          open: !isRunning
        }, /*#__PURE__*/_react.default.createElement("summary", {
          style: {
            padding: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            listStyle: 'none'
          }
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "chevron-icon"
        }, /*#__PURE__*/_react.default.createElement("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          width: "8",
          height: "8",
          fill: "none"
        }, /*#__PURE__*/_react.default.createElement("path", {
          fill: "#73828C",
          fillRule: "evenodd",
          d: "M1.896 7.146a.5.5 0 1 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 1 0-.708.708L5.043 4 1.896 7.146Z",
          clipRule: "evenodd"
        }))), "Report", isRunning && /*#__PURE__*/_react.default.createElement("span", {
          className: "loader"
        }), !isRunning && /*#__PURE__*/_react.default.createElement("span", {
          style: {
            color: testSuccess ? '#4caf50' : '#f44336',
            fontSize: '18px'
          }
        }, testSuccess ? '✓' : '✕')), /*#__PURE__*/_react.default.createElement("div", {
          ref: reportRef,
          style: {
            marginTop: '10px',
            height: 'calc(100vh - 400px)',
            minHeight: '400px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }
        }, !testSuccess && /*#__PURE__*/_react.default.createElement("div", {
          style: {
            padding: '20px',
            backgroundColor: '#fff3f3',
            border: '1px solid #ffcdd2',
            borderRadius: '4px',
            color: '#d32f2f',
            marginBottom: '10px'
          }
        }, "Test failed. Please check the report below for details."), /*#__PURE__*/_react.default.createElement("iframe", {
          src: "http://localhost:3001/playwright-report/index.html?t=".concat(reportTimestamp),
          style: {
            width: '100%',
            height: '100%',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: 'white',
            flex: 1
          },
          title: "Playwright Report"
        })))));
      };
      return /*#__PURE__*/_react.default.createElement(VisualTestPanel, null);
    }
  });
});

// Export the addon
var _default = exports.default = {
  title: 'Visual Test',
  id: 'visual-test',
  render: function render() {
    var container = document.createElement('div');
    container.innerHTML = "\n      <div style=\"padding: 20px;\">\n        <h2>Visual Testing Panel</h2>\n        <button id=\"capture-screenshot\">Run Test</button>\n        <div id=\"screenshot-preview\" style=\"margin-top: 20px;\"></div>\n      </div>\n    ";
    var captureButton = container.querySelector('#capture-screenshot');
    var previewDiv = container.querySelector('#screenshot-preview');
    captureButton.addEventListener('click', function () {
      // This is a placeholder for actual screenshot capture functionality
      previewDiv.innerHTML = '<p>Screenshot captured!</p>';
    });
    return container;
  }
};