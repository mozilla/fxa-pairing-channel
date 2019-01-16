/*!
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * 
 * Bundle generated from https://github.com/mozilla/fxa-pairing-tls.git. Hash:527b9a6b4916e9ec7811, Chunkhash:552b65fb30e8f619a2e8.
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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


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

var _typeof = __webpack_require__(12);

var assertThisInitialized = __webpack_require__(13);

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

var setPrototypeOf = __webpack_require__(7);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(4);

var superPropBase = __webpack_require__(16);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(4);

var setPrototypeOf = __webpack_require__(7);

var isNativeFunction = __webpack_require__(14);

var construct = __webpack_require__(15);

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
/* 10 */
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

module.exports = __webpack_require__(11);

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
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

module.exports = _isNativeFunction;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(7);

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
/* 16 */
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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

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

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(5);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(4);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(6);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/wrapNativeSuper.js
var wrapNativeSuper = __webpack_require__(9);
var wrapNativeSuper_default = /*#__PURE__*/__webpack_require__.n(wrapNativeSuper);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/get.js
var helpers_get = __webpack_require__(8);
var get_default = /*#__PURE__*/__webpack_require__.n(helpers_get);

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
function assertIsString(value) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value must be a string';
  assert(typeof value === 'string', msg);
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

  var mismatch = false;

  for (var i = 0; i < v1.length; i++) {
    mismatch &= v1[i] !== v2[i];
  }

  return !mismatch;
}
function zeros(n) {
  return new Uint8Array(n);
}
var EMPTY = new Uint8Array(0); // The `BufferReader` and `BufferWriter` classes are helpers for dealing with the
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
    key: "resize",
    value: function resize(size) {
      assert(size > this.length(), 'cant resize BufferWithPointer to be smaller');
      var newbuf = new Uint8Array(size);
      newbuf.set(this._buffer.slice(0, this.tell()), 0);
      this._buffer = newbuf;
      this._dataview = new DataView(newbuf.buffer, newbuf.byteOffset, newbuf.byteLength);
    }
  }, {
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
    value: function slice() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.tell();
      return this._buffer.slice(start, end);
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
      var slice = this.slice(this.tell(), this.tell() + length);
      this.incr(length);
      return slice;
    }
  }, {
    key: "readRemainingBytes",
    value: function readRemainingBytes() {
      return this.readBytes(this.length() - this.tell());
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

      n = n << 8 | this._dataview.getUint8(this._pos + 2);
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

  function BufferWriter() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1024;

    classCallCheck_default()(this, BufferWriter);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(BufferWriter).call(this, new Uint8Array(size)));
  }

  createClass_default()(BufferWriter, [{
    key: "_maybeResize",
    value: function _maybeResize(n) {
      var newPos = this._pos + n;

      if (newPos > this.length()) {
        // Classic grow-by-doubling, up to 16kB max increment.
        var incr = Math.min(this._buffer.byteLength, 16 * 1024);
        incr = Math.max(incr, this.length() - newPos);
        this.resize(this.length() + incr);
      }
    }
  }, {
    key: "flush",
    value: function flush() {
      var length = this.tell();
      this.seek(0);
      return this.slice(0, length);
    }
  }, {
    key: "writeBytes",
    value: function writeBytes(data) {
      assertIsBytes(data);

      this._maybeResize(data.byteLength);

      this._buffer.set(data, this.tell());

      this.incr(data.byteLength);
    }
  }, {
    key: "writeUint8",
    value: function writeUint8(n) {
      this._maybeResize(1);

      this._dataview.setUint8(this._pos, n);

      this.incr(1);
    }
  }, {
    key: "writeUint16",
    value: function writeUint16(n) {
      this._maybeResize(2);

      this._dataview.setUint16(this._pos, n);

      this.incr(2);
    }
  }, {
    key: "writeUint24",
    value: function writeUint24(n) {
      this._maybeResize(3);

      this._dataview.setUint16(this._pos, n >> 8);

      this._dataview.setUint8(this._pos + 2, n & 0xFF);

      this.incr(3);
    }
  }, {
    key: "writeUint32",
    value: function writeUint32(n) {
      this._maybeResize(4);

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
// This file implements the AEAD encrypt/decrypt and hashing routines
// for the TLS_AES_128_GCM_SHA256 ciphersuite.
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
            return _context.abrupt("return", window.crypto.subtle.importKey('raw', key, {
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
            return window.crypto.subtle.encrypt({
              additionalData: additionalData,
              iv: iv,
              name: 'AES-GCM',
              tagLength: AEAD_SIZE_INFLATION * 8
            }, key, plaintext);

          case 2:
            ciphertext = _context2.sent;
            assert(plaintext.byteLength + AEAD_SIZE_INFLATION === ciphertext.byteLength, 'incorrect AEAD_SIZE_INFLATION');
            return _context2.abrupt("return", new Uint8Array(ciphertext));

          case 5:
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
            _context3.next = 2;
            return window.crypto.subtle.decrypt({
              additionalData: additionalData,
              iv: iv,
              name: 'AES-GCM',
              tagLength: AEAD_SIZE_INFLATION * 8
            }, key, ciphertext);

          case 2:
            plaintext = _context3.sent;
            assert(plaintext.byteLength + AEAD_SIZE_INFLATION === ciphertext.byteLength, 'incorrect AEAD_SIZE_INFLATION');
            return _context3.abrupt("return", new Uint8Array(plaintext));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
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
            return window.crypto.subtle.digest({
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
            return window.crypto.subtle.importKey('raw', keyBytes, {
              hash: {
                name: 'SHA-256'
              },
              name: 'HMAC'
            }, false, ['sign']);

          case 2:
            key = _context5.sent;
            _context5.next = 5;
            return window.crypto.subtle.sign({
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

function hkdfExtract(_x14, _x15) {
  return _hkdfExtract.apply(this, arguments);
}

function _hkdfExtract() {
  _hkdfExtract = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee6(salt, ikm) {
    return regenerator_default.a.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return hmac(salt, ikm);

          case 2:
            return _context6.abrupt("return", _context6.sent);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));
  return _hkdfExtract.apply(this, arguments);
}

function hkdfExpand(_x16, _x17, _x18) {
  return _hkdfExpand.apply(this, arguments);
}

function _hkdfExpand() {
  _hkdfExpand = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee7(prk, info, length) {
    var N, input, output, T, i;
    return regenerator_default.a.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            // Ref https://tools.ietf.org/html/rfc5869#section-2.3
            N = Math.ceil(length / HASH_LENGTH);
            assert(N < 255, 'too much key material requested from hkdfExpand');
            input = new utils_BufferWriter();
            output = new utils_BufferWriter();
            T = new Uint8Array(0);
            i = 1;

          case 6:
            if (!(i <= N)) {
              _context7.next = 17;
              break;
            }

            input.writeBytes(T);
            input.writeBytes(info);
            input.writeUint8(i);
            _context7.next = 12;
            return hmac(prk, input.flush());

          case 12:
            T = _context7.sent;
            output.writeBytes(T);

          case 14:
            i++;
            _context7.next = 6;
            break;

          case 17:
            assert(output.tell() === N * HASH_LENGTH, 'hkdfExpand generated too much data');
            return _context7.abrupt("return", output.slice(0, length));

          case 19:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));
  return _hkdfExpand.apply(this, arguments);
}

function hkdfExpandLabel(_x19, _x20, _x21, _x22) {
  return _hkdfExpandLabel.apply(this, arguments);
}

function _hkdfExpandLabel() {
  _hkdfExpandLabel = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee8(secret, label, context, length) {
    var hkdfLabel;
    return regenerator_default.a.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            assertIsString(label);
            assertIsBytes(context); //  struct {
            //    uint16 length = Length;
            //    opaque label < 7..255 > = "tls13 " + Label;
            //    opaque context < 0..255 > = Context;
            //  } HkdfLabel;

            hkdfLabel = new utils_BufferWriter();
            hkdfLabel.writeUint16(length);
            hkdfLabel.writeVectorBytes8(utf8ToBytes('tls13 ' + label));
            hkdfLabel.writeVectorBytes8(context);
            return _context8.abrupt("return", hkdfExpand(secret, hkdfLabel.flush(), length));

          case 7:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));
  return _hkdfExpandLabel.apply(this, arguments);
}

function getRandomBytes(_x23) {
  return _getRandomBytes.apply(this, arguments);
}

function _getRandomBytes() {
  _getRandomBytes = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee9(size) {
    var bytes;
    return regenerator_default.a.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            bytes = new Uint8Array(size);
            crypto.getRandomValues(bytes);
            return _context9.abrupt("return", bytes);

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
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
  ENCRYPTED_EXTENSIONS: 8,
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
  var size = buf.readUint24();
  var expectedEnd = size + buf.tell();
  var msg;

  switch (type) {
    case HANDSHAKE_TYPE.CLIENT_HELLO:
      msg = messages_ClientHello._read(buf);
      break;

    case HANDSHAKE_TYPE.SERVER_HELLO:
      msg = messages_ServerHello._read(buf);
      break;

    case HANDSHAKE_TYPE.ENCRYPTED_EXTENSIONS:
      msg = messages_EncryptedExtensions._read(buf);
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
    key: "render",
    value: function render() {
      var buf = new utils_BufferWriter();
      this.write(buf);
      return buf.flush();
    }
  }, {
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
    //

  }, {
    key: "_writeExtension",
    value: function _writeExtension(buf, type, cb) {
      buf.writeUint16(type);
      buf.writeVector16(cb);
    }
  }, {
    key: "TYPE_TAG",
    get: function get() {
      assert(false, 'not implemented');
    }
  }], [{
    key: "_read",
    value: function _read(buf) {
      assert(false, 'not implemented');
    }
  }, {
    key: "_write",
    value: function _write(buf) {
      assert(false, 'not implemented');
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

  function ClientHello(random, sessionId, pskIds, pskBinders) {
    var _this2;

    classCallCheck_default()(this, ClientHello);

    _this2 = possibleConstructorReturn_default()(this, getPrototypeOf_default()(ClientHello).call(this));
    _this2.random = random;
    _this2.sessionId = sessionId;
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
      buf.writeBytes(this.random);
      buf.writeVectorBytes8(this.sessionId); // Our single supported ciphersuite

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

      var random = buf.readBytes(32); // Read legacy_session_id so the server can echo it.

      var sessionId = buf.readVectorBytes8(); // We only support a single ciphersuite, but the peer may offer several.
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
      return new this(random, sessionId, pskIds, pskBinders);
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

  function ServerHello(random, sessionId, pskIndex) {
    var _this4;

    classCallCheck_default()(this, ServerHello);

    _this4 = possibleConstructorReturn_default()(this, getPrototypeOf_default()(ServerHello).call(this));
    _this4.random = random;
    _this4.sessionId = sessionId;
    _this4.pskIndex = pskIndex;
    assert(random.byteLength === 32, 'random must be 32 bytes');
    return _this4;
  }

  createClass_default()(ServerHello, [{
    key: "_write",
    value: function _write(buf) {
      var _this5 = this;

      buf.writeUint16(VERSION_TLS_1_2);
      buf.writeBytes(this.random);
      buf.writeVectorBytes8(this.sessionId); // Our single supported ciphersuite

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

      var random = buf.readBytes(32); // It should have echoed our vector for legacy_session_id.

      var sessionId = buf.readVectorBytes8(); // It should have selected our single offered ciphersuite.

      var foundCipherSuite = buf.readUint16();
      assert(foundCipherSuite === TLS_AES_128_GCM_SHA256, 'illegal_parameter ciphersuite'); // legacy_compression_methods must be zero.

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
      return new this(random, sessionId, pskIndex);
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

  function EncryptedExtensions() {
    classCallCheck_default()(this, EncryptedExtensions);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(EncryptedExtensions).apply(this, arguments));
  }

  createClass_default()(EncryptedExtensions, [{
    key: "_write",
    value: function _write(buf) {
      // Empty vector of extensions
      buf.writeVector16(function (buf) {});
    }
  }, {
    key: "TYPE_TAG",
    get: function get() {
      return HANDSHAKE_TYPE.ENCRYPTED_EXTENSIONS;
    }
  }], [{
    key: "_read",
    value: function _read(buf) {
      // We should not receive any encrypted extensions,
      // since we do not advertize any in the ClientHello.
      buf.readVector16(function (buf, length) {
        assert(length === 0, 'unexpected encrypted extension');
      });
      return new this();
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











 // The length of the data for PSK binders at the end of the ClientHello.
// We only support a single PSK, so it's the length of the hash plus one
// for rendering it as a variable-length byte array, plus two for rendering
// the variable-length list of PSK binders.

var PSK_BINDERS_SIZE = HASH_LENGTH + 1 + 2; //
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
                // By default, assume we're not ready to send yet
                // and just let the data queue up for a future state.
                // XXX TODO: should this block until it's successfuly sent?
                this.conn._sendBuffer.writeBytes(bytes);

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
                assert(false, 'not ready to receive application data');

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
                assert(false, 'not expecting to receive a handhake message');

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
    key: "close",
    value: function () {
      var _close = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee5() {
        return regenerator_default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // XXX TODO: implement explicit close, including the `close_notify` alert message.
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
      regenerator_default.a.mark(function _callee7(bytes) {
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

      function sendApplicationData(_x4) {
        return _sendApplicationData2.apply(this, arguments);
      }

      return sendApplicationData;
    }()
  }, {
    key: "recvApplicationData",
    value: function () {
      var _recvApplicationData2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee8(bytes) {
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

      function recvApplicationData(_x5) {
        return _recvApplicationData2.apply(this, arguments);
      }

      return recvApplicationData;
    }()
  }, {
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee9(msg) {
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

      function recvHandshakeMessage(_x6) {
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

      function initialize(_x7) {
        return _initialize3.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "sendApplicationData",
    value: function () {
      var _sendApplicationData3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee12(bytes) {
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

      function sendApplicationData(_x8) {
        return _sendApplicationData3.apply(this, arguments);
      }

      return sendApplicationData;
    }()
  }, {
    key: "recvApplicationData",
    value: function () {
      var _recvApplicationData3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee13(bytes) {
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

      function recvApplicationData(_x9) {
        return _recvApplicationData3.apply(this, arguments);
      }

      return recvApplicationData;
    }()
  }, {
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee14(msg) {
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

      function recvHandshakeMessage(_x10) {
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
}(states_State); // The "connected" state, for when the handshake is complete
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
        return regenerator_default.a.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (!(this.conn._sendBuffer.tell() > 0)) {
                  _context16.next = 3;
                  break;
                }

                _context16.next = 3;
                return this.sendApplicationData(this.conn._sendBuffer.flush());

              case 3:
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
      regenerator_default.a.mark(function _callee17(bytes) {
        return regenerator_default.a.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return this.conn._sendApplicationData(bytes);

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
      regenerator_default.a.mark(function _callee18(bytes) {
        return regenerator_default.a.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                this.conn._recvBuffer.writeBytes(bytes);

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
//   * receive EncryptedExtensions
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
        var keyschedule, clientHello, buf, truncatedTranscript;
        return regenerator_default.a.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                keyschedule = this.conn._keyschedule;
                _context19.next = 3;
                return keyschedule.addPSK(this.conn.psk);

              case 3:
                // Construct a ClientHello message with our single PSK.
                // We can't know the PSK binder value yet, so we initially write zeros.
                clientHello = new messages_ClientHello(this.conn.randomSalt, new Uint8Array(0), [this.conn.pskId], [new Uint8Array(HASH_LENGTH)]);
                buf = new utils_BufferWriter();
                clientHello.write(buf); // Now that we know what the ClientHello looks like,
                // go back and calculate the appropriate PSK binder value.

                truncatedTranscript = buf.slice(0, -PSK_BINDERS_SIZE);
                _context19.next = 9;
                return keyschedule.calculateFinishedMAC(keyschedule.extBinderKey, truncatedTranscript);

              case 9:
                clientHello.pskBinders[0] = _context19.sent;
                buf.incr(-HASH_LENGTH);
                buf.writeBytes(clientHello.pskBinders[0]);
                _context19.next = 14;
                return this.conn._sendHandshakeMessage(buf.flush());

              case 14:
                _context19.next = 16;
                return this.conn._flushOutgoingRecord();

              case 16:
                _context19.next = 18;
                return this.conn._transition(states_CLIENT_WAIT_SH, clientHello);

              case 18:
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
    key: "initialize",
    value: function () {
      var _initialize6 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee20(clientHello) {
        return regenerator_default.a.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                this._clientHello = clientHello;

              case 1:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function initialize(_x13) {
        return _initialize6.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage4 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee21(msg) {
        return regenerator_default.a.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                assert(msg instanceof messages_ServerHello, 'expected ServerHello');
                assert(bytesAreEqual(msg.sessionId, this._clientHello.sessionId), 'server did not echo our sessionId');
                assert(msg.pskIndex === 0, 'server did not select our offered PSK');
                _context21.next = 5;
                return this.conn._keyschedule.addECDHE(null);

              case 5:
                _context21.next = 7;
                return this.conn._setSendKey(this.conn._keyschedule.clientHandshakeTrafficSecret);

              case 7:
                _context21.next = 9;
                return this.conn._setRecvKey(this.conn._keyschedule.serverHandshakeTrafficSecret);

              case 9:
                _context21.next = 11;
                return this.conn._transition(states_CLIENT_WAIT_EE);

              case 11:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function recvHandshakeMessage(_x14) {
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
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage5 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee22(msg) {
        var keyschedule, expectedServerFinishedMAC;
        return regenerator_default.a.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                // We don't make use of any encrypted extensions, but we still
                // have to wait for the server to send the (empty) list of them.
                assert(msg instanceof messages_EncryptedExtensions, 'expected EncryptedExtensions');
                keyschedule = this.conn._keyschedule;
                _context22.next = 4;
                return keyschedule.calculateFinishedMAC(keyschedule.serverHandshakeTrafficSecret);

              case 4:
                expectedServerFinishedMAC = _context22.sent;
                _context22.next = 7;
                return this.conn._transition(states_CLIENT_WAIT_FINISHED, expectedServerFinishedMAC);

              case 7:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function recvHandshakeMessage(_x15) {
        return _recvHandshakeMessage5.apply(this, arguments);
      }

      return recvHandshakeMessage;
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
    key: "initialize",
    value: function () {
      var _initialize7 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee23(expectedServerFinishedMAC) {
        return regenerator_default.a.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                this._expectedServerFinishedMAC = expectedServerFinishedMAC;

              case 1:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function initialize(_x16) {
        return _initialize7.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage6 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee24(msg) {
        var keyschedule, clientFinishedMAC;
        return regenerator_default.a.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                assert(msg instanceof messages_Finished, 'expected Finished'); // Verify server Finished MAC.

                assert(bytesAreEqual(msg.verifyData, this._expectedServerFinishedMAC), 'invalid Finished MAC'); // Send our own Finished message in return.
                // This must be encrypted with the handshake traffic key,
                // but must not appear in the transscript used to calculate the application keys.

                keyschedule = this.conn._keyschedule;
                _context24.next = 5;
                return keyschedule.calculateFinishedMAC(keyschedule.clientHandshakeTrafficSecret);

              case 5:
                clientFinishedMAC = _context24.sent;
                _context24.next = 8;
                return keyschedule.finalize();

              case 8:
                _context24.next = 10;
                return this.conn._writeHandshakeMessage(new messages_Finished(clientFinishedMAC));

              case 10:
                _context24.next = 12;
                return this.conn._flushOutgoingRecord();

              case 12:
                _context24.next = 14;
                return this.conn._setSendKey(keyschedule.clientApplicationTrafficSecret);

              case 14:
                _context24.next = 16;
                return this.conn._setRecvKey(keyschedule.serverApplicationTrafficSecret);

              case 16:
                _context24.next = 18;
                return this.conn._transition(states_CONNECTED);

              case 18:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));

      function recvHandshakeMessage(_x17) {
        return _recvHandshakeMessage6.apply(this, arguments);
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
      var _recvHandshakeMessage7 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee25(msg) {
        return regenerator_default.a.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                assert(msg instanceof messages_ClientHello, 'expected ClientHello');
                _context25.next = 3;
                return this.conn._transition(states_SERVER_RECVD_CH, msg);

              case 3:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function recvHandshakeMessage(_x18) {
        return _recvHandshakeMessage7.apply(this, arguments);
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
      var _initialize8 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee26(clientHello) {
        var _this = this;

        var pskIndex, keyschedule, transcript, expectedPskBinder;
        return regenerator_default.a.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                // In the spec, this is where we select connection parameters, and maybe
                // tell the client to try again if we can't find a compatible set.
                // Since we only support a fixed cipherset, the only thing to "negotiate"
                // is whether they provided an acceptable PSK.
                pskIndex = clientHello.pskIds.findIndex(function (pskId) {
                  return bytesAreEqual(pskId, _this.conn.pskId);
                });
                assert(pskIndex !== -1, 'client did not offer a matching PSK');
                _context26.next = 4;
                return this.conn._keyschedule.addPSK(this.conn.psk);

              case 4:
                // Validate the PSK binder.
                keyschedule = this.conn._keyschedule;
                transcript = keyschedule.getTranscript();
                _context26.next = 8;
                return keyschedule.calculateFinishedMAC(keyschedule.extBinderKey, transcript.slice(0, -PSK_BINDERS_SIZE));

              case 8:
                expectedPskBinder = _context26.sent;
                assert(bytesAreEqual(clientHello.pskBinders[pskIndex], expectedPskBinder), 'incorrect pskBinder');
                _context26.next = 12;
                return this.conn._transition(states_SERVER_NEGOTIATED, clientHello, pskIndex);

              case 12:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      function initialize(_x19) {
        return _initialize8.apply(this, arguments);
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
      var _initialize9 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee27(clientHello, pskIndex) {
        var keyschedule, serverFinishedMAC, expectedClientFinishedMAC;
        return regenerator_default.a.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _context27.next = 2;
                return this.conn._writeHandshakeMessage(new messages_ServerHello(this.conn.randomSalt, clientHello.sessionId, pskIndex));

              case 2:
                _context27.next = 4;
                return this.conn._flushOutgoingRecord();

              case 4:
                // We can now transition to the encrypted part of the handshake.
                keyschedule = this.conn._keyschedule;
                _context27.next = 7;
                return keyschedule.addECDHE(null);

              case 7:
                _context27.next = 9;
                return this.conn._setSendKey(keyschedule.serverHandshakeTrafficSecret);

              case 9:
                _context27.next = 11;
                return this.conn._setRecvKey(keyschedule.clientHandshakeTrafficSecret);

              case 11:
                _context27.next = 13;
                return this.conn._writeHandshakeMessage(new messages_EncryptedExtensions());

              case 13:
                _context27.next = 15;
                return this.conn._flushOutgoingRecord();

              case 15:
                _context27.next = 17;
                return keyschedule.calculateFinishedMAC(keyschedule.serverHandshakeTrafficSecret);

              case 17:
                serverFinishedMAC = _context27.sent;
                _context27.next = 20;
                return this.conn._writeHandshakeMessage(new messages_Finished(serverFinishedMAC));

              case 20:
                _context27.next = 22;
                return this.conn._flushOutgoingRecord();

              case 22:
                _context27.next = 24;
                return keyschedule.calculateFinishedMAC(keyschedule.clientHandshakeTrafficSecret);

              case 24:
                expectedClientFinishedMAC = _context27.sent;
                _context27.next = 27;
                return this.conn._keyschedule.finalize();

              case 27:
                _context27.next = 29;
                return this.conn._setSendKey(keyschedule.serverApplicationTrafficSecret);

              case 29:
                _context27.next = 31;
                return this.conn._transition(states_SERVER_WAIT_FINISHED, expectedClientFinishedMAC);

              case 31:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      function initialize(_x20, _x21) {
        return _initialize9.apply(this, arguments);
      }

      return initialize;
    }()
  }]);

  return SERVER_NEGOTIATED;
}(states_State);

var states_SERVER_WAIT_FINISHED =
/*#__PURE__*/
function (_State11) {
  inherits_default()(SERVER_WAIT_FINISHED, _State11);

  function SERVER_WAIT_FINISHED() {
    classCallCheck_default()(this, SERVER_WAIT_FINISHED);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(SERVER_WAIT_FINISHED).apply(this, arguments));
  }

  createClass_default()(SERVER_WAIT_FINISHED, [{
    key: "initialize",
    value: function () {
      var _initialize10 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee28(expectedClientFinishedMAC) {
        return regenerator_default.a.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                this._expectedClientFinishedMAC = expectedClientFinishedMAC;

              case 1:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      function initialize(_x22) {
        return _initialize10.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "recvHandshakeMessage",
    value: function () {
      var _recvHandshakeMessage8 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee29(msg) {
        return regenerator_default.a.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                assert(msg instanceof messages_Finished, 'expected Finished');
                assert(bytesAreEqual(msg.verifyData, this._expectedClientFinishedMAC, 'invalid Finished MAC'));
                _context29.next = 4;
                return this.conn._setRecvKey(this.conn._keyschedule.clientApplicationTrafficSecret);

              case 4:
                _context29.next = 6;
                return this.conn._transition(states_CONNECTED);

              case 6:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
      }));

      function recvHandshakeMessage(_x23) {
        return _recvHandshakeMessage8.apply(this, arguments);
      }

      return recvHandshakeMessage;
    }()
  }]);

  return SERVER_WAIT_FINISHED;
}(states_State);
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
//







var STAGE_UNINITIALIZED = 0;
var STAGE_EARLY_SECRET = 1;
var STAGE_HANDSHAKE_SECRET = 2;
var STAGE_MASTER_SECRET = 3;
var keyschedule_KeySchedule =
/*#__PURE__*/
function () {
  function KeySchedule() {
    classCallCheck_default()(this, KeySchedule);

    // WebCrypto doesn't support a rolling hash construct, so we have to
    // keep the entire message transcript in memory.
    this.transcript = new utils_BufferWriter(); // This tracks the main secret from with other keys are derived at each stage.

    this.secret = null;
    this.stage = STAGE_UNINITIALIZED; // And these are all the various keys we'll derive as the handshake progresses.

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
                psk = psk || zeros(HASH_LENGTH);
                assert(this.stage === STAGE_UNINITIALIZED, 'PSK added at incorrect state');
                _context.next = 4;
                return hkdfExtract(zeros(HASH_LENGTH), psk);

              case 4:
                this.secret = _context.sent;
                this.stage = STAGE_EARLY_SECRET;
                _context.next = 8;
                return this.deriveSecret('ext binder', EMPTY);

              case 8:
                this.extBinderKey = _context.sent;

              case 9:
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
                ecdhe = ecdhe || zeros(HASH_LENGTH);
                ;
                assert(this.stage === STAGE_EARLY_SECRET, 'ECDHE added at incorrect state');
                _context2.t0 = hkdfExtract;
                _context2.next = 6;
                return this.deriveSecret('derived', EMPTY);

              case 6:
                _context2.t1 = _context2.sent;
                _context2.t2 = ecdhe;
                _context2.next = 10;
                return (0, _context2.t0)(_context2.t1, _context2.t2);

              case 10:
                this.secret = _context2.sent;
                this.stage = STAGE_HANDSHAKE_SECRET;
                _context2.next = 14;
                return this.deriveSecret('c hs traffic');

              case 14:
                this.clientHandshakeTrafficSecret = _context2.sent;
                _context2.next = 17;
                return this.deriveSecret('s hs traffic');

              case 17:
                this.serverHandshakeTrafficSecret = _context2.sent;

              case 18:
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
                assert(this.stage === STAGE_HANDSHAKE_SECRET, 'finalized in incorrect state');
                _context3.t0 = hkdfExtract;
                _context3.next = 4;
                return this.deriveSecret('derived', EMPTY);

              case 4:
                _context3.t1 = _context3.sent;
                _context3.t2 = zeros(HASH_LENGTH);
                _context3.next = 8;
                return (0, _context3.t0)(_context3.t1, _context3.t2);

              case 8:
                this.secret = _context3.sent;
                this.stage = STAGE_MASTER_SECRET;
                _context3.next = 12;
                return this.deriveSecret('c ap traffic');

              case 12:
                this.clientApplicationTrafficSecret = _context3.sent;
                _context3.next = 15;
                return this.deriveSecret('s ap traffic');

              case 15:
                this.serverApplicationTrafficSecret = _context3.sent;

              case 16:
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
  }]);

  return KeySchedule;
}();
// CONCATENATED MODULE: ./src/constants.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */


var VERSION_TLS_1_0 = 0x0301;
var constants_VERSION_TLS_1_2 = 0x0303;
var constants_VERSION_TLS_1_3 = 0x0304;
var constants_TLS_AES_128_GCM_SHA256 = 0x1301;
var constants_PSK_MODE_KE = 0;
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
var RECORD_HEADER_SIZE = 5; // This is a helper class to manage the encryption/decryption state
// for a particular key.

var recordlayer_CipherState =
/*#__PURE__*/
function () {
  function CipherState() {
    classCallCheck_default()(this, CipherState);

    this.key = null;
    this.iv = null;
    this.seqnum = 0;
  }

  createClass_default()(CipherState, [{
    key: "setKey",
    value: function () {
      var _setKey = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee(key, mode) {
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                assertIsBytes(key); // Derive key and iv per https://tools.ietf.org/html/rfc8446#section-7.3

                _context.t0 = prepareKey;
                _context.next = 4;
                return hkdfExpandLabel(key, 'key', EMPTY, KEY_LENGTH);

              case 4:
                _context.t1 = _context.sent;
                _context.t2 = mode;
                _context.next = 8;
                return (0, _context.t0)(_context.t1, _context.t2);

              case 8:
                this.key = _context.sent;
                _context.next = 11;
                return hkdfExpandLabel(key, 'iv', EMPTY, IV_LENGTH);

              case 11:
                this.iv = _context.sent;
                this.seqnum = 0;

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setKey(_x, _x2) {
        return _setKey.apply(this, arguments);
      }

      return setKey;
    }()
  }, {
    key: "nonce",
    value: function nonce() {
      // Ref https://tools.ietf.org/html/rfc8446#section-5.3:
      // * left-pad the sequence number with zeros to IV_LENGTH
      // * xor with the provided iv
      var nonce = new Uint8Array(IV_LENGTH); // Our sequence numbers are always less than 2^24, so fit in a Uint32.

      new DataView(nonce.buffer).setUint32(IV_LENGTH - 4, this.seqnum);

      for (var i = 0; i < IV_LENGTH; i++) {
        nonce[i] ^= this.iv[i];
      }

      this.seqnum += 1;
      assert(this.seqnum < MAX_SEQUENCE_NUMBER, 'sequence number overflow');
      return nonce;
    }
  }, {
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
  }, {
    key: "decrypt",
    value: function () {
      var _decrypt2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee3(ciphertext, additionalData) {
        return regenerator_default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return crypto_decrypt(this.key, this.nonce(), ciphertext, additionalData);

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function decrypt(_x5, _x6) {
        return _decrypt2.apply(this, arguments);
      }

      return decrypt;
    }()
  }]);

  return CipherState;
}(); // The main RecordLayer class.


var recordlayer_RecordLayer =
/*#__PURE__*/
function () {
  function RecordLayer(sendCallback) {
    classCallCheck_default()(this, RecordLayer);

    this.sendCallback = sendCallback;
    this._sendCipherState = new recordlayer_CipherState();
    this._recvCipherState = new recordlayer_CipherState();
    this._pendingRecordType = 0;
    this._pendingRecordBuf = null;
  }

  createClass_default()(RecordLayer, [{
    key: "setSendKey",
    value: function () {
      var _setSendKey = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee4(key) {
        return regenerator_default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._sendCipherState.setKey(key, 'encrypt');

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setSendKey(_x7) {
        return _setSendKey.apply(this, arguments);
      }

      return setSendKey;
    }()
  }, {
    key: "setRecvKey",
    value: function () {
      var _setRecvKey = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee5(key) {
        return regenerator_default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._recvCipherState.setKey(key, 'decrypt');

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function setRecvKey(_x8) {
        return _setRecvKey.apply(this, arguments);
      }

      return setRecvKey;
    }()
  }, {
    key: "send",
    value: function () {
      var _send = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee6(type, data) {
        return regenerator_default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                assertIsBytes(data); // Flush if we're switching to a different record type.

                if (!(this._pendingRecordType && this._pendingRecordType !== type)) {
                  _context6.next = 4;
                  break;
                }

                _context6.next = 4;
                return this.flush();

              case 4:
                if (!(this._pendingRecordBuf !== null)) {
                  _context6.next = 8;
                  break;
                }

                if (!(this._pendingRecordBuf.tell() + data.byteLength > MAX_RECORD_SIZE)) {
                  _context6.next = 8;
                  break;
                }

                _context6.next = 8;
                return this.flush();

              case 8:
                // Forbid sending data that doesn't fit into a single record.
                // XXX TODO: implement fragmentation of data across multiple records.
                // This is not necessary for current use-cases, but it should at least fail cleanly.
                assert(data.byteLength < MAX_RECORD_SIZE, 'data too large to fit in a single record'); // Start a new pending record if necessary.
                // We reserve space at the start of the buffer for the record header,
                // which is conveniently always a fixed size.

                if (this._pendingRecordBuf === null) {
                  this._pendingRecordType = type;
                  this._pendingRecordBuf = new utils_BufferWriter();

                  this._pendingRecordBuf.incr(RECORD_HEADER_SIZE);
                }

                this._pendingRecordBuf.writeBytes(data);

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function send(_x9, _x10) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "flush",
    value: function () {
      var _flush = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee7() {
        var buf, type, length, additionalData, ciphertext;
        return regenerator_default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                buf = this._pendingRecordBuf;
                type = this._pendingRecordType; // If there's nothing to flush, bail out early.
                // Note that it *is* possible to send an empty record of type APPLICATION_DATA.

                if (type) {
                  _context7.next = 4;
                  break;
                }

                return _context7.abrupt("return");

              case 4:
                length = buf.tell() - RECORD_HEADER_SIZE;

                if (!(this._sendCipherState.key === null)) {
                  _context7.next = 14;
                  break;
                }

                // Generate an unencrypted `TLSPlaintext` struct by just
                // filling in an appropriate record header.
                assert(type !== RECORD_TYPE.APPLICATION_DATA, 'must encrypt application data');
                buf.seek(0);
                buf.writeUint8(type);
                buf.writeUint16(constants_VERSION_TLS_1_2);
                buf.writeUint16(length);
                buf.incr(length);
                _context7.next = 27;
                break;

              case 14:
                // Generate an encrypted `TLSCiphertext` struct.
                // First, turn the existing buffer contents into a `TLSInnerPlaintext` by
                // appending the type.  We don't do any zero-padding, although the spec allows it.
                buf.writeUint8(type);
                length += 1; // Write the record header, knowing that we will inflate the plaintext
                // by some fixed additional amount due to the encryption.

                buf.seek(0);
                buf.writeUint8(RECORD_TYPE.APPLICATION_DATA);
                buf.writeUint16(constants_VERSION_TLS_1_2);
                buf.writeUint16(length + AEAD_SIZE_INFLATION); // The additional data for the encryption is the `TLSCiphertext` record header
                // that  we just wrote, which we know to be the first `RECORD_HEADER_SIZE` bytes.

                additionalData = buf.slice(0, RECORD_HEADER_SIZE);
                _context7.next = 23;
                return this._sendCipherState.encrypt(buf.slice(RECORD_HEADER_SIZE, RECORD_HEADER_SIZE + length), additionalData);

              case 23:
                ciphertext = _context7.sent;
                length += AEAD_SIZE_INFLATION;
                assert(ciphertext.byteLength === length, 'unexpected ciphertext length');
                buf.writeBytes(ciphertext);

              case 27:
                this._pendingRecordBuf = null;
                this._pendingRecordType = 0;
                _context7.next = 31;
                return this.sendCallback(buf.slice());

              case 31:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
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
      regenerator_default.a.mark(function _callee8(data, messageCallback) {
        var buf, type, length, plaintext, additionalData, ciphertext, paddedPlaintext, i, mbuf, mlength;
        return regenerator_default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                // The given data may contain multiple records concatenated together, but for the initial
                // version we will assume that:
                //  * it does not contain partial records
                //  * handshake messages are not fragmented across multiple records.
                // We can add the code to handle these cases, but it's fiddly and is not
                // necessary for our initial implementation since we never emit such data ourselves.
                // XXX TODO: record fragmentation, message fragmentation.
                buf = new utils_BufferReader(data);

              case 1:
                if (!buf.hasMoreBytes()) {
                  _context8.next = 45;
                  break;
                }

                // The data to read is either a TLSPlaintext or TLSCiphertext struct,
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
                type = buf.readUint8(); // The legacy_record_version "MUST be ignored for all purposes".

                buf.readUint16();
                length = buf.readUint16();
                plaintext = void 0;

                if (!(this._recvCipherState.key === null || type === RECORD_TYPE.CHANGE_CIPHER_SPEC)) {
                  _context8.next = 12;
                  break;
                }

                // An unencrypted `TLSPlaintext` struct.
                assert(type !== RECORD_TYPE.APPLICATION_DATA, 'must encrypt application data');
                assert(length < MAX_RECORD_SIZE, 'record_overflow');
                plaintext = buf.readBytes(length);
                _context8.next = 31;
                break;

              case 12:
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

                additionalData = buf.slice(buf.tell() - RECORD_HEADER_SIZE, buf.tell());
                ciphertext = buf.readBytes(length);
                _context8.next = 18;
                return this._recvCipherState.decrypt(ciphertext, additionalData);

              case 18:
                paddedPlaintext = _context8.sent;
                // We have to scan backwards over the zero padding at the end of the struct
                // in order to find the non-zero `type` byte.
                i = void 0;
                i = paddedPlaintext.byteLength - 1;

              case 21:
                if (!(i >= 0)) {
                  _context8.next = 27;
                  break;
                }

                if (!(paddedPlaintext[i] !== 0)) {
                  _context8.next = 24;
                  break;
                }

                return _context8.abrupt("break", 27);

              case 24:
                i--;
                _context8.next = 21;
                break;

              case 27:
                assert(i >= 0, 'failed to find type byte in TLSInnerPlaintext');
                type = paddedPlaintext[i];
                assert(type !== RECORD_TYPE.CHANGE_CIPHER_SPEC, 'change_cipher_spec records must be plaintext');
                plaintext = paddedPlaintext.slice(0, i);

              case 31:
                if (!(type !== RECORD_TYPE.HANDSHAKE)) {
                  _context8.next = 36;
                  break;
                }

                _context8.next = 34;
                return messageCallback(type, plaintext);

              case 34:
                _context8.next = 43;
                break;

              case 36:
                mbuf = new utils_BufferReader(plaintext);

              case 37:
                // Each handshake messages has a type and length prefix, per
                // https://tools.ietf.org/html/rfc8446#appendix-B.3
                // XXX TODO: This will get more complicated when we handle messages
                // fragmented across multiple records.
                mbuf.readUint8();
                mlength = mbuf.readUint24();
                mbuf.incr(-4);
                _context8.next = 42;
                return messageCallback(type, mbuf.readBytes(mlength + 4));

              case 42:
                if (mbuf.hasMoreBytes()) {
                  _context8.next = 37;
                  break;
                }

              case 43:
                _context8.next = 1;
                break;

              case 45:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function recv(_x11, _x12) {
        return _recv.apply(this, arguments);
      }

      return recv;
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
















var tlsconnection_Connection =
/*#__PURE__*/
function () {
  function Connection(psk, pskId, sendCallback, randomSalt) {
    classCallCheck_default()(this, Connection);

    this.psk = assertIsBytes(psk);
    this.pskId = assertIsBytes(pskId);
    this.randomSalt = assertIsBytes(randomSalt);
    this._state = new states_UNINITIALIZED(this);
    this._sendBuffer = new utils_BufferWriter();
    this._recvBuffer = new utils_BufferWriter();
    this._recordlayer = new recordlayer_RecordLayer(sendCallback);
    this._keyschedule = new keyschedule_KeySchedule();
    this._lastPromise = Promise.resolve();
  } // Subclasses will override this with some async initialization logic.


  createClass_default()(Connection, [{
    key: "send",
    // These are the three public API methods that
    // consumers can use to send and receive data encrypted
    // with TLS1.3.
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
      regenerator_default.a.mark(function _callee5(data) {
        var _this2 = this;

        return regenerator_default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                assertIsBytes(data);
                _context5.next = 3;
                return this._synchronized(
                /*#__PURE__*/
                asyncToGenerator_default()(
                /*#__PURE__*/
                regenerator_default.a.mark(function _callee4() {
                  var appData;
                  return regenerator_default.a.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return _this2._recordlayer.recv(data,
                          /*#__PURE__*/
                          function () {
                            var _ref3 = asyncToGenerator_default()(
                            /*#__PURE__*/
                            regenerator_default.a.mark(function _callee3(type, bytes) {
                              return regenerator_default.a.wrap(function _callee3$(_context3) {
                                while (1) {
                                  switch (_context3.prev = _context3.next) {
                                    case 0:
                                      _context3.next = 2;
                                      return _this2._dispatchIncomingMessage(type, bytes);

                                    case 2:
                                    case "end":
                                      return _context3.stop();
                                  }
                                }
                              }, _callee3, this);
                            }));

                            return function (_x3, _x4) {
                              return _ref3.apply(this, arguments);
                            };
                          }());

                        case 2:
                          appData = _this2._recvBuffer.flush();
                          return _context4.abrupt("return", appData.byteLength > 0 ? appData : null);

                        case 4:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4, this);
                })));

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
      regenerator_default.a.mark(function _callee7() {
        var _this3 = this;

        return regenerator_default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._synchronized(
                /*#__PURE__*/
                asyncToGenerator_default()(
                /*#__PURE__*/
                regenerator_default.a.mark(function _callee6() {
                  return regenerator_default.a.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          _context6.next = 2;
                          return _this3._state.close();

                        case 2:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6, this);
                })));

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
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
        var _ref5 = asyncToGenerator_default()(
        /*#__PURE__*/
        regenerator_default.a.mark(function _callee8(err) {
          return regenerator_default.a.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return _this4._transition(states_ERROR, err);

                case 2:
                  throw err;

                case 3:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));

        return function (_x5) {
          return _ref5.apply(this, arguments);
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
      regenerator_default.a.mark(function _callee9(State) {
        var _this$_state;

        var _len,
            args,
            _key,
            _args9 = arguments;

        return regenerator_default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this._state = new State(this);

                for (_len = _args9.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = _args9[_key];
                }

                _context9.next = 4;
                return (_this$_state = this._state).initialize.apply(_this$_state, args);

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function _transition(_x6) {
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
      regenerator_default.a.mark(function _callee10(bytes) {
        return regenerator_default.a.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._recordlayer.send(RECORD_TYPE.APPLICATION_DATA, bytes);

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function _sendApplicationData(_x7) {
        return _sendApplicationData2.apply(this, arguments);
      }

      return _sendApplicationData;
    }()
  }, {
    key: "_sendHandshakeMessage",
    value: function () {
      var _sendHandshakeMessage2 = asyncToGenerator_default()(
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

      function _sendHandshakeMessage(_x8) {
        return _sendHandshakeMessage2.apply(this, arguments);
      }

      return _sendHandshakeMessage;
    }()
  }, {
    key: "_writeHandshakeMessage",
    value: function () {
      var _writeHandshakeMessage2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee12(msg) {
        var buf;
        return regenerator_default.a.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                buf = new utils_BufferWriter();
                msg.write(buf);
                _context12.next = 4;
                return this._sendHandshakeMessage(buf.flush());

              case 4:
                return _context12.abrupt("return", _context12.sent);

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function _writeHandshakeMessage(_x9) {
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
        return regenerator_default.a.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this._recordlayer.flush();

              case 2:
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

      function _setSendKey(_x10) {
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
                _context15.next = 2;
                return this._recordlayer.setRecvKey(key);

              case 2:
                return _context15.abrupt("return", _context15.sent);

              case 3:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function _setRecvKey(_x11) {
        return _setRecvKey2.apply(this, arguments);
      }

      return _setRecvKey;
    }() // This is a helper for handling incoming messages from the recordlayer.

  }, {
    key: "_dispatchIncomingMessage",
    value: function () {
      var _dispatchIncomingMessage2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee16(type, bytes) {
        return regenerator_default.a.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.t0 = type;
                _context16.next = _context16.t0 === RECORD_TYPE.CHANGE_CIPHER_SPEC ? 3 : _context16.t0 === RECORD_TYPE.ALERT ? 5 : _context16.t0 === RECORD_TYPE.APPLICATION_DATA ? 6 : _context16.t0 === RECORD_TYPE.HANDSHAKE ? 9 : 13;
                break;

              case 3:
                // These may be sent for b/w compat, and must be discarded.
                assert(bytes.byteLength === 1 && bytes[0] === 1, 'unexpected_message');
                return _context16.abrupt("break", 14);

              case 5:
                throw new Error('received TLS alert record, unceremoniously aborting!');

              case 6:
                _context16.next = 8;
                return this._state.recvApplicationData(bytes);

              case 8:
                return _context16.abrupt("break", 14);

              case 9:
                this._keyschedule.addToTranscript(bytes);

                _context16.next = 12;
                return this._state.recvHandshakeMessage(readHandshakeMessage(new utils_BufferReader(bytes)));

              case 12:
                return _context16.abrupt("break", 14);

              case 13:
                assert(false, "unknown record type: ".concat(type));

              case 14:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function _dispatchIncomingMessage(_x12, _x13) {
        return _dispatchIncomingMessage2.apply(this, arguments);
      }

      return _dispatchIncomingMessage;
    }()
  }], [{
    key: "create",
    value: function () {
      var _create = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee17(psk, pskId, sendCallback) {
        var randomSalt,
            _args17 = arguments;
        return regenerator_default.a.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                randomSalt = _args17.length > 3 && _args17[3] !== undefined ? _args17[3] : null;

                if (!(randomSalt === null)) {
                  _context17.next = 7;
                  break;
                }

                _context17.next = 4;
                return getRandomBytes(32);

              case 4:
                _context17.t0 = _context17.sent;
                _context17.next = 8;
                break;

              case 7:
                _context17.t0 = randomSalt;

              case 8:
                randomSalt = _context17.t0;
                return _context17.abrupt("return", new this(psk, pskId, sendCallback, randomSalt));

              case 10:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function create(_x14, _x15, _x16) {
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
      regenerator_default.a.mark(function _callee18(psk, pskId, sendCallback) {
        var randomSalt,
            instance,
            _args18 = arguments;
        return regenerator_default.a.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                randomSalt = _args18.length > 3 && _args18[3] !== undefined ? _args18[3] : null;
                _context18.next = 3;
                return get_default()(getPrototypeOf_default()(ClientConnection), "create", this).call(this, psk, pskId, sendCallback, randomSalt);

              case 3:
                instance = _context18.sent;
                _context18.next = 6;
                return instance._transition(states_CLIENT_START);

              case 6:
                return _context18.abrupt("return", instance);

              case 7:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function create(_x17, _x18, _x19) {
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
      regenerator_default.a.mark(function _callee19(psk, pskId, sendCallback) {
        var randomSalt,
            instance,
            _args19 = arguments;
        return regenerator_default.a.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                randomSalt = _args19.length > 3 && _args19[3] !== undefined ? _args19[3] : null;
                _context19.next = 3;
                return get_default()(getPrototypeOf_default()(ServerConnection), "create", this).call(this, psk, pskId, sendCallback, randomSalt);

              case 3:
                instance = _context19.sent;
                _context19.next = 6;
                return instance._transition(states_SERVER_START);

              case 6:
                return _context19.abrupt("return", instance);

              case 7:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function create(_x20, _x21, _x22) {
        return _create3.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return ServerConnection;
}(tlsconnection_Connection); // Re-export helpful utilities for calling code to use.


// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PairingChannel", function() { return src_PairingChannel; });
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
 // A wrapper that combines a WebSocket to the channelserver
// with a TLS Connection for encryption.











var utf8Encoder = new TextEncoder();
var utf8Decoder = new TextDecoder();
var CLOSE_FLUSH_BUFFER_INTERVAL_MS = 200;
var CLOSE_FLUSH_BUFFER_MAX_TRIES = 5;
var src_PairingChannel =
/*#__PURE__*/
function (_EventTarget) {
  inherits_default()(PairingChannel, _EventTarget);

  function PairingChannel(channelId, channelKey, socket, tlsConnection) {
    var _this;

    classCallCheck_default()(this, PairingChannel);

    _this = possibleConstructorReturn_default()(this, getPrototypeOf_default()(PairingChannel).call(this));
    _this._channelId = channelId;
    _this._channelKey = channelKey;
    _this._socket = socket;
    _this._tlsConnection = tlsConnection;

    _this._setupListeners();

    return _this;
  }
  /**
   * Create a new pairing channel.
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
          var channelServerEnvelope, payload, data;
          return regenerator_default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  channelServerEnvelope = JSON.parse(event.data);
                  _context.next = 4;
                  return _this2._tlsConnection.recv(hexToBytes(channelServerEnvelope.message));

                case 4:
                  payload = _context.sent;

                  if (payload !== null) {
                    data = JSON.parse(utf8Decoder.decode(payload));

                    _this2.dispatchEvent(new CustomEvent('message', {
                      detail: {
                        data: data,
                        sender: channelServerEnvelope.sender
                      }
                    }));
                  }

                  _context.next = 11;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](0);

                  _this2.dispatchEvent(new CustomEvent('error', {
                    detail: {
                      error: _context.t0
                    }
                  }));

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 8]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }()); // Relay the other events.


      this._socket.addEventListener('error', this.dispatchEvent);

      this._socket.addEventListener('close', this.dispatchEvent);
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
                payload = utf8Encoder.encode(JSON.stringify(data));
                _context2.next = 3;
                return this._tlsConnection.send(payload);

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
                _context3.next = 2;
                return this._tlsConnection.close();

              case 2:
                this._tlsConnection = null;
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

                this._socket.close();

                this._socket = null;
                return _context3.finish(12);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3,, 12, 16]]);
      }));

      function close() {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }, {
    key: "closed",
    get: function get() {
      return this._socket.readyState === 3;
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
      var channelKey = crypto.getRandomValues(new Uint8Array(32));
      return this._makePairingChannel(wsURI, tlsconnection_ServerConnection, channelKey);
    }
    /**
     * Connect to an existing pairing channel.
     *
     * @returns Promise<PairingChannel>
     */

  }, {
    key: "connect",
    value: function connect(channelServerURI, channelId, channelKey) {
      var wsURI = new URL("/v1/ws/".concat(channelId), channelServerURI).href;
      return this._makePairingChannel(wsURI, tlsconnection_ClientConnection, channelKey);
    }
  }, {
    key: "_makePairingChannel",
    value: function _makePairingChannel(wsUri, TlsConnection, psk) {
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
            var _JSON$parse, channelId, pskId, tlsConnection, instance;

            return regenerator_default.a.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    stopListening();
                    _context5.prev = 1;
                    _JSON$parse = JSON.parse(event.data), channelId = _JSON$parse.channelid;
                    pskId = utf8ToBytes(channelId);
                    _context5.next = 6;
                    return TlsConnection.create(psk, pskId, function (data) {
                      // To send data over the websocket, it needs to be encoded as a safe string.
                      socket.send(bytesToHex(data));
                    });

                  case 6:
                    tlsConnection = _context5.sent;
                    instance = new _this3(channelId, psk, socket, tlsConnection);
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
          socket.removeEventListener('error', onConnectionError);
          socket.removeEventListener('message', onFirstMessage);
        };

        socket.addEventListener('error', onConnectionError);
        socket.addEventListener('message', onFirstMessage);
      });
    }
  }]);

  return PairingChannel;
}(wrapNativeSuper_default()(EventTarget));

/***/ })
/******/ ]);
});