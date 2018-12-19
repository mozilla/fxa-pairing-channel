/*!
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * 
 * Bundle generated from https://github.com/mozilla/fxa-pairing-channel.git. Hash:1b01a6c3e196077e4f02, Chunkhash:b45ecf6247beb2e73376.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("fxaPairingTLS", [], factory);
	else if(typeof exports === 'object')
		exports["fxaPairingTLS"] = factory();
	else
		root["fxaPairingTLS"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(9);

var assertThisInitialized = __webpack_require__(10);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(12);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(4);

var superPropBase = __webpack_require__(11);

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(13);

var iterableToArrayLimit = __webpack_require__(14);

var nonIterableRest = __webpack_require__(15);

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(4);

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(17);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(5);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(4);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/get.js
var get = __webpack_require__(7);
var get_default = /*#__PURE__*/__webpack_require__.n(get);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(6);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(8);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(0);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(1);
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(2);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(3);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// CONCATENATED MODULE: ./src/utils.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
 //
// Various low-level utility functions.
//
// These are mostly conveniences for working with Uint8Arrays as
// the primitive "bytes" type.
//






function noop() {}
function assert(cond, msg) {
  if (!cond) {
    throw new Error('assert failed: ' + msg);
  }
}
function assertIsBytes(value) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value must be a Uint8Array';
  assert(value instanceof Uint8Array, msg);
  return value;
}
function bytesToHex(bytes) {
  return Array.prototype.map.call(bytes, function (byte) {
    var s = byte.toString(16);

    if (s.length === 1) {
      s = '0' + s;
    }

    return s;
  }).join('');
}
function hexToBytes(hexstr) {
  assert(hexstr.length % 2 === 0, 'hexstr.length must be even');
  return new Uint8Array(Array.prototype.map.call(hexstr, function (c, n) {
    if (n % 2 === 1) {
      return hexstr[n - 1] + c;
    } else {
      return '';
    }
  }).filter(function (s) {
    return !!s;
  }).map(function (s) {
    return parseInt(s, 16);
  }));
}
function bytesToUtf8(bytes) {
  var decoder = new TextDecoder('utf-8');
  return decoder.decode(bytes);
}
function utf8ToBytes(str) {
  var encoder = new TextEncoder('utf-8');
  return encoder.encode(str);
}
function bytesAreEqual(v1, v2) {
  if (v1.length !== v2.length) {
    return false;
  }

  for (var i = 0; i < v1.length; i++) {
    if (v1[i] !== v2[i]) {
      return false;
    }
  }

  return true;
} // The `BufferReader` and `BufferWriter` classes are helpers for dealing with the
// binary struct format that's used for various TLS message.  Think of them as a
// buffer with a pointer to the "current position" and a bunch of helper methods
// to read/write structured data and advance said pointer.

var utils_BufferWithPointer =
/*#__PURE__*/
function () {
  function BufferWithPointer(buf) {
    classCallCheck_default()(this, BufferWithPointer);

    assertIsBytes(buf);
    this._buffer = buf;
    this._dataview = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    this._pos = 0;
  }

  createClass_default()(BufferWithPointer, [{
    key: "length",
    value: function length() {
      return this._buffer.byteLength;
    }
  }, {
    key: "tell",
    value: function tell() {
      return this._pos;
    }
  }, {
    key: "seek",
    value: function seek(pos) {
      this._pos = pos;
      assert(this._pos <= this.length(), 'do not seek past end of buffer');
    }
  }, {
    key: "incr",
    value: function incr(offset) {
      this.seek(this._pos + offset);
    }
  }, {
    key: "slice",
    value: function slice(offset, length) {
      var start = this._buffer.byteOffset + this._pos + offset;

      if (typeof length === 'undefined') {
        length = this.length() - this._pos;
      } else {
        assert(this._pos + length <= this.length(), 'do not slice past end of buffer');
      }

      return new Uint8Array(this._buffer.buffer, start, length);
    }
  }]);

  return BufferWithPointer;
}();

var utils_BufferReader =
/*#__PURE__*/
function (_BufferWithPointer) {
  inherits_default()(BufferReader, _BufferWithPointer);

  function BufferReader() {
    classCallCheck_default()(this, BufferReader);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(BufferReader).apply(this, arguments));
  }

  createClass_default()(BufferReader, [{
    key: "hasMoreBytes",
    value: function hasMoreBytes() {
      return this.tell() < this.length();
    }
  }, {
    key: "readBytes",
    value: function readBytes(length) {
      var slice = this.slice(0, length);
      this.incr(length);
      return slice;
    }
  }, {
    key: "readUint8",
    value: function readUint8() {
      var n = this._dataview.getUint8(this._pos);

      this.incr(1);
      return n;
    }
  }, {
    key: "readUint16",
    value: function readUint16() {
      var n = this._dataview.getUint16(this._pos);

      this.incr(2);
      return n;
    }
  }, {
    key: "readUint24",
    value: function readUint24() {
      var n = this._dataview.getUint16(this._pos);

      n = (n << 16) + this._dataview.getUint8(this._pos + 2);
      this.incr(3);
      return n;
    }
  }, {
    key: "readUint32",
    value: function readUint32() {
      var n = this._dataview.getUint32(this._pos);

      this.incr(4);
      return n;
    } //
    // These are helpers for reading the variable-length vector structure
    // defined in https://tools.ietf.org/html/rfc8446#section-3.4.
    //
    // Such vectors are represented as a length followed by the concatenated
    // bytes of each item, and the size of the length field is determined by
    // the maximum allowed size of the vector.  The size of the length field
    // is determined by the maximum number of bytes in the vecctor.  For example
    // to read a vector that may contain up to 65535 bytes, use `readVector16`.
    //
    // To read a variable-length vector of between 1 and 100 uint16 values,
    // defined in the RFC like this:
    //
    //    uint16 items<2..200>;
    //
    // You would do something like this:
    //
    //    const items = []
    //    buf.readVector8(buf => {
    //      items.push(buf.readUint16())
    //    })
    //

  }, {
    key: "_readVector",
    value: function _readVector(length, cb) {
      var limit = this.tell() + length; // Keep calling the callback until we've consumed the expected number of bytes.
      // It can return `true` to indicate we should stop iterating and skip the remainder.

      var n = 0;

      do {
        if (cb(this, length, n)) {
          break;
        }

        n += 1;
      } while (this.tell() < limit);

      if (this.tell() < limit) {
        this.seek(limit);
      } else {
        assert(this.tell() === limit, 'read past end of vector');
      }
    }
  }, {
    key: "readVector8",
    value: function readVector8(cb) {
      var length = this.readUint8();
      return this._readVector(length, cb);
    }
  }, {
    key: "readVector16",
    value: function readVector16(cb) {
      var length = this.readUint16();
      return this._readVector(length, cb);
    }
  }, {
    key: "readVector24",
    value: function readVector24(cb) {
      var length = this.readUint24();
      return this._readVector(length, cb);
    }
  }, {
    key: "readVector32",
    value: function readVector32(cb) {
      var length = this.readUint32();
      return this._readVector(length, cb);
    } // If you want to read a single length-prefixed struct rather than
    // a variable number of items, use these variants which will error out
    // if you fail to consume all the data on first read.

  }, {
    key: "readWithLengthPrefix24",
    value: function readWithLengthPrefix24(cb) {
      var called = false;
      this.readVector24(function () {
        assert(!called, 'failed to read entire length-prefixed data');
        called = true;
        cb.apply(void 0, arguments);
      });
    } // If you just want to get the bytes from a variable-length vector
    // then you can use these shortcuts.

  }, {
    key: "readVectorBytes8",
    value: function readVectorBytes8() {
      var bytes;
      this.readVector8(function (buf, length) {
        bytes = buf.readBytes(length);
      });
      return bytes;
    }
  }, {
    key: "readVectorBytes16",
    value: function readVectorBytes16() {
      var bytes;
      this.readVector16(function (buf, length) {
        bytes = buf.readBytes(length);
      });
      return bytes;
    }
  }, {
    key: "readVectorBytes24",
    value: function readVectorBytes24() {
      var bytes;
      this.readVector24(function (buf, length) {
        bytes = buf.readBytes(length);
      });
      return bytes;
    }
  }, {
    key: "readVectorBytes32",
    value: function readVectorBytes32() {
      var bytes;
      this.readVector32(function (buf, length) {
        bytes = buf.readBytes(length);
      });
      return bytes;
    }
  }]);

  return BufferReader;
}(utils_BufferWithPointer);
var utils_BufferWriter =
/*#__PURE__*/
function (_BufferWithPointer2) {
  inherits_default()(BufferWriter, _BufferWithPointer2);

  function BufferWriter(size) {
    classCallCheck_default()(this, BufferWriter);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(BufferWriter).call(this, new Uint8Array(size)));
  }

  createClass_default()(BufferWriter, [{
    key: "writeBytes",
    value: function writeBytes(data) {
      assertIsBytes(data);

      this._buffer.set(data, this.tell());

      this.incr(data.byteLength);
    }
  }, {
    key: "writeUint8",
    value: function writeUint8(n) {
      this._dataview.setUint8(this._pos, n);

      this.incr(1);
    }
  }, {
    key: "writeUint16",
    value: function writeUint16(n) {
      this._dataview.setUint16(this._pos, n);

      this.incr(2);
    }
  }, {
    key: "writeUint24",
    value: function writeUint24(n) {
      this._dataview.setUint16(this._pos, n >> 8);

      this._dataview.setUint8(this._pos + 2, n & 0xFF);

      this.incr(3);
    }
  }, {
    key: "writeUint32",
    value: function writeUint32(n) {
      this._dataview.setUint32(this._pos, n);

      this.incr(4);
    } // These are helpers for writing the variable-length vector structure
    // defined in https://tools.ietf.org/html/rfc8446#section-3.4.
    //
    // Such vectors are represented as a length followed by the concatenated
    // bytes of each item, and the size of the length field is determined by
    // the maximum allowed size of the vector.  For example to write a vector
    // that may contain up to 65535 bytes, use `writeVector16`.
    //
    // To write a variable-length vector of between 1 and 100 uint16 values,
    // defined in the RFC like this:
    //
    //    uint16 items<2..200>;
    //
    // You would do something like this:
    //
    //    buf.writeVector8(buf => {
    //      for (let item of items) {
    //          buf.writeUint16(item)
    //      }
    //    })
    //
    // The helper will automatically take care of writing the appropriate
    // length field once the callback completes.

  }, {
    key: "_writeVector",
    value: function _writeVector(maxLength, writeLength, cb) {
      // Initially, write the length field as zero.
      var lengthPos = this.tell();
      writeLength(0); // Call the callback to write the vector items.

      var bodyPos = this.tell();
      cb(this);
      var length = this.tell() - bodyPos;
      assert(length <= maxLength, 'wrote too many bytes for vector'); // Backfill the actual length field.

      this.seek(lengthPos);
      writeLength(length);
      this.incr(length);
      return length;
    }
  }, {
    key: "writeVector8",
    value: function writeVector8(cb) {
      return this._writeVector(Math.pow(2, 8), this.writeUint8.bind(this), cb);
    }
  }, {
    key: "writeVector16",
    value: function writeVector16(cb) {
      return this._writeVector(Math.pow(2, 16), this.writeUint16.bind(this), cb);
    }
  }, {
    key: "writeVector24",
    value: function writeVector24(cb) {
      return this._writeVector(Math.pow(2, 24), this.writeUint24.bind(this), cb);
    }
  }, {
    key: "writeVector32",
    value: function writeVector32(cb) {
      return this._writeVector(Math.pow(2, 32), this.writeUint32.bind(this), cb);
    }
  }, {
    key: "writeVectorBytes8",
    value: function writeVectorBytes8(bytes) {
      return this.writeVector8(function (buf) {
        buf.writeBytes(bytes);
      });
    }
  }, {
    key: "writeVectorBytes16",
    value: function writeVectorBytes16(bytes) {
      return this.writeVector16(function (buf) {
        buf.writeBytes(bytes);
      });
    }
  }, {
    key: "writeVectorBytes24",
    value: function writeVectorBytes24(bytes) {
      return this.writeVector24(function (buf) {
        buf.writeBytes(bytes);
      });
    }
  }, {
    key: "writeVectorBytes32",
    value: function writeVectorBytes32(bytes) {
      return this.writeVector32(function (buf) {
        buf.writeBytes(bytes);
      });
    }
  }]);

  return BufferWriter;
}(utils_BufferWithPointer);
// CONCATENATED MODULE: ./src/crypto.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
 //
// Low-level crypto primitives.
//
// We haven't actually implemented any of the crypto yet,
// but when we do, this is the file where we'll define the basics.
//




var AEAD_SIZE_INFLATION = 4;
var HASH_LENGTH = 32; // Fake crypto for now, just to try out the message layer.

function AEADEncrypt(_x, _x2, _x3, _x4, _x5) {
  return _AEADEncrypt.apply(this, arguments);
}

function _AEADEncrypt() {
  _AEADEncrypt = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee(key, iv, seqNum, plaintext, additionalData) {
    var ciphertext;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ciphertext = new Uint8Array(plaintext.byteLength + 4);
            ciphertext[0] = seqNum >> 24;
            ciphertext[1] = seqNum >> 16;
            ciphertext[2] = seqNum >> 8;
            ciphertext[3] = seqNum;
            ciphertext.set(plaintext, 4);
            return _context.abrupt("return", ciphertext);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _AEADEncrypt.apply(this, arguments);
}

function AEADDecrypt(_x6, _x7, _x8, _x9, _x10) {
  return _AEADDecrypt.apply(this, arguments);
}

function _AEADDecrypt() {
  _AEADDecrypt = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee2(key, iv, seqNum, ciphertext, additionalData) {
    var foundSeqNum, plaintext;
    return regenerator_default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            foundSeqNum = ciphertext[0];
            foundSeqNum = foundSeqNum << 8 | ciphertext[1];
            foundSeqNum = foundSeqNum << 8 | ciphertext[2];
            foundSeqNum = foundSeqNum << 8 | ciphertext[3];
            assert(foundSeqNum === seqNum, 'sequence number mismatch');
            plaintext = new Uint8Array(ciphertext.buffer, ciphertext.byteOffset + 4, ciphertext.byteLength - 4);
            return _context2.abrupt("return", plaintext);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _AEADDecrypt.apply(this, arguments);
}

function getRandomBytes(_x11) {
  return _getRandomBytes.apply(this, arguments);
}

function _getRandomBytes() {
  _getRandomBytes = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee3(size) {
    var bytes;
    return regenerator_default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            bytes = new Uint8Array(size);
            crypto.getRandomValues(bytes);
            return _context3.abrupt("return", bytes);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _getRandomBytes.apply(this, arguments);
}
// CONCATENATED MODULE: ./src/messages.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
 //
// Message parsing.
//
// Herein we need code for reading and writing the various Handshake
// messages involved in the protocol.
//








/* eslint-disable sorting/sort-object-props */

var HANDSHAKE_TYPE = {
  CLIENT_HELLO: 1,
  SERVER_HELLO: 2,
  FINISHED: 20
};
var EXTENSION_TYPE = {
  PRE_SHARED_KEY: 41,
  SUPPORTED_VERSIONS: 43,
  PSK_KEY_EXCHANGE_MODES: 45
};
/* eslint-enable sorting/sort-object-props */

var VERSION_TLS_1_2 = 0x0303;
var VERSION_TLS_1_3 = 0x0304;
var TLS_AES_128_GCM_SHA256 = 0x1301;
var PSK_MODE_KE = 0;
function readHandshakeMessage(buf) {
  // Each handshake messages has a type and length prefix, per
  // https://tools.ietf.org/html/rfc8446#appendix-B.3
  var type = buf.readUint8();
  var expectedEnd = buf.readUint24() + buf.tell();
  var msg;

  switch (type) {
    case HANDSHAKE_TYPE.CLIENT_HELLO:
      msg = messages_ClientHello._read(buf);
      break;

    case HANDSHAKE_TYPE.SERVER_HELLO:
      msg = messages_ServerHello._read(buf);
      break;

    case HANDSHAKE_TYPE.FINISHED:
      msg = messages_Finished._read(buf);
      break;

    default:
      assert(false, 'unexpected handshake message type');
  }

  assert(buf.tell() === expectedEnd, 'failed to consume entire message');
  return msg;
}
var messages_HandshakeMessage =
/*#__PURE__*/
function () {
  function HandshakeMessage() {
    classCallCheck_default()(this, HandshakeMessage);
  }

  createClass_default()(HandshakeMessage, [{
    key: "write",
    value: function write(buf) {
      var _this = this;

      // Each handshake messages has a type and length prefix, per
      // https://tools.ietf.org/html/rfc8446#appendix-B.3
      buf.writeUint8(this.TYPE_TAG);
      buf.writeVector24(function (buf) {
        _this._write(buf);
      });
    } // A little helper for writing extension fields, which are formatted as:
    //
    //   struct {
    //     ExtensionType extension_type;
    //     opaque extension_data<0..2^16-1>;
    //   } Extension;

  }, {
    key: "_writeExtension",
    value: function _writeExtension(buf, type, cb) {
      buf.writeUint16(type);
      buf.writeVector16(cb);
    }
  }]);

  return HandshakeMessage;
}(); // The ClientHello message:
//
// struct {
//   ProtocolVersion legacy_version = 0x0303;
//   Random random;
//   opaque legacy_session_id<0..32>;
//   CipherSuite cipher_suites<2..2^16-2>;
//   opaque legacy_compression_methods<1..2^8-1>;
//   Extension extensions<8..2^16-1>;
// } ClientHello;
//
// This requires few fancy parts for writing the PSK binder
// which we haven't quite figured out yet...

var messages_ClientHello =
/*#__PURE__*/
function (_HandshakeMessage) {
  inherits_default()(ClientHello, _HandshakeMessage);

  function ClientHello(random, pskIds, pskBinders) {
    var _this2;

    classCallCheck_default()(this, ClientHello);

    _this2 = possibleConstructorReturn_default()(this, getPrototypeOf_default()(ClientHello).call(this));
    _this2.random = random;
    _this2.pskIds = pskIds;
    _this2.pskBinders = pskBinders;
    assert(random.byteLength === 32, 'random must be 32 bytes');
    assert(pskIds.length === pskBinders.length, 'incorrect number of psk binders');
    return _this2;
  }

  createClass_default()(ClientHello, [{
    key: "_write",
    value: function _write(buf) {
      var _this3 = this;

      buf.writeUint16(VERSION_TLS_1_2);
      buf.writeBytes(this.random); // Empty vector for legacy_session_id

      buf.writeVectorBytes8(new Uint8Array(0)); // Our single supported ciphersuite

      buf.writeVector16(function (buf) {
        buf.writeUint16(TLS_AES_128_GCM_SHA256);
      }); // A single zero byte for legacy_compression_methods

      buf.writeVectorBytes8(new Uint8Array(1)); // Vector of extensions

      buf.writeVector16(function (buf) {
        // The required "supported_versions" extension, listing only TLS1.3
        _this3._writeExtension(buf, EXTENSION_TYPE.SUPPORTED_VERSIONS, function (buf) {
          buf.writeVector8(function (buf) {
            buf.writeUint16(VERSION_TLS_1_3);
          });
        }); // Our single supported PSK mode.


        _this3._writeExtension(buf, EXTENSION_TYPE.PSK_KEY_EXCHANGE_MODES, function (buf) {
          buf.writeVector8(function (buf) {
            buf.writeUint8(PSK_MODE_KE);
          });
        }); // The offered PSKs.


        _this3._writeExtension(buf, EXTENSION_TYPE.PRE_SHARED_KEY, function (buf) {
          // A vector with the offered PSK ids.
          buf.writeVector16(function (buf) {
            _this3.pskIds.forEach(function (pskId) {
              buf.writeVectorBytes16(pskId);
              buf.writeUint32(0); // Zero for "tag age" field.
            });
          }); // A vector with the corresponding PSK binders.
          // We can't actually know them yet, but we can write space for them...

          buf.writeVector16(function (buf) {
            _this3.pskBinders.forEach(function (pskBinder) {
              buf.writeVectorBytes8(pskBinder);
            });
          });
        });
      });
    }
  }, {
    key: "TYPE_TAG",
    get: function get() {
      return HANDSHAKE_TYPE.CLIENT_HELLO;
    }
  }], [{
    key: "_read",
    value: function _read(buf) {
      // Fixed value for legacy_version.
      assert(buf.readUint16() === VERSION_TLS_1_2, 'unexpected legacy_version'); // The random bytes provided by the peer.

      var random = buf.readBytes(32); // Skip over legacy_session_id.

      buf.readVectorBytes8(); // We only support a single ciphersuite, but the peer may offer several.
      // Scan the list to confirm that the one we want is present.

      var found = false;
      buf.readVector16(function (buf) {
        var cipherSuite = buf.readUint16();

        if (cipherSuite === TLS_AES_128_GCM_SHA256) {
          found = true;
          return true;
        }
      });
      assert(found, 'peer did not offer correct ciphersuite'); // Skip over legacy_compression_methods.

      buf.readVectorBytes8(); // The only extensions we're interested in are "supported versions", "PSK" and "PSK mode",
      // but we may have to skip over arbitrarily many other extensions to find them.
      // THe PSK extension is always the last one.

      var pskIds = [],
          pskBinders = [];
      buf.readVector16(function (buf) {
        // Each extension is formatted as:
        //   struct {
        //     ExtensionType extension_type;
        //     opaque extension_data<0..2^16-1>;
        //   } Extension;
        var extType = buf.readUint16(); // XXX TODO: error out if duplicate extension received?

        buf.readVector16(function (buf) {
          found = false;

          switch (extType) {
            case EXTENSION_TYPE.SUPPORTED_VERSIONS:
              // https://tools.ietf.org/html/rfc8446#section-4.2.1
              // It's a vector of uint16 and we expect to find TLS1.3.
              buf.readVector8(function (buf) {
                if (buf.readUint16() === VERSION_TLS_1_3) {
                  found = true;
                  return true;
                }
              });
              assert(found, 'client claims not to support TLS1.3');
              break;

            case EXTENSION_TYPE.PSK_KEY_EXCHANGE_MODES:
              // https://tools.ietf.org/html/rfc8446#section-4.2.9
              // We only accept "psk_ke", for PSK-only key establishment.
              buf.readVector8(function (buf) {
                if (buf.readUint8() === PSK_MODE_KE) {
                  found = true;
                  return true;
                }
              });
              assert(found, 'client claims not to support PSK_MODE_KE');
              break;

            case EXTENSION_TYPE.PRE_SHARED_KEY:
              // https://tools.ietf.org/html/rfc8446#section-4.2.11
              // The extension data contains an `OfferredPsks` struct:
              //  struct {
              //    opaque identity<1..2^16-1>;
              //    uint32 obfuscated_ticket_age;
              //  } PskIdentity;
              //  opaque PskBinderEntry<32..255>;
              //  struct {
              //    PskIdentity identities<7..2^16-1>;
              //    PskBinderEntry binders<33..2^16-1>;
              //  } OfferedPsks;
              buf.readVector16(function (buf, _, n) {
                var identity = buf.readVectorBytes16();
                buf.readBytes(4); // Skip over the ticket age.

                pskIds.push(identity);
              });
              buf.readVector16(function (buf, _, n) {
                var binder = buf.readVectorBytes8();
                assert(binder.byteLength >= 32, 'psk binder too short');
                pskBinders.push(binder);
              }); // PRE_SHARED_KEY must be the last extension in the ClientHello
              // (because any data after this point is not included in the PSK binder transcript hash).

              assert(!buf.hasMoreBytes(), 'trailing data after PRE_SHARED_KEY extension');
              break;

            default:
              // Ignore all other extensions
              // XXX TODO: are there any that should cause us to error out?
              return true;
          }
        });
      });
      return new this(random, pskIds, pskBinders);
    }
  }]);

  return ClientHello;
}(messages_HandshakeMessage); // The ServerHello message:
//
//  struct {
//      ProtocolVersion legacy_version = 0x0303;    /* TLS v1.2 */
//      Random random;
//      opaque legacy_session_id_echo<0..32>;
//      CipherSuite cipher_suite;
//      uint8 legacy_compression_method = 0;
//      Extension extensions < 6..2 ^ 16 - 1 >;
//  } ServerHello;

var messages_ServerHello =
/*#__PURE__*/
function (_HandshakeMessage2) {
  inherits_default()(ServerHello, _HandshakeMessage2);

  function ServerHello(random, pskIndex) {
    var _this4;

    classCallCheck_default()(this, ServerHello);

    _this4 = possibleConstructorReturn_default()(this, getPrototypeOf_default()(ServerHello).call(this));
    _this4.random = random;
    _this4.pskIndex = pskIndex;
    assert(random.byteLength === 32, 'random must be 32 bytes');
    return _this4;
  }

  createClass_default()(ServerHello, [{
    key: "_write",
    value: function _write(buf) {
      var _this5 = this;

      buf.writeUint16(VERSION_TLS_1_2);
      buf.writeBytes(this.random); // Empty vector for legacy_session_id

      buf.writeVectorBytes8(new Uint8Array(0)); // Our single supported ciphersuite

      buf.writeUint16(TLS_AES_128_GCM_SHA256); // A single zero byte for legacy_compression_method

      buf.writeUint8(0); // Vector of extensions

      buf.writeVector16(function (buf) {
        // The mandatory protocol-version specifier.
        _this5._writeExtension(buf, EXTENSION_TYPE.SUPPORTED_VERSIONS, function (buf) {
          buf.writeUint16(VERSION_TLS_1_3);
        }); // The PSK that we selected.


        _this5._writeExtension(buf, EXTENSION_TYPE.PRE_SHARED_KEY, function (buf) {
          buf.writeUint16(_this5.pskIndex);
        });
      });
    }
  }, {
    key: "TYPE_TAG",
    get: function get() {
      return HANDSHAKE_TYPE.SERVER_HELLO;
    }
  }], [{
    key: "_read",
    value: function _read(buf) {
      // Fixed value for legacy_version.
      assert(buf.readUint16() === VERSION_TLS_1_2, 'unexpected legacy_version'); // Random bytes from the server.

      var random = buf.readBytes(32); // It should have echoed our empty vector for legacy_session_id.

      assert(buf.readVectorBytes8().byteLength === 0, 'illegal_parameter'); // It should have selected our single offered ciphersuite.

      var foundCipherSuite = buf.readUint16();
      assert(foundCipherSuite === TLS_AES_128_GCM_SHA256, 'illegal_parameter'); // legacy_compression_methods must be zero.

      assert(buf.readUint8() === 0, 'unexpected legacy_compression_methods'); // The only extensions we should receive back are the mandatory "supported_versions",
      /// and "pre_shared_key" to confirm that the server selected our offered PSK.

      var pskIndex = false;
      buf.readVector16(function (buf) {
        // Each extension is formatted as:
        //   struct {
        //     ExtensionType extension_type;
        //     opaque extension_data<0..2^16-1>;
        //   } Extension;
        var extType = buf.readUint16(); // XXX TODO: error out if duplicate extension received?

        buf.readVector16(function (buf) {
          switch (extType) {
            case EXTENSION_TYPE.SUPPORTED_VERSIONS:
              // https://tools.ietf.org/html/rfc8446#section-4.2.1
              // We expect it to report back TLS1.3.
              assert(buf.readUint16() === VERSION_TLS_1_3, 'server does not support TLS1.3');
              break;

            case EXTENSION_TYPE.PRE_SHARED_KEY:
              // https://tools.ietf.org/html/rfc8446#section-4.2.11
              // The server sends back the index of the selected PSK.
              pskIndex = buf.readUint16();
              break;

            default:
              // There should be no other extensions.
              assert(false, 'unexpected extension in ServerHello');
          }
        });
      });
      assert(pskIndex !== false, 'server did not select a PSK');
      return new this(random, pskIndex);
    }
  }]);

  return ServerHello;
}(messages_HandshakeMessage); // The Finished message:
//
// struct {
//   opaque verify_data[Hash.length];
// } Finished;

var messages_Finished =
/*#__PURE__*/
function (_HandshakeMessage3) {
  inherits_default()(Finished, _HandshakeMessage3);

  function Finished(verifyData) {
    var _this6;

    classCallCheck_default()(this, Finished);

    _this6 = possibleConstructorReturn_default()(this, getPrototypeOf_default()(Finished).call(this));
    _this6.verifyData = verifyData;
    assert(verifyData.byteLength === HASH_LENGTH, 'incorrect length of verifyData');
    return _this6;
  }

  createClass_default()(Finished, [{
    key: "_write",
    value: function _write(buf) {
      buf.writeBytes(this.verifyData);
    }
  }, {
    key: "TYPE_TAG",
    get: function get() {
      return HANDSHAKE_TYPE.FINISHED;
    }
  }], [{
    key: "_read",
    value: function _read(buf) {
      var verifyData = buf.readBytes(HASH_LENGTH);
      return new this(verifyData);
    }
  }]);

  return Finished;
}(messages_HandshakeMessage);
// CONCATENATED MODULE: ./src/states.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */












var PSK_BINDER_SIZE = 32; //
// State-machine for TLS Handshake Management.
//
// Internally, we manage the TLS connection by explicitly modelling the
// client and server state-machines from RFC8446.  You can think of
// these `State` objects as little plugins for the `Connection` class
// that provide different behaviours of `send` and `receive` depending
// on the state of the connection.
//
// These are the actual states of the TLS1.3 state-machines and they
// send the same sequence of messages.  They don't use the same byte
// encoding or do any crypto yet though.
//

var states_State =
/*#__PURE__*/
function () {
  function State(conn) {
    classCallCheck_default()(this, State);

    this.conn = conn;
  }

  createClass_default()(State, [{
    key: "initialize",
    value: function () {
      var _initialize = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee() {
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initialize() {
        return _initialize.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "sendApplicationData",
    value: function () {
      var _sendApplicationData = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee2(data) {
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // By default, assume we're not ready to send yet
                // and just let the data queue up for a future state.
                // XXX TODO: should this block until it's successfuly sent?
                this.conn._pendingApplicationData.push(data);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function sendApplicationData(_x) {
        return _sendApplicationData.apply(this, arguments);
      }

      return sendApplicationData;
    }()
  }, {
    key: "recvApplicationData",
    value: function () {
      var _recvApplicationData = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee3() {
        return regenerator_default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                assert(false, 'not ready to receive application data');

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function recvApplicationData() {
        return _recvApplicationData.apply(this, arguments);
      }

      return recvApplicationData;
    }()
  }, {
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee4() {
        return regenerator_default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                assert(false, 'not expecting to receive a handhake message');

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function recvHandshakeMessage() {
        return _recvHandshakeMessage.apply(this, arguments);
      }

      return recvHandshakeMessage;
    }()
  }, {
    key: "close",
    value: function () {
      var _close = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee5() {
        return regenerator_default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                assert(false, 'close() not implemented yet');

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function close() {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }]);

  return State;
}(); // A special "guard" state to prevent us from using
// an improperly-initialized Connection.


var states_UNINITIALIZED =
/*#__PURE__*/
function (_State) {
  inherits_default()(UNINITIALIZED, _State);

  function UNINITIALIZED() {
    classCallCheck_default()(this, UNINITIALIZED);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(UNINITIALIZED).apply(this, arguments));
  }

  createClass_default()(UNINITIALIZED, [{
    key: "initialize",
    value: function () {
      var _initialize2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee6() {
        return regenerator_default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                assert(false, 'uninitialized state');

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function initialize() {
        return _initialize2.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "sendApplicationData",
    value: function () {
      var _sendApplicationData2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee7(data) {
        return regenerator_default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                assert(false, 'uninitialized state');

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function sendApplicationData(_x2) {
        return _sendApplicationData2.apply(this, arguments);
      }

      return sendApplicationData;
    }()
  }, {
    key: "recvApplicationData",
    value: function () {
      var _recvApplicationData2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee8(record) {
        return regenerator_default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                assert(false, 'uninitialized state');

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function recvApplicationData(_x3) {
        return _recvApplicationData2.apply(this, arguments);
      }

      return recvApplicationData;
    }()
  }, {
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee9(type, record) {
        return regenerator_default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                assert(false, 'uninitialized state');

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function recvHandshakeMessage(_x4, _x5) {
        return _recvHandshakeMessage2.apply(this, arguments);
      }

      return recvHandshakeMessage;
    }()
  }, {
    key: "close",
    value: function () {
      var _close2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee10() {
        return regenerator_default.a.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                assert(false, 'uninitialized state');

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function close() {
        return _close2.apply(this, arguments);
      }

      return close;
    }()
  }]);

  return UNINITIALIZED;
}(states_State); // A special "error" state for when something goes wrong.
// This state never transitions to another state, effectively
// terminating the connection.

var states_ERROR =
/*#__PURE__*/
function (_State2) {
  inherits_default()(ERROR, _State2);

  function ERROR() {
    classCallCheck_default()(this, ERROR);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(ERROR).apply(this, arguments));
  }

  createClass_default()(ERROR, [{
    key: "initialize",
    value: function () {
      var _initialize3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee11(err) {
        return regenerator_default.a.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                this.error = err;

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function initialize(_x6) {
        return _initialize3.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "sendApplicationData",
    value: function () {
      var _sendApplicationData3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee12(data) {
        return regenerator_default.a.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                throw this.error;

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function sendApplicationData(_x7) {
        return _sendApplicationData3.apply(this, arguments);
      }

      return sendApplicationData;
    }()
  }, {
    key: "recvApplicationData",
    value: function () {
      var _recvApplicationData3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee13(record) {
        return regenerator_default.a.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                throw this.error;

              case 1:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function recvApplicationData(_x8) {
        return _recvApplicationData3.apply(this, arguments);
      }

      return recvApplicationData;
    }()
  }, {
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee14(type, record) {
        return regenerator_default.a.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                throw this.error;

              case 1:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function recvHandshakeMessage(_x9, _x10) {
        return _recvHandshakeMessage3.apply(this, arguments);
      }

      return recvHandshakeMessage;
    }()
  }, {
    key: "close",
    value: function () {
      var _close3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee15() {
        return regenerator_default.a.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                throw this.error;

              case 1:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function close() {
        return _close3.apply(this, arguments);
      }

      return close;
    }()
  }]);

  return ERROR;
}(states_State); // The "connected" state, for when the handshake is compelte
// and we're ready to send application-level data.
// The logic for this is symmetric between client and server.

var states_CONNECTED =
/*#__PURE__*/
function (_State3) {
  inherits_default()(CONNECTED, _State3);

  function CONNECTED() {
    classCallCheck_default()(this, CONNECTED);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(CONNECTED).apply(this, arguments));
  }

  createClass_default()(CONNECTED, [{
    key: "initialize",
    value: function () {
      var _initialize4 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee16() {
        var data;
        return regenerator_default.a.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (!(this.conn._pendingApplicationData.length > 0)) {
                  _context16.next = 6;
                  break;
                }

                data = this.conn._pendingApplicationData.shift();
                _context16.next = 4;
                return this.sendApplicationData(data);

              case 4:
                _context16.next = 0;
                break;

              case 6:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function initialize() {
        return _initialize4.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "sendApplicationData",
    value: function () {
      var _sendApplicationData4 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee17(data) {
        return regenerator_default.a.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return this.conn._writeApplicationData(data);

              case 2:
                _context17.next = 4;
                return this.conn._flushOutgoingRecord();

              case 4:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function sendApplicationData(_x11) {
        return _sendApplicationData4.apply(this, arguments);
      }

      return sendApplicationData;
    }()
  }, {
    key: "recvApplicationData",
    value: function () {
      var _recvApplicationData4 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee18(record) {
        return regenerator_default.a.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                return _context18.abrupt("return", record.slice(0));

              case 1:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function recvApplicationData(_x12) {
        return _recvApplicationData4.apply(this, arguments);
      }

      return recvApplicationData;
    }()
  }]);

  return CONNECTED;
}(states_State); // These states implement (part of) the client state-machine from
// https://tools.ietf.org/html/rfc8446#appendix-A.1
//
// Since we're only implementing a small subset of TLS1.3,
// we only need a small subset of the handshake.  It basically goes:
//
//   * send ClientHello
//   * receive ServerHello
//   * receive server Finished
//   * send client Finished
//
// We include some unused states for completeness, so that it's easier
// to check the implementation against the diagrams in the RFC.

var states_CLIENT_START =
/*#__PURE__*/
function (_State4) {
  inherits_default()(CLIENT_START, _State4);

  function CLIENT_START() {
    classCallCheck_default()(this, CLIENT_START);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(CLIENT_START).apply(this, arguments));
  }

  createClass_default()(CLIENT_START, [{
    key: "initialize",
    value: function () {
      var _initialize5 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee19() {
        var clientHello;
        return regenerator_default.a.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                // Write a ClientHello message with our single PSK.
                // We can't know the binder value yet, write zeros for now.
                clientHello = new messages_ClientHello(this.conn.randomSalt, [this.conn.pskId], [new Uint8Array(PSK_BINDER_SIZE)]);
                _context19.next = 3;
                return this.conn._writeHandshakeMessage(clientHello);

              case 3:
                _context19.next = 5;
                return this.conn._flushOutgoingRecord();

              case 5:
                _context19.next = 7;
                return this.conn._transition(states_CLIENT_WAIT_SH);

              case 7:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function initialize() {
        return _initialize5.apply(this, arguments);
      }

      return initialize;
    }()
  }]);

  return CLIENT_START;
}(states_State);

var states_CLIENT_WAIT_SH =
/*#__PURE__*/
function (_State5) {
  inherits_default()(CLIENT_WAIT_SH, _State5);

  function CLIENT_WAIT_SH() {
    classCallCheck_default()(this, CLIENT_WAIT_SH);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(CLIENT_WAIT_SH).apply(this, arguments));
  }

  createClass_default()(CLIENT_WAIT_SH, [{
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage4 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee20(msg) {
        return regenerator_default.a.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                assert(msg instanceof messages_ServerHello, 'expected ServerHello');
                assert(msg.pskIndex === 0, 'server did not select our offered PSK');
                _context20.next = 4;
                return this.conn._transition(states_CLIENT_WAIT_EE, msg);

              case 4:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function recvHandshakeMessage(_x13) {
        return _recvHandshakeMessage4.apply(this, arguments);
      }

      return recvHandshakeMessage;
    }()
  }]);

  return CLIENT_WAIT_SH;
}(states_State);

var states_CLIENT_WAIT_EE =
/*#__PURE__*/
function (_State6) {
  inherits_default()(CLIENT_WAIT_EE, _State6);

  function CLIENT_WAIT_EE() {
    classCallCheck_default()(this, CLIENT_WAIT_EE);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(CLIENT_WAIT_EE).apply(this, arguments));
  }

  createClass_default()(CLIENT_WAIT_EE, [{
    key: "initialize",
    value: function () {
      var _initialize6 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee21() {
        return regenerator_default.a.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return this.conn._transition(states_CLIENT_WAIT_FINISHED);

              case 2:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function initialize() {
        return _initialize6.apply(this, arguments);
      }

      return initialize;
    }()
  }]);

  return CLIENT_WAIT_EE;
}(states_State);

var states_CLIENT_WAIT_FINISHED =
/*#__PURE__*/
function (_State7) {
  inherits_default()(CLIENT_WAIT_FINISHED, _State7);

  function CLIENT_WAIT_FINISHED() {
    classCallCheck_default()(this, CLIENT_WAIT_FINISHED);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(CLIENT_WAIT_FINISHED).apply(this, arguments));
  }

  createClass_default()(CLIENT_WAIT_FINISHED, [{
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage5 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee22(msg) {
        var verifyData;
        return regenerator_default.a.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                assert(msg instanceof messages_Finished, 'expected Finished'); // XXX TODO: calculate and verify server finished hash.

                assert(bytesAreEqual(msg.verifyData, new Uint8Array(HASH_LENGTH)), 'invalid verifyData'); // XXX TODO: need to calculate client finished hash.

                verifyData = new Uint8Array(HASH_LENGTH);
                _context22.next = 5;
                return this.conn._writeHandshakeMessage(new messages_Finished(verifyData));

              case 5:
                _context22.next = 7;
                return this.conn._flushOutgoingRecord();

              case 7:
                this.conn._updateTrafficKeys();

                _context22.next = 10;
                return this.conn._transition(states_CONNECTED);

              case 10:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function recvHandshakeMessage(_x14) {
        return _recvHandshakeMessage5.apply(this, arguments);
      }

      return recvHandshakeMessage;
    }()
  }]);

  return CLIENT_WAIT_FINISHED;
}(states_State); // These states implement (part of) the server state-machine from
// https://tools.ietf.org/html/rfc8446#appendix-A.2
//
// Since we're only implementing a small subset of TLS1.3,
// we only need a small subset of the handshake.  It basically goes:
//
//   * receive ClientHello
//   * send ServerHello
//   * send server Finished
//   * receive client Finished
//
// We include some unused states for completeness, so that it's easier
// to check the implementation against the diagrams in the RFC.


var states_SERVER_START =
/*#__PURE__*/
function (_State8) {
  inherits_default()(SERVER_START, _State8);

  function SERVER_START() {
    classCallCheck_default()(this, SERVER_START);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(SERVER_START).apply(this, arguments));
  }

  createClass_default()(SERVER_START, [{
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage6 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee23(msg) {
        return regenerator_default.a.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                assert(msg instanceof messages_ClientHello, 'expected ClientHello');
                _context23.next = 3;
                return this.conn._transition(states_SERVER_RECVD_CH, msg);

              case 3:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function recvHandshakeMessage(_x15) {
        return _recvHandshakeMessage6.apply(this, arguments);
      }

      return recvHandshakeMessage;
    }()
  }]);

  return SERVER_START;
}(states_State);

var states_SERVER_RECVD_CH =
/*#__PURE__*/
function (_State9) {
  inherits_default()(SERVER_RECVD_CH, _State9);

  function SERVER_RECVD_CH() {
    classCallCheck_default()(this, SERVER_RECVD_CH);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(SERVER_RECVD_CH).apply(this, arguments));
  }

  createClass_default()(SERVER_RECVD_CH, [{
    key: "initialize",
    value: function () {
      var _initialize7 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee24(clientHello) {
        var _this = this;

        var pskIndex, pskBinder;
        return regenerator_default.a.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                // In the spec, this is where we select connection parameters, and maybe
                // tell the client to try again if we can't find a compatible set.
                // Since we only support a fixed cipherset, the only thing to "negotiate"
                // is whether they provided an acceptable PSK.
                pskIndex = clientHello.pskIds.findIndex(function (pskId) {
                  return bytesAreEqual(pskId, _this.conn.pskId);
                });
                assert(pskIndex !== -1, 'client did not offer a matching PSK'); // XXX TODO: validate the PSK binder.
                // This will involve reading a partial transcript of messages received so far.

                pskBinder = clientHello.pskBinders[pskIndex];
                assert(bytesAreEqual(pskBinder, new Uint8Array(PSK_BINDER_SIZE)));
                _context24.next = 6;
                return this.conn._transition(states_SERVER_NEGOTIATED, pskIndex);

              case 6:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));

      function initialize(_x16) {
        return _initialize7.apply(this, arguments);
      }

      return initialize;
    }()
  }]);

  return SERVER_RECVD_CH;
}(states_State);

var states_SERVER_NEGOTIATED =
/*#__PURE__*/
function (_State10) {
  inherits_default()(SERVER_NEGOTIATED, _State10);

  function SERVER_NEGOTIATED() {
    classCallCheck_default()(this, SERVER_NEGOTIATED);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(SERVER_NEGOTIATED).apply(this, arguments));
  }

  createClass_default()(SERVER_NEGOTIATED, [{
    key: "initialize",
    value: function () {
      var _initialize8 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee25(pskIndex) {
        var verifyData;
        return regenerator_default.a.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.next = 2;
                return this.conn._writeHandshakeMessage(new messages_ServerHello(this.conn.randomSalt, pskIndex));

              case 2:
                // XXX TODO: need to calculate server finished hash.
                verifyData = new Uint8Array(HASH_LENGTH);
                _context25.next = 5;
                return this.conn._writeHandshakeMessage(new messages_Finished(verifyData));

              case 5:
                _context25.next = 7;
                return this.conn._flushOutgoingRecord();

              case 7:
                _context25.next = 9;
                return this.conn._transition(states_SERVER_WAIT_FLIGHT2);

              case 9:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function initialize(_x17) {
        return _initialize8.apply(this, arguments);
      }

      return initialize;
    }()
  }]);

  return SERVER_NEGOTIATED;
}(states_State);

var states_SERVER_WAIT_FLIGHT2 =
/*#__PURE__*/
function (_State11) {
  inherits_default()(SERVER_WAIT_FLIGHT2, _State11);

  function SERVER_WAIT_FLIGHT2() {
    classCallCheck_default()(this, SERVER_WAIT_FLIGHT2);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(SERVER_WAIT_FLIGHT2).apply(this, arguments));
  }

  createClass_default()(SERVER_WAIT_FLIGHT2, [{
    key: "initialize",
    value: function () {
      var _initialize9 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee26() {
        return regenerator_default.a.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.next = 2;
                return this.conn._transition(states_SERVER_WAIT_FINISHED);

              case 2:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      function initialize() {
        return _initialize9.apply(this, arguments);
      }

      return initialize;
    }()
  }]);

  return SERVER_WAIT_FLIGHT2;
}(states_State);

var states_SERVER_WAIT_FINISHED =
/*#__PURE__*/
function (_State12) {
  inherits_default()(SERVER_WAIT_FINISHED, _State12);

  function SERVER_WAIT_FINISHED() {
    classCallCheck_default()(this, SERVER_WAIT_FINISHED);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(SERVER_WAIT_FINISHED).apply(this, arguments));
  }

  createClass_default()(SERVER_WAIT_FINISHED, [{
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage7 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee27(msg) {
        return regenerator_default.a.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                assert(msg instanceof messages_Finished, 'expected Finished'); // XXX TODO: calculate and verify client finished hash.

                assert(bytesAreEqual(msg.verifyData, new Uint8Array(HASH_LENGTH)), 'invalid verify_data');

                this.conn._updateTrafficKeys();

                _context27.next = 5;
                return this.conn._transition(states_CONNECTED);

              case 5:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      function recvHandshakeMessage(_x18) {
        return _recvHandshakeMessage7.apply(this, arguments);
      }

      return recvHandshakeMessage;
    }()
  }]);

  return SERVER_WAIT_FINISHED;
}(states_State);
// CONCATENATED MODULE: ./src/recordlayer.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
 //
// This file implements the "record layer" for TLS1.3, as defined in
// https://tools.ietf.org/html/rfc8446#section-5.
//
// The record layer is responsible for encrypting/decrypting bytes to be
// sent over the wire, including stateful management of sequence numbers
// for the incoming and outgoing stream.
//
// For simplicity, we assume that the application receives whole records
// from the peer and receives them one at a time, and likewise that is
// prepares and sends messages that fit in an individual record.  It would
// not be too complicated to add some buffering to deal with fragementation,
// but it's not needed for now.
//
// To read incoming data from the peer, use the `RecordReceiver` class
// like this:
//
//    receiver = new RecordReceiver()
//
//    // Specify the decryption key to use, if any.
//    receiver.setContentKey(key, iv)
//
//    // Decode/decrypt a record
//    [type, buf] = await receiver.recv(dataReceivedFromPeer)
//    switch (type) {
//      // Handle the received data based on its type tag.
//    }
//
// To prepare outgoing data to send to the peer, use the `RecordSender` class
// like this:
//
//    sender = new RecordSender()
//
//    // Specify the encryption key to use, if any.
//    receiver.setContentKey(key, iv)
//
//    // Write data into the pending record.
//    sender.withBufferWriter(TYPE_TAG, buf => {
//      buf.writeBytes('data here')
//    })
//
//    // You can concatenate several things in the buffer,
//    // as long as they belong to the same record type.
//    sender.withBufferWriter(TYPE_TAG, buf => {
//      buf.writeBytes('more data here')
//    })
//
//    // When ready to send, flush the pending record.
//    record = await sender.flush()
//    send_record_to_peer(record)
//







/* eslint-disable sorting/sort-object-props */

var RECORD_TYPES = {
  21: 'ALERT',
  22: 'HANDSHAKE',
  23: 'APPLICATION_DATA'
};
var RECORD_TYPE = {
  ALERT: 21,
  HANDSHAKE: 22,
  APPLICATION_DATA: 23
};
/* eslint-enable sorting/sort-object-props */

var MAX_SEQUENCE_NUMBER = Math.pow(2, 32);
var MAX_RECORD_SIZE = Math.pow(2, 14);
var MAX_ENCRYPTED_RECORD_SIZE = MAX_RECORD_SIZE + 256;
var RECORD_HEADER_SIZE = 5;
var RECORD_BUFFER_SIZE = MAX_ENCRYPTED_RECORD_SIZE + RECORD_HEADER_SIZE;
var recordlayer_RecordReceiver =
/*#__PURE__*/
function () {
  function RecordReceiver() {
    classCallCheck_default()(this, RecordReceiver);

    this.contentKey = null;
    this.contentIV = null;
    this.sequenceNumber = 0;
  } // Call this to set the encryption key, or to change
  // to a newly-derived key.  Any records read before calling
  // this method are treated as plaintext.


  createClass_default()(RecordReceiver, [{
    key: "setContentKey",
    value: function setContentKey(key, iv) {
      assertIsBytes(key);
      assertIsBytes(iv);
      this.contentKey = key;
      this.contentIV = iv;
      this.sequenceNumber = 0;
    } // Call this method when a record is received from the peer.
    // It will decode and decrypt the record and return its contents
    // as a `[type, reader]` pair, where `type` is the record type tag
    // and `reader` is a `BufferReader` instance that can be used for
    // structured reading of the record contents.

  }, {
    key: "recv",
    value: function () {
      var _recv = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee(data) {
        var buf, type, length, plaintext, additionalData, ciphertext, paddedPlaintext, i;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                buf = new utils_BufferReader(data); // The data to read is either a TLSPlaintext or TLSCiphertext struct,
                // depending on whether record protection has been enabled yet:
                //
                //    struct {
                //        ContentType type;
                //        ProtocolVersion legacy_record_version;
                //        uint16 length;
                //        opaque fragment[TLSPlaintext.length];
                //    } TLSPlaintext;
                //
                //    struct {
                //        ContentType opaque_type = application_data; /* 23 */
                //        ProtocolVersion legacy_record_version = 0x0303; /* TLS v1.2 */
                //        uint16 length;
                //        opaque encrypted_record[TLSCiphertext.length];
                //    } TLSCiphertext;
                //

                type = buf.readUint8();
                assert(type in RECORD_TYPES, 'unrecognized record type');
                assert(buf.readUint16() === 0x0303, 'unexpected legacy_record_version');
                length = buf.readUint16();

                if (!(this.contentKey === null)) {
                  _context.next = 11;
                  break;
                }

                // An unencrypted `TLSPlaintext` struct.
                assert(type !== RECORD_TYPE.APPLICATION_DATA, 'must encrypt application data');
                assert(length < MAX_RECORD_SIZE, 'record_overflow');
                plaintext = buf.readBytes(length);
                _context.next = 28;
                break;

              case 11:
                // An encrypted `TLSCiphertext` struct.
                assert(length < MAX_ENCRYPTED_RECORD_SIZE, 'record_overflow');
                assert(type === RECORD_TYPE.APPLICATION_DATA, 'outer opaque_type should always be application data'); // Decrypt and decode the contained `TLSInnerPlaintext` struct:
                //
                //    struct {
                //        opaque content[TLSPlaintext.length];
                //        ContentType type;
                //        uint8 zeros[length_of_padding];
                //    } TLSInnerPlaintext;
                //
                // The additional data for the decryption is the `TLSCiphertext` record
                // header that we just read over, which we know to be the previous `RECORD_HEADER_SIZE` bytes.

                additionalData = buf.slice(-RECORD_HEADER_SIZE, RECORD_HEADER_SIZE);
                ciphertext = buf.readBytes(length);
                _context.next = 17;
                return this._decrypt(ciphertext, additionalData);

              case 17:
                paddedPlaintext = _context.sent;
                i = paddedPlaintext.byteLength - 1;

              case 19:
                if (!(i >= 0)) {
                  _context.next = 25;
                  break;
                }

                if (!(paddedPlaintext[i] !== 0)) {
                  _context.next = 22;
                  break;
                }

                return _context.abrupt("break", 25);

              case 22:
                i--;
                _context.next = 19;
                break;

              case 25:
                assert(i >= 0, 'failed to find content-type byte in TLSInnerPlaintext');
                type = paddedPlaintext[i];
                plaintext = new Uint8Array(paddedPlaintext.buffer, paddedPlaintext.byteOffset, i);

              case 28:
                assert(!buf.hasMoreBytes(), 'record contained trailing data');
                return _context.abrupt("return", [type, new utils_BufferReader(plaintext)]);

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function recv(_x) {
        return _recv.apply(this, arguments);
      }

      return recv;
    }()
  }, {
    key: "_decrypt",
    value: function () {
      var _decrypt2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee2(ciphertext, additionalData) {
        var plaintext;
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return AEADDecrypt(this.contentKey, this.contentIV, this.sequenceNumber, ciphertext, additionalData);

              case 2:
                plaintext = _context2.sent;
                this.sequenceNumber += 1;
                assert(this.sequenceNumber < MAX_SEQUENCE_NUMBER, 'sequence number overflow');
                return _context2.abrupt("return", plaintext);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _decrypt(_x2, _x3) {
        return _decrypt2.apply(this, arguments);
      }

      return _decrypt;
    }()
  }]);

  return RecordReceiver;
}(); //
// This class is a simple fixed-sized buffer for accumulating outgoing messages,
// allowing multiple messages to be coalesced into a single record for the application
// to send.
//
// For simplicity we assume that the application will not try to accumulate
// more data than can fit in a single record, and so we can work with a fixed-size
// buffer. (But for safety, we'll throw a hard error if it does write too much
// data into the record).
//

var recordlayer_RecordSender =
/*#__PURE__*/
function () {
  function RecordSender() {
    classCallCheck_default()(this, RecordSender);

    this.contentKey = null;
    this.contentIV = null;
    this.sequenceNumber = 0;
    this._pendingRecordType = 0;
    this._pendingRecordBuf = null;
  } // Call this to set the encryption key, or to change
  // to a newly-derived key.  Any records written before calling
  // this method will be transmitted as plaintext.


  createClass_default()(RecordSender, [{
    key: "setContentKey",
    value: function setContentKey(key, iv) {
      assertIsBytes(key);
      assertIsBytes(iv);
      this.contentKey = key;
      this.contentIV = iv;
      this.sequenceNumber = 0;
    } // Call this method to obtain a `BufferWriter` that can be used to
    // add more data to the outgoing record.  The provided callback will
    // receive the `BufferWriter` as its only argument.
    // You must specify the intended record type in order to prevent mixing
    // different types in the one record.

  }, {
    key: "withBufferWriter",
    value: function () {
      var _withBufferWriter = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee3(type, cb) {
        return regenerator_default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this._pendingRecordBuf === null) {
                  this._pendingRecordType = type;
                  this._pendingRecordBuf = new utils_BufferWriter(RECORD_BUFFER_SIZE); // Reserve space at the start of the buffer for the record header,
                  // which is conveniently always a fixed size.

                  this._pendingRecordBuf.seek(RECORD_HEADER_SIZE);
                } else {
                  assert(this._pendingRecordType === type, 'different record type already in progress');
                }

                _context3.next = 3;
                return cb(this._pendingRecordBuf);

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function withBufferWriter(_x4, _x5) {
        return _withBufferWriter.apply(this, arguments);
      }

      return withBufferWriter;
    }() // When you're finished writing to the record via `withBufferWriter` above,
    // call `flush()` to produce an encrypted record to send to the peer.

  }, {
    key: "flush",
    value: function () {
      var _flush = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee4() {
        var buf, type, length, additionalData, ciphertext;
        return regenerator_default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                buf = this._pendingRecordBuf;
                type = this._pendingRecordType;
                this._pendingRecordBuf = null;
                assert(type !== null, 'no messages written to buffer');
                length = buf.tell() - RECORD_HEADER_SIZE;

                if (!(this.contentKey === null)) {
                  _context4.next = 13;
                  break;
                }

                // Generate an unencrypted `TLSPlaintext` struct by just
                // filling in an appropriate record header.
                assert(type !== RECORD_TYPE.APPLICATION_DATA, 'must encrypt application data');
                buf.seek(0);
                buf.writeUint8(type);
                buf.writeUint16(0x0303);
                buf.writeUint16(length);
                _context4.next = 26;
                break;

              case 13:
                // Generate an encrypted `TLSCiphertext` struct.
                // First, turn the existing buffer contents into a `TLSInnerPlaintext` by
                // appending the type.  We don't do any zero-padding, although the spec allows it.
                buf.writeUint8(type);
                length += 1; // Write the record header, knowing that we will inflate the plaintext
                // by some fixed additional amount due to the encryption.

                buf.seek(0);
                buf.writeUint8(RECORD_TYPE.APPLICATION_DATA);
                buf.writeUint16(0x0303);
                buf.writeUint16(length + AEAD_SIZE_INFLATION); // The additional data for the encryption is the `TLSCiphertext` record
                // header that  we just wrote, which we know to be the previous `RECORD_HEADER_SIZE` bytes.

                additionalData = buf.slice(-RECORD_HEADER_SIZE, RECORD_HEADER_SIZE);
                _context4.next = 22;
                return this._encrypt(buf.slice(0, length), additionalData);

              case 22:
                ciphertext = _context4.sent;
                length += AEAD_SIZE_INFLATION;
                assert(ciphertext.byteLength === length, 'unexpected ciphertext length');
                buf.writeBytes(ciphertext);

              case 26:
                buf.seek(0);
                return _context4.abrupt("return", buf.slice(0, length + RECORD_HEADER_SIZE));

              case 28:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function flush() {
        return _flush.apply(this, arguments);
      }

      return flush;
    }()
  }, {
    key: "_encrypt",
    value: function () {
      var _encrypt2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee5(plaintext, additionalData) {
        var ciphertext;
        return regenerator_default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return AEADEncrypt(this.contentKey, this.contentIV, this.sequenceNumber, plaintext, additionalData);

              case 2:
                ciphertext = _context5.sent;
                this.sequenceNumber += 1;
                assert(this.sequenceNumber < MAX_SEQUENCE_NUMBER, 'sequence number overflow');
                return _context5.abrupt("return", ciphertext);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _encrypt(_x6, _x7) {
        return _encrypt2.apply(this, arguments);
      }

      return _encrypt;
    }()
  }]);

  return RecordSender;
}();
// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsecureClientConnection", function() { return src_InsecureClientConnection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsecureServerConnection", function() { return src_InsecureServerConnection; });
/* concated harmony reexport bytesToHex */__webpack_require__.d(__webpack_exports__, "bytesToHex", function() { return bytesToHex; });
/* concated harmony reexport hexToBytes */__webpack_require__.d(__webpack_exports__, "hexToBytes", function() { return hexToBytes; });
/* concated harmony reexport bytesToUtf8 */__webpack_require__.d(__webpack_exports__, "bytesToUtf8", function() { return bytesToUtf8; });
/* concated harmony reexport utf8ToBytes */__webpack_require__.d(__webpack_exports__, "utf8ToBytes", function() { return utf8ToBytes; });
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
 // The top-level APIs offered by this library are `ClientConnection` and
// `ServerConnection` classes.  They each take a callback to be used for
// sending data to the remote peer, and operate like this:
//
//    conn = await ClientConnection.create(psk, pskId, async function send_data_to_server(data) {
//      // application-specific sending logic here.
//    })
//
//    // Send data to the server by calling `send`,
//    // which will use the callback provided in the constructor.
//    // A single `send()` by the application may result in multiple
//    // invokations of the callback.
//
//    await conn.send('application-level data')
//
//    // When data is received from the server, push it into
//    // the connection and let it return any decrypted app-level data.
//    // There might not be any app-level data if it was protocol control message,
//    // and the receipt of the data might trigger additional calls to the
//    // send callback for protocol control purposes.
//
//    serverSocket.on('data', async encrypted_data => {
//      const plaintext = await conn.recv(data)
//      if (plaintext !== null) {
//        do_something_with_app_level_data(plaintext)
//      }
//    })
//
//    // It's good practice to explicitly close the connection
//    // when finished.  This will send a "closed" notification
//    // to the server.
//
//    await conn.close()
//
// The `ServerConnection` API operates similarly; the distinction is mainly
// in which side is expected to send vs receieve during the protocol handshake.














 // !!!!!!!
// !!
// !!   N.B. We have not yet implemented the actual encryption bits!
// !!
// !!!!!!!
//
// This first version of the code uses the same "framework" as we would use for
// implementing TLS1.3, including the basic sequence of messages between client and
// server, and the use of binary encoding in an ArrayBuffer for data processing.
// Using an implementation with proper crypto should feel identical to using
// this mock version, except it won't have "Insecure" in the class name...

var src_InsecureConnection =
/*#__PURE__*/
function () {
  function InsecureConnection(psk, pskId, sendCallback, randomSalt) {
    classCallCheck_default()(this, InsecureConnection);

    this.psk = assertIsBytes(psk);
    this.pskId = assertIsBytes(pskId);
    this.sendCallback = sendCallback;
    this.randomSalt = randomSalt;
    this._state = new states_UNINITIALIZED(this);
    this._pendingApplicationData = [];
    this._recordSender = new recordlayer_RecordSender();
    this._recordReceiver = new recordlayer_RecordReceiver();
    this._lastPromise = Promise.resolve();
  } // Subclasses will override this with some async initialization logic.


  createClass_default()(InsecureConnection, [{
    key: "send",
    // These are the three public API methods that
    // consumers can use to connunicate over TLS.
    value: function () {
      var _send = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee2(data) {
        var _this = this;

        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                assertIsBytes(data);
                _context2.next = 3;
                return this._synchronized(
                /*#__PURE__*/
                asyncToGenerator_default()(
                /*#__PURE__*/
                regenerator_default.a.mark(function _callee() {
                  return regenerator_default.a.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _this._state.sendApplicationData(data);

                        case 2:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                })));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function send(_x) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "recv",
    value: function () {
      var _recv = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee4(data) {
        var _this2 = this;

        return regenerator_default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                assertIsBytes(data);
                _context4.next = 3;
                return this._synchronized(
                /*#__PURE__*/
                asyncToGenerator_default()(
                /*#__PURE__*/
                regenerator_default.a.mark(function _callee3() {
                  var _ref3, _ref4, type, buf;

                  return regenerator_default.a.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return _this2._recordReceiver.recv(data);

                        case 2:
                          _ref3 = _context3.sent;
                          _ref4 = slicedToArray_default()(_ref3, 2);
                          type = _ref4[0];
                          buf = _ref4[1];
                          _context3.next = 8;
                          return _this2._dispatchIncomingRecord(type, buf);

                        case 8:
                          return _context3.abrupt("return", _context3.sent);

                        case 9:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3, this);
                })));

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function recv(_x2) {
        return _recv.apply(this, arguments);
      }

      return recv;
    }()
  }, {
    key: "close",
    value: function () {
      var _close = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee6() {
        var _this3 = this;

        return regenerator_default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._synchronized(
                /*#__PURE__*/
                asyncToGenerator_default()(
                /*#__PURE__*/
                regenerator_default.a.mark(function _callee5() {
                  return regenerator_default.a.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return _this3._state.close();

                        case 2:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5, this);
                })));

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function close() {
        return _close.apply(this, arguments);
      }

      return close;
    }() // Ensure that async functions execute one at a time,
    // by waiting for the previous call to `_synchronized()` to complete
    // before starting a new one.  This helps ensure that we complete
    // one state-machine transition before starting to do the next.

  }, {
    key: "_synchronized",
    value: function _synchronized(cb) {
      var _this4 = this;

      var nextPromise = this._lastPromise.then(function () {
        return cb();
      }).catch(
      /*#__PURE__*/
      function () {
        var _ref6 = asyncToGenerator_default()(
        /*#__PURE__*/
        regenerator_default.a.mark(function _callee7(err) {
          return regenerator_default.a.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return _this4._transition(states_ERROR, err);

                case 2:
                  throw err;

                case 3:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        return function (_x3) {
          return _ref6.apply(this, arguments);
        };
      }()); // We don't want to hold on to the return value or error,
      // just synchronize on the fact that it completed.


      this._lastPromise = nextPromise.then(noop, noop);
      return nextPromise;
    } // This drives internal transition of the state-machine,
    // ensuring that the new state is properly initialized.

  }, {
    key: "_transition",
    value: function () {
      var _transition2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee8(State) {
        var _this$_state;

        var _len,
            args,
            _key,
            _args8 = arguments;

        return regenerator_default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this._state = new State(this);

                for (_len = _args8.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = _args8[_key];
                }

                _context8.next = 4;
                return (_this$_state = this._state).initialize.apply(_this$_state, args);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _transition(_x4) {
        return _transition2.apply(this, arguments);
      }

      return _transition;
    }() // These are helpers to allow the state to add data to the next outgoing record.

  }, {
    key: "_writeApplicationData",
    value: function () {
      var _writeApplicationData2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee10(bytes) {
        return regenerator_default.a.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._recordSender.withBufferWriter(RECORD_TYPE.APPLICATION_DATA,
                /*#__PURE__*/
                function () {
                  var _ref7 = asyncToGenerator_default()(
                  /*#__PURE__*/
                  regenerator_default.a.mark(function _callee9(buf) {
                    return regenerator_default.a.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            _context9.next = 2;
                            return buf.writeBytes(bytes);

                          case 2:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9, this);
                  }));

                  return function (_x6) {
                    return _ref7.apply(this, arguments);
                  };
                }());

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function _writeApplicationData(_x5) {
        return _writeApplicationData2.apply(this, arguments);
      }

      return _writeApplicationData;
    }()
  }, {
    key: "_writeHandshakeMessage",
    value: function () {
      var _writeHandshakeMessage2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee12(msg) {
        return regenerator_default.a.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this._recordSender.withBufferWriter(RECORD_TYPE.HANDSHAKE,
                /*#__PURE__*/
                function () {
                  var _ref8 = asyncToGenerator_default()(
                  /*#__PURE__*/
                  regenerator_default.a.mark(function _callee11(buf) {
                    return regenerator_default.a.wrap(function _callee11$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            _context11.next = 2;
                            return msg.write(buf);

                          case 2:
                          case "end":
                            return _context11.stop();
                        }
                      }
                    }, _callee11, this);
                  }));

                  return function (_x8) {
                    return _ref8.apply(this, arguments);
                  };
                }());

              case 2:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function _writeHandshakeMessage(_x7) {
        return _writeHandshakeMessage2.apply(this, arguments);
      }

      return _writeHandshakeMessage;
    }()
  }, {
    key: "_flushOutgoingRecord",
    value: function () {
      var _flushOutgoingRecord2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee13() {
        var record;
        return regenerator_default.a.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this._recordSender.flush();

              case 2:
                record = _context13.sent;
                _context13.next = 5;
                return this.sendCallback(record);

              case 5:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function _flushOutgoingRecord() {
        return _flushOutgoingRecord2.apply(this, arguments);
      }

      return _flushOutgoingRecord;
    }() // This is a helper for handling incoming records.

  }, {
    key: "_dispatchIncomingRecord",
    value: function () {
      var _dispatchIncomingRecord2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee14(type, buf) {
        var msg;
        return regenerator_default.a.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.t0 = type;
                _context14.next = _context14.t0 === RECORD_TYPE.ALERT ? 3 : _context14.t0 === RECORD_TYPE.APPLICATION_DATA ? 4 : _context14.t0 === RECORD_TYPE.HANDSHAKE ? 7 : 12;
                break;

              case 3:
                throw new Error('received TLS alert record, aborting!');

              case 4:
                _context14.next = 6;
                return this._state.recvApplicationData(buf);

              case 6:
                return _context14.abrupt("return", _context14.sent);

              case 7:
                // XXX TODO: remember buffer position here.
                msg = readHandshakeMessage(buf); // XXX TODO: read back to prev buffer position, add it to the transcript hash.

                _context14.next = 10;
                return this._state.recvHandshakeMessage(msg);

              case 10:
                if (buf.hasMoreBytes()) {
                  _context14.next = 7;
                  break;
                }

              case 11:
                return _context14.abrupt("return", null);

              case 12:
                assert(false, "unknown record type: ".concat(type));

              case 13:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function _dispatchIncomingRecord(_x9, _x10) {
        return _dispatchIncomingRecord2.apply(this, arguments);
      }

      return _dispatchIncomingRecord;
    }() // This is a placeholder, until we implement the full key schedule.
    // XXX TODO: the full key schedule.

  }, {
    key: "_updateTrafficKeys",
    value: function _updateTrafficKeys() {
      this._recordSender.setContentKey(this.psk, new Uint8Array(32));

      this._recordReceiver.setContentKey(this.psk, new Uint8Array(32));
    }
  }], [{
    key: "create",
    value: function () {
      var _create = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee15(psk, pskId, sendCallback) {
        var randomSalt,
            _args15 = arguments;
        return regenerator_default.a.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                randomSalt = _args15.length > 3 && _args15[3] !== undefined ? _args15[3] : null;

                if (!(randomSalt === null)) {
                  _context15.next = 7;
                  break;
                }

                _context15.next = 4;
                return getRandomBytes(32);

              case 4:
                _context15.t0 = _context15.sent;
                _context15.next = 8;
                break;

              case 7:
                _context15.t0 = randomSalt;

              case 8:
                randomSalt = _context15.t0;
                return _context15.abrupt("return", new this(psk, pskId, sendCallback, randomSalt));

              case 10:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function create(_x11, _x12, _x13) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return InsecureConnection;
}();

var src_InsecureClientConnection =
/*#__PURE__*/
function (_InsecureConnection) {
  inherits_default()(InsecureClientConnection, _InsecureConnection);

  function InsecureClientConnection() {
    classCallCheck_default()(this, InsecureClientConnection);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(InsecureClientConnection).apply(this, arguments));
  }

  createClass_default()(InsecureClientConnection, null, [{
    key: "create",
    value: function () {
      var _create2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee16(psk, pskId, sendCallback) {
        var instance;
        return regenerator_default.a.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return get_default()(getPrototypeOf_default()(InsecureClientConnection), "create", this).call(this, psk, pskId, sendCallback);

              case 2:
                instance = _context16.sent;
                _context16.next = 5;
                return instance._transition(states_CLIENT_START);

              case 5:
                return _context16.abrupt("return", instance);

              case 6:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function create(_x14, _x15, _x16) {
        return _create2.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return InsecureClientConnection;
}(src_InsecureConnection);
var src_InsecureServerConnection =
/*#__PURE__*/
function (_InsecureConnection2) {
  inherits_default()(InsecureServerConnection, _InsecureConnection2);

  function InsecureServerConnection() {
    classCallCheck_default()(this, InsecureServerConnection);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(InsecureServerConnection).apply(this, arguments));
  }

  createClass_default()(InsecureServerConnection, null, [{
    key: "create",
    value: function () {
      var _create3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee17(psk, pskId, sendCallback) {
        var instance;
        return regenerator_default.a.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return get_default()(getPrototypeOf_default()(InsecureServerConnection), "create", this).call(this, psk, pskId, sendCallback);

              case 2:
                instance = _context17.sent;
                _context17.next = 5;
                return instance._transition(states_SERVER_START);

              case 5:
                return _context17.abrupt("return", instance);

              case 6:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function create(_x17, _x18, _x19) {
        return _create3.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return InsecureServerConnection;
}(src_InsecureConnection); // Re-export helpful utilities for calling code to use.



/***/ })
/******/ ]);
});