var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports, module) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var ReactVersion = "18.3.1";
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactCurrentDispatcher = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        };
        var ReactCurrentBatchConfig = {
          transition: null
        };
        var ReactCurrentActQueue = {
          current: null,
          // Used to reproduce behavior of `batchedUpdates` in legacy mode.
          isBatchingLegacy: false,
          didScheduleLegacyUpdate: false
        };
        var ReactCurrentOwner = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        };
        var ReactDebugCurrentFrame = {};
        var currentExtraStackFrame = null;
        function setExtraStackFrame(stack) {
          {
            currentExtraStackFrame = stack;
          }
        }
        {
          ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
            {
              currentExtraStackFrame = stack;
            }
          };
          ReactDebugCurrentFrame.getCurrentStack = null;
          ReactDebugCurrentFrame.getStackAddendum = function() {
            var stack = "";
            if (currentExtraStackFrame) {
              stack += currentExtraStackFrame;
            }
            var impl = ReactDebugCurrentFrame.getCurrentStack;
            if (impl) {
              stack += impl() || "";
            }
            return stack;
          };
        }
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var ReactSharedInternals = {
          ReactCurrentDispatcher,
          ReactCurrentBatchConfig,
          ReactCurrentOwner
        };
        {
          ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
          ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
        }
        function warn(format) {
          {
            {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              printWarning("warn", format, args);
            }
          }
        }
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var didWarnStateUpdateForUnmountedComponent = {};
        function warnNoop(publicInstance, callerName) {
          {
            var _constructor = publicInstance.constructor;
            var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
            var warningKey = componentName + "." + callerName;
            if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
              return;
            }
            error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
            didWarnStateUpdateForUnmountedComponent[warningKey] = true;
          }
        }
        var ReactNoopUpdateQueue = {
          /**
           * Checks whether or not this composite component is mounted.
           * @param {ReactClass} publicInstance The instance we want to test.
           * @return {boolean} True if mounted, false otherwise.
           * @protected
           * @final
           */
          isMounted: function(publicInstance) {
            return false;
          },
          /**
           * Forces an update. This should only be invoked when it is known with
           * certainty that we are **not** in a DOM transaction.
           *
           * You may want to call this when you know that some deeper aspect of the
           * component's state has changed but `setState` was not called.
           *
           * This will not invoke `shouldComponentUpdate`, but it will invoke
           * `componentWillUpdate` and `componentDidUpdate`.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {?function} callback Called after component is updated.
           * @param {?string} callerName name of the calling function in the public API.
           * @internal
           */
          enqueueForceUpdate: function(publicInstance, callback, callerName) {
            warnNoop(publicInstance, "forceUpdate");
          },
          /**
           * Replaces all of the state. Always use this or `setState` to mutate state.
           * You should treat `this.state` as immutable.
           *
           * There is no guarantee that `this.state` will be immediately updated, so
           * accessing `this.state` after calling this method may return the old value.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {object} completeState Next state.
           * @param {?function} callback Called after component is updated.
           * @param {?string} callerName name of the calling function in the public API.
           * @internal
           */
          enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
            warnNoop(publicInstance, "replaceState");
          },
          /**
           * Sets a subset of the state. This only exists because _pendingState is
           * internal. This provides a merging strategy that is not available to deep
           * properties which is confusing. TODO: Expose pendingState or don't use it
           * during the merge.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {object} partialState Next partial state to be merged with state.
           * @param {?function} callback Called after component is updated.
           * @param {?string} Name of the calling function in the public API.
           * @internal
           */
          enqueueSetState: function(publicInstance, partialState, callback, callerName) {
            warnNoop(publicInstance, "setState");
          }
        };
        var assign = Object.assign;
        var emptyObject = {};
        {
          Object.freeze(emptyObject);
        }
        function Component(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        Component.prototype.isReactComponent = {};
        Component.prototype.setState = function(partialState, callback) {
          if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
            throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
          }
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        {
          var deprecatedAPIs = {
            isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
            replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
          };
          var defineDeprecationWarning = function(methodName, info) {
            Object.defineProperty(Component.prototype, methodName, {
              get: function() {
                warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                return void 0;
              }
            });
          };
          for (var fnName in deprecatedAPIs) {
            if (deprecatedAPIs.hasOwnProperty(fnName)) {
              defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
            }
          }
        }
        function ComponentDummy() {
        }
        ComponentDummy.prototype = Component.prototype;
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
        pureComponentPrototype.constructor = PureComponent;
        assign(pureComponentPrototype, Component.prototype);
        pureComponentPrototype.isPureReactComponent = true;
        function createRef() {
          var refObject = {
            current: null
          };
          {
            Object.seal(refObject);
          }
          return refObject;
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          var warnAboutAccessingKey = function() {
            {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function defineRefPropWarningGetter(props, displayName) {
          var warnAboutAccessingRef = function() {
            {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
        function warnIfStringRefCannotBeAutoConverted(config) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
              var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        var ReactElement = function(type, key, ref, self, source, owner, props) {
          var element = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,
            // Built-in properties that belong on the element
            type,
            key,
            ref,
            props,
            // Record the component responsible for creating this element.
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function createElement(type, config, children) {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          var self = null;
          var source = null;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              {
                warnIfStringRefCannotBeAutoConverted(config);
              }
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            self = config.__self === void 0 ? null : config.__self;
            source = config.__source === void 0 ? null : config.__source;
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            {
              if (Object.freeze) {
                Object.freeze(childArray);
              }
            }
            props.children = childArray;
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          {
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
          }
          return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
          return newElement;
        }
        function cloneElement(element, config, children) {
          if (element === null || element === void 0) {
            throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
          }
          var propName;
          var props = assign({}, element.props);
          var key = element.key;
          var ref = element.ref;
          var self = element._self;
          var source = element._source;
          var owner = element._owner;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              owner = ReactCurrentOwner.current;
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            var defaultProps;
            if (element.type && element.type.defaultProps) {
              defaultProps = element.type.defaultProps;
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                if (config[propName] === void 0 && defaultProps !== void 0) {
                  props[propName] = defaultProps[propName];
                } else {
                  props[propName] = config[propName];
                }
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            props.children = childArray;
          }
          return ReactElement(element.type, key, ref, self, source, owner, props);
        }
        function isValidElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        var SEPARATOR = ".";
        var SUBSEPARATOR = ":";
        function escape(key) {
          var escapeRegex = /[=:]/g;
          var escaperLookup = {
            "=": "=0",
            ":": "=2"
          };
          var escapedString = key.replace(escapeRegex, function(match) {
            return escaperLookup[match];
          });
          return "$" + escapedString;
        }
        var didWarnAboutMaps = false;
        var userProvidedKeyEscapeRegex = /\/+/g;
        function escapeUserProvidedKey(text) {
          return text.replace(userProvidedKeyEscapeRegex, "$&/");
        }
        function getElementKey(element, index) {
          if (typeof element === "object" && element !== null && element.key != null) {
            {
              checkKeyStringCoercion(element.key);
            }
            return escape("" + element.key);
          }
          return index.toString(36);
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if (type === "undefined" || type === "boolean") {
            children = null;
          }
          var invokeCallback = false;
          if (children === null) {
            invokeCallback = true;
          } else {
            switch (type) {
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                }
            }
          }
          if (invokeCallback) {
            var _child = children;
            var mappedChild = callback(_child);
            var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
            if (isArray(mappedChild)) {
              var escapedChildKey = "";
              if (childKey != null) {
                escapedChildKey = escapeUserProvidedKey(childKey) + "/";
              }
              mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                return c;
              });
            } else if (mappedChild != null) {
              if (isValidElement(mappedChild)) {
                {
                  if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                    checkKeyStringCoercion(mappedChild.key);
                  }
                }
                mappedChild = cloneAndReplaceKey(
                  mappedChild,
                  // Keep both the (mapped) and old keys if they differ, just as
                  // traverseAllChildren used to do for objects as children
                  escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
                  (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? (
                    // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                    // eslint-disable-next-line react-internal/safe-string-coercion
                    escapeUserProvidedKey("" + mappedChild.key) + "/"
                  ) : "") + childKey
                );
              }
              array.push(mappedChild);
            }
            return 1;
          }
          var child;
          var nextName;
          var subtreeCount = 0;
          var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              child = children[i];
              nextName = nextNamePrefix + getElementKey(child, i);
              subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
            }
          } else {
            var iteratorFn = getIteratorFn(children);
            if (typeof iteratorFn === "function") {
              var iterableChildren = children;
              {
                if (iteratorFn === iterableChildren.entries) {
                  if (!didWarnAboutMaps) {
                    warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                  }
                  didWarnAboutMaps = true;
                }
              }
              var iterator = iteratorFn.call(iterableChildren);
              var step;
              var ii = 0;
              while (!(step = iterator.next()).done) {
                child = step.value;
                nextName = nextNamePrefix + getElementKey(child, ii++);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else if (type === "object") {
              var childrenString = String(children);
              throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
            }
          }
          return subtreeCount;
        }
        function mapChildren(children, func, context) {
          if (children == null) {
            return children;
          }
          var result = [];
          var count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function countChildren(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        }
        function forEachChildren(children, forEachFunc, forEachContext) {
          mapChildren(children, function() {
            forEachFunc.apply(this, arguments);
          }, forEachContext);
        }
        function toArray(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        }
        function onlyChild(children) {
          if (!isValidElement(children)) {
            throw new Error("React.Children.only expected to receive a single React element child.");
          }
          return children;
        }
        function createContext(defaultValue) {
          var context = {
            $$typeof: REACT_CONTEXT_TYPE,
            // As a workaround to support multiple concurrent renderers, we categorize
            // some renderers as primary and others as secondary. We only expect
            // there to be two concurrent renderers at most: React Native (primary) and
            // Fabric (secondary); React DOM (primary) and React ART (secondary).
            // Secondary renderers store their context values on separate fields.
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            // Used to track how many concurrent renderers this context currently
            // supports within in a single renderer. Such as parallel server rendering.
            _threadCount: 0,
            // These are circular
            Provider: null,
            Consumer: null,
            // Add these to use same hidden class in VM as ServerContext
            _defaultValue: null,
            _globalName: null
          };
          context.Provider = {
            $$typeof: REACT_PROVIDER_TYPE,
            _context: context
          };
          var hasWarnedAboutUsingNestedContextConsumers = false;
          var hasWarnedAboutUsingConsumerProvider = false;
          var hasWarnedAboutDisplayNameOnConsumer = false;
          {
            var Consumer = {
              $$typeof: REACT_CONTEXT_TYPE,
              _context: context
            };
            Object.defineProperties(Consumer, {
              Provider: {
                get: function() {
                  if (!hasWarnedAboutUsingConsumerProvider) {
                    hasWarnedAboutUsingConsumerProvider = true;
                    error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                  }
                  return context.Provider;
                },
                set: function(_Provider) {
                  context.Provider = _Provider;
                }
              },
              _currentValue: {
                get: function() {
                  return context._currentValue;
                },
                set: function(_currentValue) {
                  context._currentValue = _currentValue;
                }
              },
              _currentValue2: {
                get: function() {
                  return context._currentValue2;
                },
                set: function(_currentValue2) {
                  context._currentValue2 = _currentValue2;
                }
              },
              _threadCount: {
                get: function() {
                  return context._threadCount;
                },
                set: function(_threadCount) {
                  context._threadCount = _threadCount;
                }
              },
              Consumer: {
                get: function() {
                  if (!hasWarnedAboutUsingNestedContextConsumers) {
                    hasWarnedAboutUsingNestedContextConsumers = true;
                    error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                  }
                  return context.Consumer;
                }
              },
              displayName: {
                get: function() {
                  return context.displayName;
                },
                set: function(displayName) {
                  if (!hasWarnedAboutDisplayNameOnConsumer) {
                    warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                    hasWarnedAboutDisplayNameOnConsumer = true;
                  }
                }
              }
            });
            context.Consumer = Consumer;
          }
          {
            context._currentRenderer = null;
            context._currentRenderer2 = null;
          }
          return context;
        }
        var Uninitialized = -1;
        var Pending = 0;
        var Resolved = 1;
        var Rejected = 2;
        function lazyInitializer(payload) {
          if (payload._status === Uninitialized) {
            var ctor = payload._result;
            var thenable = ctor();
            thenable.then(function(moduleObject2) {
              if (payload._status === Pending || payload._status === Uninitialized) {
                var resolved = payload;
                resolved._status = Resolved;
                resolved._result = moduleObject2;
              }
            }, function(error2) {
              if (payload._status === Pending || payload._status === Uninitialized) {
                var rejected = payload;
                rejected._status = Rejected;
                rejected._result = error2;
              }
            });
            if (payload._status === Uninitialized) {
              var pending = payload;
              pending._status = Pending;
              pending._result = thenable;
            }
          }
          if (payload._status === Resolved) {
            var moduleObject = payload._result;
            {
              if (moduleObject === void 0) {
                error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
              }
            }
            {
              if (!("default" in moduleObject)) {
                error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
              }
            }
            return moduleObject.default;
          } else {
            throw payload._result;
          }
        }
        function lazy(ctor) {
          var payload = {
            // We use these fields to store the result.
            _status: Uninitialized,
            _result: ctor
          };
          var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _payload: payload,
            _init: lazyInitializer
          };
          {
            var defaultProps;
            var propTypes;
            Object.defineProperties(lazyType, {
              defaultProps: {
                configurable: true,
                get: function() {
                  return defaultProps;
                },
                set: function(newDefaultProps) {
                  error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  defaultProps = newDefaultProps;
                  Object.defineProperty(lazyType, "defaultProps", {
                    enumerable: true
                  });
                }
              },
              propTypes: {
                configurable: true,
                get: function() {
                  return propTypes;
                },
                set: function(newPropTypes) {
                  error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  propTypes = newPropTypes;
                  Object.defineProperty(lazyType, "propTypes", {
                    enumerable: true
                  });
                }
              }
            });
          }
          return lazyType;
        }
        function forwardRef(render) {
          {
            if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
              error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
            } else if (typeof render !== "function") {
              error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
            } else {
              if (render.length !== 0 && render.length !== 2) {
                error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
              }
            }
            if (render != null) {
              if (render.defaultProps != null || render.propTypes != null) {
                error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
              }
            }
          }
          var elementType = {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (!render.name && !render.displayName) {
                  render.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function memo(type, compare) {
          {
            if (!isValidElementType(type)) {
              error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
            }
          }
          var elementType = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: compare === void 0 ? null : compare
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (!type.name && !type.displayName) {
                  type.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        function resolveDispatcher() {
          var dispatcher = ReactCurrentDispatcher.current;
          {
            if (dispatcher === null) {
              error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
          }
          return dispatcher;
        }
        function useContext(Context) {
          var dispatcher = resolveDispatcher();
          {
            if (Context._context !== void 0) {
              var realContext = Context._context;
              if (realContext.Consumer === Context) {
                error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
              } else if (realContext.Provider === Context) {
                error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
              }
            }
          }
          return dispatcher.useContext(Context);
        }
        function useState3(initialState) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useState(initialState);
        }
        function useReducer(reducer, initialArg, init) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useReducer(reducer, initialArg, init);
        }
        function useRef3(initialValue) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useRef(initialValue);
        }
        function useEffect3(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useEffect(create, deps);
        }
        function useInsertionEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useInsertionEffect(create, deps);
        }
        function useLayoutEffect2(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useLayoutEffect(create, deps);
        }
        function useCallback3(callback, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useCallback(callback, deps);
        }
        function useMemo(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useMemo(create, deps);
        }
        function useImperativeHandle(ref, create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useImperativeHandle(ref, create, deps);
        }
        function useDebugValue(value, formatterFn) {
          {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDebugValue(value, formatterFn);
          }
        }
        function useTransition() {
          var dispatcher = resolveDispatcher();
          return dispatcher.useTransition();
        }
        function useDeferredValue(value) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useDeferredValue(value);
        }
        function useId() {
          var dispatcher = resolveDispatcher();
          return dispatcher.useId();
        }
        function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
        }
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign({}, props, {
                  value: prevLog
                }),
                info: assign({}, props, {
                  value: prevInfo
                }),
                warn: assign({}, props, {
                  value: prevWarn
                }),
                error: assign({}, props, {
                  value: prevError
                }),
                group: assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher$1.current;
            ReactCurrentDispatcher$1.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher$1.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component2) {
          var prototype = Component2.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              setExtraStackFrame(stack);
            } else {
              setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function getDeclarationErrorAddendum() {
          if (ReactCurrentOwner.current) {
            var name = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
        function getSourceInfoErrorAddendum(source) {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
        function getSourceInfoErrorAddendumForProps(elementProps) {
          if (elementProps !== null && elementProps !== void 0) {
            return getSourceInfoErrorAddendum(elementProps.__source);
          }
          return "";
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
        function validateExplicitKey(element, parentType) {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          {
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          if (typeof node !== "object") {
            return;
          }
          if (isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentNameFromType(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentNameFromType(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        function createElementWithValidation(type, props, children) {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendumForProps(props);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            {
              error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
          }
          var element = createElement.apply(this, arguments);
          if (element == null) {
            return element;
          }
          if (validType) {
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], type);
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
        var didWarnAboutDeprecatedCreateFactory = false;
        function createFactoryWithValidation(type) {
          var validatedFactory = createElementWithValidation.bind(null, type);
          validatedFactory.type = type;
          {
            if (!didWarnAboutDeprecatedCreateFactory) {
              didWarnAboutDeprecatedCreateFactory = true;
              warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
            }
            Object.defineProperty(validatedFactory, "type", {
              enumerable: false,
              get: function() {
                warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                Object.defineProperty(this, "type", {
                  value: type
                });
                return type;
              }
            });
          }
          return validatedFactory;
        }
        function cloneElementWithValidation(element, props, children) {
          var newElement = cloneElement.apply(this, arguments);
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], newElement.type);
          }
          validatePropTypes(newElement);
          return newElement;
        }
        function startTransition(scope, options) {
          var prevTransition = ReactCurrentBatchConfig.transition;
          ReactCurrentBatchConfig.transition = {};
          var currentTransition = ReactCurrentBatchConfig.transition;
          {
            ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
          }
          try {
            scope();
          } finally {
            ReactCurrentBatchConfig.transition = prevTransition;
            {
              if (prevTransition === null && currentTransition._updatedFibers) {
                var updatedFibersCount = currentTransition._updatedFibers.size;
                if (updatedFibersCount > 10) {
                  warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
                }
                currentTransition._updatedFibers.clear();
              }
            }
          }
        }
        var didWarnAboutMessageChannel = false;
        var enqueueTaskImpl = null;
        function enqueueTask(task) {
          if (enqueueTaskImpl === null) {
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              var nodeRequire = module && module[requireString];
              enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
            } catch (_err) {
              enqueueTaskImpl = function(callback) {
                {
                  if (didWarnAboutMessageChannel === false) {
                    didWarnAboutMessageChannel = true;
                    if (typeof MessageChannel === "undefined") {
                      error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                    }
                  }
                }
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
              };
            }
          }
          return enqueueTaskImpl(task);
        }
        var actScopeDepth = 0;
        var didWarnNoAwaitAct = false;
        function act(callback) {
          {
            var prevActScopeDepth = actScopeDepth;
            actScopeDepth++;
            if (ReactCurrentActQueue.current === null) {
              ReactCurrentActQueue.current = [];
            }
            var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
            var result;
            try {
              ReactCurrentActQueue.isBatchingLegacy = true;
              result = callback();
              if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
                var queue = ReactCurrentActQueue.current;
                if (queue !== null) {
                  ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                  flushActQueue(queue);
                }
              }
            } catch (error2) {
              popActScope(prevActScopeDepth);
              throw error2;
            } finally {
              ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
            }
            if (result !== null && typeof result === "object" && typeof result.then === "function") {
              var thenableResult = result;
              var wasAwaited = false;
              var thenable = {
                then: function(resolve, reject) {
                  wasAwaited = true;
                  thenableResult.then(function(returnValue2) {
                    popActScope(prevActScopeDepth);
                    if (actScopeDepth === 0) {
                      recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                    } else {
                      resolve(returnValue2);
                    }
                  }, function(error2) {
                    popActScope(prevActScopeDepth);
                    reject(error2);
                  });
                }
              };
              {
                if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                  Promise.resolve().then(function() {
                  }).then(function() {
                    if (!wasAwaited) {
                      didWarnNoAwaitAct = true;
                      error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                    }
                  });
                }
              }
              return thenable;
            } else {
              var returnValue = result;
              popActScope(prevActScopeDepth);
              if (actScopeDepth === 0) {
                var _queue = ReactCurrentActQueue.current;
                if (_queue !== null) {
                  flushActQueue(_queue);
                  ReactCurrentActQueue.current = null;
                }
                var _thenable = {
                  then: function(resolve, reject) {
                    if (ReactCurrentActQueue.current === null) {
                      ReactCurrentActQueue.current = [];
                      recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                    } else {
                      resolve(returnValue);
                    }
                  }
                };
                return _thenable;
              } else {
                var _thenable2 = {
                  then: function(resolve, reject) {
                    resolve(returnValue);
                  }
                };
                return _thenable2;
              }
            }
          }
        }
        function popActScope(prevActScopeDepth) {
          {
            if (prevActScopeDepth !== actScopeDepth - 1) {
              error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
            }
            actScopeDepth = prevActScopeDepth;
          }
        }
        function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
          {
            var queue = ReactCurrentActQueue.current;
            if (queue !== null) {
              try {
                flushActQueue(queue);
                enqueueTask(function() {
                  if (queue.length === 0) {
                    ReactCurrentActQueue.current = null;
                    resolve(returnValue);
                  } else {
                    recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                  }
                });
              } catch (error2) {
                reject(error2);
              }
            } else {
              resolve(returnValue);
            }
          }
        }
        var isFlushing = false;
        function flushActQueue(queue) {
          {
            if (!isFlushing) {
              isFlushing = true;
              var i = 0;
              try {
                for (; i < queue.length; i++) {
                  var callback = queue[i];
                  do {
                    callback = callback(true);
                  } while (callback !== null);
                }
                queue.length = 0;
              } catch (error2) {
                queue = queue.slice(i + 1);
                throw error2;
              } finally {
                isFlushing = false;
              }
            }
          }
        }
        var createElement$1 = createElementWithValidation;
        var cloneElement$1 = cloneElementWithValidation;
        var createFactory = createFactoryWithValidation;
        var Children = {
          map: mapChildren,
          forEach: forEachChildren,
          count: countChildren,
          toArray,
          only: onlyChild
        };
        exports.Children = Children;
        exports.Component = Component;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.Profiler = REACT_PROFILER_TYPE;
        exports.PureComponent = PureComponent;
        exports.StrictMode = REACT_STRICT_MODE_TYPE;
        exports.Suspense = REACT_SUSPENSE_TYPE;
        exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
        exports.act = act;
        exports.cloneElement = cloneElement$1;
        exports.createContext = createContext;
        exports.createElement = createElement$1;
        exports.createFactory = createFactory;
        exports.createRef = createRef;
        exports.forwardRef = forwardRef;
        exports.isValidElement = isValidElement;
        exports.lazy = lazy;
        exports.memo = memo;
        exports.startTransition = startTransition;
        exports.unstable_act = act;
        exports.useCallback = useCallback3;
        exports.useContext = useContext;
        exports.useDebugValue = useDebugValue;
        exports.useDeferredValue = useDeferredValue;
        exports.useEffect = useEffect3;
        exports.useId = useId;
        exports.useImperativeHandle = useImperativeHandle;
        exports.useInsertionEffect = useInsertionEffect;
        exports.useLayoutEffect = useLayoutEffect2;
        exports.useMemo = useMemo;
        exports.useReducer = useReducer;
        exports.useRef = useRef3;
        exports.useState = useState3;
        exports.useSyncExternalStore = useSyncExternalStore;
        exports.useTransition = useTransition;
        exports.version = ReactVersion;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_development();
    }
  }
});

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var React = require_react();
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var assign = Object.assign;
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign({}, props, {
                  value: prevLog
                }),
                info: assign({}, props, {
                  value: prevInfo
                }),
                warn: assign({}, props, {
                  value: prevWarn
                }),
                error: assign({}, props, {
                  value: prevError
                }),
                group: assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher.current;
            ReactCurrentDispatcher.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component) {
          var prototype = Component.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown;
        var specialPropRefWarningShown;
        var didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function warnIfStringRefCannotBeAutoConverted(config, self) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
              var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        function defineKeyPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingKey = function() {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
        }
        function defineRefPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingRef = function() {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
        }
        var ReactElement = function(type, key, ref, self, source, owner, props) {
          var element = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,
            // Built-in properties that belong on the element
            type,
            key,
            ref,
            props,
            // Record the component responsible for creating this element.
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function jsxDEV(type, config, maybeKey, source, self) {
          {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            if (maybeKey !== void 0) {
              {
                checkKeyStringCoercion(maybeKey);
              }
              key = "" + maybeKey;
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            if (hasValidRef(config)) {
              ref = config.ref;
              warnIfStringRefCannotBeAutoConverted(config, self);
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
            return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
          }
        }
        var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function isValidElement(object) {
          {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
        }
        function getDeclarationErrorAddendum() {
          {
            if (ReactCurrentOwner$1.current) {
              var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
        }
        function getSourceInfoErrorAddendum(source) {
          {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
        }
        function validateExplicitKey(element, parentType) {
          {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          {
            if (typeof node !== "object") {
              return;
            }
            if (isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentNameFromType(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentNameFromType(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        var didWarnAboutKeySpread = {};
        function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
          {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendum(source);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
            var element = jsxDEV(type, props, key, source, self);
            if (element == null) {
              return element;
            }
            if (validType) {
              var children = props.children;
              if (children !== void 0) {
                if (isStaticChildren) {
                  if (isArray(children)) {
                    for (var i = 0; i < children.length; i++) {
                      validateChildKeys(children[i], type);
                    }
                    if (Object.freeze) {
                      Object.freeze(children);
                    }
                  } else {
                    error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                  }
                } else {
                  validateChildKeys(children, type);
                }
              }
            }
            {
              if (hasOwnProperty.call(props, "key")) {
                var componentName = getComponentNameFromType(type);
                var keys = Object.keys(props).filter(function(k) {
                  return k !== "key";
                });
                var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
                if (!didWarnAboutKeySpread[componentName + beforeExample]) {
                  var afterExample = keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}";
                  error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);
                  didWarnAboutKeySpread[componentName + beforeExample] = true;
                }
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
        }
        function jsxWithValidationStatic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, true);
          }
        }
        function jsxWithValidationDynamic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, false);
          }
        }
        var jsx2 = jsxWithValidationDynamic;
        var jsxs = jsxWithValidationStatic;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.jsx = jsx2;
        exports.jsxs = jsxs;
      })();
    }
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_jsx_runtime_development();
    }
  }
});

// client/src/components/Game.jsx
var import_react2 = __toESM(require_react(), 1);

// client/src/hooks/useResponsiveCanvas.jsx
var import_react = __toESM(require_react(), 1);

// client/src/game/constants.js
var CANVAS_WIDTH = 2400;
var CANVAS_HEIGHT = 1800;
var ASPECT_RATIO = CANVAS_WIDTH / CANVAS_HEIGHT;
var STATES = {
  MENU: "menu",
  PLAYING: "playing",
  PAUSED: "paused",
  GAMEOVER: "gameover"
};
var KEYS = {
  ENTER: "Enter",
  SPACE: "Space",
  ESCAPE: "Escape",
  KEY_W: "KeyW",
  KEY_A: "KeyA",
  KEY_S: "KeyS",
  KEY_D: "KeyD",
  ARROW_UP: "ArrowUp",
  ARROW_LEFT: "ArrowLeft",
  ARROW_DOWN: "ArrowDown",
  ARROW_RIGHT: "ArrowRight",
  KEY_K: "KeyK",
  KEY_L: "KeyL",
  KEY_I: "KeyI",
  KEY_J: "KeyJ"
};
var DIFFICULTY = {
  EASY: "easy",
  NORMAL: "normal",
  HARD: "hard"
};
var POWER_LEVELS = {
  SINGLE: 1,
  DOUBLE: 2,
  TRIPLE: 3,
  WIDE: 4
};
var ENEMY_POINTS = {
  type1: 15,
  type2: 30,
  type3: 50,
  boss: 500
};
var ENEMY_HP = {
  type1: 15,
  type2: 30,
  type3: 100
};
var ENEMY_SPEED = {
  type1: 1.8,
  type2: 2.5,
  type3: 1.2
};
var DIFFICULTY_MULTIPLIERS = {
  [DIFFICULTY.EASY]: { enemyHp: 0.7, enemySpeed: 0.8, fireRate: 1.3, spawnRate: 1.2 },
  [DIFFICULTY.NORMAL]: { enemyHp: 1, enemySpeed: 1, fireRate: 1, spawnRate: 1 },
  [DIFFICULTY.HARD]: { enemyHp: 1.5, enemySpeed: 1.2, fireRate: 0.7, spawnRate: 0.8 }
};

// client/src/hooks/useResponsiveCanvas.jsx
function useResponsiveCanvas(containerRef, onCanvasReady) {
  const canvasRef = (0, import_react.useRef)(null);
  const [scale, setScale] = (0, import_react.useState)(1);
  const handleResize = (0, import_react.useCallback)(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const scaleByWidth = containerWidth / CANVAS_WIDTH;
    const scaleByHeight = containerHeight / CANVAS_HEIGHT;
    const newScale = Math.min(scaleByWidth, scaleByHeight);
    setScale(newScale);
    canvasRef.current.style.width = `${CANVAS_WIDTH * newScale}px`;
    canvasRef.current.style.height = `${CANVAS_HEIGHT * newScale}px`;
    if (onCanvasReady) {
      onCanvasReady(canvasRef.current, newScale);
    }
  }, [containerRef, onCanvasReady]);
  (0, import_react.useEffect)(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);
  return { canvasRef, scale };
}

// client/src/game/input.js
var state = /* @__PURE__ */ new Map();
function initInput() {
  state.clear();
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
}
function destroyInput() {
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("keyup", handleKeyUp);
  state.clear();
}
function handleKeyDown(e) {
  state.set(e.code, true);
  if (e.code === "Space") e.preventDefault();
}
function handleKeyUp(e) {
  state.set(e.code, false);
}
function isPressed(key) {
  return state.get(key) || false;
}
function hasAny(keys) {
  return keys.some((k) => state.get(k));
}
function getDirection() {
  let dx = 0;
  let dy = 0;
  const horizontal = [KEYS.KEY_A, KEYS.ARROW_LEFT, KEYS.KEY_J];
  const vertical = [KEYS.KEY_W, KEYS.ARROW_UP, KEYS.KEY_I];
  const horizontalRight = [KEYS.KEY_D, KEYS.ARROW_RIGHT, KEYS.KEY_L];
  const verticalDown = [KEYS.KEY_S, KEYS.ARROW_DOWN, KEYS.KEY_K];
  if (hasAny(horizontal)) dx = -1;
  if (hasAny(horizontalRight)) dx = 1;
  if (hasAny(vertical)) dy = -1;
  if (hasAny(verticalDown)) dy = 1;
  if (dx !== 0 && dy !== 0) {
    const inv = 0.707;
    dx *= inv;
    dy *= inv;
  }
  return { dx, dy };
}

// client/src/game/entities.js
var BULLET_SPEED = 10;
var PLAYER_SPEED = 5;
var PLAYER_W = 48;
var PLAYER_H = 56;
var Player = class {
  constructor() {
    this.x = CANVAS_WIDTH / 2 - PLAYER_W / 2;
    this.y = CANVAS_HEIGHT - 80;
    this.w = PLAYER_W;
    this.h = PLAYER_H;
    this.speed = PLAYER_SPEED;
    this.fireRate = 12;
    this.fireCooldown = 0;
    this.invincible = 0;
    this.powerLevel = POWER_LEVELS.SINGLE;
    this.shieldActive = false;
    this.shieldHP = 0;
    this.bombs = 1;
  }
  reset() {
    this.x = CANVAS_WIDTH / 2 - PLAYER_W / 2;
    this.y = CANVAS_HEIGHT - 80;
    this.fireRate = 12;
    this.fireCooldown = 0;
    this.invincible = 0;
    this.powerLevel = POWER_LEVELS.SINGLE;
    this.shieldActive = false;
    this.shieldHP = 0;
    this.bombs = 1;
  }
  move(dx, dy) {
    this.x += dx * this.speed;
    this.y += dy * this.speed;
    this.x = Math.max(0, Math.min(CANVAS_WIDTH - this.w, this.x));
    this.y = Math.max(0, Math.min(CANVAS_HEIGHT - this.h, this.y));
  }
  update() {
    if (this.invincible > 0) this.invincible--;
    if (this.fireCooldown > 0) this.fireCooldown--;
  }
  canFire() {
    return this.fireCooldown <= 0;
  }
  fire() {
    this.fireCooldown = this.fireRate;
    return createBullets(this);
  }
  addPower() {
    this.powerLevel = Math.min(this.powerLevel + 1, POWER_LEVELS.WIDE);
    this.fireRate = Math.max(5, 12 - this.powerLevel * 3);
  }
  addShield() {
    this.shieldActive = true;
    this.shieldHP = 50;
  }
  addBomb() {
    this.bombs = Math.min(this.bombs + 1, 3);
  }
  useBomb(bullets, enemies, boss, particles, canvasWidth, canvasHeight) {
    if (this.bombs <= 0) return false;
    this.bombs--;
    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      e.hp -= 100;
      if (e.hp <= 0) {
        particles.push(...createExplosion(e.x + e.w / 2, e.y + e.h / 2, e.type === "type3" ? 25 : 15));
      }
    }
    if (boss && boss.hp > 0 && boss.entered) {
      boss.hp -= 100;
      particles.push(...createExplosion(boss.x + boss.w / 2, boss.y + boss.h / 2, 30));
      if (boss.hp <= 0) {
        particles.push(...createExplosion(boss.x + boss.w / 2, boss.y + boss.h / 2, 80));
      }
    }
    return true;
  }
  takeHit() {
    if (this.invincible > 0) return false;
    if (this.shieldActive) {
      this.shieldHP -= 1;
      if (this.shieldHP <= 0) {
        this.shieldActive = false;
        this.shieldHP = 0;
      }
      return false;
    }
    this.invincible = 120;
    return true;
  }
};
function createBullets(player) {
  const bullets = [];
  const dmg = 10 + player.powerLevel * 5;
  bullets.push(createPlayerBullet(player.x + player.w / 2 - 2, player.y - 4, -BULLET_SPEED, dmg));
  if (player.powerLevel >= POWER_LEVELS.DOUBLE) {
    bullets.push(createPlayerBullet(player.x + player.w / 4 - 2, player.y, -BULLET_SPEED + 1, dmg));
    bullets.push(createPlayerBullet(player.x + player.w * 3 / 4 - 2, player.y, -BULLET_SPEED + 1, dmg));
  }
  if (player.powerLevel >= POWER_LEVELS.TRIPLE) {
    bullets.push(createPlayerBullet(player.x, player.y + 10, -BULLET_SPEED + 2, dmg));
    bullets.push(createPlayerBullet(player.x + player.w, player.y + 10, -BULLET_SPEED + 2, dmg));
  }
  return bullets;
}
function createPlayerBullet(x, y, vy, damage) {
  return {
    x,
    y,
    w: 4,
    h: 12,
    vy,
    vx: 0,
    damage,
    active: true,
    update() {
      this.y += this.vy;
      this.x += this.vx;
      if (this.y < -20 || this.y > CANVAS_HEIGHT + 20 || this.x < -20 || this.x > CANVAS_WIDTH + 20) {
        this.active = false;
      }
    }
  };
}
var Bullet = class {
  constructor(x, y, vy, damage, isEnemy = false) {
    this.x = x;
    this.y = y;
    this.w = isEnemy ? 6 : 4;
    this.h = isEnemy ? 8 : 12;
    this.vy = vy;
    this.vx = 0;
    this.damage = damage;
    this.isEnemy = isEnemy;
    this.active = true;
  }
  update() {
    this.y += this.vy;
    this.x += this.vx;
    if (this.y < -20 || this.y > CANVAS_HEIGHT + 20 || this.x < -20 || this.x > CANVAS_WIDTH + 20) {
      this.active = false;
    }
  }
};
var Enemy = class {
  constructor(type, difficultyMultiplier) {
    this.type = type;
    const hpMult = difficultyMultiplier.enemyHp || 1;
    const speedMult = difficultyMultiplier.enemySpeed || 1;
    this.w = 52;
    this.h = 52;
    this.hp = ENEMY_HP[type] * hpMult;
    this.maxHp = this.hp;
    this.speed = ENEMY_SPEED[type] * speedMult;
    this.fireRate = type === "type3" ? 60 : type === "type2" ? 90 : 120;
    this.fireCooldown = Math.random() * this.fireRate;
    this.points = ENEMY_POINTS[type];
    this.movePattern = Math.random() < 0.3 ? "sine" : "straight";
    this.sineOffset = Math.random() * Math.PI * 2;
    this.sineAmp = 30 + Math.random() * 40;
    this.x = Math.random() * (CANVAS_WIDTH - this.w);
    this.y = -this.h;
    this.active = true;
  }
  update() {
    this.y += this.speed;
    if (this.movePattern === "sine" && (this.type === "type2" || this.type === "type3")) {
      this.sineOffset += 0.03;
      this.x += Math.sin(this.sineOffset) * this.sineAmp * 0.02;
    }
    this.x = Math.max(0, Math.min(CANVAS_WIDTH - this.w, this.x));
    this.fireCooldown--;
    if (this.y > CANVAS_HEIGHT + 50) {
      this.active = false;
    }
  }
  needsBullet() {
    return this.y > 0 && this.y < CANVAS_HEIGHT - 100 && this.fireCooldown <= 0;
  }
  spawnBullet() {
    this.fireCooldown = this.fireRate;
    return new Bullet(
      this.x + this.w / 2 - 3,
      this.y + this.h,
      4 + Math.random() * 2,
      10,
      true
    );
  }
  takeDamage(amount) {
    this.hp -= amount;
    return this.hp <= 0;
  }
};
var Boss = class {
  constructor(level, difficultyMultiplier) {
    this.w = 120;
    this.h = 100;
    this.hp = (500 + level * 200) * (difficultyMultiplier.enemyHp || 1);
    this.maxHp = this.hp;
    this.speed = 1;
    this.phase = 0;
    this.phaseTimer = 0;
    this.fireRate = 30;
    this.fireCooldown = 0;
    this.points = ENEMY_POINTS.boss;
    this.x = CANVAS_WIDTH / 2 - this.w / 2;
    this.y = -this.h;
    this.entering = true;
    this.entered = false;
    this.active = true;
  }
  update(targetX) {
    if (this.entering) {
      this.y += 2;
      if (this.y >= 60) {
        this.entering = false;
        this.entered = true;
        this.y = 60;
      }
      return;
    }
    this.phaseTimer++;
    if (this.phaseTimer > 180) {
      this.phase = (this.phase + 1) % 3;
      this.phaseTimer = 0;
    }
    switch (this.phase) {
      case 0:
        this.x += Math.sin(Date.now() / 800) * 3;
        break;
      case 1:
        this.x += Math.sign(targetX - (this.x + this.w / 2)) * 2;
        break;
      case 2:
        this.x += Math.cos(Date.now() / 600) * 2;
        break;
    }
    this.x = Math.max(0, Math.min(CANVAS_WIDTH - this.w, this.x));
    this.fireCooldown--;
  }
  needsBullet() {
    return this.entered && this.fireCooldown <= 0;
  }
  spawnBullets() {
    this.fireCooldown = this.fireRate;
    const pattern = Math.floor(Math.random() * 3);
    if (pattern === 0) {
      const bullets = [];
      for (let a = -3; a <= 3; a++) {
        bullets.push(new Bullet(
          this.x + this.w / 2 - 3,
          this.y + this.h,
          4,
          15,
          true
        ));
        bullets[bullets.length - 1].vx = a * 1.5;
      }
      return bullets;
    } else if (pattern === 1) {
      return [new Bullet(
        this.x + this.w / 2 - 4,
        this.y + this.h,
        5,
        20,
        true
      )];
    } else {
      return [
        new Bullet(this.x - 8, this.y + this.h / 2, 3, 15, true),
        new Bullet(this.x + this.w, this.y + this.h / 2, 3, 15, true)
      ];
    }
  }
  takeDamage(amount) {
    this.hp -= amount;
    return this.hp <= 0;
  }
};
var Powerup = class {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 20;
    this.type = type;
    this.vy = 1.5;
    this.life = 300;
    this.active = true;
  }
  update() {
    this.y += this.vy;
    this.life--;
    if (this.y > CANVAS_HEIGHT + 30 || this.life <= 0) {
      this.active = false;
    }
  }
};
function createExplosion(x, y, count) {
  const particles = [];
  const typeColors = {
    type1: ["#f44", "#f80", "#ff0", "#fff"],
    type2: ["#f0f", "#a0f", "#fff", "#f8f"],
    type3: ["#0f0", "#ff0", "#fff", "#0a0"],
    boss: ["#f00", "#ff0", "#fff", "#f80", "#fa0"]
  };
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const spd = Math.random() * 4;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd,
      life: 1,
      decay: 0.01 + Math.random() * 0.03,
      size: 2 + Math.random() * 4,
      color: typeColors["boss"] || typeColors.type1[Math.floor(Math.random() * 4)]
    });
  }
  return particles;
}
function createSparks(x, y, count) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const spd = 2 + Math.random() * 5;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd,
      life: 1,
      decay: 0.02 + Math.random() * 0.04,
      size: 1 + Math.random() * 2,
      color: `hsl(${30 + Math.random() * 30}, 100%, ${50 + Math.random() * 50}%)`
    });
  }
  return particles;
}

// client/src/game/render.js
function drawPlayerShip(ctx, x, y, w, h) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  const flicker = Math.random() * 6;
  const gradient = ctx.createRadialGradient(0, h / 2 + 4, 0, 0, h / 2 + 4, 14 + flicker);
  gradient.addColorStop(0, "rgba(0, 200, 255, 0.9)");
  gradient.addColorStop(0.5, "rgba(0, 100, 255, 0.5)");
  gradient.addColorStop(1, "rgba(0, 50, 255, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(0, h / 2 + 4, 10 + flicker, 16 + flicker, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#0af";
  ctx.beginPath();
  ctx.moveTo(0, -h / 2);
  ctx.lineTo(-w / 2, h / 4);
  ctx.lineTo(-w / 2 + 4, h / 2);
  ctx.lineTo(w / 2 - 4, h / 2);
  ctx.lineTo(w / 2, h / 4);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#0ff";
  ctx.beginPath();
  ctx.moveTo(0, -h / 2 + 4);
  ctx.lineTo(-6, -2);
  ctx.lineTo(6, -2);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#06c";
  ctx.fillRect(-w / 2 - 2, h / 8, 6, 14);
  ctx.fillRect(w / 2 - 4, h / 8, 6, 14);
  ctx.fillStyle = "#f33";
  ctx.fillRect(-w / 2 - 1, h / 8 + 14, 4, 3);
  ctx.fillRect(w / 2 - 3, h / 8 + 14, 4, 3);
  ctx.strokeStyle = "#0ff";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, -h / 2 + 6);
  ctx.lineTo(0, h / 2 - 4);
  ctx.stroke();
  ctx.restore();
}
function drawEnemyType1(ctx, x, y, w, h) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  const flicker = Math.random() * 4;
  const gradient = ctx.createRadialGradient(0, -h / 2, 0, 0, -h / 2, 10 + flicker);
  gradient.addColorStop(0, "rgba(255, 100, 0, 0.8)");
  gradient.addColorStop(1, "rgba(255, 0, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(0, -h / 2, 8 + flicker, 12 + flicker, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#c33";
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.lineTo(-w / 2, -h / 4);
  ctx.lineTo(-w / 2 + 4, -h / 2);
  ctx.lineTo(w / 2 - 4, -h / 2);
  ctx.lineTo(w / 2, -h / 4);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#ff0";
  ctx.beginPath();
  ctx.moveTo(0, h / 2 - 6);
  ctx.lineTo(-5, -2);
  ctx.lineTo(5, -2);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#922";
  ctx.fillRect(-w / 2 - 2, -h / 8, 6, 12);
  ctx.fillRect(w / 2 - 4, -h / 8, 6, 12);
  ctx.restore();
}
function drawEnemyType2(ctx, x, y, w, h) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  const flicker = Math.random() * 5;
  const gradient = ctx.createRadialGradient(0, -h / 2, 0, 0, -h / 2, 12 + flicker);
  gradient.addColorStop(0, "rgba(150, 0, 255, 0.8)");
  gradient.addColorStop(1, "rgba(100, 0, 200, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(0, -h / 2, 10 + flicker, 14 + flicker, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#a0f";
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI * 2 / 6 * i - Math.PI / 2;
    const r = Math.min(w, h) / 2;
    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#f0f";
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#80d";
  ctx.fillRect(-w / 2 - 4, -2, 8, 4);
  ctx.fillRect(w / 2 - 4, -2, 8, 4);
  ctx.restore();
}
function drawEnemyType3(ctx, x, y, w, h, hp, maxHp) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  const flicker = Math.random() * 6;
  const hpRatio = hp / maxHp;
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 20 + flicker);
  gradient.addColorStop(0, `rgba(0, 255, 0, 0.9)`);
  gradient.addColorStop(1, "rgba(0, 200, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, 20 + flicker, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = `rgb(${Math.floor(100 * (1 - hpRatio))}, ${Math.floor(255 * hpRatio)}, 0)`;
  ctx.beginPath();
  ctx.moveTo(0, -h / 2);
  ctx.lineTo(-w / 2, -h / 4);
  ctx.lineTo(-w / 2 - 4, 0);
  ctx.lineTo(-w / 2, h / 4);
  ctx.lineTo(-w / 4, h / 2);
  ctx.lineTo(w / 4, h / 2);
  ctx.lineTo(w / 2, h / 4);
  ctx.lineTo(w / 2 + 4, 0);
  ctx.lineTo(w / 2, -h / 4);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = `rgba(255, 255, 0, ${0.5 + hpRatio * 0.5})`;
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
function drawBoss(ctx, x, y, w, h, hp, maxHp) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  const flicker = Math.random() * 8;
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 50 + flicker);
  gradient.addColorStop(0, "rgba(255, 0, 0, 0.6)");
  gradient.addColorStop(0.5, "rgba(255, 100, 0, 0.2)");
  gradient.addColorStop(1, "rgba(255, 0, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, 50 + flicker, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#600";
  ctx.beginPath();
  ctx.moveTo(0, -h / 2);
  ctx.lineTo(-w / 2.5, -h / 4);
  ctx.lineTo(-w / 2, 0);
  ctx.lineTo(-w / 2 + 10, h / 3);
  ctx.lineTo(-w / 5, h / 2);
  ctx.lineTo(w / 5, h / 2);
  ctx.lineTo(w / 2 - 10, h / 3);
  ctx.lineTo(w / 2, 0);
  ctx.lineTo(w / 2.5, -h / 4);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#900";
  ctx.beginPath();
  ctx.moveTo(-w / 3, -h / 6);
  ctx.lineTo(-w / 2, 0);
  ctx.lineTo(-w / 2, h / 6);
  ctx.lineTo(-w / 3, h / 6);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(w / 3, -h / 6);
  ctx.lineTo(w / 2, 0);
  ctx.lineTo(w / 2, h / 6);
  ctx.lineTo(w / 3, h / 6);
  ctx.closePath();
  ctx.fill();
  const pulse = Math.sin(Date.now() / 200) * 0.3 + 0.7;
  ctx.fillStyle = `rgba(255, ${Math.floor(255 * pulse)}, 0, ${pulse})`;
  ctx.beginPath();
  ctx.arc(0, 0, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#400";
  ctx.fillRect(-w / 2 - 10, -4, 14, 8);
  ctx.fillRect(w / 2 - 4, -4, 14, 8);
  ctx.fillStyle = "#333";
  ctx.fillRect(-w / 2, -h / 2 - 20, w, 8);
  ctx.fillStyle = hp / maxHp > 0.3 ? "#f44" : "#f00";
  ctx.fillRect(-w / 2, -h / 2 - 20, w * (hp / maxHp), 8);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1;
  ctx.strokeRect(-w / 2, -h / 2 - 20, w, 8);
  ctx.restore();
}
function drawBullet(ctx, bullet) {
  ctx.save();
  ctx.translate(bullet.x, bullet.y);
  if (bullet.isEnemy) {
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 6);
    grad.addColorStop(0, "#ff0");
    grad.addColorStop(0.5, "#f80");
    grad.addColorStop(1, "rgba(255, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillRect(-2, -4, 4, 8);
  } else {
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 4);
    grad.addColorStop(0, "#fff");
    grad.addColorStop(0.5, "#0ff");
    grad.addColorStop(1, "rgba(0, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0ff";
    ctx.fillRect(-1.5, -6, 3, 12);
    const trail = ctx.createLinearGradient(0, -6, 0, 15);
    trail.addColorStop(0, "rgba(0, 255, 255, 0.6)");
    trail.addColorStop(1, "rgba(0, 255, 255, 0)");
    ctx.fillStyle = trail;
    ctx.fillRect(-1, -6, 2, 15);
  }
  ctx.restore();
}
function drawPowerup(ctx, pu) {
  ctx.save();
  ctx.translate(pu.x + pu.w / 2, pu.y + pu.h / 2);
  const pulse = Math.sin(Date.now() / 200) * 3;
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 18 + pulse);
  let glowColor;
  switch (pu.type) {
    case "health":
      glowColor = "rgba(0, 255, 0, 0.3)";
      break;
    case "power":
      glowColor = "rgba(255, 150, 0, 0.3)";
      break;
    case "bomb":
      glowColor = "rgba(255, 255, 0, 0.3)";
      break;
    default:
      glowColor = "rgba(0, 200, 255, 0.3)";
  }
  grad.addColorStop(0, glowColor);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, 18 + pulse, 0, Math.PI * 2);
  ctx.fill();
  let color;
  let label;
  switch (pu.type) {
    case "health":
      color = "#0f0";
      label = "+";
      break;
    case "power":
      color = "#f80";
      label = "P";
      break;
    case "bomb":
      color = "#ff0";
      label = "B";
      break;
    default:
      color = "#0ff";
      label = "S";
  }
  ctx.fillStyle = color;
  ctx.fillRect(-pu.w / 2, -pu.h / 2, pu.w, pu.h);
  ctx.fillStyle = "#000";
  ctx.font = "bold 14px Courier New";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, 0, 0);
  ctx.restore();
}
function drawParticles(ctx, particles) {
  for (const pt of particles) {
    ctx.globalAlpha = pt.life;
    ctx.fillStyle = pt.color;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, pt.size * pt.life, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
function drawStars(ctx, stars, time) {
  for (const s of stars) {
    const alpha = s.brightness * (0.7 + Math.sin(time / 1e3 + s.x * 0.01) * 0.3);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fillRect(s.x, s.y, s.size, s.size);
  }
}
function updateStars(stars, canvasWidth, canvasHeight) {
  for (const s of stars) {
    s.y += s.speed;
    if (s.y > canvasHeight) {
      s.y = 0;
      s.x = Math.random() * canvasWidth;
    }
  }
}

// client/src/game/engine.js
var DIFFICULTY_NORMAL_MULTIPLIERS = {
  [DIFFICULTY.EASY]: { enemyHp: 0.7, enemySpeed: 0.8, fireRate: 1.3, spawnRate: 1.2 },
  [DIFFICULTY.NORMAL]: { enemyHp: 1, enemySpeed: 1, fireRate: 1, spawnRate: 1 },
  [DIFFICULTY.HARD]: { enemyHp: 1.5, enemySpeed: 1.2, fireRate: 0.7, spawnRate: 0.8 }
};
function rectsCollide(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

// client/src/components/Game.jsx
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var handleDeathRef = { current: null };
function Game() {
  const containerRef = (0, import_react2.useRef)(null);
  const gameLoopRef = (0, import_react2.useRef)(null);
  const { canvasRef, scale } = useResponsiveCanvas(containerRef, (canvas) => {
    if (canvas) {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
    }
  });
  const initGameState = (0, import_react2.useCallback)(() => {
    return {
      state: STATES.MENU,
      score: 0,
      highScore: parseInt(localStorage.getItem("spaceFighterHigh") || "0"),
      lives: 3,
      level: 1,
      levelTimer: 0,
      difficulty: DIFFICULTY.NORMAL,
      comboCount: 0,
      comboTimer: 0,
      bossActive: false,
      boss: null,
      spawnTimer: 0,
      spawnInterval: 90,
      enemiesKilledForBoss: 0,
      shakeTimer: 0,
      shakeIntensity: 0,
      player: new Player(),
      playerBullets: [],
      enemyBullets: [],
      enemies: [],
      powerups: [],
      particles: [],
      stars: generateStars(),
      powerupTimer: 0,
      // UI state
      showNewHighScore: false,
      difficultyMult: DIFFICULTY_NORMAL_MULTIPLIERS[DIFFICULTY.NORMAL]
    };
  }, []);
  const gameState = (0, import_react2.useRef)(initGameState()).current;
  (0, import_react2.useEffect)(() => {
    handleDeathRef.current = () => {
      gameState.state = STATES.GAMEOVER;
      gameState.showNewHighScore = gameState.score >= gameState.highScore && gameState.score > 0;
      if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        localStorage.setItem("spaceFighterHigh", gameState.highScore.toString());
      }
    };
  }, [gameState]);
  (0, import_react2.useEffect)(() => {
    initInput();
    const handleGlobalKeys = (e) => {
      if (gameState.state === STATES.MENU && e.code === KEYS.ENTER) {
        startGame();
      } else if (gameState.state === STATES.GAMEOVER && e.code === KEYS.ENTER) {
        resetGame();
      } else if (gameState.state === STATES.PLAYING && e.code === KEYS.ESCAPE) {
        togglePause();
      } else if (gameState.state === STATES.PAUSED && e.code === KEYS.ESCAPE) {
        togglePause();
      } else if (gameState.state === STATES.PLAYING && e.code === KEYS.KEY_B) {
        useBomb();
      }
    };
    window.addEventListener("keydown", handleGlobalKeys);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeys);
      destroyInput();
    };
  }, []);
  const startGame = (0, import_react2.useCallback)(() => {
    gameState.state = STATES.PLAYING;
  }, [gameState]);
  const resetGame = (0, import_react2.useCallback)(() => {
    gameState.state = STATES.PLAYING;
    gameState.score = 0;
    gameState.lives = 3;
    gameState.level = 1;
    gameState.levelTimer = 0;
    gameState.player = new Player();
    gameState.playerBullets = [];
    gameState.enemyBullets = [];
    gameState.enemies = [];
    gameState.powerups = [];
    gameState.particles = [];
    gameState.powerupTimer = 0;
    gameState.bossActive = false;
    gameState.boss = null;
    gameState.comboCount = 0;
    gameState.comboTimer = 0;
    gameState.spawnTimer = 0;
    gameState.spawnInterval = 90;
    gameState.enemiesKilledForBoss = 0;
    gameState.shakeTimer = 0;
    gameState.shakeIntensity = 0;
    gameState.showNewHighScore = false;
  }, [gameState]);
  const togglePause = (0, import_react2.useCallback)(() => {
    if (gameState.state === STATES.PLAYING) {
      gameState.state = STATES.PAUSED;
    } else if (gameState.state === STATES.PAUSED) {
      gameState.state = STATES.PLAYING;
    }
  }, [gameState]);
  const useBomb = (0, import_react2.useCallback)(() => {
    const state2 = gameState;
    if (!state2.player || state2.player.bombs <= 0) return;
    state2.player.bombs--;
    for (let i = state2.enemies.length - 1; i >= 0; i--) {
      const e = state2.enemies[i];
      e.hp -= 100;
      if (e.hp <= 0) {
        state2.particles.push(...createExplosion(e.x + e.w / 2, e.y + e.h / 2, 20));
        state2.enemies.splice(i, 1);
      }
    }
    if (state2.boss && state2.boss.hp > 0 && state2.boss.entered) {
      state2.boss.hp -= 100;
      state2.particles.push(...createExplosion(state2.boss.x + state2.boss.w / 2, state2.boss.y + state2.boss.h / 2, 30));
      if (state2.boss.hp <= 0) {
        state2.particles.push(...createExplosion(state2.boss.x + state2.boss.w / 2, state2.boss.y + state2.boss.h / 2, 80));
        state2.boss = null;
        state2.bossActive = false;
        state2.enemiesKilledForBoss = 0;
      }
    }
    gameState.shakeTimer = 15;
    gameState.shakeIntensity = 5;
  }, [gameState]);
  (0, import_react2.useEffect)(() => {
    handleDeathRef.current = () => {
      gameState.state = STATES.GAMEOVER;
      gameState.showNewHighScore = gameState.score >= gameState.highScore && gameState.score > 0;
      if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        localStorage.setItem("spaceFighterHigh", gameState.highScore.toString());
      }
    };
  }, [gameState]);
  const gameLoop = (0, import_react2.useCallback)((time) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
      return;
    }
    const ctx = canvas.getContext("2d");
    const state2 = gameState;
    const t = time || Date.now();
    if (state2.state === STATES.PLAYING) {
      updateGame(state2, t, scale);
    } else {
      updateStars(state2.stars, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
    drawGame(ctx, state2, t, canvas.width, canvas.height, scale);
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, canvasRef, scale]);
  (0, import_react2.useLayoutEffect)(() => {
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameLoop]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: containerRef, className: "game-container", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "canvas",
    {
      ref: canvasRef,
      className: "game-canvas"
    }
  ) });
}
function updateGame(state2, time, scale) {
  const { player, playerBullets, enemyBullets, enemies, powerups, particles } = state2;
  const { dx, dy } = getDirection();
  player.move(dx, dy);
  player.update();
  if (isPressed(KEYS.SPACE) && player.canFire()) {
    const newBullets = player.fire();
    playerBullets.push(...newBullets);
  }
  if (state2.comboTimer > 0) {
    state2.comboTimer--;
    if (state2.comboTimer <= 0) state2.comboCount = 0;
  }
  for (let i = playerBullets.length - 1; i >= 0; i--) {
    const b = playerBullets[i];
    b.update();
    if (!b.active) {
      playerBullets.splice(i, 1);
      continue;
    }
    for (let j = enemies.length - 1; j >= 0; j--) {
      const e = enemies[j];
      if (rectsCollide(b, e)) {
        const killed = e.takeDamage(b.damage);
        playerBullets.splice(i, 1);
        particles.push(...createSparks(b.x, b.y, 5));
        if (killed) {
          particles.push(...createExplosion(e.x + e.w / 2, e.y + e.h / 2, e.type === "type3" ? 25 : 15));
          state2.comboCount++;
          state2.comboTimer = 120;
          const comboMultiplier = Math.min(state2.comboCount, 10);
          state2.score += e.points * comboMultiplier;
          if (Math.random() < 0.15) {
            spawnPowerup(e.x + e.w / 2 - 10, e.y + e.h / 2, powerups);
          }
          enemies.splice(j, 1);
          state2.enemiesKilledForBoss++;
        }
        break;
      }
    }
    if (state2.boss && state2.boss.hp > 0 && state2.boss.entered) {
      if (rectsCollide(b, state2.boss)) {
        state2.boss.hp -= b.damage;
        playerBullets.splice(i, 1);
        particles.push(...createSparks(b.x, b.y, 3));
        if (state2.boss.hp <= 0) {
          particles.push(...createExplosion(state2.boss.x + state2.boss.w / 2, state2.boss.y + state2.boss.h / 2, 80));
          state2.score += state2.boss.points;
          state2.boss = null;
          state2.bossActive = false;
          state2.enemiesKilledForBoss = 0;
          state2.level++;
          state2.spawnInterval = Math.max(30, 90 - state2.level * 8);
          state2.shakeTimer = 20;
          state2.shakeIntensity = 8;
        }
      }
    }
  }
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    e.update();
    if (!e.active) {
      enemies.splice(i, 1);
      continue;
    }
    if (e.needsBullet()) {
      const bullet = e.spawnBullet();
      enemyBullets.push(bullet);
    }
    if (player.invincible <= 0 && rectsCollide(player, e)) {
      if (player.takeHit()) {
        handlePlayerHit(state2);
      }
      e.hp -= 50;
      if (e.hp <= 0) {
        particles.push(...createExplosion(e.x + e.w / 2, e.y + e.h / 2, 20));
        enemies.splice(i, 1);
      }
    }
  }
  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    const b = enemyBullets[i];
    b.update();
    if (!b.active) {
      enemyBullets.splice(i, 1);
      continue;
    }
    if (player.invincible <= 0 && rectsCollide(b, player)) {
      if (player.takeHit()) {
        handlePlayerHit(state2);
      }
      enemyBullets.splice(i, 1);
    }
  }
  if (state2.boss) {
    state2.boss.update(player.x + player.w / 2);
    if (state2.boss.needsBullet()) {
      const bullets = state2.boss.spawnBullets();
      if (bullets.length === 1 && bullets[0].isEnemy) {
        const angle = Math.atan2(player.y - state2.boss.y, player.x - (state2.boss.x + state2.boss.w / 2));
        bullets[0].vy = Math.sin(angle) * 5;
        bullets[0].vx = Math.cos(angle) * 5;
      }
      enemyBullets.push(...bullets);
    }
    if (player.invincible <= 0 && rectsCollide(player, state2.boss)) {
      if (player.takeHit()) {
        handlePlayerHit(state2);
      }
    }
  }
  if (!state2.bossActive && state2.enemiesKilledForBoss >= 20 && enemies.length === 0) {
    state2.bossActive = true;
    state2.boss = new Boss(state2.level, state2.difficultyMult);
    particles.push(...createExplosion(CANVAS_WIDTH / 2, 100, 50));
  }
  state2.spawnTimer++;
  if (state2.spawnTimer >= state2.spawnInterval && !state2.bossActive) {
    state2.spawnTimer = 0;
    spawnEnemy(enemies, state2.difficultyMult);
  }
  state2.levelTimer++;
  if (state2.levelTimer > 1800 && !state2.bossActive) {
    state2.levelTimer = 0;
    state2.level++;
    state2.spawnInterval = Math.max(30, 90 - state2.level * 8);
  }
  for (let i = powerups.length - 1; i >= 0; i--) {
    const pu = powerups[i];
    pu.update();
    if (!pu.active) {
      powerups.splice(i, 1);
      continue;
    }
    if (rectsCollide(player, pu)) {
      switch (pu.type) {
        case "health":
          state2.lives = Math.min(state2.lives + 1, 5);
          break;
        case "power":
          player.addPower();
          break;
        case "shield":
          player.addShield();
          break;
        case "bomb":
          player.addBomb();
          break;
      }
      particles.push(...createSparks(pu.x, pu.y, 10));
      powerups.splice(i, 1);
    }
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    const pt = particles[i];
    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.vy += 0.05;
    pt.life -= pt.decay;
    if (pt.life <= 0) {
      particles.splice(i, 1);
    }
  }
  if (state2.shakeTimer > 0) state2.shakeTimer--;
  updateStars(state2.stars, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function handlePlayerHit(state2) {
  state2.lives--;
  state2.player.invincible = 120;
  state2.comboCount = 0;
  state2.particles.push(...createExplosion(state2.player.x + state2.player.w / 2, state2.player.y + state2.player.h / 2, 30));
  state2.shakeTimer = 15;
  state2.shakeIntensity = 6;
  if (state2.lives <= 0) {
    if (handleDeathRef.current) {
      handleDeathRef.current();
    }
  }
}
function spawnEnemy(enemies, difficultyMult) {
  const availableTypes = ["type1"];
  enemies.push(new Enemy(availableTypes[0], difficultyMult));
}
function spawnPowerup(x, y, powerups) {
  const rand = Math.random();
  let type = "health";
  if (rand < 0.35) type = "health";
  else if (rand < 0.7) type = "power";
  else if (rand < 0.9) type = "shield";
  else type = "bomb";
  powerups.push(new Powerup(x, y, type));
}
function drawGame(ctx, state2, time, canvasWidth, canvasHeight, scale = 1) {
  ctx.save();
  ctx.scale(scale, scale);
  if (state2.shakeTimer > 0) {
    const sx = (Math.random() - 0.5) * state2.shakeIntensity;
    const sy = (Math.random() - 0.5) * state2.shakeIntensity;
    ctx.translate(sx, sy);
  }
  ctx.fillStyle = "#05050f";
  ctx.fillRect(-10, -10, CANVAS_WIDTH + 20, CANVAS_HEIGHT + 20);
  drawStars(ctx, state2.stars, time);
  if (state2.state === STATES.MENU) {
    drawMenu(ctx, state2, time);
  } else if (state2.state === STATES.PLAYING || state2.state === STATES.PAUSED || state2.state === STATES.GAMEOVER) {
    drawGameObjects(ctx, state2, time);
    drawHUD(ctx, state2, time);
    if (state2.state === STATES.PAUSED) {
      drawPauseOverlay(ctx, state2);
    }
    if (state2.state === STATES.GAMEOVER) {
      drawGameOver(ctx, state2);
    }
  }
  ctx.restore();
}
function drawGameObjects(ctx, state2, time) {
  const { powerups, enemies, boss, playerBullets, enemyBullets, particles, player } = state2;
  for (const pu of powerups) {
    drawPowerup(ctx, pu);
  }
  for (const e of enemies) {
    switch (e.type) {
      case "type1":
        drawEnemyType1(ctx, e.x, e.y, e.w, e.h);
        break;
      case "type2":
        drawEnemyType2(ctx, e.x, e.y, e.w, e.h);
        break;
      case "type3":
        drawEnemyType3(ctx, e.x, e.y, e.w, e.h, e.hp, e.maxHp);
        break;
    }
    if (e.type === "type3" && e.hp < e.maxHp) {
      ctx.fillStyle = "#333";
      ctx.fillRect(e.x, e.y - 8, e.w, 4);
      ctx.fillStyle = "#0f0";
      ctx.fillRect(e.x, e.y - 8, e.w * (e.hp / e.maxHp), 4);
    }
  }
  if (boss && boss.hp > 0) {
    drawBoss(ctx, boss.x, boss.y, boss.w, boss.h, boss.hp, boss.maxHp);
  }
  if (player && state2.lives > 0) {
    if (player.invincible <= 0 || Math.floor(player.invincible / 4) % 2 === 0) {
      drawPlayerShip(ctx, player.x, player.y, player.w, player.h);
    }
    if (player.shieldActive && player.shieldHP > 0) {
      ctx.strokeStyle = `rgba(0, 200, 255, ${0.3 + Math.sin(time / 100) * 0.2})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(player.x + player.w / 2, player.y + player.h / 2, 35, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.15 + Math.sin(time / 80) * 0.1})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(player.x + player.w / 2, player.y + player.h / 2, 40, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  for (const b of playerBullets) {
    drawBullet(ctx, b);
  }
  for (const b of enemyBullets) {
    drawBullet(ctx, b);
  }
  drawParticles(ctx, particles);
}
function drawMenu(ctx, state2, time) {
  ctx.textAlign = "center";
  const glow = Math.sin(time / 500) * 0.3 + 0.7;
  ctx.shadowColor = "#0ff";
  ctx.shadowBlur = 20 * glow;
  ctx.fillStyle = "#0ff";
  ctx.font = "bold 60px Courier New";
  ctx.fillText("SPACE FIGHTER", CANVAS_WIDTH / 2, 180);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#888";
  ctx.font = "18px Courier New";
  ctx.fillText("A Star Destroyer Awaits...", CANVAS_WIDTH / 2, 220);
  const blink = Math.sin(time / 400) > 0;
  if (blink) {
    ctx.fillStyle = "#ff0";
    ctx.font = "bold 22px Courier New";
    ctx.fillText("PRESS ENTER TO START", CANVAS_WIDTH / 2, 320);
  }
  ctx.fillStyle = "#aaa";
  ctx.font = "16px Courier New";
  const controls = [
    "WASD / ARROWS - Move Ship",
    "SPACE - Fire Weapons",
    "B - Use Bomb",
    "ESC - Pause"
  ];
  controls.forEach((line, i) => {
    ctx.fillText(line, CANVAS_WIDTH / 2, 400 + i * 30);
  });
  ctx.fillStyle = "#f80";
  ctx.font = "14px Courier New";
  ctx.fillText(`Difficulty: ${state2.difficulty.toUpperCase()}`, CANVAS_WIDTH / 2, 530);
  if (state2.highScore > 0) {
    ctx.fillStyle = "#ff0";
    ctx.font = "16px Courier New";
    ctx.fillText(`HIGH SCORE: ${state2.highScore.toString().padStart(6, "0")}`, CANVAS_WIDTH / 2, 560);
  }
  drawPlayerShip(ctx, CANVAS_WIDTH / 2 - 50, 260, 40, 48);
  drawEnemyType1(ctx, CANVAS_WIDTH / 2 + 50, 265, 36, 36);
}
function drawHUD(ctx, state2, time) {
  const { score, highScore, lives, level, comboCount, comboTimer, player, boss } = state2;
  ctx.fillStyle = "#0ff";
  ctx.font = "bold 18px Courier New";
  ctx.textAlign = "left";
  ctx.fillText(`SCORE: ${score.toString().padStart(6, "0")}`, 20, 35);
  ctx.fillStyle = "#888";
  ctx.font = "14px Courier New";
  ctx.fillText(`HIGH: ${highScore.toString().padStart(6, "0")}`, 20, 55);
  ctx.fillStyle = "#0ff";
  ctx.fillText("LIVES:", CANVAS_WIDTH - 180, 35);
  for (let i = 0; i < lives; i++) {
    drawPlayerShip(ctx, CANVAS_WIDTH - 120 + i * 28, 22, 20, 24);
  }
  ctx.fillStyle = "#ff0";
  ctx.font = "bold 16px Courier New";
  ctx.textAlign = "center";
  ctx.fillText(`LEVEL ${level}`, CANVAS_WIDTH / 2, 30);
  if (comboCount > 1) {
    ctx.fillStyle = `rgba(255, 255, 0, ${comboTimer / 120})`;
    ctx.font = `bold ${16 + Math.min(comboCount, 10)}px Courier New`;
    ctx.fillText(`${Math.min(comboCount, 10)}x COMBO!`, CANVAS_WIDTH / 2, 60);
  }
  ctx.fillStyle = "#f80";
  ctx.font = "14px Courier New";
  ctx.textAlign = "left";
  const powerBar = "\u2588".repeat(player.powerLevel) + "\u2591".repeat(Math.min(3, 4 - player.powerLevel));
  ctx.fillText(`POWER: ${powerBar}`, 20, 75);
  if (player.bombs > 0) {
    ctx.fillStyle = "#ff0";
    ctx.fillText(`BOMBS: ${player.bombs}`, 20, 95);
  }
  if (boss && boss.hp > 0) {
    const barW = 300;
    const barX = CANVAS_WIDTH / 2 - barW / 2;
    const barY = CANVAS_HEIGHT - 40;
    ctx.fillStyle = "#333";
    ctx.fillRect(barX, barY, barW, 12);
    ctx.fillStyle = `rgb(${Math.floor(255 * (1 - boss.hp / boss.maxHp))}, 100, 0)`;
    ctx.fillRect(barX, barY, barW * (boss.hp / boss.maxHp), 12);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barW, 12);
    ctx.fillStyle = "#fff";
    ctx.font = "12px Courier New";
    ctx.textAlign = "center";
    ctx.fillText("BOSS", CANVAS_WIDTH / 2, barY - 4);
  }
}
function drawPauseOverlay(ctx, state2) {
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.textAlign = "center";
  ctx.fillStyle = "#0ff";
  ctx.font = "bold 48px Courier New";
  ctx.fillText("PAUSED", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);
  ctx.fillStyle = "#aaa";
  ctx.font = "18px Courier New";
  ctx.fillText("Press ESC to resume", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
}
function drawGameOver(ctx, state2) {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.textAlign = "center";
  ctx.shadowColor = "#f00";
  ctx.shadowBlur = 20;
  ctx.fillStyle = "#f44";
  ctx.font = "bold 56px Courier New";
  ctx.fillText("GAME OVER", CANVAS_WIDTH / 2, 200);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#fff";
  ctx.font = "bold 28px Courier New";
  ctx.fillText(`FINAL SCORE: ${state2.score.toString().padStart(6, "0")}`, CANVAS_WIDTH / 2, 280);
  ctx.fillStyle = "#ff0";
  ctx.font = "20px Courier New";
  ctx.fillText(`LEVEL REACHED: ${state2.level}`, CANVAS_WIDTH / 2, 320);
  if (state2.showNewHighScore) {
    ctx.fillStyle = "#f0f";
    ctx.font = "bold 22px Courier New";
    ctx.fillText("\u2605 NEW HIGH SCORE! \u2605", CANVAS_WIDTH / 2, 360);
  }
  const blink = Math.sin(Date.now() / 400) > 0;
  if (blink) {
    ctx.fillStyle = "#0ff";
    ctx.font = "bold 22px Courier New";
    ctx.fillText("PRESS ENTER TO PLAY AGAIN", CANVAS_WIDTH / 2, 440);
  }
}
function generateStars() {
  const stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * CANVAS_WIDTH,
      y: Math.random() * CANVAS_HEIGHT,
      size: Math.random() * 2.5 + 0.5,
      speed: Math.random() * 2 + 0.5,
      brightness: Math.random() * 0.5 + 0.5
    });
  }
  return stars;
}
export {
  Game as default
};
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
