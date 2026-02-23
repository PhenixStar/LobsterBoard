"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// crabwalk/src/integrations/trpc/adapter-entry.ts
var adapter_entry_exports = {};
__export(adapter_entry_exports, {
  getGatewayStatus: () => getGatewayStatus,
  handleTrpc: () => handleTrpc,
  reconnectGateway: () => reconnectGateway
});
module.exports = __toCommonJS(adapter_entry_exports);

// crabwalk/node_modules/.pnpm/@trpc+server@11.9.0_typescript@5.9.3/node_modules/@trpc/server/dist/codes-DagpWZLc.mjs
function mergeWithoutOverrides(obj1, ...objs) {
  const newObj = Object.assign(emptyObject(), obj1);
  for (const overrides of objs) for (const key in overrides) {
    if (key in newObj && newObj[key] !== overrides[key]) throw new Error(`Duplicate key ${key}`);
    newObj[key] = overrides[key];
  }
  return newObj;
}
function isObject(value) {
  return !!value && !Array.isArray(value) && typeof value === "object";
}
function isFunction(fn) {
  return typeof fn === "function";
}
function emptyObject() {
  return /* @__PURE__ */ Object.create(null);
}
var asyncIteratorsSupported = typeof Symbol === "function" && !!Symbol.asyncIterator;
function isAsyncIterable(value) {
  return asyncIteratorsSupported && isObject(value) && Symbol.asyncIterator in value;
}
var run = (fn) => fn();
function identity(it) {
  return it;
}
function abortSignalsAnyPonyfill(signals) {
  if (typeof AbortSignal.any === "function") return AbortSignal.any(signals);
  const ac = new AbortController();
  for (const signal of signals) {
    if (signal.aborted) {
      trigger();
      break;
    }
    signal.addEventListener("abort", trigger, { once: true });
  }
  return ac.signal;
  function trigger() {
    ac.abort();
    for (const signal of signals) signal.removeEventListener("abort", trigger);
  }
}
var TRPC_ERROR_CODES_BY_KEY = {
  PARSE_ERROR: -32700,
  BAD_REQUEST: -32600,
  INTERNAL_SERVER_ERROR: -32603,
  NOT_IMPLEMENTED: -32603,
  BAD_GATEWAY: -32603,
  SERVICE_UNAVAILABLE: -32603,
  GATEWAY_TIMEOUT: -32603,
  UNAUTHORIZED: -32001,
  PAYMENT_REQUIRED: -32002,
  FORBIDDEN: -32003,
  NOT_FOUND: -32004,
  METHOD_NOT_SUPPORTED: -32005,
  TIMEOUT: -32008,
  CONFLICT: -32009,
  PRECONDITION_FAILED: -32012,
  PAYLOAD_TOO_LARGE: -32013,
  UNSUPPORTED_MEDIA_TYPE: -32015,
  UNPROCESSABLE_CONTENT: -32022,
  PRECONDITION_REQUIRED: -32028,
  TOO_MANY_REQUESTS: -32029,
  CLIENT_CLOSED_REQUEST: -32099
};
var TRPC_ERROR_CODES_BY_NUMBER = {
  [-32700]: "PARSE_ERROR",
  [-32600]: "BAD_REQUEST",
  [-32603]: "INTERNAL_SERVER_ERROR",
  [-32001]: "UNAUTHORIZED",
  [-32002]: "PAYMENT_REQUIRED",
  [-32003]: "FORBIDDEN",
  [-32004]: "NOT_FOUND",
  [-32005]: "METHOD_NOT_SUPPORTED",
  [-32008]: "TIMEOUT",
  [-32009]: "CONFLICT",
  [-32012]: "PRECONDITION_FAILED",
  [-32013]: "PAYLOAD_TOO_LARGE",
  [-32015]: "UNSUPPORTED_MEDIA_TYPE",
  [-32022]: "UNPROCESSABLE_CONTENT",
  [-32028]: "PRECONDITION_REQUIRED",
  [-32029]: "TOO_MANY_REQUESTS",
  [-32099]: "CLIENT_CLOSED_REQUEST"
};
var retryableRpcCodes = [
  TRPC_ERROR_CODES_BY_KEY.BAD_GATEWAY,
  TRPC_ERROR_CODES_BY_KEY.SERVICE_UNAVAILABLE,
  TRPC_ERROR_CODES_BY_KEY.GATEWAY_TIMEOUT,
  TRPC_ERROR_CODES_BY_KEY.INTERNAL_SERVER_ERROR
];

// crabwalk/node_modules/.pnpm/@trpc+server@11.9.0_typescript@5.9.3/node_modules/@trpc/server/dist/getErrorShape-vC8mUXJD.mjs
var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames2(from), i = 0, n = keys.length, key; i < n; i++) {
    key = keys[i];
    if (!__hasOwnProp2.call(to, key) && key !== except) __defProp2(to, key, {
      get: ((k) => from[k]).bind(null, key),
      enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable
    });
  }
  return to;
};
var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", {
  value: mod,
  enumerable: true
}) : target, mod));
var noop = () => {
};
var freezeIfAvailable = (obj) => {
  if (Object.freeze) Object.freeze(obj);
};
function createInnerProxy(callback, path3, memo2) {
  var _memo$cacheKey;
  const cacheKey = path3.join(".");
  (_memo$cacheKey = memo2[cacheKey]) !== null && _memo$cacheKey !== void 0 || (memo2[cacheKey] = new Proxy(noop, {
    get(_obj, key) {
      if (typeof key !== "string" || key === "then") return void 0;
      return createInnerProxy(callback, [...path3, key], memo2);
    },
    apply(_1, _2, args) {
      const lastOfPath = path3[path3.length - 1];
      let opts = {
        args,
        path: path3
      };
      if (lastOfPath === "call") opts = {
        args: args.length >= 2 ? [args[1]] : [],
        path: path3.slice(0, -1)
      };
      else if (lastOfPath === "apply") opts = {
        args: args.length >= 2 ? args[1] : [],
        path: path3.slice(0, -1)
      };
      freezeIfAvailable(opts.args);
      freezeIfAvailable(opts.path);
      return callback(opts);
    }
  }));
  return memo2[cacheKey];
}
var createRecursiveProxy = (callback) => createInnerProxy(callback, [], emptyObject());
var JSONRPC2_TO_HTTP_CODE = {
  PARSE_ERROR: 400,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_SUPPORTED: 405,
  TIMEOUT: 408,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
};
function getStatusCodeFromKey(code) {
  var _JSONRPC2_TO_HTTP_COD;
  return (_JSONRPC2_TO_HTTP_COD = JSONRPC2_TO_HTTP_CODE[code]) !== null && _JSONRPC2_TO_HTTP_COD !== void 0 ? _JSONRPC2_TO_HTTP_COD : 500;
}
function getHTTPStatusCode(json) {
  const arr = Array.isArray(json) ? json : [json];
  const httpStatuses = new Set(arr.map((res) => {
    if ("error" in res && isObject(res.error.data)) {
      var _res$error$data;
      if (typeof ((_res$error$data = res.error.data) === null || _res$error$data === void 0 ? void 0 : _res$error$data["httpStatus"]) === "number") return res.error.data["httpStatus"];
      const code = TRPC_ERROR_CODES_BY_NUMBER[res.error.code];
      return getStatusCodeFromKey(code);
    }
    return 200;
  }));
  if (httpStatuses.size !== 1) return 207;
  const httpStatus = httpStatuses.values().next().value;
  return httpStatus;
}
function getHTTPStatusCodeFromError(error) {
  return getStatusCodeFromKey(error.code);
}
var require_typeof = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(exports2, module2) {
  function _typeof$2(o) {
    "@babel/helpers - typeof";
    return module2.exports = _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
      return typeof o$1;
    } : function(o$1) {
      return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
    }, module2.exports.__esModule = true, module2.exports["default"] = module2.exports, _typeof$2(o);
  }
  module2.exports = _typeof$2, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
} });
var require_toPrimitive = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(exports2, module2) {
  var _typeof$1 = require_typeof()["default"];
  function toPrimitive$1(t2, r) {
    if ("object" != _typeof$1(t2) || !t2) return t2;
    var e = t2[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t2, r || "default");
      if ("object" != _typeof$1(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t2);
  }
  module2.exports = toPrimitive$1, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
} });
var require_toPropertyKey = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(exports2, module2) {
  var _typeof = require_typeof()["default"];
  var toPrimitive = require_toPrimitive();
  function toPropertyKey$1(t2) {
    var i = toPrimitive(t2, "string");
    return "symbol" == _typeof(i) ? i : i + "";
  }
  module2.exports = toPropertyKey$1, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
} });
var require_defineProperty = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(exports2, module2) {
  var toPropertyKey = require_toPropertyKey();
  function _defineProperty(e, r, t2) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t2,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t2, e;
  }
  module2.exports = _defineProperty, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
} });
var require_objectSpread2 = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(exports2, module2) {
  var defineProperty = require_defineProperty();
  function ownKeys(e, r) {
    var t2 = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function(r$1) {
        return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
      })), t2.push.apply(t2, o);
    }
    return t2;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t2 = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t2), true).forEach(function(r$1) {
        defineProperty(e, r$1, t2[r$1]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t2)) : ownKeys(Object(t2)).forEach(function(r$1) {
        Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t2, r$1));
      });
    }
    return e;
  }
  module2.exports = _objectSpread2, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
} });
var import_objectSpread2 = __toESM2(require_objectSpread2(), 1);
function getErrorShape(opts) {
  const { path: path3, error, config } = opts;
  const { code } = opts.error;
  const shape = {
    message: error.message,
    code: TRPC_ERROR_CODES_BY_KEY[code],
    data: {
      code,
      httpStatus: getHTTPStatusCodeFromError(error)
    }
  };
  if (config.isDev && typeof opts.error.stack === "string") shape.data.stack = opts.error.stack;
  if (typeof path3 === "string") shape.data.path = path3;
  return config.errorFormatter((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, { shape }));
}

// crabwalk/node_modules/.pnpm/@trpc+server@11.9.0_typescript@5.9.3/node_modules/@trpc/server/dist/tracked-D4V22yc5.mjs
var defaultFormatter = ({ shape }) => {
  return shape;
};
var import_defineProperty = __toESM2(require_defineProperty(), 1);
var UnknownCauseError = class extends Error {
};
function getCauseFromUnknown(cause) {
  if (cause instanceof Error) return cause;
  const type = typeof cause;
  if (type === "undefined" || type === "function" || cause === null) return void 0;
  if (type !== "object") return new Error(String(cause));
  if (isObject(cause)) return Object.assign(new UnknownCauseError(), cause);
  return void 0;
}
function getTRPCErrorFromUnknown(cause) {
  if (cause instanceof TRPCError) return cause;
  if (cause instanceof Error && cause.name === "TRPCError") return cause;
  const trpcError = new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    cause
  });
  if (cause instanceof Error && cause.stack) trpcError.stack = cause.stack;
  return trpcError;
}
var TRPCError = class extends Error {
  constructor(opts) {
    var _ref, _opts$message, _this$cause;
    const cause = getCauseFromUnknown(opts.cause);
    const message = (_ref = (_opts$message = opts.message) !== null && _opts$message !== void 0 ? _opts$message : cause === null || cause === void 0 ? void 0 : cause.message) !== null && _ref !== void 0 ? _ref : opts.code;
    super(message, { cause });
    (0, import_defineProperty.default)(this, "cause", void 0);
    (0, import_defineProperty.default)(this, "code", void 0);
    this.code = opts.code;
    this.name = "TRPCError";
    (_this$cause = this.cause) !== null && _this$cause !== void 0 || (this.cause = cause);
  }
};
var import_objectSpread2$1 = __toESM2(require_objectSpread2(), 1);
function getDataTransformer(transformer) {
  if ("input" in transformer) return transformer;
  return {
    input: transformer,
    output: transformer
  };
}
var defaultTransformer = {
  input: {
    serialize: (obj) => obj,
    deserialize: (obj) => obj
  },
  output: {
    serialize: (obj) => obj,
    deserialize: (obj) => obj
  }
};
function transformTRPCResponseItem(config, item) {
  if ("error" in item) return (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, item), {}, { error: config.transformer.output.serialize(item.error) });
  if ("data" in item.result) return (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, item), {}, { result: (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, item.result), {}, { data: config.transformer.output.serialize(item.result.data) }) });
  return item;
}
function transformTRPCResponse(config, itemOrItems) {
  return Array.isArray(itemOrItems) ? itemOrItems.map((item) => transformTRPCResponseItem(config, item)) : transformTRPCResponseItem(config, itemOrItems);
}
var import_objectSpread22 = __toESM2(require_objectSpread2(), 1);
var lazyMarker = "lazyMarker";
function once(fn) {
  const uncalled = /* @__PURE__ */ Symbol();
  let result = uncalled;
  return () => {
    if (result === uncalled) result = fn();
    return result;
  };
}
function isLazy(input) {
  return typeof input === "function" && lazyMarker in input;
}
function isRouter(value) {
  return isObject(value) && isObject(value["_def"]) && "router" in value["_def"];
}
var emptyRouter = {
  _ctx: null,
  _errorShape: null,
  _meta: null,
  queries: {},
  mutations: {},
  subscriptions: {},
  errorFormatter: defaultFormatter,
  transformer: defaultTransformer
};
var reservedWords = [
  "then",
  "call",
  "apply"
];
function createRouterFactory(config) {
  function createRouterInner(input) {
    const reservedWordsUsed = new Set(Object.keys(input).filter((v) => reservedWords.includes(v)));
    if (reservedWordsUsed.size > 0) throw new Error("Reserved words used in `router({})` call: " + Array.from(reservedWordsUsed).join(", "));
    const procedures = emptyObject();
    const lazy$1 = emptyObject();
    function createLazyLoader(opts) {
      return {
        ref: opts.ref,
        load: once(async () => {
          const router$1 = await opts.ref();
          const lazyPath = [...opts.path, opts.key];
          const lazyKey = lazyPath.join(".");
          opts.aggregate[opts.key] = step(router$1._def.record, lazyPath);
          delete lazy$1[lazyKey];
          for (const [nestedKey, nestedItem] of Object.entries(router$1._def.lazy)) {
            const nestedRouterKey = [...lazyPath, nestedKey].join(".");
            lazy$1[nestedRouterKey] = createLazyLoader({
              ref: nestedItem.ref,
              path: lazyPath,
              key: nestedKey,
              aggregate: opts.aggregate[opts.key]
            });
          }
        })
      };
    }
    function step(from, path3 = []) {
      const aggregate = emptyObject();
      for (const [key, item] of Object.entries(from !== null && from !== void 0 ? from : {})) {
        if (isLazy(item)) {
          lazy$1[[...path3, key].join(".")] = createLazyLoader({
            path: path3,
            ref: item,
            key,
            aggregate
          });
          continue;
        }
        if (isRouter(item)) {
          aggregate[key] = step(item._def.record, [...path3, key]);
          continue;
        }
        if (!isProcedure(item)) {
          aggregate[key] = step(item, [...path3, key]);
          continue;
        }
        const newPath = [...path3, key].join(".");
        if (procedures[newPath]) throw new Error(`Duplicate key: ${newPath}`);
        procedures[newPath] = item;
        aggregate[key] = item;
      }
      return aggregate;
    }
    const record = step(input);
    const _def = (0, import_objectSpread22.default)((0, import_objectSpread22.default)({
      _config: config,
      router: true,
      procedures,
      lazy: lazy$1
    }, emptyRouter), {}, { record });
    const router2 = (0, import_objectSpread22.default)((0, import_objectSpread22.default)({}, record), {}, {
      _def,
      createCaller: createCallerFactory()({ _def })
    });
    return router2;
  }
  return createRouterInner;
}
function isProcedure(procedureOrRouter) {
  return typeof procedureOrRouter === "function";
}
async function getProcedureAtPath(router2, path3) {
  const { _def } = router2;
  let procedure = _def.procedures[path3];
  while (!procedure) {
    const key = Object.keys(_def.lazy).find((key$1) => path3.startsWith(key$1));
    if (!key) return null;
    const lazyRouter = _def.lazy[key];
    await lazyRouter.load();
    procedure = _def.procedures[path3];
  }
  return procedure;
}
function createCallerFactory() {
  return function createCallerInner(router2) {
    const { _def } = router2;
    return function createCaller(ctxOrCallback, opts) {
      return createRecursiveProxy(async (innerOpts) => {
        const { path: path3, args } = innerOpts;
        const fullPath = path3.join(".");
        if (path3.length === 1 && path3[0] === "_def") return _def;
        const procedure = await getProcedureAtPath(router2, fullPath);
        let ctx = void 0;
        try {
          if (!procedure) throw new TRPCError({
            code: "NOT_FOUND",
            message: `No procedure found on path "${path3}"`
          });
          ctx = isFunction(ctxOrCallback) ? await Promise.resolve(ctxOrCallback()) : ctxOrCallback;
          return await procedure({
            path: fullPath,
            getRawInput: async () => args[0],
            ctx,
            type: procedure._def.type,
            signal: opts === null || opts === void 0 ? void 0 : opts.signal
          });
        } catch (cause) {
          var _opts$onError, _procedure$_def$type;
          opts === null || opts === void 0 || (_opts$onError = opts.onError) === null || _opts$onError === void 0 || _opts$onError.call(opts, {
            ctx,
            error: getTRPCErrorFromUnknown(cause),
            input: args[0],
            path: fullPath,
            type: (_procedure$_def$type = procedure === null || procedure === void 0 ? void 0 : procedure._def.type) !== null && _procedure$_def$type !== void 0 ? _procedure$_def$type : "unknown"
          });
          throw cause;
        }
      });
    };
  };
}
function mergeRouters(...routerList) {
  var _routerList$, _routerList$2;
  const record = mergeWithoutOverrides({}, ...routerList.map((r) => r._def.record));
  const errorFormatter = routerList.reduce((currentErrorFormatter, nextRouter) => {
    if (nextRouter._def._config.errorFormatter && nextRouter._def._config.errorFormatter !== defaultFormatter) {
      if (currentErrorFormatter !== defaultFormatter && currentErrorFormatter !== nextRouter._def._config.errorFormatter) throw new Error("You seem to have several error formatters");
      return nextRouter._def._config.errorFormatter;
    }
    return currentErrorFormatter;
  }, defaultFormatter);
  const transformer = routerList.reduce((prev, current) => {
    if (current._def._config.transformer && current._def._config.transformer !== defaultTransformer) {
      if (prev !== defaultTransformer && prev !== current._def._config.transformer) throw new Error("You seem to have several transformers");
      return current._def._config.transformer;
    }
    return prev;
  }, defaultTransformer);
  const router2 = createRouterFactory({
    errorFormatter,
    transformer,
    isDev: routerList.every((r) => r._def._config.isDev),
    allowOutsideOfServer: routerList.every((r) => r._def._config.allowOutsideOfServer),
    isServer: routerList.every((r) => r._def._config.isServer),
    $types: (_routerList$ = routerList[0]) === null || _routerList$ === void 0 ? void 0 : _routerList$._def._config.$types,
    sse: (_routerList$2 = routerList[0]) === null || _routerList$2 === void 0 ? void 0 : _routerList$2._def._config.sse
  })(record);
  return router2;
}
var trackedSymbol = /* @__PURE__ */ Symbol();
function isTrackedEnvelope(value) {
  return Array.isArray(value) && value[2] === trackedSymbol;
}

// crabwalk/node_modules/.pnpm/@trpc+server@11.9.0_typescript@5.9.3/node_modules/@trpc/server/dist/observable-UMO3vUa_.mjs
function isObservable(x) {
  return typeof x === "object" && x !== null && "subscribe" in x;
}
function observable(subscribe) {
  const self = {
    subscribe(observer) {
      let teardownRef = null;
      let isDone = false;
      let unsubscribed = false;
      let teardownImmediately = false;
      function unsubscribe() {
        if (teardownRef === null) {
          teardownImmediately = true;
          return;
        }
        if (unsubscribed) return;
        unsubscribed = true;
        if (typeof teardownRef === "function") teardownRef();
        else if (teardownRef) teardownRef.unsubscribe();
      }
      teardownRef = subscribe({
        next(value) {
          var _observer$next;
          if (isDone) return;
          (_observer$next = observer.next) === null || _observer$next === void 0 || _observer$next.call(observer, value);
        },
        error(err) {
          var _observer$error;
          if (isDone) return;
          isDone = true;
          (_observer$error = observer.error) === null || _observer$error === void 0 || _observer$error.call(observer, err);
          unsubscribe();
        },
        complete() {
          var _observer$complete;
          if (isDone) return;
          isDone = true;
          (_observer$complete = observer.complete) === null || _observer$complete === void 0 || _observer$complete.call(observer);
          unsubscribe();
        }
      });
      if (teardownImmediately) unsubscribe();
      return { unsubscribe };
    },
    pipe(...operations) {
      return operations.reduce(pipeReducer, self);
    }
  };
  return self;
}
function pipeReducer(prev, fn) {
  return fn(prev);
}
function observableToReadableStream(observable$1, signal) {
  let unsub = null;
  const onAbort = () => {
    unsub === null || unsub === void 0 || unsub.unsubscribe();
    unsub = null;
    signal.removeEventListener("abort", onAbort);
  };
  return new ReadableStream({
    start(controller) {
      unsub = observable$1.subscribe({
        next(data) {
          controller.enqueue({
            ok: true,
            value: data
          });
        },
        error(error) {
          controller.enqueue({
            ok: false,
            error
          });
          controller.close();
        },
        complete() {
          controller.close();
        }
      });
      if (signal.aborted) onAbort();
      else signal.addEventListener("abort", onAbort, { once: true });
    },
    cancel() {
      onAbort();
    }
  });
}
function observableToAsyncIterable(observable$1, signal) {
  const stream = observableToReadableStream(observable$1, signal);
  const reader = stream.getReader();
  const iterator = {
    async next() {
      const value = await reader.read();
      if (value.done) return {
        value: void 0,
        done: true
      };
      const { value: result } = value;
      if (!result.ok) throw result.error;
      return {
        value: result.value,
        done: false
      };
    },
    async return() {
      await reader.cancel();
      return {
        value: void 0,
        done: true
      };
    }
  };
  return { [Symbol.asyncIterator]() {
    return iterator;
  } };
}

// crabwalk/node_modules/.pnpm/@trpc+server@11.9.0_typescript@5.9.3/node_modules/@trpc/server/dist/resolveResponse-C7AcnFLN.mjs
function parseConnectionParamsFromUnknown(parsed) {
  try {
    if (parsed === null) return null;
    if (!isObject(parsed)) throw new Error("Expected object");
    const nonStringValues = Object.entries(parsed).filter(([_key, value]) => typeof value !== "string");
    if (nonStringValues.length > 0) throw new Error(`Expected connectionParams to be string values. Got ${nonStringValues.map(([key, value]) => `${key}: ${typeof value}`).join(", ")}`);
    return parsed;
  } catch (cause) {
    throw new TRPCError({
      code: "PARSE_ERROR",
      message: "Invalid connection params shape",
      cause
    });
  }
}
function parseConnectionParamsFromString(str) {
  let parsed;
  try {
    parsed = JSON.parse(str);
  } catch (cause) {
    throw new TRPCError({
      code: "PARSE_ERROR",
      message: "Not JSON-parsable query params",
      cause
    });
  }
  return parseConnectionParamsFromUnknown(parsed);
}
var import_objectSpread2$12 = __toESM2(require_objectSpread2(), 1);
function memo(fn) {
  let promise = null;
  const sym = /* @__PURE__ */ Symbol.for("@trpc/server/http/memo");
  let value = sym;
  return {
    read: async () => {
      var _promise;
      if (value !== sym) return value;
      (_promise = promise) !== null && _promise !== void 0 || (promise = fn().catch((cause) => {
        if (cause instanceof TRPCError) throw cause;
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: cause instanceof Error ? cause.message : "Invalid input",
          cause
        });
      }));
      value = await promise;
      promise = null;
      return value;
    },
    result: () => {
      return value !== sym ? value : void 0;
    }
  };
}
var jsonContentTypeHandler = {
  isMatch(req) {
    var _req$headers$get;
    return !!((_req$headers$get = req.headers.get("content-type")) === null || _req$headers$get === void 0 ? void 0 : _req$headers$get.startsWith("application/json"));
  },
  async parse(opts) {
    var _types$values$next$va;
    const { req } = opts;
    const isBatchCall = opts.searchParams.get("batch") === "1";
    const paths = isBatchCall ? opts.path.split(",") : [opts.path];
    const getInputs = memo(async () => {
      let inputs = void 0;
      if (req.method === "GET") {
        const queryInput = opts.searchParams.get("input");
        if (queryInput) inputs = JSON.parse(queryInput);
      } else inputs = await req.json();
      if (inputs === void 0) return emptyObject();
      if (!isBatchCall) {
        const result = emptyObject();
        result[0] = opts.router._def._config.transformer.input.deserialize(inputs);
        return result;
      }
      if (!isObject(inputs)) throw new TRPCError({
        code: "BAD_REQUEST",
        message: '"input" needs to be an object when doing a batch call'
      });
      const acc = emptyObject();
      for (const index of paths.keys()) {
        const input = inputs[index];
        if (input !== void 0) acc[index] = opts.router._def._config.transformer.input.deserialize(input);
      }
      return acc;
    });
    const calls = await Promise.all(paths.map(async (path3, index) => {
      const procedure = await getProcedureAtPath(opts.router, path3);
      return {
        path: path3,
        procedure,
        getRawInput: async () => {
          const inputs = await getInputs.read();
          let input = inputs[index];
          if ((procedure === null || procedure === void 0 ? void 0 : procedure._def.type) === "subscription") {
            var _ref, _opts$headers$get;
            const lastEventId = (_ref = (_opts$headers$get = opts.headers.get("last-event-id")) !== null && _opts$headers$get !== void 0 ? _opts$headers$get : opts.searchParams.get("lastEventId")) !== null && _ref !== void 0 ? _ref : opts.searchParams.get("Last-Event-Id");
            if (lastEventId) if (isObject(input)) input = (0, import_objectSpread2$12.default)((0, import_objectSpread2$12.default)({}, input), {}, { lastEventId });
            else {
              var _input;
              (_input = input) !== null && _input !== void 0 || (input = { lastEventId });
            }
          }
          return input;
        },
        result: () => {
          var _getInputs$result;
          return (_getInputs$result = getInputs.result()) === null || _getInputs$result === void 0 ? void 0 : _getInputs$result[index];
        }
      };
    }));
    const types = new Set(calls.map((call) => {
      var _call$procedure;
      return (_call$procedure = call.procedure) === null || _call$procedure === void 0 ? void 0 : _call$procedure._def.type;
    }).filter(Boolean));
    if (types.size > 1) throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Cannot mix procedure types in call: ${Array.from(types).join(", ")}`
    });
    const type = (_types$values$next$va = types.values().next().value) !== null && _types$values$next$va !== void 0 ? _types$values$next$va : "unknown";
    const connectionParamsStr = opts.searchParams.get("connectionParams");
    const info = {
      isBatchCall,
      accept: req.headers.get("trpc-accept"),
      calls,
      type,
      connectionParams: connectionParamsStr === null ? null : parseConnectionParamsFromString(connectionParamsStr),
      signal: req.signal,
      url: opts.url
    };
    return info;
  }
};
var formDataContentTypeHandler = {
  isMatch(req) {
    var _req$headers$get2;
    return !!((_req$headers$get2 = req.headers.get("content-type")) === null || _req$headers$get2 === void 0 ? void 0 : _req$headers$get2.startsWith("multipart/form-data"));
  },
  async parse(opts) {
    const { req } = opts;
    if (req.method !== "POST") throw new TRPCError({
      code: "METHOD_NOT_SUPPORTED",
      message: "Only POST requests are supported for multipart/form-data requests"
    });
    const getInputs = memo(async () => {
      const fd = await req.formData();
      return fd;
    });
    const procedure = await getProcedureAtPath(opts.router, opts.path);
    return {
      accept: null,
      calls: [{
        path: opts.path,
        getRawInput: getInputs.read,
        result: getInputs.result,
        procedure
      }],
      isBatchCall: false,
      type: "mutation",
      connectionParams: null,
      signal: req.signal,
      url: opts.url
    };
  }
};
var octetStreamContentTypeHandler = {
  isMatch(req) {
    var _req$headers$get3;
    return !!((_req$headers$get3 = req.headers.get("content-type")) === null || _req$headers$get3 === void 0 ? void 0 : _req$headers$get3.startsWith("application/octet-stream"));
  },
  async parse(opts) {
    const { req } = opts;
    if (req.method !== "POST") throw new TRPCError({
      code: "METHOD_NOT_SUPPORTED",
      message: "Only POST requests are supported for application/octet-stream requests"
    });
    const getInputs = memo(async () => {
      return req.body;
    });
    return {
      calls: [{
        path: opts.path,
        getRawInput: getInputs.read,
        result: getInputs.result,
        procedure: await getProcedureAtPath(opts.router, opts.path)
      }],
      isBatchCall: false,
      accept: null,
      type: "mutation",
      connectionParams: null,
      signal: req.signal,
      url: opts.url
    };
  }
};
var handlers = [
  jsonContentTypeHandler,
  formDataContentTypeHandler,
  octetStreamContentTypeHandler
];
function getContentTypeHandler(req) {
  const handler = handlers.find((handler$1) => handler$1.isMatch(req));
  if (handler) return handler;
  if (!handler && req.method === "GET") return jsonContentTypeHandler;
  throw new TRPCError({
    code: "UNSUPPORTED_MEDIA_TYPE",
    message: req.headers.has("content-type") ? `Unsupported content-type "${req.headers.get("content-type")}` : "Missing content-type header"
  });
}
async function getRequestInfo(opts) {
  const handler = getContentTypeHandler(opts.req);
  return await handler.parse(opts);
}
function isAbortError(error) {
  return isObject(error) && error["name"] === "AbortError";
}
function throwAbortError(message = "AbortError") {
  throw new DOMException(message, "AbortError");
}
function isObject$1(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isPlainObject(o) {
  var ctor, prot;
  if (isObject$1(o) === false) return false;
  ctor = o.constructor;
  if (ctor === void 0) return true;
  prot = ctor.prototype;
  if (isObject$1(prot) === false) return false;
  if (prot.hasOwnProperty("isPrototypeOf") === false) return false;
  return true;
}
var import_defineProperty2 = __toESM2(require_defineProperty(), 1);
var _Symbol$toStringTag;
var subscribableCache = /* @__PURE__ */ new WeakMap();
var NOOP = () => {
};
_Symbol$toStringTag = Symbol.toStringTag;
var Unpromise = class Unpromise2 {
  constructor(arg) {
    (0, import_defineProperty2.default)(this, "promise", void 0);
    (0, import_defineProperty2.default)(this, "subscribers", []);
    (0, import_defineProperty2.default)(this, "settlement", null);
    (0, import_defineProperty2.default)(this, _Symbol$toStringTag, "Unpromise");
    if (typeof arg === "function") this.promise = new Promise(arg);
    else this.promise = arg;
    const thenReturn = this.promise.then((value) => {
      const { subscribers } = this;
      this.subscribers = null;
      this.settlement = {
        status: "fulfilled",
        value
      };
      subscribers === null || subscribers === void 0 || subscribers.forEach(({ resolve }) => {
        resolve(value);
      });
    });
    if ("catch" in thenReturn) thenReturn.catch((reason) => {
      const { subscribers } = this;
      this.subscribers = null;
      this.settlement = {
        status: "rejected",
        reason
      };
      subscribers === null || subscribers === void 0 || subscribers.forEach(({ reject }) => {
        reject(reason);
      });
    });
  }
  /** Create a promise that mitigates uncontrolled subscription to a long-lived
  * Promise via .then() and .catch() - otherwise a source of memory leaks.
  *
  * The returned promise has an `unsubscribe()` method which can be called when
  * the Promise is no longer being tracked by application logic, and which
  * ensures that there is no reference chain from the original promise to the
  * new one, and therefore no memory leak.
  *
  * If original promise has not yet settled, this adds a new unique promise
  * that listens to then/catch events, along with an `unsubscribe()` method to
  * detach it.
  *
  * If original promise has settled, then creates a new Promise.resolve() or
  * Promise.reject() and provided unsubscribe is a noop.
  *
  * If you call `unsubscribe()` before the returned Promise has settled, it
  * will never settle.
  */
  subscribe() {
    let promise;
    let unsubscribe;
    const { settlement } = this;
    if (settlement === null) {
      if (this.subscribers === null) throw new Error("Unpromise settled but still has subscribers");
      const subscriber = withResolvers();
      this.subscribers = listWithMember(this.subscribers, subscriber);
      promise = subscriber.promise;
      unsubscribe = () => {
        if (this.subscribers !== null) this.subscribers = listWithoutMember(this.subscribers, subscriber);
      };
    } else {
      const { status } = settlement;
      if (status === "fulfilled") promise = Promise.resolve(settlement.value);
      else promise = Promise.reject(settlement.reason);
      unsubscribe = NOOP;
    }
    return Object.assign(promise, { unsubscribe });
  }
  /** STANDARD PROMISE METHODS (but returning a SubscribedPromise) */
  then(onfulfilled, onrejected) {
    const subscribed = this.subscribe();
    const { unsubscribe } = subscribed;
    return Object.assign(subscribed.then(onfulfilled, onrejected), { unsubscribe });
  }
  catch(onrejected) {
    const subscribed = this.subscribe();
    const { unsubscribe } = subscribed;
    return Object.assign(subscribed.catch(onrejected), { unsubscribe });
  }
  finally(onfinally) {
    const subscribed = this.subscribe();
    const { unsubscribe } = subscribed;
    return Object.assign(subscribed.finally(onfinally), { unsubscribe });
  }
  /** Unpromise STATIC METHODS */
  /** Create or Retrieve the proxy Unpromise (a re-used Unpromise for the VM lifetime
  * of the provided Promise reference) */
  static proxy(promise) {
    const cached = Unpromise2.getSubscribablePromise(promise);
    return typeof cached !== "undefined" ? cached : Unpromise2.createSubscribablePromise(promise);
  }
  /** Create and store an Unpromise keyed by an original Promise. */
  static createSubscribablePromise(promise) {
    const created = new Unpromise2(promise);
    subscribableCache.set(promise, created);
    subscribableCache.set(created, created);
    return created;
  }
  /** Retrieve a previously-created Unpromise keyed by an original Promise. */
  static getSubscribablePromise(promise) {
    return subscribableCache.get(promise);
  }
  /** Promise STATIC METHODS */
  /** Lookup the Unpromise for this promise, and derive a SubscribedPromise from
  * it (that can be later unsubscribed to eliminate Memory leaks) */
  static resolve(value) {
    const promise = typeof value === "object" && value !== null && "then" in value && typeof value.then === "function" ? value : Promise.resolve(value);
    return Unpromise2.proxy(promise).subscribe();
  }
  static async any(values) {
    const valuesArray = Array.isArray(values) ? values : [...values];
    const subscribedPromises = valuesArray.map(Unpromise2.resolve);
    try {
      return await Promise.any(subscribedPromises);
    } finally {
      subscribedPromises.forEach(({ unsubscribe }) => {
        unsubscribe();
      });
    }
  }
  static async race(values) {
    const valuesArray = Array.isArray(values) ? values : [...values];
    const subscribedPromises = valuesArray.map(Unpromise2.resolve);
    try {
      return await Promise.race(subscribedPromises);
    } finally {
      subscribedPromises.forEach(({ unsubscribe }) => {
        unsubscribe();
      });
    }
  }
  /** Create a race of SubscribedPromises that will fulfil to a single winning
  * Promise (in a 1-Tuple). Eliminates memory leaks from long-lived promises
  * accumulating .then() and .catch() subscribers. Allows simple logic to
  * consume the result, like...
  * ```ts
  * const [ winner ] = await Unpromise.race([ promiseA, promiseB ]);
  * if(winner === promiseB){
  *   const result = await promiseB;
  *   // do the thing
  * }
  * ```
  * */
  static async raceReferences(promises) {
    const selfPromises = promises.map(resolveSelfTuple);
    try {
      return await Promise.race(selfPromises);
    } finally {
      for (const promise of selfPromises) promise.unsubscribe();
    }
  }
};
function resolveSelfTuple(promise) {
  return Unpromise.proxy(promise).then(() => [promise]);
}
function withResolvers() {
  let resolve;
  let reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return {
    promise,
    resolve,
    reject
  };
}
function listWithMember(arr, member) {
  return [...arr, member];
}
function listWithoutIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
function listWithoutMember(arr, member) {
  const index = arr.indexOf(member);
  if (index !== -1) return listWithoutIndex(arr, index);
  return arr;
}
var _Symbol;
var _Symbol$dispose;
var _Symbol2;
var _Symbol2$asyncDispose;
(_Symbol$dispose = (_Symbol = Symbol).dispose) !== null && _Symbol$dispose !== void 0 || (_Symbol.dispose = /* @__PURE__ */ Symbol());
(_Symbol2$asyncDispose = (_Symbol2 = Symbol).asyncDispose) !== null && _Symbol2$asyncDispose !== void 0 || (_Symbol2.asyncDispose = /* @__PURE__ */ Symbol());
function makeResource(thing, dispose) {
  const it = thing;
  const existing = it[Symbol.dispose];
  it[Symbol.dispose] = () => {
    dispose();
    existing === null || existing === void 0 || existing();
  };
  return it;
}
function makeAsyncResource(thing, dispose) {
  const it = thing;
  const existing = it[Symbol.asyncDispose];
  it[Symbol.asyncDispose] = async () => {
    await dispose();
    await (existing === null || existing === void 0 ? void 0 : existing());
  };
  return it;
}
var disposablePromiseTimerResult = /* @__PURE__ */ Symbol();
function timerResource(ms) {
  let timer = null;
  return makeResource({ start() {
    if (timer) throw new Error("Timer already started");
    const promise = new Promise((resolve) => {
      timer = setTimeout(() => resolve(disposablePromiseTimerResult), ms);
    });
    return promise;
  } }, () => {
    if (timer) clearTimeout(timer);
  });
}
var require_usingCtx = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/usingCtx.js"(exports2, module2) {
  function _usingCtx() {
    var r = "function" == typeof SuppressedError ? SuppressedError : function(r$1, e$1) {
      var n$1 = Error();
      return n$1.name = "SuppressedError", n$1.error = r$1, n$1.suppressed = e$1, n$1;
    }, e = {}, n = [];
    function using(r$1, e$1) {
      if (null != e$1) {
        if (Object(e$1) !== e$1) throw new TypeError("using declarations can only be used with objects, functions, null, or undefined.");
        if (r$1) var o = e$1[Symbol.asyncDispose || Symbol["for"]("Symbol.asyncDispose")];
        if (void 0 === o && (o = e$1[Symbol.dispose || Symbol["for"]("Symbol.dispose")], r$1)) var t2 = o;
        if ("function" != typeof o) throw new TypeError("Object is not disposable.");
        t2 && (o = function o$1() {
          try {
            t2.call(e$1);
          } catch (r$2) {
            return Promise.reject(r$2);
          }
        }), n.push({
          v: e$1,
          d: o,
          a: r$1
        });
      } else r$1 && n.push({
        d: e$1,
        a: r$1
      });
      return e$1;
    }
    return {
      e,
      u: using.bind(null, false),
      a: using.bind(null, true),
      d: function d() {
        var o, t2 = this.e, s = 0;
        function next() {
          for (; o = n.pop(); ) try {
            if (!o.a && 1 === s) return s = 0, n.push(o), Promise.resolve().then(next);
            if (o.d) {
              var r$1 = o.d.call(o.v);
              if (o.a) return s |= 2, Promise.resolve(r$1).then(next, err);
            } else s |= 1;
          } catch (r$2) {
            return err(r$2);
          }
          if (1 === s) return t2 !== e ? Promise.reject(t2) : Promise.resolve();
          if (t2 !== e) throw t2;
        }
        function err(n$1) {
          return t2 = t2 !== e ? new r(n$1, t2) : n$1, next();
        }
        return next();
      }
    };
  }
  module2.exports = _usingCtx, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
} });
var require_OverloadYield = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/OverloadYield.js"(exports2, module2) {
  function _OverloadYield(e, d) {
    this.v = e, this.k = d;
  }
  module2.exports = _OverloadYield, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
} });
var require_awaitAsyncGenerator = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/awaitAsyncGenerator.js"(exports2, module2) {
  var OverloadYield$2 = require_OverloadYield();
  function _awaitAsyncGenerator$5(e) {
    return new OverloadYield$2(e, 0);
  }
  module2.exports = _awaitAsyncGenerator$5, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
} });
var require_wrapAsyncGenerator = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/wrapAsyncGenerator.js"(exports2, module2) {
  var OverloadYield$1 = require_OverloadYield();
  function _wrapAsyncGenerator$6(e) {
    return function() {
      return new AsyncGenerator(e.apply(this, arguments));
    };
  }
  function AsyncGenerator(e) {
    var r, t2;
    function resume(r$1, t$1) {
      try {
        var n = e[r$1](t$1), o = n.value, u = o instanceof OverloadYield$1;
        Promise.resolve(u ? o.v : o).then(function(t$2) {
          if (u) {
            var i = "return" === r$1 ? "return" : "next";
            if (!o.k || t$2.done) return resume(i, t$2);
            t$2 = e[i](t$2).value;
          }
          settle(n.done ? "return" : "normal", t$2);
        }, function(e$1) {
          resume("throw", e$1);
        });
      } catch (e$1) {
        settle("throw", e$1);
      }
    }
    function settle(e$1, n) {
      switch (e$1) {
        case "return":
          r.resolve({
            value: n,
            done: true
          });
          break;
        case "throw":
          r.reject(n);
          break;
        default:
          r.resolve({
            value: n,
            done: false
          });
      }
      (r = r.next) ? resume(r.key, r.arg) : t2 = null;
    }
    this._invoke = function(e$1, n) {
      return new Promise(function(o, u) {
        var i = {
          key: e$1,
          arg: n,
          resolve: o,
          reject: u,
          next: null
        };
        t2 ? t2 = t2.next = i : (r = t2 = i, resume(e$1, n));
      });
    }, "function" != typeof e["return"] && (this["return"] = void 0);
  }
  AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
    return this;
  }, AsyncGenerator.prototype.next = function(e) {
    return this._invoke("next", e);
  }, AsyncGenerator.prototype["throw"] = function(e) {
    return this._invoke("throw", e);
  }, AsyncGenerator.prototype["return"] = function(e) {
    return this._invoke("return", e);
  };
  module2.exports = _wrapAsyncGenerator$6, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
} });
var import_usingCtx$4 = __toESM2(require_usingCtx(), 1);
var import_awaitAsyncGenerator$4 = __toESM2(require_awaitAsyncGenerator(), 1);
var import_wrapAsyncGenerator$5 = __toESM2(require_wrapAsyncGenerator(), 1);
function iteratorResource(iterable) {
  const iterator = iterable[Symbol.asyncIterator]();
  if (iterator[Symbol.asyncDispose]) return iterator;
  return makeAsyncResource(iterator, async () => {
    var _iterator$return;
    await ((_iterator$return = iterator.return) === null || _iterator$return === void 0 ? void 0 : _iterator$return.call(iterator));
  });
}
function takeWithGrace(_x, _x2) {
  return _takeWithGrace.apply(this, arguments);
}
function _takeWithGrace() {
  _takeWithGrace = (0, import_wrapAsyncGenerator$5.default)(function* (iterable, opts) {
    try {
      var _usingCtx$1 = (0, import_usingCtx$4.default)();
      const iterator = _usingCtx$1.a(iteratorResource(iterable));
      let result;
      const timer = _usingCtx$1.u(timerResource(opts.gracePeriodMs));
      let count2 = opts.count;
      let timerPromise = new Promise(() => {
      });
      while (true) {
        result = yield (0, import_awaitAsyncGenerator$4.default)(Unpromise.race([iterator.next(), timerPromise]));
        if (result === disposablePromiseTimerResult) throwAbortError();
        if (result.done) return result.value;
        yield result.value;
        if (--count2 === 0) timerPromise = timer.start();
        result = null;
      }
    } catch (_) {
      _usingCtx$1.e = _;
    } finally {
      yield (0, import_awaitAsyncGenerator$4.default)(_usingCtx$1.d());
    }
  });
  return _takeWithGrace.apply(this, arguments);
}
function createDeferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {
    promise,
    resolve,
    reject
  };
}
var import_usingCtx$3 = __toESM2(require_usingCtx(), 1);
var import_awaitAsyncGenerator$3 = __toESM2(require_awaitAsyncGenerator(), 1);
var import_wrapAsyncGenerator$4 = __toESM2(require_wrapAsyncGenerator(), 1);
function createManagedIterator(iterable, onResult) {
  const iterator = iterable[Symbol.asyncIterator]();
  let state = "idle";
  function cleanup() {
    state = "done";
    onResult = () => {
    };
  }
  function pull() {
    if (state !== "idle") return;
    state = "pending";
    const next = iterator.next();
    next.then((result) => {
      if (result.done) {
        state = "done";
        onResult({
          status: "return",
          value: result.value
        });
        cleanup();
        return;
      }
      state = "idle";
      onResult({
        status: "yield",
        value: result.value
      });
    }).catch((cause) => {
      onResult({
        status: "error",
        error: cause
      });
      cleanup();
    });
  }
  return {
    pull,
    destroy: async () => {
      var _iterator$return;
      cleanup();
      await ((_iterator$return = iterator.return) === null || _iterator$return === void 0 ? void 0 : _iterator$return.call(iterator));
    }
  };
}
function mergeAsyncIterables() {
  let state = "idle";
  let flushSignal = createDeferred();
  const iterables = [];
  const iterators = /* @__PURE__ */ new Set();
  const buffer = [];
  function initIterable(iterable) {
    if (state !== "pending") return;
    const iterator = createManagedIterator(iterable, (result) => {
      if (state !== "pending") return;
      switch (result.status) {
        case "yield":
          buffer.push([iterator, result]);
          break;
        case "return":
          iterators.delete(iterator);
          break;
        case "error":
          buffer.push([iterator, result]);
          iterators.delete(iterator);
          break;
      }
      flushSignal.resolve();
    });
    iterators.add(iterator);
    iterator.pull();
  }
  return {
    add(iterable) {
      switch (state) {
        case "idle":
          iterables.push(iterable);
          break;
        case "pending":
          initIterable(iterable);
          break;
        case "done":
          break;
      }
    },
    [Symbol.asyncIterator]() {
      return (0, import_wrapAsyncGenerator$4.default)(function* () {
        try {
          var _usingCtx$1 = (0, import_usingCtx$3.default)();
          if (state !== "idle") throw new Error("Cannot iterate twice");
          state = "pending";
          const _finally = _usingCtx$1.a(makeAsyncResource({}, async () => {
            state = "done";
            const errors = [];
            await Promise.all(Array.from(iterators.values()).map(async (it) => {
              try {
                await it.destroy();
              } catch (cause) {
                errors.push(cause);
              }
            }));
            buffer.length = 0;
            iterators.clear();
            flushSignal.resolve();
            if (errors.length > 0) throw new AggregateError(errors);
          }));
          while (iterables.length > 0) initIterable(iterables.shift());
          while (iterators.size > 0) {
            yield (0, import_awaitAsyncGenerator$3.default)(flushSignal.promise);
            while (buffer.length > 0) {
              const [iterator, result] = buffer.shift();
              switch (result.status) {
                case "yield":
                  yield result.value;
                  iterator.pull();
                  break;
                case "error":
                  throw result.error;
              }
            }
            flushSignal = createDeferred();
          }
        } catch (_) {
          _usingCtx$1.e = _;
        } finally {
          yield (0, import_awaitAsyncGenerator$3.default)(_usingCtx$1.d());
        }
      })();
    }
  };
}
function readableStreamFrom(iterable) {
  const iterator = iterable[Symbol.asyncIterator]();
  return new ReadableStream({
    async cancel() {
      var _iterator$return;
      await ((_iterator$return = iterator.return) === null || _iterator$return === void 0 ? void 0 : _iterator$return.call(iterator));
    },
    async pull(controller) {
      const result = await iterator.next();
      if (result.done) {
        controller.close();
        return;
      }
      controller.enqueue(result.value);
    }
  });
}
var import_usingCtx$2 = __toESM2(require_usingCtx(), 1);
var import_awaitAsyncGenerator$2 = __toESM2(require_awaitAsyncGenerator(), 1);
var import_wrapAsyncGenerator$3 = __toESM2(require_wrapAsyncGenerator(), 1);
var PING_SYM = /* @__PURE__ */ Symbol("ping");
function withPing(_x, _x2) {
  return _withPing.apply(this, arguments);
}
function _withPing() {
  _withPing = (0, import_wrapAsyncGenerator$3.default)(function* (iterable, pingIntervalMs) {
    try {
      var _usingCtx$1 = (0, import_usingCtx$2.default)();
      const iterator = _usingCtx$1.a(iteratorResource(iterable));
      let result;
      let nextPromise = iterator.next();
      while (true) try {
        var _usingCtx3 = (0, import_usingCtx$2.default)();
        const pingPromise = _usingCtx3.u(timerResource(pingIntervalMs));
        result = yield (0, import_awaitAsyncGenerator$2.default)(Unpromise.race([nextPromise, pingPromise.start()]));
        if (result === disposablePromiseTimerResult) {
          yield PING_SYM;
          continue;
        }
        if (result.done) return result.value;
        nextPromise = iterator.next();
        yield result.value;
        result = null;
      } catch (_) {
        _usingCtx3.e = _;
      } finally {
        _usingCtx3.d();
      }
    } catch (_) {
      _usingCtx$1.e = _;
    } finally {
      yield (0, import_awaitAsyncGenerator$2.default)(_usingCtx$1.d());
    }
  });
  return _withPing.apply(this, arguments);
}
var require_asyncIterator = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js"(exports2, module2) {
  function _asyncIterator$2(r) {
    var n, t2, o, e = 2;
    for ("undefined" != typeof Symbol && (t2 = Symbol.asyncIterator, o = Symbol.iterator); e--; ) {
      if (t2 && null != (n = r[t2])) return n.call(r);
      if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r));
      t2 = "@@asyncIterator", o = "@@iterator";
    }
    throw new TypeError("Object is not async iterable");
  }
  function AsyncFromSyncIterator(r) {
    function AsyncFromSyncIteratorContinuation(r$1) {
      if (Object(r$1) !== r$1) return Promise.reject(new TypeError(r$1 + " is not an object."));
      var n = r$1.done;
      return Promise.resolve(r$1.value).then(function(r$2) {
        return {
          value: r$2,
          done: n
        };
      });
    }
    return AsyncFromSyncIterator = function AsyncFromSyncIterator$1(r$1) {
      this.s = r$1, this.n = r$1.next;
    }, AsyncFromSyncIterator.prototype = {
      s: null,
      n: null,
      next: function next() {
        return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
      },
      "return": function _return(r$1) {
        var n = this.s["return"];
        return void 0 === n ? Promise.resolve({
          value: r$1,
          done: true
        }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
      },
      "throw": function _throw(r$1) {
        var n = this.s["return"];
        return void 0 === n ? Promise.reject(r$1) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
      }
    }, new AsyncFromSyncIterator(r);
  }
  module2.exports = _asyncIterator$2, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
} });
var import_awaitAsyncGenerator$1 = __toESM2(require_awaitAsyncGenerator(), 1);
var import_wrapAsyncGenerator$2 = __toESM2(require_wrapAsyncGenerator(), 1);
var import_usingCtx$1 = __toESM2(require_usingCtx(), 1);
var import_asyncIterator$1 = __toESM2(require_asyncIterator(), 1);
var CHUNK_VALUE_TYPE_PROMISE = 0;
var CHUNK_VALUE_TYPE_ASYNC_ITERABLE = 1;
var PROMISE_STATUS_FULFILLED = 0;
var PROMISE_STATUS_REJECTED = 1;
var ASYNC_ITERABLE_STATUS_RETURN = 0;
var ASYNC_ITERABLE_STATUS_YIELD = 1;
var ASYNC_ITERABLE_STATUS_ERROR = 2;
function isPromise(value) {
  return (isObject(value) || isFunction(value)) && typeof (value === null || value === void 0 ? void 0 : value["then"]) === "function" && typeof (value === null || value === void 0 ? void 0 : value["catch"]) === "function";
}
var MaxDepthError = class extends Error {
  constructor(path3) {
    super("Max depth reached at path: " + path3.join("."));
    this.path = path3;
  }
};
function createBatchStreamProducer(_x3) {
  return _createBatchStreamProducer.apply(this, arguments);
}
function _createBatchStreamProducer() {
  _createBatchStreamProducer = (0, import_wrapAsyncGenerator$2.default)(function* (opts) {
    const { data } = opts;
    let counter = 0;
    const placeholder = 0;
    const mergedIterables = mergeAsyncIterables();
    function registerAsync(callback) {
      const idx = counter++;
      const iterable$1 = callback(idx);
      mergedIterables.add(iterable$1);
      return idx;
    }
    function encodePromise(promise, path3) {
      return registerAsync(/* @__PURE__ */ (function() {
        var _ref = (0, import_wrapAsyncGenerator$2.default)(function* (idx) {
          const error = checkMaxDepth(path3);
          if (error) {
            promise.catch((cause) => {
              var _opts$onError;
              (_opts$onError = opts.onError) === null || _opts$onError === void 0 || _opts$onError.call(opts, {
                error: cause,
                path: path3
              });
            });
            promise = Promise.reject(error);
          }
          try {
            const next = yield (0, import_awaitAsyncGenerator$1.default)(promise);
            yield [
              idx,
              PROMISE_STATUS_FULFILLED,
              encode(next, path3)
            ];
          } catch (cause) {
            var _opts$onError2, _opts$formatError;
            (_opts$onError2 = opts.onError) === null || _opts$onError2 === void 0 || _opts$onError2.call(opts, {
              error: cause,
              path: path3
            });
            yield [
              idx,
              PROMISE_STATUS_REJECTED,
              (_opts$formatError = opts.formatError) === null || _opts$formatError === void 0 ? void 0 : _opts$formatError.call(opts, {
                error: cause,
                path: path3
              })
            ];
          }
        });
        return function(_x) {
          return _ref.apply(this, arguments);
        };
      })());
    }
    function encodeAsyncIterable(iterable$1, path3) {
      return registerAsync(/* @__PURE__ */ (function() {
        var _ref2 = (0, import_wrapAsyncGenerator$2.default)(function* (idx) {
          try {
            var _usingCtx$1 = (0, import_usingCtx$1.default)();
            const error = checkMaxDepth(path3);
            if (error) throw error;
            const iterator = _usingCtx$1.a(iteratorResource(iterable$1));
            try {
              while (true) {
                const next = yield (0, import_awaitAsyncGenerator$1.default)(iterator.next());
                if (next.done) {
                  yield [
                    idx,
                    ASYNC_ITERABLE_STATUS_RETURN,
                    encode(next.value, path3)
                  ];
                  break;
                }
                yield [
                  idx,
                  ASYNC_ITERABLE_STATUS_YIELD,
                  encode(next.value, path3)
                ];
              }
            } catch (cause) {
              var _opts$onError3, _opts$formatError2;
              (_opts$onError3 = opts.onError) === null || _opts$onError3 === void 0 || _opts$onError3.call(opts, {
                error: cause,
                path: path3
              });
              yield [
                idx,
                ASYNC_ITERABLE_STATUS_ERROR,
                (_opts$formatError2 = opts.formatError) === null || _opts$formatError2 === void 0 ? void 0 : _opts$formatError2.call(opts, {
                  error: cause,
                  path: path3
                })
              ];
            }
          } catch (_) {
            _usingCtx$1.e = _;
          } finally {
            yield (0, import_awaitAsyncGenerator$1.default)(_usingCtx$1.d());
          }
        });
        return function(_x2) {
          return _ref2.apply(this, arguments);
        };
      })());
    }
    function checkMaxDepth(path3) {
      if (opts.maxDepth && path3.length > opts.maxDepth) return new MaxDepthError(path3);
      return null;
    }
    function encodeAsync(value, path3) {
      if (isPromise(value)) return [CHUNK_VALUE_TYPE_PROMISE, encodePromise(value, path3)];
      if (isAsyncIterable(value)) {
        if (opts.maxDepth && path3.length >= opts.maxDepth) throw new Error("Max depth reached");
        return [CHUNK_VALUE_TYPE_ASYNC_ITERABLE, encodeAsyncIterable(value, path3)];
      }
      return null;
    }
    function encode(value, path3) {
      if (value === void 0) return [[]];
      const reg = encodeAsync(value, path3);
      if (reg) return [[placeholder], [null, ...reg]];
      if (!isPlainObject(value)) return [[value]];
      const newObj = emptyObject();
      const asyncValues = [];
      for (const [key, item] of Object.entries(value)) {
        const transformed = encodeAsync(item, [...path3, key]);
        if (!transformed) {
          newObj[key] = item;
          continue;
        }
        newObj[key] = placeholder;
        asyncValues.push([key, ...transformed]);
      }
      return [[newObj], ...asyncValues];
    }
    const newHead = emptyObject();
    for (const [key, item] of Object.entries(data)) newHead[key] = encode(item, [key]);
    yield newHead;
    let iterable = mergedIterables;
    if (opts.pingMs) iterable = withPing(mergedIterables, opts.pingMs);
    var _iteratorAbruptCompletion = false;
    var _didIteratorError = false;
    var _iteratorError;
    try {
      for (var _iterator = (0, import_asyncIterator$1.default)(iterable), _step; _iteratorAbruptCompletion = !(_step = yield (0, import_awaitAsyncGenerator$1.default)(_iterator.next())).done; _iteratorAbruptCompletion = false) {
        const value = _step.value;
        yield value;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (_iteratorAbruptCompletion && _iterator.return != null) yield (0, import_awaitAsyncGenerator$1.default)(_iterator.return());
      } finally {
        if (_didIteratorError) throw _iteratorError;
      }
    }
  });
  return _createBatchStreamProducer.apply(this, arguments);
}
function jsonlStreamProducer(opts) {
  let stream = readableStreamFrom(createBatchStreamProducer(opts));
  const { serialize: serialize2 } = opts;
  if (serialize2) stream = stream.pipeThrough(new TransformStream({ transform(chunk, controller) {
    if (chunk === PING_SYM) controller.enqueue(PING_SYM);
    else controller.enqueue(serialize2(chunk));
  } }));
  return stream.pipeThrough(new TransformStream({ transform(chunk, controller) {
    if (chunk === PING_SYM) controller.enqueue(" ");
    else controller.enqueue(JSON.stringify(chunk) + "\n");
  } })).pipeThrough(new TextEncoderStream());
}
var require_asyncGeneratorDelegate = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncGeneratorDelegate.js"(exports2, module2) {
  var OverloadYield = require_OverloadYield();
  function _asyncGeneratorDelegate$1(t2) {
    var e = {}, n = false;
    function pump(e$1, r) {
      return n = true, r = new Promise(function(n$1) {
        n$1(t2[e$1](r));
      }), {
        done: false,
        value: new OverloadYield(r, 1)
      };
    }
    return e["undefined" != typeof Symbol && Symbol.iterator || "@@iterator"] = function() {
      return this;
    }, e.next = function(t$1) {
      return n ? (n = false, t$1) : pump("next", t$1);
    }, "function" == typeof t2["throw"] && (e["throw"] = function(t$1) {
      if (n) throw n = false, t$1;
      return pump("throw", t$1);
    }), "function" == typeof t2["return"] && (e["return"] = function(t$1) {
      return n ? (n = false, t$1) : pump("return", t$1);
    }), e;
  }
  module2.exports = _asyncGeneratorDelegate$1, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
} });
var import_asyncIterator = __toESM2(require_asyncIterator(), 1);
var import_awaitAsyncGenerator = __toESM2(require_awaitAsyncGenerator(), 1);
var import_wrapAsyncGenerator$1 = __toESM2(require_wrapAsyncGenerator(), 1);
var import_asyncGeneratorDelegate = __toESM2(require_asyncGeneratorDelegate(), 1);
var import_usingCtx = __toESM2(require_usingCtx(), 1);
var PING_EVENT = "ping";
var SERIALIZED_ERROR_EVENT = "serialized-error";
var CONNECTED_EVENT = "connected";
var RETURN_EVENT = "return";
function sseStreamProducer(opts) {
  var _opts$ping$enabled, _opts$ping, _opts$ping$intervalMs, _opts$ping2, _opts$client;
  const { serialize: serialize2 = identity } = opts;
  const ping = {
    enabled: (_opts$ping$enabled = (_opts$ping = opts.ping) === null || _opts$ping === void 0 ? void 0 : _opts$ping.enabled) !== null && _opts$ping$enabled !== void 0 ? _opts$ping$enabled : false,
    intervalMs: (_opts$ping$intervalMs = (_opts$ping2 = opts.ping) === null || _opts$ping2 === void 0 ? void 0 : _opts$ping2.intervalMs) !== null && _opts$ping$intervalMs !== void 0 ? _opts$ping$intervalMs : 1e3
  };
  const client = (_opts$client = opts.client) !== null && _opts$client !== void 0 ? _opts$client : {};
  if (ping.enabled && client.reconnectAfterInactivityMs && ping.intervalMs > client.reconnectAfterInactivityMs) throw new Error(`Ping interval must be less than client reconnect interval to prevent unnecessary reconnection - ping.intervalMs: ${ping.intervalMs} client.reconnectAfterInactivityMs: ${client.reconnectAfterInactivityMs}`);
  function generator() {
    return _generator.apply(this, arguments);
  }
  function _generator() {
    _generator = (0, import_wrapAsyncGenerator$1.default)(function* () {
      yield {
        event: CONNECTED_EVENT,
        data: JSON.stringify(client)
      };
      let iterable = opts.data;
      if (opts.emitAndEndImmediately) iterable = takeWithGrace(iterable, {
        count: 1,
        gracePeriodMs: 1
      });
      if (ping.enabled && ping.intervalMs !== Infinity && ping.intervalMs > 0) iterable = withPing(iterable, ping.intervalMs);
      let value;
      let chunk;
      var _iteratorAbruptCompletion = false;
      var _didIteratorError = false;
      var _iteratorError;
      try {
        for (var _iterator = (0, import_asyncIterator.default)(iterable), _step; _iteratorAbruptCompletion = !(_step = yield (0, import_awaitAsyncGenerator.default)(_iterator.next())).done; _iteratorAbruptCompletion = false) {
          value = _step.value;
          {
            if (value === PING_SYM) {
              yield {
                event: PING_EVENT,
                data: ""
              };
              continue;
            }
            chunk = isTrackedEnvelope(value) ? {
              id: value[0],
              data: value[1]
            } : { data: value };
            chunk.data = JSON.stringify(serialize2(chunk.data));
            yield chunk;
            value = null;
            chunk = null;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (_iteratorAbruptCompletion && _iterator.return != null) yield (0, import_awaitAsyncGenerator.default)(_iterator.return());
        } finally {
          if (_didIteratorError) throw _iteratorError;
        }
      }
    });
    return _generator.apply(this, arguments);
  }
  function generatorWithErrorHandling() {
    return _generatorWithErrorHandling.apply(this, arguments);
  }
  function _generatorWithErrorHandling() {
    _generatorWithErrorHandling = (0, import_wrapAsyncGenerator$1.default)(function* () {
      try {
        yield* (0, import_asyncGeneratorDelegate.default)((0, import_asyncIterator.default)(generator()));
        yield {
          event: RETURN_EVENT,
          data: ""
        };
      } catch (cause) {
        var _opts$formatError, _opts$formatError2;
        if (isAbortError(cause)) return;
        const error = getTRPCErrorFromUnknown(cause);
        const data = (_opts$formatError = (_opts$formatError2 = opts.formatError) === null || _opts$formatError2 === void 0 ? void 0 : _opts$formatError2.call(opts, { error })) !== null && _opts$formatError !== void 0 ? _opts$formatError : null;
        yield {
          event: SERIALIZED_ERROR_EVENT,
          data: JSON.stringify(serialize2(data))
        };
      }
    });
    return _generatorWithErrorHandling.apply(this, arguments);
  }
  const stream = readableStreamFrom(generatorWithErrorHandling());
  return stream.pipeThrough(new TransformStream({ transform(chunk, controller) {
    if ("event" in chunk) controller.enqueue(`event: ${chunk.event}
`);
    if ("data" in chunk) controller.enqueue(`data: ${chunk.data}
`);
    if ("id" in chunk) controller.enqueue(`id: ${chunk.id}
`);
    if ("comment" in chunk) controller.enqueue(`: ${chunk.comment}
`);
    controller.enqueue("\n\n");
  } })).pipeThrough(new TextEncoderStream());
}
var sseHeaders = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache, no-transform",
  "X-Accel-Buffering": "no",
  Connection: "keep-alive"
};
var import_wrapAsyncGenerator = __toESM2(require_wrapAsyncGenerator(), 1);
var import_objectSpread23 = __toESM2(require_objectSpread2(), 1);
function errorToAsyncIterable(err) {
  return run((0, import_wrapAsyncGenerator.default)(function* () {
    throw err;
  }));
}
function combinedAbortController(signal) {
  const controller = new AbortController();
  const combinedSignal = abortSignalsAnyPonyfill([signal, controller.signal]);
  return {
    signal: combinedSignal,
    controller
  };
}
var TYPE_ACCEPTED_METHOD_MAP = {
  mutation: ["POST"],
  query: ["GET"],
  subscription: ["GET"]
};
var TYPE_ACCEPTED_METHOD_MAP_WITH_METHOD_OVERRIDE = {
  mutation: ["POST"],
  query: ["GET", "POST"],
  subscription: ["GET", "POST"]
};
function initResponse(initOpts) {
  var _responseMeta, _info$calls$find$proc, _info$calls$find;
  const { ctx, info, responseMeta, untransformedJSON, errors = [], headers } = initOpts;
  let status = untransformedJSON ? getHTTPStatusCode(untransformedJSON) : 200;
  const eagerGeneration = !untransformedJSON;
  const data = eagerGeneration ? [] : Array.isArray(untransformedJSON) ? untransformedJSON : [untransformedJSON];
  const meta = (_responseMeta = responseMeta === null || responseMeta === void 0 ? void 0 : responseMeta({
    ctx,
    info,
    paths: info === null || info === void 0 ? void 0 : info.calls.map((call) => call.path),
    data,
    errors,
    eagerGeneration,
    type: (_info$calls$find$proc = info === null || info === void 0 || (_info$calls$find = info.calls.find((call) => {
      var _call$procedure;
      return (_call$procedure = call.procedure) === null || _call$procedure === void 0 ? void 0 : _call$procedure._def.type;
    })) === null || _info$calls$find === void 0 || (_info$calls$find = _info$calls$find.procedure) === null || _info$calls$find === void 0 ? void 0 : _info$calls$find._def.type) !== null && _info$calls$find$proc !== void 0 ? _info$calls$find$proc : "unknown"
  })) !== null && _responseMeta !== void 0 ? _responseMeta : {};
  if (meta.headers) {
    if (meta.headers instanceof Headers) for (const [key, value] of meta.headers.entries()) headers.append(key, value);
    else
      for (const [key, value] of Object.entries(meta.headers)) if (Array.isArray(value)) for (const v of value) headers.append(key, v);
      else if (typeof value === "string") headers.set(key, value);
  }
  if (meta.status) status = meta.status;
  return { status };
}
function caughtErrorToData(cause, errorOpts) {
  const { router: router2, req, onError } = errorOpts.opts;
  const error = getTRPCErrorFromUnknown(cause);
  onError === null || onError === void 0 || onError({
    error,
    path: errorOpts.path,
    input: errorOpts.input,
    ctx: errorOpts.ctx,
    type: errorOpts.type,
    req
  });
  const untransformedJSON = { error: getErrorShape({
    config: router2._def._config,
    error,
    type: errorOpts.type,
    path: errorOpts.path,
    input: errorOpts.input,
    ctx: errorOpts.ctx
  }) };
  const transformedJSON = transformTRPCResponse(router2._def._config, untransformedJSON);
  const body = JSON.stringify(transformedJSON);
  return {
    error,
    untransformedJSON,
    body
  };
}
function isDataStream(v) {
  if (!isObject(v)) return false;
  if (isAsyncIterable(v)) return true;
  return Object.values(v).some(isPromise) || Object.values(v).some(isAsyncIterable);
}
async function resolveResponse(opts) {
  var _ref, _opts$allowBatching, _opts$batching, _opts$allowMethodOver, _config$sse$enabled, _config$sse;
  const { router: router2, req } = opts;
  const headers = new Headers([["vary", "trpc-accept"]]);
  const config = router2._def._config;
  const url = new URL(req.url);
  if (req.method === "HEAD") return new Response(null, { status: 204 });
  const allowBatching = (_ref = (_opts$allowBatching = opts.allowBatching) !== null && _opts$allowBatching !== void 0 ? _opts$allowBatching : (_opts$batching = opts.batching) === null || _opts$batching === void 0 ? void 0 : _opts$batching.enabled) !== null && _ref !== void 0 ? _ref : true;
  const allowMethodOverride = ((_opts$allowMethodOver = opts.allowMethodOverride) !== null && _opts$allowMethodOver !== void 0 ? _opts$allowMethodOver : false) && req.method === "POST";
  const infoTuple = await run(async () => {
    try {
      return [void 0, await getRequestInfo({
        req,
        path: decodeURIComponent(opts.path),
        router: router2,
        searchParams: url.searchParams,
        headers: opts.req.headers,
        url
      })];
    } catch (cause) {
      return [getTRPCErrorFromUnknown(cause), void 0];
    }
  });
  const ctxManager = run(() => {
    let result = void 0;
    return {
      valueOrUndefined: () => {
        if (!result) return void 0;
        return result[1];
      },
      value: () => {
        const [err, ctx] = result;
        if (err) throw err;
        return ctx;
      },
      create: async (info) => {
        if (result) throw new Error("This should only be called once - report a bug in tRPC");
        try {
          const ctx = await opts.createContext({ info });
          result = [void 0, ctx];
        } catch (cause) {
          result = [getTRPCErrorFromUnknown(cause), void 0];
        }
      }
    };
  });
  const methodMapper = allowMethodOverride ? TYPE_ACCEPTED_METHOD_MAP_WITH_METHOD_OVERRIDE : TYPE_ACCEPTED_METHOD_MAP;
  const isStreamCall = req.headers.get("trpc-accept") === "application/jsonl";
  const experimentalSSE = (_config$sse$enabled = (_config$sse = config.sse) === null || _config$sse === void 0 ? void 0 : _config$sse.enabled) !== null && _config$sse$enabled !== void 0 ? _config$sse$enabled : true;
  try {
    const [infoError, info] = infoTuple;
    if (infoError) throw infoError;
    if (info.isBatchCall && !allowBatching) throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Batching is not enabled on the server`
    });
    if (isStreamCall && !info.isBatchCall) throw new TRPCError({
      message: `Streaming requests must be batched (you can do a batch of 1)`,
      code: "BAD_REQUEST"
    });
    await ctxManager.create(info);
    const rpcCalls = info.calls.map(async (call) => {
      const proc = call.procedure;
      const combinedAbort = combinedAbortController(opts.req.signal);
      try {
        if (opts.error) throw opts.error;
        if (!proc) throw new TRPCError({
          code: "NOT_FOUND",
          message: `No procedure found on path "${call.path}"`
        });
        if (!methodMapper[proc._def.type].includes(req.method)) throw new TRPCError({
          code: "METHOD_NOT_SUPPORTED",
          message: `Unsupported ${req.method}-request to ${proc._def.type} procedure at path "${call.path}"`
        });
        if (proc._def.type === "subscription") {
          var _config$sse2;
          if (info.isBatchCall) throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Cannot batch subscription calls`
          });
          if ((_config$sse2 = config.sse) === null || _config$sse2 === void 0 ? void 0 : _config$sse2.maxDurationMs) {
            let cleanup = function() {
              clearTimeout(timer);
              combinedAbort.signal.removeEventListener("abort", cleanup);
              combinedAbort.controller.abort();
            };
            const timer = setTimeout(cleanup, config.sse.maxDurationMs);
            combinedAbort.signal.addEventListener("abort", cleanup);
          }
        }
        const data = await proc({
          path: call.path,
          getRawInput: call.getRawInput,
          ctx: ctxManager.value(),
          type: proc._def.type,
          signal: combinedAbort.signal
        });
        return [void 0, { data }];
      } catch (cause) {
        var _opts$onError, _call$procedure$_def$, _call$procedure2;
        const error = getTRPCErrorFromUnknown(cause);
        const input = call.result();
        (_opts$onError = opts.onError) === null || _opts$onError === void 0 || _opts$onError.call(opts, {
          error,
          path: call.path,
          input,
          ctx: ctxManager.valueOrUndefined(),
          type: (_call$procedure$_def$ = (_call$procedure2 = call.procedure) === null || _call$procedure2 === void 0 ? void 0 : _call$procedure2._def.type) !== null && _call$procedure$_def$ !== void 0 ? _call$procedure$_def$ : "unknown",
          req: opts.req
        });
        return [error, void 0];
      }
    });
    if (!info.isBatchCall) {
      const [call] = info.calls;
      const [error, result] = await rpcCalls[0];
      switch (info.type) {
        case "unknown":
        case "mutation":
        case "query": {
          headers.set("content-type", "application/json");
          if (isDataStream(result === null || result === void 0 ? void 0 : result.data)) throw new TRPCError({
            code: "UNSUPPORTED_MEDIA_TYPE",
            message: "Cannot use stream-like response in non-streaming request - use httpBatchStreamLink"
          });
          const res = error ? { error: getErrorShape({
            config,
            ctx: ctxManager.valueOrUndefined(),
            error,
            input: call.result(),
            path: call.path,
            type: info.type
          }) } : { result: { data: result.data } };
          const headResponse$1 = initResponse({
            ctx: ctxManager.valueOrUndefined(),
            info,
            responseMeta: opts.responseMeta,
            errors: error ? [error] : [],
            headers,
            untransformedJSON: [res]
          });
          return new Response(JSON.stringify(transformTRPCResponse(config, res)), {
            status: headResponse$1.status,
            headers
          });
        }
        case "subscription": {
          const iterable = run(() => {
            if (error) return errorToAsyncIterable(error);
            if (!experimentalSSE) return errorToAsyncIterable(new TRPCError({
              code: "METHOD_NOT_SUPPORTED",
              message: 'Missing experimental flag "sseSubscriptions"'
            }));
            if (!isObservable(result.data) && !isAsyncIterable(result.data)) return errorToAsyncIterable(new TRPCError({
              message: `Subscription ${call.path} did not return an observable or a AsyncGenerator`,
              code: "INTERNAL_SERVER_ERROR"
            }));
            const dataAsIterable = isObservable(result.data) ? observableToAsyncIterable(result.data, opts.req.signal) : result.data;
            return dataAsIterable;
          });
          const stream = sseStreamProducer((0, import_objectSpread23.default)((0, import_objectSpread23.default)({}, config.sse), {}, {
            data: iterable,
            serialize: (v) => config.transformer.output.serialize(v),
            formatError(errorOpts) {
              var _call$procedure$_def$2, _call$procedure3, _opts$onError2;
              const error$1 = getTRPCErrorFromUnknown(errorOpts.error);
              const input = call === null || call === void 0 ? void 0 : call.result();
              const path3 = call === null || call === void 0 ? void 0 : call.path;
              const type = (_call$procedure$_def$2 = call === null || call === void 0 || (_call$procedure3 = call.procedure) === null || _call$procedure3 === void 0 ? void 0 : _call$procedure3._def.type) !== null && _call$procedure$_def$2 !== void 0 ? _call$procedure$_def$2 : "unknown";
              (_opts$onError2 = opts.onError) === null || _opts$onError2 === void 0 || _opts$onError2.call(opts, {
                error: error$1,
                path: path3,
                input,
                ctx: ctxManager.valueOrUndefined(),
                req: opts.req,
                type
              });
              const shape = getErrorShape({
                config,
                ctx: ctxManager.valueOrUndefined(),
                error: error$1,
                input,
                path: path3,
                type
              });
              return shape;
            }
          }));
          for (const [key, value] of Object.entries(sseHeaders)) headers.set(key, value);
          const headResponse$1 = initResponse({
            ctx: ctxManager.valueOrUndefined(),
            info,
            responseMeta: opts.responseMeta,
            errors: [],
            headers,
            untransformedJSON: null
          });
          return new Response(stream, {
            headers,
            status: headResponse$1.status
          });
        }
      }
    }
    if (info.accept === "application/jsonl") {
      headers.set("content-type", "application/json");
      headers.set("transfer-encoding", "chunked");
      const headResponse$1 = initResponse({
        ctx: ctxManager.valueOrUndefined(),
        info,
        responseMeta: opts.responseMeta,
        errors: [],
        headers,
        untransformedJSON: null
      });
      const stream = jsonlStreamProducer((0, import_objectSpread23.default)((0, import_objectSpread23.default)({}, config.jsonl), {}, {
        maxDepth: Infinity,
        data: rpcCalls.map(async (res) => {
          const [error, result] = await res;
          const call = info.calls[0];
          if (error) {
            var _procedure$_def$type, _procedure;
            return { error: getErrorShape({
              config,
              ctx: ctxManager.valueOrUndefined(),
              error,
              input: call.result(),
              path: call.path,
              type: (_procedure$_def$type = (_procedure = call.procedure) === null || _procedure === void 0 ? void 0 : _procedure._def.type) !== null && _procedure$_def$type !== void 0 ? _procedure$_def$type : "unknown"
            }) };
          }
          const iterable = isObservable(result.data) ? observableToAsyncIterable(result.data, opts.req.signal) : Promise.resolve(result.data);
          return { result: Promise.resolve({ data: iterable }) };
        }),
        serialize: (data) => config.transformer.output.serialize(data),
        onError: (cause) => {
          var _opts$onError3, _info$type;
          (_opts$onError3 = opts.onError) === null || _opts$onError3 === void 0 || _opts$onError3.call(opts, {
            error: getTRPCErrorFromUnknown(cause),
            path: void 0,
            input: void 0,
            ctx: ctxManager.valueOrUndefined(),
            req: opts.req,
            type: (_info$type = info === null || info === void 0 ? void 0 : info.type) !== null && _info$type !== void 0 ? _info$type : "unknown"
          });
        },
        formatError(errorOpts) {
          var _call$procedure$_def$3, _call$procedure4;
          const call = info === null || info === void 0 ? void 0 : info.calls[errorOpts.path[0]];
          const error = getTRPCErrorFromUnknown(errorOpts.error);
          const input = call === null || call === void 0 ? void 0 : call.result();
          const path3 = call === null || call === void 0 ? void 0 : call.path;
          const type = (_call$procedure$_def$3 = call === null || call === void 0 || (_call$procedure4 = call.procedure) === null || _call$procedure4 === void 0 ? void 0 : _call$procedure4._def.type) !== null && _call$procedure$_def$3 !== void 0 ? _call$procedure$_def$3 : "unknown";
          const shape = getErrorShape({
            config,
            ctx: ctxManager.valueOrUndefined(),
            error,
            input,
            path: path3,
            type
          });
          return shape;
        }
      }));
      return new Response(stream, {
        headers,
        status: headResponse$1.status
      });
    }
    headers.set("content-type", "application/json");
    const results = (await Promise.all(rpcCalls)).map((res) => {
      const [error, result] = res;
      if (error) return res;
      if (isDataStream(result.data)) return [new TRPCError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "Cannot use stream-like response in non-streaming request - use httpBatchStreamLink"
      }), void 0];
      return res;
    });
    const resultAsRPCResponse = results.map(([error, result], index) => {
      const call = info.calls[index];
      if (error) {
        var _call$procedure$_def$4, _call$procedure5;
        return { error: getErrorShape({
          config,
          ctx: ctxManager.valueOrUndefined(),
          error,
          input: call.result(),
          path: call.path,
          type: (_call$procedure$_def$4 = (_call$procedure5 = call.procedure) === null || _call$procedure5 === void 0 ? void 0 : _call$procedure5._def.type) !== null && _call$procedure$_def$4 !== void 0 ? _call$procedure$_def$4 : "unknown"
        }) };
      }
      return { result: { data: result.data } };
    });
    const errors = results.map(([error]) => error).filter(Boolean);
    const headResponse = initResponse({
      ctx: ctxManager.valueOrUndefined(),
      info,
      responseMeta: opts.responseMeta,
      untransformedJSON: resultAsRPCResponse,
      errors,
      headers
    });
    return new Response(JSON.stringify(transformTRPCResponse(config, resultAsRPCResponse)), {
      status: headResponse.status,
      headers
    });
  } catch (cause) {
    var _info$type2;
    const [_infoError, info] = infoTuple;
    const ctx = ctxManager.valueOrUndefined();
    const { error, untransformedJSON, body } = caughtErrorToData(cause, {
      opts,
      ctx: ctxManager.valueOrUndefined(),
      type: (_info$type2 = info === null || info === void 0 ? void 0 : info.type) !== null && _info$type2 !== void 0 ? _info$type2 : "unknown"
    });
    const headResponse = initResponse({
      ctx,
      info,
      responseMeta: opts.responseMeta,
      untransformedJSON,
      errors: [error],
      headers
    });
    return new Response(body, {
      status: headResponse.status,
      headers
    });
  }
}

// crabwalk/node_modules/.pnpm/@trpc+server@11.9.0_typescript@5.9.3/node_modules/@trpc/server/dist/adapters/fetch/index.mjs
var import_objectSpread24 = __toESM2(require_objectSpread2(), 1);
var trimSlashes = (path3) => {
  path3 = path3.startsWith("/") ? path3.slice(1) : path3;
  path3 = path3.endsWith("/") ? path3.slice(0, -1) : path3;
  return path3;
};
async function fetchRequestHandler(opts) {
  const resHeaders = new Headers();
  const createContext = async (innerOpts) => {
    var _opts$createContext;
    return (_opts$createContext = opts.createContext) === null || _opts$createContext === void 0 ? void 0 : _opts$createContext.call(opts, (0, import_objectSpread24.default)({
      req: opts.req,
      resHeaders
    }, innerOpts));
  };
  const url = new URL(opts.req.url);
  const pathname = trimSlashes(url.pathname);
  const endpoint = trimSlashes(opts.endpoint);
  const path3 = trimSlashes(pathname.slice(endpoint.length));
  return await resolveResponse((0, import_objectSpread24.default)((0, import_objectSpread24.default)({}, opts), {}, {
    req: opts.req,
    createContext,
    path: path3,
    error: null,
    onError(o) {
      var _opts$onError;
      opts === null || opts === void 0 || (_opts$onError = opts.onError) === null || _opts$onError === void 0 || _opts$onError.call(opts, (0, import_objectSpread24.default)((0, import_objectSpread24.default)({}, o), {}, { req: opts.req }));
    },
    responseMeta(data) {
      var _opts$responseMeta;
      const meta = (_opts$responseMeta = opts.responseMeta) === null || _opts$responseMeta === void 0 ? void 0 : _opts$responseMeta.call(opts, data);
      if (meta === null || meta === void 0 ? void 0 : meta.headers) {
        if (meta.headers instanceof Headers) for (const [key, value] of meta.headers.entries()) resHeaders.append(key, value);
        else
          for (const [key, value] of Object.entries(meta.headers)) if (Array.isArray(value)) for (const v of value) resHeaders.append(key, v);
          else if (typeof value === "string") resHeaders.set(key, value);
      }
      return {
        headers: resHeaders,
        status: meta === null || meta === void 0 ? void 0 : meta.status
      };
    }
  }));
}

// crabwalk/node_modules/.pnpm/@trpc+server@11.9.0_typescript@5.9.3/node_modules/@trpc/server/dist/initTRPC-T5bbc89W.mjs
var import_objectSpread2$2 = __toESM2(require_objectSpread2(), 1);
var middlewareMarker = "middlewareMarker";
function createMiddlewareFactory() {
  function createMiddlewareInner(middlewares) {
    return {
      _middlewares: middlewares,
      unstable_pipe(middlewareBuilderOrFn) {
        const pipedMiddleware = "_middlewares" in middlewareBuilderOrFn ? middlewareBuilderOrFn._middlewares : [middlewareBuilderOrFn];
        return createMiddlewareInner([...middlewares, ...pipedMiddleware]);
      }
    };
  }
  function createMiddleware(fn) {
    return createMiddlewareInner([fn]);
  }
  return createMiddleware;
}
function createInputMiddleware(parse2) {
  const inputMiddleware = async function inputValidatorMiddleware(opts) {
    let parsedInput;
    const rawInput = await opts.getRawInput();
    try {
      parsedInput = await parse2(rawInput);
    } catch (cause) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        cause
      });
    }
    const combinedInput = isObject(opts.input) && isObject(parsedInput) ? (0, import_objectSpread2$2.default)((0, import_objectSpread2$2.default)({}, opts.input), parsedInput) : parsedInput;
    return opts.next({ input: combinedInput });
  };
  inputMiddleware._type = "input";
  return inputMiddleware;
}
function createOutputMiddleware(parse2) {
  const outputMiddleware = async function outputValidatorMiddleware({ next }) {
    const result = await next();
    if (!result.ok) return result;
    try {
      const data = await parse2(result.data);
      return (0, import_objectSpread2$2.default)((0, import_objectSpread2$2.default)({}, result), {}, { data });
    } catch (cause) {
      throw new TRPCError({
        message: "Output validation failed",
        code: "INTERNAL_SERVER_ERROR",
        cause
      });
    }
  };
  outputMiddleware._type = "output";
  return outputMiddleware;
}
var import_defineProperty3 = __toESM2(require_defineProperty(), 1);
var StandardSchemaV1Error = class extends Error {
  /**
  * Creates a schema error with useful information.
  *
  * @param issues The schema issues.
  */
  constructor(issues) {
    var _issues$;
    super((_issues$ = issues[0]) === null || _issues$ === void 0 ? void 0 : _issues$.message);
    (0, import_defineProperty3.default)(this, "issues", void 0);
    this.name = "SchemaError";
    this.issues = issues;
  }
};
function getParseFn(procedureParser) {
  const parser = procedureParser;
  const isStandardSchema = "~standard" in parser;
  if (typeof parser === "function" && typeof parser.assert === "function") return parser.assert.bind(parser);
  if (typeof parser === "function" && !isStandardSchema) return parser;
  if (typeof parser.parseAsync === "function") return parser.parseAsync.bind(parser);
  if (typeof parser.parse === "function") return parser.parse.bind(parser);
  if (typeof parser.validateSync === "function") return parser.validateSync.bind(parser);
  if (typeof parser.create === "function") return parser.create.bind(parser);
  if (typeof parser.assert === "function") return (value) => {
    parser.assert(value);
    return value;
  };
  if (isStandardSchema) return async (value) => {
    const result = await parser["~standard"].validate(value);
    if (result.issues) throw new StandardSchemaV1Error(result.issues);
    return result.value;
  };
  throw new Error("Could not find a validator fn");
}
var require_objectWithoutPropertiesLoose = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutPropertiesLoose.js"(exports2, module2) {
  function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t2 = {};
    for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
      if (e.includes(n)) continue;
      t2[n] = r[n];
    }
    return t2;
  }
  module2.exports = _objectWithoutPropertiesLoose, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
} });
var require_objectWithoutProperties = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutProperties.js"(exports2, module2) {
  var objectWithoutPropertiesLoose = require_objectWithoutPropertiesLoose();
  function _objectWithoutProperties$1(e, t2) {
    if (null == e) return {};
    var o, r, i = objectWithoutPropertiesLoose(e, t2);
    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(e);
      for (r = 0; r < s.length; r++) o = s[r], t2.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
  }
  module2.exports = _objectWithoutProperties$1, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
} });
var import_objectWithoutProperties = __toESM2(require_objectWithoutProperties(), 1);
var import_objectSpread2$13 = __toESM2(require_objectSpread2(), 1);
var _excluded = [
  "middlewares",
  "inputs",
  "meta"
];
function createNewBuilder(def1, def2) {
  const { middlewares = [], inputs, meta } = def2, rest = (0, import_objectWithoutProperties.default)(def2, _excluded);
  return createBuilder((0, import_objectSpread2$13.default)((0, import_objectSpread2$13.default)({}, mergeWithoutOverrides(def1, rest)), {}, {
    inputs: [...def1.inputs, ...inputs !== null && inputs !== void 0 ? inputs : []],
    middlewares: [...def1.middlewares, ...middlewares],
    meta: def1.meta && meta ? (0, import_objectSpread2$13.default)((0, import_objectSpread2$13.default)({}, def1.meta), meta) : meta !== null && meta !== void 0 ? meta : def1.meta
  }));
}
function createBuilder(initDef = {}) {
  const _def = (0, import_objectSpread2$13.default)({
    procedure: true,
    inputs: [],
    middlewares: []
  }, initDef);
  const builder = {
    _def,
    input(input) {
      const parser = getParseFn(input);
      return createNewBuilder(_def, {
        inputs: [input],
        middlewares: [createInputMiddleware(parser)]
      });
    },
    output(output) {
      const parser = getParseFn(output);
      return createNewBuilder(_def, {
        output,
        middlewares: [createOutputMiddleware(parser)]
      });
    },
    meta(meta) {
      return createNewBuilder(_def, { meta });
    },
    use(middlewareBuilderOrFn) {
      const middlewares = "_middlewares" in middlewareBuilderOrFn ? middlewareBuilderOrFn._middlewares : [middlewareBuilderOrFn];
      return createNewBuilder(_def, { middlewares });
    },
    unstable_concat(builder$1) {
      return createNewBuilder(_def, builder$1._def);
    },
    concat(builder$1) {
      return createNewBuilder(_def, builder$1._def);
    },
    query(resolver) {
      return createResolver((0, import_objectSpread2$13.default)((0, import_objectSpread2$13.default)({}, _def), {}, { type: "query" }), resolver);
    },
    mutation(resolver) {
      return createResolver((0, import_objectSpread2$13.default)((0, import_objectSpread2$13.default)({}, _def), {}, { type: "mutation" }), resolver);
    },
    subscription(resolver) {
      return createResolver((0, import_objectSpread2$13.default)((0, import_objectSpread2$13.default)({}, _def), {}, { type: "subscription" }), resolver);
    },
    experimental_caller(caller) {
      return createNewBuilder(_def, { caller });
    }
  };
  return builder;
}
function createResolver(_defIn, resolver) {
  const finalBuilder = createNewBuilder(_defIn, {
    resolver,
    middlewares: [async function resolveMiddleware(opts) {
      const data = await resolver(opts);
      return {
        marker: middlewareMarker,
        ok: true,
        data,
        ctx: opts.ctx
      };
    }]
  });
  const _def = (0, import_objectSpread2$13.default)((0, import_objectSpread2$13.default)({}, finalBuilder._def), {}, {
    type: _defIn.type,
    experimental_caller: Boolean(finalBuilder._def.caller),
    meta: finalBuilder._def.meta,
    $types: null
  });
  const invoke = createProcedureCaller(finalBuilder._def);
  const callerOverride = finalBuilder._def.caller;
  if (!callerOverride) return invoke;
  const callerWrapper = async (...args) => {
    return await callerOverride({
      args,
      invoke,
      _def
    });
  };
  callerWrapper._def = _def;
  return callerWrapper;
}
var codeblock = `
This is a client-only function.
If you want to call this function on the server, see https://trpc.io/docs/v11/server/server-side-calls
`.trim();
async function callRecursive(index, _def, opts) {
  try {
    const middleware = _def.middlewares[index];
    const result = await middleware((0, import_objectSpread2$13.default)((0, import_objectSpread2$13.default)({}, opts), {}, {
      meta: _def.meta,
      input: opts.input,
      next(_nextOpts) {
        var _nextOpts$getRawInput;
        const nextOpts = _nextOpts;
        return callRecursive(index + 1, _def, (0, import_objectSpread2$13.default)((0, import_objectSpread2$13.default)({}, opts), {}, {
          ctx: (nextOpts === null || nextOpts === void 0 ? void 0 : nextOpts.ctx) ? (0, import_objectSpread2$13.default)((0, import_objectSpread2$13.default)({}, opts.ctx), nextOpts.ctx) : opts.ctx,
          input: nextOpts && "input" in nextOpts ? nextOpts.input : opts.input,
          getRawInput: (_nextOpts$getRawInput = nextOpts === null || nextOpts === void 0 ? void 0 : nextOpts.getRawInput) !== null && _nextOpts$getRawInput !== void 0 ? _nextOpts$getRawInput : opts.getRawInput
        }));
      }
    }));
    return result;
  } catch (cause) {
    return {
      ok: false,
      error: getTRPCErrorFromUnknown(cause),
      marker: middlewareMarker
    };
  }
}
function createProcedureCaller(_def) {
  async function procedure(opts) {
    if (!opts || !("getRawInput" in opts)) throw new Error(codeblock);
    const result = await callRecursive(0, _def, opts);
    if (!result) throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "No result from middlewares - did you forget to `return next()`?"
    });
    if (!result.ok) throw result.error;
    return result.data;
  }
  procedure._def = _def;
  procedure.procedure = true;
  procedure.meta = _def.meta;
  return procedure;
}
var _globalThis$process;
var _globalThis$process2;
var _globalThis$process3;
var isServerDefault = typeof window === "undefined" || "Deno" in window || ((_globalThis$process = globalThis.process) === null || _globalThis$process === void 0 || (_globalThis$process = _globalThis$process.env) === null || _globalThis$process === void 0 ? void 0 : _globalThis$process["NODE_ENV"]) === "test" || !!((_globalThis$process2 = globalThis.process) === null || _globalThis$process2 === void 0 || (_globalThis$process2 = _globalThis$process2.env) === null || _globalThis$process2 === void 0 ? void 0 : _globalThis$process2["JEST_WORKER_ID"]) || !!((_globalThis$process3 = globalThis.process) === null || _globalThis$process3 === void 0 || (_globalThis$process3 = _globalThis$process3.env) === null || _globalThis$process3 === void 0 ? void 0 : _globalThis$process3["VITEST_WORKER_ID"]);
var import_objectSpread25 = __toESM2(require_objectSpread2(), 1);
var TRPCBuilder = class TRPCBuilder2 {
  /**
  * Add a context shape as a generic to the root object
  * @see https://trpc.io/docs/v11/server/context
  */
  context() {
    return new TRPCBuilder2();
  }
  /**
  * Add a meta shape as a generic to the root object
  * @see https://trpc.io/docs/v11/quickstart
  */
  meta() {
    return new TRPCBuilder2();
  }
  /**
  * Create the root object
  * @see https://trpc.io/docs/v11/server/routers#initialize-trpc
  */
  create(opts) {
    var _opts$transformer, _opts$isDev, _globalThis$process$1, _opts$allowOutsideOfS, _opts$errorFormatter, _opts$isServer;
    const config = (0, import_objectSpread25.default)((0, import_objectSpread25.default)({}, opts), {}, {
      transformer: getDataTransformer((_opts$transformer = opts === null || opts === void 0 ? void 0 : opts.transformer) !== null && _opts$transformer !== void 0 ? _opts$transformer : defaultTransformer),
      isDev: (_opts$isDev = opts === null || opts === void 0 ? void 0 : opts.isDev) !== null && _opts$isDev !== void 0 ? _opts$isDev : ((_globalThis$process$1 = globalThis.process) === null || _globalThis$process$1 === void 0 ? void 0 : _globalThis$process$1.env["NODE_ENV"]) !== "production",
      allowOutsideOfServer: (_opts$allowOutsideOfS = opts === null || opts === void 0 ? void 0 : opts.allowOutsideOfServer) !== null && _opts$allowOutsideOfS !== void 0 ? _opts$allowOutsideOfS : false,
      errorFormatter: (_opts$errorFormatter = opts === null || opts === void 0 ? void 0 : opts.errorFormatter) !== null && _opts$errorFormatter !== void 0 ? _opts$errorFormatter : defaultFormatter,
      isServer: (_opts$isServer = opts === null || opts === void 0 ? void 0 : opts.isServer) !== null && _opts$isServer !== void 0 ? _opts$isServer : isServerDefault,
      $types: null
    });
    {
      var _opts$isServer2;
      const isServer = (_opts$isServer2 = opts === null || opts === void 0 ? void 0 : opts.isServer) !== null && _opts$isServer2 !== void 0 ? _opts$isServer2 : isServerDefault;
      if (!isServer && (opts === null || opts === void 0 ? void 0 : opts.allowOutsideOfServer) !== true) throw new Error(`You're trying to use @trpc/server in a non-server environment. This is not supported by default.`);
    }
    return {
      _config: config,
      procedure: createBuilder({ meta: opts === null || opts === void 0 ? void 0 : opts.defaultMeta }),
      middleware: createMiddlewareFactory(),
      router: createRouterFactory(config),
      mergeRouters,
      createCallerFactory: createCallerFactory()
    };
  }
};
var initTRPC = new TRPCBuilder();

// crabwalk/node_modules/.pnpm/superjson@2.2.6/node_modules/superjson/dist/double-indexed-kv.js
var DoubleIndexedKV = class {
  constructor() {
    this.keyToValue = /* @__PURE__ */ new Map();
    this.valueToKey = /* @__PURE__ */ new Map();
  }
  set(key, value) {
    this.keyToValue.set(key, value);
    this.valueToKey.set(value, key);
  }
  getByKey(key) {
    return this.keyToValue.get(key);
  }
  getByValue(value) {
    return this.valueToKey.get(value);
  }
  clear() {
    this.keyToValue.clear();
    this.valueToKey.clear();
  }
};

// crabwalk/node_modules/.pnpm/superjson@2.2.6/node_modules/superjson/dist/registry.js
var Registry = class {
  constructor(generateIdentifier) {
    this.generateIdentifier = generateIdentifier;
    this.kv = new DoubleIndexedKV();
  }
  register(value, identifier) {
    if (this.kv.getByValue(value)) {
      return;
    }
    if (!identifier) {
      identifier = this.generateIdentifier(value);
    }
    this.kv.set(identifier, value);
  }
  clear() {
    this.kv.clear();
  }
  getIdentifier(value) {
    return this.kv.getByValue(value);
  }
  getValue(identifier) {
    return this.kv.getByKey(identifier);
  }
};

// crabwalk/node_modules/.pnpm/superjson@2.2.6/node_modules/superjson/dist/class-registry.js
var ClassRegistry = class extends Registry {
  constructor() {
    super((c) => c.name);
    this.classToAllowedProps = /* @__PURE__ */ new Map();
  }
  register(value, options) {
    if (typeof options === "object") {
      if (options.allowProps) {
        this.classToAllowedProps.set(value, options.allowProps);
      }
      super.register(value, options.identifier);
    } else {
      super.register(value, options);
    }
  }
  getAllowedProps(value) {
    return this.classToAllowedProps.get(value);
  }
};

// crabwalk/node_modules/.pnpm/superjson@2.2.6/node_modules/superjson/dist/util.js
function valuesOfObj(record) {
  if ("values" in Object) {
    return Object.values(record);
  }
  const values = [];
  for (const key in record) {
    if (record.hasOwnProperty(key)) {
      values.push(record[key]);
    }
  }
  return values;
}
function find(record, predicate) {
  const values = valuesOfObj(record);
  if ("find" in values) {
    return values.find(predicate);
  }
  const valuesNotNever = values;
  for (let i = 0; i < valuesNotNever.length; i++) {
    const value = valuesNotNever[i];
    if (predicate(value)) {
      return value;
    }
  }
  return void 0;
}
function forEach(record, run2) {
  Object.entries(record).forEach(([key, value]) => run2(value, key));
}
function includes(arr, value) {
  return arr.indexOf(value) !== -1;
}
function findArr(record, predicate) {
  for (let i = 0; i < record.length; i++) {
    const value = record[i];
    if (predicate(value)) {
      return value;
    }
  }
  return void 0;
}

// crabwalk/node_modules/.pnpm/superjson@2.2.6/node_modules/superjson/dist/custom-transformer-registry.js
var CustomTransformerRegistry = class {
  constructor() {
    this.transfomers = {};
  }
  register(transformer) {
    this.transfomers[transformer.name] = transformer;
  }
  findApplicable(v) {
    return find(this.transfomers, (transformer) => transformer.isApplicable(v));
  }
  findByName(name) {
    return this.transfomers[name];
  }
};

// crabwalk/node_modules/.pnpm/superjson@2.2.6/node_modules/superjson/dist/is.js
var getType = (payload) => Object.prototype.toString.call(payload).slice(8, -1);
var isUndefined = (payload) => typeof payload === "undefined";
var isNull = (payload) => payload === null;
var isPlainObject2 = (payload) => {
  if (typeof payload !== "object" || payload === null)
    return false;
  if (payload === Object.prototype)
    return false;
  if (Object.getPrototypeOf(payload) === null)
    return true;
  return Object.getPrototypeOf(payload) === Object.prototype;
};
var isEmptyObject = (payload) => isPlainObject2(payload) && Object.keys(payload).length === 0;
var isArray = (payload) => Array.isArray(payload);
var isString = (payload) => typeof payload === "string";
var isNumber = (payload) => typeof payload === "number" && !isNaN(payload);
var isBoolean = (payload) => typeof payload === "boolean";
var isRegExp = (payload) => payload instanceof RegExp;
var isMap = (payload) => payload instanceof Map;
var isSet = (payload) => payload instanceof Set;
var isSymbol = (payload) => getType(payload) === "Symbol";
var isDate = (payload) => payload instanceof Date && !isNaN(payload.valueOf());
var isError = (payload) => payload instanceof Error;
var isNaNValue = (payload) => typeof payload === "number" && isNaN(payload);
var isPrimitive = (payload) => isBoolean(payload) || isNull(payload) || isUndefined(payload) || isNumber(payload) || isString(payload) || isSymbol(payload);
var isBigint = (payload) => typeof payload === "bigint";
var isInfinite = (payload) => payload === Infinity || payload === -Infinity;
var isTypedArray = (payload) => ArrayBuffer.isView(payload) && !(payload instanceof DataView);
var isURL = (payload) => payload instanceof URL;

// crabwalk/node_modules/.pnpm/superjson@2.2.6/node_modules/superjson/dist/pathstringifier.js
var escapeKey = (key) => key.replace(/\\/g, "\\\\").replace(/\./g, "\\.");
var stringifyPath = (path3) => path3.map(String).map(escapeKey).join(".");
var parsePath = (string, legacyPaths) => {
  const result = [];
  let segment = "";
  for (let i = 0; i < string.length; i++) {
    let char = string.charAt(i);
    if (!legacyPaths && char === "\\") {
      const escaped = string.charAt(i + 1);
      if (escaped === "\\") {
        segment += "\\";
        i++;
        continue;
      } else if (escaped !== ".") {
        throw Error("invalid path");
      }
    }
    const isEscapedDot = char === "\\" && string.charAt(i + 1) === ".";
    if (isEscapedDot) {
      segment += ".";
      i++;
      continue;
    }
    const isEndOfSegment = char === ".";
    if (isEndOfSegment) {
      result.push(segment);
      segment = "";
      continue;
    }
    segment += char;
  }
  const lastSegment = segment;
  result.push(lastSegment);
  return result;
};

// crabwalk/node_modules/.pnpm/superjson@2.2.6/node_modules/superjson/dist/transformer.js
function simpleTransformation(isApplicable, annotation, transform, untransform) {
  return {
    isApplicable,
    annotation,
    transform,
    untransform
  };
}
var simpleRules = [
  simpleTransformation(isUndefined, "undefined", () => null, () => void 0),
  simpleTransformation(isBigint, "bigint", (v) => v.toString(), (v) => {
    if (typeof BigInt !== "undefined") {
      return BigInt(v);
    }
    console.error("Please add a BigInt polyfill.");
    return v;
  }),
  simpleTransformation(isDate, "Date", (v) => v.toISOString(), (v) => new Date(v)),
  simpleTransformation(isError, "Error", (v, superJson) => {
    const baseError = {
      name: v.name,
      message: v.message
    };
    if ("cause" in v) {
      baseError.cause = v.cause;
    }
    superJson.allowedErrorProps.forEach((prop) => {
      baseError[prop] = v[prop];
    });
    return baseError;
  }, (v, superJson) => {
    const e = new Error(v.message, { cause: v.cause });
    e.name = v.name;
    e.stack = v.stack;
    superJson.allowedErrorProps.forEach((prop) => {
      e[prop] = v[prop];
    });
    return e;
  }),
  simpleTransformation(isRegExp, "regexp", (v) => "" + v, (regex) => {
    const body = regex.slice(1, regex.lastIndexOf("/"));
    const flags = regex.slice(regex.lastIndexOf("/") + 1);
    return new RegExp(body, flags);
  }),
  simpleTransformation(
    isSet,
    "set",
    // (sets only exist in es6+)
    // eslint-disable-next-line es5/no-es6-methods
    (v) => [...v.values()],
    (v) => new Set(v)
  ),
  simpleTransformation(isMap, "map", (v) => [...v.entries()], (v) => new Map(v)),
  simpleTransformation((v) => isNaNValue(v) || isInfinite(v), "number", (v) => {
    if (isNaNValue(v)) {
      return "NaN";
    }
    if (v > 0) {
      return "Infinity";
    } else {
      return "-Infinity";
    }
  }, Number),
  simpleTransformation((v) => v === 0 && 1 / v === -Infinity, "number", () => {
    return "-0";
  }, Number),
  simpleTransformation(isURL, "URL", (v) => v.toString(), (v) => new URL(v))
];
function compositeTransformation(isApplicable, annotation, transform, untransform) {
  return {
    isApplicable,
    annotation,
    transform,
    untransform
  };
}
var symbolRule = compositeTransformation((s, superJson) => {
  if (isSymbol(s)) {
    const isRegistered = !!superJson.symbolRegistry.getIdentifier(s);
    return isRegistered;
  }
  return false;
}, (s, superJson) => {
  const identifier = superJson.symbolRegistry.getIdentifier(s);
  return ["symbol", identifier];
}, (v) => v.description, (_, a, superJson) => {
  const value = superJson.symbolRegistry.getValue(a[1]);
  if (!value) {
    throw new Error("Trying to deserialize unknown symbol");
  }
  return value;
});
var constructorToName = [
  Int8Array,
  Uint8Array,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  Uint8ClampedArray
].reduce((obj, ctor) => {
  obj[ctor.name] = ctor;
  return obj;
}, {});
var typedArrayRule = compositeTransformation(isTypedArray, (v) => ["typed-array", v.constructor.name], (v) => [...v], (v, a) => {
  const ctor = constructorToName[a[1]];
  if (!ctor) {
    throw new Error("Trying to deserialize unknown typed array");
  }
  return new ctor(v);
});
function isInstanceOfRegisteredClass(potentialClass, superJson) {
  if (potentialClass?.constructor) {
    const isRegistered = !!superJson.classRegistry.getIdentifier(potentialClass.constructor);
    return isRegistered;
  }
  return false;
}
var classRule = compositeTransformation(isInstanceOfRegisteredClass, (clazz, superJson) => {
  const identifier = superJson.classRegistry.getIdentifier(clazz.constructor);
  return ["class", identifier];
}, (clazz, superJson) => {
  const allowedProps = superJson.classRegistry.getAllowedProps(clazz.constructor);
  if (!allowedProps) {
    return { ...clazz };
  }
  const result = {};
  allowedProps.forEach((prop) => {
    result[prop] = clazz[prop];
  });
  return result;
}, (v, a, superJson) => {
  const clazz = superJson.classRegistry.getValue(a[1]);
  if (!clazz) {
    throw new Error(`Trying to deserialize unknown class '${a[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
  }
  return Object.assign(Object.create(clazz.prototype), v);
});
var customRule = compositeTransformation((value, superJson) => {
  return !!superJson.customTransformerRegistry.findApplicable(value);
}, (value, superJson) => {
  const transformer = superJson.customTransformerRegistry.findApplicable(value);
  return ["custom", transformer.name];
}, (value, superJson) => {
  const transformer = superJson.customTransformerRegistry.findApplicable(value);
  return transformer.serialize(value);
}, (v, a, superJson) => {
  const transformer = superJson.customTransformerRegistry.findByName(a[1]);
  if (!transformer) {
    throw new Error("Trying to deserialize unknown custom value");
  }
  return transformer.deserialize(v);
});
var compositeRules = [classRule, symbolRule, customRule, typedArrayRule];
var transformValue = (value, superJson) => {
  const applicableCompositeRule = findArr(compositeRules, (rule) => rule.isApplicable(value, superJson));
  if (applicableCompositeRule) {
    return {
      value: applicableCompositeRule.transform(value, superJson),
      type: applicableCompositeRule.annotation(value, superJson)
    };
  }
  const applicableSimpleRule = findArr(simpleRules, (rule) => rule.isApplicable(value, superJson));
  if (applicableSimpleRule) {
    return {
      value: applicableSimpleRule.transform(value, superJson),
      type: applicableSimpleRule.annotation
    };
  }
  return void 0;
};
var simpleRulesByAnnotation = {};
simpleRules.forEach((rule) => {
  simpleRulesByAnnotation[rule.annotation] = rule;
});
var untransformValue = (json, type, superJson) => {
  if (isArray(type)) {
    switch (type[0]) {
      case "symbol":
        return symbolRule.untransform(json, type, superJson);
      case "class":
        return classRule.untransform(json, type, superJson);
      case "custom":
        return customRule.untransform(json, type, superJson);
      case "typed-array":
        return typedArrayRule.untransform(json, type, superJson);
      default:
        throw new Error("Unknown transformation: " + type);
    }
  } else {
    const transformation = simpleRulesByAnnotation[type];
    if (!transformation) {
      throw new Error("Unknown transformation: " + type);
    }
    return transformation.untransform(json, superJson);
  }
};

// crabwalk/node_modules/.pnpm/superjson@2.2.6/node_modules/superjson/dist/accessDeep.js
var getNthKey = (value, n) => {
  if (n > value.size)
    throw new Error("index out of bounds");
  const keys = value.keys();
  while (n > 0) {
    keys.next();
    n--;
  }
  return keys.next().value;
};
function validatePath(path3) {
  if (includes(path3, "__proto__")) {
    throw new Error("__proto__ is not allowed as a property");
  }
  if (includes(path3, "prototype")) {
    throw new Error("prototype is not allowed as a property");
  }
  if (includes(path3, "constructor")) {
    throw new Error("constructor is not allowed as a property");
  }
}
var getDeep = (object, path3) => {
  validatePath(path3);
  for (let i = 0; i < path3.length; i++) {
    const key = path3[i];
    if (isSet(object)) {
      object = getNthKey(object, +key);
    } else if (isMap(object)) {
      const row = +key;
      const type = +path3[++i] === 0 ? "key" : "value";
      const keyOfRow = getNthKey(object, row);
      switch (type) {
        case "key":
          object = keyOfRow;
          break;
        case "value":
          object = object.get(keyOfRow);
          break;
      }
    } else {
      object = object[key];
    }
  }
  return object;
};
var setDeep = (object, path3, mapper) => {
  validatePath(path3);
  if (path3.length === 0) {
    return mapper(object);
  }
  let parent = object;
  for (let i = 0; i < path3.length - 1; i++) {
    const key = path3[i];
    if (isArray(parent)) {
      const index = +key;
      parent = parent[index];
    } else if (isPlainObject2(parent)) {
      parent = parent[key];
    } else if (isSet(parent)) {
      const row = +key;
      parent = getNthKey(parent, row);
    } else if (isMap(parent)) {
      const isEnd = i === path3.length - 2;
      if (isEnd) {
        break;
      }
      const row = +key;
      const type = +path3[++i] === 0 ? "key" : "value";
      const keyOfRow = getNthKey(parent, row);
      switch (type) {
        case "key":
          parent = keyOfRow;
          break;
        case "value":
          parent = parent.get(keyOfRow);
          break;
      }
    }
  }
  const lastKey = path3[path3.length - 1];
  if (isArray(parent)) {
    parent[+lastKey] = mapper(parent[+lastKey]);
  } else if (isPlainObject2(parent)) {
    parent[lastKey] = mapper(parent[lastKey]);
  }
  if (isSet(parent)) {
    const oldValue = getNthKey(parent, +lastKey);
    const newValue = mapper(oldValue);
    if (oldValue !== newValue) {
      parent.delete(oldValue);
      parent.add(newValue);
    }
  }
  if (isMap(parent)) {
    const row = +path3[path3.length - 2];
    const keyToRow = getNthKey(parent, row);
    const type = +lastKey === 0 ? "key" : "value";
    switch (type) {
      case "key": {
        const newKey = mapper(keyToRow);
        parent.set(newKey, parent.get(keyToRow));
        if (newKey !== keyToRow) {
          parent.delete(keyToRow);
        }
        break;
      }
      case "value": {
        parent.set(keyToRow, mapper(parent.get(keyToRow)));
        break;
      }
    }
  }
  return object;
};

// crabwalk/node_modules/.pnpm/superjson@2.2.6/node_modules/superjson/dist/plainer.js
var enableLegacyPaths = (version) => version < 1;
function traverse(tree, walker2, version, origin = []) {
  if (!tree) {
    return;
  }
  const legacyPaths = enableLegacyPaths(version);
  if (!isArray(tree)) {
    forEach(tree, (subtree, key) => traverse(subtree, walker2, version, [
      ...origin,
      ...parsePath(key, legacyPaths)
    ]));
    return;
  }
  const [nodeValue, children] = tree;
  if (children) {
    forEach(children, (child, key) => {
      traverse(child, walker2, version, [
        ...origin,
        ...parsePath(key, legacyPaths)
      ]);
    });
  }
  walker2(nodeValue, origin);
}
function applyValueAnnotations(plain, annotations, version, superJson) {
  traverse(annotations, (type, path3) => {
    plain = setDeep(plain, path3, (v) => untransformValue(v, type, superJson));
  }, version);
  return plain;
}
function applyReferentialEqualityAnnotations(plain, annotations, version) {
  const legacyPaths = enableLegacyPaths(version);
  function apply(identicalPaths, path3) {
    const object = getDeep(plain, parsePath(path3, legacyPaths));
    identicalPaths.map((path4) => parsePath(path4, legacyPaths)).forEach((identicalObjectPath) => {
      plain = setDeep(plain, identicalObjectPath, () => object);
    });
  }
  if (isArray(annotations)) {
    const [root, other] = annotations;
    root.forEach((identicalPath) => {
      plain = setDeep(plain, parsePath(identicalPath, legacyPaths), () => plain);
    });
    if (other) {
      forEach(other, apply);
    }
  } else {
    forEach(annotations, apply);
  }
  return plain;
}
var isDeep = (object, superJson) => isPlainObject2(object) || isArray(object) || isMap(object) || isSet(object) || isError(object) || isInstanceOfRegisteredClass(object, superJson);
function addIdentity(object, path3, identities) {
  const existingSet = identities.get(object);
  if (existingSet) {
    existingSet.push(path3);
  } else {
    identities.set(object, [path3]);
  }
}
function generateReferentialEqualityAnnotations(identitites, dedupe) {
  const result = {};
  let rootEqualityPaths = void 0;
  identitites.forEach((paths) => {
    if (paths.length <= 1) {
      return;
    }
    if (!dedupe) {
      paths = paths.map((path3) => path3.map(String)).sort((a, b) => a.length - b.length);
    }
    const [representativePath, ...identicalPaths] = paths;
    if (representativePath.length === 0) {
      rootEqualityPaths = identicalPaths.map(stringifyPath);
    } else {
      result[stringifyPath(representativePath)] = identicalPaths.map(stringifyPath);
    }
  });
  if (rootEqualityPaths) {
    if (isEmptyObject(result)) {
      return [rootEqualityPaths];
    } else {
      return [rootEqualityPaths, result];
    }
  } else {
    return isEmptyObject(result) ? void 0 : result;
  }
}
var walker = (object, identities, superJson, dedupe, path3 = [], objectsInThisPath = [], seenObjects = /* @__PURE__ */ new Map()) => {
  const primitive = isPrimitive(object);
  if (!primitive) {
    addIdentity(object, path3, identities);
    const seen = seenObjects.get(object);
    if (seen) {
      return dedupe ? {
        transformedValue: null
      } : seen;
    }
  }
  if (!isDeep(object, superJson)) {
    const transformed2 = transformValue(object, superJson);
    const result2 = transformed2 ? {
      transformedValue: transformed2.value,
      annotations: [transformed2.type]
    } : {
      transformedValue: object
    };
    if (!primitive) {
      seenObjects.set(object, result2);
    }
    return result2;
  }
  if (includes(objectsInThisPath, object)) {
    return {
      transformedValue: null
    };
  }
  const transformationResult = transformValue(object, superJson);
  const transformed = transformationResult?.value ?? object;
  const transformedValue = isArray(transformed) ? [] : {};
  const innerAnnotations = {};
  forEach(transformed, (value, index) => {
    if (index === "__proto__" || index === "constructor" || index === "prototype") {
      throw new Error(`Detected property ${index}. This is a prototype pollution risk, please remove it from your object.`);
    }
    const recursiveResult = walker(value, identities, superJson, dedupe, [...path3, index], [...objectsInThisPath, object], seenObjects);
    transformedValue[index] = recursiveResult.transformedValue;
    if (isArray(recursiveResult.annotations)) {
      innerAnnotations[escapeKey(index)] = recursiveResult.annotations;
    } else if (isPlainObject2(recursiveResult.annotations)) {
      forEach(recursiveResult.annotations, (tree, key) => {
        innerAnnotations[escapeKey(index) + "." + key] = tree;
      });
    }
  });
  const result = isEmptyObject(innerAnnotations) ? {
    transformedValue,
    annotations: !!transformationResult ? [transformationResult.type] : void 0
  } : {
    transformedValue,
    annotations: !!transformationResult ? [transformationResult.type, innerAnnotations] : innerAnnotations
  };
  if (!primitive) {
    seenObjects.set(object, result);
  }
  return result;
};

// crabwalk/node_modules/.pnpm/is-what@5.5.0/node_modules/is-what/dist/getType.js
function getType2(payload) {
  return Object.prototype.toString.call(payload).slice(8, -1);
}

// crabwalk/node_modules/.pnpm/is-what@5.5.0/node_modules/is-what/dist/isArray.js
function isArray2(payload) {
  return getType2(payload) === "Array";
}

// crabwalk/node_modules/.pnpm/is-what@5.5.0/node_modules/is-what/dist/isPlainObject.js
function isPlainObject3(payload) {
  if (getType2(payload) !== "Object")
    return false;
  const prototype = Object.getPrototypeOf(payload);
  return !!prototype && prototype.constructor === Object && prototype === Object.prototype;
}

// crabwalk/node_modules/.pnpm/copy-anything@4.0.5/node_modules/copy-anything/dist/index.js
function assignProp(carry, key, newVal, originalObject, includeNonenumerable) {
  const propType = {}.propertyIsEnumerable.call(originalObject, key) ? "enumerable" : "nonenumerable";
  if (propType === "enumerable")
    carry[key] = newVal;
  if (includeNonenumerable && propType === "nonenumerable") {
    Object.defineProperty(carry, key, {
      value: newVal,
      enumerable: false,
      writable: true,
      configurable: true
    });
  }
}
function copy(target, options = {}) {
  if (isArray2(target)) {
    return target.map((item) => copy(item, options));
  }
  if (!isPlainObject3(target)) {
    return target;
  }
  const props = Object.getOwnPropertyNames(target);
  const symbols = Object.getOwnPropertySymbols(target);
  return [...props, ...symbols].reduce((carry, key) => {
    if (key === "__proto__")
      return carry;
    if (isArray2(options.props) && !options.props.includes(key)) {
      return carry;
    }
    const val = target[key];
    const newVal = copy(val, options);
    assignProp(carry, key, newVal, target, options.nonenumerable);
    return carry;
  }, {});
}

// crabwalk/node_modules/.pnpm/superjson@2.2.6/node_modules/superjson/dist/index.js
var SuperJSON = class {
  /**
   * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
   */
  constructor({ dedupe = false } = {}) {
    this.classRegistry = new ClassRegistry();
    this.symbolRegistry = new Registry((s) => s.description ?? "");
    this.customTransformerRegistry = new CustomTransformerRegistry();
    this.allowedErrorProps = [];
    this.dedupe = dedupe;
  }
  serialize(object) {
    const identities = /* @__PURE__ */ new Map();
    const output = walker(object, identities, this, this.dedupe);
    const res = {
      json: output.transformedValue
    };
    if (output.annotations) {
      res.meta = {
        ...res.meta,
        values: output.annotations
      };
    }
    const equalityAnnotations = generateReferentialEqualityAnnotations(identities, this.dedupe);
    if (equalityAnnotations) {
      res.meta = {
        ...res.meta,
        referentialEqualities: equalityAnnotations
      };
    }
    if (res.meta)
      res.meta.v = 1;
    return res;
  }
  deserialize(payload, options) {
    const { json, meta } = payload;
    let result = options?.inPlace ? json : copy(json);
    if (meta?.values) {
      result = applyValueAnnotations(result, meta.values, meta.v ?? 0, this);
    }
    if (meta?.referentialEqualities) {
      result = applyReferentialEqualityAnnotations(result, meta.referentialEqualities, meta.v ?? 0);
    }
    return result;
  }
  stringify(object) {
    return JSON.stringify(this.serialize(object));
  }
  parse(string) {
    return this.deserialize(JSON.parse(string), { inPlace: true });
  }
  registerClass(v, options) {
    this.classRegistry.register(v, options);
  }
  registerSymbol(v, identifier) {
    this.symbolRegistry.register(v, identifier);
  }
  registerCustom(transformer, name) {
    this.customTransformerRegistry.register({
      name,
      ...transformer
    });
  }
  allowErrorProps(...props) {
    this.allowedErrorProps.push(...props);
  }
};
SuperJSON.defaultInstance = new SuperJSON();
SuperJSON.serialize = SuperJSON.defaultInstance.serialize.bind(SuperJSON.defaultInstance);
SuperJSON.deserialize = SuperJSON.defaultInstance.deserialize.bind(SuperJSON.defaultInstance);
SuperJSON.stringify = SuperJSON.defaultInstance.stringify.bind(SuperJSON.defaultInstance);
SuperJSON.parse = SuperJSON.defaultInstance.parse.bind(SuperJSON.defaultInstance);
SuperJSON.registerClass = SuperJSON.defaultInstance.registerClass.bind(SuperJSON.defaultInstance);
SuperJSON.registerSymbol = SuperJSON.defaultInstance.registerSymbol.bind(SuperJSON.defaultInstance);
SuperJSON.registerCustom = SuperJSON.defaultInstance.registerCustom.bind(SuperJSON.defaultInstance);
SuperJSON.allowErrorProps = SuperJSON.defaultInstance.allowErrorProps.bind(SuperJSON.defaultInstance);
var dist_default = SuperJSON;
var serialize = SuperJSON.serialize;
var deserialize = SuperJSON.deserialize;
var stringify = SuperJSON.stringify;
var parse = SuperJSON.parse;
var registerClass = SuperJSON.registerClass;
var registerCustom = SuperJSON.registerCustom;
var registerSymbol = SuperJSON.registerSymbol;
var allowErrorProps = SuperJSON.allowErrorProps;

// crabwalk/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// crabwalk/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t2 = typeof data;
  switch (t2) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// crabwalk/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// crabwalk/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// crabwalk/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// crabwalk/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path: path3, errorMaps, issueData } = params;
  const fullPath = [...path3, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

// crabwalk/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// crabwalk/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path3, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path3;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check2, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check2(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check2, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check2(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check2 of this._def.checks) {
      if (check2.kind === "min") {
        if (input.data.length < check2.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check2.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "max") {
        if (input.data.length > check2.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check2.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "length") {
        const tooBig = input.data.length > check2.value;
        const tooSmall = input.data.length < check2.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check2.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check2.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check2.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check2.message
            });
          }
          status.dirty();
        }
      } else if (check2.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "regex") {
        check2.regex.lastIndex = 0;
        const testResult = check2.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "trim") {
        input.data = input.data.trim();
      } else if (check2.kind === "includes") {
        if (!input.data.includes(check2.value, check2.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check2.value, position: check2.position },
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check2.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check2.kind === "startsWith") {
        if (!input.data.startsWith(check2.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check2.value },
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "endsWith") {
        if (!input.data.endsWith(check2.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check2.value },
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "datetime") {
        const regex = datetimeRegex(check2);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "time") {
        const regex = timeRegex(check2);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "ip") {
        if (!isValidIP(input.data, check2.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "jwt") {
        if (!isValidJWT(input.data, check2.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "cidr") {
        if (!isValidCidr(input.data, check2.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check2);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check2) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check2]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check2 of this._def.checks) {
      if (check2.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "min") {
        const tooSmall = check2.inclusive ? input.data < check2.value : input.data <= check2.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check2.value,
            type: "number",
            inclusive: check2.inclusive,
            exact: false,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "max") {
        const tooBig = check2.inclusive ? input.data > check2.value : input.data >= check2.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check2.value,
            type: "number",
            inclusive: check2.inclusive,
            exact: false,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check2.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check2.value,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check2.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check2);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check2) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check2]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check2 of this._def.checks) {
      if (check2.kind === "min") {
        const tooSmall = check2.inclusive ? input.data < check2.value : input.data <= check2.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check2.value,
            inclusive: check2.inclusive,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "max") {
        const tooBig = check2.inclusive ? input.data > check2.value : input.data >= check2.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check2.value,
            inclusive: check2.inclusive,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "multipleOf") {
        if (input.data % check2.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check2.value,
            message: check2.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check2);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check2) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check2]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check2 of this._def.checks) {
      if (check2.kind === "min") {
        if (input.data.getTime() < check2.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check2.message,
            inclusive: true,
            exact: false,
            minimum: check2.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check2.kind === "max") {
        if (input.data.getTime() > check2.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check2.message,
            inclusive: true,
            exact: false,
            maximum: check2.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check2);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check2) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check2]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = /* @__PURE__ */ Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check2, _params = {}, fatal) {
  if (check2)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check2(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
var NEVER = INVALID;

// crabwalk/src/integrations/openclaw/client.ts
var import_ws = __toESM(require("ws"), 1);

// crabwalk/src/integrations/openclaw/protocol.ts
function parseSessionKey(key) {
  const parts = key.split(":");
  const agentId = parts[1] || "unknown";
  const platform = parts[2] || "unknown";
  const hasType = ["channel", "group", "dm", "thread"].includes(parts[3] || "");
  const isGroup = parts[3] === "group" || parts[3] === "channel";
  const recipient = hasType ? parts.slice(3).join(":") : parts.slice(3).join(":");
  return { agentId, platform, recipient, isGroup };
}
function createConnectParams(token, device, password) {
  const platformMap = {
    win32: "windows",
    darwin: "macos",
    linux: "linux"
  };
  const platform = platformMap[process.platform] ?? process.platform;
  return {
    minProtocol: 3,
    maxProtocol: 3,
    client: {
      id: "cli",
      version: "0.1.0",
      platform,
      mode: "cli"
    },
    role: "operator",
    scopes: ["operator.read"],
    caps: [],
    commands: [],
    permissions: {},
    locale: "en-US",
    userAgent: "crabwalk-monitor/0.1.0",
    auth: password ? { password } : token ? { token } : void 0,
    device
  };
}

// crabwalk/src/integrations/openclaw/device.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_crypto = require("crypto");
var DATA_DIR = import_path.default.join(process.cwd(), "data");
var DEVICE_IDENTITY_FILE = import_path.default.join(DATA_DIR, "device-identity.json");
function base64UrlToBuffer(value) {
  const padded = value.padEnd(value.length + (4 - value.length % 4) % 4, "=");
  const base64 = padded.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(base64, "base64");
}
function base64UrlEncode(value) {
  return value.toString("base64").replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "");
}
function decodePublicKey(value) {
  try {
    const raw = base64UrlToBuffer(value);
    if (raw.length > 0) return raw;
  } catch {
  }
  return Buffer.from(value, "base64");
}
function fingerprintFromPublicKey(publicKey) {
  const rawPublicKey = decodePublicKey(publicKey);
  return (0, import_crypto.createHash)("sha256").update(rawPublicKey).digest("hex");
}
function ensureDataDir() {
  if (!import_fs.default.existsSync(DATA_DIR)) {
    import_fs.default.mkdirSync(DATA_DIR, { recursive: true });
  }
}
function loadStoredIdentity() {
  try {
    if (!import_fs.default.existsSync(DEVICE_IDENTITY_FILE)) {
      return null;
    }
    const data = JSON.parse(import_fs.default.readFileSync(DEVICE_IDENTITY_FILE, "utf-8"));
    if (!data.publicKey || !data.privateKeyPem) {
      return null;
    }
    const canonicalId = fingerprintFromPublicKey(data.publicKey);
    const normalized = {
      ...data,
      id: canonicalId
    };
    if (data.id !== canonicalId) {
      saveStoredIdentity(normalized);
    }
    return normalized;
  } catch {
    return null;
  }
}
function saveStoredIdentity(identity2) {
  ensureDataDir();
  import_fs.default.writeFileSync(DEVICE_IDENTITY_FILE, JSON.stringify(identity2, null, 2));
}
function generateStoredIdentity() {
  const { publicKey, privateKey } = (0, import_crypto.generateKeyPairSync)("ed25519");
  const publicJwk = publicKey.export({ format: "jwk" });
  if (!publicJwk.x) {
    throw new Error("Failed to export Ed25519 public key");
  }
  const rawPublicKey = base64UrlToBuffer(publicJwk.x);
  const fingerprint = (0, import_crypto.createHash)("sha256").update(rawPublicKey).digest("hex");
  const now = Date.now();
  return {
    id: fingerprint,
    publicKey: base64UrlEncode(rawPublicKey),
    privateKeyPem: privateKey.export({ format: "pem", type: "pkcs8" }).toString(),
    createdAt: now,
    lastUsedAt: now
  };
}
function buildDeviceAuthPayload(params) {
  const version = params.version ?? (params.nonce ? "v2" : "v1");
  const scopes = params.scopes.join(",");
  const token = params.token ?? "";
  const parts = [
    version,
    params.deviceId,
    params.clientId,
    params.clientMode,
    params.role,
    scopes,
    String(params.signedAtMs),
    token
  ];
  if (version === "v2") {
    parts.push(params.nonce ?? "");
  }
  return parts.join("|");
}
function getOrCreateIdentity() {
  const existing = loadStoredIdentity();
  if (existing) {
    return existing;
  }
  const generated = generateStoredIdentity();
  saveStoredIdentity(generated);
  return generated;
}
function buildSignedDevice(params) {
  const identity2 = getOrCreateIdentity();
  const privateKey = (0, import_crypto.createPrivateKey)(identity2.privateKeyPem);
  const signedAt = Date.now();
  const payload = buildDeviceAuthPayload({
    deviceId: identity2.id,
    clientId: params.clientId,
    clientMode: params.clientMode,
    role: params.role,
    scopes: params.scopes,
    signedAtMs: signedAt,
    token: params.token,
    nonce: params.challenge.nonce || void 0
  });
  const signature = base64UrlEncode((0, import_crypto.sign)(null, Buffer.from(payload, "utf8"), privateKey));
  identity2.lastUsedAt = signedAt;
  saveStoredIdentity(identity2);
  return {
    id: identity2.id,
    publicKey: identity2.publicKey,
    signature,
    signedAt,
    nonce: params.challenge.nonce
  };
}

// crabwalk/src/integrations/openclaw/client.ts
var DEFAULT_GATEWAY_URL = process.env.CLAWDBOT_URL || "ws://127.0.0.1:18789";
var ClawdbotClient = class {
  constructor(url = DEFAULT_GATEWAY_URL, token, password) {
    this.url = url;
    this.token = token;
    this.password = password;
  }
  ws = null;
  requestId = 0;
  pendingRequests = /* @__PURE__ */ new Map();
  eventListeners = [];
  reconnectTimer = null;
  _connected = false;
  _connecting = false;
  _authState = "unknown";
  _scopes = [];
  _pairingInfo = null;
  _connectPromiseSettled = false;
  debugEnabled = process.env.CRABWALK_DEBUG_OPENCLAW === "1";
  get connected() {
    return this._connected;
  }
  get authState() {
    return this._authState;
  }
  get scopes() {
    return [...this._scopes];
  }
  get pairingInfo() {
    return this._pairingInfo;
  }
  async connect() {
    if (this._connecting || this._connected) {
      return { type: "hello-ok", protocol: 3 };
    }
    this._connecting = true;
    this._connectPromiseSettled = false;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this._connecting = false;
        this.ws?.close();
        if (!this._connectPromiseSettled) {
          this._connectPromiseSettled = true;
          reject(new Error("Connection timeout - is openclaw gateway running?"));
        }
      }, 1e4);
      try {
        this.ws = new import_ws.default(this.url);
      } catch (e) {
        clearTimeout(timeout);
        reject(new Error(`Failed to create WebSocket: ${e}`));
        return;
      }
      this.ws.once("open", () => {
        this.debugLog("socket open, waiting for connect.challenge");
      });
      this.ws.on("message", (data) => {
        try {
          const raw = data.toString();
          const msg = JSON.parse(raw);
          if (msg.type === "event" && msg.event === "connect.challenge") {
            this.handleChallenge(msg.payload);
            return;
          }
          this.handleMessage(msg, resolve, reject, timeout);
        } catch (e) {
          console.error("[openclaw] Failed to parse message:", e);
        }
      });
      this.ws.on("error", (err) => {
        clearTimeout(timeout);
        this._connecting = false;
        this.debugLog("socket error before connect", err);
        if (!this._connectPromiseSettled) {
          this._connectPromiseSettled = true;
          reject(err);
        }
      });
      this.ws.on("close", (code, reason) => {
        clearTimeout(timeout);
        const wasConnected = this._connected;
        const wasConnecting = this._connecting;
        this.debugLog("socket close", {
          code,
          reason: reason?.toString?.() ?? "",
          wasConnected,
          wasConnecting
        });
        this._connected = false;
        this._connecting = false;
        if (!wasConnected && wasConnecting && !this._connectPromiseSettled) {
          this._connectPromiseSettled = true;
          reject(
            new Error(
              `Gateway closed before connect (code ${code}${reason ? `, reason: ${reason.toString()}` : ""})`
            )
          );
        }
        if (wasConnected && code !== 1e3) {
          this.scheduleReconnect();
        }
      });
    });
  }
  handleChallenge(challenge) {
    if (this.ws?.readyState !== import_ws.default.OPEN) {
      return;
    }
    let params = createConnectParams(this.token, void 0, this.password);
    try {
      const device = buildSignedDevice({
        challenge,
        token: this.token ?? null,
        role: params.role,
        scopes: params.scopes,
        clientId: params.client.id,
        clientMode: params.client.mode
      });
      params = createConnectParams(this.token, device, this.password);
    } catch (error) {
      console.error("[openclaw] Failed to create signed device identity:", error);
    }
    this.debugLog("sending connect", {
      hasToken: Boolean(params.auth?.token),
      hasDevice: Boolean(params.device),
      deviceId: params.device?.id,
      clientMode: params.client.mode,
      clientPlatform: params.client.platform,
      scopes: params.scopes
    });
    const response = {
      type: "req",
      id: `connect-${Date.now()}`,
      method: "connect",
      params
    };
    this.ws.send(JSON.stringify(response));
  }
  handleMessage(msg, connectResolve, _connectReject, connectTimeout) {
    if ("type" in msg) {
      switch (msg.type) {
        case "hello-ok":
          if (connectTimeout) clearTimeout(connectTimeout);
          this.updateAuthStateFromHello(msg);
          this._connected = true;
          this._connecting = false;
          this._connectPromiseSettled = true;
          connectResolve?.(msg);
          break;
        case "res":
          if (msg.ok && msg.payload?.type === "hello-ok") {
            if (connectTimeout) clearTimeout(connectTimeout);
            this.updateAuthStateFromHello(msg.payload);
            this._connected = true;
            this._connecting = false;
            this._connectPromiseSettled = true;
            connectResolve?.(msg.payload);
          } else {
            this.handleResponse(msg);
          }
          break;
        case "event":
          this.handleEvent(msg);
          break;
        case "req":
          break;
      }
    }
  }
  handleResponse(res) {
    const pending = this.pendingRequests.get(res.id);
    if (pending) {
      this.pendingRequests.delete(res.id);
      if (res.ok) {
        pending.resolve(res.payload);
      } else {
        const message = res.error?.message || "Request failed";
        this.updateAuthStateFromError(message);
        pending.reject(new Error(message));
      }
    }
  }
  handleEvent(event) {
    if (event.event.includes("pair") || event.event.includes("device")) {
      const payload = event.payload;
      if (payload?.requestId || payload?.message) {
        this._authState = "unpaired";
        this._pairingInfo = {
          requestId: payload.requestId,
          message: payload.message
        };
      }
    }
    for (const listener of this.eventListeners) {
      try {
        listener(event);
      } catch (e) {
        console.error("Event listener error:", e);
      }
    }
  }
  scheduleReconnect() {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect().catch(console.error);
    }, 5e3);
  }
  async request(method, params) {
    if (!this.ws || this.ws.readyState !== import_ws.default.OPEN) {
      throw new Error("Not connected");
    }
    const id = `req-${++this.requestId}`;
    const req = { type: "req", id, method, params };
    return new Promise((resolve, reject) => {
      this.pendingRequests.set(id, {
        resolve,
        reject
      });
      this.ws.send(JSON.stringify(req));
      setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          reject(new Error("Request timeout"));
        }
      }, 3e4);
    });
  }
  onEvent(callback) {
    this.eventListeners.push(callback);
    return () => {
      const idx = this.eventListeners.indexOf(callback);
      if (idx >= 0) this.eventListeners.splice(idx, 1);
    };
  }
  async listSessions(params) {
    const result = await this.request(
      "sessions.list",
      params
    );
    return result.sessions ?? [];
  }
  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this._connected = false;
    this._authState = "unknown";
    this._scopes = [];
    this._pairingInfo = null;
  }
  updateAuthStateFromHello(hello) {
    const scopes = hello.auth?.scopes;
    this._scopes = scopes ? [...scopes] : [];
    if (!scopes) {
      this._authState = "authorized";
      return;
    }
    if (scopes.includes("operator.read")) {
      this._authState = "authorized";
      this._pairingInfo = null;
      this.debugLog("authorized scopes", scopes);
      return;
    }
    this._authState = scopes.length === 0 ? "unpaired" : "degraded";
    this.debugLog("non-authorized scopes", scopes);
  }
  updateAuthStateFromError(message) {
    const lowered = message.toLowerCase();
    if (lowered.includes("missing scope") || lowered.includes("operator.read")) {
      this._authState = "unpaired";
      const requestId = this.extractRequestId(message);
      this._pairingInfo = {
        requestId: requestId ?? this._pairingInfo?.requestId,
        message
      };
      return;
    }
    if (lowered.includes("unauthorized") || lowered.includes("forbidden")) {
      this._authState = "unauthorized";
      this._pairingInfo = { message };
    }
  }
  debugLog(message, payload) {
    if (!this.debugEnabled) return;
    if (payload !== void 0) {
      console.log(`[openclaw][debug] ${message}`, payload);
      return;
    }
    console.log(`[openclaw][debug] ${message}`);
  }
  extractRequestId(message) {
    const explicitMatch = message.match(/request(?:\s+id)?[:=\s]+([a-zA-Z0-9_-]+)/i);
    if (explicitMatch?.[1]) {
      return explicitMatch[1];
    }
    const uuidMatch = message.match(
      /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/i
    );
    return uuidMatch?.[0];
  }
};

// crabwalk/src/integrations/openclaw/persistence.ts
var import_fs2 = __toESM(require("fs"), 1);
var import_path2 = __toESM(require("path"), 1);
var DATA_DIR2 = import_path2.default.join(process.cwd(), "data");
var SESSIONS_FILE = import_path2.default.join(DATA_DIR2, "sessions.json");
var ACTIONS_FILE = import_path2.default.join(DATA_DIR2, "actions.jsonl");
var EXEC_EVENTS_FILE = import_path2.default.join(DATA_DIR2, "exec-events.jsonl");
var STATE_FILE = import_path2.default.join(DATA_DIR2, "state.json");
var MAX_ACTIONS = 1e4;
var MAX_EXEC_EVENTS = 2e4;
var PersistenceService = class {
  sessions = /* @__PURE__ */ new Map();
  actions = [];
  execEvents = [];
  enabled = false;
  startedAt = null;
  constructor() {
    this.ensureDataDir();
    this.loadState();
    this.loadData();
    if (!this.enabled && !import_fs2.default.existsSync(STATE_FILE)) {
      this.start();
    }
  }
  ensureDataDir() {
    if (!import_fs2.default.existsSync(DATA_DIR2)) {
      import_fs2.default.mkdirSync(DATA_DIR2, { recursive: true });
    }
  }
  loadState() {
    try {
      if (import_fs2.default.existsSync(STATE_FILE)) {
        const data = JSON.parse(import_fs2.default.readFileSync(STATE_FILE, "utf-8"));
        this.enabled = data.enabled;
        this.startedAt = data.startedAt;
      }
    } catch {
    }
  }
  saveState() {
    const state = {
      enabled: this.enabled,
      startedAt: this.startedAt
    };
    import_fs2.default.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  }
  loadData() {
    try {
      if (import_fs2.default.existsSync(SESSIONS_FILE)) {
        const data = JSON.parse(import_fs2.default.readFileSync(SESSIONS_FILE, "utf-8"));
        for (const session of data) {
          this.sessions.set(session.key, session);
        }
      }
    } catch {
    }
    try {
      if (import_fs2.default.existsSync(ACTIONS_FILE)) {
        const content = import_fs2.default.readFileSync(ACTIONS_FILE, "utf-8");
        const lines = content.trim().split("\n").filter(Boolean);
        for (const line of lines) {
          try {
            const action = JSON.parse(line);
            this.actions.push(action);
          } catch {
          }
        }
        if (this.actions.length > MAX_ACTIONS) {
          this.actions = this.actions.slice(-MAX_ACTIONS);
          this.saveActions();
        }
      }
    } catch {
    }
    try {
      if (import_fs2.default.existsSync(EXEC_EVENTS_FILE)) {
        const content = import_fs2.default.readFileSync(EXEC_EVENTS_FILE, "utf-8");
        const lines = content.trim().split("\n").filter(Boolean);
        for (const line of lines) {
          try {
            const event = JSON.parse(line);
            this.execEvents.push(event);
          } catch {
          }
        }
        if (this.execEvents.length > MAX_EXEC_EVENTS) {
          this.execEvents = this.execEvents.slice(-MAX_EXEC_EVENTS);
          this.saveExecEvents();
        }
      }
    } catch {
    }
  }
  saveSessions() {
    const data = Array.from(this.sessions.values());
    import_fs2.default.writeFileSync(SESSIONS_FILE, JSON.stringify(data, null, 2));
  }
  saveActions() {
    const content = this.actions.map((a) => JSON.stringify(a)).join("\n");
    import_fs2.default.writeFileSync(ACTIONS_FILE, content);
  }
  saveExecEvents() {
    const content = this.execEvents.map((e) => JSON.stringify(e)).join("\n");
    import_fs2.default.writeFileSync(EXEC_EVENTS_FILE, content);
  }
  appendAction(action) {
    import_fs2.default.appendFileSync(ACTIONS_FILE, JSON.stringify(action) + "\n");
  }
  appendExecEvent(event) {
    import_fs2.default.appendFileSync(EXEC_EVENTS_FILE, JSON.stringify(event) + "\n");
  }
  get isEnabled() {
    return this.enabled;
  }
  start() {
    this.enabled = true;
    this.startedAt = Date.now();
    this.saveState();
    console.log("[persistence] started");
    return { enabled: true, startedAt: this.startedAt };
  }
  stop() {
    this.enabled = false;
    this.startedAt = null;
    this.saveState();
    console.log("[persistence] stopped");
    return { enabled: false };
  }
  getStatus() {
    return {
      enabled: this.enabled,
      startedAt: this.startedAt,
      sessionCount: this.sessions.size,
      actionCount: this.actions.length,
      execEventCount: this.execEvents.length
    };
  }
  upsertSession(session) {
    if (!this.enabled) return;
    this.sessions.set(session.key, session);
    this.saveSessions();
  }
  addAction(action) {
    if (!this.enabled) return;
    const existingIdx = this.actions.findIndex((a) => a.id === action.id);
    if (existingIdx >= 0) {
      this.actions[existingIdx] = action;
      this.saveActions();
    } else {
      this.actions.push(action);
      this.appendAction(action);
      if (this.actions.length > MAX_ACTIONS) {
        this.actions = this.actions.slice(-MAX_ACTIONS);
        this.saveActions();
      }
    }
  }
  addExecEvent(event) {
    if (!this.enabled) return;
    const existingIdx = this.execEvents.findIndex((e) => e.id === event.id);
    if (existingIdx >= 0) {
      this.execEvents[existingIdx] = event;
      this.saveExecEvents();
    } else {
      this.execEvents.push(event);
      this.appendExecEvent(event);
      if (this.execEvents.length > MAX_EXEC_EVENTS) {
        this.execEvents = this.execEvents.slice(-MAX_EXEC_EVENTS);
        this.saveExecEvents();
      }
    }
  }
  hydrate() {
    return {
      sessions: Array.from(this.sessions.values()),
      actions: [...this.actions],
      execEvents: [...this.execEvents]
    };
  }
  clear() {
    this.sessions.clear();
    this.actions = [];
    this.execEvents = [];
    try {
      if (import_fs2.default.existsSync(SESSIONS_FILE)) import_fs2.default.unlinkSync(SESSIONS_FILE);
      if (import_fs2.default.existsSync(ACTIONS_FILE)) import_fs2.default.unlinkSync(ACTIONS_FILE);
      if (import_fs2.default.existsSync(EXEC_EVENTS_FILE)) import_fs2.default.unlinkSync(EXEC_EVENTS_FILE);
    } catch {
    }
    console.log("[persistence] cleared all data");
    return { cleared: true };
  }
};
var instance = null;
function getPersistenceService() {
  if (!instance) {
    instance = new PersistenceService();
  }
  return instance;
}

// crabwalk/src/integrations/openclaw/parser.ts
function sessionInfoToMonitor(info) {
  const parsed = parseSessionKey(info.key);
  return {
    key: info.key,
    agentId: parsed.agentId,
    platform: parsed.platform,
    recipient: parsed.recipient,
    isGroup: parsed.isGroup,
    lastActivityAt: info.lastActivityAt,
    status: "idle",
    spawnedBy: info.spawnedBy
  };
}
function chatEventToAction(event) {
  let type = "streaming";
  if (event.state === "final") type = "complete";
  else if (event.state === "delta") type = "streaming";
  else if (event.state === "aborted") type = "aborted";
  else if (event.state === "error") type = "error";
  const action = {
    id: `${event.runId}-${event.seq}`,
    runId: event.runId,
    sessionKey: event.sessionKey,
    seq: event.seq,
    type,
    eventType: "chat",
    timestamp: Date.now()
  };
  if (event.state === "final") {
    if (event.usage) {
      action.inputTokens = event.usage.inputTokens;
      action.outputTokens = event.usage.outputTokens;
    }
    if (event.stopReason) {
      action.stopReason = event.stopReason;
    }
  }
  if (event.message) {
    if (typeof event.message === "string") {
      action.content = event.message;
    } else if (typeof event.message === "object") {
      const msg = event.message;
      if (Array.isArray(msg.content)) {
        const texts = [];
        for (const block of msg.content) {
          if (typeof block === "object" && block) {
            const b = block;
            if (b.type === "text" && typeof b.text === "string") {
              texts.push(b.text);
            } else if (b.type === "tool_use") {
              action.type = "tool_call";
              action.toolName = String(b.name || "unknown");
              action.toolArgs = b.input;
            } else if (b.type === "tool_result") {
              action.type = "tool_result";
              if (typeof b.content === "string") {
                texts.push(b.content);
              }
            }
          }
        }
        if (texts.length > 0) {
          action.content = texts.join("");
        }
      } else if (typeof msg.content === "string") {
        action.content = msg.content;
      } else if (typeof msg.text === "string") {
        action.content = msg.text;
      }
    }
  }
  if (event.errorMessage) {
    action.content = event.errorMessage;
  }
  return action;
}
function agentEventToAction(event) {
  const data = event.data;
  let type = "streaming";
  let content;
  let toolName;
  let toolArgs;
  let startedAt;
  let endedAt;
  if (event.stream === "lifecycle") {
    if (data.phase === "start") {
      type = "start";
      startedAt = typeof data.startedAt === "number" ? data.startedAt : event.ts;
    } else if (data.phase === "end") {
      type = "complete";
      endedAt = typeof data.endedAt === "number" ? data.endedAt : event.ts;
    }
  } else if (data.type === "tool_use") {
    type = "tool_call";
    toolName = String(data.name || "unknown");
    toolArgs = data.input;
    content = `Tool: ${toolName}`;
  } else if (data.type === "tool_result") {
    type = "tool_result";
    content = String(data.content || "");
  } else if (data.type === "text" || typeof data.text === "string") {
    type = "streaming";
    content = String(data.text || "");
  }
  return {
    id: `${event.runId}-${event.seq}`,
    runId: event.runId,
    // Use sessionKey from event if available, fallback to stream
    sessionKey: event.sessionKey || event.stream,
    seq: event.seq,
    type,
    eventType: "agent",
    timestamp: event.ts,
    content,
    toolName,
    toolArgs,
    startedAt,
    endedAt
  };
}
function parseEventFrame(frame) {
  if (frame.event === "health" || frame.event === "tick") {
    return null;
  }
  if (frame.event === "chat" && frame.payload) {
    const chatEvent = frame.payload;
    return {
      action: chatEventToAction(chatEvent),
      session: {
        key: chatEvent.sessionKey,
        status: chatEvent.state === "delta" ? "thinking" : "active",
        lastActivityAt: Date.now()
      }
    };
  }
  if (frame.event === "agent" && frame.payload) {
    const agentEvent = frame.payload;
    if (agentEvent.stream === "lifecycle") {
      return {
        action: agentEventToAction(agentEvent),
        session: agentEvent.sessionKey ? {
          key: agentEvent.sessionKey,
          status: agentEvent.data?.phase === "start" ? "thinking" : "active",
          lastActivityAt: Date.now()
        } : void 0
      };
    }
    if (agentEvent.stream === "assistant" && typeof agentEvent.data?.text === "string") {
      return {
        action: agentEventToAction(agentEvent),
        session: agentEvent.sessionKey ? {
          key: agentEvent.sessionKey,
          status: "thinking",
          lastActivityAt: Date.now()
        } : void 0
      };
    }
    if (agentEvent.data?.type === "tool_use" || agentEvent.data?.type === "tool_result") {
      return {
        action: agentEventToAction(agentEvent),
        session: agentEvent.sessionKey ? {
          key: agentEvent.sessionKey,
          status: "thinking",
          lastActivityAt: Date.now()
        } : void 0
      };
    }
    return null;
  }
  if (frame.event === "exec.started" && frame.payload) {
    const exec = frame.payload;
    const execId = `exec-${exec.runId}-${exec.pid}`;
    const timestamp = Date.now();
    const id = frame.seq != null ? `${execId}-started-${frame.seq}` : `${execId}-started-${timestamp}`;
    return {
      execEvent: {
        id,
        execId,
        runId: exec.runId,
        pid: exec.pid,
        sessionId: exec.sessionId,
        eventType: "started",
        command: exec.command,
        startedAt: exec.startedAt,
        timestamp
      },
      session: exec.sessionId ? {
        key: exec.sessionId,
        status: "thinking",
        lastActivityAt: timestamp
      } : void 0
    };
  }
  if (frame.event === "exec.output" && frame.payload) {
    const exec = frame.payload;
    const execId = `exec-${exec.runId}-${exec.pid}`;
    const timestamp = Date.now();
    const id = frame.seq != null ? `${execId}-output-${frame.seq}` : `${execId}-output-${timestamp}`;
    return {
      execEvent: {
        id,
        execId,
        runId: exec.runId,
        pid: exec.pid,
        sessionId: exec.sessionId,
        eventType: "output",
        stream: exec.stream,
        output: exec.output,
        timestamp
      },
      session: exec.sessionId ? {
        key: exec.sessionId,
        lastActivityAt: timestamp
      } : void 0
    };
  }
  if (frame.event === "exec.completed" && frame.payload) {
    const exec = frame.payload;
    const execId = `exec-${exec.runId}-${exec.pid}`;
    const timestamp = Date.now();
    const id = frame.seq != null ? `${execId}-completed-${frame.seq}` : `${execId}-completed-${timestamp}`;
    return {
      execEvent: {
        id,
        execId,
        runId: exec.runId,
        pid: exec.pid,
        sessionId: exec.sessionId,
        eventType: "completed",
        durationMs: exec.durationMs,
        exitCode: exec.exitCode,
        status: exec.status,
        timestamp
      },
      session: exec.sessionId ? {
        key: exec.sessionId,
        status: "active",
        lastActivityAt: timestamp
      } : void 0
    };
  }
  return null;
}

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/query/ir.js
var BaseExpression = class {
};
var PropRef = class extends BaseExpression {
  constructor(path3) {
    super();
    this.path = path3;
    this.type = `ref`;
  }
};
var Value = class extends BaseExpression {
  constructor(value) {
    super();
    this.value = value;
    this.type = `val`;
  }
};
var Func = class extends BaseExpression {
  constructor(name, args) {
    super();
    this.name = name;
    this.args = args;
    this.type = `func`;
  }
};

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/errors.js
var TanStackDBError = class extends Error {
  constructor(message) {
    super(message);
    this.name = `TanStackDBError`;
  }
};
var SchemaValidationError = class extends TanStackDBError {
  constructor(type, issues, message) {
    const defaultMessage = `${type === `insert` ? `Insert` : `Update`} validation failed: ${issues.map((issue) => `
- ${issue.message} - path: ${issue.path}`).join(``)}`;
    super(message || defaultMessage);
    this.name = `SchemaValidationError`;
    this.type = type;
    this.issues = issues;
  }
};
var CollectionConfigurationError = class extends TanStackDBError {
  constructor(message) {
    super(message);
    this.name = `CollectionConfigurationError`;
  }
};
var CollectionRequiresConfigError = class extends CollectionConfigurationError {
  constructor() {
    super(`Collection requires a config`);
  }
};
var CollectionRequiresSyncConfigError = class extends CollectionConfigurationError {
  constructor() {
    super(`Collection requires a sync config`);
  }
};
var InvalidSchemaError = class extends CollectionConfigurationError {
  constructor() {
    super(`Schema must implement the standard-schema interface`);
  }
};
var SchemaMustBeSynchronousError = class extends CollectionConfigurationError {
  constructor() {
    super(`Schema validation must be synchronous`);
  }
};
var CollectionStateError = class extends TanStackDBError {
  constructor(message) {
    super(message);
    this.name = `CollectionStateError`;
  }
};
var CollectionInErrorStateError = class extends CollectionStateError {
  constructor(operation, collectionId) {
    super(
      `Cannot perform ${operation} on collection "${collectionId}" - collection is in error state. Try calling cleanup() and restarting the collection.`
    );
  }
};
var InvalidCollectionStatusTransitionError = class extends CollectionStateError {
  constructor(from, to, collectionId) {
    super(
      `Invalid collection status transition from "${from}" to "${to}" for collection "${collectionId}"`
    );
  }
};
var CollectionIsInErrorStateError = class extends CollectionStateError {
  constructor() {
    super(`Collection is in error state`);
  }
};
var NegativeActiveSubscribersError = class extends CollectionStateError {
  constructor() {
    super(`Active subscribers count is negative - this should never happen`);
  }
};
var CollectionOperationError = class extends TanStackDBError {
  constructor(message) {
    super(message);
    this.name = `CollectionOperationError`;
  }
};
var UndefinedKeyError = class extends CollectionOperationError {
  constructor(item) {
    super(
      `An object was created without a defined key: ${JSON.stringify(item)}`
    );
  }
};
var InvalidKeyError = class extends CollectionOperationError {
  constructor(key, item) {
    const keyType = key === null ? `null` : typeof key;
    super(
      `getKey returned an invalid key type. Expected string or number, but got ${keyType}: ${JSON.stringify(key)}. Item: ${JSON.stringify(item)}`
    );
  }
};
var DuplicateKeyError = class extends CollectionOperationError {
  constructor(key) {
    super(
      `Cannot insert document with ID "${key}" because it already exists in the collection`
    );
  }
};
var DuplicateKeySyncError = class extends CollectionOperationError {
  constructor(key, collectionId, options) {
    const baseMessage = `Cannot insert document with key "${key}" from sync because it already exists in the collection "${collectionId}"`;
    if (options?.hasCustomGetKey && options.hasDistinct) {
      super(
        `${baseMessage}. This collection uses a custom getKey with .distinct(). The .distinct() operator deduplicates by the ENTIRE selected object (standard SQL behavior), but your custom getKey extracts only a subset of fields. This causes multiple distinct rows (with different values in non-key fields) to receive the same key. To fix this, either: (1) ensure your SELECT only includes fields that uniquely identify each row, (2) use .groupBy() with min()/max() aggregates to select one value per group, or (3) remove the custom getKey to use the default key behavior.`
      );
    } else if (options?.hasCustomGetKey && options.hasJoins) {
      super(
        `${baseMessage}. This collection uses a custom getKey with joined queries. Joined queries can produce multiple rows with the same key when relationships are not 1:1. Consider: (1) using a composite key in your getKey function (e.g., \`\${item.key1}-\${item.key2}\`), (2) ensuring your join produces unique rows per key, or (3) removing the custom getKey to use the default composite key behavior.`
      );
    } else {
      super(baseMessage);
    }
  }
};
var MissingUpdateArgumentError = class extends CollectionOperationError {
  constructor() {
    super(`The first argument to update is missing`);
  }
};
var NoKeysPassedToUpdateError = class extends CollectionOperationError {
  constructor() {
    super(`No keys were passed to update`);
  }
};
var UpdateKeyNotFoundError = class extends CollectionOperationError {
  constructor(key) {
    super(
      `The key "${key}" was passed to update but an object for this key was not found in the collection`
    );
  }
};
var KeyUpdateNotAllowedError = class extends CollectionOperationError {
  constructor(originalKey, newKey) {
    super(
      `Updating the key of an item is not allowed. Original key: "${originalKey}", Attempted new key: "${newKey}". Please delete the old item and create a new one if a key change is necessary.`
    );
  }
};
var NoKeysPassedToDeleteError = class extends CollectionOperationError {
  constructor() {
    super(`No keys were passed to delete`);
  }
};
var DeleteKeyNotFoundError = class extends CollectionOperationError {
  constructor(key) {
    super(
      `Collection.delete was called with key '${key}' but there is no item in the collection with this key`
    );
  }
};
var MissingHandlerError = class extends TanStackDBError {
  constructor(message) {
    super(message);
    this.name = `MissingHandlerError`;
  }
};
var MissingInsertHandlerError = class extends MissingHandlerError {
  constructor() {
    super(
      `Collection.insert called directly (not within an explicit transaction) but no 'onInsert' handler is configured.`
    );
  }
};
var MissingUpdateHandlerError = class extends MissingHandlerError {
  constructor() {
    super(
      `Collection.update called directly (not within an explicit transaction) but no 'onUpdate' handler is configured.`
    );
  }
};
var MissingDeleteHandlerError = class extends MissingHandlerError {
  constructor() {
    super(
      `Collection.delete called directly (not within an explicit transaction) but no 'onDelete' handler is configured.`
    );
  }
};
var TransactionError = class extends TanStackDBError {
  constructor(message) {
    super(message);
    this.name = `TransactionError`;
  }
};
var MissingMutationFunctionError = class extends TransactionError {
  constructor() {
    super(`mutationFn is required when creating a transaction`);
  }
};
var TransactionNotPendingMutateError = class extends TransactionError {
  constructor() {
    super(
      `You can no longer call .mutate() as the transaction is no longer pending`
    );
  }
};
var TransactionAlreadyCompletedRollbackError = class extends TransactionError {
  constructor() {
    super(
      `You can no longer call .rollback() as the transaction is already completed`
    );
  }
};
var TransactionNotPendingCommitError = class extends TransactionError {
  constructor() {
    super(
      `You can no longer call .commit() as the transaction is no longer pending`
    );
  }
};
var NoPendingSyncTransactionWriteError = class extends TransactionError {
  constructor() {
    super(`No pending sync transaction to write to`);
  }
};
var SyncTransactionAlreadyCommittedWriteError = class extends TransactionError {
  constructor() {
    super(
      `The pending sync transaction is already committed, you can't still write to it.`
    );
  }
};
var NoPendingSyncTransactionCommitError = class extends TransactionError {
  constructor() {
    super(`No pending sync transaction to commit`);
  }
};
var SyncTransactionAlreadyCommittedError = class extends TransactionError {
  constructor() {
    super(
      `The pending sync transaction is already committed, you can't commit it again.`
    );
  }
};
var QueryCompilationError = class extends TanStackDBError {
  constructor(message) {
    super(message);
    this.name = `QueryCompilationError`;
  }
};
var UnknownExpressionTypeError = class extends QueryCompilationError {
  constructor(type) {
    super(`Unknown expression type: ${type}`);
  }
};
var EmptyReferencePathError = class extends QueryCompilationError {
  constructor() {
    super(`Reference path cannot be empty`);
  }
};
var UnknownFunctionError = class extends QueryCompilationError {
  constructor(functionName) {
    super(`Unknown function: ${functionName}`);
  }
};
var SyncCleanupError = class extends TanStackDBError {
  constructor(collectionId, error) {
    const message = error instanceof Error ? error.message : String(error);
    super(
      `Collection "${collectionId}" sync cleanup function threw an error: ${message}`
    );
    this.name = `SyncCleanupError`;
  }
};

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/utils/comparison.js
var objectIds = /* @__PURE__ */ new WeakMap();
var nextObjectId = 1;
function getObjectId(obj) {
  if (objectIds.has(obj)) {
    return objectIds.get(obj);
  }
  const id = nextObjectId++;
  objectIds.set(obj, id);
  return id;
}
var ascComparator = (a, b, opts) => {
  const { nulls } = opts;
  if (a == null && b == null) return 0;
  if (a == null) return nulls === `first` ? -1 : 1;
  if (b == null) return nulls === `first` ? 1 : -1;
  if (typeof a === `string` && typeof b === `string`) {
    if (opts.stringSort === `locale`) {
      return a.localeCompare(b, opts.locale, opts.localeOptions);
    }
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      const result = ascComparator(a[i], b[i], opts);
      if (result !== 0) {
        return result;
      }
    }
    return a.length - b.length;
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime();
  }
  const aIsObject = typeof a === `object`;
  const bIsObject = typeof b === `object`;
  if (aIsObject || bIsObject) {
    if (aIsObject && bIsObject) {
      const aId = getObjectId(a);
      const bId = getObjectId(b);
      return aId - bId;
    }
    if (aIsObject) return 1;
    if (bIsObject) return -1;
  }
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};
var descComparator = (a, b, opts) => {
  return ascComparator(b, a, {
    ...opts,
    nulls: opts.nulls === `first` ? `last` : `first`
  });
};
function makeComparator(opts) {
  return (a, b) => {
    if (opts.direction === `asc`) {
      return ascComparator(a, b, opts);
    } else {
      return descComparator(a, b, opts);
    }
  };
}
var defaultComparator = makeComparator({
  direction: `asc`,
  nulls: `first`,
  stringSort: `locale`
});
function areUint8ArraysEqual(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
var UINT8ARRAY_NORMALIZE_THRESHOLD = 128;
var UNDEFINED_SENTINEL = `__TS_DB_BTREE_UNDEFINED_VALUE__`;
function normalizeValue(value) {
  if (value instanceof Date) {
    return value.getTime();
  }
  const isUint8Array = typeof Buffer !== `undefined` && value instanceof Buffer || value instanceof Uint8Array;
  if (isUint8Array) {
    if (value.byteLength <= UINT8ARRAY_NORMALIZE_THRESHOLD) {
      return `__u8__${Array.from(value).join(`,`)}`;
    }
  }
  return value;
}
function normalizeForBTree(value) {
  if (value === void 0) {
    return UNDEFINED_SENTINEL;
  }
  return normalizeValue(value);
}
function denormalizeUndefined(value) {
  if (value === UNDEFINED_SENTINEL) {
    return void 0;
  }
  return value;
}
function areValuesEqual(a, b) {
  if (a === b) {
    return true;
  }
  const aIsUint8Array = typeof Buffer !== `undefined` && a instanceof Buffer || a instanceof Uint8Array;
  const bIsUint8Array = typeof Buffer !== `undefined` && b instanceof Buffer || b instanceof Uint8Array;
  if (aIsUint8Array && bIsUint8Array) {
    return areUint8ArraysEqual(a, b);
  }
  return false;
}

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/query/compiler/evaluators.js
function isUnknown(value) {
  return value === null || value === void 0;
}
function toBooleanPredicate(result) {
  return result === true;
}
function compileExpression(expr, isSingleRow = false) {
  const compiledFn = compileExpressionInternal(expr, isSingleRow);
  return compiledFn;
}
function compileSingleRowExpression(expr) {
  const compiledFn = compileExpressionInternal(expr, true);
  return compiledFn;
}
function compileExpressionInternal(expr, isSingleRow) {
  switch (expr.type) {
    case `val`: {
      const value = expr.value;
      return () => value;
    }
    case `ref`: {
      return isSingleRow ? compileSingleRowRef(expr) : compileRef(expr);
    }
    case `func`: {
      return compileFunction(expr, isSingleRow);
    }
    default:
      throw new UnknownExpressionTypeError(expr.type);
  }
}
function compileRef(ref) {
  const [namespace, ...propertyPath] = ref.path;
  if (!namespace) {
    throw new EmptyReferencePathError();
  }
  if (namespace === `$selected`) {
    if (propertyPath.length === 0) {
      return (namespacedRow) => namespacedRow.$selected;
    } else if (propertyPath.length === 1) {
      const prop = propertyPath[0];
      return (namespacedRow) => {
        const selectResults = namespacedRow.$selected;
        return selectResults?.[prop];
      };
    } else {
      return (namespacedRow) => {
        const selectResults = namespacedRow.$selected;
        if (selectResults === void 0) {
          return void 0;
        }
        let value = selectResults;
        for (const prop of propertyPath) {
          if (value == null) {
            return value;
          }
          value = value[prop];
        }
        return value;
      };
    }
  }
  const tableAlias = namespace;
  if (propertyPath.length === 0) {
    return (namespacedRow) => namespacedRow[tableAlias];
  } else if (propertyPath.length === 1) {
    const prop = propertyPath[0];
    return (namespacedRow) => {
      const tableData = namespacedRow[tableAlias];
      return tableData?.[prop];
    };
  } else {
    return (namespacedRow) => {
      const tableData = namespacedRow[tableAlias];
      if (tableData === void 0) {
        return void 0;
      }
      let value = tableData;
      for (const prop of propertyPath) {
        if (value == null) {
          return value;
        }
        value = value[prop];
      }
      return value;
    };
  }
}
function compileSingleRowRef(ref) {
  const propertyPath = ref.path;
  return (item) => {
    let value = item;
    for (const prop of propertyPath) {
      if (value == null) {
        return value;
      }
      value = value[prop];
    }
    return value;
  };
}
function compileFunction(func, isSingleRow) {
  const compiledArgs = func.args.map(
    (arg) => compileExpressionInternal(arg, isSingleRow)
  );
  switch (func.name) {
    // Comparison operators
    case `eq`: {
      const argA = compiledArgs[0];
      const argB = compiledArgs[1];
      return (data) => {
        const a = normalizeValue(argA(data));
        const b = normalizeValue(argB(data));
        if (isUnknown(a) || isUnknown(b)) {
          return null;
        }
        return areValuesEqual(a, b);
      };
    }
    case `gt`: {
      const argA = compiledArgs[0];
      const argB = compiledArgs[1];
      return (data) => {
        const a = argA(data);
        const b = argB(data);
        if (isUnknown(a) || isUnknown(b)) {
          return null;
        }
        return a > b;
      };
    }
    case `gte`: {
      const argA = compiledArgs[0];
      const argB = compiledArgs[1];
      return (data) => {
        const a = argA(data);
        const b = argB(data);
        if (isUnknown(a) || isUnknown(b)) {
          return null;
        }
        return a >= b;
      };
    }
    case `lt`: {
      const argA = compiledArgs[0];
      const argB = compiledArgs[1];
      return (data) => {
        const a = argA(data);
        const b = argB(data);
        if (isUnknown(a) || isUnknown(b)) {
          return null;
        }
        return a < b;
      };
    }
    case `lte`: {
      const argA = compiledArgs[0];
      const argB = compiledArgs[1];
      return (data) => {
        const a = argA(data);
        const b = argB(data);
        if (isUnknown(a) || isUnknown(b)) {
          return null;
        }
        return a <= b;
      };
    }
    // Boolean operators
    case `and`:
      return (data) => {
        let hasUnknown = false;
        for (const compiledArg of compiledArgs) {
          const result = compiledArg(data);
          if (result === false) {
            return false;
          }
          if (isUnknown(result)) {
            hasUnknown = true;
          }
        }
        if (hasUnknown) {
          return null;
        }
        return true;
      };
    case `or`:
      return (data) => {
        let hasUnknown = false;
        for (const compiledArg of compiledArgs) {
          const result = compiledArg(data);
          if (result === true) {
            return true;
          }
          if (isUnknown(result)) {
            hasUnknown = true;
          }
        }
        if (hasUnknown) {
          return null;
        }
        return false;
      };
    case `not`: {
      const arg = compiledArgs[0];
      return (data) => {
        const result = arg(data);
        if (isUnknown(result)) {
          return null;
        }
        return !result;
      };
    }
    // Array operators
    case `in`: {
      const valueEvaluator = compiledArgs[0];
      const arrayEvaluator = compiledArgs[1];
      return (data) => {
        const value = valueEvaluator(data);
        const array = arrayEvaluator(data);
        if (isUnknown(value)) {
          return null;
        }
        if (!Array.isArray(array)) {
          return false;
        }
        return array.includes(value);
      };
    }
    // String operators
    case `like`: {
      const valueEvaluator = compiledArgs[0];
      const patternEvaluator = compiledArgs[1];
      return (data) => {
        const value = valueEvaluator(data);
        const pattern = patternEvaluator(data);
        if (isUnknown(value) || isUnknown(pattern)) {
          return null;
        }
        return evaluateLike(value, pattern, false);
      };
    }
    case `ilike`: {
      const valueEvaluator = compiledArgs[0];
      const patternEvaluator = compiledArgs[1];
      return (data) => {
        const value = valueEvaluator(data);
        const pattern = patternEvaluator(data);
        if (isUnknown(value) || isUnknown(pattern)) {
          return null;
        }
        return evaluateLike(value, pattern, true);
      };
    }
    // String functions
    case `upper`: {
      const arg = compiledArgs[0];
      return (data) => {
        const value = arg(data);
        return typeof value === `string` ? value.toUpperCase() : value;
      };
    }
    case `lower`: {
      const arg = compiledArgs[0];
      return (data) => {
        const value = arg(data);
        return typeof value === `string` ? value.toLowerCase() : value;
      };
    }
    case `length`: {
      const arg = compiledArgs[0];
      return (data) => {
        const value = arg(data);
        if (typeof value === `string`) {
          return value.length;
        }
        if (Array.isArray(value)) {
          return value.length;
        }
        return 0;
      };
    }
    case `concat`:
      return (data) => {
        return compiledArgs.map((evaluator) => {
          const arg = evaluator(data);
          try {
            return String(arg ?? ``);
          } catch {
            try {
              return JSON.stringify(arg) || ``;
            } catch {
              return `[object]`;
            }
          }
        }).join(``);
      };
    case `coalesce`:
      return (data) => {
        for (const evaluator of compiledArgs) {
          const value = evaluator(data);
          if (value !== null && value !== void 0) {
            return value;
          }
        }
        return null;
      };
    // Math functions
    case `add`: {
      const argA = compiledArgs[0];
      const argB = compiledArgs[1];
      return (data) => {
        const a = argA(data);
        const b = argB(data);
        return (a ?? 0) + (b ?? 0);
      };
    }
    case `subtract`: {
      const argA = compiledArgs[0];
      const argB = compiledArgs[1];
      return (data) => {
        const a = argA(data);
        const b = argB(data);
        return (a ?? 0) - (b ?? 0);
      };
    }
    case `multiply`: {
      const argA = compiledArgs[0];
      const argB = compiledArgs[1];
      return (data) => {
        const a = argA(data);
        const b = argB(data);
        return (a ?? 0) * (b ?? 0);
      };
    }
    case `divide`: {
      const argA = compiledArgs[0];
      const argB = compiledArgs[1];
      return (data) => {
        const a = argA(data);
        const b = argB(data);
        const divisor = b ?? 0;
        return divisor !== 0 ? (a ?? 0) / divisor : null;
      };
    }
    // Null/undefined checking functions
    case `isUndefined`: {
      const arg = compiledArgs[0];
      return (data) => {
        const value = arg(data);
        return value === void 0;
      };
    }
    case `isNull`: {
      const arg = compiledArgs[0];
      return (data) => {
        const value = arg(data);
        return value === null;
      };
    }
    default:
      throw new UnknownFunctionError(func.name);
  }
}
function evaluateLike(value, pattern, caseInsensitive) {
  if (typeof value !== `string` || typeof pattern !== `string`) {
    return false;
  }
  const searchValue = caseInsensitive ? value.toLowerCase() : value;
  const searchPattern = caseInsensitive ? pattern.toLowerCase() : pattern;
  let regexPattern = searchPattern.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
  regexPattern = regexPattern.replace(/%/g, `.*`);
  regexPattern = regexPattern.replace(/_/g, `.`);
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(searchValue);
}

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/utils.js
function deepEquals(a, b) {
  return deepEqualsInternal(a, b, /* @__PURE__ */ new Map());
}
function deepEqualsInternal(a, b, visited) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  if (a instanceof Date) {
    if (!(b instanceof Date)) return false;
    return a.getTime() === b.getTime();
  }
  if (b instanceof Date) return false;
  if (a instanceof RegExp) {
    if (!(b instanceof RegExp)) return false;
    return a.source === b.source && a.flags === b.flags;
  }
  if (b instanceof RegExp) return false;
  if (a instanceof Map) {
    if (!(b instanceof Map)) return false;
    if (a.size !== b.size) return false;
    if (visited.has(a)) {
      return visited.get(a) === b;
    }
    visited.set(a, b);
    const entries = Array.from(a.entries());
    const result = entries.every(([key, val]) => {
      return b.has(key) && deepEqualsInternal(val, b.get(key), visited);
    });
    visited.delete(a);
    return result;
  }
  if (b instanceof Map) return false;
  if (a instanceof Set) {
    if (!(b instanceof Set)) return false;
    if (a.size !== b.size) return false;
    if (visited.has(a)) {
      return visited.get(a) === b;
    }
    visited.set(a, b);
    const aValues = Array.from(a);
    const bValues = Array.from(b);
    if (aValues.every((val) => typeof val !== `object`)) {
      visited.delete(a);
      return aValues.every((val) => b.has(val));
    }
    const result = aValues.length === bValues.length;
    visited.delete(a);
    return result;
  }
  if (b instanceof Set) return false;
  if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b) && !(a instanceof DataView) && !(b instanceof DataView)) {
    const typedA = a;
    const typedB = b;
    if (typedA.length !== typedB.length) return false;
    for (let i = 0; i < typedA.length; i++) {
      if (typedA[i] !== typedB[i]) return false;
    }
    return true;
  }
  if (ArrayBuffer.isView(b) && !(b instanceof DataView) && !ArrayBuffer.isView(a)) {
    return false;
  }
  if (isTemporal(a) && isTemporal(b)) {
    const aTag = getStringTag(a);
    const bTag = getStringTag(b);
    if (aTag !== bTag) return false;
    if (typeof a.equals === `function`) {
      return a.equals(b);
    }
    return a.toString() === b.toString();
  }
  if (isTemporal(b)) return false;
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    if (visited.has(a)) {
      return visited.get(a) === b;
    }
    visited.set(a, b);
    const result = a.every(
      (item, index) => deepEqualsInternal(item, b[index], visited)
    );
    visited.delete(a);
    return result;
  }
  if (Array.isArray(b)) return false;
  if (typeof a === `object`) {
    if (visited.has(a)) {
      return visited.get(a) === b;
    }
    visited.set(a, b);
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
      visited.delete(a);
      return false;
    }
    const result = keysA.every(
      (key) => key in b && deepEqualsInternal(a[key], b[key], visited)
    );
    visited.delete(a);
    return result;
  }
  return false;
}
var temporalTypes = [
  `Temporal.Duration`,
  `Temporal.Instant`,
  `Temporal.PlainDate`,
  `Temporal.PlainDateTime`,
  `Temporal.PlainMonthDay`,
  `Temporal.PlainTime`,
  `Temporal.PlainYearMonth`,
  `Temporal.ZonedDateTime`
];
function getStringTag(a) {
  return a[Symbol.toStringTag];
}
function isTemporal(a) {
  const tag = getStringTag(a);
  return typeof tag === `string` && temporalTypes.includes(tag);
}
var DEFAULT_COMPARE_OPTIONS = {
  direction: `asc`,
  nulls: `first`,
  stringSort: `locale`
};

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/indexes/reverse-index.js
var ReverseIndex = class {
  constructor(index) {
    this.originalIndex = index;
  }
  // Define the reversed operations
  lookup(operation, value) {
    const reverseOperation = operation === `gt` ? `lt` : operation === `gte` ? `lte` : operation === `lt` ? `gt` : operation === `lte` ? `gte` : operation;
    return this.originalIndex.lookup(reverseOperation, value);
  }
  rangeQuery(options = {}) {
    return this.originalIndex.rangeQueryReversed(options);
  }
  rangeQueryReversed(options = {}) {
    return this.originalIndex.rangeQuery(options);
  }
  take(n, from, filterFn) {
    return this.originalIndex.takeReversed(n, from, filterFn);
  }
  takeFromStart(n, filterFn) {
    return this.originalIndex.takeReversedFromEnd(n, filterFn);
  }
  takeReversed(n, from, filterFn) {
    return this.originalIndex.take(n, from, filterFn);
  }
  takeReversedFromEnd(n, filterFn) {
    return this.originalIndex.takeFromStart(n, filterFn);
  }
  get orderedEntriesArray() {
    return this.originalIndex.orderedEntriesArrayReversed;
  }
  get orderedEntriesArrayReversed() {
    return this.originalIndex.orderedEntriesArray;
  }
  // All operations below delegate to the original index
  supports(operation) {
    return this.originalIndex.supports(operation);
  }
  matchesField(fieldPath) {
    return this.originalIndex.matchesField(fieldPath);
  }
  matchesCompareOptions(compareOptions) {
    return this.originalIndex.matchesCompareOptions(compareOptions);
  }
  matchesDirection(direction) {
    return this.originalIndex.matchesDirection(direction);
  }
  getStats() {
    return this.originalIndex.getStats();
  }
  add(key, item) {
    this.originalIndex.add(key, item);
  }
  remove(key, item) {
    this.originalIndex.remove(key, item);
  }
  update(key, oldItem, newItem) {
    this.originalIndex.update(key, oldItem, newItem);
  }
  build(entries) {
    this.originalIndex.build(entries);
  }
  clear() {
    this.originalIndex.clear();
  }
  get keyCount() {
    return this.originalIndex.keyCount;
  }
  equalityLookup(value) {
    return this.originalIndex.equalityLookup(value);
  }
  inArrayLookup(values) {
    return this.originalIndex.inArrayLookup(values);
  }
  get indexedKeysSet() {
    return this.originalIndex.indexedKeysSet;
  }
  get valueMapData() {
    return this.originalIndex.valueMapData;
  }
};

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/utils/index-optimization.js
function findIndexForField(collection, fieldPath, compareOptions) {
  const compareOpts = compareOptions ?? {
    ...DEFAULT_COMPARE_OPTIONS,
    ...collection.compareOptions
  };
  for (const index of collection.indexes.values()) {
    if (index.matchesField(fieldPath) && index.matchesCompareOptions(compareOpts)) {
      if (!index.matchesDirection(compareOpts.direction)) {
        return new ReverseIndex(index);
      }
      return index;
    }
  }
  return void 0;
}
function intersectSets(sets) {
  if (sets.length === 0) return /* @__PURE__ */ new Set();
  if (sets.length === 1) return new Set(sets[0]);
  let result = new Set(sets[0]);
  for (let i = 1; i < sets.length; i++) {
    const newResult = /* @__PURE__ */ new Set();
    for (const item of result) {
      if (sets[i].has(item)) {
        newResult.add(item);
      }
    }
    result = newResult;
  }
  return result;
}
function unionSets(sets) {
  const result = /* @__PURE__ */ new Set();
  for (const set of sets) {
    for (const item of set) {
      result.add(item);
    }
  }
  return result;
}
function optimizeExpressionWithIndexes(expression, collection) {
  return optimizeQueryRecursive(expression, collection);
}
function optimizeQueryRecursive(expression, collection) {
  if (expression.type === `func`) {
    switch (expression.name) {
      case `eq`:
      case `gt`:
      case `gte`:
      case `lt`:
      case `lte`:
        return optimizeSimpleComparison(expression, collection);
      case `and`:
        return optimizeAndExpression(expression, collection);
      case `or`:
        return optimizeOrExpression(expression, collection);
      case `in`:
        return optimizeInArrayExpression(expression, collection);
    }
  }
  return { canOptimize: false, matchingKeys: /* @__PURE__ */ new Set() };
}
function optimizeCompoundRangeQuery(expression, collection) {
  if (expression.type !== `func` || expression.args.length < 2) {
    return { canOptimize: false, matchingKeys: /* @__PURE__ */ new Set() };
  }
  const fieldOperations = /* @__PURE__ */ new Map();
  for (const arg of expression.args) {
    if (arg.type === `func` && [`gt`, `gte`, `lt`, `lte`].includes(arg.name)) {
      const rangeOp = arg;
      if (rangeOp.args.length === 2) {
        const leftArg = rangeOp.args[0];
        const rightArg = rangeOp.args[1];
        let fieldArg = null;
        let valueArg = null;
        let operation = rangeOp.name;
        if (leftArg.type === `ref` && rightArg.type === `val`) {
          fieldArg = leftArg;
          valueArg = rightArg;
        } else if (leftArg.type === `val` && rightArg.type === `ref`) {
          fieldArg = rightArg;
          valueArg = leftArg;
          switch (operation) {
            case `gt`:
              operation = `lt`;
              break;
            case `gte`:
              operation = `lte`;
              break;
            case `lt`:
              operation = `gt`;
              break;
            case `lte`:
              operation = `gte`;
              break;
          }
        }
        if (fieldArg && valueArg) {
          const fieldPath = fieldArg.path;
          const fieldKey = fieldPath.join(`.`);
          const value = valueArg.value;
          if (!fieldOperations.has(fieldKey)) {
            fieldOperations.set(fieldKey, []);
          }
          fieldOperations.get(fieldKey).push({ operation, value });
        }
      }
    }
  }
  for (const [fieldKey, operations] of fieldOperations) {
    if (operations.length >= 2) {
      const fieldPath = fieldKey.split(`.`);
      const index = findIndexForField(collection, fieldPath);
      if (index && index.supports(`gt`) && index.supports(`lt`)) {
        let from = void 0;
        let to = void 0;
        let fromInclusive = true;
        let toInclusive = true;
        for (const { operation, value } of operations) {
          switch (operation) {
            case `gt`:
              if (from === void 0 || value > from) {
                from = value;
                fromInclusive = false;
              }
              break;
            case `gte`:
              if (from === void 0 || value > from) {
                from = value;
                fromInclusive = true;
              }
              break;
            case `lt`:
              if (to === void 0 || value < to) {
                to = value;
                toInclusive = false;
              }
              break;
            case `lte`:
              if (to === void 0 || value < to) {
                to = value;
                toInclusive = true;
              }
              break;
          }
        }
        const matchingKeys = index.rangeQuery({
          from,
          to,
          fromInclusive,
          toInclusive
        });
        return { canOptimize: true, matchingKeys };
      }
    }
  }
  return { canOptimize: false, matchingKeys: /* @__PURE__ */ new Set() };
}
function optimizeSimpleComparison(expression, collection) {
  if (expression.type !== `func` || expression.args.length !== 2) {
    return { canOptimize: false, matchingKeys: /* @__PURE__ */ new Set() };
  }
  const leftArg = expression.args[0];
  const rightArg = expression.args[1];
  let fieldArg = null;
  let valueArg = null;
  let operation = expression.name;
  if (leftArg.type === `ref` && rightArg.type === `val`) {
    fieldArg = leftArg;
    valueArg = rightArg;
  } else if (leftArg.type === `val` && rightArg.type === `ref`) {
    fieldArg = rightArg;
    valueArg = leftArg;
    switch (operation) {
      case `gt`:
        operation = `lt`;
        break;
      case `gte`:
        operation = `lte`;
        break;
      case `lt`:
        operation = `gt`;
        break;
      case `lte`:
        operation = `gte`;
        break;
    }
  }
  if (fieldArg && valueArg) {
    const fieldPath = fieldArg.path;
    const index = findIndexForField(collection, fieldPath);
    if (index) {
      const queryValue = valueArg.value;
      const indexOperation = operation;
      if (!index.supports(indexOperation)) {
        return { canOptimize: false, matchingKeys: /* @__PURE__ */ new Set() };
      }
      const matchingKeys = index.lookup(indexOperation, queryValue);
      return { canOptimize: true, matchingKeys };
    }
  }
  return { canOptimize: false, matchingKeys: /* @__PURE__ */ new Set() };
}
function optimizeAndExpression(expression, collection) {
  if (expression.type !== `func` || expression.args.length < 2) {
    return { canOptimize: false, matchingKeys: /* @__PURE__ */ new Set() };
  }
  const compoundRangeResult = optimizeCompoundRangeQuery(expression, collection);
  if (compoundRangeResult.canOptimize) {
    return compoundRangeResult;
  }
  const results = [];
  for (const arg of expression.args) {
    const result = optimizeQueryRecursive(arg, collection);
    if (result.canOptimize) {
      results.push(result);
    }
  }
  if (results.length > 0) {
    const allMatchingSets = results.map((r) => r.matchingKeys);
    const intersectedKeys = intersectSets(allMatchingSets);
    return { canOptimize: true, matchingKeys: intersectedKeys };
  }
  return { canOptimize: false, matchingKeys: /* @__PURE__ */ new Set() };
}
function optimizeOrExpression(expression, collection) {
  if (expression.type !== `func` || expression.args.length < 2) {
    return { canOptimize: false, matchingKeys: /* @__PURE__ */ new Set() };
  }
  const results = [];
  for (const arg of expression.args) {
    const result = optimizeQueryRecursive(arg, collection);
    if (result.canOptimize) {
      results.push(result);
    }
  }
  if (results.length > 0) {
    const allMatchingSets = results.map((r) => r.matchingKeys);
    const unionedKeys = unionSets(allMatchingSets);
    return { canOptimize: true, matchingKeys: unionedKeys };
  }
  return { canOptimize: false, matchingKeys: /* @__PURE__ */ new Set() };
}
function optimizeInArrayExpression(expression, collection) {
  if (expression.type !== `func` || expression.args.length !== 2) {
    return { canOptimize: false, matchingKeys: /* @__PURE__ */ new Set() };
  }
  const fieldArg = expression.args[0];
  const arrayArg = expression.args[1];
  if (fieldArg.type === `ref` && arrayArg.type === `val` && Array.isArray(arrayArg.value)) {
    const fieldPath = fieldArg.path;
    const values = arrayArg.value;
    const index = findIndexForField(collection, fieldPath);
    if (index) {
      if (index.supports(`in`)) {
        const matchingKeys = index.lookup(`in`, values);
        return { canOptimize: true, matchingKeys };
      } else if (index.supports(`eq`)) {
        const matchingKeys = /* @__PURE__ */ new Set();
        for (const value of values) {
          const keysForValue = index.lookup(`eq`, value);
          for (const key of keysForValue) {
            matchingKeys.add(key);
          }
        }
        return { canOptimize: true, matchingKeys };
      }
    }
  }
  return { canOptimize: false, matchingKeys: /* @__PURE__ */ new Set() };
}

// crabwalk/node_modules/.pnpm/@tanstack+db-ivm@0.1.17_typescript@5.9.3/node_modules/@tanstack/db-ivm/dist/esm/utils.js
var ObjectIdGenerator = class {
  constructor() {
    this.objectIds = /* @__PURE__ */ new WeakMap();
    this.nextId = 0;
  }
  /**
   * Get a unique identifier for any value.
   * - Objects: Uses WeakMap for reference-based identity
   * - Primitives: Uses consistent string-based hashing
   */
  getId(value) {
    if (typeof value !== `object` || value === null) {
      const str = String(value);
      let hashValue = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hashValue = (hashValue << 5) - hashValue + char;
        hashValue = hashValue & hashValue;
      }
      return hashValue;
    }
    if (!this.objectIds.has(value)) {
      this.objectIds.set(value, this.nextId++);
    }
    return this.objectIds.get(value);
  }
  /**
   * Get a string representation of the ID for use in composite keys.
   */
  getStringId(value) {
    if (value === null) return `null`;
    if (value === void 0) return `undefined`;
    if (typeof value !== `object`) return `str_${String(value)}`;
    return `obj_${this.getId(value)}`;
  }
};
var globalObjectIdGenerator = new ObjectIdGenerator();
function compareKeys(a, b) {
  if (typeof a === typeof b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
  return typeof a === `string` ? -1 : 1;
}

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/utils/btree.js
var BTree = class {
  /**
   * Initializes an empty B+ tree.
   * @param compare Custom function to compare pairs of elements in the tree.
   *   If not specified, defaultComparator will be used which is valid as long as K extends DefaultComparable.
   * @param entries A set of key-value pairs to initialize the tree
   * @param maxNodeSize Branching factor (maximum items or children per node)
   *   Must be in range 4..256. If undefined or <4 then default is used; if >256 then 256.
   */
  constructor(compare, entries, maxNodeSize) {
    this._root = EmptyLeaf;
    this._size = 0;
    this._maxNodeSize = maxNodeSize >= 4 ? Math.min(maxNodeSize, 256) : 32;
    this._compare = compare;
    if (entries) this.setPairs(entries);
  }
  // ///////////////////////////////////////////////////////////////////////////
  // ES6 Map<K,V> methods /////////////////////////////////////////////////////
  /** Gets the number of key-value pairs in the tree. */
  get size() {
    return this._size;
  }
  /** Gets the number of key-value pairs in the tree. */
  get length() {
    return this._size;
  }
  /** Returns true iff the tree contains no key-value pairs. */
  get isEmpty() {
    return this._size === 0;
  }
  /** Releases the tree so that its size is 0. */
  clear() {
    this._root = EmptyLeaf;
    this._size = 0;
  }
  /**
   * Finds a pair in the tree and returns the associated value.
   * @param defaultValue a value to return if the key was not found.
   * @returns the value, or defaultValue if the key was not found.
   * @description Computational complexity: O(log size)
   */
  get(key, defaultValue) {
    return this._root.get(key, defaultValue, this);
  }
  /**
   * Adds or overwrites a key-value pair in the B+ tree.
   * @param key the key is used to determine the sort order of
   *        data in the tree.
   * @param value data to associate with the key (optional)
   * @param overwrite Whether to overwrite an existing key-value pair
   *        (default: true). If this is false and there is an existing
   *        key-value pair then this method has no effect.
   * @returns true if a new key-value pair was added.
   * @description Computational complexity: O(log size)
   * Note: when overwriting a previous entry, the key is updated
   * as well as the value. This has no effect unless the new key
   * has data that does not affect its sort order.
   */
  set(key, value, overwrite) {
    if (this._root.isShared) this._root = this._root.clone();
    const result = this._root.set(key, value, overwrite, this);
    if (result === true || result === false) return result;
    this._root = new BNodeInternal([this._root, result]);
    return true;
  }
  /**
   * Returns true if the key exists in the B+ tree, false if not.
   * Use get() for best performance; use has() if you need to
   * distinguish between "undefined value" and "key not present".
   * @param key Key to detect
   * @description Computational complexity: O(log size)
   */
  has(key) {
    return this.forRange(key, key, true, void 0) !== 0;
  }
  /**
   * Removes a single key-value pair from the B+ tree.
   * @param key Key to find
   * @returns true if a pair was found and removed, false otherwise.
   * @description Computational complexity: O(log size)
   */
  delete(key) {
    return this.editRange(key, key, true, DeleteRange) !== 0;
  }
  // ///////////////////////////////////////////////////////////////////////////
  // Additional methods ///////////////////////////////////////////////////////
  /** Returns the maximum number of children/values before nodes will split. */
  get maxNodeSize() {
    return this._maxNodeSize;
  }
  /** Gets the lowest key in the tree. Complexity: O(log size) */
  minKey() {
    return this._root.minKey();
  }
  /** Gets the highest key in the tree. Complexity: O(1) */
  maxKey() {
    return this._root.maxKey();
  }
  /** Gets an array of all keys, sorted */
  keysArray() {
    const results = [];
    this._root.forRange(
      this.minKey(),
      this.maxKey(),
      true,
      false,
      this,
      0,
      (k, _v) => {
        results.push(k);
      }
    );
    return results;
  }
  /** Returns the next pair whose key is larger than the specified key (or undefined if there is none).
   * If key === undefined, this function returns the lowest pair.
   * @param key The key to search for.
   * @param reusedArray Optional array used repeatedly to store key-value pairs, to
   * avoid creating a new array on every iteration.
   */
  nextHigherPair(key, reusedArray) {
    reusedArray = reusedArray || [];
    if (key === void 0) {
      return this._root.minPair(reusedArray);
    }
    return this._root.getPairOrNextHigher(
      key,
      this._compare,
      false,
      reusedArray
    );
  }
  /** Returns the next key larger than the specified key, or undefined if there is none.
   *  Also, nextHigherKey(undefined) returns the lowest key.
   */
  nextHigherKey(key) {
    const p = this.nextHigherPair(key, ReusedArray);
    return p && p[0];
  }
  /** Returns the next pair whose key is smaller than the specified key (or undefined if there is none).
   *  If key === undefined, this function returns the highest pair.
   * @param key The key to search for.
   * @param reusedArray Optional array used repeatedly to store key-value pairs, to
   *        avoid creating a new array each time you call this method.
   */
  nextLowerPair(key, reusedArray) {
    reusedArray = reusedArray || [];
    if (key === void 0) {
      return this._root.maxPair(reusedArray);
    }
    return this._root.getPairOrNextLower(key, this._compare, false, reusedArray);
  }
  /** Returns the next key smaller than the specified key, or undefined if there is none.
   *  Also, nextLowerKey(undefined) returns the highest key.
   */
  nextLowerKey(key) {
    const p = this.nextLowerPair(key, ReusedArray);
    return p && p[0];
  }
  /** Adds all pairs from a list of key-value pairs.
   * @param pairs Pairs to add to this tree. If there are duplicate keys,
   *        later pairs currently overwrite earlier ones (e.g. [[0,1],[0,7]]
   *        associates 0 with 7.)
   * @param overwrite Whether to overwrite pairs that already exist (if false,
   *        pairs[i] is ignored when the key pairs[i][0] already exists.)
   * @returns The number of pairs added to the collection.
   * @description Computational complexity: O(pairs.length * log(size + pairs.length))
   */
  setPairs(pairs, overwrite) {
    let added = 0;
    for (const pair of pairs) {
      if (this.set(pair[0], pair[1], overwrite)) added++;
    }
    return added;
  }
  /**
   * Scans the specified range of keys, in ascending order by key.
   * Note: the callback `onFound` must not insert or remove items in the
   * collection. Doing so may cause incorrect data to be sent to the
   * callback afterward.
   * @param low The first key scanned will be greater than or equal to `low`.
   * @param high Scanning stops when a key larger than this is reached.
   * @param includeHigh If the `high` key is present, `onFound` is called for
   *        that final pair if and only if this parameter is true.
   * @param onFound A function that is called for each key-value pair. This
   *        function can return {break:R} to stop early with result R.
   * @param initialCounter Initial third argument of onFound. This value
   *        increases by one each time `onFound` is called. Default: 0
   * @returns The number of values found, or R if the callback returned
   *        `{break:R}` to stop early.
   * @description Computational complexity: O(number of items scanned + log size)
   */
  forRange(low, high, includeHigh, onFound, initialCounter) {
    const r = this._root.forRange(
      low,
      high,
      includeHigh,
      false,
      this,
      initialCounter || 0,
      onFound
    );
    return typeof r === `number` ? r : r.break;
  }
  /**
   * Scans and potentially modifies values for a subsequence of keys.
   * Note: the callback `onFound` should ideally be a pure function.
   *   Specfically, it must not insert items, call clone(), or change
   *   the collection except via return value; out-of-band editing may
   *   cause an exception or may cause incorrect data to be sent to
   *   the callback (duplicate or missed items). It must not cause a
   *   clone() of the collection, otherwise the clone could be modified
   *   by changes requested by the callback.
   * @param low The first key scanned will be greater than or equal to `low`.
   * @param high Scanning stops when a key larger than this is reached.
   * @param includeHigh If the `high` key is present, `onFound` is called for
   *        that final pair if and only if this parameter is true.
   * @param onFound A function that is called for each key-value pair. This
   *        function can return `{value:v}` to change the value associated
   *        with the current key, `{delete:true}` to delete the current pair,
   *        `{break:R}` to stop early with result R, or it can return nothing
   *        (undefined or {}) to cause no effect and continue iterating.
   *        `{break:R}` can be combined with one of the other two commands.
   *        The third argument `counter` is the number of items iterated
   *        previously; it equals 0 when `onFound` is called the first time.
   * @returns The number of values scanned, or R if the callback returned
   *        `{break:R}` to stop early.
   * @description
   *   Computational complexity: O(number of items scanned + log size)
   *   Note: if the tree has been cloned with clone(), any shared
   *   nodes are copied before `onFound` is called. This takes O(n) time
   *   where n is proportional to the amount of shared data scanned.
   */
  editRange(low, high, includeHigh, onFound, initialCounter) {
    let root = this._root;
    if (root.isShared) this._root = root = root.clone();
    try {
      const r = root.forRange(
        low,
        high,
        includeHigh,
        true,
        this,
        initialCounter || 0,
        onFound
      );
      return typeof r === `number` ? r : r.break;
    } finally {
      let isShared;
      while (root.keys.length <= 1 && !root.isLeaf) {
        isShared ||= root.isShared;
        this._root = root = root.keys.length === 0 ? EmptyLeaf : root.children[0];
      }
      if (isShared) {
        root.isShared = true;
      }
    }
  }
};
var BNode = class _BNode {
  get isLeaf() {
    return this.children === void 0;
  }
  constructor(keys = [], values) {
    this.keys = keys;
    this.values = values || undefVals;
    this.isShared = void 0;
  }
  // /////////////////////////////////////////////////////////////////////////
  // Shared methods /////////////////////////////////////////////////////////
  maxKey() {
    return this.keys[this.keys.length - 1];
  }
  // If key not found, returns i^failXor where i is the insertion index.
  // Callers that don't care whether there was a match will set failXor=0.
  indexOf(key, failXor, cmp) {
    const keys = this.keys;
    let lo = 0, hi = keys.length, mid = hi >> 1;
    while (lo < hi) {
      const c = cmp(keys[mid], key);
      if (c < 0) lo = mid + 1;
      else if (c > 0)
        hi = mid;
      else if (c === 0) return mid;
      else {
        if (key === key)
          return keys.length;
        else throw new Error(`BTree: NaN was used as a key`);
      }
      mid = lo + hi >> 1;
    }
    return mid ^ failXor;
  }
  // ///////////////////////////////////////////////////////////////////////////
  // Leaf Node: misc //////////////////////////////////////////////////////////
  minKey() {
    return this.keys[0];
  }
  minPair(reusedArray) {
    if (this.keys.length === 0) return void 0;
    reusedArray[0] = this.keys[0];
    reusedArray[1] = this.values[0];
    return reusedArray;
  }
  maxPair(reusedArray) {
    if (this.keys.length === 0) return void 0;
    const lastIndex = this.keys.length - 1;
    reusedArray[0] = this.keys[lastIndex];
    reusedArray[1] = this.values[lastIndex];
    return reusedArray;
  }
  clone() {
    const v = this.values;
    return new _BNode(this.keys.slice(0), v === undefVals ? v : v.slice(0));
  }
  get(key, defaultValue, tree) {
    const i = this.indexOf(key, -1, tree._compare);
    return i < 0 ? defaultValue : this.values[i];
  }
  getPairOrNextLower(key, compare, inclusive, reusedArray) {
    const i = this.indexOf(key, -1, compare);
    const indexOrLower = i < 0 ? ~i - 1 : inclusive ? i : i - 1;
    if (indexOrLower >= 0) {
      reusedArray[0] = this.keys[indexOrLower];
      reusedArray[1] = this.values[indexOrLower];
      return reusedArray;
    }
    return void 0;
  }
  getPairOrNextHigher(key, compare, inclusive, reusedArray) {
    const i = this.indexOf(key, -1, compare);
    const indexOrLower = i < 0 ? ~i : inclusive ? i : i + 1;
    const keys = this.keys;
    if (indexOrLower < keys.length) {
      reusedArray[0] = keys[indexOrLower];
      reusedArray[1] = this.values[indexOrLower];
      return reusedArray;
    }
    return void 0;
  }
  // ///////////////////////////////////////////////////////////////////////////
  // Leaf Node: set & node splitting //////////////////////////////////////////
  set(key, value, overwrite, tree) {
    let i = this.indexOf(key, -1, tree._compare);
    if (i < 0) {
      i = ~i;
      tree._size++;
      if (this.keys.length < tree._maxNodeSize) {
        return this.insertInLeaf(i, key, value, tree);
      } else {
        const newRightSibling = this.splitOffRightSide();
        let target = this;
        if (i > this.keys.length) {
          i -= this.keys.length;
          target = newRightSibling;
        }
        target.insertInLeaf(i, key, value, tree);
        return newRightSibling;
      }
    } else {
      if (overwrite !== false) {
        if (value !== void 0) this.reifyValues();
        this.keys[i] = key;
        this.values[i] = value;
      }
      return false;
    }
  }
  reifyValues() {
    if (this.values === undefVals)
      return this.values = this.values.slice(0, this.keys.length);
    return this.values;
  }
  insertInLeaf(i, key, value, tree) {
    this.keys.splice(i, 0, key);
    if (this.values === undefVals) {
      while (undefVals.length < tree._maxNodeSize) undefVals.push(void 0);
      if (value === void 0) {
        return true;
      } else {
        this.values = undefVals.slice(0, this.keys.length - 1);
      }
    }
    this.values.splice(i, 0, value);
    return true;
  }
  takeFromRight(rhs) {
    let v = this.values;
    if (rhs.values === undefVals) {
      if (v !== undefVals) v.push(void 0);
    } else {
      v = this.reifyValues();
      v.push(rhs.values.shift());
    }
    this.keys.push(rhs.keys.shift());
  }
  takeFromLeft(lhs) {
    let v = this.values;
    if (lhs.values === undefVals) {
      if (v !== undefVals) v.unshift(void 0);
    } else {
      v = this.reifyValues();
      v.unshift(lhs.values.pop());
    }
    this.keys.unshift(lhs.keys.pop());
  }
  splitOffRightSide() {
    const half = this.keys.length >> 1, keys = this.keys.splice(half);
    const values = this.values === undefVals ? undefVals : this.values.splice(half);
    return new _BNode(keys, values);
  }
  // ///////////////////////////////////////////////////////////////////////////
  // Leaf Node: scanning & deletions //////////////////////////////////////////
  forRange(low, high, includeHigh, editMode, tree, count2, onFound) {
    const cmp = tree._compare;
    let iLow, iHigh;
    if (high === low) {
      if (!includeHigh) return count2;
      iHigh = (iLow = this.indexOf(low, -1, cmp)) + 1;
      if (iLow < 0) return count2;
    } else {
      iLow = this.indexOf(low, 0, cmp);
      iHigh = this.indexOf(high, -1, cmp);
      if (iHigh < 0) iHigh = ~iHigh;
      else if (includeHigh === true) iHigh++;
    }
    const keys = this.keys, values = this.values;
    if (onFound !== void 0) {
      for (let i = iLow; i < iHigh; i++) {
        const key = keys[i];
        const result = onFound(key, values[i], count2++);
        if (result !== void 0) {
          if (editMode === true) {
            if (key !== keys[i] || this.isShared === true)
              throw new Error(`BTree illegally changed or cloned in editRange`);
            if (result.delete) {
              this.keys.splice(i, 1);
              if (this.values !== undefVals) this.values.splice(i, 1);
              tree._size--;
              i--;
              iHigh--;
            } else if (result.hasOwnProperty(`value`)) {
              values[i] = result.value;
            }
          }
          if (result.break !== void 0) return result;
        }
      }
    } else count2 += iHigh - iLow;
    return count2;
  }
  /** Adds entire contents of right-hand sibling (rhs is left unchanged) */
  mergeSibling(rhs, _) {
    this.keys.push.apply(this.keys, rhs.keys);
    if (this.values === undefVals) {
      if (rhs.values === undefVals) return;
      this.values = this.values.slice(0, this.keys.length);
    }
    this.values.push.apply(this.values, rhs.reifyValues());
  }
};
var BNodeInternal = class _BNodeInternal extends BNode {
  /**
   * This does not mark `children` as shared, so it is the responsibility of the caller
   * to ensure children are either marked shared, or aren't included in another tree.
   */
  constructor(children, keys) {
    if (!keys) {
      keys = [];
      for (let i = 0; i < children.length; i++) keys[i] = children[i].maxKey();
    }
    super(keys);
    this.children = children;
  }
  minKey() {
    return this.children[0].minKey();
  }
  minPair(reusedArray) {
    return this.children[0].minPair(reusedArray);
  }
  maxPair(reusedArray) {
    return this.children[this.children.length - 1].maxPair(reusedArray);
  }
  get(key, defaultValue, tree) {
    const i = this.indexOf(key, 0, tree._compare), children = this.children;
    return i < children.length ? children[i].get(key, defaultValue, tree) : void 0;
  }
  getPairOrNextLower(key, compare, inclusive, reusedArray) {
    const i = this.indexOf(key, 0, compare), children = this.children;
    if (i >= children.length) return this.maxPair(reusedArray);
    const result = children[i].getPairOrNextLower(
      key,
      compare,
      inclusive,
      reusedArray
    );
    if (result === void 0 && i > 0) {
      return children[i - 1].maxPair(reusedArray);
    }
    return result;
  }
  getPairOrNextHigher(key, compare, inclusive, reusedArray) {
    const i = this.indexOf(key, 0, compare), children = this.children, length = children.length;
    if (i >= length) return void 0;
    const result = children[i].getPairOrNextHigher(
      key,
      compare,
      inclusive,
      reusedArray
    );
    if (result === void 0 && i < length - 1) {
      return children[i + 1].minPair(reusedArray);
    }
    return result;
  }
  // ///////////////////////////////////////////////////////////////////////////
  // Internal Node: set & node splitting //////////////////////////////////////
  set(key, value, overwrite, tree) {
    const c = this.children, max = tree._maxNodeSize, cmp = tree._compare;
    let i = Math.min(this.indexOf(key, 0, cmp), c.length - 1), child = c[i];
    if (child.isShared) c[i] = child = child.clone();
    if (child.keys.length >= max) {
      let other;
      if (i > 0 && (other = c[i - 1]).keys.length < max && cmp(child.keys[0], key) < 0) {
        if (other.isShared) c[i - 1] = other = other.clone();
        other.takeFromRight(child);
        this.keys[i - 1] = other.maxKey();
      } else if ((other = c[i + 1]) !== void 0 && other.keys.length < max && cmp(child.maxKey(), key) < 0) {
        if (other.isShared) c[i + 1] = other = other.clone();
        other.takeFromLeft(child);
        this.keys[i] = c[i].maxKey();
      }
    }
    const result = child.set(key, value, overwrite, tree);
    if (result === false) return false;
    this.keys[i] = child.maxKey();
    if (result === true) return true;
    if (this.keys.length < max) {
      this.insert(i + 1, result);
      return true;
    } else {
      const newRightSibling = this.splitOffRightSide();
      let target = this;
      if (cmp(result.maxKey(), this.maxKey()) > 0) {
        target = newRightSibling;
        i -= this.keys.length;
      }
      target.insert(i + 1, result);
      return newRightSibling;
    }
  }
  /**
   * Inserts `child` at index `i`.
   * This does not mark `child` as shared, so it is the responsibility of the caller
   * to ensure that either child is marked shared, or it is not included in another tree.
   */
  insert(i, child) {
    this.children.splice(i, 0, child);
    this.keys.splice(i, 0, child.maxKey());
  }
  /**
   * Split this node.
   * Modifies this to remove the second half of the items, returning a separate node containing them.
   */
  splitOffRightSide() {
    const half = this.children.length >> 1;
    return new _BNodeInternal(
      this.children.splice(half),
      this.keys.splice(half)
    );
  }
  takeFromRight(rhs) {
    this.keys.push(rhs.keys.shift());
    this.children.push(rhs.children.shift());
  }
  takeFromLeft(lhs) {
    this.keys.unshift(lhs.keys.pop());
    this.children.unshift(lhs.children.pop());
  }
  // ///////////////////////////////////////////////////////////////////////////
  // Internal Node: scanning & deletions //////////////////////////////////////
  // Note: `count` is the next value of the third argument to `onFound`.
  //       A leaf node's `forRange` function returns a new value for this counter,
  //       unless the operation is to stop early.
  forRange(low, high, includeHigh, editMode, tree, count2, onFound) {
    const cmp = tree._compare;
    const keys = this.keys, children = this.children;
    let iLow = this.indexOf(low, 0, cmp), i = iLow;
    const iHigh = Math.min(
      high === low ? iLow : this.indexOf(high, 0, cmp),
      keys.length - 1
    );
    if (!editMode) {
      for (; i <= iHigh; i++) {
        const result = children[i].forRange(
          low,
          high,
          includeHigh,
          editMode,
          tree,
          count2,
          onFound
        );
        if (typeof result !== `number`) return result;
        count2 = result;
      }
    } else if (i <= iHigh) {
      try {
        for (; i <= iHigh; i++) {
          if (children[i].isShared) children[i] = children[i].clone();
          const result = children[i].forRange(
            low,
            high,
            includeHigh,
            editMode,
            tree,
            count2,
            onFound
          );
          keys[i] = children[i].maxKey();
          if (typeof result !== `number`) return result;
          count2 = result;
        }
      } finally {
        const half = tree._maxNodeSize >> 1;
        if (iLow > 0) iLow--;
        for (i = iHigh; i >= iLow; i--) {
          if (children[i].keys.length <= half) {
            if (children[i].keys.length !== 0) {
              this.tryMerge(i, tree._maxNodeSize);
            } else {
              keys.splice(i, 1);
              children.splice(i, 1);
            }
          }
        }
        if (children.length !== 0 && children[0].keys.length === 0)
          check(false, `emptiness bug`);
      }
    }
    return count2;
  }
  /** Merges child i with child i+1 if their combined size is not too large */
  tryMerge(i, maxSize) {
    const children = this.children;
    if (i >= 0 && i + 1 < children.length) {
      if (children[i].keys.length + children[i + 1].keys.length <= maxSize) {
        if (children[i].isShared)
          children[i] = children[i].clone();
        children[i].mergeSibling(children[i + 1], maxSize);
        children.splice(i + 1, 1);
        this.keys.splice(i + 1, 1);
        this.keys[i] = children[i].maxKey();
        return true;
      }
    }
    return false;
  }
  /**
   * Move children from `rhs` into this.
   * `rhs` must be part of this tree, and be removed from it after this call
   * (otherwise isShared for its children could be incorrect).
   */
  mergeSibling(rhs, maxNodeSize) {
    const oldLength = this.keys.length;
    this.keys.push.apply(this.keys, rhs.keys);
    const rhsChildren = rhs.children;
    this.children.push.apply(this.children, rhsChildren);
    if (rhs.isShared && !this.isShared) {
      for (const child of rhsChildren) child.isShared = true;
    }
    this.tryMerge(oldLength - 1, maxNodeSize);
  }
};
var undefVals = [];
var Delete = { delete: true };
var DeleteRange = () => Delete;
var EmptyLeaf = (function() {
  const n = new BNode();
  n.isShared = true;
  return n;
})();
var ReusedArray = [];
function check(fact, ...args) {
  {
    args.unshift(`B+ tree`);
    throw new Error(args.join(` `));
  }
}

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/query/builder/ref-proxy.js
function createSingleRowRefProxy() {
  const cache = /* @__PURE__ */ new Map();
  function createProxy(path3) {
    const pathKey = path3.join(`.`);
    if (cache.has(pathKey)) {
      return cache.get(pathKey);
    }
    const proxy = new Proxy({}, {
      get(target, prop, receiver) {
        if (prop === `__refProxy`) return true;
        if (prop === `__path`) return path3;
        if (prop === `__type`) return void 0;
        if (typeof prop === `symbol`) return Reflect.get(target, prop, receiver);
        const newPath = [...path3, String(prop)];
        return createProxy(newPath);
      },
      has(target, prop) {
        if (prop === `__refProxy` || prop === `__path` || prop === `__type`)
          return true;
        return Reflect.has(target, prop);
      },
      ownKeys(target) {
        return Reflect.ownKeys(target);
      },
      getOwnPropertyDescriptor(target, prop) {
        if (prop === `__refProxy` || prop === `__path` || prop === `__type`) {
          return { enumerable: false, configurable: true };
        }
        return Reflect.getOwnPropertyDescriptor(target, prop);
      }
    });
    cache.set(pathKey, proxy);
    return proxy;
  }
  return createProxy([]);
}
function toExpression(value) {
  if (isRefProxy(value)) {
    return new PropRef(value.__path);
  }
  if (value && typeof value === `object` && `type` in value && (value.type === `func` || value.type === `ref` || value.type === `val` || value.type === `agg`)) {
    return value;
  }
  return new Value(value);
}
function isRefProxy(value) {
  return value && typeof value === `object` && value.__refProxy === true;
}

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/query/builder/functions.js
function eq(left, right) {
  return new Func(`eq`, [toExpression(left), toExpression(right)]);
}
function gt(left, right) {
  return new Func(`gt`, [toExpression(left), toExpression(right)]);
}
function gte(left, right) {
  return new Func(`gte`, [toExpression(left), toExpression(right)]);
}
function lt(left, right) {
  return new Func(`lt`, [toExpression(left), toExpression(right)]);
}
function and(left, right, ...rest) {
  const allArgs = [left, right, ...rest];
  return new Func(
    `and`,
    allArgs.map((arg) => toExpression(arg))
  );
}
function or(left, right, ...rest) {
  const allArgs = [left, right, ...rest];
  return new Func(
    `or`,
    allArgs.map((arg) => toExpression(arg))
  );
}

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/indexes/base-index.js
var BaseIndex = class {
  constructor(id, expression, name, options) {
    this.lookupCount = 0;
    this.totalLookupTime = 0;
    this.lastUpdated = /* @__PURE__ */ new Date();
    this.id = id;
    this.expression = expression;
    this.compareOptions = DEFAULT_COMPARE_OPTIONS;
    this.name = name;
    this.initialize(options);
  }
  // Common methods
  supports(operation) {
    return this.supportedOperations.has(operation);
  }
  matchesField(fieldPath) {
    return this.expression.type === `ref` && this.expression.path.length === fieldPath.length && this.expression.path.every((part, i) => part === fieldPath[i]);
  }
  /**
   * Checks if the compare options match the index's compare options.
   * The direction is ignored because the index can be reversed if the direction is different.
   */
  matchesCompareOptions(compareOptions) {
    const thisCompareOptionsWithoutDirection = {
      ...this.compareOptions,
      direction: void 0
    };
    const compareOptionsWithoutDirection = {
      ...compareOptions,
      direction: void 0
    };
    return deepEquals(
      thisCompareOptionsWithoutDirection,
      compareOptionsWithoutDirection
    );
  }
  /**
   * Checks if the index matches the provided direction.
   */
  matchesDirection(direction) {
    return this.compareOptions.direction === direction;
  }
  getStats() {
    return {
      entryCount: this.keyCount,
      lookupCount: this.lookupCount,
      averageLookupTime: this.lookupCount > 0 ? this.totalLookupTime / this.lookupCount : 0,
      lastUpdated: this.lastUpdated
    };
  }
  evaluateIndexExpression(item) {
    const evaluator = compileSingleRowExpression(this.expression);
    return evaluator(item);
  }
  trackLookup(startTime) {
    const duration = performance.now() - startTime;
    this.lookupCount++;
    this.totalLookupTime += duration;
  }
  updateTimestamp() {
    this.lastUpdated = /* @__PURE__ */ new Date();
  }
};

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/indexes/btree-index.js
var BTreeIndex = class extends BaseIndex {
  constructor(id, expression, name, options) {
    super(id, expression, name, options);
    this.supportedOperations = /* @__PURE__ */ new Set([
      `eq`,
      `gt`,
      `gte`,
      `lt`,
      `lte`,
      `in`
    ]);
    this.valueMap = /* @__PURE__ */ new Map();
    this.indexedKeys = /* @__PURE__ */ new Set();
    this.compareFn = defaultComparator;
    const baseCompareFn = options?.compareFn ?? defaultComparator;
    this.compareFn = (a, b) => baseCompareFn(denormalizeUndefined(a), denormalizeUndefined(b));
    if (options?.compareOptions) {
      this.compareOptions = options.compareOptions;
    }
    this.orderedEntries = new BTree(this.compareFn);
  }
  initialize(_options) {
  }
  /**
   * Adds a value to the index
   */
  add(key, item) {
    let indexedValue;
    try {
      indexedValue = this.evaluateIndexExpression(item);
    } catch (error) {
      throw new Error(
        `Failed to evaluate index expression for key ${key}: ${error}`
      );
    }
    const normalizedValue = normalizeForBTree(indexedValue);
    if (this.valueMap.has(normalizedValue)) {
      this.valueMap.get(normalizedValue).add(key);
    } else {
      const keySet = /* @__PURE__ */ new Set([key]);
      this.valueMap.set(normalizedValue, keySet);
      this.orderedEntries.set(normalizedValue, void 0);
    }
    this.indexedKeys.add(key);
    this.updateTimestamp();
  }
  /**
   * Removes a value from the index
   */
  remove(key, item) {
    let indexedValue;
    try {
      indexedValue = this.evaluateIndexExpression(item);
    } catch (error) {
      console.warn(
        `Failed to evaluate index expression for key ${key} during removal:`,
        error
      );
      return;
    }
    const normalizedValue = normalizeForBTree(indexedValue);
    if (this.valueMap.has(normalizedValue)) {
      const keySet = this.valueMap.get(normalizedValue);
      keySet.delete(key);
      if (keySet.size === 0) {
        this.valueMap.delete(normalizedValue);
        this.orderedEntries.delete(normalizedValue);
      }
    }
    this.indexedKeys.delete(key);
    this.updateTimestamp();
  }
  /**
   * Updates a value in the index
   */
  update(key, oldItem, newItem) {
    this.remove(key, oldItem);
    this.add(key, newItem);
  }
  /**
   * Builds the index from a collection of entries
   */
  build(entries) {
    this.clear();
    for (const [key, item] of entries) {
      this.add(key, item);
    }
  }
  /**
   * Clears all data from the index
   */
  clear() {
    this.orderedEntries.clear();
    this.valueMap.clear();
    this.indexedKeys.clear();
    this.updateTimestamp();
  }
  /**
   * Performs a lookup operation
   */
  lookup(operation, value) {
    const startTime = performance.now();
    let result;
    switch (operation) {
      case `eq`:
        result = this.equalityLookup(value);
        break;
      case `gt`:
        result = this.rangeQuery({ from: value, fromInclusive: false });
        break;
      case `gte`:
        result = this.rangeQuery({ from: value, fromInclusive: true });
        break;
      case `lt`:
        result = this.rangeQuery({ to: value, toInclusive: false });
        break;
      case `lte`:
        result = this.rangeQuery({ to: value, toInclusive: true });
        break;
      case `in`:
        result = this.inArrayLookup(value);
        break;
      default:
        throw new Error(`Operation ${operation} not supported by BTreeIndex`);
    }
    this.trackLookup(startTime);
    return result;
  }
  /**
   * Gets the number of indexed keys
   */
  get keyCount() {
    return this.indexedKeys.size;
  }
  // Public methods for backward compatibility (used by tests)
  /**
   * Performs an equality lookup
   */
  equalityLookup(value) {
    const normalizedValue = normalizeForBTree(value);
    return new Set(this.valueMap.get(normalizedValue) ?? []);
  }
  /**
   * Performs a range query with options
   * This is more efficient for compound queries like "WHERE a > 5 AND a < 10"
   */
  rangeQuery(options = {}) {
    const { from, to, fromInclusive = true, toInclusive = true } = options;
    const result = /* @__PURE__ */ new Set();
    const hasFrom = `from` in options;
    const hasTo = `to` in options;
    const fromKey = hasFrom ? normalizeForBTree(from) : this.orderedEntries.minKey();
    const toKey = hasTo ? normalizeForBTree(to) : this.orderedEntries.maxKey();
    this.orderedEntries.forRange(
      fromKey,
      toKey,
      toInclusive,
      (indexedValue, _) => {
        if (!fromInclusive && this.compareFn(indexedValue, from) === 0) {
          return;
        }
        const keys = this.valueMap.get(indexedValue);
        if (keys) {
          keys.forEach((key) => result.add(key));
        }
      }
    );
    return result;
  }
  /**
   * Performs a reversed range query
   */
  rangeQueryReversed(options = {}) {
    const { from, to, fromInclusive = true, toInclusive = true } = options;
    const hasFrom = `from` in options;
    const hasTo = `to` in options;
    return this.rangeQuery({
      from: hasTo ? to : this.orderedEntries.maxKey(),
      to: hasFrom ? from : this.orderedEntries.minKey(),
      fromInclusive: toInclusive,
      toInclusive: fromInclusive
    });
  }
  /**
   * Internal method for taking items from the index.
   * @param n - The number of items to return
   * @param nextPair - Function to get the next pair from the BTree
   * @param from - Already normalized! undefined means "start from beginning/end", sentinel means "start from the key undefined"
   * @param filterFn - Optional filter function
   * @param reversed - Whether to reverse the order of keys within each value
   */
  takeInternal(n, nextPair, from, filterFn, reversed = false) {
    const keysInResult = /* @__PURE__ */ new Set();
    const result = [];
    let pair;
    let key = from;
    while ((pair = nextPair(key)) !== void 0 && result.length < n) {
      key = pair[0];
      const keys = this.valueMap.get(key);
      if (keys && keys.size > 0) {
        const sorted = Array.from(keys).sort(compareKeys);
        if (reversed) sorted.reverse();
        for (const ks of sorted) {
          if (result.length >= n) break;
          if (!keysInResult.has(ks) && (filterFn?.(ks) ?? true)) {
            result.push(ks);
            keysInResult.add(ks);
          }
        }
      }
    }
    return result;
  }
  /**
   * Returns the next n items after the provided item.
   * @param n - The number of items to return
   * @param from - The item to start from (exclusive).
   * @returns The next n items after the provided key.
   */
  take(n, from, filterFn) {
    const nextPair = (k) => this.orderedEntries.nextHigherPair(k);
    const normalizedFrom = normalizeForBTree(from);
    return this.takeInternal(n, nextPair, normalizedFrom, filterFn);
  }
  /**
   * Returns the first n items from the beginning.
   * @param n - The number of items to return
   * @param filterFn - Optional filter function
   * @returns The first n items
   */
  takeFromStart(n, filterFn) {
    const nextPair = (k) => this.orderedEntries.nextHigherPair(k);
    return this.takeInternal(n, nextPair, void 0, filterFn);
  }
  /**
   * Returns the next n items **before** the provided item (in descending order).
   * @param n - The number of items to return
   * @param from - The item to start from (exclusive). Required.
   * @returns The next n items **before** the provided key.
   */
  takeReversed(n, from, filterFn) {
    const nextPair = (k) => this.orderedEntries.nextLowerPair(k);
    const normalizedFrom = normalizeForBTree(from);
    return this.takeInternal(n, nextPair, normalizedFrom, filterFn, true);
  }
  /**
   * Returns the last n items from the end.
   * @param n - The number of items to return
   * @param filterFn - Optional filter function
   * @returns The last n items
   */
  takeReversedFromEnd(n, filterFn) {
    const nextPair = (k) => this.orderedEntries.nextLowerPair(k);
    return this.takeInternal(n, nextPair, void 0, filterFn, true);
  }
  /**
   * Performs an IN array lookup
   */
  inArrayLookup(values) {
    const result = /* @__PURE__ */ new Set();
    for (const value of values) {
      const normalizedValue = normalizeForBTree(value);
      const keys = this.valueMap.get(normalizedValue);
      if (keys) {
        keys.forEach((key) => result.add(key));
      }
    }
    return result;
  }
  // Getter methods for testing compatibility
  get indexedKeysSet() {
    return this.indexedKeys;
  }
  get orderedEntriesArray() {
    return this.orderedEntries.keysArray().map((key) => [
      denormalizeUndefined(key),
      this.valueMap.get(key) ?? /* @__PURE__ */ new Set()
    ]);
  }
  get orderedEntriesArrayReversed() {
    return this.takeReversedFromEnd(this.orderedEntries.size).map((key) => [
      denormalizeUndefined(key),
      this.valueMap.get(key) ?? /* @__PURE__ */ new Set()
    ]);
  }
  get valueMapData() {
    const result = /* @__PURE__ */ new Map();
    for (const [key, value] of this.valueMap) {
      result.set(denormalizeUndefined(key), value);
    }
    return result;
  }
};

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/indexes/auto-index.js
function shouldAutoIndex(collection) {
  if (collection.config.autoIndex !== `eager`) {
    return false;
  }
  return true;
}
function ensureIndexForField(fieldName, fieldPath, collection, compareOptions, compareFn) {
  if (!shouldAutoIndex(collection)) {
    return;
  }
  const compareOpts = compareOptions ?? {
    ...DEFAULT_COMPARE_OPTIONS,
    ...collection.compareOptions
  };
  const existingIndex = Array.from(collection.indexes.values()).find(
    (index) => index.matchesField(fieldPath) && index.matchesCompareOptions(compareOpts)
  );
  if (existingIndex) {
    return;
  }
  try {
    collection.createIndex(
      (row) => {
        let current = row;
        for (const part of fieldPath) {
          current = current[part];
        }
        return current;
      },
      {
        name: `auto:${fieldPath.join(`.`)}`,
        indexType: BTreeIndex,
        options: compareFn ? { compareFn, compareOptions: compareOpts } : {}
      }
    );
  } catch (error) {
    console.warn(
      `${collection.id ? `[${collection.id}] ` : ``}Failed to create auto-index for field path "${fieldPath.join(`.`)}":`,
      error
    );
  }
}
function ensureIndexForExpression(expression, collection) {
  if (!shouldAutoIndex(collection)) {
    return;
  }
  const indexableExpressions = extractIndexableExpressions(expression);
  for (const { fieldName, fieldPath } of indexableExpressions) {
    ensureIndexForField(fieldName, fieldPath, collection);
  }
}
function extractIndexableExpressions(expression) {
  const results = [];
  function extractFromExpression(expr) {
    if (expr.type !== `func`) {
      return;
    }
    const func = expr;
    if (func.name === `and`) {
      for (const arg of func.args) {
        extractFromExpression(arg);
      }
      return;
    }
    const supportedOperations = [`eq`, `gt`, `gte`, `lt`, `lte`, `in`];
    if (!supportedOperations.includes(func.name)) {
      return;
    }
    if (func.args.length < 1 || func.args[0].type !== `ref`) {
      return;
    }
    const fieldRef = func.args[0];
    const fieldPath = fieldRef.path;
    if (fieldPath.length === 0) {
      return;
    }
    const fieldName = fieldPath.join(`_`);
    results.push({ fieldName, fieldPath });
  }
  extractFromExpression(expression);
  return results;
}

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/query/compiler/order-by.js
function buildCompareOptions(clause, collection) {
  if (clause.compareOptions.stringSort !== void 0) {
    return clause.compareOptions;
  }
  return {
    ...collection.compareOptions,
    direction: clause.compareOptions.direction,
    nulls: clause.compareOptions.nulls
  };
}

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/collection/change-events.js
function currentStateAsChanges(collection, options = {}) {
  const collectFilteredResults = (filterFn) => {
    const result = [];
    for (const [key, value] of collection.entries()) {
      if (filterFn?.(value) ?? true) {
        result.push({
          type: `insert`,
          key,
          value
        });
      }
    }
    return result;
  };
  if (options.limit !== void 0 && !options.orderBy) {
    throw new Error(`limit cannot be used without orderBy`);
  }
  if (options.orderBy) {
    const whereFilter = options.where ? createFilterFunctionFromExpression(options.where) : void 0;
    const orderedKeys = getOrderedKeys(
      collection,
      options.orderBy,
      options.limit,
      whereFilter,
      options.optimizedOnly
    );
    if (orderedKeys === void 0) {
      return;
    }
    const result = [];
    for (const key of orderedKeys) {
      const value = collection.get(key);
      if (value !== void 0) {
        result.push({
          type: `insert`,
          key,
          value
        });
      }
    }
    return result;
  }
  if (!options.where) {
    return collectFilteredResults();
  }
  try {
    const expression = options.where;
    const optimizationResult = optimizeExpressionWithIndexes(
      expression,
      collection
    );
    if (optimizationResult.canOptimize) {
      const result = [];
      for (const key of optimizationResult.matchingKeys) {
        const value = collection.get(key);
        if (value !== void 0) {
          result.push({
            type: `insert`,
            key,
            value
          });
        }
      }
      return result;
    } else {
      if (options.optimizedOnly) {
        return;
      }
      const filterFn = createFilterFunctionFromExpression(expression);
      return collectFilteredResults(filterFn);
    }
  } catch (error) {
    console.warn(
      `${collection.id ? `[${collection.id}] ` : ``}Error processing where clause, falling back to full scan:`,
      error
    );
    const filterFn = createFilterFunctionFromExpression(options.where);
    if (options.optimizedOnly) {
      return;
    }
    return collectFilteredResults(filterFn);
  }
}
function createFilterFunctionFromExpression(expression) {
  const evaluator = compileSingleRowExpression(expression);
  return (item) => {
    try {
      const result = evaluator(item);
      return toBooleanPredicate(result);
    } catch {
      return false;
    }
  };
}
function createFilteredCallback(originalCallback, options) {
  const filterFn = createFilterFunctionFromExpression(options.whereExpression);
  return (changes) => {
    const filteredChanges = [];
    for (const change of changes) {
      if (change.type === `insert`) {
        if (filterFn(change.value)) {
          filteredChanges.push(change);
        }
      } else if (change.type === `update`) {
        const newValueMatches = filterFn(change.value);
        const oldValueMatches = change.previousValue ? filterFn(change.previousValue) : false;
        if (newValueMatches && oldValueMatches) {
          filteredChanges.push(change);
        } else if (newValueMatches && !oldValueMatches) {
          filteredChanges.push({
            ...change,
            type: `insert`
          });
        } else if (!newValueMatches && oldValueMatches) {
          filteredChanges.push({
            ...change,
            type: `delete`,
            value: change.previousValue
            // Use the previous value for the delete
          });
        }
      } else {
        if (filterFn(change.value)) {
          filteredChanges.push(change);
        }
      }
    }
    if (filteredChanges.length > 0 || changes.length === 0) {
      originalCallback(filteredChanges);
    }
  };
}
function getOrderedKeys(collection, orderBy, limit, whereFilter, optimizedOnly) {
  if (orderBy.length === 1) {
    const clause = orderBy[0];
    const orderByExpression = clause.expression;
    if (orderByExpression.type === `ref`) {
      const propRef = orderByExpression;
      const fieldPath = propRef.path;
      const compareOpts = buildCompareOptions(clause, collection);
      ensureIndexForField(
        fieldPath[0],
        fieldPath,
        collection,
        compareOpts
      );
      const index = findIndexForField(collection, fieldPath, compareOpts);
      if (index && index.supports(`gt`)) {
        const filterFn = (key) => {
          const value = collection.get(key);
          if (value === void 0) {
            return false;
          }
          return whereFilter?.(value) ?? true;
        };
        return index.takeFromStart(limit ?? index.keyCount, filterFn);
      }
    }
  }
  if (optimizedOnly) {
    return;
  }
  const allItems = [];
  for (const [key, value] of collection.entries()) {
    if (whereFilter?.(value) ?? true) {
      allItems.push({ key, value });
    }
  }
  const compare = (a, b) => {
    for (const clause of orderBy) {
      const compareFn = makeComparator(clause.compareOptions);
      const aValue = extractValueFromItem(a.value, clause.expression);
      const bValue = extractValueFromItem(b.value, clause.expression);
      const result = compareFn(aValue, bValue);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  };
  allItems.sort(compare);
  const sortedKeys = allItems.map((item) => item.key);
  if (limit !== void 0) {
    return sortedKeys.slice(0, limit);
  }
  return sortedKeys;
}
function extractValueFromItem(item, expression) {
  if (expression.type === `ref`) {
    const propRef = expression;
    let value = item;
    for (const pathPart of propRef.path) {
      value = value?.[pathPart];
    }
    return value;
  } else if (expression.type === `val`) {
    return expression.value;
  } else {
    const evaluator = compileSingleRowExpression(expression);
    return evaluator(item);
  }
}

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/SortedMap.js
var SortedMap = class {
  /**
   * Creates a new SortedMap instance
   *
   * @param comparator - Optional function to compare values for sorting.
   *                     If not provided, entries are sorted by key only.
   */
  constructor(comparator) {
    this.map = /* @__PURE__ */ new Map();
    this.sortedKeys = [];
    this.comparator = comparator;
  }
  /**
   * Finds the index where a key-value pair should be inserted to maintain sort order.
   * Uses binary search to find the correct position based on the value (if comparator provided),
   * with key-based tie-breaking for deterministic ordering when values compare as equal.
   * If no comparator is provided, sorts by key only.
   * Runs in O(log n) time.
   *
   * @param key - The key to find position for (used as tie-breaker or primary sort when no comparator)
   * @param value - The value to compare against (only used if comparator is provided)
   * @returns The index where the key should be inserted
   */
  indexOf(key, value) {
    let left = 0;
    let right = this.sortedKeys.length;
    if (!this.comparator) {
      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const midKey = this.sortedKeys[mid];
        const keyComparison = compareKeys(key, midKey);
        if (keyComparison < 0) {
          right = mid;
        } else if (keyComparison > 0) {
          left = mid + 1;
        } else {
          return mid;
        }
      }
      return left;
    }
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      const midKey = this.sortedKeys[mid];
      const midValue = this.map.get(midKey);
      const valueComparison = this.comparator(value, midValue);
      if (valueComparison < 0) {
        right = mid;
      } else if (valueComparison > 0) {
        left = mid + 1;
      } else {
        const keyComparison = compareKeys(key, midKey);
        if (keyComparison < 0) {
          right = mid;
        } else if (keyComparison > 0) {
          left = mid + 1;
        } else {
          return mid;
        }
      }
    }
    return left;
  }
  /**
   * Sets a key-value pair in the map and maintains sort order
   *
   * @param key - The key to set
   * @param value - The value to associate with the key
   * @returns This SortedMap instance for chaining
   */
  set(key, value) {
    if (this.map.has(key)) {
      const oldValue = this.map.get(key);
      const oldIndex = this.indexOf(key, oldValue);
      this.sortedKeys.splice(oldIndex, 1);
    }
    const index = this.indexOf(key, value);
    this.sortedKeys.splice(index, 0, key);
    this.map.set(key, value);
    return this;
  }
  /**
   * Gets a value by its key
   *
   * @param key - The key to look up
   * @returns The value associated with the key, or undefined if not found
   */
  get(key) {
    return this.map.get(key);
  }
  /**
   * Removes a key-value pair from the map
   *
   * @param key - The key to remove
   * @returns True if the key was found and removed, false otherwise
   */
  delete(key) {
    if (this.map.has(key)) {
      const oldValue = this.map.get(key);
      const index = this.indexOf(key, oldValue);
      this.sortedKeys.splice(index, 1);
      return this.map.delete(key);
    }
    return false;
  }
  /**
   * Checks if a key exists in the map
   *
   * @param key - The key to check
   * @returns True if the key exists, false otherwise
   */
  has(key) {
    return this.map.has(key);
  }
  /**
   * Removes all key-value pairs from the map
   */
  clear() {
    this.map.clear();
    this.sortedKeys = [];
  }
  /**
   * Gets the number of key-value pairs in the map
   */
  get size() {
    return this.map.size;
  }
  /**
   * Default iterator that returns entries in sorted order
   *
   * @returns An iterator for the map's entries
   */
  *[Symbol.iterator]() {
    for (const key of this.sortedKeys) {
      yield [key, this.map.get(key)];
    }
  }
  /**
   * Returns an iterator for the map's entries in sorted order
   *
   * @returns An iterator for the map's entries
   */
  entries() {
    return this[Symbol.iterator]();
  }
  /**
   * Returns an iterator for the map's keys in sorted order
   *
   * @returns An iterator for the map's keys
   */
  keys() {
    return this.sortedKeys[Symbol.iterator]();
  }
  /**
   * Returns an iterator for the map's values in sorted order
   *
   * @returns An iterator for the map's values
   */
  values() {
    return (function* () {
      for (const key of this.sortedKeys) {
        yield this.map.get(key);
      }
    }).call(this);
  }
  /**
   * Executes a callback function for each key-value pair in the map in sorted order
   *
   * @param callbackfn - Function to execute for each entry
   */
  forEach(callbackfn) {
    for (const key of this.sortedKeys) {
      callbackfn(this.map.get(key), key, this.map);
    }
  }
};

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/collection/state.js
var CollectionStateManager = class {
  /**
   * Creates a new CollectionState manager
   */
  constructor(config) {
    this.pendingSyncedTransactions = [];
    this.syncedMetadata = /* @__PURE__ */ new Map();
    this.optimisticUpserts = /* @__PURE__ */ new Map();
    this.optimisticDeletes = /* @__PURE__ */ new Set();
    this.size = 0;
    this.syncedKeys = /* @__PURE__ */ new Set();
    this.preSyncVisibleState = /* @__PURE__ */ new Map();
    this.recentlySyncedKeys = /* @__PURE__ */ new Set();
    this.hasReceivedFirstCommit = false;
    this.isCommittingSyncTransactions = false;
    this.commitPendingTransactions = () => {
      let hasPersistingTransaction = false;
      for (const transaction of this.transactions.values()) {
        if (transaction.state === `persisting`) {
          hasPersistingTransaction = true;
          break;
        }
      }
      const {
        committedSyncedTransactions,
        uncommittedSyncedTransactions,
        hasTruncateSync,
        hasImmediateSync
      } = this.pendingSyncedTransactions.reduce(
        (acc, t2) => {
          if (t2.committed) {
            acc.committedSyncedTransactions.push(t2);
            if (t2.truncate) {
              acc.hasTruncateSync = true;
            }
            if (t2.immediate) {
              acc.hasImmediateSync = true;
            }
          } else {
            acc.uncommittedSyncedTransactions.push(t2);
          }
          return acc;
        },
        {
          committedSyncedTransactions: [],
          uncommittedSyncedTransactions: [],
          hasTruncateSync: false,
          hasImmediateSync: false
        }
      );
      if (!hasPersistingTransaction || hasTruncateSync || hasImmediateSync) {
        this.isCommittingSyncTransactions = true;
        const truncateOptimisticSnapshot = hasTruncateSync ? committedSyncedTransactions.find((t2) => t2.truncate)?.optimisticSnapshot : null;
        const changedKeys = /* @__PURE__ */ new Set();
        for (const transaction of committedSyncedTransactions) {
          for (const operation of transaction.operations) {
            changedKeys.add(operation.key);
          }
        }
        let currentVisibleState = this.preSyncVisibleState;
        if (currentVisibleState.size === 0) {
          currentVisibleState = /* @__PURE__ */ new Map();
          for (const key of changedKeys) {
            const currentValue = this.get(key);
            if (currentValue !== void 0) {
              currentVisibleState.set(key, currentValue);
            }
          }
        }
        const events = [];
        const rowUpdateMode = this.config.sync.rowUpdateMode || `partial`;
        for (const transaction of committedSyncedTransactions) {
          if (transaction.truncate) {
            const visibleKeys = /* @__PURE__ */ new Set([
              ...this.syncedData.keys(),
              ...truncateOptimisticSnapshot?.upserts.keys() || []
            ]);
            for (const key of visibleKeys) {
              if (truncateOptimisticSnapshot?.deletes.has(key)) continue;
              const previousValue = truncateOptimisticSnapshot?.upserts.get(key) || this.syncedData.get(key);
              if (previousValue !== void 0) {
                events.push({ type: `delete`, key, value: previousValue });
              }
            }
            this.syncedData.clear();
            this.syncedMetadata.clear();
            this.syncedKeys.clear();
            for (const key of changedKeys) {
              currentVisibleState.delete(key);
            }
            this._events.emit(`truncate`, {
              type: `truncate`,
              collection: this.collection
            });
          }
          for (const operation of transaction.operations) {
            const key = operation.key;
            this.syncedKeys.add(key);
            switch (operation.type) {
              case `insert`:
                this.syncedMetadata.set(key, operation.metadata);
                break;
              case `update`:
                this.syncedMetadata.set(
                  key,
                  Object.assign(
                    {},
                    this.syncedMetadata.get(key),
                    operation.metadata
                  )
                );
                break;
              case `delete`:
                this.syncedMetadata.delete(key);
                break;
            }
            switch (operation.type) {
              case `insert`:
                this.syncedData.set(key, operation.value);
                break;
              case `update`: {
                if (rowUpdateMode === `partial`) {
                  const updatedValue = Object.assign(
                    {},
                    this.syncedData.get(key),
                    operation.value
                  );
                  this.syncedData.set(key, updatedValue);
                } else {
                  this.syncedData.set(key, operation.value);
                }
                break;
              }
              case `delete`:
                this.syncedData.delete(key);
                break;
            }
          }
        }
        if (hasTruncateSync) {
          const syncedInsertedOrUpdatedKeys = /* @__PURE__ */ new Set();
          for (const t2 of committedSyncedTransactions) {
            for (const op of t2.operations) {
              if (op.type === `insert` || op.type === `update`) {
                syncedInsertedOrUpdatedKeys.add(op.key);
              }
            }
          }
          const reapplyUpserts = new Map(
            truncateOptimisticSnapshot.upserts
          );
          const reapplyDeletes = new Set(
            truncateOptimisticSnapshot.deletes
          );
          for (const [key, value] of reapplyUpserts) {
            if (reapplyDeletes.has(key)) continue;
            if (syncedInsertedOrUpdatedKeys.has(key)) {
              let foundInsert = false;
              for (let i = events.length - 1; i >= 0; i--) {
                const evt = events[i];
                if (evt.key === key && evt.type === `insert`) {
                  evt.value = value;
                  foundInsert = true;
                  break;
                }
              }
              if (!foundInsert) {
                events.push({ type: `insert`, key, value });
              }
            } else {
              events.push({ type: `insert`, key, value });
            }
          }
          if (events.length > 0 && reapplyDeletes.size > 0) {
            const filtered = [];
            for (const evt of events) {
              if (evt.type === `insert` && reapplyDeletes.has(evt.key)) {
                continue;
              }
              filtered.push(evt);
            }
            events.length = 0;
            events.push(...filtered);
          }
          if (this.lifecycle.status !== `ready`) {
            this.lifecycle.markReady();
          }
        }
        this.optimisticUpserts.clear();
        this.optimisticDeletes.clear();
        this.isCommittingSyncTransactions = false;
        if (hasTruncateSync && truncateOptimisticSnapshot) {
          for (const [key, value] of truncateOptimisticSnapshot.upserts) {
            this.optimisticUpserts.set(key, value);
          }
          for (const key of truncateOptimisticSnapshot.deletes) {
            this.optimisticDeletes.add(key);
          }
        }
        for (const transaction of this.transactions.values()) {
          if (![`completed`, `failed`].includes(transaction.state)) {
            for (const mutation of transaction.mutations) {
              if (this.isThisCollection(mutation.collection) && mutation.optimistic) {
                switch (mutation.type) {
                  case `insert`:
                  case `update`:
                    this.optimisticUpserts.set(
                      mutation.key,
                      mutation.modified
                    );
                    this.optimisticDeletes.delete(mutation.key);
                    break;
                  case `delete`:
                    this.optimisticUpserts.delete(mutation.key);
                    this.optimisticDeletes.add(mutation.key);
                    break;
                }
              }
            }
          }
        }
        const completedOptimisticOps = /* @__PURE__ */ new Map();
        for (const transaction of this.transactions.values()) {
          if (transaction.state === `completed`) {
            for (const mutation of transaction.mutations) {
              if (mutation.optimistic && this.isThisCollection(mutation.collection) && changedKeys.has(mutation.key)) {
                completedOptimisticOps.set(mutation.key, {
                  type: mutation.type,
                  value: mutation.modified
                });
              }
            }
          }
        }
        for (const key of changedKeys) {
          const previousVisibleValue = currentVisibleState.get(key);
          const newVisibleValue = this.get(key);
          const completedOp = completedOptimisticOps.get(key);
          let isRedundantSync = false;
          if (completedOp) {
            if (completedOp.type === `delete` && previousVisibleValue !== void 0 && newVisibleValue === void 0 && deepEquals(completedOp.value, previousVisibleValue)) {
              isRedundantSync = true;
            } else if (newVisibleValue !== void 0 && deepEquals(completedOp.value, newVisibleValue)) {
              isRedundantSync = true;
            }
          }
          if (!isRedundantSync) {
            if (previousVisibleValue === void 0 && newVisibleValue !== void 0) {
              events.push({
                type: `insert`,
                key,
                value: newVisibleValue
              });
            } else if (previousVisibleValue !== void 0 && newVisibleValue === void 0) {
              events.push({
                type: `delete`,
                key,
                value: previousVisibleValue
              });
            } else if (previousVisibleValue !== void 0 && newVisibleValue !== void 0 && !deepEquals(previousVisibleValue, newVisibleValue)) {
              events.push({
                type: `update`,
                key,
                value: newVisibleValue,
                previousValue: previousVisibleValue
              });
            }
          }
        }
        this.size = this.calculateSize();
        if (events.length > 0) {
          this.indexes.updateIndexes(events);
        }
        this.changes.emitEvents(events, true);
        this.pendingSyncedTransactions = uncommittedSyncedTransactions;
        this.preSyncVisibleState.clear();
        Promise.resolve().then(() => {
          this.recentlySyncedKeys.clear();
        });
        if (!this.hasReceivedFirstCommit) {
          this.hasReceivedFirstCommit = true;
        }
      }
    };
    this.config = config;
    this.transactions = new SortedMap(
      (a, b) => a.compareCreatedAt(b)
    );
    this.syncedData = new SortedMap(config.compare);
  }
  setDeps(deps) {
    this.collection = deps.collection;
    this.lifecycle = deps.lifecycle;
    this.changes = deps.changes;
    this.indexes = deps.indexes;
    this._events = deps.events;
  }
  /**
   * Get the current value for a key (virtual derived state)
   */
  get(key) {
    const { optimisticDeletes, optimisticUpserts, syncedData } = this;
    if (optimisticDeletes.has(key)) {
      return void 0;
    }
    if (optimisticUpserts.has(key)) {
      return optimisticUpserts.get(key);
    }
    return syncedData.get(key);
  }
  /**
   * Check if a key exists in the collection (virtual derived state)
   */
  has(key) {
    const { optimisticDeletes, optimisticUpserts, syncedData } = this;
    if (optimisticDeletes.has(key)) {
      return false;
    }
    if (optimisticUpserts.has(key)) {
      return true;
    }
    return syncedData.has(key);
  }
  /**
   * Get all keys (virtual derived state)
   */
  *keys() {
    const { syncedData, optimisticDeletes, optimisticUpserts } = this;
    for (const key of syncedData.keys()) {
      if (!optimisticDeletes.has(key)) {
        yield key;
      }
    }
    for (const key of optimisticUpserts.keys()) {
      if (!syncedData.has(key) && !optimisticDeletes.has(key)) {
        yield key;
      }
    }
  }
  /**
   * Get all values (virtual derived state)
   */
  *values() {
    for (const key of this.keys()) {
      const value = this.get(key);
      if (value !== void 0) {
        yield value;
      }
    }
  }
  /**
   * Get all entries (virtual derived state)
   */
  *entries() {
    for (const key of this.keys()) {
      const value = this.get(key);
      if (value !== void 0) {
        yield [key, value];
      }
    }
  }
  /**
   * Get all entries (virtual derived state)
   */
  *[Symbol.iterator]() {
    for (const [key, value] of this.entries()) {
      yield [key, value];
    }
  }
  /**
   * Execute a callback for each entry in the collection
   */
  forEach(callbackfn) {
    let index = 0;
    for (const [key, value] of this.entries()) {
      callbackfn(value, key, index++);
    }
  }
  /**
   * Create a new array with the results of calling a function for each entry in the collection
   */
  map(callbackfn) {
    const result = [];
    let index = 0;
    for (const [key, value] of this.entries()) {
      result.push(callbackfn(value, key, index++));
    }
    return result;
  }
  /**
   * Check if the given collection is this collection
   * @param collection The collection to check
   * @returns True if the given collection is this collection, false otherwise
   */
  isThisCollection(collection) {
    return collection === this.collection;
  }
  /**
   * Recompute optimistic state from active transactions
   */
  recomputeOptimisticState(triggeredByUserAction = false) {
    if (this.isCommittingSyncTransactions && !triggeredByUserAction) {
      return;
    }
    const previousState = new Map(this.optimisticUpserts);
    const previousDeletes = new Set(this.optimisticDeletes);
    this.optimisticUpserts.clear();
    this.optimisticDeletes.clear();
    const activeTransactions = [];
    for (const transaction of this.transactions.values()) {
      if (![`completed`, `failed`].includes(transaction.state)) {
        activeTransactions.push(transaction);
      }
    }
    for (const transaction of activeTransactions) {
      for (const mutation of transaction.mutations) {
        if (this.isThisCollection(mutation.collection) && mutation.optimistic) {
          switch (mutation.type) {
            case `insert`:
            case `update`:
              this.optimisticUpserts.set(
                mutation.key,
                mutation.modified
              );
              this.optimisticDeletes.delete(mutation.key);
              break;
            case `delete`:
              this.optimisticUpserts.delete(mutation.key);
              this.optimisticDeletes.add(mutation.key);
              break;
          }
        }
      }
    }
    this.size = this.calculateSize();
    const events = [];
    this.collectOptimisticChanges(previousState, previousDeletes, events);
    const filteredEventsBySyncStatus = events.filter((event) => {
      if (!this.recentlySyncedKeys.has(event.key)) {
        return true;
      }
      if (triggeredByUserAction) {
        return true;
      }
      return false;
    });
    if (this.pendingSyncedTransactions.length > 0 && !triggeredByUserAction) {
      const pendingSyncKeys = /* @__PURE__ */ new Set();
      for (const transaction of this.pendingSyncedTransactions) {
        for (const operation of transaction.operations) {
          pendingSyncKeys.add(operation.key);
        }
      }
      const filteredEvents = filteredEventsBySyncStatus.filter((event) => {
        if (event.type === `delete` && pendingSyncKeys.has(event.key)) {
          const hasActiveOptimisticMutation = activeTransactions.some(
            (tx) => tx.mutations.some(
              (m) => this.isThisCollection(m.collection) && m.key === event.key
            )
          );
          if (!hasActiveOptimisticMutation) {
            return false;
          }
        }
        return true;
      });
      if (filteredEvents.length > 0) {
        this.indexes.updateIndexes(filteredEvents);
      }
      this.changes.emitEvents(filteredEvents, triggeredByUserAction);
    } else {
      if (filteredEventsBySyncStatus.length > 0) {
        this.indexes.updateIndexes(filteredEventsBySyncStatus);
      }
      this.changes.emitEvents(filteredEventsBySyncStatus, triggeredByUserAction);
    }
  }
  /**
   * Calculate the current size based on synced data and optimistic changes
   */
  calculateSize() {
    const syncedSize = this.syncedData.size;
    const deletesFromSynced = Array.from(this.optimisticDeletes).filter(
      (key) => this.syncedData.has(key) && !this.optimisticUpserts.has(key)
    ).length;
    const upsertsNotInSynced = Array.from(this.optimisticUpserts.keys()).filter(
      (key) => !this.syncedData.has(key)
    ).length;
    return syncedSize - deletesFromSynced + upsertsNotInSynced;
  }
  /**
   * Collect events for optimistic changes
   */
  collectOptimisticChanges(previousUpserts, previousDeletes, events) {
    const allKeys = /* @__PURE__ */ new Set([
      ...previousUpserts.keys(),
      ...this.optimisticUpserts.keys(),
      ...previousDeletes,
      ...this.optimisticDeletes
    ]);
    for (const key of allKeys) {
      const currentValue = this.get(key);
      const previousValue = this.getPreviousValue(
        key,
        previousUpserts,
        previousDeletes
      );
      if (previousValue !== void 0 && currentValue === void 0) {
        events.push({ type: `delete`, key, value: previousValue });
      } else if (previousValue === void 0 && currentValue !== void 0) {
        events.push({ type: `insert`, key, value: currentValue });
      } else if (previousValue !== void 0 && currentValue !== void 0 && previousValue !== currentValue) {
        events.push({
          type: `update`,
          key,
          value: currentValue,
          previousValue
        });
      }
    }
  }
  /**
   * Get the previous value for a key given previous optimistic state
   */
  getPreviousValue(key, previousUpserts, previousDeletes) {
    if (previousDeletes.has(key)) {
      return void 0;
    }
    if (previousUpserts.has(key)) {
      return previousUpserts.get(key);
    }
    return this.syncedData.get(key);
  }
  /**
   * Schedule cleanup of a transaction when it completes
   */
  scheduleTransactionCleanup(transaction) {
    if (transaction.state === `completed`) {
      this.transactions.delete(transaction.id);
      return;
    }
    transaction.isPersisted.promise.then(() => {
      this.transactions.delete(transaction.id);
    }).catch(() => {
    });
  }
  /**
   * Capture visible state for keys that will be affected by pending sync operations
   * This must be called BEFORE onTransactionStateChange clears optimistic state
   */
  capturePreSyncVisibleState() {
    if (this.pendingSyncedTransactions.length === 0) return;
    const syncedKeys = /* @__PURE__ */ new Set();
    for (const transaction of this.pendingSyncedTransactions) {
      for (const operation of transaction.operations) {
        syncedKeys.add(operation.key);
      }
    }
    for (const key of syncedKeys) {
      this.recentlySyncedKeys.add(key);
    }
    for (const key of syncedKeys) {
      if (!this.preSyncVisibleState.has(key)) {
        const currentValue = this.get(key);
        if (currentValue !== void 0) {
          this.preSyncVisibleState.set(key, currentValue);
        }
      }
    }
  }
  /**
   * Trigger a recomputation when transactions change
   * This method should be called by the Transaction class when state changes
   */
  onTransactionStateChange() {
    this.changes.shouldBatchEvents = this.pendingSyncedTransactions.length > 0;
    this.capturePreSyncVisibleState();
    this.recomputeOptimisticState(false);
  }
  /**
   * Clean up the collection by stopping sync and clearing data
   * This can be called manually or automatically by garbage collection
   */
  cleanup() {
    this.syncedData.clear();
    this.syncedMetadata.clear();
    this.optimisticUpserts.clear();
    this.optimisticDeletes.clear();
    this.size = 0;
    this.pendingSyncedTransactions = [];
    this.syncedKeys.clear();
    this.hasReceivedFirstCommit = false;
  }
};

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/event-emitter.js
var EventEmitter = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Map();
  }
  /**
   * Subscribe to an event
   * @param event - Event name to listen for
   * @param callback - Function to call when event is emitted
   * @returns Unsubscribe function
   */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, /* @__PURE__ */ new Set());
    }
    this.listeners.get(event).add(callback);
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }
  /**
   * Subscribe to an event once (automatically unsubscribes after first emission)
   * @param event - Event name to listen for
   * @param callback - Function to call when event is emitted
   * @returns Unsubscribe function
   */
  once(event, callback) {
    const unsubscribe = this.on(event, (eventPayload) => {
      callback(eventPayload);
      unsubscribe();
    });
    return unsubscribe;
  }
  /**
   * Unsubscribe from an event
   * @param event - Event name to stop listening for
   * @param callback - Function to remove
   */
  off(event, callback) {
    this.listeners.get(event)?.delete(callback);
  }
  /**
   * Wait for an event to be emitted
   * @param event - Event name to wait for
   * @param timeout - Optional timeout in milliseconds
   * @returns Promise that resolves with the event payload
   */
  waitFor(event, timeout) {
    return new Promise((resolve, reject) => {
      let timeoutId;
      const unsubscribe = this.on(event, (eventPayload) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = void 0;
        }
        resolve(eventPayload);
        unsubscribe();
      });
      if (timeout) {
        timeoutId = setTimeout(() => {
          timeoutId = void 0;
          unsubscribe();
          reject(new Error(`Timeout waiting for event ${String(event)}`));
        }, timeout);
      }
    });
  }
  /**
   * Emit an event to all listeners
   * @param event - Event name to emit
   * @param eventPayload - Event payload
   * @internal For use by subclasses - subclasses should wrap this with a public emit if needed
   */
  emitInner(event, eventPayload) {
    this.listeners.get(event)?.forEach((listener) => {
      try {
        listener(eventPayload);
      } catch (error) {
        queueMicrotask(() => {
          throw error;
        });
      }
    });
  }
  /**
   * Clear all listeners
   */
  clearListeners() {
    this.listeners.clear();
  }
};

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/utils/cursor.js
function buildCursor(orderBy, values) {
  if (values.length === 0 || orderBy.length === 0) {
    return void 0;
  }
  if (orderBy.length === 1) {
    const { expression, compareOptions } = orderBy[0];
    const operator = compareOptions.direction === `asc` ? gt : lt;
    return operator(expression, new Value(values[0]));
  }
  const clauses = [];
  for (let i = 0; i < orderBy.length && i < values.length; i++) {
    const clause = orderBy[i];
    const value = values[i];
    const eqConditions = [];
    for (let j = 0; j < i; j++) {
      const prevClause = orderBy[j];
      const prevValue = values[j];
      eqConditions.push(eq(prevClause.expression, new Value(prevValue)));
    }
    const operator = clause.compareOptions.direction === `asc` ? gt : lt;
    const comparison = operator(clause.expression, new Value(value));
    if (eqConditions.length === 0) {
      clauses.push(comparison);
    } else {
      const allConditions = [...eqConditions, comparison];
      clauses.push(allConditions.reduce((acc, cond) => and(acc, cond)));
    }
  }
  if (clauses.length === 1) {
    return clauses[0];
  }
  return clauses.reduce((acc, clause) => or(acc, clause));
}

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/collection/subscription.js
var CollectionSubscription = class extends EventEmitter {
  constructor(collection, callback, options) {
    super();
    this.collection = collection;
    this.callback = callback;
    this.options = options;
    this.loadedInitialState = false;
    this.skipFiltering = false;
    this.snapshotSent = false;
    this.loadedSubsets = [];
    this.sentKeys = /* @__PURE__ */ new Set();
    this.limitedSnapshotRowCount = 0;
    this._status = `ready`;
    this.pendingLoadSubsetPromises = /* @__PURE__ */ new Set();
    this.isBufferingForTruncate = false;
    this.truncateBuffer = [];
    this.pendingTruncateRefetches = /* @__PURE__ */ new Set();
    if (options.onUnsubscribe) {
      this.on(`unsubscribed`, (event) => options.onUnsubscribe(event));
    }
    if (options.whereExpression) {
      ensureIndexForExpression(options.whereExpression, this.collection);
    }
    const callbackWithSentKeysTracking = (changes) => {
      callback(changes);
      this.trackSentKeys(changes);
    };
    this.callback = callbackWithSentKeysTracking;
    this.filteredCallback = options.whereExpression ? createFilteredCallback(this.callback, options) : this.callback;
    this.truncateCleanup = this.collection.on(`truncate`, () => {
      this.handleTruncate();
    });
  }
  get status() {
    return this._status;
  }
  /**
   * Handle collection truncate event by resetting state and re-requesting subsets.
   * This is called when the sync layer receives a must-refetch and clears all data.
   *
   * To prevent a flash of missing content, we buffer all changes (deletes from truncate
   * and inserts from refetch) until all loadSubset promises resolve, then emit them together.
   */
  handleTruncate() {
    const subsetsToReload = [...this.loadedSubsets];
    const hasLoadSubsetHandler = this.collection._sync.syncLoadSubsetFn !== null;
    if (subsetsToReload.length === 0 || !hasLoadSubsetHandler) {
      this.snapshotSent = false;
      this.loadedInitialState = false;
      this.limitedSnapshotRowCount = 0;
      this.lastSentKey = void 0;
      this.loadedSubsets = [];
      return;
    }
    this.isBufferingForTruncate = true;
    this.truncateBuffer = [];
    this.pendingTruncateRefetches.clear();
    this.snapshotSent = false;
    this.loadedInitialState = false;
    this.limitedSnapshotRowCount = 0;
    this.lastSentKey = void 0;
    this.loadedSubsets = [];
    queueMicrotask(() => {
      if (!this.isBufferingForTruncate) {
        return;
      }
      for (const options of subsetsToReload) {
        const syncResult = this.collection._sync.loadSubset(options);
        this.loadedSubsets.push(options);
        this.trackLoadSubsetPromise(syncResult);
        if (syncResult instanceof Promise) {
          this.pendingTruncateRefetches.add(syncResult);
          syncResult.catch(() => {
          }).finally(() => {
            this.pendingTruncateRefetches.delete(syncResult);
            this.checkTruncateRefetchComplete();
          });
        }
      }
      if (this.pendingTruncateRefetches.size === 0) {
        this.flushTruncateBuffer();
      }
    });
  }
  /**
   * Check if all truncate refetch promises have completed and flush buffer if so
   */
  checkTruncateRefetchComplete() {
    if (this.pendingTruncateRefetches.size === 0 && this.isBufferingForTruncate) {
      this.flushTruncateBuffer();
    }
  }
  /**
   * Flush the truncate buffer, emitting all buffered changes to the callback
   */
  flushTruncateBuffer() {
    this.isBufferingForTruncate = false;
    const merged = this.truncateBuffer.flat();
    if (merged.length > 0) {
      this.filteredCallback(merged);
    }
    this.truncateBuffer = [];
  }
  setOrderByIndex(index) {
    this.orderByIndex = index;
  }
  /**
   * Set subscription status and emit events if changed
   */
  setStatus(newStatus) {
    if (this._status === newStatus) {
      return;
    }
    const previousStatus = this._status;
    this._status = newStatus;
    this.emitInner(`status:change`, {
      type: `status:change`,
      subscription: this,
      previousStatus,
      status: newStatus
    });
    const eventKey = `status:${newStatus}`;
    this.emitInner(eventKey, {
      type: eventKey,
      subscription: this,
      previousStatus,
      status: newStatus
    });
  }
  /**
   * Track a loadSubset promise and manage loading status
   */
  trackLoadSubsetPromise(syncResult) {
    if (syncResult instanceof Promise) {
      this.pendingLoadSubsetPromises.add(syncResult);
      this.setStatus(`loadingSubset`);
      syncResult.finally(() => {
        this.pendingLoadSubsetPromises.delete(syncResult);
        if (this.pendingLoadSubsetPromises.size === 0) {
          this.setStatus(`ready`);
        }
      });
    }
  }
  hasLoadedInitialState() {
    return this.loadedInitialState;
  }
  hasSentAtLeastOneSnapshot() {
    return this.snapshotSent;
  }
  emitEvents(changes) {
    const newChanges = this.filterAndFlipChanges(changes);
    if (this.isBufferingForTruncate) {
      if (newChanges.length > 0) {
        this.truncateBuffer.push(newChanges);
      }
    } else {
      this.filteredCallback(newChanges);
    }
  }
  /**
   * Sends the snapshot to the callback.
   * Returns a boolean indicating if it succeeded.
   * It can only fail if there is no index to fulfill the request
   * and the optimizedOnly option is set to true,
   * or, the entire state was already loaded.
   */
  requestSnapshot(opts) {
    if (this.loadedInitialState) {
      return false;
    }
    const stateOpts = {
      where: this.options.whereExpression,
      optimizedOnly: opts?.optimizedOnly ?? false
    };
    if (opts) {
      if (`where` in opts) {
        const snapshotWhereExp = opts.where;
        if (stateOpts.where) {
          const subWhereExp = stateOpts.where;
          const combinedWhereExp = and(subWhereExp, snapshotWhereExp);
          stateOpts.where = combinedWhereExp;
        } else {
          stateOpts.where = snapshotWhereExp;
        }
      }
    } else {
      this.loadedInitialState = true;
    }
    const loadOptions = {
      where: stateOpts.where,
      subscription: this,
      // Include orderBy and limit if provided so sync layer can optimize the query
      orderBy: opts?.orderBy,
      limit: opts?.limit
    };
    const syncResult = this.collection._sync.loadSubset(loadOptions);
    opts?.onLoadSubsetResult?.(syncResult);
    this.loadedSubsets.push(loadOptions);
    const trackLoadSubsetPromise = opts?.trackLoadSubsetPromise ?? true;
    if (trackLoadSubsetPromise) {
      this.trackLoadSubsetPromise(syncResult);
    }
    const snapshot = this.collection.currentStateAsChanges(stateOpts);
    if (snapshot === void 0) {
      return false;
    }
    const filteredSnapshot = snapshot.filter(
      (change) => !this.sentKeys.has(change.key)
    );
    for (const change of filteredSnapshot) {
      this.sentKeys.add(change.key);
    }
    this.snapshotSent = true;
    this.callback(filteredSnapshot);
    return true;
  }
  /**
   * Sends a snapshot that fulfills the `where` clause and all rows are bigger or equal to the cursor.
   * Requires a range index to be set with `setOrderByIndex` prior to calling this method.
   * It uses that range index to load the items in the order of the index.
   *
   * For multi-column orderBy:
   * - Uses first value from `minValues` for LOCAL index operations (wide bounds, ensures no missed rows)
   * - Uses all `minValues` to build a precise composite cursor for SYNC layer loadSubset
   *
   * Note 1: it may load more rows than the provided LIMIT because it loads all values equal to the first cursor value + limit values greater.
   *         This is needed to ensure that it does not accidentally skip duplicate values when the limit falls in the middle of some duplicated values.
   * Note 2: it does not send keys that have already been sent before.
   */
  requestLimitedSnapshot({
    orderBy,
    limit,
    minValues,
    offset,
    trackLoadSubsetPromise: shouldTrackLoadSubsetPromise = true,
    onLoadSubsetResult
  }) {
    if (!limit) throw new Error(`limit is required`);
    if (!this.orderByIndex) {
      throw new Error(
        `Ordered snapshot was requested but no index was found. You have to call setOrderByIndex before requesting an ordered snapshot.`
      );
    }
    const hasMinValue = minValues !== void 0 && minValues.length > 0;
    const minValue = minValues?.[0];
    const minValueForIndex = minValue;
    const index = this.orderByIndex;
    const where = this.options.whereExpression;
    const whereFilterFn = where ? createFilterFunctionFromExpression(where) : void 0;
    const filterFn = (key) => {
      if (key !== void 0 && this.sentKeys.has(key)) {
        return false;
      }
      const value = this.collection.get(key);
      if (value === void 0) {
        return false;
      }
      return whereFilterFn?.(value) ?? true;
    };
    let biggestObservedValue = minValueForIndex;
    const changes = [];
    let keys = [];
    if (hasMinValue) {
      const { expression } = orderBy[0];
      const allRowsWithMinValue = this.collection.currentStateAsChanges({
        where: eq(expression, new Value(minValueForIndex))
      });
      if (allRowsWithMinValue) {
        const keysWithMinValue = allRowsWithMinValue.map((change) => change.key).filter((key) => !this.sentKeys.has(key) && filterFn(key));
        keys.push(...keysWithMinValue);
        const keysGreaterThanMin = index.take(
          limit - keys.length,
          minValueForIndex,
          filterFn
        );
        keys.push(...keysGreaterThanMin);
      } else {
        keys = index.take(limit, minValueForIndex, filterFn);
      }
    } else {
      keys = index.takeFromStart(limit, filterFn);
    }
    const valuesNeeded = () => Math.max(limit - changes.length, 0);
    const collectionExhausted = () => keys.length === 0;
    const orderByExpression = orderBy[0].expression;
    const valueExtractor = orderByExpression.type === `ref` ? compileExpression(new PropRef(orderByExpression.path), true) : null;
    while (valuesNeeded() > 0 && !collectionExhausted()) {
      const insertedKeys = /* @__PURE__ */ new Set();
      for (const key of keys) {
        const value = this.collection.get(key);
        changes.push({
          type: `insert`,
          key,
          value
        });
        biggestObservedValue = valueExtractor ? valueExtractor(value) : value;
        insertedKeys.add(key);
      }
      keys = index.take(valuesNeeded(), biggestObservedValue, filterFn);
    }
    const currentOffset = this.limitedSnapshotRowCount;
    for (const change of changes) {
      this.sentKeys.add(change.key);
    }
    this.callback(changes);
    this.limitedSnapshotRowCount += changes.length;
    if (changes.length > 0) {
      this.lastSentKey = changes[changes.length - 1].key;
    }
    let cursorExpressions;
    if (minValues !== void 0 && minValues.length > 0) {
      const whereFromCursor = buildCursor(orderBy, minValues);
      if (whereFromCursor) {
        const { expression } = orderBy[0];
        const minValue2 = minValues[0];
        let whereCurrentCursor;
        if (minValue2 instanceof Date) {
          const minValuePlus1ms = new Date(minValue2.getTime() + 1);
          whereCurrentCursor = and(
            gte(expression, new Value(minValue2)),
            lt(expression, new Value(minValuePlus1ms))
          );
        } else {
          whereCurrentCursor = eq(expression, new Value(minValue2));
        }
        cursorExpressions = {
          whereFrom: whereFromCursor,
          whereCurrent: whereCurrentCursor,
          lastKey: this.lastSentKey
        };
      }
    }
    const loadOptions = {
      where,
      // Main filter only, no cursor
      limit,
      orderBy,
      cursor: cursorExpressions,
      // Cursor expressions passed separately
      offset: offset ?? currentOffset,
      // Use provided offset, or auto-tracked offset
      subscription: this
    };
    const syncResult = this.collection._sync.loadSubset(loadOptions);
    onLoadSubsetResult?.(syncResult);
    this.loadedSubsets.push(loadOptions);
    if (shouldTrackLoadSubsetPromise) {
      this.trackLoadSubsetPromise(syncResult);
    }
  }
  // TODO: also add similar test but that checks that it can also load it from the collection's loadSubset function
  //       and that that also works properly (i.e. does not skip duplicate values)
  /**
   * Filters and flips changes for keys that have not been sent yet.
   * Deletes are filtered out for keys that have not been sent yet.
   * Updates are flipped into inserts for keys that have not been sent yet.
   * Duplicate inserts are filtered out to prevent D2 multiplicity > 1.
   */
  filterAndFlipChanges(changes) {
    if (this.loadedInitialState || this.skipFiltering) {
      return changes;
    }
    const skipDeleteFilter = this.isBufferingForTruncate;
    const newChanges = [];
    for (const change of changes) {
      let newChange = change;
      const keyInSentKeys = this.sentKeys.has(change.key);
      if (!keyInSentKeys) {
        if (change.type === `update`) {
          newChange = { ...change, type: `insert`, previousValue: void 0 };
        } else if (change.type === `delete`) {
          if (!skipDeleteFilter) {
            continue;
          }
        }
        this.sentKeys.add(change.key);
      } else {
        if (change.type === `insert`) {
          continue;
        } else if (change.type === `delete`) {
          this.sentKeys.delete(change.key);
        }
      }
      newChanges.push(newChange);
    }
    return newChanges;
  }
  trackSentKeys(changes) {
    if (this.loadedInitialState || this.skipFiltering) {
      return;
    }
    for (const change of changes) {
      if (change.type === `delete`) {
        this.sentKeys.delete(change.key);
      } else {
        this.sentKeys.add(change.key);
      }
    }
    if (this.orderByIndex) {
      this.limitedSnapshotRowCount = Math.max(
        this.limitedSnapshotRowCount,
        this.sentKeys.size
      );
    }
  }
  /**
   * Mark that the subscription should not filter any changes.
   * This is used when includeInitialState is explicitly set to false,
   * meaning the caller doesn't want initial state but does want ALL future changes.
   */
  markAllStateAsSeen() {
    this.skipFiltering = true;
  }
  unsubscribe() {
    this.truncateCleanup?.();
    this.truncateCleanup = void 0;
    this.isBufferingForTruncate = false;
    this.truncateBuffer = [];
    this.pendingTruncateRefetches.clear();
    for (const options of this.loadedSubsets) {
      this.collection._sync.unloadSubset(options);
    }
    this.loadedSubsets = [];
    this.emitInner(`unsubscribed`, {
      type: `unsubscribed`,
      subscription: this
    });
    this.clearListeners();
  }
};

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/collection/changes.js
var CollectionChangesManager = class {
  /**
   * Creates a new CollectionChangesManager instance
   */
  constructor() {
    this.activeSubscribersCount = 0;
    this.changeSubscriptions = /* @__PURE__ */ new Set();
    this.batchedEvents = [];
    this.shouldBatchEvents = false;
  }
  setDeps(deps) {
    this.lifecycle = deps.lifecycle;
    this.sync = deps.sync;
    this.events = deps.events;
    this.collection = deps.collection;
  }
  /**
   * Emit an empty ready event to notify subscribers that the collection is ready
   * This bypasses the normal empty array check in emitEvents
   */
  emitEmptyReadyEvent() {
    for (const subscription of this.changeSubscriptions) {
      subscription.emitEvents([]);
    }
  }
  /**
   * Emit events either immediately or batch them for later emission
   */
  emitEvents(changes, forceEmit = false) {
    if (this.shouldBatchEvents && !forceEmit) {
      this.batchedEvents.push(...changes);
      return;
    }
    let eventsToEmit = changes;
    if (forceEmit) {
      if (this.batchedEvents.length > 0) {
        eventsToEmit = [...this.batchedEvents, ...changes];
      }
      this.batchedEvents = [];
      this.shouldBatchEvents = false;
    }
    if (eventsToEmit.length === 0) {
      return;
    }
    for (const subscription of this.changeSubscriptions) {
      subscription.emitEvents(eventsToEmit);
    }
  }
  /**
   * Subscribe to changes in the collection
   */
  subscribeChanges(callback, options = {}) {
    this.addSubscriber();
    if (options.where && options.whereExpression) {
      throw new Error(
        `Cannot specify both 'where' and 'whereExpression' options. Use one or the other.`
      );
    }
    const { where, ...opts } = options;
    let whereExpression = opts.whereExpression;
    if (where) {
      const proxy = createSingleRowRefProxy();
      const result = where(proxy);
      whereExpression = toExpression(result);
    }
    const subscription = new CollectionSubscription(this.collection, callback, {
      ...opts,
      whereExpression,
      onUnsubscribe: () => {
        this.removeSubscriber();
        this.changeSubscriptions.delete(subscription);
      }
    });
    if (options.onStatusChange) {
      subscription.on(`status:change`, options.onStatusChange);
    }
    if (options.includeInitialState) {
      subscription.requestSnapshot({
        trackLoadSubsetPromise: false,
        orderBy: options.orderBy,
        limit: options.limit,
        onLoadSubsetResult: options.onLoadSubsetResult
      });
    } else if (options.includeInitialState === false) {
      subscription.markAllStateAsSeen();
    }
    this.changeSubscriptions.add(subscription);
    return subscription;
  }
  /**
   * Increment the active subscribers count and start sync if needed
   */
  addSubscriber() {
    const previousSubscriberCount = this.activeSubscribersCount;
    this.activeSubscribersCount++;
    this.lifecycle.cancelGCTimer();
    if (this.lifecycle.status === `cleaned-up` || this.lifecycle.status === `idle`) {
      this.sync.startSync();
    }
    this.events.emitSubscribersChange(
      this.activeSubscribersCount,
      previousSubscriberCount
    );
  }
  /**
   * Decrement the active subscribers count and start GC timer if needed
   */
  removeSubscriber() {
    const previousSubscriberCount = this.activeSubscribersCount;
    this.activeSubscribersCount--;
    if (this.activeSubscribersCount === 0) {
      this.lifecycle.startGCTimer();
    } else if (this.activeSubscribersCount < 0) {
      throw new NegativeActiveSubscribersError();
    }
    this.events.emitSubscribersChange(
      this.activeSubscribersCount,
      previousSubscriberCount
    );
  }
  /**
   * Clean up the collection by stopping sync and clearing data
   * This can be called manually or automatically by garbage collection
   */
  cleanup() {
    this.batchedEvents = [];
    this.shouldBatchEvents = false;
  }
};

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/utils/browser-polyfills.js
var requestIdleCallbackPolyfill = (callback) => {
  const timeout = 0;
  const timeoutId = setTimeout(() => {
    callback({
      didTimeout: true,
      // Always indicate timeout for the polyfill
      timeRemaining: () => 50
      // Return some time remaining for polyfill
    });
  }, timeout);
  return timeoutId;
};
var cancelIdleCallbackPolyfill = (id) => {
  clearTimeout(id);
};
var safeRequestIdleCallback = typeof window !== `undefined` && `requestIdleCallback` in window ? (callback, options) => window.requestIdleCallback(callback, options) : (callback, _options) => requestIdleCallbackPolyfill(callback);
var safeCancelIdleCallback = typeof window !== `undefined` && `cancelIdleCallback` in window ? (id) => window.cancelIdleCallback(id) : cancelIdleCallbackPolyfill;

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/collection/lifecycle.js
var CollectionLifecycleManager = class {
  /**
   * Creates a new CollectionLifecycleManager instance
   */
  constructor(config, id) {
    this.status = `idle`;
    this.hasBeenReady = false;
    this.hasReceivedFirstCommit = false;
    this.onFirstReadyCallbacks = [];
    this.gcTimeoutId = null;
    this.idleCallbackId = null;
    this.config = config;
    this.id = id;
  }
  setDeps(deps) {
    this.indexes = deps.indexes;
    this.events = deps.events;
    this.changes = deps.changes;
    this.sync = deps.sync;
    this.state = deps.state;
  }
  /**
   * Validates state transitions to prevent invalid status changes
   */
  validateStatusTransition(from, to) {
    if (from === to) {
      return;
    }
    const validTransitions = {
      idle: [`loading`, `error`, `cleaned-up`],
      loading: [`ready`, `error`, `cleaned-up`],
      ready: [`cleaned-up`, `error`],
      error: [`cleaned-up`, `idle`],
      "cleaned-up": [`loading`, `error`]
    };
    if (!validTransitions[from].includes(to)) {
      throw new InvalidCollectionStatusTransitionError(from, to, this.id);
    }
  }
  /**
   * Safely update the collection status with validation
   * @private
   */
  setStatus(newStatus, allowReady = false) {
    if (newStatus === `ready` && !allowReady) {
      throw new CollectionStateError(
        `You can't directly call "setStatus('ready'). You must use markReady instead.`
      );
    }
    this.validateStatusTransition(this.status, newStatus);
    const previousStatus = this.status;
    this.status = newStatus;
    if (newStatus === `ready` && !this.indexes.isIndexesResolved) {
      this.indexes.resolveAllIndexes().catch((error) => {
        console.warn(
          `${this.config.id ? `[${this.config.id}] ` : ``}Failed to resolve indexes:`,
          error
        );
      });
    }
    this.events.emitStatusChange(newStatus, previousStatus);
  }
  /**
   * Validates that the collection is in a usable state for data operations
   * @private
   */
  validateCollectionUsable(operation) {
    switch (this.status) {
      case `error`:
        throw new CollectionInErrorStateError(operation, this.id);
      case `cleaned-up`:
        this.sync.startSync();
        break;
    }
  }
  /**
   * Mark the collection as ready for use
   * This is called by sync implementations to explicitly signal that the collection is ready,
   * providing a more intuitive alternative to using commits for readiness signaling
   * @private - Should only be called by sync implementations
   */
  markReady() {
    this.validateStatusTransition(this.status, `ready`);
    if (this.status === `loading`) {
      this.setStatus(`ready`, true);
      if (!this.hasBeenReady) {
        this.hasBeenReady = true;
        if (!this.hasReceivedFirstCommit) {
          this.hasReceivedFirstCommit = true;
        }
        const callbacks = [...this.onFirstReadyCallbacks];
        this.onFirstReadyCallbacks = [];
        callbacks.forEach((callback) => callback());
      }
      if (this.changes.changeSubscriptions.size > 0) {
        this.changes.emitEmptyReadyEvent();
      }
    }
  }
  /**
   * Start the garbage collection timer
   * Called when the collection becomes inactive (no subscribers)
   */
  startGCTimer() {
    if (this.gcTimeoutId) {
      clearTimeout(this.gcTimeoutId);
    }
    const gcTime = this.config.gcTime ?? 3e5;
    if (gcTime <= 0 || !Number.isFinite(gcTime)) {
      return;
    }
    this.gcTimeoutId = setTimeout(() => {
      if (this.changes.activeSubscribersCount === 0) {
        this.scheduleIdleCleanup();
      }
    }, gcTime);
  }
  /**
   * Cancel the garbage collection timer
   * Called when the collection becomes active again
   */
  cancelGCTimer() {
    if (this.gcTimeoutId) {
      clearTimeout(this.gcTimeoutId);
      this.gcTimeoutId = null;
    }
    if (this.idleCallbackId !== null) {
      safeCancelIdleCallback(this.idleCallbackId);
      this.idleCallbackId = null;
    }
  }
  /**
   * Schedule cleanup to run during browser idle time
   * This prevents blocking the UI thread during cleanup operations
   */
  scheduleIdleCleanup() {
    if (this.idleCallbackId !== null) {
      safeCancelIdleCallback(this.idleCallbackId);
    }
    this.idleCallbackId = safeRequestIdleCallback(
      (deadline) => {
        if (this.changes.activeSubscribersCount === 0) {
          const cleanupCompleted = this.performCleanup(deadline);
          if (cleanupCompleted) {
            this.idleCallbackId = null;
          }
        } else {
          this.idleCallbackId = null;
        }
      },
      { timeout: 1e3 }
    );
  }
  /**
   * Perform cleanup operations, optionally in chunks during idle time
   * @returns true if cleanup was completed, false if it was rescheduled
   */
  performCleanup(deadline) {
    const hasTime = !deadline || deadline.timeRemaining() > 0 || deadline.didTimeout;
    if (hasTime) {
      this.sync.cleanup();
      this.state.cleanup();
      this.changes.cleanup();
      this.indexes.cleanup();
      if (this.gcTimeoutId) {
        clearTimeout(this.gcTimeoutId);
        this.gcTimeoutId = null;
      }
      this.hasBeenReady = false;
      const callbacks = [...this.onFirstReadyCallbacks];
      this.onFirstReadyCallbacks = [];
      callbacks.forEach((callback) => {
        try {
          callback();
        } catch (error) {
          console.error(
            `${this.config.id ? `[${this.config.id}] ` : ``}Error in onFirstReady callback during cleanup:`,
            error
          );
        }
      });
      this.setStatus(`cleaned-up`);
      this.events.cleanup();
      return true;
    } else {
      this.scheduleIdleCleanup();
      return false;
    }
  }
  /**
   * Register a callback to be executed when the collection first becomes ready
   * Useful for preloading collections
   * @param callback Function to call when the collection first becomes ready
   */
  onFirstReady(callback) {
    if (this.hasBeenReady) {
      callback();
      return;
    }
    this.onFirstReadyCallbacks.push(callback);
  }
  cleanup() {
    if (this.idleCallbackId !== null) {
      safeCancelIdleCallback(this.idleCallbackId);
      this.idleCallbackId = null;
    }
    this.performCleanup();
  }
};

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/query/live/internal.js
var LIVE_QUERY_INTERNAL = /* @__PURE__ */ Symbol(`liveQueryInternal`);

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/collection/sync.js
var CollectionSyncManager = class {
  /**
   * Creates a new CollectionSyncManager instance
   */
  constructor(config, id) {
    this.preloadPromise = null;
    this.syncCleanupFn = null;
    this.syncLoadSubsetFn = null;
    this.syncUnloadSubsetFn = null;
    this.pendingLoadSubsetPromises = /* @__PURE__ */ new Set();
    this.config = config;
    this.id = id;
    this.syncMode = config.syncMode ?? `eager`;
  }
  setDeps(deps) {
    this.collection = deps.collection;
    this.state = deps.state;
    this.lifecycle = deps.lifecycle;
    this._events = deps.events;
  }
  /**
   * Start the sync process for this collection
   * This is called when the collection is first accessed or preloaded
   */
  startSync() {
    if (this.lifecycle.status !== `idle` && this.lifecycle.status !== `cleaned-up`) {
      return;
    }
    this.lifecycle.setStatus(`loading`);
    try {
      const syncRes = normalizeSyncFnResult(
        this.config.sync.sync({
          collection: this.collection,
          begin: (options) => {
            this.state.pendingSyncedTransactions.push({
              committed: false,
              operations: [],
              deletedKeys: /* @__PURE__ */ new Set(),
              immediate: options?.immediate
            });
          },
          write: (messageWithOptionalKey) => {
            const pendingTransaction = this.state.pendingSyncedTransactions[this.state.pendingSyncedTransactions.length - 1];
            if (!pendingTransaction) {
              throw new NoPendingSyncTransactionWriteError();
            }
            if (pendingTransaction.committed) {
              throw new SyncTransactionAlreadyCommittedWriteError();
            }
            let key = void 0;
            if (`key` in messageWithOptionalKey) {
              key = messageWithOptionalKey.key;
            } else {
              key = this.config.getKey(messageWithOptionalKey.value);
            }
            let messageType = messageWithOptionalKey.type;
            if (messageWithOptionalKey.type === `insert`) {
              const insertingIntoExistingSynced = this.state.syncedData.has(key);
              const hasPendingDeleteForKey = pendingTransaction.deletedKeys.has(key);
              const isTruncateTransaction = pendingTransaction.truncate === true;
              if (insertingIntoExistingSynced && !hasPendingDeleteForKey && !isTruncateTransaction) {
                const existingValue = this.state.syncedData.get(key);
                const valuesEqual = existingValue !== void 0 && deepEquals(existingValue, messageWithOptionalKey.value);
                if (valuesEqual) {
                  messageType = `update`;
                } else {
                  const utils = this.config.utils;
                  const internal = utils[LIVE_QUERY_INTERNAL];
                  throw new DuplicateKeySyncError(key, this.id, {
                    hasCustomGetKey: internal?.hasCustomGetKey ?? false,
                    hasJoins: internal?.hasJoins ?? false,
                    hasDistinct: internal?.hasDistinct ?? false
                  });
                }
              }
            }
            const message = {
              ...messageWithOptionalKey,
              type: messageType,
              key
            };
            pendingTransaction.operations.push(message);
            if (messageType === `delete`) {
              pendingTransaction.deletedKeys.add(key);
            }
          },
          commit: () => {
            const pendingTransaction = this.state.pendingSyncedTransactions[this.state.pendingSyncedTransactions.length - 1];
            if (!pendingTransaction) {
              throw new NoPendingSyncTransactionCommitError();
            }
            if (pendingTransaction.committed) {
              throw new SyncTransactionAlreadyCommittedError();
            }
            pendingTransaction.committed = true;
            this.state.commitPendingTransactions();
          },
          markReady: () => {
            this.lifecycle.markReady();
          },
          truncate: () => {
            const pendingTransaction = this.state.pendingSyncedTransactions[this.state.pendingSyncedTransactions.length - 1];
            if (!pendingTransaction) {
              throw new NoPendingSyncTransactionWriteError();
            }
            if (pendingTransaction.committed) {
              throw new SyncTransactionAlreadyCommittedWriteError();
            }
            pendingTransaction.operations = [];
            pendingTransaction.deletedKeys.clear();
            pendingTransaction.truncate = true;
            pendingTransaction.optimisticSnapshot = {
              upserts: new Map(this.state.optimisticUpserts),
              deletes: new Set(this.state.optimisticDeletes)
            };
          }
        })
      );
      this.syncCleanupFn = syncRes?.cleanup ?? null;
      this.syncLoadSubsetFn = syncRes?.loadSubset ?? null;
      this.syncUnloadSubsetFn = syncRes?.unloadSubset ?? null;
      if (this.syncMode === `on-demand` && !this.syncLoadSubsetFn) {
        throw new CollectionConfigurationError(
          `Collection "${this.id}" is configured with syncMode "on-demand" but the sync function did not return a loadSubset handler. Either provide a loadSubset handler or use syncMode "eager".`
        );
      }
    } catch (error) {
      this.lifecycle.setStatus(`error`);
      throw error;
    }
  }
  /**
   * Preload the collection data by starting sync if not already started
   * Multiple concurrent calls will share the same promise
   */
  preload() {
    if (this.preloadPromise) {
      return this.preloadPromise;
    }
    if (this.syncMode === `on-demand`) {
      console.warn(
        `${this.id ? `[${this.id}] ` : ``}Calling .preload() on a collection with syncMode "on-demand" is a no-op. In on-demand mode, data is only loaded when queries request it. Instead, create a live query and call .preload() on that to load the specific data you need. See https://tanstack.com/blog/tanstack-db-0.5-query-driven-sync for more details.`
      );
    }
    this.preloadPromise = new Promise((resolve, reject) => {
      if (this.lifecycle.status === `ready`) {
        resolve();
        return;
      }
      if (this.lifecycle.status === `error`) {
        reject(new CollectionIsInErrorStateError());
        return;
      }
      this.lifecycle.onFirstReady(() => {
        resolve();
      });
      if (this.lifecycle.status === `idle` || this.lifecycle.status === `cleaned-up`) {
        try {
          this.startSync();
        } catch (error) {
          reject(error);
          return;
        }
      }
    });
    return this.preloadPromise;
  }
  /**
   * Gets whether the collection is currently loading more data
   */
  get isLoadingSubset() {
    return this.pendingLoadSubsetPromises.size > 0;
  }
  /**
   * Tracks a load promise for isLoadingSubset state.
   * @internal This is for internal coordination (e.g., live-query glue code), not for general use.
   */
  trackLoadPromise(promise) {
    const loadingStarting = !this.isLoadingSubset;
    this.pendingLoadSubsetPromises.add(promise);
    if (loadingStarting) {
      this._events.emit(`loadingSubset:change`, {
        type: `loadingSubset:change`,
        collection: this.collection,
        isLoadingSubset: true,
        previousIsLoadingSubset: false,
        loadingSubsetTransition: `start`
      });
    }
    promise.finally(() => {
      const loadingEnding = this.pendingLoadSubsetPromises.size === 1 && this.pendingLoadSubsetPromises.has(promise);
      this.pendingLoadSubsetPromises.delete(promise);
      if (loadingEnding) {
        this._events.emit(`loadingSubset:change`, {
          type: `loadingSubset:change`,
          collection: this.collection,
          isLoadingSubset: false,
          previousIsLoadingSubset: true,
          loadingSubsetTransition: `end`
        });
      }
    });
  }
  /**
   * Requests the sync layer to load more data.
   * @param options Options to control what data is being loaded
   * @returns If data loading is asynchronous, this method returns a promise that resolves when the data is loaded.
   *          Returns true if no sync function is configured, if syncMode is 'eager', or if there is no work to do.
   */
  loadSubset(options) {
    if (this.syncMode === `eager`) {
      return true;
    }
    if (this.syncLoadSubsetFn) {
      const result = this.syncLoadSubsetFn(options);
      if (result instanceof Promise) {
        this.trackLoadPromise(result);
        return result;
      }
    }
    return true;
  }
  /**
   * Notifies the sync layer that a subset is no longer needed.
   * @param options Options that identify what data is being unloaded
   */
  unloadSubset(options) {
    if (this.syncUnloadSubsetFn) {
      this.syncUnloadSubsetFn(options);
    }
  }
  cleanup() {
    try {
      if (this.syncCleanupFn) {
        this.syncCleanupFn();
        this.syncCleanupFn = null;
      }
    } catch (error) {
      queueMicrotask(() => {
        if (error instanceof Error) {
          const wrappedError = new SyncCleanupError(this.id, error);
          wrappedError.cause = error;
          wrappedError.stack = error.stack;
          throw wrappedError;
        } else {
          throw new SyncCleanupError(this.id, error);
        }
      });
    }
    this.preloadPromise = null;
  }
};
function normalizeSyncFnResult(result) {
  if (typeof result === `function`) {
    return { cleanup: result };
  }
  if (typeof result === `object`) {
    return result;
  }
  return void 0;
}

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/indexes/lazy-index.js
function isConstructor(resolver) {
  return typeof resolver === `function` && resolver.prototype !== void 0 && resolver.prototype.constructor === resolver;
}
async function resolveIndexConstructor(resolver) {
  if (isConstructor(resolver)) {
    return resolver;
  } else {
    return await resolver();
  }
}
var LazyIndexWrapper = class {
  constructor(id, expression, name, resolver, options, collectionEntries) {
    this.id = id;
    this.expression = expression;
    this.name = name;
    this.resolver = resolver;
    this.options = options;
    this.collectionEntries = collectionEntries;
    this.indexPromise = null;
    this.resolvedIndex = null;
    if (isConstructor(this.resolver)) {
      this.resolvedIndex = new this.resolver(
        this.id,
        this.expression,
        this.name,
        this.options
      );
      if (this.collectionEntries) {
        this.resolvedIndex.build(this.collectionEntries);
      }
    }
  }
  /**
   * Resolve the actual index
   */
  async resolve() {
    if (this.resolvedIndex) {
      return this.resolvedIndex;
    }
    if (!this.indexPromise) {
      this.indexPromise = this.createIndex();
    }
    this.resolvedIndex = await this.indexPromise;
    return this.resolvedIndex;
  }
  /**
   * Check if already resolved
   */
  isResolved() {
    return this.resolvedIndex !== null;
  }
  /**
   * Get resolved index (throws if not ready)
   */
  getResolved() {
    if (!this.resolvedIndex) {
      throw new Error(
        `Index ${this.id} has not been resolved yet. Ensure collection is synced.`
      );
    }
    return this.resolvedIndex;
  }
  /**
   * Get the index ID
   */
  getId() {
    return this.id;
  }
  /**
   * Get the index name
   */
  getName() {
    return this.name;
  }
  /**
   * Get the index expression
   */
  getExpression() {
    return this.expression;
  }
  async createIndex() {
    const IndexClass = await resolveIndexConstructor(this.resolver);
    return new IndexClass(this.id, this.expression, this.name, this.options);
  }
};
var IndexProxy = class {
  constructor(indexId, lazyIndex) {
    this.indexId = indexId;
    this.lazyIndex = lazyIndex;
  }
  /**
   * Get the resolved index (throws if not ready)
   */
  get index() {
    return this.lazyIndex.getResolved();
  }
  /**
   * Check if index is ready
   */
  get isReady() {
    return this.lazyIndex.isResolved();
  }
  /**
   * Wait for index to be ready
   */
  async whenReady() {
    return await this.lazyIndex.resolve();
  }
  /**
   * Get the index ID
   */
  get id() {
    return this.indexId;
  }
  /**
   * Get the index name (throws if not ready)
   */
  get name() {
    if (this.isReady) {
      return this.index.name;
    }
    return this.lazyIndex.getName();
  }
  /**
   * Get the index expression (available immediately)
   */
  get expression() {
    return this.lazyIndex.getExpression();
  }
  /**
   * Check if index supports an operation (throws if not ready)
   */
  supports(operation) {
    return this.index.supports(operation);
  }
  /**
   * Get index statistics (throws if not ready)
   */
  getStats() {
    return this.index.getStats();
  }
  /**
   * Check if index matches a field path (available immediately)
   */
  matchesField(fieldPath) {
    const expr = this.expression;
    return expr.type === `ref` && expr.path.length === fieldPath.length && expr.path.every((part, i) => part === fieldPath[i]);
  }
  /**
   * Get the key count (throws if not ready)
   */
  get keyCount() {
    return this.index.keyCount;
  }
  // Test compatibility properties - delegate to resolved index
  get indexedKeysSet() {
    const resolved = this.index;
    return resolved.indexedKeysSet;
  }
  get orderedEntriesArray() {
    const resolved = this.index;
    return resolved.orderedEntriesArray;
  }
  get valueMapData() {
    const resolved = this.index;
    return resolved.valueMapData;
  }
  // BTreeIndex compatibility methods
  equalityLookup(value) {
    const resolved = this.index;
    return resolved.equalityLookup?.(value) ?? /* @__PURE__ */ new Set();
  }
  rangeQuery(options) {
    const resolved = this.index;
    return resolved.rangeQuery?.(options) ?? /* @__PURE__ */ new Set();
  }
  inArrayLookup(values) {
    const resolved = this.index;
    return resolved.inArrayLookup?.(values) ?? /* @__PURE__ */ new Set();
  }
  // Internal method for the collection to get the lazy wrapper
  _getLazyWrapper() {
    return this.lazyIndex;
  }
};

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/collection/indexes.js
var CollectionIndexesManager = class {
  constructor() {
    this.lazyIndexes = /* @__PURE__ */ new Map();
    this.resolvedIndexes = /* @__PURE__ */ new Map();
    this.isIndexesResolved = false;
    this.indexCounter = 0;
  }
  setDeps(deps) {
    this.state = deps.state;
    this.lifecycle = deps.lifecycle;
  }
  /**
   * Creates an index on a collection for faster queries.
   */
  createIndex(indexCallback, config = {}) {
    this.lifecycle.validateCollectionUsable(`createIndex`);
    const indexId = ++this.indexCounter;
    const singleRowRefProxy = createSingleRowRefProxy();
    const indexExpression = indexCallback(singleRowRefProxy);
    const expression = toExpression(indexExpression);
    const resolver = config.indexType ?? BTreeIndex;
    const lazyIndex = new LazyIndexWrapper(
      indexId,
      expression,
      config.name,
      resolver,
      config.options,
      this.state.entries()
    );
    this.lazyIndexes.set(indexId, lazyIndex);
    if (resolver === BTreeIndex) {
      try {
        const resolvedIndex = lazyIndex.getResolved();
        this.resolvedIndexes.set(indexId, resolvedIndex);
      } catch (error) {
        console.warn(`Failed to resolve BTreeIndex:`, error);
      }
    } else if (typeof resolver === `function` && resolver.prototype) {
      try {
        const resolvedIndex = lazyIndex.getResolved();
        this.resolvedIndexes.set(indexId, resolvedIndex);
      } catch {
        this.resolveSingleIndex(indexId, lazyIndex).catch((error) => {
          console.warn(`Failed to resolve single index:`, error);
        });
      }
    } else if (this.isIndexesResolved) {
      this.resolveSingleIndex(indexId, lazyIndex).catch((error) => {
        console.warn(`Failed to resolve single index:`, error);
      });
    }
    return new IndexProxy(indexId, lazyIndex);
  }
  /**
   * Resolve all lazy indexes (called when collection first syncs)
   */
  async resolveAllIndexes() {
    if (this.isIndexesResolved) return;
    const resolutionPromises = Array.from(this.lazyIndexes.entries()).map(
      async ([indexId, lazyIndex]) => {
        const resolvedIndex = await lazyIndex.resolve();
        resolvedIndex.build(this.state.entries());
        this.resolvedIndexes.set(indexId, resolvedIndex);
        return { indexId, resolvedIndex };
      }
    );
    await Promise.all(resolutionPromises);
    this.isIndexesResolved = true;
  }
  /**
   * Resolve a single index immediately
   */
  async resolveSingleIndex(indexId, lazyIndex) {
    const resolvedIndex = await lazyIndex.resolve();
    resolvedIndex.build(this.state.entries());
    this.resolvedIndexes.set(indexId, resolvedIndex);
    return resolvedIndex;
  }
  /**
   * Get resolved indexes for query optimization
   */
  get indexes() {
    return this.resolvedIndexes;
  }
  /**
   * Updates all indexes when the collection changes
   */
  updateIndexes(changes) {
    for (const index of this.resolvedIndexes.values()) {
      for (const change of changes) {
        switch (change.type) {
          case `insert`:
            index.add(change.key, change.value);
            break;
          case `update`:
            if (change.previousValue) {
              index.update(change.key, change.previousValue, change.value);
            } else {
              index.add(change.key, change.value);
            }
            break;
          case `delete`:
            index.remove(change.key, change.value);
            break;
        }
      }
    }
  }
  /**
   * Clean up the collection by stopping sync and clearing data
   * This can be called manually or automatically by garbage collection
   */
  cleanup() {
    this.lazyIndexes.clear();
    this.resolvedIndexes.clear();
  }
};

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/proxy.js
var CALLBACK_ITERATION_METHODS = /* @__PURE__ */ new Set([
  `find`,
  `findLast`,
  `findIndex`,
  `findLastIndex`,
  `filter`,
  `map`,
  `flatMap`,
  `forEach`,
  `some`,
  `every`,
  `reduce`,
  `reduceRight`
]);
var ARRAY_MODIFYING_METHODS = /* @__PURE__ */ new Set([
  `pop`,
  `push`,
  `shift`,
  `unshift`,
  `splice`,
  `sort`,
  `reverse`,
  `fill`,
  `copyWithin`
]);
var MAP_SET_MODIFYING_METHODS = /* @__PURE__ */ new Set([`set`, `delete`, `clear`, `add`]);
var MAP_SET_ITERATOR_METHODS = /* @__PURE__ */ new Set([
  `entries`,
  `keys`,
  `values`,
  `forEach`
]);
function isProxiableObject(value) {
  return value !== null && typeof value === `object` && !(value instanceof Date) && !(value instanceof RegExp) && !isTemporal(value);
}
function createArrayIterationHandler(methodName, methodFn, changeTracker, memoizedCreateChangeProxy) {
  if (!CALLBACK_ITERATION_METHODS.has(methodName)) {
    return void 0;
  }
  return function(...args) {
    const callback = args[0];
    if (typeof callback !== `function`) {
      return methodFn.apply(changeTracker.copy_, args);
    }
    const getProxiedElement = (element, index) => {
      if (isProxiableObject(element)) {
        const nestedParent = {
          tracker: changeTracker,
          prop: String(index)
        };
        const { proxy: elementProxy } = memoizedCreateChangeProxy(
          element,
          nestedParent
        );
        return elementProxy;
      }
      return element;
    };
    const wrappedCallback = function(element, index, array) {
      const proxiedElement = getProxiedElement(element, index);
      return callback.call(this, proxiedElement, index, array);
    };
    if (methodName === `reduce` || methodName === `reduceRight`) {
      const reduceCallback = function(accumulator, element, index, array) {
        const proxiedElement = getProxiedElement(element, index);
        return callback.call(this, accumulator, proxiedElement, index, array);
      };
      return methodFn.apply(changeTracker.copy_, [
        reduceCallback,
        ...args.slice(1)
      ]);
    }
    const result = methodFn.apply(changeTracker.copy_, [
      wrappedCallback,
      ...args.slice(1)
    ]);
    if ((methodName === `find` || methodName === `findLast`) && result && typeof result === `object`) {
      const foundIndex = changeTracker.copy_.indexOf(result);
      if (foundIndex !== -1) {
        return getProxiedElement(result, foundIndex);
      }
    }
    if (methodName === `filter` && Array.isArray(result)) {
      return result.map((element) => {
        const originalIndex = changeTracker.copy_.indexOf(element);
        if (originalIndex !== -1) {
          return getProxiedElement(element, originalIndex);
        }
        return element;
      });
    }
    return result;
  };
}
function createArrayIteratorHandler(changeTracker, memoizedCreateChangeProxy) {
  return function() {
    const array = changeTracker.copy_;
    let index = 0;
    return {
      next() {
        if (index >= array.length) {
          return { done: true, value: void 0 };
        }
        const element = array[index];
        let proxiedElement = element;
        if (isProxiableObject(element)) {
          const nestedParent = {
            tracker: changeTracker,
            prop: String(index)
          };
          const { proxy: elementProxy } = memoizedCreateChangeProxy(
            element,
            nestedParent
          );
          proxiedElement = elementProxy;
        }
        index++;
        return { done: false, value: proxiedElement };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createModifyingMethodHandler(methodFn, changeTracker, markChanged) {
  return function(...args) {
    const result = methodFn.apply(changeTracker.copy_, args);
    markChanged(changeTracker);
    return result;
  };
}
function createMapSetIteratorHandler(methodName, prop, methodFn, target, changeTracker, memoizedCreateChangeProxy, markChanged) {
  const isIteratorMethod = MAP_SET_ITERATOR_METHODS.has(methodName) || prop === Symbol.iterator;
  if (!isIteratorMethod) {
    return void 0;
  }
  return function(...args) {
    const result = methodFn.apply(changeTracker.copy_, args);
    if (methodName === `forEach`) {
      const callback = args[0];
      if (typeof callback === `function`) {
        const wrappedCallback = function(value, key, collection) {
          const cbresult = callback.call(this, value, key, collection);
          markChanged(changeTracker);
          return cbresult;
        };
        return methodFn.apply(target, [wrappedCallback, ...args.slice(1)]);
      }
    }
    const isValueIterator = methodName === `entries` || methodName === `values` || methodName === Symbol.iterator.toString() || prop === Symbol.iterator;
    if (isValueIterator) {
      const originalIterator = result;
      const valueToKeyMap = /* @__PURE__ */ new Map();
      if (methodName === `values` && target instanceof Map) {
        for (const [key, mapValue] of changeTracker.copy_.entries()) {
          valueToKeyMap.set(mapValue, key);
        }
      }
      const originalToModifiedMap = /* @__PURE__ */ new Map();
      if (target instanceof Set) {
        for (const setValue of changeTracker.copy_.values()) {
          originalToModifiedMap.set(setValue, setValue);
        }
      }
      return {
        next() {
          const nextResult = originalIterator.next();
          if (!nextResult.done && nextResult.value && typeof nextResult.value === `object`) {
            if (methodName === `entries` && Array.isArray(nextResult.value) && nextResult.value.length === 2) {
              if (nextResult.value[1] && typeof nextResult.value[1] === `object`) {
                const mapKey = nextResult.value[0];
                const mapParent = {
                  tracker: changeTracker,
                  prop: mapKey,
                  updateMap: (newValue) => {
                    if (changeTracker.copy_ instanceof Map) {
                      changeTracker.copy_.set(
                        mapKey,
                        newValue
                      );
                    }
                  }
                };
                const { proxy: valueProxy } = memoizedCreateChangeProxy(
                  nextResult.value[1],
                  mapParent
                );
                nextResult.value[1] = valueProxy;
              }
            } else if (methodName === `values` || methodName === Symbol.iterator.toString() || prop === Symbol.iterator) {
              if (methodName === `values` && target instanceof Map) {
                const mapKey = valueToKeyMap.get(nextResult.value);
                if (mapKey !== void 0) {
                  const mapParent = {
                    tracker: changeTracker,
                    prop: mapKey,
                    updateMap: (newValue) => {
                      if (changeTracker.copy_ instanceof Map) {
                        changeTracker.copy_.set(
                          mapKey,
                          newValue
                        );
                      }
                    }
                  };
                  const { proxy: valueProxy } = memoizedCreateChangeProxy(
                    nextResult.value,
                    mapParent
                  );
                  nextResult.value = valueProxy;
                }
              } else if (target instanceof Set) {
                const setOriginalValue = nextResult.value;
                const setParent = {
                  tracker: changeTracker,
                  prop: setOriginalValue,
                  updateSet: (newValue) => {
                    if (changeTracker.copy_ instanceof Set) {
                      changeTracker.copy_.delete(
                        setOriginalValue
                      );
                      changeTracker.copy_.add(newValue);
                      originalToModifiedMap.set(setOriginalValue, newValue);
                    }
                  }
                };
                const { proxy: valueProxy } = memoizedCreateChangeProxy(
                  nextResult.value,
                  setParent
                );
                nextResult.value = valueProxy;
              } else {
                const tempKey = /* @__PURE__ */ Symbol(`iterator-value`);
                const { proxy: valueProxy } = memoizedCreateChangeProxy(
                  nextResult.value,
                  {
                    tracker: changeTracker,
                    prop: tempKey
                  }
                );
                nextResult.value = valueProxy;
              }
            }
          }
          return nextResult;
        },
        [Symbol.iterator]() {
          return this;
        }
      };
    }
    return result;
  };
}
function debugLog(...args) {
  const isBrowser = typeof window !== `undefined` && typeof localStorage !== `undefined`;
  if (isBrowser && localStorage.getItem(`DEBUG`) === `true`) {
    console.log(`[proxy]`, ...args);
  } else if (
    // true
    !isBrowser && typeof process !== `undefined` && process.env.DEBUG === `true`
  ) {
    console.log(`[proxy]`, ...args);
  }
}
function deepClone(obj, visited = /* @__PURE__ */ new WeakMap()) {
  if (obj === null || obj === void 0) {
    return obj;
  }
  if (typeof obj !== `object`) {
    return obj;
  }
  if (visited.has(obj)) {
    return visited.get(obj);
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }
  if (Array.isArray(obj)) {
    const arrayClone = [];
    visited.set(obj, arrayClone);
    obj.forEach((item, index) => {
      arrayClone[index] = deepClone(item, visited);
    });
    return arrayClone;
  }
  if (ArrayBuffer.isView(obj) && !(obj instanceof DataView)) {
    const TypedArrayConstructor = Object.getPrototypeOf(obj).constructor;
    const clone2 = new TypedArrayConstructor(
      obj.length
    );
    visited.set(obj, clone2);
    for (let i = 0; i < obj.length; i++) {
      clone2[i] = obj[i];
    }
    return clone2;
  }
  if (obj instanceof Map) {
    const clone2 = /* @__PURE__ */ new Map();
    visited.set(obj, clone2);
    obj.forEach((value, key) => {
      clone2.set(key, deepClone(value, visited));
    });
    return clone2;
  }
  if (obj instanceof Set) {
    const clone2 = /* @__PURE__ */ new Set();
    visited.set(obj, clone2);
    obj.forEach((value) => {
      clone2.add(deepClone(value, visited));
    });
    return clone2;
  }
  if (isTemporal(obj)) {
    return obj;
  }
  const clone = {};
  visited.set(obj, clone);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(
        obj[key],
        visited
      );
    }
  }
  const symbolProps = Object.getOwnPropertySymbols(obj);
  for (const sym of symbolProps) {
    clone[sym] = deepClone(
      obj[sym],
      visited
    );
  }
  return clone;
}
var count = 0;
function getProxyCount() {
  count += 1;
  return count;
}
function createChangeProxy(target, parent) {
  const changeProxyCache = /* @__PURE__ */ new Map();
  function memoizedCreateChangeProxy(innerTarget, innerParent) {
    debugLog(`Object ID:`, innerTarget.constructor.name);
    if (changeProxyCache.has(innerTarget)) {
      return changeProxyCache.get(innerTarget);
    } else {
      const changeProxy = createChangeProxy(innerTarget, innerParent);
      changeProxyCache.set(innerTarget, changeProxy);
      return changeProxy;
    }
  }
  const proxyCache = /* @__PURE__ */ new Map();
  const changeTracker = {
    copy_: deepClone(target),
    originalObject: deepClone(target),
    proxyCount: getProxyCount(),
    modified: false,
    assigned_: {},
    parent,
    target
    // Store reference to the target object
  };
  debugLog(
    `createChangeProxy called for target`,
    target,
    changeTracker.proxyCount
  );
  function markChanged(state) {
    if (!state.modified) {
      state.modified = true;
    }
    if (state.parent) {
      debugLog(`propagating change to parent`);
      if (`updateMap` in state.parent) {
        state.parent.updateMap(state.copy_);
      } else if (`updateSet` in state.parent) {
        state.parent.updateSet(state.copy_);
      } else {
        state.parent.tracker.copy_[state.parent.prop] = state.copy_;
        state.parent.tracker.assigned_[state.parent.prop] = true;
      }
      markChanged(state.parent.tracker);
    }
  }
  function checkIfReverted(state) {
    debugLog(
      `checkIfReverted called with assigned keys:`,
      Object.keys(state.assigned_)
    );
    if (Object.keys(state.assigned_).length === 0 && Object.getOwnPropertySymbols(state.assigned_).length === 0) {
      debugLog(`No assigned properties, returning true`);
      return true;
    }
    for (const prop in state.assigned_) {
      if (state.assigned_[prop] === true) {
        const currentValue = state.copy_[prop];
        const originalValue = state.originalObject[prop];
        debugLog(
          `Checking property ${String(prop)}, current:`,
          currentValue,
          `original:`,
          originalValue
        );
        if (!deepEquals(currentValue, originalValue)) {
          debugLog(`Property ${String(prop)} is different, returning false`);
          return false;
        }
      } else if (state.assigned_[prop] === false) {
        debugLog(`Property ${String(prop)} was deleted, returning false`);
        return false;
      }
    }
    const symbolProps = Object.getOwnPropertySymbols(state.assigned_);
    for (const sym of symbolProps) {
      if (state.assigned_[sym] === true) {
        const currentValue = state.copy_[sym];
        const originalValue = state.originalObject[sym];
        if (!deepEquals(currentValue, originalValue)) {
          debugLog(`Symbol property is different, returning false`);
          return false;
        }
      } else if (state.assigned_[sym] === false) {
        debugLog(`Symbol property was deleted, returning false`);
        return false;
      }
    }
    debugLog(`All properties match original values, returning true`);
    return true;
  }
  function checkParentStatus(parentState, childProp) {
    debugLog(`checkParentStatus called for child prop:`, childProp);
    const isReverted = checkIfReverted(parentState);
    debugLog(`Parent checkIfReverted returned:`, isReverted);
    if (isReverted) {
      debugLog(`Parent is fully reverted, clearing tracking`);
      parentState.modified = false;
      parentState.assigned_ = {};
      if (parentState.parent) {
        debugLog(`Continuing up the parent chain`);
        checkParentStatus(parentState.parent.tracker, parentState.parent.prop);
      }
    }
  }
  function createObjectProxy(obj) {
    debugLog(`createObjectProxy`, obj);
    if (proxyCache.has(obj)) {
      debugLog(`proxyCache found match`);
      return proxyCache.get(obj);
    }
    const proxy2 = new Proxy(obj, {
      get(ptarget, prop) {
        debugLog(`get`, ptarget, prop);
        const value = changeTracker.copy_[prop] ?? changeTracker.originalObject[prop];
        const originalValue = changeTracker.originalObject[prop];
        debugLog(`value (at top of proxy get)`, value);
        const desc = Object.getOwnPropertyDescriptor(ptarget, prop);
        if (desc?.get) {
          return value;
        }
        if (typeof value === `function`) {
          if (Array.isArray(ptarget)) {
            const methodName = prop.toString();
            if (ARRAY_MODIFYING_METHODS.has(methodName)) {
              return createModifyingMethodHandler(
                value,
                changeTracker,
                markChanged
              );
            }
            const iterationHandler = createArrayIterationHandler(
              methodName,
              value,
              changeTracker,
              memoizedCreateChangeProxy
            );
            if (iterationHandler) {
              return iterationHandler;
            }
            if (prop === Symbol.iterator) {
              return createArrayIteratorHandler(
                changeTracker,
                memoizedCreateChangeProxy
              );
            }
          }
          if (ptarget instanceof Map || ptarget instanceof Set) {
            const methodName = prop.toString();
            if (MAP_SET_MODIFYING_METHODS.has(methodName)) {
              return createModifyingMethodHandler(
                value,
                changeTracker,
                markChanged
              );
            }
            const iteratorHandler = createMapSetIteratorHandler(
              methodName,
              prop,
              value,
              ptarget,
              changeTracker,
              memoizedCreateChangeProxy,
              markChanged
            );
            if (iteratorHandler) {
              return iteratorHandler;
            }
          }
          return value.bind(ptarget);
        }
        if (isProxiableObject(value)) {
          const nestedParent = {
            tracker: changeTracker,
            prop: String(prop)
          };
          const { proxy: nestedProxy } = memoizedCreateChangeProxy(
            originalValue,
            nestedParent
          );
          proxyCache.set(value, nestedProxy);
          return nestedProxy;
        }
        return value;
      },
      set(_sobj, prop, value) {
        const currentValue = changeTracker.copy_[prop];
        debugLog(
          `set called for property ${String(prop)}, current:`,
          currentValue,
          `new:`,
          value
        );
        if (!deepEquals(currentValue, value)) {
          const originalValue = changeTracker.originalObject[prop];
          const isRevertToOriginal = deepEquals(value, originalValue);
          debugLog(
            `value:`,
            value,
            `original:`,
            originalValue,
            `isRevertToOriginal:`,
            isRevertToOriginal
          );
          if (isRevertToOriginal) {
            debugLog(`Reverting property ${String(prop)} to original value`);
            delete changeTracker.assigned_[prop.toString()];
            debugLog(`Updating copy with original value for ${String(prop)}`);
            changeTracker.copy_[prop] = deepClone(originalValue);
            debugLog(`Checking if all properties reverted`);
            const allReverted = checkIfReverted(changeTracker);
            debugLog(`All reverted:`, allReverted);
            if (allReverted) {
              debugLog(`All properties reverted, clearing tracking`);
              changeTracker.modified = false;
              changeTracker.assigned_ = {};
              if (parent) {
                debugLog(`Updating parent for property:`, parent.prop);
                checkParentStatus(parent.tracker, parent.prop);
              }
            } else {
              debugLog(`Some properties still changed, keeping modified flag`);
              changeTracker.modified = true;
            }
          } else {
            debugLog(`Setting new value for property ${String(prop)}`);
            changeTracker.copy_[prop] = value;
            changeTracker.assigned_[prop.toString()] = true;
            debugLog(`Marking object and ancestors as modified`, changeTracker);
            markChanged(changeTracker);
          }
        } else {
          debugLog(`Value unchanged, not tracking`);
        }
        return true;
      },
      defineProperty(ptarget, prop, descriptor) {
        const result = Reflect.defineProperty(ptarget, prop, descriptor);
        if (result && `value` in descriptor) {
          changeTracker.copy_[prop] = deepClone(descriptor.value);
          changeTracker.assigned_[prop.toString()] = true;
          markChanged(changeTracker);
        }
        return result;
      },
      getOwnPropertyDescriptor(ptarget, prop) {
        return Reflect.getOwnPropertyDescriptor(ptarget, prop);
      },
      preventExtensions(ptarget) {
        return Reflect.preventExtensions(ptarget);
      },
      isExtensible(ptarget) {
        return Reflect.isExtensible(ptarget);
      },
      deleteProperty(dobj, prop) {
        debugLog(`deleteProperty`, dobj, prop);
        const stringProp = typeof prop === `symbol` ? prop.toString() : prop;
        if (stringProp in dobj) {
          const hadPropertyInOriginal = stringProp in changeTracker.originalObject;
          const result = Reflect.deleteProperty(dobj, prop);
          if (result) {
            if (!hadPropertyInOriginal) {
              delete changeTracker.assigned_[stringProp];
              if (Object.keys(changeTracker.assigned_).length === 0 && Object.getOwnPropertySymbols(changeTracker.assigned_).length === 0) {
                changeTracker.modified = false;
              } else {
                changeTracker.modified = true;
              }
            } else {
              changeTracker.assigned_[stringProp] = false;
              markChanged(changeTracker);
            }
          }
          return result;
        }
        return true;
      }
    });
    proxyCache.set(obj, proxy2);
    return proxy2;
  }
  const proxy = createObjectProxy(changeTracker.copy_);
  return {
    proxy,
    getChanges: () => {
      debugLog(`getChanges called, modified:`, changeTracker.modified);
      debugLog(changeTracker);
      if (!changeTracker.modified) {
        debugLog(`Object not modified, returning empty object`);
        return {};
      }
      if (typeof changeTracker.copy_ !== `object` || Array.isArray(changeTracker.copy_)) {
        return changeTracker.copy_;
      }
      if (Object.keys(changeTracker.assigned_).length === 0) {
        return changeTracker.copy_;
      }
      const result = {};
      for (const key in changeTracker.copy_) {
        if (changeTracker.assigned_[key] === true && key in changeTracker.copy_) {
          result[key] = changeTracker.copy_[key];
        }
      }
      debugLog(`Returning copy:`, result);
      return result;
    }
  };
}
function createArrayChangeProxy(targets) {
  const proxiesWithChanges = targets.map((target) => createChangeProxy(target));
  return {
    proxies: proxiesWithChanges.map((p) => p.proxy),
    getChanges: () => proxiesWithChanges.map((p) => p.getChanges())
  };
}
function withChangeTracking(target, callback) {
  const { proxy, getChanges } = createChangeProxy(target);
  callback(proxy);
  return getChanges();
}
function withArrayChangeTracking(targets, callback) {
  const { proxies, getChanges } = createArrayChangeProxy(targets);
  callback(proxies);
  return getChanges();
}

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/deferred.js
function createDeferred2() {
  let resolve;
  let reject;
  let isPending = true;
  const promise = new Promise((res, rej) => {
    resolve = (value) => {
      isPending = false;
      res(value);
    };
    reject = (reason) => {
      isPending = false;
      rej(reason);
    };
  });
  return {
    promise,
    resolve,
    reject,
    isPending: () => isPending
  };
}

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/scheduler.js
function isPendingAwareJob(dep) {
  return typeof dep === `object` && dep !== null && typeof dep.hasPendingGraphRun === `function`;
}
var Scheduler = class {
  constructor() {
    this.contexts = /* @__PURE__ */ new Map();
    this.clearListeners = /* @__PURE__ */ new Set();
  }
  /**
   * Get or create the state bucket for a context.
   */
  getOrCreateContext(contextId) {
    let context = this.contexts.get(contextId);
    if (!context) {
      context = {
        queue: [],
        jobs: /* @__PURE__ */ new Map(),
        dependencies: /* @__PURE__ */ new Map(),
        completed: /* @__PURE__ */ new Set()
      };
      this.contexts.set(contextId, context);
    }
    return context;
  }
  /**
   * Schedule work. Without a context id, executes immediately.
   * Otherwise queues the job to be flushed once dependencies are satisfied.
   * Scheduling the same jobId again replaces the previous run function.
   */
  schedule({ contextId, jobId, dependencies, run: run2 }) {
    if (typeof contextId === `undefined`) {
      run2();
      return;
    }
    const context = this.getOrCreateContext(contextId);
    if (!context.jobs.has(jobId)) {
      context.queue.push(jobId);
    }
    context.jobs.set(jobId, run2);
    if (dependencies) {
      const depSet = new Set(dependencies);
      depSet.delete(jobId);
      context.dependencies.set(jobId, depSet);
    } else if (!context.dependencies.has(jobId)) {
      context.dependencies.set(jobId, /* @__PURE__ */ new Set());
    }
    context.completed.delete(jobId);
  }
  /**
   * Flush all queued work for a context. Jobs with unmet dependencies are retried.
   * Throws if a pass completes without running any job (dependency cycle).
   */
  flush(contextId) {
    const context = this.contexts.get(contextId);
    if (!context) return;
    const { queue, jobs, dependencies, completed } = context;
    while (queue.length > 0) {
      let ranThisPass = false;
      const jobsThisPass = queue.length;
      for (let i = 0; i < jobsThisPass; i++) {
        const jobId = queue.shift();
        const run2 = jobs.get(jobId);
        if (!run2) {
          dependencies.delete(jobId);
          completed.delete(jobId);
          continue;
        }
        const deps = dependencies.get(jobId);
        let ready = !deps;
        if (deps) {
          ready = true;
          for (const dep of deps) {
            if (dep === jobId) continue;
            const depHasPending = isPendingAwareJob(dep) && dep.hasPendingGraphRun(contextId);
            if (jobs.has(dep) && !completed.has(dep) || !jobs.has(dep) && depHasPending) {
              ready = false;
              break;
            }
          }
        }
        if (ready) {
          jobs.delete(jobId);
          dependencies.delete(jobId);
          run2();
          completed.add(jobId);
          ranThisPass = true;
        } else {
          queue.push(jobId);
        }
      }
      if (!ranThisPass) {
        throw new Error(
          `Scheduler detected unresolved dependencies for context ${String(
            contextId
          )}.`
        );
      }
    }
    this.contexts.delete(contextId);
  }
  /**
   * Flush all contexts with pending work. Useful during tear-down.
   */
  flushAll() {
    for (const contextId of Array.from(this.contexts.keys())) {
      this.flush(contextId);
    }
  }
  /** Clear all scheduled jobs for a context. */
  clear(contextId) {
    this.contexts.delete(contextId);
    this.clearListeners.forEach((listener) => listener(contextId));
  }
  /** Register a listener to be notified when a context is cleared. */
  onClear(listener) {
    this.clearListeners.add(listener);
    return () => this.clearListeners.delete(listener);
  }
  /** Check if a context has pending jobs. */
  hasPendingJobs(contextId) {
    const context = this.contexts.get(contextId);
    return !!context && context.jobs.size > 0;
  }
  /** Remove a single job from a context and clean up its dependencies. */
  clearJob(contextId, jobId) {
    const context = this.contexts.get(contextId);
    if (!context) return;
    context.jobs.delete(jobId);
    context.dependencies.delete(jobId);
    context.completed.delete(jobId);
    context.queue = context.queue.filter((id) => id !== jobId);
    if (context.jobs.size === 0) {
      this.contexts.delete(contextId);
    }
  }
};
var transactionScopedScheduler = new Scheduler();

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/transactions.js
var transactions = [];
var transactionStack = [];
var sequenceNumber = 0;
function mergePendingMutations(existing, incoming) {
  switch (`${existing.type}-${incoming.type}`) {
    case `insert-update`: {
      return {
        ...existing,
        type: `insert`,
        original: {},
        modified: incoming.modified,
        changes: { ...existing.changes, ...incoming.changes },
        // Keep existing keys (key changes not allowed in updates)
        key: existing.key,
        globalKey: existing.globalKey,
        // Merge metadata (last-write-wins)
        metadata: incoming.metadata ?? existing.metadata,
        syncMetadata: { ...existing.syncMetadata, ...incoming.syncMetadata },
        // Update tracking info
        mutationId: incoming.mutationId,
        updatedAt: incoming.updatedAt
      };
    }
    case `insert-delete`:
      return null;
    case `update-delete`:
      return incoming;
    case `update-update`: {
      return {
        ...incoming,
        // Keep original from first update
        original: existing.original,
        // Union the changes from both updates
        changes: { ...existing.changes, ...incoming.changes },
        // Merge metadata
        metadata: incoming.metadata ?? existing.metadata,
        syncMetadata: { ...existing.syncMetadata, ...incoming.syncMetadata }
      };
    }
    case `delete-delete`:
    case `insert-insert`:
      return incoming;
    default: {
      const _exhaustive = `${existing.type}-${incoming.type}`;
      throw new Error(`Unhandled mutation combination: ${_exhaustive}`);
    }
  }
}
function createTransaction(config) {
  const newTransaction = new Transaction(config);
  transactions.push(newTransaction);
  return newTransaction;
}
function getActiveTransaction() {
  if (transactionStack.length > 0) {
    return transactionStack.slice(-1)[0];
  } else {
    return void 0;
  }
}
function registerTransaction(tx) {
  transactionScopedScheduler.clear(tx.id);
  transactionStack.push(tx);
}
function unregisterTransaction(tx) {
  try {
    transactionScopedScheduler.flush(tx.id);
  } finally {
    transactionStack = transactionStack.filter((t2) => t2.id !== tx.id);
  }
}
function removeFromPendingList(tx) {
  const index = transactions.findIndex((t2) => t2.id === tx.id);
  if (index !== -1) {
    transactions.splice(index, 1);
  }
}
var Transaction = class {
  constructor(config) {
    if (typeof config.mutationFn === `undefined`) {
      throw new MissingMutationFunctionError();
    }
    this.id = config.id ?? crypto.randomUUID();
    this.mutationFn = config.mutationFn;
    this.state = `pending`;
    this.mutations = [];
    this.isPersisted = createDeferred2();
    this.autoCommit = config.autoCommit ?? true;
    this.createdAt = /* @__PURE__ */ new Date();
    this.sequenceNumber = sequenceNumber++;
    this.metadata = config.metadata ?? {};
  }
  setState(newState) {
    this.state = newState;
    if (newState === `completed` || newState === `failed`) {
      removeFromPendingList(this);
    }
  }
  /**
   * Execute collection operations within this transaction
   * @param callback - Function containing collection operations to group together. If the
   * callback returns a Promise, the transaction context will remain active until the promise
   * settles, allowing optimistic writes after `await` boundaries.
   * @returns This transaction for chaining
   * @example
   * // Group multiple operations
   * const tx = createTransaction({ mutationFn: async () => {
   *   // Send to API
   * }})
   *
   * tx.mutate(() => {
   *   collection.insert({ id: "1", text: "Buy milk" })
   *   collection.update("2", draft => { draft.completed = true })
   *   collection.delete("3")
   * })
   *
   * await tx.isPersisted.promise
   *
   * @example
   * // Handle mutate errors
   * try {
   *   tx.mutate(() => {
   *     collection.insert({ id: "invalid" }) // This might throw
   *   })
   * } catch (error) {
   *   console.log('Mutation failed:', error)
   * }
   *
   * @example
   * // Manual commit control
   * const tx = createTransaction({ autoCommit: false, mutationFn: async () => {} })
   *
   * tx.mutate(() => {
   *   collection.insert({ id: "1", text: "Item" })
   * })
   *
   * // Commit later when ready
   * await tx.commit()
   */
  mutate(callback) {
    if (this.state !== `pending`) {
      throw new TransactionNotPendingMutateError();
    }
    registerTransaction(this);
    try {
      callback();
    } finally {
      unregisterTransaction(this);
    }
    if (this.autoCommit) {
      this.commit().catch(() => {
      });
    }
    return this;
  }
  /**
   * Apply new mutations to this transaction, intelligently merging with existing mutations
   *
   * When mutations operate on the same item (same globalKey), they are merged according to
   * the following rules:
   *
   * - **insert + update** → insert (merge changes, keep empty original)
   * - **insert + delete** → removed (mutations cancel each other out)
   * - **update + delete** → delete (delete dominates)
   * - **update + update** → update (union changes, keep first original)
   * - **same type** → replace with latest
   *
   * This merging reduces over-the-wire churn and keeps the optimistic local view
   * aligned with user intent.
   *
   * @param mutations - Array of new mutations to apply
   */
  applyMutations(mutations) {
    for (const newMutation of mutations) {
      const existingIndex = this.mutations.findIndex(
        (m) => m.globalKey === newMutation.globalKey
      );
      if (existingIndex >= 0) {
        const existingMutation = this.mutations[existingIndex];
        const mergeResult = mergePendingMutations(existingMutation, newMutation);
        if (mergeResult === null) {
          this.mutations.splice(existingIndex, 1);
        } else {
          this.mutations[existingIndex] = mergeResult;
        }
      } else {
        this.mutations.push(newMutation);
      }
    }
  }
  /**
   * Rollback the transaction and any conflicting transactions
   * @param config - Configuration for rollback behavior
   * @returns This transaction for chaining
   * @example
   * // Manual rollback
   * const tx = createTransaction({ mutationFn: async () => {
   *   // Send to API
   * }})
   *
   * tx.mutate(() => {
   *   collection.insert({ id: "1", text: "Buy milk" })
   * })
   *
   * // Rollback if needed
   * if (shouldCancel) {
   *   tx.rollback()
   * }
   *
   * @example
   * // Handle rollback cascade (automatic)
   * const tx1 = createTransaction({ mutationFn: async () => {} })
   * const tx2 = createTransaction({ mutationFn: async () => {} })
   *
   * tx1.mutate(() => collection.update("1", draft => { draft.value = "A" }))
   * tx2.mutate(() => collection.update("1", draft => { draft.value = "B" })) // Same item
   *
   * tx1.rollback() // This will also rollback tx2 due to conflict
   *
   * @example
   * // Handle rollback in error scenarios
   * try {
   *   await tx.isPersisted.promise
   * } catch (error) {
   *   console.log('Transaction was rolled back:', error)
   *   // Transaction automatically rolled back on mutation function failure
   * }
   */
  rollback(config) {
    const isSecondaryRollback = config?.isSecondaryRollback ?? false;
    if (this.state === `completed`) {
      throw new TransactionAlreadyCompletedRollbackError();
    }
    this.setState(`failed`);
    if (!isSecondaryRollback) {
      const mutationIds = /* @__PURE__ */ new Set();
      this.mutations.forEach((m) => mutationIds.add(m.globalKey));
      for (const t2 of transactions) {
        t2.state === `pending` && t2.mutations.some((m) => mutationIds.has(m.globalKey)) && t2.rollback({ isSecondaryRollback: true });
      }
    }
    this.isPersisted.reject(this.error?.error);
    this.touchCollection();
    return this;
  }
  // Tell collection that something has changed with the transaction
  touchCollection() {
    const hasCalled = /* @__PURE__ */ new Set();
    for (const mutation of this.mutations) {
      if (!hasCalled.has(mutation.collection.id)) {
        mutation.collection._state.onTransactionStateChange();
        if (mutation.collection._state.pendingSyncedTransactions.length > 0) {
          mutation.collection._state.commitPendingTransactions();
        }
        hasCalled.add(mutation.collection.id);
      }
    }
  }
  /**
   * Commit the transaction and execute the mutation function
   * @returns Promise that resolves to this transaction when complete
   * @example
   * // Manual commit (when autoCommit is false)
   * const tx = createTransaction({
   *   autoCommit: false,
   *   mutationFn: async ({ transaction }) => {
   *     await api.saveChanges(transaction.mutations)
   *   }
   * })
   *
   * tx.mutate(() => {
   *   collection.insert({ id: "1", text: "Buy milk" })
   * })
   *
   * await tx.commit() // Manually commit
   *
   * @example
   * // Handle commit errors
   * try {
   *   const tx = createTransaction({
   *     mutationFn: async () => { throw new Error("API failed") }
   *   })
   *
   *   tx.mutate(() => {
   *     collection.insert({ id: "1", text: "Item" })
   *   })
   *
   *   await tx.commit()
   * } catch (error) {
   *   console.log('Commit failed, transaction rolled back:', error)
   * }
   *
   * @example
   * // Check transaction state after commit
   * await tx.commit()
   * console.log(tx.state) // "completed" or "failed"
   */
  async commit() {
    if (this.state !== `pending`) {
      throw new TransactionNotPendingCommitError();
    }
    this.setState(`persisting`);
    if (this.mutations.length === 0) {
      this.setState(`completed`);
      this.isPersisted.resolve(this);
      return this;
    }
    try {
      await this.mutationFn({
        transaction: this
      });
      this.setState(`completed`);
      this.touchCollection();
      this.isPersisted.resolve(this);
    } catch (error) {
      const originalError = error instanceof Error ? error : new Error(String(error));
      this.error = {
        message: originalError.message,
        error: originalError
      };
      this.rollback();
      throw originalError;
    }
    return this;
  }
  /**
   * Compare two transactions by their createdAt time and sequence number in order
   * to sort them in the order they were created.
   * @param other - The other transaction to compare to
   * @returns -1 if this transaction was created before the other, 1 if it was created after, 0 if they were created at the same time
   */
  compareCreatedAt(other) {
    const createdAtComparison = this.createdAt.getTime() - other.createdAt.getTime();
    if (createdAtComparison !== 0) {
      return createdAtComparison;
    }
    return this.sequenceNumber - other.sequenceNumber;
  }
};

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/collection/mutations.js
var CollectionMutationsManager = class {
  constructor(config, id) {
    this.insert = (data, config2) => {
      this.lifecycle.validateCollectionUsable(`insert`);
      const state = this.state;
      const ambientTransaction = getActiveTransaction();
      if (!ambientTransaction && !this.config.onInsert) {
        throw new MissingInsertHandlerError();
      }
      const items = Array.isArray(data) ? data : [data];
      const mutations = [];
      const keysInCurrentBatch = /* @__PURE__ */ new Set();
      items.forEach((item) => {
        const validatedData = this.validateData(item, `insert`);
        const key = this.config.getKey(validatedData);
        if (this.state.has(key) || keysInCurrentBatch.has(key)) {
          throw new DuplicateKeyError(key);
        }
        keysInCurrentBatch.add(key);
        const globalKey = this.generateGlobalKey(key, item);
        const mutation = {
          mutationId: crypto.randomUUID(),
          original: {},
          modified: validatedData,
          // Pick the values from validatedData based on what's passed in - this is for cases
          // where a schema has default values. The validated data has the extra default
          // values but for changes, we just want to show the data that was actually passed in.
          changes: Object.fromEntries(
            Object.keys(item).map((k) => [
              k,
              validatedData[k]
            ])
          ),
          globalKey,
          key,
          metadata: config2?.metadata,
          syncMetadata: this.config.sync.getSyncMetadata?.() || {},
          optimistic: config2?.optimistic ?? true,
          type: `insert`,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          collection: this.collection
        };
        mutations.push(mutation);
      });
      if (ambientTransaction) {
        ambientTransaction.applyMutations(mutations);
        state.transactions.set(ambientTransaction.id, ambientTransaction);
        state.scheduleTransactionCleanup(ambientTransaction);
        state.recomputeOptimisticState(true);
        return ambientTransaction;
      } else {
        const directOpTransaction = createTransaction({
          mutationFn: async (params) => {
            return await this.config.onInsert({
              transaction: params.transaction,
              collection: this.collection
            });
          }
        });
        directOpTransaction.applyMutations(mutations);
        directOpTransaction.commit().catch(() => void 0);
        state.transactions.set(directOpTransaction.id, directOpTransaction);
        state.scheduleTransactionCleanup(directOpTransaction);
        state.recomputeOptimisticState(true);
        return directOpTransaction;
      }
    };
    this.delete = (keys, config2) => {
      const state = this.state;
      this.lifecycle.validateCollectionUsable(`delete`);
      const ambientTransaction = getActiveTransaction();
      if (!ambientTransaction && !this.config.onDelete) {
        throw new MissingDeleteHandlerError();
      }
      if (Array.isArray(keys) && keys.length === 0) {
        throw new NoKeysPassedToDeleteError();
      }
      const keysArray = Array.isArray(keys) ? keys : [keys];
      const mutations = [];
      for (const key of keysArray) {
        if (!this.state.has(key)) {
          throw new DeleteKeyNotFoundError(key);
        }
        const globalKey = this.generateGlobalKey(key, this.state.get(key));
        const mutation = {
          mutationId: crypto.randomUUID(),
          original: this.state.get(key),
          modified: this.state.get(key),
          changes: this.state.get(key),
          globalKey,
          key,
          metadata: config2?.metadata,
          syncMetadata: state.syncedMetadata.get(key) || {},
          optimistic: config2?.optimistic ?? true,
          type: `delete`,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          collection: this.collection
        };
        mutations.push(mutation);
      }
      if (ambientTransaction) {
        ambientTransaction.applyMutations(mutations);
        state.transactions.set(ambientTransaction.id, ambientTransaction);
        state.scheduleTransactionCleanup(ambientTransaction);
        state.recomputeOptimisticState(true);
        return ambientTransaction;
      }
      const directOpTransaction = createTransaction({
        autoCommit: true,
        mutationFn: async (params) => {
          return this.config.onDelete({
            transaction: params.transaction,
            collection: this.collection
          });
        }
      });
      directOpTransaction.applyMutations(mutations);
      directOpTransaction.commit().catch(() => void 0);
      state.transactions.set(directOpTransaction.id, directOpTransaction);
      state.scheduleTransactionCleanup(directOpTransaction);
      state.recomputeOptimisticState(true);
      return directOpTransaction;
    };
    this.id = id;
    this.config = config;
  }
  setDeps(deps) {
    this.lifecycle = deps.lifecycle;
    this.state = deps.state;
    this.collection = deps.collection;
  }
  ensureStandardSchema(schema) {
    if (schema && `~standard` in schema) {
      return schema;
    }
    throw new InvalidSchemaError();
  }
  validateData(data, type, key) {
    if (!this.config.schema) return data;
    const standardSchema = this.ensureStandardSchema(this.config.schema);
    if (type === `update` && key) {
      const existingData = this.state.get(key);
      if (existingData && data && typeof data === `object` && typeof existingData === `object`) {
        const mergedData = Object.assign({}, existingData, data);
        const result2 = standardSchema[`~standard`].validate(mergedData);
        if (result2 instanceof Promise) {
          throw new SchemaMustBeSynchronousError();
        }
        if (`issues` in result2 && result2.issues) {
          const typedIssues = result2.issues.map((issue) => ({
            message: issue.message,
            path: issue.path?.map((p) => String(p))
          }));
          throw new SchemaValidationError(type, typedIssues);
        }
        const validatedMergedData = result2.value;
        const modifiedKeys = Object.keys(data);
        const extractedChanges = Object.fromEntries(
          modifiedKeys.map((k) => [k, validatedMergedData[k]])
        );
        return extractedChanges;
      }
    }
    const result = standardSchema[`~standard`].validate(data);
    if (result instanceof Promise) {
      throw new SchemaMustBeSynchronousError();
    }
    if (`issues` in result && result.issues) {
      const typedIssues = result.issues.map((issue) => ({
        message: issue.message,
        path: issue.path?.map((p) => String(p))
      }));
      throw new SchemaValidationError(type, typedIssues);
    }
    return result.value;
  }
  generateGlobalKey(key, item) {
    if (typeof key !== `string` && typeof key !== `number`) {
      if (typeof key === `undefined`) {
        throw new UndefinedKeyError(item);
      }
      throw new InvalidKeyError(key, item);
    }
    return `KEY::${this.id}/${key}`;
  }
  /**
   * Updates one or more items in the collection using a callback function
   */
  update(keys, configOrCallback, maybeCallback) {
    if (typeof keys === `undefined`) {
      throw new MissingUpdateArgumentError();
    }
    const state = this.state;
    this.lifecycle.validateCollectionUsable(`update`);
    const ambientTransaction = getActiveTransaction();
    if (!ambientTransaction && !this.config.onUpdate) {
      throw new MissingUpdateHandlerError();
    }
    const isArray3 = Array.isArray(keys);
    const keysArray = isArray3 ? keys : [keys];
    if (isArray3 && keysArray.length === 0) {
      throw new NoKeysPassedToUpdateError();
    }
    const callback = typeof configOrCallback === `function` ? configOrCallback : maybeCallback;
    const config = typeof configOrCallback === `function` ? {} : configOrCallback;
    const currentObjects = keysArray.map((key) => {
      const item = this.state.get(key);
      if (!item) {
        throw new UpdateKeyNotFoundError(key);
      }
      return item;
    });
    let changesArray;
    if (isArray3) {
      changesArray = withArrayChangeTracking(
        currentObjects,
        callback
      );
    } else {
      const result = withChangeTracking(
        currentObjects[0],
        callback
      );
      changesArray = [result];
    }
    const mutations = keysArray.map((key, index) => {
      const itemChanges = changesArray[index];
      if (!itemChanges || Object.keys(itemChanges).length === 0) {
        return null;
      }
      const originalItem = currentObjects[index];
      const validatedUpdatePayload = this.validateData(
        itemChanges,
        `update`,
        key
      );
      const modifiedItem = Object.assign(
        {},
        originalItem,
        validatedUpdatePayload
      );
      const originalItemId = this.config.getKey(originalItem);
      const modifiedItemId = this.config.getKey(modifiedItem);
      if (originalItemId !== modifiedItemId) {
        throw new KeyUpdateNotAllowedError(originalItemId, modifiedItemId);
      }
      const globalKey = this.generateGlobalKey(modifiedItemId, modifiedItem);
      return {
        mutationId: crypto.randomUUID(),
        original: originalItem,
        modified: modifiedItem,
        // Pick the values from modifiedItem based on what's passed in - this is for cases
        // where a schema has default values or transforms. The modified data has the extra
        // default or transformed values but for changes, we just want to show the data that
        // was actually passed in.
        changes: Object.fromEntries(
          Object.keys(itemChanges).map((k) => [
            k,
            modifiedItem[k]
          ])
        ),
        globalKey,
        key,
        metadata: config.metadata,
        syncMetadata: state.syncedMetadata.get(key) || {},
        optimistic: config.optimistic ?? true,
        type: `update`,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        collection: this.collection
      };
    }).filter(Boolean);
    if (mutations.length === 0) {
      const emptyTransaction = createTransaction({
        mutationFn: async () => {
        }
      });
      emptyTransaction.commit().catch(() => void 0);
      state.scheduleTransactionCleanup(emptyTransaction);
      return emptyTransaction;
    }
    if (ambientTransaction) {
      ambientTransaction.applyMutations(mutations);
      state.transactions.set(ambientTransaction.id, ambientTransaction);
      state.scheduleTransactionCleanup(ambientTransaction);
      state.recomputeOptimisticState(true);
      return ambientTransaction;
    }
    const directOpTransaction = createTransaction({
      mutationFn: async (params) => {
        return this.config.onUpdate({
          transaction: params.transaction,
          collection: this.collection
        });
      }
    });
    directOpTransaction.applyMutations(mutations);
    directOpTransaction.commit().catch(() => void 0);
    state.transactions.set(directOpTransaction.id, directOpTransaction);
    state.scheduleTransactionCleanup(directOpTransaction);
    state.recomputeOptimisticState(true);
    return directOpTransaction;
  }
};

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/collection/events.js
var CollectionEventsManager = class extends EventEmitter {
  constructor() {
    super();
  }
  setDeps(deps) {
    this.collection = deps.collection;
  }
  /**
   * Emit an event to all listeners
   * Public API for emitting collection events
   */
  emit(event, eventPayload) {
    this.emitInner(event, eventPayload);
  }
  emitStatusChange(status, previousStatus) {
    this.emit(`status:change`, {
      type: `status:change`,
      collection: this.collection,
      previousStatus,
      status
    });
    const eventKey = `status:${status}`;
    this.emit(eventKey, {
      type: eventKey,
      collection: this.collection,
      previousStatus,
      status
    });
  }
  emitSubscribersChange(subscriberCount, previousSubscriberCount) {
    this.emit(`subscribers:change`, {
      type: `subscribers:change`,
      collection: this.collection,
      previousSubscriberCount,
      subscriberCount
    });
  }
  cleanup() {
    this.clearListeners();
  }
};

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/collection/index.js
function createCollection(options) {
  const collection = new CollectionImpl(
    options
  );
  if (options.utils) {
    collection.utils = options.utils;
  } else {
    collection.utils = {};
  }
  return collection;
}
var CollectionImpl = class {
  /**
   * Creates a new Collection instance
   *
   * @param config - Configuration object for the collection
   * @throws Error if sync config is missing
   */
  constructor(config) {
    this.utils = {};
    this.insert = (data, config2) => {
      return this._mutations.insert(data, config2);
    };
    this.delete = (keys, config2) => {
      return this._mutations.delete(keys, config2);
    };
    if (!config) {
      throw new CollectionRequiresConfigError();
    }
    if (!config.sync) {
      throw new CollectionRequiresSyncConfigError();
    }
    if (config.id) {
      this.id = config.id;
    } else {
      this.id = crypto.randomUUID();
    }
    this.config = {
      ...config,
      autoIndex: config.autoIndex ?? `eager`
    };
    this._changes = new CollectionChangesManager();
    this._events = new CollectionEventsManager();
    this._indexes = new CollectionIndexesManager();
    this._lifecycle = new CollectionLifecycleManager(config, this.id);
    this._mutations = new CollectionMutationsManager(config, this.id);
    this._state = new CollectionStateManager(config);
    this._sync = new CollectionSyncManager(config, this.id);
    this.comparisonOpts = buildCompareOptionsFromConfig(config);
    this._changes.setDeps({
      collection: this,
      // Required for passing to CollectionSubscription
      lifecycle: this._lifecycle,
      sync: this._sync,
      events: this._events
    });
    this._events.setDeps({
      collection: this
      // Required for adding to emitted events
    });
    this._indexes.setDeps({
      state: this._state,
      lifecycle: this._lifecycle
    });
    this._lifecycle.setDeps({
      changes: this._changes,
      events: this._events,
      indexes: this._indexes,
      state: this._state,
      sync: this._sync
    });
    this._mutations.setDeps({
      collection: this,
      // Required for passing to config.onInsert/onUpdate/onDelete and annotating mutations
      lifecycle: this._lifecycle,
      state: this._state
    });
    this._state.setDeps({
      collection: this,
      // Required for filtering events to only include this collection
      lifecycle: this._lifecycle,
      changes: this._changes,
      indexes: this._indexes,
      events: this._events
    });
    this._sync.setDeps({
      collection: this,
      // Required for passing to config.sync callback
      state: this._state,
      lifecycle: this._lifecycle,
      events: this._events
    });
    if (config.startSync === true) {
      this._sync.startSync();
    }
  }
  /**
   * Gets the current status of the collection
   */
  get status() {
    return this._lifecycle.status;
  }
  /**
   * Get the number of subscribers to the collection
   */
  get subscriberCount() {
    return this._changes.activeSubscribersCount;
  }
  /**
   * Register a callback to be executed when the collection first becomes ready
   * Useful for preloading collections
   * @param callback Function to call when the collection first becomes ready
   * @example
   * collection.onFirstReady(() => {
   *   console.log('Collection is ready for the first time')
   *   // Safe to access collection.state now
   * })
   */
  onFirstReady(callback) {
    return this._lifecycle.onFirstReady(callback);
  }
  /**
   * Check if the collection is ready for use
   * Returns true if the collection has been marked as ready by its sync implementation
   * @returns true if the collection is ready, false otherwise
   * @example
   * if (collection.isReady()) {
   *   console.log('Collection is ready, data is available')
   *   // Safe to access collection.state
   * } else {
   *   console.log('Collection is still loading')
   * }
   */
  isReady() {
    return this._lifecycle.status === `ready`;
  }
  /**
   * Check if the collection is currently loading more data
   * @returns true if the collection has pending load more operations, false otherwise
   */
  get isLoadingSubset() {
    return this._sync.isLoadingSubset;
  }
  /**
   * Start sync immediately - internal method for compiled queries
   * This bypasses lazy loading for special cases like live query results
   */
  startSyncImmediate() {
    this._sync.startSync();
  }
  /**
   * Preload the collection data by starting sync if not already started
   * Multiple concurrent calls will share the same promise
   */
  preload() {
    return this._sync.preload();
  }
  /**
   * Get the current value for a key (virtual derived state)
   */
  get(key) {
    return this._state.get(key);
  }
  /**
   * Check if a key exists in the collection (virtual derived state)
   */
  has(key) {
    return this._state.has(key);
  }
  /**
   * Get the current size of the collection (cached)
   */
  get size() {
    return this._state.size;
  }
  /**
   * Get all keys (virtual derived state)
   */
  *keys() {
    yield* this._state.keys();
  }
  /**
   * Get all values (virtual derived state)
   */
  *values() {
    yield* this._state.values();
  }
  /**
   * Get all entries (virtual derived state)
   */
  *entries() {
    yield* this._state.entries();
  }
  /**
   * Get all entries (virtual derived state)
   */
  *[Symbol.iterator]() {
    yield* this._state[Symbol.iterator]();
  }
  /**
   * Execute a callback for each entry in the collection
   */
  forEach(callbackfn) {
    return this._state.forEach(callbackfn);
  }
  /**
   * Create a new array with the results of calling a function for each entry in the collection
   */
  map(callbackfn) {
    return this._state.map(callbackfn);
  }
  getKeyFromItem(item) {
    return this.config.getKey(item);
  }
  /**
   * Creates an index on a collection for faster queries.
   * Indexes significantly improve query performance by allowing constant time lookups
   * and logarithmic time range queries instead of full scans.
   *
   * @template TResolver - The type of the index resolver (constructor or async loader)
   * @param indexCallback - Function that extracts the indexed value from each item
   * @param config - Configuration including index type and type-specific options
   * @returns An index proxy that provides access to the index when ready
   *
   * @example
   * // Create a default B+ tree index
   * const ageIndex = collection.createIndex((row) => row.age)
   *
   * // Create a ordered index with custom options
   * const ageIndex = collection.createIndex((row) => row.age, {
   *   indexType: BTreeIndex,
   *   options: {
   *     compareFn: customComparator,
   *     compareOptions: { direction: 'asc', nulls: 'first', stringSort: 'lexical' }
   *   },
   *   name: 'age_btree'
   * })
   *
   * // Create an async-loaded index
   * const textIndex = collection.createIndex((row) => row.content, {
   *   indexType: async () => {
   *     const { FullTextIndex } = await import('./indexes/fulltext.js')
   *     return FullTextIndex
   *   },
   *   options: { language: 'en' }
   * })
   */
  createIndex(indexCallback, config = {}) {
    return this._indexes.createIndex(indexCallback, config);
  }
  /**
   * Get resolved indexes for query optimization
   */
  get indexes() {
    return this._indexes.indexes;
  }
  /**
   * Validates the data against the schema
   */
  validateData(data, type, key) {
    return this._mutations.validateData(data, type, key);
  }
  get compareOptions() {
    return { ...this.comparisonOpts };
  }
  update(keys, configOrCallback, maybeCallback) {
    return this._mutations.update(keys, configOrCallback, maybeCallback);
  }
  /**
   * Gets the current state of the collection as a Map
   * @returns Map containing all items in the collection, with keys as identifiers
   * @example
   * const itemsMap = collection.state
   * console.log(`Collection has ${itemsMap.size} items`)
   *
   * for (const [key, item] of itemsMap) {
   *   console.log(`${key}: ${item.title}`)
   * }
   *
   * // Check if specific item exists
   * if (itemsMap.has("todo-1")) {
   *   console.log("Todo 1 exists:", itemsMap.get("todo-1"))
   * }
   */
  get state() {
    const result = /* @__PURE__ */ new Map();
    for (const [key, value] of this.entries()) {
      result.set(key, value);
    }
    return result;
  }
  /**
   * Gets the current state of the collection as a Map, but only resolves when data is available
   * Waits for the first sync commit to complete before resolving
   *
   * @returns Promise that resolves to a Map containing all items in the collection
   */
  stateWhenReady() {
    if (this.size > 0 || this.isReady()) {
      return Promise.resolve(this.state);
    }
    return this.preload().then(() => this.state);
  }
  /**
   * Gets the current state of the collection as an Array
   *
   * @returns An Array containing all items in the collection
   */
  get toArray() {
    return Array.from(this.values());
  }
  /**
   * Gets the current state of the collection as an Array, but only resolves when data is available
   * Waits for the first sync commit to complete before resolving
   *
   * @returns Promise that resolves to an Array containing all items in the collection
   */
  toArrayWhenReady() {
    if (this.size > 0 || this.isReady()) {
      return Promise.resolve(this.toArray);
    }
    return this.preload().then(() => this.toArray);
  }
  /**
   * Returns the current state of the collection as an array of changes
   * @param options - Options including optional where filter
   * @returns An array of changes
   * @example
   * // Get all items as changes
   * const allChanges = collection.currentStateAsChanges()
   *
   * // Get only items matching a condition
   * const activeChanges = collection.currentStateAsChanges({
   *   where: (row) => row.status === 'active'
   * })
   *
   * // Get only items using a pre-compiled expression
   * const activeChanges = collection.currentStateAsChanges({
   *   whereExpression: eq(row.status, 'active')
   * })
   */
  currentStateAsChanges(options = {}) {
    return currentStateAsChanges(this, options);
  }
  /**
   * Subscribe to changes in the collection
   * @param callback - Function called when items change
   * @param options - Subscription options including includeInitialState and where filter
   * @returns Unsubscribe function - Call this to stop listening for changes
   * @example
   * // Basic subscription
   * const subscription = collection.subscribeChanges((changes) => {
   *   changes.forEach(change => {
   *     console.log(`${change.type}: ${change.key}`, change.value)
   *   })
   * })
   *
   * // Later: subscription.unsubscribe()
   *
   * @example
   * // Include current state immediately
   * const subscription = collection.subscribeChanges((changes) => {
   *   updateUI(changes)
   * }, { includeInitialState: true })
   *
   * @example
   * // Subscribe only to changes matching a condition using where callback
   * import { eq } from "@tanstack/db"
   *
   * const subscription = collection.subscribeChanges((changes) => {
   *   updateUI(changes)
   * }, {
   *   includeInitialState: true,
   *   where: (row) => eq(row.status, "active")
   * })
   *
   * @example
   * // Using multiple conditions with and()
   * import { and, eq, gt } from "@tanstack/db"
   *
   * const subscription = collection.subscribeChanges((changes) => {
   *   updateUI(changes)
   * }, {
   *   where: (row) => and(eq(row.status, "active"), gt(row.priority, 5))
   * })
   */
  subscribeChanges(callback, options = {}) {
    return this._changes.subscribeChanges(callback, options);
  }
  /**
   * Subscribe to a collection event
   */
  on(event, callback) {
    return this._events.on(event, callback);
  }
  /**
   * Subscribe to a collection event once
   */
  once(event, callback) {
    return this._events.once(event, callback);
  }
  /**
   * Unsubscribe from a collection event
   */
  off(event, callback) {
    this._events.off(event, callback);
  }
  /**
   * Wait for a collection event
   */
  waitFor(event, timeout) {
    return this._events.waitFor(event, timeout);
  }
  /**
   * Clean up the collection by stopping sync and clearing data
   * This can be called manually or automatically by garbage collection
   */
  async cleanup() {
    this._lifecycle.cleanup();
    return Promise.resolve();
  }
};
function buildCompareOptionsFromConfig(config) {
  if (config.defaultStringCollation) {
    const options = config.defaultStringCollation;
    return {
      stringSort: options.stringSort ?? `locale`,
      locale: options.stringSort === `locale` ? options.locale : void 0,
      localeOptions: options.stringSort === `locale` ? options.localeOptions : void 0
    };
  } else {
    return {
      stringSort: `locale`
    };
  }
}

// crabwalk/node_modules/.pnpm/@tanstack+db@0.5.25_typescript@5.9.3/node_modules/@tanstack/db/dist/esm/local-only.js
function localOnlyCollectionOptions(config) {
  const { initialData, onInsert, onUpdate, onDelete, ...restConfig } = config;
  const syncResult = createLocalOnlySync(initialData);
  const wrappedOnInsert = async (params) => {
    let handlerResult;
    if (onInsert) {
      handlerResult = await onInsert(params) ?? {};
    }
    syncResult.confirmOperationsSync(params.transaction.mutations);
    return handlerResult;
  };
  const wrappedOnUpdate = async (params) => {
    let handlerResult;
    if (onUpdate) {
      handlerResult = await onUpdate(params) ?? {};
    }
    syncResult.confirmOperationsSync(params.transaction.mutations);
    return handlerResult;
  };
  const wrappedOnDelete = async (params) => {
    let handlerResult;
    if (onDelete) {
      handlerResult = await onDelete(params) ?? {};
    }
    syncResult.confirmOperationsSync(params.transaction.mutations);
    return handlerResult;
  };
  const acceptMutations = (transaction) => {
    const collectionMutations = transaction.mutations.filter(
      (m) => (
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        m.collection === syncResult.collection
      )
    );
    if (collectionMutations.length === 0) {
      return;
    }
    syncResult.confirmOperationsSync(
      collectionMutations
    );
  };
  return {
    ...restConfig,
    sync: syncResult.sync,
    onInsert: wrappedOnInsert,
    onUpdate: wrappedOnUpdate,
    onDelete: wrappedOnDelete,
    utils: {
      acceptMutations
    },
    startSync: true,
    gcTime: 0
  };
}
function createLocalOnlySync(initialData) {
  let syncBegin = null;
  let syncWrite = null;
  let syncCommit = null;
  let collection = null;
  const sync = {
    /**
     * Sync function that captures sync parameters and applies initial data
     * @param params - Sync parameters containing begin, write, and commit functions
     * @returns Unsubscribe function (empty since no ongoing sync is needed)
     */
    sync: (params) => {
      const { begin, write, commit, markReady } = params;
      syncBegin = begin;
      syncWrite = write;
      syncCommit = commit;
      collection = params.collection;
      if (initialData && initialData.length > 0) {
        begin();
        initialData.forEach((item) => {
          write({
            type: `insert`,
            value: item
          });
        });
        commit();
      }
      markReady();
      return () => {
      };
    },
    /**
     * Get sync metadata - returns empty object for local-only collections
     * @returns Empty metadata object
     */
    getSyncMetadata: () => ({})
  };
  const confirmOperationsSync = (mutations) => {
    if (!syncBegin || !syncWrite || !syncCommit) {
      return;
    }
    syncBegin();
    mutations.forEach((mutation) => {
      if (syncWrite) {
        syncWrite({
          type: mutation.type,
          value: mutation.modified
        });
      }
    });
    syncCommit();
  };
  return {
    sync,
    confirmOperationsSync,
    collection
  };
}

// crabwalk/src/integrations/openclaw/collections.ts
var sessionsCollection = createCollection(
  localOnlyCollectionOptions({
    id: "openclaw-sessions",
    getKey: (item) => item.key
  })
);
var actionsCollection = createCollection(
  localOnlyCollectionOptions({
    id: "openclaw-actions",
    getKey: (item) => item.id
  })
);
var execsCollection = createCollection(
  localOnlyCollectionOptions({
    id: "openclaw-execs",
    getKey: (item) => item.id
  })
);

// crabwalk/src/integrations/trpc/adapter-entry.ts
var clientInstance = null;
var currentUrl = process.env.CLAWDBOT_URL || "ws://127.0.0.1:18789";
var currentToken = process.env.CLAWDBOT_API_TOKEN;
var currentPassword = process.env.CLAWDBOT_PASSWORD;
function getClient() {
  if (!clientInstance) {
    clientInstance = new ClawdbotClient(currentUrl, currentToken, currentPassword);
  }
  return clientInstance;
}
function reconnectGateway(config) {
  if (clientInstance) {
    clientInstance.disconnect();
    clientInstance = null;
  }
  if (config.gatewayUrl) currentUrl = config.gatewayUrl;
  if (config.apiToken) currentToken = config.apiToken;
  if (config.password) currentPassword = config.password;
  clientInstance = new ClawdbotClient(currentUrl, currentToken, currentPassword);
  clientInstance.connect().catch(() => {
  });
}
function getGatewayStatus() {
  const client = getClient();
  return { url: currentUrl, connected: client.connected, authState: client.authState };
}
var debugMode = false;
var collectLogs = false;
var collectedEvents = [];
var t = initTRPC.create({ transformer: dist_default });
var router = t.router;
var publicProcedure = t.procedure;
var openclawRouter = router({
  connect: publicProcedure.mutation(async () => {
    const client = getClient();
    if (client.connected) {
      return { status: "already_connected", authState: client.authState, scopes: client.scopes, pairing: client.pairingInfo };
    }
    try {
      const hello = await client.connect();
      return { status: "connected", protocol: hello.protocol, features: hello.features, presenceCount: hello.snapshot?.presence?.length ?? 0, authState: client.authState, scopes: client.scopes, pairing: client.pairingInfo };
    } catch (error) {
      return { status: "error", message: error instanceof Error ? error.message : "Connection failed", authState: client.authState, scopes: client.scopes, pairing: client.pairingInfo };
    }
  }),
  disconnect: publicProcedure.mutation(() => {
    getClient().disconnect();
    return { status: "disconnected" };
  }),
  status: publicProcedure.query(() => ({ connected: getClient().connected })),
  authStatus: publicProcedure.query(() => {
    const c = getClient();
    return { connected: c.connected, authState: c.authState, scopes: c.scopes, pairing: c.pairingInfo };
  }),
  gatewayEndpoint: publicProcedure.query(() => ({ url: currentUrl })),
  setDebugMode: publicProcedure.input(external_exports.object({ enabled: external_exports.boolean() })).mutation(({ input }) => {
    debugMode = input.enabled;
    return { debugMode };
  }),
  getDebugMode: publicProcedure.query(() => ({ debugMode })),
  setLogCollection: publicProcedure.input(external_exports.object({ enabled: external_exports.boolean() })).mutation(({ input }) => {
    collectLogs = input.enabled;
    return { collectLogs, eventCount: collectedEvents.length };
  }),
  getLogCollection: publicProcedure.query(() => ({ collectLogs, eventCount: collectedEvents.length })),
  downloadLogs: publicProcedure.query(() => ({ events: collectedEvents, count: collectedEvents.length, collectedAt: (/* @__PURE__ */ new Date()).toISOString() })),
  clearLogs: publicProcedure.mutation(() => {
    const count2 = collectedEvents.length;
    collectedEvents.length = 0;
    return { cleared: count2 };
  }),
  sessions: publicProcedure.input(external_exports.object({ limit: external_exports.number().optional(), activeMinutes: external_exports.number().optional(), agentId: external_exports.string().optional() }).optional()).query(async ({ input }) => {
    const client = getClient();
    const persistence = getPersistenceService();
    if (!client.connected) return { sessions: [], error: "Not connected", authState: client.authState };
    try {
      const sessions = await client.listSessions(input);
      const monitorSessions = sessions.map(sessionInfoToMonitor);
      for (const session of monitorSessions) persistence.upsertSession(session);
      return { sessions: monitorSessions, authState: client.authState, scopes: client.scopes };
    } catch (error) {
      return { sessions: [], error: error instanceof Error ? error.message : "Failed", authState: client.authState, scopes: client.scopes, pairing: client.pairingInfo };
    }
  }),
  events: publicProcedure.subscription(() => {
    return observable((emit) => {
      const client = getClient();
      const persistence = getPersistenceService();
      const unsubscribe = client.onEvent((event) => {
        if (collectLogs) collectedEvents.push({ timestamp: Date.now(), event });
        const parsed = parseEventFrame(event);
        if (parsed) {
          if (parsed.session) emit.next({ type: "session", session: parsed.session });
          if (parsed.action) {
            persistence.addAction(parsed.action);
            emit.next({ type: "action", action: parsed.action });
          }
          if (parsed.execEvent) {
            persistence.addExecEvent(parsed.execEvent);
            emit.next({ type: "exec", execEvent: parsed.execEvent });
          }
        }
      });
      return () => {
        unsubscribe();
      };
    });
  }),
  persistenceStatus: publicProcedure.query(() => getPersistenceService().getStatus()),
  persistenceStart: publicProcedure.mutation(() => getPersistenceService().start()),
  persistenceStop: publicProcedure.mutation(() => getPersistenceService().stop()),
  persistenceHydrate: publicProcedure.query(() => getPersistenceService().hydrate()),
  persistenceClear: publicProcedure.mutation(() => getPersistenceService().clear())
});
var appRouter = router({
  openclaw: openclawRouter
});
async function handleTrpc(req, res) {
  let body;
  if (req.method === "POST") {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    body = Buffer.concat(chunks).toString();
  }
  const url = `http://${req.headers.host}${req.url}`;
  const headers = new Headers();
  for (const [key, val] of Object.entries(req.headers)) {
    if (val) headers.set(key, Array.isArray(val) ? val.join(", ") : val);
  }
  const request = new Request(url, {
    method: req.method,
    headers,
    body: req.method === "POST" ? body : void 0
  });
  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: () => ({})
  });
  const responseHeaders = {};
  response.headers.forEach((val, key) => {
    responseHeaders[key] = val;
  });
  res.writeHead(response.status, responseHeaders);
  if (response.body) {
    const reader = response.body.getReader();
    const pump = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (!res.writableEnded) res.write(value);
        }
      } catch {
      } finally {
        if (!res.writableEnded) res.end();
      }
    };
    req.on("close", () => {
      reader.cancel().catch(() => {
      });
    });
    await pump();
  } else {
    res.end(await response.text());
  }
}
getClient().connect().catch(() => {
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getGatewayStatus,
  handleTrpc,
  reconnectGateway
});
/*! Bundled license information:

@trpc/server/dist/resolveResponse-C7AcnFLN.mjs:
  (* istanbul ignore if -- @preserve *)
  (*!
  * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
  *
  * Copyright (c) 2014-2017, Jon Schlinkert.
  * Released under the MIT License.
  *)

@trpc/server/dist/resolveResponse-C7AcnFLN.mjs:
  (* istanbul ignore if -- @preserve *)
*/
