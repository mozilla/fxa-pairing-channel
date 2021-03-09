/*!
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * 
 * The following bundle is from an external repository at github.com/mozilla/fxa-pairing-channel,
 * it implements a shared library for two javascript environments to create an encrypted and authenticated
 * communication channel by sharing a secret key and by relaying messages through a websocket server.
 * 
 * It is used by the Firefox Accounts pairing flow, with one side of the channel being web
 * content from https://accounts.firefox.com and the other side of the channel being chrome native code.
 * 
 * This uses the event-target-shim node library published under the MIT license:
 * https://github.com/mysticatea/event-target-shim/blob/master/LICENSE
 * 
 * Bundle generated from https://github.com/mozilla/fxa-pairing-channel.git. Hash:78cb6944395e5a8ce1e1, Chunkhash:8c9e24877c95d0520946.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("FxAccountsPairingChannel", [], factory);
	else if(typeof exports === 'object')
		exports["FxAccountsPairingChannel"] = factory();
	else
		root["FxAccountsPairingChannel"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


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

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(13);

var assertThisInitialized = __webpack_require__(14);

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

var setPrototypeOf = __webpack_require__(9);

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

var getPrototypeOf = __webpack_require__(3);

var superPropBase = __webpack_require__(15);

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

var arrayWithHoles = __webpack_require__(16);

var iterableToArrayLimit = __webpack_require__(17);

var nonIterableRest = __webpack_require__(18);

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(3);

var setPrototypeOf = __webpack_require__(9);

var isNativeFunction = __webpack_require__(19);

var construct = __webpack_require__(20);

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper;

/***/ }),
/* 11 */
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

module.exports = __webpack_require__(12);

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
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(3);

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),
/* 17 */
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
/* 18 */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

module.exports = _isNativeFunction;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(9);

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "PairingChannel", function() { return /* binding */ src_PairingChannel; });
__webpack_require__.d(__webpack_exports__, "base64urlToBytes", function() { return /* reexport */ base64urlToBytes; });
__webpack_require__.d(__webpack_exports__, "bytesToBase64url", function() { return /* reexport */ bytesToBase64url; });
__webpack_require__.d(__webpack_exports__, "bytesToHex", function() { return /* reexport */ bytesToHex; });
__webpack_require__.d(__webpack_exports__, "bytesToUtf8", function() { return /* reexport */ bytesToUtf8; });
__webpack_require__.d(__webpack_exports__, "hexToBytes", function() { return /* reexport */ hexToBytes; });
__webpack_require__.d(__webpack_exports__, "TLSCloseNotify", function() { return /* reexport */ alerts_TLSCloseNotify; });
__webpack_require__.d(__webpack_exports__, "TLSError", function() { return /* reexport */ alerts_TLSError; });
__webpack_require__.d(__webpack_exports__, "utf8ToBytes", function() { return /* reexport */ utf8ToBytes; });
__webpack_require__.d(__webpack_exports__, "_internals", function() { return /* binding */ _internals; });

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
var createClass = __webpack_require__(4);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(5);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(3);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(6);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/get.js
var get = __webpack_require__(7);
var get_default = /*#__PURE__*/__webpack_require__.n(get);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(8);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/wrapNativeSuper.js
var wrapNativeSuper = __webpack_require__(10);
var wrapNativeSuper_default = /*#__PURE__*/__webpack_require__.n(wrapNativeSuper);

// CONCATENATED MODULE: ./src/alerts.js







/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable sorting/sort-object-props */
var ALERT_LEVEL = {
  WARNING: 1,
  FATAL: 2
};
var ALERT_DESCRIPTION = {
  CLOSE_NOTIFY: 0,
  UNEXPECTED_MESSAGE: 10,
  BAD_RECORD_MAC: 20,
  RECORD_OVERFLOW: 22,
  HANDSHAKE_FAILURE: 40,
  ILLEGAL_PARAMETER: 47,
  DECODE_ERROR: 50,
  DECRYPT_ERROR: 51,
  PROTOCOL_VERSION: 70,
  INTERNAL_ERROR: 80,
  MISSING_EXTENSION: 109,
  UNSUPPORTED_EXTENSION: 110,
  UNKNOWN_PSK_IDENTITY: 115,
  NO_APPLICATION_PROTOCOL: 120
};
/* eslint-enable sorting/sort-object-props */

function alertTypeToName(type) {
  for (var name in ALERT_DESCRIPTION) {
    if (ALERT_DESCRIPTION[name] === type) {
      return "".concat(name, " (").concat(type, ")");
    }
  }

  return "UNKNOWN (".concat(type, ")");
}

var alerts_TLSAlert =
/*#__PURE__*/
function (_Error) {
  inherits_default()(TLSAlert, _Error);

  function TLSAlert(description, level) {
    var _this;

    classCallCheck_default()(this, TLSAlert);

    _this = possibleConstructorReturn_default()(this, getPrototypeOf_default()(TLSAlert).call(this, "TLS Alert: ".concat(alertTypeToName(description))));
    _this.description = description;
    _this.level = level;
    return _this;
  }

  createClass_default()(TLSAlert, [{
    key: "toBytes",
    value: function toBytes() {
      return new Uint8Array([this.level, this.description]);
    }
  }], [{
    key: "fromBytes",
    value: function fromBytes(bytes) {
      if (bytes.byteLength !== 2) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
      }

      switch (bytes[1]) {
        case ALERT_DESCRIPTION.CLOSE_NOTIFY:
          if (bytes[0] !== ALERT_LEVEL.WARNING) {
            // Close notifications should be fatal.
            throw new alerts_TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
          }

          return new alerts_TLSCloseNotify();

        default:
          return new alerts_TLSError(bytes[1]);
      }
    }
  }]);

  return TLSAlert;
}(wrapNativeSuper_default()(Error));
var alerts_TLSCloseNotify =
/*#__PURE__*/
function (_TLSAlert) {
  inherits_default()(TLSCloseNotify, _TLSAlert);

  function TLSCloseNotify() {
    classCallCheck_default()(this, TLSCloseNotify);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(TLSCloseNotify).call(this, ALERT_DESCRIPTION.CLOSE_NOTIFY, ALERT_LEVEL.WARNING));
  }

  return TLSCloseNotify;
}(alerts_TLSAlert);
var alerts_TLSError =
/*#__PURE__*/
function (_TLSAlert2) {
  inherits_default()(TLSError, _TLSAlert2);

  function TLSError() {
    var description = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ALERT_DESCRIPTION.INTERNAL_ERROR;

    classCallCheck_default()(this, TLSError);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(TLSError).call(this, description, ALERT_LEVEL.FATAL));
  }

  return TLSError;
}(alerts_TLSAlert);
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

var UTF8_ENCODER = new TextEncoder();
var UTF8_DECODER = new TextDecoder();
function noop() {}
function assert(cond, msg) {
  if (!cond) {
    throw new Error('assert failed: ' + msg);
  }
}
function assertIsBytes(value) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value must be a Uint8Array';
  // Using `value instanceof Uint8Array` seems to fail in Firefox chrome code
  // for inscrutable reasons, so we do a less direct check.
  assert(ArrayBuffer.isView(value), msg);
  assert(value.BYTES_PER_ELEMENT === 1, msg);
  return value;
}
var EMPTY = new Uint8Array(0);
function zeros(n) {
  return new Uint8Array(n);
}
function arrayToBytes(value) {
  return new Uint8Array(value);
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
  return UTF8_DECODER.decode(bytes);
}
function utf8ToBytes(str) {
  return UTF8_ENCODER.encode(str);
}
function bytesToBase64url(bytes) {
  // XXX TODO: try to use something constant-time, in case calling code
  // uses it to encode secrets?
  var charCodes = String.fromCharCode.apply(String, bytes);
  return btoa(charCodes).replace(/\+/g, '-').replace(/\//g, '_');
}
function base64urlToBytes(str) {
  // XXX TODO: try to use something constant-time, in case calling code
  // uses it to decode secrets?
  str = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
  var bytes = new Uint8Array(str.length);

  for (var i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }

  return bytes;
}
function bytesAreEqual(v1, v2) {
  assertIsBytes(v1);
  assertIsBytes(v2);

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
      if (pos < 0) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
      }

      if (pos > this.length()) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
      }

      this._pos = pos;
    }
  }, {
    key: "incr",
    value: function incr(offset) {
      this.seek(this._pos + offset);
    }
  }]);

  return BufferWithPointer;
}(); // The `BufferReader` class helps you read structured data from a byte array.
// It offers methods for reading both primitive values, and the variable-length
// vector structures defined in https://tools.ietf.org/html/rfc8446#section-3.4.
//
// Such vectors are represented as a length followed by the concatenated
// bytes of each item, and the size of the length field is determined by
// the maximum allowed number of bytes in the vector.  For example
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
// The various `read` will throw `DECODE_ERROR` if you attempt to read path
// the end of the buffer, or past the end of a variable-length list.
//


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
      // This avoids copies by returning a view onto the existing buffer.
      var start = this._buffer.byteOffset + this.tell();
      this.incr(length);
      return new Uint8Array(this._buffer.buffer, start, length);
    }
  }, {
    key: "_rangeErrorToAlert",
    value: function _rangeErrorToAlert(cb) {
      try {
        return cb(this);
      } catch (err) {
        if (err instanceof RangeError) {
          throw new alerts_TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
        }

        throw err;
      }
    }
  }, {
    key: "readUint8",
    value: function readUint8() {
      var _this = this;

      return this._rangeErrorToAlert(function () {
        var n = _this._dataview.getUint8(_this._pos);

        _this.incr(1);

        return n;
      });
    }
  }, {
    key: "readUint16",
    value: function readUint16() {
      var _this2 = this;

      return this._rangeErrorToAlert(function () {
        var n = _this2._dataview.getUint16(_this2._pos);

        _this2.incr(2);

        return n;
      });
    }
  }, {
    key: "readUint24",
    value: function readUint24() {
      var _this3 = this;

      return this._rangeErrorToAlert(function () {
        var n = _this3._dataview.getUint16(_this3._pos);

        n = n << 8 | _this3._dataview.getUint8(_this3._pos + 2);

        _this3.incr(3);

        return n;
      });
    }
  }, {
    key: "readUint32",
    value: function readUint32() {
      var _this4 = this;

      return this._rangeErrorToAlert(function () {
        var n = _this4._dataview.getUint32(_this4._pos);

        _this4.incr(4);

        return n;
      });
    }
  }, {
    key: "_readVector",
    value: function _readVector(length, cb) {
      var contentsBuf = new BufferReader(this.readBytes(length));
      var expectedEnd = this.tell(); // Keep calling the callback until we've consumed the expected number of bytes.

      var n = 0;

      while (contentsBuf.hasMoreBytes()) {
        var prevPos = contentsBuf.tell();
        cb(contentsBuf, n); // Check that the callback made forward progress, otherwise we'll infinite loop.

        if (contentsBuf.tell() <= prevPos) {
          throw new alerts_TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
        }

        n += 1;
      } // Check that the callback correctly consumed the vector's entire contents.


      if (this.tell() !== expectedEnd) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
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
    key: "readVectorBytes8",
    value: function readVectorBytes8() {
      return this.readBytes(this.readUint8());
    }
  }, {
    key: "readVectorBytes16",
    value: function readVectorBytes16() {
      return this.readBytes(this.readUint16());
    }
  }, {
    key: "readVectorBytes24",
    value: function readVectorBytes24() {
      return this.readBytes(this.readUint24());
    }
  }]);

  return BufferReader;
}(utils_BufferWithPointer);
var utils_BufferWriter =
/*#__PURE__*/
function (_BufferWithPointer2) {
  inherits_default()(BufferWriter, _BufferWithPointer2);

  function BufferWriter() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1024;

    classCallCheck_default()(this, BufferWriter);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(BufferWriter).call(this, new Uint8Array(size)));
  }

  createClass_default()(BufferWriter, [{
    key: "_maybeGrow",
    value: function _maybeGrow(n) {
      var curSize = this._buffer.byteLength;
      var newPos = this._pos + n;
      var shortfall = newPos - curSize;

      if (shortfall > 0) {
        // Classic grow-by-doubling, up to 4kB max increment.
        // This formula was not arrived at by any particular science.
        var incr = Math.min(curSize, 4 * 1024);
        var newbuf = new Uint8Array(curSize + Math.ceil(shortfall / incr) * incr);
        newbuf.set(this._buffer, 0);
        this._buffer = newbuf;
        this._dataview = new DataView(newbuf.buffer, newbuf.byteOffset, newbuf.byteLength);
      }
    }
  }, {
    key: "slice",
    value: function slice() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.tell();

      if (end < 0) {
        end = this.tell() + end;
      }

      if (start < 0) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
      }

      if (end < 0) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
      }

      if (end > this.length()) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
      }

      return this._buffer.slice(start, end);
    }
  }, {
    key: "flush",
    value: function flush() {
      var slice = this.slice();
      this.seek(0);
      return slice;
    }
  }, {
    key: "writeBytes",
    value: function writeBytes(data) {
      this._maybeGrow(data.byteLength);

      this._buffer.set(data, this.tell());

      this.incr(data.byteLength);
    }
  }, {
    key: "writeUint8",
    value: function writeUint8(n) {
      this._maybeGrow(1);

      this._dataview.setUint8(this._pos, n);

      this.incr(1);
    }
  }, {
    key: "writeUint16",
    value: function writeUint16(n) {
      this._maybeGrow(2);

      this._dataview.setUint16(this._pos, n);

      this.incr(2);
    }
  }, {
    key: "writeUint24",
    value: function writeUint24(n) {
      this._maybeGrow(3);

      this._dataview.setUint16(this._pos, n >> 8);

      this._dataview.setUint8(this._pos + 2, n & 0xFF);

      this.incr(3);
    }
  }, {
    key: "writeUint32",
    value: function writeUint32(n) {
      this._maybeGrow(4);

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

      if (length >= maxLength) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
      } // Backfill the actual length field.


      this.seek(lengthPos);
      writeLength(length);
      this.incr(length);
      return length;
    }
  }, {
    key: "writeVector8",
    value: function writeVector8(cb) {
      var _this5 = this;

      return this._writeVector(Math.pow(2, 8), function (len) {
        return _this5.writeUint8(len);
      }, cb);
    }
  }, {
    key: "writeVector16",
    value: function writeVector16(cb) {
      var _this6 = this;

      return this._writeVector(Math.pow(2, 16), function (len) {
        return _this6.writeUint16(len);
      }, cb);
    }
  }, {
    key: "writeVector24",
    value: function writeVector24(cb) {
      var _this7 = this;

      return this._writeVector(Math.pow(2, 24), function (len) {
        return _this7.writeUint24(len);
      }, cb);
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
// This file implements the AEAD encrypt/decrypt and hashing routines
// for the TLS_AES_128_GCM_SHA256 ciphersuite. They are (thankfully)
// fairly light-weight wrappers around what's available via the WebCrypto
// API.
//


var AEAD_SIZE_INFLATION = 16;
var KEY_LENGTH = 16;
var IV_LENGTH = 12;
var HASH_LENGTH = 32;
function prepareKey(_x, _x2) {
  return _prepareKey.apply(this, arguments);
}

function _prepareKey() {
  _prepareKey = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee(key, mode) {
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", crypto.subtle.importKey('raw', key, {
              name: 'AES-GCM'
            }, false, [mode]));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _prepareKey.apply(this, arguments);
}

function crypto_encrypt(_x3, _x4, _x5, _x6) {
  return _encrypt.apply(this, arguments);
}

function _encrypt() {
  _encrypt = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee2(key, iv, plaintext, additionalData) {
    var ciphertext;
    return regenerator_default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return crypto.subtle.encrypt({
              additionalData: additionalData,
              iv: iv,
              name: 'AES-GCM',
              tagLength: AEAD_SIZE_INFLATION * 8
            }, key, plaintext);

          case 2:
            ciphertext = _context2.sent;
            return _context2.abrupt("return", new Uint8Array(ciphertext));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _encrypt.apply(this, arguments);
}

function crypto_decrypt(_x7, _x8, _x9, _x10) {
  return _decrypt.apply(this, arguments);
}

function _decrypt() {
  _decrypt = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee3(key, iv, ciphertext, additionalData) {
    var plaintext;
    return regenerator_default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return crypto.subtle.decrypt({
              additionalData: additionalData,
              iv: iv,
              name: 'AES-GCM',
              tagLength: AEAD_SIZE_INFLATION * 8
            }, key, ciphertext);

          case 3:
            plaintext = _context3.sent;
            return _context3.abrupt("return", new Uint8Array(plaintext));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            throw new alerts_TLSError(ALERT_DESCRIPTION.BAD_RECORD_MAC);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 7]]);
  }));
  return _decrypt.apply(this, arguments);
}

function hash(_x11) {
  return _hash.apply(this, arguments);
}

function _hash() {
  _hash = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee4(message) {
    return regenerator_default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = Uint8Array;
            _context4.next = 3;
            return crypto.subtle.digest({
              name: 'SHA-256'
            }, message);

          case 3:
            _context4.t1 = _context4.sent;
            return _context4.abrupt("return", new _context4.t0(_context4.t1));

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _hash.apply(this, arguments);
}

function hmac(_x12, _x13) {
  return _hmac.apply(this, arguments);
}

function _hmac() {
  _hmac = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee5(keyBytes, message) {
    var key, sig;
    return regenerator_default.a.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return crypto.subtle.importKey('raw', keyBytes, {
              hash: {
                name: 'SHA-256'
              },
              name: 'HMAC'
            }, false, ['sign']);

          case 2:
            key = _context5.sent;
            _context5.next = 5;
            return crypto.subtle.sign({
              name: 'HMAC'
            }, key, message);

          case 5:
            sig = _context5.sent;
            return _context5.abrupt("return", new Uint8Array(sig));

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return _hmac.apply(this, arguments);
}

function verifyHmac(_x14, _x15, _x16) {
  return _verifyHmac.apply(this, arguments);
}

function _verifyHmac() {
  _verifyHmac = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee6(keyBytes, signature, message) {
    var key;
    return regenerator_default.a.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return crypto.subtle.importKey('raw', keyBytes, {
              hash: {
                name: 'SHA-256'
              },
              name: 'HMAC'
            }, false, ['verify']);

          case 2:
            key = _context6.sent;
            _context6.next = 5;
            return crypto.subtle.verify({
              name: 'HMAC'
            }, key, signature, message);

          case 5:
            if (_context6.sent) {
              _context6.next = 7;
              break;
            }

            throw new alerts_TLSError(ALERT_DESCRIPTION.DECRYPT_ERROR);

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));
  return _verifyHmac.apply(this, arguments);
}

function hkdfExtract(_x17, _x18) {
  return _hkdfExtract.apply(this, arguments);
}

function _hkdfExtract() {
  _hkdfExtract = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee7(salt, ikm) {
    return regenerator_default.a.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return hmac(salt, ikm);

          case 2:
            return _context7.abrupt("return", _context7.sent);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));
  return _hkdfExtract.apply(this, arguments);
}

function hkdfExpand(_x19, _x20, _x21) {
  return _hkdfExpand.apply(this, arguments);
}

function _hkdfExpand() {
  _hkdfExpand = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee8(prk, info, length) {
    var N, input, output, T, i;
    return regenerator_default.a.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            // Ref https://tools.ietf.org/html/rfc5869#section-2.3
            N = Math.ceil(length / HASH_LENGTH);

            if (!(N <= 0)) {
              _context8.next = 3;
              break;
            }

            throw new alerts_TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);

          case 3:
            if (!(N >= 255)) {
              _context8.next = 5;
              break;
            }

            throw new alerts_TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);

          case 5:
            input = new utils_BufferWriter();
            output = new utils_BufferWriter();
            T = new Uint8Array(0);
            i = 1;

          case 9:
            if (!(i <= N)) {
              _context8.next = 20;
              break;
            }

            input.writeBytes(T);
            input.writeBytes(info);
            input.writeUint8(i);
            _context8.next = 15;
            return hmac(prk, input.flush());

          case 15:
            T = _context8.sent;
            output.writeBytes(T);

          case 17:
            i++;
            _context8.next = 9;
            break;

          case 20:
            return _context8.abrupt("return", output.slice(0, length));

          case 21:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));
  return _hkdfExpand.apply(this, arguments);
}

function hkdfExpandLabel(_x22, _x23, _x24, _x25) {
  return _hkdfExpandLabel.apply(this, arguments);
}

function _hkdfExpandLabel() {
  _hkdfExpandLabel = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee9(secret, label, context, length) {
    var hkdfLabel;
    return regenerator_default.a.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            //  struct {
            //    uint16 length = Length;
            //    opaque label < 7..255 > = "tls13 " + Label;
            //    opaque context < 0..255 > = Context;
            //  } HkdfLabel;
            hkdfLabel = new utils_BufferWriter();
            hkdfLabel.writeUint16(length);
            hkdfLabel.writeVectorBytes8(utf8ToBytes('tls13 ' + label));
            hkdfLabel.writeVectorBytes8(context);
            return _context9.abrupt("return", hkdfExpand(secret, hkdfLabel.flush(), length));

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));
  return _hkdfExpandLabel.apply(this, arguments);
}

function getRandomBytes(_x26) {
  return _getRandomBytes.apply(this, arguments);
}

function _getRandomBytes() {
  _getRandomBytes = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee10(size) {
    var bytes;
    return regenerator_default.a.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            bytes = new Uint8Array(size);
            crypto.getRandomValues(bytes);
            return _context10.abrupt("return", bytes);

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));
  return _getRandomBytes.apply(this, arguments);
}
// CONCATENATED MODULE: ./src/extensions.js






/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
//
// Extension parsing.
//
// This file contains some helpers for reading/writing the various kinds
// of Extension that might appear in a HandshakeMessage.
//
// "Extensions" are how TLS signals the presence of particular bits of optional
// functionality in the protocol. Lots of parts of TLS1.3 that don't seem like
// they're optional are implemented in terms of an extension, IIUC because that's
// what was needed for a clean deployment in amongst earlier versions of the protocol.
//



/* eslint-disable sorting/sort-object-props */

var EXTENSION_TYPE = {
  PRE_SHARED_KEY: 41,
  SUPPORTED_VERSIONS: 43,
  PSK_KEY_EXCHANGE_MODES: 45
};
/* eslint-enable sorting/sort-object-props */
// Base class for generic reading/writing of extensions,
// which are all uniformly formatted as:
//
//   struct {
//     ExtensionType extension_type;
//     opaque extension_data<0..2^16-1>;
//   } Extension;
//
// Extensions always appear inside of a handshake message,
// and their internal structure may differ based on the
// type of that message.

var extensions_Extension =
/*#__PURE__*/
function () {
  function Extension() {
    classCallCheck_default()(this, Extension);
  }

  createClass_default()(Extension, [{
    key: "write",
    value: function write(messageType, buf) {
      var _this = this;

      buf.writeUint16(this.TYPE_TAG);
      buf.writeVector16(function (buf) {
        _this._write(messageType, buf);
      });
    }
  }, {
    key: "TYPE_TAG",
    get: function get() {
      throw new Error('not implemented');
    }
  }], [{
    key: "read",
    value: function read(messageType, buf) {
      var type = buf.readUint16();
      var ext = {
        TYPE_TAG: type
      };
      buf.readVector16(function (buf) {
        switch (type) {
          case EXTENSION_TYPE.PRE_SHARED_KEY:
            ext = extensions_PreSharedKeyExtension._read(messageType, buf);
            break;

          case EXTENSION_TYPE.SUPPORTED_VERSIONS:
            ext = extensions_SupportedVersionsExtension._read(messageType, buf);
            break;

          case EXTENSION_TYPE.PSK_KEY_EXCHANGE_MODES:
            ext = extensions_PskKeyExchangeModesExtension._read(messageType, buf);
            break;

          default:
            // Skip over unrecognised extensions.
            buf.incr(buf.length());
        }

        if (buf.hasMoreBytes()) {
          throw new alerts_TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
        }
      });
      return ext;
    }
  }, {
    key: "_read",
    value: function _read(messageType, buf) {
      throw new Error('not implemented');
    }
  }, {
    key: "_write",
    value: function _write(messageType, buf) {
      throw new Error('not implemented');
    }
  }]);

  return Extension;
}(); // The PreSharedKey extension:
//
//  struct {
//    opaque identity<1..2^16-1>;
//    uint32 obfuscated_ticket_age;
//  } PskIdentity;
//  opaque PskBinderEntry<32..255>;
//  struct {
//    PskIdentity identities<7..2^16-1>;
//    PskBinderEntry binders<33..2^16-1>;
//  } OfferedPsks;
//  struct {
//    select(Handshake.msg_type) {
//      case client_hello: OfferedPsks;
//      case server_hello: uint16 selected_identity;
//    };
//  } PreSharedKeyExtension;

var extensions_PreSharedKeyExtension =
/*#__PURE__*/
function (_Extension) {
  inherits_default()(PreSharedKeyExtension, _Extension);

  function PreSharedKeyExtension(identities, binders, selectedIdentity) {
    var _this2;

    classCallCheck_default()(this, PreSharedKeyExtension);

    _this2 = possibleConstructorReturn_default()(this, getPrototypeOf_default()(PreSharedKeyExtension).call(this));
    _this2.identities = identities;
    _this2.binders = binders;
    _this2.selectedIdentity = selectedIdentity;
    return _this2;
  }

  createClass_default()(PreSharedKeyExtension, [{
    key: "_write",
    value: function _write(messageType, buf) {
      var _this3 = this;

      switch (messageType) {
        case HANDSHAKE_TYPE.CLIENT_HELLO:
          buf.writeVector16(function (buf) {
            _this3.identities.forEach(function (pskId) {
              buf.writeVectorBytes16(pskId);
              buf.writeUint32(0); // Zero for "tag age" field.
            });
          });
          buf.writeVector16(function (buf) {
            _this3.binders.forEach(function (pskBinder) {
              buf.writeVectorBytes8(pskBinder);
            });
          });
          break;

        case HANDSHAKE_TYPE.SERVER_HELLO:
          buf.writeUint16(this.selectedIdentity);
          break;

        default:
          throw new alerts_TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
      }
    }
  }, {
    key: "TYPE_TAG",
    get: function get() {
      return EXTENSION_TYPE.PRE_SHARED_KEY;
    }
  }], [{
    key: "_read",
    value: function _read(messageType, buf) {
      var identities = null,
          binders = null,
          selectedIdentity = null;

      switch (messageType) {
        case HANDSHAKE_TYPE.CLIENT_HELLO:
          identities = [];
          binders = [];
          buf.readVector16(function (buf) {
            var identity = buf.readVectorBytes16();
            buf.readBytes(4); // Skip over the ticket age.

            identities.push(identity);
          });
          buf.readVector16(function (buf) {
            var binder = buf.readVectorBytes8();

            if (binder.byteLength < HASH_LENGTH) {
              throw new alerts_TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
            }

            binders.push(binder);
          });

          if (identities.length !== binders.length) {
            throw new alerts_TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
          }

          break;

        case HANDSHAKE_TYPE.SERVER_HELLO:
          selectedIdentity = buf.readUint16();
          break;

        default:
          throw new alerts_TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
      }

      return new this(identities, binders, selectedIdentity);
    }
  }]);

  return PreSharedKeyExtension;
}(extensions_Extension); // The SupportedVersions extension:
//
//  struct {
//    select(Handshake.msg_type) {
//      case client_hello:
//        ProtocolVersion versions < 2..254 >;
//      case server_hello:
//        ProtocolVersion selected_version;
//    };
//  } SupportedVersions;

var extensions_SupportedVersionsExtension =
/*#__PURE__*/
function (_Extension2) {
  inherits_default()(SupportedVersionsExtension, _Extension2);

  function SupportedVersionsExtension(versions, selectedVersion) {
    var _this4;

    classCallCheck_default()(this, SupportedVersionsExtension);

    _this4 = possibleConstructorReturn_default()(this, getPrototypeOf_default()(SupportedVersionsExtension).call(this));
    _this4.versions = versions;
    _this4.selectedVersion = selectedVersion;
    return _this4;
  }

  createClass_default()(SupportedVersionsExtension, [{
    key: "_write",
    value: function _write(messageType, buf) {
      var _this5 = this;

      switch (messageType) {
        case HANDSHAKE_TYPE.CLIENT_HELLO:
          buf.writeVector8(function (buf) {
            _this5.versions.forEach(function (version) {
              buf.writeUint16(version);
            });
          });
          break;

        case HANDSHAKE_TYPE.SERVER_HELLO:
          buf.writeUint16(this.selectedVersion);
          break;

        default:
          throw new alerts_TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
      }
    }
  }, {
    key: "TYPE_TAG",
    get: function get() {
      return EXTENSION_TYPE.SUPPORTED_VERSIONS;
    }
  }], [{
    key: "_read",
    value: function _read(messageType, buf) {
      var versions = null,
          selectedVersion = null;

      switch (messageType) {
        case HANDSHAKE_TYPE.CLIENT_HELLO:
          versions = [];
          buf.readVector8(function (buf) {
            versions.push(buf.readUint16());
          });
          break;

        case HANDSHAKE_TYPE.SERVER_HELLO:
          selectedVersion = buf.readUint16();
          break;

        default:
          throw new alerts_TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
      }

      return new this(versions, selectedVersion);
    }
  }]);

  return SupportedVersionsExtension;
}(extensions_Extension);
var extensions_PskKeyExchangeModesExtension =
/*#__PURE__*/
function (_Extension3) {
  inherits_default()(PskKeyExchangeModesExtension, _Extension3);

  function PskKeyExchangeModesExtension(modes) {
    var _this6;

    classCallCheck_default()(this, PskKeyExchangeModesExtension);

    _this6 = possibleConstructorReturn_default()(this, getPrototypeOf_default()(PskKeyExchangeModesExtension).call(this));
    _this6.modes = modes;
    return _this6;
  }

  createClass_default()(PskKeyExchangeModesExtension, [{
    key: "_write",
    value: function _write(messageType, buf) {
      var _this7 = this;

      switch (messageType) {
        case HANDSHAKE_TYPE.CLIENT_HELLO:
          buf.writeVector8(function (buf) {
            _this7.modes.forEach(function (mode) {
              buf.writeUint8(mode);
            });
          });
          break;

        default:
          throw new alerts_TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
      }
    }
  }, {
    key: "TYPE_TAG",
    get: function get() {
      return EXTENSION_TYPE.PSK_KEY_EXCHANGE_MODES;
    }
  }], [{
    key: "_read",
    value: function _read(messageType, buf) {
      var modes = [];

      switch (messageType) {
        case HANDSHAKE_TYPE.CLIENT_HELLO:
          buf.readVector8(function (buf) {
            modes.push(buf.readUint8());
          });
          break;

        default:
          throw new alerts_TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
      }

      return new this(modes);
    }
  }]);

  return PskKeyExchangeModesExtension;
}(extensions_Extension);
// CONCATENATED MODULE: ./src/constants.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
var VERSION_TLS_1_0 = 0x0301;
var VERSION_TLS_1_2 = 0x0303;
var VERSION_TLS_1_3 = 0x0304;
var TLS_AES_128_GCM_SHA256 = 0x1301;
var PSK_MODE_KE = 0;
// CONCATENATED MODULE: ./src/messages.js






/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
//
// Message parsing.
//
// Herein we have code for reading and writing the various Handshake
// messages involved in the TLS protocol.
//





/* eslint-disable sorting/sort-object-props */

var HANDSHAKE_TYPE = {
  CLIENT_HELLO: 1,
  SERVER_HELLO: 2,
  NEW_SESSION_TICKET: 4,
  ENCRYPTED_EXTENSIONS: 8,
  FINISHED: 20
};
/* eslint-enable sorting/sort-object-props */
// Base class for generic reading/writing of handshake messages,
// which are all uniformly formatted as:
//
//  struct {
//    HandshakeType msg_type;    /* handshake type */
//    uint24 length;             /* bytes in message */
//    select(Handshake.msg_type) {
//        ... type specific cases here ...
//    };
//  } Handshake;

var messages_HandshakeMessage =
/*#__PURE__*/
function () {
  function HandshakeMessage() {
    classCallCheck_default()(this, HandshakeMessage);
  }

  createClass_default()(HandshakeMessage, [{
    key: "toBytes",
    value: function toBytes() {
      var buf = new utils_BufferWriter();
      this.write(buf);
      return buf.flush();
    }
  }, {
    key: "write",
    value: function write(buf) {
      var _this = this;

      buf.writeUint8(this.TYPE_TAG);
      buf.writeVector24(function (buf) {
        _this._write(buf);
      });
    }
  }, {
    key: "_write",
    value: function _write(buf) {
      throw new Error('not implemented');
    } // Some little helpers for reading a list of extensions,
    // which is uniformly represented as:
    //
    //   Extension extensions<8..2^16-1>;
    //
    // Recognized extensions are returned as a Map from extension type
    // to extension data object, with a special `lastSeenExtension`
    // property to make it easy to check which one came last.

  }, {
    key: "_writeExtensions",
    value: function _writeExtensions(buf, extensions) {
      var _this2 = this;

      buf.writeVector16(function (buf) {
        extensions.forEach(function (ext) {
          ext.write(_this2.TYPE_TAG, buf);
        });
      });
    }
  }, {
    key: "TYPE_TAG",
    get: function get() {
      throw new Error('not implemented');
    }
  }], [{
    key: "fromBytes",
    value: function fromBytes(bytes) {
      // Each handshake message has a type and length prefix, per
      // https://tools.ietf.org/html/rfc8446#appendix-B.3
      var buf = new utils_BufferReader(bytes);
      var msg = this.read(buf);

      if (buf.hasMoreBytes()) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
      }

      return msg;
    }
  }, {
    key: "read",
    value: function read(buf) {
      var type = buf.readUint8();
      var msg = null;
      buf.readVector24(function (buf) {
        switch (type) {
          case HANDSHAKE_TYPE.CLIENT_HELLO:
            msg = messages_ClientHello._read(buf);
            break;

          case HANDSHAKE_TYPE.SERVER_HELLO:
            msg = messages_ServerHello._read(buf);
            break;

          case HANDSHAKE_TYPE.NEW_SESSION_TICKET:
            msg = messages_NewSessionTicket._read(buf);
            break;

          case HANDSHAKE_TYPE.ENCRYPTED_EXTENSIONS:
            msg = messages_EncryptedExtensions._read(buf);
            break;

          case HANDSHAKE_TYPE.FINISHED:
            msg = messages_Finished._read(buf);
            break;
        }

        if (buf.hasMoreBytes()) {
          throw new alerts_TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
        }
      });

      if (msg === null) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);
      }

      return msg;
    }
  }, {
    key: "_read",
    value: function _read(buf) {
      throw new Error('not implemented');
    }
  }, {
    key: "_readExtensions",
    value: function _readExtensions(messageType, buf) {
      var extensions = new Map();
      buf.readVector16(function (buf) {
        var ext = extensions_Extension.read(messageType, buf);

        if (extensions.has(ext.TYPE_TAG)) {
          throw new alerts_TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
        }

        extensions.set(ext.TYPE_TAG, ext);
        extensions.lastSeenExtension = ext.TYPE_TAG;
      });
      return extensions;
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

var messages_ClientHello =
/*#__PURE__*/
function (_HandshakeMessage) {
  inherits_default()(ClientHello, _HandshakeMessage);

  function ClientHello(random, sessionId, extensions) {
    var _this3;

    classCallCheck_default()(this, ClientHello);

    _this3 = possibleConstructorReturn_default()(this, getPrototypeOf_default()(ClientHello).call(this));
    _this3.random = random;
    _this3.sessionId = sessionId;
    _this3.extensions = extensions;
    return _this3;
  }

  createClass_default()(ClientHello, [{
    key: "_write",
    value: function _write(buf) {
      buf.writeUint16(VERSION_TLS_1_2);
      buf.writeBytes(this.random);
      buf.writeVectorBytes8(this.sessionId); // Our single supported ciphersuite

      buf.writeVector16(function (buf) {
        buf.writeUint16(TLS_AES_128_GCM_SHA256);
      }); // A single zero byte for legacy_compression_methods

      buf.writeVectorBytes8(new Uint8Array(1));

      this._writeExtensions(buf, this.extensions);
    }
  }, {
    key: "TYPE_TAG",
    get: function get() {
      return HANDSHAKE_TYPE.CLIENT_HELLO;
    }
  }], [{
    key: "_read",
    value: function _read(buf) {
      // The legacy_version field may indicate an earlier version of TLS
      // for backwards compatibility, but must not predate TLS 1.0!
      if (buf.readUint16() < VERSION_TLS_1_0) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.PROTOCOL_VERSION);
      } // The random bytes provided by the peer.


      var random = buf.readBytes(32); // Read legacy_session_id, so the server can echo it.

      var sessionId = buf.readVectorBytes8(); // We only support a single ciphersuite, but the peer may offer several.
      // Scan the list to confirm that the one we want is present.

      var found = false;
      buf.readVector16(function (buf) {
        var cipherSuite = buf.readUint16();

        if (cipherSuite === TLS_AES_128_GCM_SHA256) {
          found = true;
        }
      });

      if (!found) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.HANDSHAKE_FAILURE);
      } // legacy_compression_methods must be a single zero byte for TLS1.3 ClientHellos.
      // It can be non-zero in previous versions of TLS, but we're not going to
      // make a successful handshake with such versions, so better to just bail out now.


      var legacyCompressionMethods = buf.readVectorBytes8();

      if (legacyCompressionMethods.byteLength !== 1) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
      }

      if (legacyCompressionMethods[0] !== 0x00) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
      } // Read and check the extensions.


      var extensions = this._readExtensions(HANDSHAKE_TYPE.CLIENT_HELLO, buf);

      if (!extensions.has(EXTENSION_TYPE.SUPPORTED_VERSIONS)) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.MISSING_EXTENSION);
      }

      if (extensions.get(EXTENSION_TYPE.SUPPORTED_VERSIONS).versions.indexOf(VERSION_TLS_1_3) === -1) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.PROTOCOL_VERSION);
      } // Was the PreSharedKey extension the last one?


      if (extensions.has(EXTENSION_TYPE.PRE_SHARED_KEY)) {
        if (extensions.lastSeenExtension !== EXTENSION_TYPE.PRE_SHARED_KEY) {
          throw new alerts_TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
        }
      }

      return new this(random, sessionId, extensions);
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

  function ServerHello(random, sessionId, extensions) {
    var _this4;

    classCallCheck_default()(this, ServerHello);

    _this4 = possibleConstructorReturn_default()(this, getPrototypeOf_default()(ServerHello).call(this));
    _this4.random = random;
    _this4.sessionId = sessionId;
    _this4.extensions = extensions;
    return _this4;
  }

  createClass_default()(ServerHello, [{
    key: "_write",
    value: function _write(buf) {
      buf.writeUint16(VERSION_TLS_1_2);
      buf.writeBytes(this.random);
      buf.writeVectorBytes8(this.sessionId); // Our single supported ciphersuite

      buf.writeUint16(TLS_AES_128_GCM_SHA256); // A single zero byte for legacy_compression_method

      buf.writeUint8(0);

      this._writeExtensions(buf, this.extensions);
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
      if (buf.readUint16() !== VERSION_TLS_1_2) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
      } // Random bytes from the server.


      var random = buf.readBytes(32); // It should have echoed our vector for legacy_session_id.

      var sessionId = buf.readVectorBytes8(); // It should have selected our single offered ciphersuite.

      if (buf.readUint16() !== TLS_AES_128_GCM_SHA256) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
      } // legacy_compression_method must be zero.


      if (buf.readUint8() !== 0) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
      }

      var extensions = this._readExtensions(HANDSHAKE_TYPE.SERVER_HELLO, buf);

      if (!extensions.has(EXTENSION_TYPE.SUPPORTED_VERSIONS)) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.MISSING_EXTENSION);
      }

      if (extensions.get(EXTENSION_TYPE.SUPPORTED_VERSIONS).selectedVersion !== VERSION_TLS_1_3) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);
      }

      return new this(random, sessionId, extensions);
    }
  }]);

  return ServerHello;
}(messages_HandshakeMessage); // The EncryptedExtensions message:
//
//  struct {
//    Extension extensions < 0..2 ^ 16 - 1 >;
//  } EncryptedExtensions;
//
// We don't actually send any EncryptedExtensions,
// but still have to send an empty message.

var messages_EncryptedExtensions =
/*#__PURE__*/
function (_HandshakeMessage3) {
  inherits_default()(EncryptedExtensions, _HandshakeMessage3);

  function EncryptedExtensions(extensions) {
    var _this5;

    classCallCheck_default()(this, EncryptedExtensions);

    _this5 = possibleConstructorReturn_default()(this, getPrototypeOf_default()(EncryptedExtensions).call(this));
    _this5.extensions = extensions;
    return _this5;
  }

  createClass_default()(EncryptedExtensions, [{
    key: "_write",
    value: function _write(buf) {
      this._writeExtensions(buf, this.extensions);
    }
  }, {
    key: "TYPE_TAG",
    get: function get() {
      return HANDSHAKE_TYPE.ENCRYPTED_EXTENSIONS;
    }
  }], [{
    key: "_read",
    value: function _read(buf) {
      var extensions = this._readExtensions(HANDSHAKE_TYPE.ENCRYPTED_EXTENSIONS, buf);

      return new this(extensions);
    }
  }]);

  return EncryptedExtensions;
}(messages_HandshakeMessage); // The Finished message:
//
// struct {
//   opaque verify_data[Hash.length];
// } Finished;

var messages_Finished =
/*#__PURE__*/
function (_HandshakeMessage4) {
  inherits_default()(Finished, _HandshakeMessage4);

  function Finished(verifyData) {
    var _this6;

    classCallCheck_default()(this, Finished);

    _this6 = possibleConstructorReturn_default()(this, getPrototypeOf_default()(Finished).call(this));
    _this6.verifyData = verifyData;
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
}(messages_HandshakeMessage); // The NewSessionTicket message:
//
//   struct {
//    uint32 ticket_lifetime;
//    uint32 ticket_age_add;
//    opaque ticket_nonce < 0..255 >;
//    opaque ticket < 1..2 ^ 16 - 1 >;
//    Extension extensions < 0..2 ^ 16 - 2 >;
//  } NewSessionTicket;
//
// We don't actually make use of these, but we need to be able
// to accept them and do basic validation.

var messages_NewSessionTicket =
/*#__PURE__*/
function (_HandshakeMessage5) {
  inherits_default()(NewSessionTicket, _HandshakeMessage5);

  function NewSessionTicket(ticketLifetime, ticketAgeAdd, ticketNonce, ticket, extensions) {
    var _this7;

    classCallCheck_default()(this, NewSessionTicket);

    _this7 = possibleConstructorReturn_default()(this, getPrototypeOf_default()(NewSessionTicket).call(this));
    _this7.ticketLifetime = ticketLifetime;
    _this7.ticketAgeAdd = ticketAgeAdd;
    _this7.ticketNonce = ticketNonce;
    _this7.ticket = ticket;
    _this7.extensions = extensions;
    return _this7;
  }

  createClass_default()(NewSessionTicket, [{
    key: "_write",
    value: function _write(buf) {
      buf.writeUint32(this.ticketLifetime);
      buf.writeUint32(this.ticketAgeAdd);
      buf.writeVectorBytes8(this.ticketNonce);
      buf.writeVectorBytes16(this.ticket);

      this._writeExtensions(buf, this.extensions);
    }
  }, {
    key: "TYPE_TAG",
    get: function get() {
      return HANDSHAKE_TYPE.NEW_SESSION_TICKET;
    }
  }], [{
    key: "_read",
    value: function _read(buf) {
      var ticketLifetime = buf.readUint32();
      var ticketAgeAdd = buf.readUint32();
      var ticketNonce = buf.readVectorBytes8();
      var ticket = buf.readVectorBytes16();

      if (ticket.byteLength < 1) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.DECODE_ERROR);
      }

      var extensions = this._readExtensions(HANDSHAKE_TYPE.NEW_SESSION_TICKET, buf);

      return new this(ticketLifetime, ticketAgeAdd, ticketNonce, ticket, extensions);
    }
  }]);

  return NewSessionTicket;
}(messages_HandshakeMessage);
// CONCATENATED MODULE: ./src/states.js








/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */





 //
// State-machine for TLS Handshake Management.
//
// Internally, we manage the TLS connection by explicitly modelling the
// client and server state-machines from RFC8446.  You can think of
// these `State` objects as little plugins for the `Connection` class
// that provide different behaviours of `send` and `receive` depending
// on the state of the connection.
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
      regenerator_default.a.mark(function _callee2(bytes) {
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                throw new alerts_TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);

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
      regenerator_default.a.mark(function _callee3(bytes) {
        return regenerator_default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                throw new alerts_TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function recvApplicationData(_x2) {
        return _recvApplicationData.apply(this, arguments);
      }

      return recvApplicationData;
    }()
  }, {
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee4(msg) {
        return regenerator_default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                throw new alerts_TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function recvHandshakeMessage(_x3) {
        return _recvHandshakeMessage.apply(this, arguments);
      }

      return recvHandshakeMessage;
    }()
  }, {
    key: "recvAlertMessage",
    value: function () {
      var _recvAlertMessage = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee5(alert) {
        return regenerator_default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.t0 = alert.description;
                _context5.next = _context5.t0 === ALERT_DESCRIPTION.CLOSE_NOTIFY ? 3 : 5;
                break;

              case 3:
                this.conn._closeForRecv(alert);

                throw alert;

              case 5:
                _context5.next = 7;
                return this.handleErrorAndRethrow(alert);

              case 7:
                return _context5.abrupt("return", _context5.sent);

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function recvAlertMessage(_x4) {
        return _recvAlertMessage.apply(this, arguments);
      }

      return recvAlertMessage;
    }()
  }, {
    key: "recvChangeCipherSpec",
    value: function () {
      var _recvChangeCipherSpec = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee6(bytes) {
        return regenerator_default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                throw new alerts_TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function recvChangeCipherSpec(_x5) {
        return _recvChangeCipherSpec.apply(this, arguments);
      }

      return recvChangeCipherSpec;
    }()
  }, {
    key: "handleErrorAndRethrow",
    value: function () {
      var _handleErrorAndRethrow = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee7(err) {
        var alert;
        return regenerator_default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                alert = err;

                if (!(alert instanceof alerts_TLSAlert)) {
                  alert = new alerts_TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
                } // Try to send error alert to the peer, but we may not
                // be able to if the outgoing connection was already closed.


                _context7.prev = 2;
                _context7.next = 5;
                return this.conn._sendAlertMessage(alert);

              case 5:
                _context7.next = 9;
                break;

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7["catch"](2);

              case 9:
                _context7.next = 11;
                return this.conn._transition(states_ERROR, err);

              case 11:
                throw err;

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[2, 7]]);
      }));

      function handleErrorAndRethrow(_x6) {
        return _handleErrorAndRethrow.apply(this, arguments);
      }

      return handleErrorAndRethrow;
    }()
  }, {
    key: "close",
    value: function () {
      var _close = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee8() {
        var alert;
        return regenerator_default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                alert = new alerts_TLSCloseNotify();
                _context8.next = 3;
                return this.conn._sendAlertMessage(alert);

              case 3:
                this.conn._closeForSend(alert);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
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
      regenerator_default.a.mark(function _callee9() {
        return regenerator_default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                throw new Error('uninitialized state');

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
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
      regenerator_default.a.mark(function _callee10(bytes) {
        return regenerator_default.a.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                throw new Error('uninitialized state');

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function sendApplicationData(_x7) {
        return _sendApplicationData2.apply(this, arguments);
      }

      return sendApplicationData;
    }()
  }, {
    key: "recvApplicationData",
    value: function () {
      var _recvApplicationData2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee11(bytes) {
        return regenerator_default.a.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                throw new Error('uninitialized state');

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function recvApplicationData(_x8) {
        return _recvApplicationData2.apply(this, arguments);
      }

      return recvApplicationData;
    }()
  }, {
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee12(msg) {
        return regenerator_default.a.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                throw new Error('uninitialized state');

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function recvHandshakeMessage(_x9) {
        return _recvHandshakeMessage2.apply(this, arguments);
      }

      return recvHandshakeMessage;
    }()
  }, {
    key: "recvChangeCipherSpec",
    value: function () {
      var _recvChangeCipherSpec2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee13(bytes) {
        return regenerator_default.a.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                throw new Error('uninitialized state');

              case 1:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function recvChangeCipherSpec(_x10) {
        return _recvChangeCipherSpec2.apply(this, arguments);
      }

      return recvChangeCipherSpec;
    }()
  }, {
    key: "handleErrorAndRethrow",
    value: function () {
      var _handleErrorAndRethrow2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee14(err) {
        return regenerator_default.a.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                throw err;

              case 1:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function handleErrorAndRethrow(_x11) {
        return _handleErrorAndRethrow2.apply(this, arguments);
      }

      return handleErrorAndRethrow;
    }()
  }, {
    key: "close",
    value: function () {
      var _close2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee15() {
        return regenerator_default.a.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                throw new Error('uninitialized state');

              case 1:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
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
      regenerator_default.a.mark(function _callee16(err) {
        return regenerator_default.a.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                this.error = err;

                this.conn._setConnectionFailure(err); // Unceremoniously shut down the record layer on error.


                this.conn._recordlayer.setSendError(err);

                this.conn._recordlayer.setRecvError(err);

              case 4:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function initialize(_x12) {
        return _initialize3.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "sendApplicationData",
    value: function () {
      var _sendApplicationData3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee17(bytes) {
        return regenerator_default.a.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                throw this.error;

              case 1:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function sendApplicationData(_x13) {
        return _sendApplicationData3.apply(this, arguments);
      }

      return sendApplicationData;
    }()
  }, {
    key: "recvApplicationData",
    value: function () {
      var _recvApplicationData3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee18(bytes) {
        return regenerator_default.a.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                throw this.error;

              case 1:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function recvApplicationData(_x14) {
        return _recvApplicationData3.apply(this, arguments);
      }

      return recvApplicationData;
    }()
  }, {
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee19(msg) {
        return regenerator_default.a.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                throw this.error;

              case 1:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function recvHandshakeMessage(_x15) {
        return _recvHandshakeMessage3.apply(this, arguments);
      }

      return recvHandshakeMessage;
    }()
  }, {
    key: "recvAlertMessage",
    value: function () {
      var _recvAlertMessage2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee20(err) {
        return regenerator_default.a.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                throw this.error;

              case 1:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function recvAlertMessage(_x16) {
        return _recvAlertMessage2.apply(this, arguments);
      }

      return recvAlertMessage;
    }()
  }, {
    key: "recvChangeCipherSpec",
    value: function () {
      var _recvChangeCipherSpec3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee21(bytes) {
        return regenerator_default.a.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                throw this.error;

              case 1:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function recvChangeCipherSpec(_x17) {
        return _recvChangeCipherSpec3.apply(this, arguments);
      }

      return recvChangeCipherSpec;
    }()
  }, {
    key: "handleErrorAndRethrow",
    value: function () {
      var _handleErrorAndRethrow3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee22(err) {
        return regenerator_default.a.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                throw err;

              case 1:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function handleErrorAndRethrow(_x18) {
        return _handleErrorAndRethrow3.apply(this, arguments);
      }

      return handleErrorAndRethrow;
    }()
  }, {
    key: "close",
    value: function () {
      var _close3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee23() {
        return regenerator_default.a.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                throw this.error;

              case 1:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function close() {
        return _close3.apply(this, arguments);
      }

      return close;
    }()
  }]);

  return ERROR;
}(states_State); // The "connected" state, for when the handshake is complete
// and we're ready to send application-level data.
// The logic for this is largely symmetric between client and server.

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
      regenerator_default.a.mark(function _callee24() {
        return regenerator_default.a.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                this.conn._setConnectionSuccess();

              case 1:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
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
      regenerator_default.a.mark(function _callee25(bytes) {
        return regenerator_default.a.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.next = 2;
                return this.conn._sendApplicationData(bytes);

              case 2:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function sendApplicationData(_x19) {
        return _sendApplicationData4.apply(this, arguments);
      }

      return sendApplicationData;
    }()
  }, {
    key: "recvApplicationData",
    value: function () {
      var _recvApplicationData4 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee26(bytes) {
        return regenerator_default.a.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                return _context26.abrupt("return", bytes);

              case 1:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      function recvApplicationData(_x20) {
        return _recvApplicationData4.apply(this, arguments);
      }

      return recvApplicationData;
    }()
  }, {
    key: "recvChangeCipherSpec",
    value: function () {
      var _recvChangeCipherSpec4 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee27(bytes) {
        return regenerator_default.a.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                throw new alerts_TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);

              case 1:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      function recvChangeCipherSpec(_x21) {
        return _recvChangeCipherSpec4.apply(this, arguments);
      }

      return recvChangeCipherSpec;
    }()
  }]);

  return CONNECTED;
}(states_State); // A base class for states that occur in the middle of the handshake
// (that is, between ClientHello and Finished).  These states may receive
// CHANGE_CIPHER_SPEC records for b/w compat reasons, which must contain
// exactly a single 0x01 byte and must otherwise be ignored.

var states_MidHandshakeState =
/*#__PURE__*/
function (_State4) {
  inherits_default()(MidHandshakeState, _State4);

  function MidHandshakeState() {
    classCallCheck_default()(this, MidHandshakeState);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(MidHandshakeState).apply(this, arguments));
  }

  createClass_default()(MidHandshakeState, [{
    key: "recvChangeCipherSpec",
    value: function () {
      var _recvChangeCipherSpec5 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee28(bytes) {
        return regenerator_default.a.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                if (!this.conn._hasSeenChangeCipherSpec) {
                  _context28.next = 2;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);

              case 2:
                if (!(bytes.byteLength !== 1 || bytes[0] !== 1)) {
                  _context28.next = 4;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);

              case 4:
                this.conn._hasSeenChangeCipherSpec = true;

              case 5:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      function recvChangeCipherSpec(_x22) {
        return _recvChangeCipherSpec5.apply(this, arguments);
      }

      return recvChangeCipherSpec;
    }()
  }]);

  return MidHandshakeState;
}(states_State); // These states implement (part of) the client state-machine from
// https://tools.ietf.org/html/rfc8446#appendix-A.1
//
// Since we're only implementing a small subset of TLS1.3,
// we only need a small subset of the handshake.  It basically goes:
//
//   * send ClientHello
//   * receive ServerHello
//   * receive EncryptedExtensions
//   * receive server Finished
//   * send client Finished
//
// We include some unused states for completeness, so that it's easier
// to check the implementation against the diagrams in the RFC.


var states_CLIENT_START =
/*#__PURE__*/
function (_State5) {
  inherits_default()(CLIENT_START, _State5);

  function CLIENT_START() {
    classCallCheck_default()(this, CLIENT_START);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(CLIENT_START).apply(this, arguments));
  }

  createClass_default()(CLIENT_START, [{
    key: "initialize",
    value: function () {
      var _initialize5 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee29() {
        var keyschedule, clientHello, buf, PSK_BINDERS_SIZE, truncatedTranscript, pskBinder;
        return regenerator_default.a.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                keyschedule = this.conn._keyschedule;
                _context29.next = 3;
                return keyschedule.addPSK(this.conn.psk);

              case 3:
                _context29.t0 = messages_ClientHello;
                _context29.next = 6;
                return getRandomBytes(32);

              case 6:
                _context29.t1 = _context29.sent;
                _context29.next = 9;
                return getRandomBytes(32);

              case 9:
                _context29.t2 = _context29.sent;
                _context29.t3 = [new extensions_SupportedVersionsExtension([VERSION_TLS_1_3]), new extensions_PskKeyExchangeModesExtension([PSK_MODE_KE]), new extensions_PreSharedKeyExtension([this.conn.pskId], [zeros(HASH_LENGTH)])];
                clientHello = new _context29.t0(_context29.t1, _context29.t2, _context29.t3);
                buf = new utils_BufferWriter();
                clientHello.write(buf); // Now that we know what the ClientHello looks like,
                // go back and calculate the appropriate PSK binder value.
                // We only support a single PSK, so the length of the binders field is the
                // length of the hash plus one for rendering it as a variable-length byte array,
                // plus two for rendering the variable-length list of PSK binders.

                PSK_BINDERS_SIZE = HASH_LENGTH + 1 + 2;
                truncatedTranscript = buf.slice(0, buf.tell() - PSK_BINDERS_SIZE);
                _context29.next = 18;
                return keyschedule.calculateFinishedMAC(keyschedule.extBinderKey, truncatedTranscript);

              case 18:
                pskBinder = _context29.sent;
                buf.incr(-HASH_LENGTH);
                buf.writeBytes(pskBinder);
                _context29.next = 23;
                return this.conn._sendHandshakeMessageBytes(buf.flush());

              case 23:
                _context29.next = 25;
                return this.conn._transition(states_CLIENT_WAIT_SH, clientHello.sessionId);

              case 25:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
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
function (_State6) {
  inherits_default()(CLIENT_WAIT_SH, _State6);

  function CLIENT_WAIT_SH() {
    classCallCheck_default()(this, CLIENT_WAIT_SH);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(CLIENT_WAIT_SH).apply(this, arguments));
  }

  createClass_default()(CLIENT_WAIT_SH, [{
    key: "initialize",
    value: function () {
      var _initialize6 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee30(sessionId) {
        return regenerator_default.a.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                this._sessionId = sessionId;

              case 1:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));

      function initialize(_x23) {
        return _initialize6.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage4 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee31(msg) {
        var pskExt;
        return regenerator_default.a.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                if (msg instanceof messages_ServerHello) {
                  _context31.next = 2;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);

              case 2:
                if (bytesAreEqual(msg.sessionId, this._sessionId)) {
                  _context31.next = 4;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);

              case 4:
                pskExt = msg.extensions.get(EXTENSION_TYPE.PRE_SHARED_KEY);

                if (pskExt) {
                  _context31.next = 7;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.MISSING_EXTENSION);

              case 7:
                if (!(msg.extensions.size !== 2)) {
                  _context31.next = 9;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.UNSUPPORTED_EXTENSION);

              case 9:
                if (!(pskExt.selectedIdentity !== 0)) {
                  _context31.next = 11;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.ILLEGAL_PARAMETER);

              case 11:
                _context31.next = 13;
                return this.conn._keyschedule.addECDHE(null);

              case 13:
                _context31.next = 15;
                return this.conn._setSendKey(this.conn._keyschedule.clientHandshakeTrafficSecret);

              case 15:
                _context31.next = 17;
                return this.conn._setRecvKey(this.conn._keyschedule.serverHandshakeTrafficSecret);

              case 17:
                _context31.next = 19;
                return this.conn._transition(states_CLIENT_WAIT_EE);

              case 19:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this);
      }));

      function recvHandshakeMessage(_x24) {
        return _recvHandshakeMessage4.apply(this, arguments);
      }

      return recvHandshakeMessage;
    }()
  }]);

  return CLIENT_WAIT_SH;
}(states_State);

var states_CLIENT_WAIT_EE =
/*#__PURE__*/
function (_MidHandshakeState) {
  inherits_default()(CLIENT_WAIT_EE, _MidHandshakeState);

  function CLIENT_WAIT_EE() {
    classCallCheck_default()(this, CLIENT_WAIT_EE);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(CLIENT_WAIT_EE).apply(this, arguments));
  }

  createClass_default()(CLIENT_WAIT_EE, [{
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage5 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee32(msg) {
        var keyschedule, serverFinishedTranscript;
        return regenerator_default.a.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                if (msg instanceof messages_EncryptedExtensions) {
                  _context32.next = 2;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);

              case 2:
                if (!(msg.extensions.size !== 0)) {
                  _context32.next = 4;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.UNSUPPORTED_EXTENSION);

              case 4:
                keyschedule = this.conn._keyschedule;
                serverFinishedTranscript = keyschedule.getTranscript();
                _context32.next = 8;
                return this.conn._transition(states_CLIENT_WAIT_FINISHED, serverFinishedTranscript);

              case 8:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, this);
      }));

      function recvHandshakeMessage(_x25) {
        return _recvHandshakeMessage5.apply(this, arguments);
      }

      return recvHandshakeMessage;
    }()
  }]);

  return CLIENT_WAIT_EE;
}(states_MidHandshakeState);

var states_CLIENT_WAIT_FINISHED =
/*#__PURE__*/
function (_State7) {
  inherits_default()(CLIENT_WAIT_FINISHED, _State7);

  function CLIENT_WAIT_FINISHED() {
    classCallCheck_default()(this, CLIENT_WAIT_FINISHED);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(CLIENT_WAIT_FINISHED).apply(this, arguments));
  }

  createClass_default()(CLIENT_WAIT_FINISHED, [{
    key: "initialize",
    value: function () {
      var _initialize7 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee33(serverFinishedTranscript) {
        return regenerator_default.a.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                this._serverFinishedTranscript = serverFinishedTranscript;

              case 1:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, this);
      }));

      function initialize(_x26) {
        return _initialize7.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage6 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee34(msg) {
        var keyschedule, clientFinishedMAC;
        return regenerator_default.a.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                if (msg instanceof messages_Finished) {
                  _context34.next = 2;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);

              case 2:
                // Verify server Finished MAC.
                keyschedule = this.conn._keyschedule;
                _context34.next = 5;
                return keyschedule.verifyFinishedMAC(keyschedule.serverHandshakeTrafficSecret, msg.verifyData, this._serverFinishedTranscript);

              case 5:
                _context34.next = 7;
                return keyschedule.calculateFinishedMAC(keyschedule.clientHandshakeTrafficSecret);

              case 7:
                clientFinishedMAC = _context34.sent;
                _context34.next = 10;
                return keyschedule.finalize();

              case 10:
                _context34.next = 12;
                return this.conn._sendHandshakeMessage(new messages_Finished(clientFinishedMAC));

              case 12:
                _context34.next = 14;
                return this.conn._setSendKey(keyschedule.clientApplicationTrafficSecret);

              case 14:
                _context34.next = 16;
                return this.conn._setRecvKey(keyschedule.serverApplicationTrafficSecret);

              case 16:
                _context34.next = 18;
                return this.conn._transition(states_CLIENT_CONNECTED);

              case 18:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, this);
      }));

      function recvHandshakeMessage(_x27) {
        return _recvHandshakeMessage6.apply(this, arguments);
      }

      return recvHandshakeMessage;
    }()
  }]);

  return CLIENT_WAIT_FINISHED;
}(states_State);

var states_CLIENT_CONNECTED =
/*#__PURE__*/
function (_CONNECTED) {
  inherits_default()(CLIENT_CONNECTED, _CONNECTED);

  function CLIENT_CONNECTED() {
    classCallCheck_default()(this, CLIENT_CONNECTED);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(CLIENT_CONNECTED).apply(this, arguments));
  }

  createClass_default()(CLIENT_CONNECTED, [{
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage7 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee35(msg) {
        return regenerator_default.a.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                if (msg instanceof messages_NewSessionTicket) {
                  _context35.next = 2;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);

              case 2:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, this);
      }));

      function recvHandshakeMessage(_x28) {
        return _recvHandshakeMessage7.apply(this, arguments);
      }

      return recvHandshakeMessage;
    }()
  }]);

  return CLIENT_CONNECTED;
}(states_CONNECTED); // These states implement (part of) the server state-machine from
// https://tools.ietf.org/html/rfc8446#appendix-A.2
//
// Since we're only implementing a small subset of TLS1.3,
// we only need a small subset of the handshake.  It basically goes:
//
//   * receive ClientHello
//   * send ServerHello
//   * send empty EncryptedExtensions
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
      var _recvHandshakeMessage8 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee36(msg) {
        var _this = this;

        var pskExt, pskModesExt, pskIndex, keyschedule, transcript, pskBindersSize, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, binder;

        return regenerator_default.a.wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                if (msg instanceof messages_ClientHello) {
                  _context36.next = 2;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);

              case 2:
                // In the spec, this is where we select connection parameters, and maybe
                // tell the client to try again if we can't find a compatible set.
                // Since we only support a fixed cipherset, the only thing to "negotiate"
                // is whether they provided an acceptable PSK.
                pskExt = msg.extensions.get(EXTENSION_TYPE.PRE_SHARED_KEY);
                pskModesExt = msg.extensions.get(EXTENSION_TYPE.PSK_KEY_EXCHANGE_MODES);

                if (!(!pskExt || !pskModesExt)) {
                  _context36.next = 6;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.MISSING_EXTENSION);

              case 6:
                if (!(pskModesExt.modes.indexOf(PSK_MODE_KE) === -1)) {
                  _context36.next = 8;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.HANDSHAKE_FAILURE);

              case 8:
                pskIndex = pskExt.identities.findIndex(function (pskId) {
                  return bytesAreEqual(pskId, _this.conn.pskId);
                });

                if (!(pskIndex === -1)) {
                  _context36.next = 11;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.UNKNOWN_PSK_IDENTITY);

              case 11:
                _context36.next = 13;
                return this.conn._keyschedule.addPSK(this.conn.psk);

              case 13:
                // Validate the PSK binder.
                keyschedule = this.conn._keyschedule;
                transcript = keyschedule.getTranscript(); // Calculate size occupied by the PSK binders.

                pskBindersSize = 2; // Vector16 representation overhead.

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context36.prev = 19;

                for (_iterator = pskExt.binders[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  binder = _step.value;
                  pskBindersSize += binder.byteLength + 1; // Vector8 representation overhead.
                }

                _context36.next = 27;
                break;

              case 23:
                _context36.prev = 23;
                _context36.t0 = _context36["catch"](19);
                _didIteratorError = true;
                _iteratorError = _context36.t0;

              case 27:
                _context36.prev = 27;
                _context36.prev = 28;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 30:
                _context36.prev = 30;

                if (!_didIteratorError) {
                  _context36.next = 33;
                  break;
                }

                throw _iteratorError;

              case 33:
                return _context36.finish(30);

              case 34:
                return _context36.finish(27);

              case 35:
                _context36.next = 37;
                return keyschedule.verifyFinishedMAC(keyschedule.extBinderKey, pskExt.binders[pskIndex], transcript.slice(0, -pskBindersSize));

              case 37:
                _context36.next = 39;
                return this.conn._transition(states_SERVER_NEGOTIATED, msg.sessionId, pskIndex);

              case 39:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, this, [[19, 23, 27, 35], [28,, 30, 34]]);
      }));

      function recvHandshakeMessage(_x29) {
        return _recvHandshakeMessage8.apply(this, arguments);
      }

      return recvHandshakeMessage;
    }()
  }]);

  return SERVER_START;
}(states_State);

var states_SERVER_NEGOTIATED =
/*#__PURE__*/
function (_MidHandshakeState2) {
  inherits_default()(SERVER_NEGOTIATED, _MidHandshakeState2);

  function SERVER_NEGOTIATED() {
    classCallCheck_default()(this, SERVER_NEGOTIATED);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(SERVER_NEGOTIATED).apply(this, arguments));
  }

  createClass_default()(SERVER_NEGOTIATED, [{
    key: "initialize",
    value: function () {
      var _initialize8 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee37(sessionId, pskIndex) {
        var keyschedule, serverFinishedMAC, clientFinishedTranscript, clientHandshakeTrafficSecret;
        return regenerator_default.a.wrap(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                _context37.t0 = this.conn;
                _context37.t1 = messages_ServerHello;
                _context37.next = 4;
                return getRandomBytes(32);

              case 4:
                _context37.t2 = _context37.sent;
                _context37.t3 = sessionId;
                _context37.t4 = [new extensions_SupportedVersionsExtension(null, VERSION_TLS_1_3), new extensions_PreSharedKeyExtension(null, null, pskIndex)];
                _context37.t5 = new _context37.t1(_context37.t2, _context37.t3, _context37.t4);
                _context37.next = 10;
                return _context37.t0._sendHandshakeMessage.call(_context37.t0, _context37.t5);

              case 10:
                if (!(sessionId.byteLength > 0)) {
                  _context37.next = 13;
                  break;
                }

                _context37.next = 13;
                return this.conn._sendChangeCipherSpec();

              case 13:
                // We can now transition to the encrypted part of the handshake.
                keyschedule = this.conn._keyschedule;
                _context37.next = 16;
                return keyschedule.addECDHE(null);

              case 16:
                _context37.next = 18;
                return this.conn._setSendKey(keyschedule.serverHandshakeTrafficSecret);

              case 18:
                _context37.next = 20;
                return this.conn._setRecvKey(keyschedule.clientHandshakeTrafficSecret);

              case 20:
                _context37.next = 22;
                return this.conn._sendHandshakeMessage(new messages_EncryptedExtensions([]));

              case 22:
                _context37.next = 24;
                return keyschedule.calculateFinishedMAC(keyschedule.serverHandshakeTrafficSecret);

              case 24:
                serverFinishedMAC = _context37.sent;
                _context37.next = 27;
                return this.conn._sendHandshakeMessage(new messages_Finished(serverFinishedMAC));

              case 27:
                _context37.next = 29;
                return keyschedule.getTranscript();

              case 29:
                clientFinishedTranscript = _context37.sent;
                clientHandshakeTrafficSecret = keyschedule.clientHandshakeTrafficSecret;
                _context37.next = 33;
                return keyschedule.finalize();

              case 33:
                _context37.next = 35;
                return this.conn._setSendKey(keyschedule.serverApplicationTrafficSecret);

              case 35:
                _context37.next = 37;
                return this.conn._transition(states_SERVER_WAIT_FINISHED, clientHandshakeTrafficSecret, clientFinishedTranscript);

              case 37:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee37, this);
      }));

      function initialize(_x30, _x31) {
        return _initialize8.apply(this, arguments);
      }

      return initialize;
    }()
  }]);

  return SERVER_NEGOTIATED;
}(states_MidHandshakeState);

var states_SERVER_WAIT_FINISHED =
/*#__PURE__*/
function (_MidHandshakeState3) {
  inherits_default()(SERVER_WAIT_FINISHED, _MidHandshakeState3);

  function SERVER_WAIT_FINISHED() {
    classCallCheck_default()(this, SERVER_WAIT_FINISHED);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(SERVER_WAIT_FINISHED).apply(this, arguments));
  }

  createClass_default()(SERVER_WAIT_FINISHED, [{
    key: "initialize",
    value: function () {
      var _initialize9 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee38(clientHandshakeTrafficSecret, clientFinishedTranscript) {
        return regenerator_default.a.wrap(function _callee38$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                this._clientHandshakeTrafficSecret = clientHandshakeTrafficSecret;
                this._clientFinishedTranscript = clientFinishedTranscript;

              case 2:
              case "end":
                return _context38.stop();
            }
          }
        }, _callee38, this);
      }));

      function initialize(_x32, _x33) {
        return _initialize9.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage9 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee39(msg) {
        var keyschedule;
        return regenerator_default.a.wrap(function _callee39$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                if (msg instanceof messages_Finished) {
                  _context39.next = 2;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);

              case 2:
                keyschedule = this.conn._keyschedule;
                _context39.next = 5;
                return keyschedule.verifyFinishedMAC(this._clientHandshakeTrafficSecret, msg.verifyData, this._clientFinishedTranscript);

              case 5:
                this._clientHandshakeTrafficSecret = this._clientFinishedTranscript = null;
                _context39.next = 8;
                return this.conn._setRecvKey(keyschedule.clientApplicationTrafficSecret);

              case 8:
                _context39.next = 10;
                return this.conn._transition(states_CONNECTED);

              case 10:
              case "end":
                return _context39.stop();
            }
          }
        }, _callee39, this);
      }));

      function recvHandshakeMessage(_x34) {
        return _recvHandshakeMessage9.apply(this, arguments);
      }

      return recvHandshakeMessage;
    }()
  }]);

  return SERVER_WAIT_FINISHED;
}(states_MidHandshakeState);
// CONCATENATED MODULE: ./src/keyschedule.js





/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// TLS1.3 Key Schedule.
//
// In this file we implement the "key schedule" from
// https://tools.ietf.org/html/rfc8446#section-7.1, which
// defines how to calculate various keys as the handshake
// state progresses.


 // The `KeySchedule` class progresses through three stages corresponding
// to the three phases of the TLS1.3 key schedule:
//
//   UNINITIALIZED
//       |
//       | addPSK()
//       v
//   EARLY_SECRET
//       |
//       | addECDHE()
//       v
//   HANDSHAKE_SECRET
//       |
//       | finalize()
//       v
//   MASTER_SECRET
//
// It will error out if the calling code attempts to add key material
// in the wrong order.

var STAGE_UNINITIALIZED = 0;
var STAGE_EARLY_SECRET = 1;
var STAGE_HANDSHAKE_SECRET = 2;
var STAGE_MASTER_SECRET = 3;
var keyschedule_KeySchedule =
/*#__PURE__*/
function () {
  function KeySchedule() {
    classCallCheck_default()(this, KeySchedule);

    this.stage = STAGE_UNINITIALIZED; // WebCrypto doesn't support a rolling hash construct, so we have to
    // keep the entire message transcript in memory.

    this.transcript = new utils_BufferWriter(); // This tracks the main secret from with other keys are derived at each stage.

    this.secret = null; // And these are all the various keys we'll derive as the handshake progresses.

    this.extBinderKey = null;
    this.clientHandshakeTrafficSecret = null;
    this.serverHandshakeTrafficSecret = null;
    this.clientApplicationTrafficSecret = null;
    this.serverApplicationTrafficSecret = null;
  }

  createClass_default()(KeySchedule, [{
    key: "addPSK",
    value: function () {
      var _addPSK = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee(psk) {
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Use the selected PSK (if any) to calculate the "early secret".
                if (psk === null) {
                  psk = zeros(HASH_LENGTH);
                }

                if (!(this.stage !== STAGE_UNINITIALIZED)) {
                  _context.next = 3;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);

              case 3:
                this.stage = STAGE_EARLY_SECRET;
                _context.next = 6;
                return hkdfExtract(zeros(HASH_LENGTH), psk);

              case 6:
                this.secret = _context.sent;
                _context.next = 9;
                return this.deriveSecret('ext binder', EMPTY);

              case 9:
                this.extBinderKey = _context.sent;
                _context.next = 12;
                return this.deriveSecret('derived', EMPTY);

              case 12:
                this.secret = _context.sent;

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addPSK(_x) {
        return _addPSK.apply(this, arguments);
      }

      return addPSK;
    }()
  }, {
    key: "addECDHE",
    value: function () {
      var _addECDHE = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee2(ecdhe) {
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // Mix in the ECDHE output (if any) to calculate the "handshake secret".
                if (ecdhe === null) {
                  ecdhe = zeros(HASH_LENGTH);
                }

                if (!(this.stage !== STAGE_EARLY_SECRET)) {
                  _context2.next = 3;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);

              case 3:
                this.stage = STAGE_HANDSHAKE_SECRET;
                this.extBinderKey = null;
                _context2.next = 7;
                return hkdfExtract(this.secret, ecdhe);

              case 7:
                this.secret = _context2.sent;
                _context2.next = 10;
                return this.deriveSecret('c hs traffic');

              case 10:
                this.clientHandshakeTrafficSecret = _context2.sent;
                _context2.next = 13;
                return this.deriveSecret('s hs traffic');

              case 13:
                this.serverHandshakeTrafficSecret = _context2.sent;
                _context2.next = 16;
                return this.deriveSecret('derived', EMPTY);

              case 16:
                this.secret = _context2.sent;

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addECDHE(_x2) {
        return _addECDHE.apply(this, arguments);
      }

      return addECDHE;
    }()
  }, {
    key: "finalize",
    value: function () {
      var _finalize = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee3() {
        return regenerator_default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.stage !== STAGE_HANDSHAKE_SECRET)) {
                  _context3.next = 2;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);

              case 2:
                this.stage = STAGE_MASTER_SECRET;
                this.clientHandshakeTrafficSecret = null;
                this.serverHandshakeTrafficSecret = null;
                _context3.next = 7;
                return hkdfExtract(this.secret, zeros(HASH_LENGTH));

              case 7:
                this.secret = _context3.sent;
                _context3.next = 10;
                return this.deriveSecret('c ap traffic');

              case 10:
                this.clientApplicationTrafficSecret = _context3.sent;
                _context3.next = 13;
                return this.deriveSecret('s ap traffic');

              case 13:
                this.serverApplicationTrafficSecret = _context3.sent;
                this.secret = null;

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function finalize() {
        return _finalize.apply(this, arguments);
      }

      return finalize;
    }()
  }, {
    key: "addToTranscript",
    value: function addToTranscript(bytes) {
      this.transcript.writeBytes(bytes);
    }
  }, {
    key: "getTranscript",
    value: function getTranscript() {
      return this.transcript.slice();
    }
  }, {
    key: "deriveSecret",
    value: function () {
      var _deriveSecret = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee4(label) {
        var transcript,
            _args4 = arguments;
        return regenerator_default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                transcript = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : undefined;
                transcript = transcript || this.getTranscript();
                _context4.t0 = hkdfExpandLabel;
                _context4.t1 = this.secret;
                _context4.t2 = label;
                _context4.next = 7;
                return hash(transcript);

              case 7:
                _context4.t3 = _context4.sent;
                _context4.t4 = HASH_LENGTH;
                _context4.next = 11;
                return (0, _context4.t0)(_context4.t1, _context4.t2, _context4.t3, _context4.t4);

              case 11:
                return _context4.abrupt("return", _context4.sent);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function deriveSecret(_x3) {
        return _deriveSecret.apply(this, arguments);
      }

      return deriveSecret;
    }()
  }, {
    key: "calculateFinishedMAC",
    value: function () {
      var _calculateFinishedMAC = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee5(baseKey) {
        var transcript,
            finishedKey,
            _args5 = arguments;
        return regenerator_default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                transcript = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : undefined;
                transcript = transcript || this.getTranscript();
                _context5.next = 4;
                return hkdfExpandLabel(baseKey, 'finished', EMPTY, HASH_LENGTH);

              case 4:
                finishedKey = _context5.sent;
                _context5.t0 = hmac;
                _context5.t1 = finishedKey;
                _context5.next = 9;
                return hash(transcript);

              case 9:
                _context5.t2 = _context5.sent;
                _context5.next = 12;
                return (0, _context5.t0)(_context5.t1, _context5.t2);

              case 12:
                return _context5.abrupt("return", _context5.sent);

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function calculateFinishedMAC(_x4) {
        return _calculateFinishedMAC.apply(this, arguments);
      }

      return calculateFinishedMAC;
    }()
  }, {
    key: "verifyFinishedMAC",
    value: function () {
      var _verifyFinishedMAC = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee6(baseKey, mac) {
        var transcript,
            finishedKey,
            _args6 = arguments;
        return regenerator_default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                transcript = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : undefined;
                transcript = transcript || this.getTranscript();
                _context6.next = 4;
                return hkdfExpandLabel(baseKey, 'finished', EMPTY, HASH_LENGTH);

              case 4:
                finishedKey = _context6.sent;
                _context6.t0 = verifyHmac;
                _context6.t1 = finishedKey;
                _context6.t2 = mac;
                _context6.next = 10;
                return hash(transcript);

              case 10:
                _context6.t3 = _context6.sent;
                _context6.next = 13;
                return (0, _context6.t0)(_context6.t1, _context6.t2, _context6.t3);

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function verifyFinishedMAC(_x5, _x6) {
        return _verifyFinishedMAC.apply(this, arguments);
      }

      return verifyFinishedMAC;
    }()
  }]);

  return KeySchedule;
}();
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
// The main interface is the RecordLayer class, which takes a callback function
// sending data and can be used like so:
//
//    rl = new RecordLayer(async function send_encrypted_data(data) {
//      // application-specific sending logic here.
//    });
//
//    // Records are sent and received in plaintext by default,
//    // until you specify the key to use.
//    await rl.setSendKey(key)
//
//    // Send some data by specifying the record type and the bytes.
//    // Where allowed by the record type, it will be buffered until
//    // explicitly flushed, and then sent by calling the callback.
//    await rl.send(RECORD_TYPE.HANDSHAKE, <bytes for a handshake message>)
//    await rl.send(RECORD_TYPE.HANDSHAKE, <bytes for another handshake message>)
//    await rl.flush()
//
//    // Separate keys are used for sending and receiving.
//    rl.setRecvKey(key);
//
//    // When data is received, push it into the RecordLayer
//    // and pass a callback that will be called with a [type, bytes]
//    // pair for each message parsed from the data.
//    rl.recv(dataReceivedFromPeer, async (type, bytes) => {
//      switch (type) {
//        case RECORD_TYPE.APPLICATION_DATA:
//          // do something with application data
//        case RECORD_TYPE.HANDSHAKE:
//          // do something with a handshake message
//        default:
//          // etc...
//      }
//    });
//




/* eslint-disable sorting/sort-object-props */

var RECORD_TYPE = {
  CHANGE_CIPHER_SPEC: 20,
  ALERT: 21,
  HANDSHAKE: 22,
  APPLICATION_DATA: 23
};
/* eslint-enable sorting/sort-object-props */
// Encrypting at most 2^24 records will force us to stay
// below data limits on AES-GCM encryption key use, and also
// means we can accurately represent the sequence number as
// a javascript double.

var MAX_SEQUENCE_NUMBER = Math.pow(2, 24);
var MAX_RECORD_SIZE = Math.pow(2, 14);
var MAX_ENCRYPTED_RECORD_SIZE = MAX_RECORD_SIZE + 256;
var RECORD_HEADER_SIZE = 5; // These are some helper classes to manage the encryption/decryption state
// for a particular key.

var recordlayer_CipherState =
/*#__PURE__*/
function () {
  function CipherState(key, iv) {
    classCallCheck_default()(this, CipherState);

    this.key = key;
    this.iv = iv;
    this.seqnum = 0;
  }

  createClass_default()(CipherState, [{
    key: "nonce",
    value: function nonce() {
      // Ref https://tools.ietf.org/html/rfc8446#section-5.3:
      // * left-pad the sequence number with zeros to IV_LENGTH
      // * xor with the provided iv
      // Our sequence numbers are always less than 2^24, so fit in a Uint32
      // in the last 4 bytes of the nonce.
      var nonce = this.iv.slice();
      var dv = new DataView(nonce.buffer, nonce.byteLength - 4, 4);
      dv.setUint32(0, dv.getUint32(0) ^ this.seqnum);
      this.seqnum += 1;

      if (this.seqnum > MAX_SEQUENCE_NUMBER) {
        throw new alerts_TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);
      }

      return nonce;
    }
  }], [{
    key: "create",
    value: function () {
      var _create = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee(baseKey, mode) {
        var key, iv;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = prepareKey;
                _context.next = 3;
                return hkdfExpandLabel(baseKey, 'key', EMPTY, KEY_LENGTH);

              case 3:
                _context.t1 = _context.sent;
                _context.t2 = mode;
                _context.next = 7;
                return (0, _context.t0)(_context.t1, _context.t2);

              case 7:
                key = _context.sent;
                _context.next = 10;
                return hkdfExpandLabel(baseKey, 'iv', EMPTY, IV_LENGTH);

              case 10:
                iv = _context.sent;
                return _context.abrupt("return", new this(key, iv));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return CipherState;
}();
var recordlayer_EncryptionState =
/*#__PURE__*/
function (_CipherState) {
  inherits_default()(EncryptionState, _CipherState);

  function EncryptionState() {
    classCallCheck_default()(this, EncryptionState);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(EncryptionState).apply(this, arguments));
  }

  createClass_default()(EncryptionState, [{
    key: "encrypt",
    value: function () {
      var _encrypt2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee2(plaintext, additionalData) {
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return crypto_encrypt(this.key, this.nonce(), plaintext, additionalData);

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function encrypt(_x3, _x4) {
        return _encrypt2.apply(this, arguments);
      }

      return encrypt;
    }()
  }], [{
    key: "create",
    value: function () {
      var _create2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee3(key) {
        return regenerator_default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", get_default()(getPrototypeOf_default()(EncryptionState), "create", this).call(this, key, 'encrypt'));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function create(_x5) {
        return _create2.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return EncryptionState;
}(recordlayer_CipherState);
var recordlayer_DecryptionState =
/*#__PURE__*/
function (_CipherState2) {
  inherits_default()(DecryptionState, _CipherState2);

  function DecryptionState() {
    classCallCheck_default()(this, DecryptionState);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(DecryptionState).apply(this, arguments));
  }

  createClass_default()(DecryptionState, [{
    key: "decrypt",
    value: function () {
      var _decrypt2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee4(ciphertext, additionalData) {
        return regenerator_default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return crypto_decrypt(this.key, this.nonce(), ciphertext, additionalData);

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function decrypt(_x6, _x7) {
        return _decrypt2.apply(this, arguments);
      }

      return decrypt;
    }()
  }], [{
    key: "create",
    value: function () {
      var _create3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee5(key) {
        return regenerator_default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", get_default()(getPrototypeOf_default()(DecryptionState), "create", this).call(this, key, 'decrypt'));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function create(_x8) {
        return _create3.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return DecryptionState;
}(recordlayer_CipherState); // The main RecordLayer class.

var recordlayer_RecordLayer =
/*#__PURE__*/
function () {
  function RecordLayer(sendCallback) {
    classCallCheck_default()(this, RecordLayer);

    this.sendCallback = sendCallback;
    this._sendEncryptState = null;
    this._sendError = null;
    this._recvDecryptState = null;
    this._recvError = null;
    this._pendingRecordType = 0;
    this._pendingRecordBuf = null;
  }

  createClass_default()(RecordLayer, [{
    key: "setSendKey",
    value: function () {
      var _setSendKey = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee6(key) {
        return regenerator_default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.flush();

              case 2:
                _context6.next = 4;
                return recordlayer_EncryptionState.create(key);

              case 4:
                this._sendEncryptState = _context6.sent;

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function setSendKey(_x9) {
        return _setSendKey.apply(this, arguments);
      }

      return setSendKey;
    }()
  }, {
    key: "setRecvKey",
    value: function () {
      var _setRecvKey = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee7(key) {
        return regenerator_default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return recordlayer_DecryptionState.create(key);

              case 2:
                this._recvDecryptState = _context7.sent;

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function setRecvKey(_x10) {
        return _setRecvKey.apply(this, arguments);
      }

      return setRecvKey;
    }()
  }, {
    key: "setSendError",
    value: function () {
      var _setSendError = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee8(err) {
        return regenerator_default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this._sendError = err;

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function setSendError(_x11) {
        return _setSendError.apply(this, arguments);
      }

      return setSendError;
    }()
  }, {
    key: "setRecvError",
    value: function () {
      var _setRecvError = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee9(err) {
        return regenerator_default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this._recvError = err;

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function setRecvError(_x12) {
        return _setRecvError.apply(this, arguments);
      }

      return setRecvError;
    }()
  }, {
    key: "send",
    value: function () {
      var _send = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee10(type, data) {
        return regenerator_default.a.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(this._sendError !== null)) {
                  _context10.next = 2;
                  break;
                }

                throw this._sendError;

              case 2:
                if (!(data.byteLength > MAX_RECORD_SIZE)) {
                  _context10.next = 4;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);

              case 4:
                if (!(this._pendingRecordType && this._pendingRecordType !== type)) {
                  _context10.next = 7;
                  break;
                }

                _context10.next = 7;
                return this.flush();

              case 7:
                if (!(this._pendingRecordBuf !== null)) {
                  _context10.next = 11;
                  break;
                }

                if (!(this._pendingRecordBuf.tell() + data.byteLength > MAX_RECORD_SIZE)) {
                  _context10.next = 11;
                  break;
                }

                _context10.next = 11;
                return this.flush();

              case 11:
                // Start a new pending record if necessary.
                // We reserve space at the start of the buffer for the record header,
                // which is conveniently always a fixed size.
                if (this._pendingRecordBuf === null) {
                  this._pendingRecordType = type;
                  this._pendingRecordBuf = new utils_BufferWriter();

                  this._pendingRecordBuf.incr(RECORD_HEADER_SIZE);
                }

                this._pendingRecordBuf.writeBytes(data);

              case 13:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function send(_x13, _x14) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "flush",
    value: function () {
      var _flush = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee11() {
        var buf, type, inflation, innerPlaintext, length, additionalData, ciphertext;
        return regenerator_default.a.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                // If there's nothing to flush, bail out early.
                // Don't throw `_sendError` if we're not sending anything, because `flush()`
                // can be called when we're trying to transition into an error state.
                buf = this._pendingRecordBuf;
                type = this._pendingRecordType;

                if (type) {
                  _context11.next = 6;
                  break;
                }

                if (!(buf !== null)) {
                  _context11.next = 5;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.INTERNAL_ERROR);

              case 5:
                return _context11.abrupt("return");

              case 6:
                if (!(this._sendError !== null)) {
                  _context11.next = 8;
                  break;
                }

                throw this._sendError;

              case 8:
                // If we're encrypting, turn the existing buffer contents into a `TLSInnerPlaintext` by
                // appending the type. We don't do any zero-padding, although the spec allows it.
                inflation = 0, innerPlaintext = null;

                if (this._sendEncryptState !== null) {
                  buf.writeUint8(type);
                  innerPlaintext = buf.slice(RECORD_HEADER_SIZE);
                  inflation = AEAD_SIZE_INFLATION;
                  type = RECORD_TYPE.APPLICATION_DATA;
                } // Write the common header for either `TLSPlaintext` or `TLSCiphertext` record.


                length = buf.tell() - RECORD_HEADER_SIZE + inflation;
                buf.seek(0);
                buf.writeUint8(type);
                buf.writeUint16(VERSION_TLS_1_2);
                buf.writeUint16(length); // Followed by different payload depending on encryption status.

                if (!(this._sendEncryptState !== null)) {
                  _context11.next = 23;
                  break;
                }

                additionalData = buf.slice(0, RECORD_HEADER_SIZE);
                _context11.next = 19;
                return this._sendEncryptState.encrypt(innerPlaintext, additionalData);

              case 19:
                ciphertext = _context11.sent;
                buf.writeBytes(ciphertext);
                _context11.next = 24;
                break;

              case 23:
                buf.incr(length);

              case 24:
                this._pendingRecordBuf = null;
                this._pendingRecordType = 0;
                _context11.next = 28;
                return this.sendCallback(buf.flush());

              case 28:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function flush() {
        return _flush.apply(this, arguments);
      }

      return flush;
    }()
  }, {
    key: "recv",
    value: function () {
      var _recv = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee12(data) {
        var buf, type, version, length, plaintext, _ref, _ref2, _ref3, _ref4;

        return regenerator_default.a.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!(this._recvError !== null)) {
                  _context12.next = 2;
                  break;
                }

                throw this._recvError;

              case 2:
                // For simplicity, we assume that the given data contains exactly one record.
                // Peers using this library will send one record at a time over the websocket
                // connection, and we can assume that the server-side websocket bridge will split
                // up any traffic into individual records if we ever start interoperating with
                // peers using a different TLS implementation.
                // Similarly, we assume that handshake messages will not be fragmented across
                // multiple records. This should be trivially true for the PSK-only mode used
                // by this library, but we may want to relax it in future for interoperability
                // with e.g. large ClientHello messages that contain lots of different options.
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

                type = buf.readUint8(); // The spec says legacy_record_version "MUST be ignored for all purposes",
                // but we know TLS1.3 implementations will only ever emit two possible values,
                // so it seems useful to bail out early if we receive anything else.

                version = buf.readUint16();

                if (!(version !== VERSION_TLS_1_2)) {
                  _context12.next = 8;
                  break;
                }

                if (!(this._recvDecryptState !== null || version !== VERSION_TLS_1_0)) {
                  _context12.next = 8;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.DECODE_ERROR);

              case 8:
                length = buf.readUint16();

                if (!(this._recvDecryptState === null || type === RECORD_TYPE.CHANGE_CIPHER_SPEC)) {
                  _context12.next = 18;
                  break;
                }

                _context12.next = 12;
                return this._readPlaintextRecord(type, length, buf);

              case 12:
                _ref = _context12.sent;
                _ref2 = slicedToArray_default()(_ref, 2);
                type = _ref2[0];
                plaintext = _ref2[1];
                _context12.next = 24;
                break;

              case 18:
                _context12.next = 20;
                return this._readEncryptedRecord(type, length, buf);

              case 20:
                _ref3 = _context12.sent;
                _ref4 = slicedToArray_default()(_ref3, 2);
                type = _ref4[0];
                plaintext = _ref4[1];

              case 24:
                if (!buf.hasMoreBytes()) {
                  _context12.next = 26;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.DECODE_ERROR);

              case 26:
                return _context12.abrupt("return", [type, plaintext]);

              case 27:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function recv(_x15) {
        return _recv.apply(this, arguments);
      }

      return recv;
    }() // Helper to read an unencrypted `TLSPlaintext` struct

  }, {
    key: "_readPlaintextRecord",
    value: function () {
      var _readPlaintextRecord2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee13(type, length, buf) {
        return regenerator_default.a.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (!(length > MAX_RECORD_SIZE)) {
                  _context13.next = 2;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.RECORD_OVERFLOW);

              case 2:
                return _context13.abrupt("return", [type, buf.readBytes(length)]);

              case 3:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function _readPlaintextRecord(_x16, _x17, _x18) {
        return _readPlaintextRecord2.apply(this, arguments);
      }

      return _readPlaintextRecord;
    }() // Helper to read an encrypted `TLSCiphertext` struct,
    // decrypting it into plaintext.

  }, {
    key: "_readEncryptedRecord",
    value: function () {
      var _readEncryptedRecord2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee14(type, length, buf) {
        var additionalData, ciphertext, paddedPlaintext, i;
        return regenerator_default.a.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (!(length > MAX_ENCRYPTED_RECORD_SIZE)) {
                  _context14.next = 2;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.RECORD_OVERFLOW);

              case 2:
                if (!(type !== RECORD_TYPE.APPLICATION_DATA)) {
                  _context14.next = 4;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.DECODE_ERROR);

              case 4:
                // Decrypt and decode the contained `TLSInnerPlaintext` struct:
                //
                //    struct {
                //        opaque content[TLSPlaintext.length];
                //        ContentType type;
                //        uint8 zeros[length_of_padding];
                //    } TLSInnerPlaintext;
                //
                // The additional data for the decryption is the `TLSCiphertext` record
                // header, which is a fixed size and immediately prior to current buffer position.
                buf.incr(-RECORD_HEADER_SIZE);
                additionalData = buf.readBytes(RECORD_HEADER_SIZE);
                ciphertext = buf.readBytes(length);
                _context14.next = 9;
                return this._recvDecryptState.decrypt(ciphertext, additionalData);

              case 9:
                paddedPlaintext = _context14.sent;
                i = paddedPlaintext.byteLength - 1;

              case 11:
                if (!(i >= 0)) {
                  _context14.next = 17;
                  break;
                }

                if (!(paddedPlaintext[i] !== 0)) {
                  _context14.next = 14;
                  break;
                }

                return _context14.abrupt("break", 17);

              case 14:
                i--;
                _context14.next = 11;
                break;

              case 17:
                if (!(i < 0)) {
                  _context14.next = 19;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);

              case 19:
                type = paddedPlaintext[i]; // `change_cipher_spec` records must always be plaintext.

                if (!(type === RECORD_TYPE.CHANGE_CIPHER_SPEC)) {
                  _context14.next = 22;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.DECODE_ERROR);

              case 22:
                return _context14.abrupt("return", [type, paddedPlaintext.slice(0, i)]);

              case 23:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function _readEncryptedRecord(_x19, _x20, _x21) {
        return _readEncryptedRecord2.apply(this, arguments);
      }

      return _readEncryptedRecord;
    }()
  }]);

  return RecordLayer;
}();
// CONCATENATED MODULE: ./src/tlsconnection.js










/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// The top-level APIs offered by this module are `ClientConnection` and
// `ServerConnection` classes, which provide authenticated and encrypted
// communication via the "externally-provisioned PSK" mode of TLS1.3.
// They each take a callback to be used for sending data to the remote peer,
// and operate like this:
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
//    // There might not be any app-level data if it was a protocol control
//    //  message, and the receipt of the data might trigger additional calls
//    // to the send callback for protocol control purposes.
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
//    // When the peer sends a "closed" notification it will show up
//    // as a `TLSCloseNotify` exception from recv:
//
//    try {
//      data = await conn.recv(data);
//    } catch (err) {
//      if (! (err instanceof TLSCloseNotify) { throw err }
//      do_something_to_cleanly_close_data_connection();
//    }
//
// The `ServerConnection` API operates similarly; the distinction is mainly
// in which side is expected to send vs receieve during the protocol handshake.







var tlsconnection_Connection =
/*#__PURE__*/
function () {
  function Connection(psk, pskId, sendCallback) {
    var _this = this;

    classCallCheck_default()(this, Connection);

    this.psk = assertIsBytes(psk);
    this.pskId = assertIsBytes(pskId);
    this.connected = new Promise(function (resolve, reject) {
      _this._onConnectionSuccess = resolve;
      _this._onConnectionFailure = reject;
    });
    this._state = new states_UNINITIALIZED(this);
    this._handshakeRecvBuffer = null;
    this._hasSeenChangeCipherSpec = false;
    this._recordlayer = new recordlayer_RecordLayer(sendCallback);
    this._keyschedule = new keyschedule_KeySchedule();
    this._lastPromise = Promise.resolve();
  } // Subclasses will override this with some async initialization logic.


  createClass_default()(Connection, [{
    key: "send",
    // These are the three public API methods that consumers can use
    // to send and receive data encrypted with TLS1.3.
    value: function () {
      var _send = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee2(data) {
        var _this2 = this;

        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                assertIsBytes(data);
                _context2.next = 3;
                return this.connected;

              case 3:
                _context2.next = 5;
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
                          return _this2._state.sendApplicationData(data);

                        case 2:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                })));

              case 5:
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
        var _this3 = this;

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
                  var _ref3, _ref4, type, bytes, mlength, messageBytes;

                  return regenerator_default.a.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return _this3._recordlayer.recv(data);

                        case 2:
                          _ref3 = _context3.sent;
                          _ref4 = slicedToArray_default()(_ref3, 2);
                          type = _ref4[0];
                          bytes = _ref4[1];
                          _context3.t0 = type;
                          _context3.next = _context3.t0 === RECORD_TYPE.CHANGE_CIPHER_SPEC ? 9 : _context3.t0 === RECORD_TYPE.ALERT ? 12 : _context3.t0 === RECORD_TYPE.APPLICATION_DATA ? 15 : _context3.t0 === RECORD_TYPE.HANDSHAKE ? 18 : 31;
                          break;

                        case 9:
                          _context3.next = 11;
                          return _this3._state.recvChangeCipherSpec(bytes);

                        case 11:
                          return _context3.abrupt("return", null);

                        case 12:
                          _context3.next = 14;
                          return _this3._state.recvAlertMessage(alerts_TLSAlert.fromBytes(bytes));

                        case 14:
                          return _context3.abrupt("return", null);

                        case 15:
                          _context3.next = 17;
                          return _this3._state.recvApplicationData(bytes);

                        case 17:
                          return _context3.abrupt("return", _context3.sent);

                        case 18:
                          // Multiple handshake messages may be coalesced into a single record.
                          // Store the in-progress record buffer on `this` so that we can guard
                          // against handshake messages that span a change in keys.
                          _this3._handshakeRecvBuffer = new utils_BufferReader(bytes);

                          if (_this3._handshakeRecvBuffer.hasMoreBytes()) {
                            _context3.next = 21;
                            break;
                          }

                          throw new alerts_TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);

                        case 21:
                          // Each handshake messages has a type and length prefix, per
                          // https://tools.ietf.org/html/rfc8446#appendix-B.3
                          _this3._handshakeRecvBuffer.incr(1);

                          mlength = _this3._handshakeRecvBuffer.readUint24();

                          _this3._handshakeRecvBuffer.incr(-4);

                          messageBytes = _this3._handshakeRecvBuffer.readBytes(mlength + 4);

                          _this3._keyschedule.addToTranscript(messageBytes);

                          _context3.next = 28;
                          return _this3._state.recvHandshakeMessage(messages_HandshakeMessage.fromBytes(messageBytes));

                        case 28:
                          if (_this3._handshakeRecvBuffer.hasMoreBytes()) {
                            _context3.next = 21;
                            break;
                          }

                        case 29:
                          _this3._handshakeRecvBuffer = null;
                          return _context3.abrupt("return", null);

                        case 31:
                          throw new alerts_TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);

                        case 32:
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
        var _this4 = this;

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
                          return _this4._state.close();

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
    // It's also a convenient place to catch and alert on errors.

  }, {
    key: "_synchronized",
    value: function _synchronized(cb) {
      var _this5 = this;

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
                  if (!(err instanceof alerts_TLSCloseNotify)) {
                    _context7.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  _context7.next = 4;
                  return _this5._state.handleErrorAndRethrow(err);

                case 4:
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
                _context8.next = 6;
                return this._recordlayer.flush();

              case 6:
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
    }() // These are helpers to allow the State to manipulate the recordlayer
    // and send out various types of data.

  }, {
    key: "_sendApplicationData",
    value: function () {
      var _sendApplicationData2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee9(bytes) {
        return regenerator_default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this._recordlayer.send(RECORD_TYPE.APPLICATION_DATA, bytes);

              case 2:
                _context9.next = 4;
                return this._recordlayer.flush();

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function _sendApplicationData(_x5) {
        return _sendApplicationData2.apply(this, arguments);
      }

      return _sendApplicationData;
    }()
  }, {
    key: "_sendHandshakeMessage",
    value: function () {
      var _sendHandshakeMessage2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee10(msg) {
        return regenerator_default.a.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._sendHandshakeMessageBytes(msg.toBytes());

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function _sendHandshakeMessage(_x6) {
        return _sendHandshakeMessage2.apply(this, arguments);
      }

      return _sendHandshakeMessage;
    }()
  }, {
    key: "_sendHandshakeMessageBytes",
    value: function () {
      var _sendHandshakeMessageBytes2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee11(bytes) {
        return regenerator_default.a.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                this._keyschedule.addToTranscript(bytes);

                _context11.next = 3;
                return this._recordlayer.send(RECORD_TYPE.HANDSHAKE, bytes);

              case 3:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function _sendHandshakeMessageBytes(_x7) {
        return _sendHandshakeMessageBytes2.apply(this, arguments);
      }

      return _sendHandshakeMessageBytes;
    }()
  }, {
    key: "_sendAlertMessage",
    value: function () {
      var _sendAlertMessage2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee12(err) {
        return regenerator_default.a.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this._recordlayer.send(RECORD_TYPE.ALERT, err.toBytes());

              case 2:
                _context12.next = 4;
                return this._recordlayer.flush();

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function _sendAlertMessage(_x8) {
        return _sendAlertMessage2.apply(this, arguments);
      }

      return _sendAlertMessage;
    }()
  }, {
    key: "_sendChangeCipherSpec",
    value: function () {
      var _sendChangeCipherSpec2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee13() {
        return regenerator_default.a.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this._recordlayer.send(RECORD_TYPE.CHANGE_CIPHER_SPEC, new Uint8Array([0x01]));

              case 2:
                _context13.next = 4;
                return this._recordlayer.flush();

              case 4:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function _sendChangeCipherSpec() {
        return _sendChangeCipherSpec2.apply(this, arguments);
      }

      return _sendChangeCipherSpec;
    }()
  }, {
    key: "_setSendKey",
    value: function () {
      var _setSendKey2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee14(key) {
        return regenerator_default.a.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return this._recordlayer.setSendKey(key);

              case 2:
                return _context14.abrupt("return", _context14.sent);

              case 3:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function _setSendKey(_x9) {
        return _setSendKey2.apply(this, arguments);
      }

      return _setSendKey;
    }()
  }, {
    key: "_setRecvKey",
    value: function () {
      var _setRecvKey2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee15(key) {
        return regenerator_default.a.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (!(this._handshakeRecvBuffer && this._handshakeRecvBuffer.hasMoreBytes())) {
                  _context15.next = 2;
                  break;
                }

                throw new alerts_TLSError(ALERT_DESCRIPTION.UNEXPECTED_MESSAGE);

              case 2:
                _context15.next = 4;
                return this._recordlayer.setRecvKey(key);

              case 4:
                return _context15.abrupt("return", _context15.sent);

              case 5:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function _setRecvKey(_x10) {
        return _setRecvKey2.apply(this, arguments);
      }

      return _setRecvKey;
    }()
  }, {
    key: "_setConnectionSuccess",
    value: function _setConnectionSuccess() {
      if (this._onConnectionSuccess !== null) {
        this._onConnectionSuccess();

        this._onConnectionSuccess = null;
        this._onConnectionFailure = null;
      }
    }
  }, {
    key: "_setConnectionFailure",
    value: function _setConnectionFailure(err) {
      if (this._onConnectionFailure !== null) {
        this._onConnectionFailure(err);

        this._onConnectionSuccess = null;
        this._onConnectionFailure = null;
      }
    }
  }, {
    key: "_closeForSend",
    value: function _closeForSend(alert) {
      this._recordlayer.setSendError(alert);
    }
  }, {
    key: "_closeForRecv",
    value: function _closeForRecv(alert) {
      this._recordlayer.setRecvError(alert);
    }
  }], [{
    key: "create",
    value: function () {
      var _create = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee16(psk, pskId, sendCallback) {
        return regenerator_default.a.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                return _context16.abrupt("return", new this(psk, pskId, sendCallback));

              case 1:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function create(_x11, _x12, _x13) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return Connection;
}();
var tlsconnection_ClientConnection =
/*#__PURE__*/
function (_Connection) {
  inherits_default()(ClientConnection, _Connection);

  function ClientConnection() {
    classCallCheck_default()(this, ClientConnection);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(ClientConnection).apply(this, arguments));
  }

  createClass_default()(ClientConnection, null, [{
    key: "create",
    value: function () {
      var _create2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee17(psk, pskId, sendCallback) {
        var instance;
        return regenerator_default.a.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return get_default()(getPrototypeOf_default()(ClientConnection), "create", this).call(this, psk, pskId, sendCallback);

              case 2:
                instance = _context17.sent;
                _context17.next = 5;
                return instance._transition(states_CLIENT_START);

              case 5:
                return _context17.abrupt("return", instance);

              case 6:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function create(_x14, _x15, _x16) {
        return _create2.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return ClientConnection;
}(tlsconnection_Connection);
var tlsconnection_ServerConnection =
/*#__PURE__*/
function (_Connection2) {
  inherits_default()(ServerConnection, _Connection2);

  function ServerConnection() {
    classCallCheck_default()(this, ServerConnection);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(ServerConnection).apply(this, arguments));
  }

  createClass_default()(ServerConnection, null, [{
    key: "create",
    value: function () {
      var _create3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee18(psk, pskId, sendCallback) {
        var instance;
        return regenerator_default.a.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return get_default()(getPrototypeOf_default()(ServerConnection), "create", this).call(this, psk, pskId, sendCallback);

              case 2:
                instance = _context18.sent;
                _context18.next = 5;
                return instance._transition(states_SERVER_START);

              case 5:
                return _context18.abrupt("return", instance);

              case 6:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function create(_x17, _x18, _x19) {
        return _create3.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return ServerConnection;
}(tlsconnection_Connection);
// CONCATENATED MODULE: ./node_modules/event-target-shim/dist/event-target-shim.mjs
/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2015 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
/**
 * @typedef {object} PrivateData
 * @property {EventTarget} eventTarget The event target.
 * @property {{type:string}} event The original event object.
 * @property {number} eventPhase The current event phase.
 * @property {EventTarget|null} currentTarget The current event target.
 * @property {boolean} canceled The flag to prevent default.
 * @property {boolean} stopped The flag to stop propagation.
 * @property {boolean} immediateStopped The flag to stop propagation immediately.
 * @property {Function|null} passiveListener The listener if the current listener is passive. Otherwise this is null.
 * @property {number} timeStamp The unix time.
 * @private
 */

/**
 * Private data for event wrappers.
 * @type {WeakMap<Event, PrivateData>}
 * @private
 */
const privateData = new WeakMap();

/**
 * Cache for wrapper classes.
 * @type {WeakMap<Object, Function>}
 * @private
 */
const wrappers = new WeakMap();

/**
 * Get private data.
 * @param {Event} event The event object to get private data.
 * @returns {PrivateData} The private data of the event.
 * @private
 */
function pd(event) {
    const retv = privateData.get(event);
    console.assert(
        retv != null,
        "'this' is expected an Event object, but got",
        event
    );
    return retv
}

/**
 * https://dom.spec.whatwg.org/#set-the-canceled-flag
 * @param data {PrivateData} private data.
 */
function setCancelFlag(data) {
    if (data.passiveListener != null) {
        if (
            typeof console !== "undefined" &&
            typeof console.error === "function"
        ) {
            console.error(
                "Unable to preventDefault inside passive event listener invocation.",
                data.passiveListener
            );
        }
        return
    }
    if (!data.event.cancelable) {
        return
    }

    data.canceled = true;
    if (typeof data.event.preventDefault === "function") {
        data.event.preventDefault();
    }
}

/**
 * @see https://dom.spec.whatwg.org/#interface-event
 * @private
 */
/**
 * The event wrapper.
 * @constructor
 * @param {EventTarget} eventTarget The event target of this dispatching.
 * @param {Event|{type:string}} event The original event to wrap.
 */
function Event(eventTarget, event) {
    privateData.set(this, {
        eventTarget,
        event,
        eventPhase: 2,
        currentTarget: eventTarget,
        canceled: false,
        stopped: false,
        immediateStopped: false,
        passiveListener: null,
        timeStamp: event.timeStamp || Date.now(),
    });

    // https://heycam.github.io/webidl/#Unforgeable
    Object.defineProperty(this, "isTrusted", { value: false, enumerable: true });

    // Define accessors
    const keys = Object.keys(event);
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (!(key in this)) {
            Object.defineProperty(this, key, defineRedirectDescriptor(key));
        }
    }
}

// Should be enumerable, but class methods are not enumerable.
Event.prototype = {
    /**
     * The type of this event.
     * @type {string}
     */
    get type() {
        return pd(this).event.type
    },

    /**
     * The target of this event.
     * @type {EventTarget}
     */
    get target() {
        return pd(this).eventTarget
    },

    /**
     * The target of this event.
     * @type {EventTarget}
     */
    get currentTarget() {
        return pd(this).currentTarget
    },

    /**
     * @returns {EventTarget[]} The composed path of this event.
     */
    composedPath() {
        const currentTarget = pd(this).currentTarget;
        if (currentTarget == null) {
            return []
        }
        return [currentTarget]
    },

    /**
     * Constant of NONE.
     * @type {number}
     */
    get NONE() {
        return 0
    },

    /**
     * Constant of CAPTURING_PHASE.
     * @type {number}
     */
    get CAPTURING_PHASE() {
        return 1
    },

    /**
     * Constant of AT_TARGET.
     * @type {number}
     */
    get AT_TARGET() {
        return 2
    },

    /**
     * Constant of BUBBLING_PHASE.
     * @type {number}
     */
    get BUBBLING_PHASE() {
        return 3
    },

    /**
     * The target of this event.
     * @type {number}
     */
    get eventPhase() {
        return pd(this).eventPhase
    },

    /**
     * Stop event bubbling.
     * @returns {void}
     */
    stopPropagation() {
        const data = pd(this);

        data.stopped = true;
        if (typeof data.event.stopPropagation === "function") {
            data.event.stopPropagation();
        }
    },

    /**
     * Stop event bubbling.
     * @returns {void}
     */
    stopImmediatePropagation() {
        const data = pd(this);

        data.stopped = true;
        data.immediateStopped = true;
        if (typeof data.event.stopImmediatePropagation === "function") {
            data.event.stopImmediatePropagation();
        }
    },

    /**
     * The flag to be bubbling.
     * @type {boolean}
     */
    get bubbles() {
        return Boolean(pd(this).event.bubbles)
    },

    /**
     * The flag to be cancelable.
     * @type {boolean}
     */
    get cancelable() {
        return Boolean(pd(this).event.cancelable)
    },

    /**
     * Cancel this event.
     * @returns {void}
     */
    preventDefault() {
        setCancelFlag(pd(this));
    },

    /**
     * The flag to indicate cancellation state.
     * @type {boolean}
     */
    get defaultPrevented() {
        return pd(this).canceled
    },

    /**
     * The flag to be composed.
     * @type {boolean}
     */
    get composed() {
        return Boolean(pd(this).event.composed)
    },

    /**
     * The unix time of this event.
     * @type {number}
     */
    get timeStamp() {
        return pd(this).timeStamp
    },

    /**
     * The target of this event.
     * @type {EventTarget}
     * @deprecated
     */
    get srcElement() {
        return pd(this).eventTarget
    },

    /**
     * The flag to stop event bubbling.
     * @type {boolean}
     * @deprecated
     */
    get cancelBubble() {
        return pd(this).stopped
    },
    set cancelBubble(value) {
        if (!value) {
            return
        }
        const data = pd(this);

        data.stopped = true;
        if (typeof data.event.cancelBubble === "boolean") {
            data.event.cancelBubble = true;
        }
    },

    /**
     * The flag to indicate cancellation state.
     * @type {boolean}
     * @deprecated
     */
    get returnValue() {
        return !pd(this).canceled
    },
    set returnValue(value) {
        if (!value) {
            setCancelFlag(pd(this));
        }
    },

    /**
     * Initialize this event object. But do nothing under event dispatching.
     * @param {string} type The event type.
     * @param {boolean} [bubbles=false] The flag to be possible to bubble up.
     * @param {boolean} [cancelable=false] The flag to be possible to cancel.
     * @deprecated
     */
    initEvent() {
        // Do nothing.
    },
};

// `constructor` is not enumerable.
Object.defineProperty(Event.prototype, "constructor", {
    value: Event,
    configurable: true,
    writable: true,
});

// Ensure `event instanceof window.Event` is `true`.
if (typeof window !== "undefined" && typeof window.Event !== "undefined") {
    Object.setPrototypeOf(Event.prototype, window.Event.prototype);

    // Make association for wrappers.
    wrappers.set(window.Event.prototype, Event);
}

/**
 * Get the property descriptor to redirect a given property.
 * @param {string} key Property name to define property descriptor.
 * @returns {PropertyDescriptor} The property descriptor to redirect the property.
 * @private
 */
function defineRedirectDescriptor(key) {
    return {
        get() {
            return pd(this).event[key]
        },
        set(value) {
            pd(this).event[key] = value;
        },
        configurable: true,
        enumerable: true,
    }
}

/**
 * Get the property descriptor to call a given method property.
 * @param {string} key Property name to define property descriptor.
 * @returns {PropertyDescriptor} The property descriptor to call the method property.
 * @private
 */
function defineCallDescriptor(key) {
    return {
        value() {
            const event = pd(this).event;
            return event[key].apply(event, arguments)
        },
        configurable: true,
        enumerable: true,
    }
}

/**
 * Define new wrapper class.
 * @param {Function} BaseEvent The base wrapper class.
 * @param {Object} proto The prototype of the original event.
 * @returns {Function} The defined wrapper class.
 * @private
 */
function defineWrapper(BaseEvent, proto) {
    const keys = Object.keys(proto);
    if (keys.length === 0) {
        return BaseEvent
    }

    /** CustomEvent */
    function CustomEvent(eventTarget, event) {
        BaseEvent.call(this, eventTarget, event);
    }

    CustomEvent.prototype = Object.create(BaseEvent.prototype, {
        constructor: { value: CustomEvent, configurable: true, writable: true },
    });

    // Define accessors.
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (!(key in BaseEvent.prototype)) {
            const descriptor = Object.getOwnPropertyDescriptor(proto, key);
            const isFunc = typeof descriptor.value === "function";
            Object.defineProperty(
                CustomEvent.prototype,
                key,
                isFunc
                    ? defineCallDescriptor(key)
                    : defineRedirectDescriptor(key)
            );
        }
    }

    return CustomEvent
}

/**
 * Get the wrapper class of a given prototype.
 * @param {Object} proto The prototype of the original event to get its wrapper.
 * @returns {Function} The wrapper class.
 * @private
 */
function getWrapper(proto) {
    if (proto == null || proto === Object.prototype) {
        return Event
    }

    let wrapper = wrappers.get(proto);
    if (wrapper == null) {
        wrapper = defineWrapper(getWrapper(Object.getPrototypeOf(proto)), proto);
        wrappers.set(proto, wrapper);
    }
    return wrapper
}

/**
 * Wrap a given event to management a dispatching.
 * @param {EventTarget} eventTarget The event target of this dispatching.
 * @param {Object} event The event to wrap.
 * @returns {Event} The wrapper instance.
 * @private
 */
function wrapEvent(eventTarget, event) {
    const Wrapper = getWrapper(Object.getPrototypeOf(event));
    return new Wrapper(eventTarget, event)
}

/**
 * Get the immediateStopped flag of a given event.
 * @param {Event} event The event to get.
 * @returns {boolean} The flag to stop propagation immediately.
 * @private
 */
function isStopped(event) {
    return pd(event).immediateStopped
}

/**
 * Set the current event phase of a given event.
 * @param {Event} event The event to set current target.
 * @param {number} eventPhase New event phase.
 * @returns {void}
 * @private
 */
function setEventPhase(event, eventPhase) {
    pd(event).eventPhase = eventPhase;
}

/**
 * Set the current target of a given event.
 * @param {Event} event The event to set current target.
 * @param {EventTarget|null} currentTarget New current target.
 * @returns {void}
 * @private
 */
function setCurrentTarget(event, currentTarget) {
    pd(event).currentTarget = currentTarget;
}

/**
 * Set a passive listener of a given event.
 * @param {Event} event The event to set current target.
 * @param {Function|null} passiveListener New passive listener.
 * @returns {void}
 * @private
 */
function setPassiveListener(event, passiveListener) {
    pd(event).passiveListener = passiveListener;
}

/**
 * @typedef {object} ListenerNode
 * @property {Function} listener
 * @property {1|2|3} listenerType
 * @property {boolean} passive
 * @property {boolean} once
 * @property {ListenerNode|null} next
 * @private
 */

/**
 * @type {WeakMap<object, Map<string, ListenerNode>>}
 * @private
 */
const listenersMap = new WeakMap();

// Listener types
const CAPTURE = 1;
const BUBBLE = 2;
const ATTRIBUTE = 3;

/**
 * Check whether a given value is an object or not.
 * @param {any} x The value to check.
 * @returns {boolean} `true` if the value is an object.
 */
function isObject(x) {
    return x !== null && typeof x === "object" //eslint-disable-line no-restricted-syntax
}

/**
 * Get listeners.
 * @param {EventTarget} eventTarget The event target to get.
 * @returns {Map<string, ListenerNode>} The listeners.
 * @private
 */
function getListeners(eventTarget) {
    const listeners = listenersMap.get(eventTarget);
    if (listeners == null) {
        throw new TypeError(
            "'this' is expected an EventTarget object, but got another value."
        )
    }
    return listeners
}

/**
 * Get the property descriptor for the event attribute of a given event.
 * @param {string} eventName The event name to get property descriptor.
 * @returns {PropertyDescriptor} The property descriptor.
 * @private
 */
function defineEventAttributeDescriptor(eventName) {
    return {
        get() {
            const listeners = getListeners(this);
            let node = listeners.get(eventName);
            while (node != null) {
                if (node.listenerType === ATTRIBUTE) {
                    return node.listener
                }
                node = node.next;
            }
            return null
        },

        set(listener) {
            if (typeof listener !== "function" && !isObject(listener)) {
                listener = null; // eslint-disable-line no-param-reassign
            }
            const listeners = getListeners(this);

            // Traverse to the tail while removing old value.
            let prev = null;
            let node = listeners.get(eventName);
            while (node != null) {
                if (node.listenerType === ATTRIBUTE) {
                    // Remove old value.
                    if (prev !== null) {
                        prev.next = node.next;
                    } else if (node.next !== null) {
                        listeners.set(eventName, node.next);
                    } else {
                        listeners.delete(eventName);
                    }
                } else {
                    prev = node;
                }

                node = node.next;
            }

            // Add new value.
            if (listener !== null) {
                const newNode = {
                    listener,
                    listenerType: ATTRIBUTE,
                    passive: false,
                    once: false,
                    next: null,
                };
                if (prev === null) {
                    listeners.set(eventName, newNode);
                } else {
                    prev.next = newNode;
                }
            }
        },
        configurable: true,
        enumerable: true,
    }
}

/**
 * Define an event attribute (e.g. `eventTarget.onclick`).
 * @param {Object} eventTargetPrototype The event target prototype to define an event attrbite.
 * @param {string} eventName The event name to define.
 * @returns {void}
 */
function defineEventAttribute(eventTargetPrototype, eventName) {
    Object.defineProperty(
        eventTargetPrototype,
        `on${eventName}`,
        defineEventAttributeDescriptor(eventName)
    );
}

/**
 * Define a custom EventTarget with event attributes.
 * @param {string[]} eventNames Event names for event attributes.
 * @returns {EventTarget} The custom EventTarget.
 * @private
 */
function defineCustomEventTarget(eventNames) {
    /** CustomEventTarget */
    function CustomEventTarget() {
        EventTarget.call(this);
    }

    CustomEventTarget.prototype = Object.create(EventTarget.prototype, {
        constructor: {
            value: CustomEventTarget,
            configurable: true,
            writable: true,
        },
    });

    for (let i = 0; i < eventNames.length; ++i) {
        defineEventAttribute(CustomEventTarget.prototype, eventNames[i]);
    }

    return CustomEventTarget
}

/**
 * EventTarget.
 *
 * - This is constructor if no arguments.
 * - This is a function which returns a CustomEventTarget constructor if there are arguments.
 *
 * For example:
 *
 *     class A extends EventTarget {}
 *     class B extends EventTarget("message") {}
 *     class C extends EventTarget("message", "error") {}
 *     class D extends EventTarget(["message", "error"]) {}
 */
function EventTarget() {
    /*eslint-disable consistent-return */
    if (this instanceof EventTarget) {
        listenersMap.set(this, new Map());
        return
    }
    if (arguments.length === 1 && Array.isArray(arguments[0])) {
        return defineCustomEventTarget(arguments[0])
    }
    if (arguments.length > 0) {
        const types = new Array(arguments.length);
        for (let i = 0; i < arguments.length; ++i) {
            types[i] = arguments[i];
        }
        return defineCustomEventTarget(types)
    }
    throw new TypeError("Cannot call a class as a function")
    /*eslint-enable consistent-return */
}

// Should be enumerable, but class methods are not enumerable.
EventTarget.prototype = {
    /**
     * Add a given listener to this event target.
     * @param {string} eventName The event name to add.
     * @param {Function} listener The listener to add.
     * @param {boolean|{capture?:boolean,passive?:boolean,once?:boolean}} [options] The options for this listener.
     * @returns {void}
     */
    addEventListener(eventName, listener, options) {
        if (listener == null) {
            return
        }
        if (typeof listener !== "function" && !isObject(listener)) {
            throw new TypeError("'listener' should be a function or an object.")
        }

        const listeners = getListeners(this);
        const optionsIsObj = isObject(options);
        const capture = optionsIsObj
            ? Boolean(options.capture)
            : Boolean(options);
        const listenerType = capture ? CAPTURE : BUBBLE;
        const newNode = {
            listener,
            listenerType,
            passive: optionsIsObj && Boolean(options.passive),
            once: optionsIsObj && Boolean(options.once),
            next: null,
        };

        // Set it as the first node if the first node is null.
        let node = listeners.get(eventName);
        if (node === undefined) {
            listeners.set(eventName, newNode);
            return
        }

        // Traverse to the tail while checking duplication..
        let prev = null;
        while (node != null) {
            if (
                node.listener === listener &&
                node.listenerType === listenerType
            ) {
                // Should ignore duplication.
                return
            }
            prev = node;
            node = node.next;
        }

        // Add it.
        prev.next = newNode;
    },

    /**
     * Remove a given listener from this event target.
     * @param {string} eventName The event name to remove.
     * @param {Function} listener The listener to remove.
     * @param {boolean|{capture?:boolean,passive?:boolean,once?:boolean}} [options] The options for this listener.
     * @returns {void}
     */
    removeEventListener(eventName, listener, options) {
        if (listener == null) {
            return
        }

        const listeners = getListeners(this);
        const capture = isObject(options)
            ? Boolean(options.capture)
            : Boolean(options);
        const listenerType = capture ? CAPTURE : BUBBLE;

        let prev = null;
        let node = listeners.get(eventName);
        while (node != null) {
            if (
                node.listener === listener &&
                node.listenerType === listenerType
            ) {
                if (prev !== null) {
                    prev.next = node.next;
                } else if (node.next !== null) {
                    listeners.set(eventName, node.next);
                } else {
                    listeners.delete(eventName);
                }
                return
            }

            prev = node;
            node = node.next;
        }
    },

    /**
     * Dispatch a given event.
     * @param {Event|{type:string}} event The event to dispatch.
     * @returns {boolean} `false` if canceled.
     */
    dispatchEvent(event) {
        if (event == null || typeof event.type !== "string") {
            throw new TypeError('"event.type" should be a string.')
        }

        // If listeners aren't registered, terminate.
        const listeners = getListeners(this);
        const eventName = event.type;
        let node = listeners.get(eventName);
        if (node == null) {
            return true
        }

        // Since we cannot rewrite several properties, so wrap object.
        const wrappedEvent = wrapEvent(this, event);

        // This doesn't process capturing phase and bubbling phase.
        // This isn't participating in a tree.
        let prev = null;
        while (node != null) {
            // Remove this listener if it's once
            if (node.once) {
                if (prev !== null) {
                    prev.next = node.next;
                } else if (node.next !== null) {
                    listeners.set(eventName, node.next);
                } else {
                    listeners.delete(eventName);
                }
            } else {
                prev = node;
            }

            // Call this listener
            setPassiveListener(
                wrappedEvent,
                node.passive ? node.listener : null
            );
            if (typeof node.listener === "function") {
                try {
                    node.listener.call(this, wrappedEvent);
                } catch (err) {
                    if (
                        typeof console !== "undefined" &&
                        typeof console.error === "function"
                    ) {
                        console.error(err);
                    }
                }
            } else if (
                node.listenerType !== ATTRIBUTE &&
                typeof node.listener.handleEvent === "function"
            ) {
                node.listener.handleEvent(wrappedEvent);
            }

            // Break if `event.stopImmediatePropagation` was called.
            if (isStopped(wrappedEvent)) {
                break
            }

            node = node.next;
        }
        setPassiveListener(wrappedEvent, null);
        setEventPhase(wrappedEvent, 0);
        setCurrentTarget(wrappedEvent, null);

        return !wrappedEvent.defaultPrevented
    },
};

// `constructor` is not enumerable.
Object.defineProperty(EventTarget.prototype, "constructor", {
    value: EventTarget,
    configurable: true,
    writable: true,
});

// Ensure `eventTarget instanceof window.EventTarget` is `true`.
if (
    typeof window !== "undefined" &&
    typeof window.EventTarget !== "undefined"
) {
    Object.setPrototypeOf(EventTarget.prototype, window.EventTarget.prototype);
}

/* harmony default export */ var event_target_shim = (EventTarget);

//# sourceMappingURL=event-target-shim.mjs.map

// CONCATENATED MODULE: ./src/index.js








/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// A wrapper that combines a WebSocket to the channelserver
// with some client-side encryption for securing the channel.
//
// This code is responsible for the event handling and the consumer API.
// All the details of encrypting the messages are delegated to`./tlsconnection.js`.




var CLOSE_FLUSH_BUFFER_INTERVAL_MS = 200;
var CLOSE_FLUSH_BUFFER_MAX_TRIES = 5;
var src_PairingChannel =
/*#__PURE__*/
function (_EventTarget) {
  inherits_default()(PairingChannel, _EventTarget);

  function PairingChannel(channelId, channelKey, socket, connection) {
    var _this;

    classCallCheck_default()(this, PairingChannel);

    _this = possibleConstructorReturn_default()(this, getPrototypeOf_default()(PairingChannel).call(this));
    _this._channelId = channelId;
    _this._channelKey = channelKey;
    _this._socket = socket;
    _this._connection = connection;
    _this._selfClosed = false;
    _this._peerClosed = false;

    _this._setupListeners();

    return _this;
  }
  /**
   * Create a new pairing channel.
   *
   * This will open a channel on the channelserver, and generate a random client-side
   * encryption key. When the promise resolves, `this.channelId` and `this.channelKey`
   * can be transferred to another client to allow it to securely connect to the channel.
   *
   * @returns Promise<PairingChannel>
   */


  createClass_default()(PairingChannel, [{
    key: "_setupListeners",
    value: function _setupListeners() {
      var _this2 = this;

      this._socket.addEventListener('message',
      /*#__PURE__*/
      function () {
        var _ref = asyncToGenerator_default()(
        /*#__PURE__*/
        regenerator_default.a.mark(function _callee(event) {
          var channelServerEnvelope, payload, data, _event;

          return regenerator_default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  // When we receive data from the channelserver, pump it through the TLS connection
                  // to decrypt it, then echo it back out to consumers as an event.
                  channelServerEnvelope = JSON.parse(event.data);
                  _context.next = 4;
                  return _this2._connection.recv(base64urlToBytes(channelServerEnvelope.message));

                case 4:
                  payload = _context.sent;

                  if (payload !== null) {
                    data = JSON.parse(bytesToUtf8(payload));

                    _this2.dispatchEvent(new CustomEvent('message', {
                      detail: {
                        data: data,
                        sender: channelServerEnvelope.sender
                      }
                    }));
                  }

                  _context.next = 12;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](0);

                  // The underlying TLS connection will signal a clean shutdown of the channel
                  // by throwing a special error, because it doesn't really have a better
                  // signally mechanism available.
                  if (_context.t0 instanceof alerts_TLSCloseNotify) {
                    _this2._peerClosed = true;

                    if (_this2._selfClosed) {
                      _this2._shutdown();
                    }

                    _event = new CustomEvent('close');
                  } else {
                    _event = new CustomEvent('error', {
                      detail: {
                        error: _context.t0
                      }
                    });
                  }

                  _this2.dispatchEvent(_event);

                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 8]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }()); // Relay the WebSocket events.


      this._socket.addEventListener('error', function () {
        _this2._shutdown(); // The dispatched event that we receive has no useful information.


        _this2.dispatchEvent(new CustomEvent('error', {
          detail: {
            error: new Error('WebSocket error.')
          }
        }));
      }); // In TLS, the peer has to explicitly send a close notification,
      // which we dispatch above.  Unexpected socket close is an error.


      this._socket.addEventListener('close', function () {
        _this2._shutdown();

        if (!_this2._peerClosed) {
          _this2.dispatchEvent(new CustomEvent('error', {
            detail: {
              error: new Error('WebSocket unexpectedly closed')
            }
          }));
        }
      });
    }
    /**
     * @param {Object} data
     */

  }, {
    key: "send",
    value: function () {
      var _send = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee2(data) {
        var payload;
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                payload = utf8ToBytes(JSON.stringify(data));
                _context2.next = 3;
                return this._connection.send(payload);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function send(_x2) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "close",
    value: function () {
      var _close = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee3() {
        var tries;
        return regenerator_default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this._selfClosed = true;
                _context3.next = 3;
                return this._connection.close();

              case 3:
                _context3.prev = 3;
                // Ensure all queued bytes have been sent before closing the connection.
                tries = 0;

              case 5:
                if (!(this._socket.bufferedAmount > 0)) {
                  _context3.next = 12;
                  break;
                }

                if (!(++tries > CLOSE_FLUSH_BUFFER_MAX_TRIES)) {
                  _context3.next = 8;
                  break;
                }

                throw new Error('Could not flush the outgoing buffer in time.');

              case 8:
                _context3.next = 10;
                return new Promise(function (res) {
                  return setTimeout(res, CLOSE_FLUSH_BUFFER_INTERVAL_MS);
                });

              case 10:
                _context3.next = 5;
                break;

              case 12:
                _context3.prev = 12;

                // If the peer hasn't closed, we might still receive some data.
                if (this._peerClosed) {
                  this._shutdown();
                }

                return _context3.finish(12);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3,, 12, 15]]);
      }));

      function close() {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }, {
    key: "_shutdown",
    value: function _shutdown() {
      if (this._socket) {
        this._socket.close();

        this._socket = null;
        this._connection = null;
      }
    }
  }, {
    key: "closed",
    get: function get() {
      return !this._socket || this._socket.readyState === 3;
    }
  }, {
    key: "channelId",
    get: function get() {
      return this._channelId;
    }
  }, {
    key: "channelKey",
    get: function get() {
      return this._channelKey;
    }
  }], [{
    key: "create",
    value: function create(channelServerURI) {
      var wsURI = new URL('/v1/ws/', channelServerURI).href;
      var channelKey = crypto.getRandomValues(new Uint8Array(32)); // The one who creates the channel plays the role of 'server' in the underlying TLS exchange.

      return this._makePairingChannel(wsURI, tlsconnection_ServerConnection, channelKey);
    }
    /**
     * Connect to an existing pairing channel.
     *
     * This will connect to a channel on the channelserver previously established by
     * another client calling `create`. The `channelId` and `channelKey` must have been
     * obtained via some out-of-band mechanism (such as by scanning from a QR code).
     *
     * @returns Promise<PairingChannel>
     */

  }, {
    key: "connect",
    value: function connect(channelServerURI, channelId, channelKey) {
      var wsURI = new URL("/v1/ws/".concat(channelId), channelServerURI).href; // The one who connects to an existing channel plays the role of 'client'
      // in the underlying TLS exchange.

      return this._makePairingChannel(wsURI, tlsconnection_ClientConnection, channelKey);
    }
  }, {
    key: "_makePairingChannel",
    value: function _makePairingChannel(wsUri, ConnectionClass, psk) {
      var _this3 = this;

      var socket = new WebSocket(wsUri);
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line prefer-const
        var stopListening;

        var onConnectionError =
        /*#__PURE__*/
        function () {
          var _ref2 = asyncToGenerator_default()(
          /*#__PURE__*/
          regenerator_default.a.mark(function _callee4() {
            return regenerator_default.a.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    stopListening();
                    reject(new Error('Error while creating the pairing channel'));

                  case 2:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));

          return function onConnectionError() {
            return _ref2.apply(this, arguments);
          };
        }();

        var onFirstMessage =
        /*#__PURE__*/
        function () {
          var _ref3 = asyncToGenerator_default()(
          /*#__PURE__*/
          regenerator_default.a.mark(function _callee5(event) {
            var _JSON$parse, channelId, pskId, connection, instance;

            return regenerator_default.a.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    stopListening();
                    _context5.prev = 1;
                    // The channelserver echos back the channel id, and we use it as an
                    // additional input to the TLS handshake via the "psk id" field.
                    _JSON$parse = JSON.parse(event.data), channelId = _JSON$parse.channelid;
                    pskId = utf8ToBytes(channelId);
                    _context5.next = 6;
                    return ConnectionClass.create(psk, pskId, function (data) {
                      // Send data by forwarding it via the channelserver websocket.
                      // The TLS connection gives us `data` as raw bytes, but channelserver
                      // expects b64urlsafe strings, because it wraps them in a JSON object envelope.
                      socket.send(bytesToBase64url(data));
                    });

                  case 6:
                    connection = _context5.sent;
                    instance = new _this3(channelId, psk, socket, connection);
                    resolve(instance);
                    _context5.next = 14;
                    break;

                  case 11:
                    _context5.prev = 11;
                    _context5.t0 = _context5["catch"](1);
                    reject(_context5.t0);

                  case 14:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this, [[1, 11]]);
          }));

          return function onFirstMessage(_x3) {
            return _ref3.apply(this, arguments);
          };
        }();

        stopListening = function stopListening() {
          socket.removeEventListener('close', onConnectionError);
          socket.removeEventListener('error', onConnectionError);
          socket.removeEventListener('message', onFirstMessage);
        };

        socket.addEventListener('close', onConnectionError);
        socket.addEventListener('error', onConnectionError);
        socket.addEventListener('message', onFirstMessage);
      });
    }
  }]);

  return PairingChannel;
}(EventTarget); // Re-export helpful utilities for calling code to use.

 // For running tests using the built bundle,
// expose a bunch of implementation details.







var _internals = {
  arrayToBytes: arrayToBytes,
  BufferReader: utils_BufferReader,
  BufferWriter: utils_BufferWriter,
  bytesAreEqual: bytesAreEqual,
  bytesToHex: bytesToHex,
  bytesToUtf8: bytesToUtf8,
  ClientConnection: tlsconnection_ClientConnection,
  Connection: tlsconnection_Connection,
  DecryptionState: recordlayer_DecryptionState,
  EncryptedExtensions: messages_EncryptedExtensions,
  EncryptionState: recordlayer_EncryptionState,
  Finished: messages_Finished,
  HASH_LENGTH: HASH_LENGTH,
  hexToBytes: hexToBytes,
  hkdfExpand: hkdfExpand,
  KeySchedule: keyschedule_KeySchedule,
  NewSessionTicket: messages_NewSessionTicket,
  RecordLayer: recordlayer_RecordLayer,
  ServerConnection: tlsconnection_ServerConnection,
  utf8ToBytes: utf8ToBytes,
  zeros: zeros
};

/***/ })
/******/ ]);
});