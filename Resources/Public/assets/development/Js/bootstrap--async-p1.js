(function (Popper) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const MILLISECONDS_MULTIPLIER = 1000;
  const TRANSITION_END = 'transitionend';

  // Shoutout AngusCroll (https://goo.gl/pxwQGp)
  const toType = obj => {
    if (obj === null || obj === undefined) {
      return `${obj}`
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase()
  };

  const getSelector = element => {
    let selector = element.getAttribute('data-bs-target');

    if (!selector || selector === '#') {
      let hrefAttr = element.getAttribute('href');

      // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273
      if (!hrefAttr || (!hrefAttr.includes('#') && !hrefAttr.startsWith('.'))) {
        return null
      }

      // Just in case some CMS puts out a full URL with the anchor appended
      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
        hrefAttr = `#${hrefAttr.split('#')[1]}`;
      }

      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
    }

    return selector
  };

  const getSelectorFromElement = element => {
    const selector = getSelector(element);

    if (selector) {
      return document.querySelector(selector) ? selector : null
    }

    return null
  };

  const getElementFromSelector = element => {
    const selector = getSelector(element);

    return selector ? document.querySelector(selector) : null
  };

  const getTransitionDurationFromElement = element => {
    if (!element) {
      return 0
    }

    // Get transition-duration of the element
    let { transitionDuration, transitionDelay } = window.getComputedStyle(element);

    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay);

    // Return 0 if element or transition duration is not found
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0
    }

    // If multiple durations are defined, take the first
    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];

    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER
  };

  const triggerTransitionEnd = element => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };

  const isElement = obj => {
    if (!obj || typeof obj !== 'object') {
      return false
    }

    if (typeof obj.jquery !== 'undefined') {
      obj = obj[0];
    }

    return typeof obj.nodeType !== 'undefined'
  };

  const getElement = obj => {
    if (isElement(obj)) { // it's a jQuery object or a node element
      return obj.jquery ? obj[0] : obj
    }

    if (typeof obj === 'string' && obj.length > 0) {
      return document.querySelector(obj)
    }

    return null
  };

  const typeCheckConfig = (componentName, config, configTypes) => {
    Object.keys(configTypes).forEach(property => {
      const expectedTypes = configTypes[property];
      const value = config[property];
      const valueType = value && isElement(value) ? 'element' : toType(value);

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(
          `${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`
        )
      }
    });
  };

  const isVisible = element => {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false
    }

    return getComputedStyle(element).getPropertyValue('visibility') === 'visible'
  };

  const isDisabled = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true
    }

    if (element.classList.contains('disabled')) {
      return true
    }

    if (typeof element.disabled !== 'undefined') {
      return element.disabled
    }

    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false'
  };

  const noop = () => {};

  /**
   * Trick to restart an element's animation
   *
   * @param {HTMLElement} element
   * @return void
   *
   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
   */
  const reflow = element => {
    // eslint-disable-next-line no-unused-expressions
    element.offsetHeight;
  };

  const getjQuery = () => {
    const { jQuery } = window;

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery
    }

    return null
  };

  const DOMContentLoadedCallbacks = [];

  const onDOMContentLoaded = callback => {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', () => {
          DOMContentLoadedCallbacks.forEach(callback => callback());
        });
      }

      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };

  const isRTL = () => document.documentElement.dir === 'rtl';

  const defineJQueryPlugin = plugin => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      /* istanbul ignore if */
      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;
        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface
        };
      }
    });
  };

  const execute = callback => {
    if (typeof callback === 'function') {
      callback();
    }
  };

  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return
    }

    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;

    let called = false;

    const handler = ({ target }) => {
      if (target !== transitionElement) {
        return
      }

      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };

    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };

  /**
   * Return the previous/next element of a list.
   *
   * @param {array} list    The list of elements
   * @param activeElement   The active element
   * @param shouldGetNext   Choose to get next or previous element
   * @param isCycleAllowed
   * @return {Element|elem} The proper element
   */
  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    let index = list.indexOf(activeElement);

    // if the element does not exist in the list return an element depending on the direction and if cycle is allowed
    if (index === -1) {
      return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0]
    }

    const listLength = list.length;

    index += shouldGetNext ? 1 : -1;

    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }

    return list[Math.max(0, Math.min(index, listLength - 1))]
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  const stripNameRegex = /\..*/;
  const stripUidRegex = /::\d+$/;
  const eventRegistry = {}; // Events storage
  let uidEvent = 1;
  const customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  const customEventsRegex = /^(mouseenter|mouseleave)/i;
  const nativeEvents = new Set([
    'click',
    'dblclick',
    'mouseup',
    'mousedown',
    'contextmenu',
    'mousewheel',
    'DOMMouseScroll',
    'mouseover',
    'mouseout',
    'mousemove',
    'selectstart',
    'selectend',
    'keydown',
    'keypress',
    'keyup',
    'orientationchange',
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel',
    'pointerdown',
    'pointermove',
    'pointerup',
    'pointerleave',
    'pointercancel',
    'gesturestart',
    'gesturechange',
    'gestureend',
    'focus',
    'blur',
    'change',
    'reset',
    'select',
    'submit',
    'focusin',
    'focusout',
    'load',
    'unload',
    'beforeunload',
    'resize',
    'move',
    'DOMContentLoaded',
    'readystatechange',
    'error',
    'abort',
    'scroll'
  ]);

  /**
   * ------------------------------------------------------------------------
   * Private methods
   * ------------------------------------------------------------------------
   */

  function getUidEvent(element, uid) {
    return (uid && `${uid}::${uidEvent++}`) || element.uidEvent || uidEvent++
  }

  function getEvent(element) {
    const uid = getUidEvent(element);

    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};

    return eventRegistry[uid]
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      event.delegateTarget = element;

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event])
    }
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);

      for (let { target } = event; target && target !== this; target = target.parentNode) {
        for (let i = domElements.length; i--;) {
          if (domElements[i] === target) {
            event.delegateTarget = target;

            if (handler.oneOff) {
              EventHandler.off(element, event.type, selector, fn);
            }

            return fn.apply(target, [event])
          }
        }
      }

      // To please ESLint
      return null
    }
  }

  function findHandler(events, handler, delegationSelector = null) {
    const uidEventList = Object.keys(events);

    for (let i = 0, len = uidEventList.length; i < len; i++) {
      const event = events[uidEventList[i]];

      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
        return event
      }
    }

    return null
  }

  function normalizeParams(originalTypeEvent, handler, delegationFn) {
    const delegation = typeof handler === 'string';
    const originalHandler = delegation ? delegationFn : handler;

    let typeEvent = getTypeEvent(originalTypeEvent);
    const isNative = nativeEvents.has(typeEvent);

    if (!isNative) {
      typeEvent = originalTypeEvent;
    }

    return [delegation, originalHandler, typeEvent]
  }

  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return
    }

    if (!handler) {
      handler = delegationFn;
      delegationFn = null;
    }

    // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does
    if (customEventsRegex.test(originalTypeEvent)) {
      const wrapFn = fn => {
        return function (event) {
          if (!event.relatedTarget || (event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget))) {
            return fn.call(this, event)
          }
        }
      };

      if (delegationFn) {
        delegationFn = wrapFn(delegationFn);
      } else {
        handler = wrapFn(handler);
      }
    }

    const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
    const events = getEvent(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

    if (previousFn) {
      previousFn.oneOff = previousFn.oneOff && oneOff;

      return
    }

    const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
    const fn = delegation ?
      bootstrapDelegationHandler(element, handler, delegationFn) :
      bootstrapHandler(element, handler);

    fn.delegationSelector = delegation ? handler : null;
    fn.originalHandler = originalHandler;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;

    element.addEventListener(typeEvent, fn, delegation);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};

    Object.keys(storeElementEvent).forEach(handlerKey => {
      if (handlerKey.includes(namespace)) {
        const event = storeElementEvent[handlerKey];

        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  }

  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event
  }

  const EventHandler = {
    on(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, false);
    },

    one(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, true);
    },

    off(element, originalTypeEvent, handler, delegationFn) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return
      }

      const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getEvent(element);
      const isNamespace = originalTypeEvent.startsWith('.');

      if (typeof originalHandler !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!events || !events[typeEvent]) {
          return
        }

        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
        return
      }

      if (isNamespace) {
        Object.keys(events).forEach(elementEvent => {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        });
      }

      const storeElementEvent = events[typeEvent] || {};
      Object.keys(storeElementEvent).forEach(keyHandlers => {
        const handlerKey = keyHandlers.replace(stripUidRegex, '');

        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          const event = storeElementEvent[keyHandlers];

          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
        }
      });
    },

    trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null
      }

      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      const isNative = nativeEvents.has(typeEvent);

      let jQueryEvent;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;
      let evt = null;

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);

        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      if (isNative) {
        evt = document.createEvent('HTMLEvents');
        evt.initEvent(typeEvent, bubbles, true);
      } else {
        evt = new CustomEvent(event, {
          bubbles,
          cancelable: true
        });
      }

      // merge custom information in our event
      if (typeof args !== 'undefined') {
        Object.keys(args).forEach(key => {
          Object.defineProperty(evt, key, {
            get() {
              return args[key]
            }
          });
        });
      }

      if (defaultPrevented) {
        evt.preventDefault();
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
        jQueryEvent.preventDefault();
      }

      return evt
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  function normalizeData(val) {
    if (val === 'true') {
      return true
    }

    if (val === 'false') {
      return false
    }

    if (val === Number(val).toString()) {
      return Number(val)
    }

    if (val === '' || val === 'null') {
      return null
    }

    return val
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`)
  }

  const Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },

    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },

    getDataAttributes(element) {
      if (!element) {
        return {}
      }

      const attributes = {};

      Object.keys(element.dataset)
        .filter(key => key.startsWith('bs'))
        .forEach(key => {
          let pureKey = key.replace(/^bs/, '');
          pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
          attributes[pureKey] = normalizeData(element.dataset[key]);
        });

      return attributes
    },

    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`))
    },

    offset(element) {
      const rect = element.getBoundingClientRect();

      return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
      }
    },

    position(element) {
      return {
        top: element.offsetTop,
        left: element.offsetLeft
      }
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const NODE_TEXT = 3;

  const SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector))
    },

    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector)
    },

    children(element, selector) {
      return [].concat(...element.children)
        .filter(child => child.matches(selector))
    },

    parents(element, selector) {
      const parents = [];

      let ancestor = element.parentNode;

      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (ancestor.matches(selector)) {
          parents.push(ancestor);
        }

        ancestor = ancestor.parentNode;
      }

      return parents
    },

    prev(element, selector) {
      let previous = element.previousElementSibling;

      while (previous) {
        if (previous.matches(selector)) {
          return [previous]
        }

        previous = previous.previousElementSibling;
      }

      return []
    },

    next(element, selector) {
      let next = element.nextElementSibling;

      while (next) {
        if (next.matches(selector)) {
          return [next]
        }

        next = next.nextElementSibling;
      }

      return []
    },

    focusableChildren(element) {
      const focusables = [
        'a',
        'button',
        'input',
        'textarea',
        'select',
        'details',
        '[tabindex]',
        '[contenteditable="true"]'
      ].map(selector => `${selector}:not([tabindex^="-"])`).join(', ');

      return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el))
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const elementMap = new Map();

  var Data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }

      const instanceMap = elementMap.get(element);

      // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used
      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return
      }

      instanceMap.set(key, instance);
    },

    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null
      }

      return null
    },

    remove(element, key) {
      if (!elementMap.has(element)) {
        return
      }

      const instanceMap = elementMap.get(element);

      instanceMap.delete(key);

      // free up element references if there are no instances left for an element
      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const VERSION = '5.1.3';

  class BaseComponent {
    constructor(element) {
      element = getElement(element);

      if (!element) {
        return
      }

      this._element = element;
      Data.set(this._element, this.constructor.DATA_KEY, this);
    }

    dispose() {
      Data.remove(this._element, this.constructor.DATA_KEY);
      EventHandler.off(this._element, this.constructor.EVENT_KEY);

      Object.getOwnPropertyNames(this).forEach(propertyName => {
        this[propertyName] = null;
      });
    }

    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }

    /** Static */

    static getInstance(element) {
      return Data.get(getElement(element), this.DATA_KEY)
    }

    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null)
    }

    static get VERSION() {
      return VERSION
    }

    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!')
    }

    static get DATA_KEY() {
      return `bs.${this.NAME}`
    }

    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$1 = 'dropdown';
  const DATA_KEY$1 = 'bs.dropdown';
  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
  const DATA_API_KEY$1 = '.data-api';

  const ESCAPE_KEY = 'Escape';
  const SPACE_KEY = 'Space';
  const TAB_KEY = 'Tab';
  const ARROW_UP_KEY = 'ArrowUp';
  const ARROW_DOWN_KEY = 'ArrowDown';
  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY}`);

  const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
  const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
  const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
  const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
  const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$1}${DATA_API_KEY$1}`;
  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$1}${DATA_API_KEY$1}`;
  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$1}${DATA_API_KEY$1}`;

  const CLASS_NAME_SHOW$1 = 'show';
  const CLASS_NAME_DROPUP = 'dropup';
  const CLASS_NAME_DROPEND = 'dropend';
  const CLASS_NAME_DROPSTART = 'dropstart';
  const CLASS_NAME_NAVBAR = 'navbar';

  const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="dropdown"]';
  const SELECTOR_MENU = '.dropdown-menu';
  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';

  const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
  const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
  const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
  const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
  const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
  const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';

  const Default$1 = {
    offset: [0, 2],
    boundary: 'clippingParents',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null,
    autoClose: true
  };

  const DefaultType$1 = {
    offset: '(array|string|function)',
    boundary: '(string|element)',
    reference: '(string|element|object)',
    display: 'string',
    popperConfig: '(null|object|function)',
    autoClose: '(boolean|string)'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Dropdown extends BaseComponent {
    constructor(element, config) {
      super(element);

      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();
    }

    // Getters

    static get Default() {
      return Default$1
    }

    static get DefaultType() {
      return DefaultType$1
    }

    static get NAME() {
      return NAME$1
    }

    // Public

    toggle() {
      return this._isShown() ? this.hide() : this.show()
    }

    show() {
      if (isDisabled(this._element) || this._isShown(this._menu)) {
        return
      }

      const relatedTarget = {
        relatedTarget: this._element
      };

      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, relatedTarget);

      if (showEvent.defaultPrevented) {
        return
      }

      const parent = Dropdown.getParentFromElement(this._element);
      // Totally disable Popper for Dropdowns in Navbar
      if (this._inNavbar) {
        Manipulator.setDataAttribute(this._menu, 'popper', 'none');
      } else {
        this._createPopper(parent);
      }

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement &&
        !parent.closest(SELECTOR_NAVBAR_NAV)) {
        [].concat(...document.body.children)
          .forEach(elem => EventHandler.on(elem, 'mouseover', noop));
      }

      this._element.focus();
      this._element.setAttribute('aria-expanded', true);

      this._menu.classList.add(CLASS_NAME_SHOW$1);
      this._element.classList.add(CLASS_NAME_SHOW$1);
      EventHandler.trigger(this._element, EVENT_SHOWN$1, relatedTarget);
    }

    hide() {
      if (isDisabled(this._element) || !this._isShown(this._menu)) {
        return
      }

      const relatedTarget = {
        relatedTarget: this._element
      };

      this._completeHide(relatedTarget);
    }

    dispose() {
      if (this._popper) {
        this._popper.destroy();
      }

      super.dispose();
    }

    update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper) {
        this._popper.update();
      }
    }

    // Private

    _completeHide(relatedTarget) {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$1, relatedTarget);
      if (hideEvent.defaultPrevented) {
        return
      }

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        [].concat(...document.body.children)
          .forEach(elem => EventHandler.off(elem, 'mouseover', noop));
      }

      if (this._popper) {
        this._popper.destroy();
      }

      this._menu.classList.remove(CLASS_NAME_SHOW$1);
      this._element.classList.remove(CLASS_NAME_SHOW$1);
      this._element.setAttribute('aria-expanded', 'false');
      Manipulator.removeDataAttribute(this._menu, 'popper');
      EventHandler.trigger(this._element, EVENT_HIDDEN$1, relatedTarget);
    }

    _getConfig(config) {
      config = {
        ...this.constructor.Default,
        ...Manipulator.getDataAttributes(this._element),
        ...config
      };

      typeCheckConfig(NAME$1, config, this.constructor.DefaultType);

      if (typeof config.reference === 'object' && !isElement(config.reference) &&
        typeof config.reference.getBoundingClientRect !== 'function'
      ) {
        // Popper virtual elements require a getBoundingClientRect method
        throw new TypeError(`${NAME$1.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`)
      }

      return config
    }

    _createPopper(parent) {
      if (typeof Popper__namespace === 'undefined') {
        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)')
      }

      let referenceElement = this._element;

      if (this._config.reference === 'parent') {
        referenceElement = parent;
      } else if (isElement(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (typeof this._config.reference === 'object') {
        referenceElement = this._config.reference;
      }

      const popperConfig = this._getPopperConfig();
      const isDisplayStatic = popperConfig.modifiers.find(modifier => modifier.name === 'applyStyles' && modifier.enabled === false);

      this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);

      if (isDisplayStatic) {
        Manipulator.setDataAttribute(this._menu, 'popper', 'static');
      }
    }

    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW$1)
    }

    _getMenuElement() {
      return SelectorEngine.next(this._element, SELECTOR_MENU)[0]
    }

    _getPlacement() {
      const parentDropdown = this._element.parentNode;

      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT
      }

      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT
      }

      // We need to trim the value because custom properties can also include spaces
      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP
      }

      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM
    }

    _detectNavbar() {
      return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null
    }

    _getOffset() {
      const { offset } = this._config;

      if (typeof offset === 'string') {
        return offset.split(',').map(val => Number.parseInt(val, 10))
      }

      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element)
      }

      return offset
    }

    _getPopperConfig() {
      const defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        },
        {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }]
      };

      // Disable Popper if we have a static display
      if (this._config.display === 'static') {
        defaultBsPopperConfig.modifiers = [{
          name: 'applyStyles',
          enabled: false
        }];
      }

      return {
        ...defaultBsPopperConfig,
        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
      }
    }

    _selectMenuItem({ key, target }) {
      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);

      if (!items.length) {
        return
      }

      // if target isn't included in items (e.g. when expanding the dropdown)
      // allow cycling to get the last item in case key equals ARROW_UP_KEY
      getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
    }

    // Static

    static jQueryInterface(config) {
      return this.each(function () {
        const data = Dropdown.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config]();
      })
    }

    static clearMenus(event) {
      if (event && (event.button === RIGHT_MOUSE_BUTTON || (event.type === 'keyup' && event.key !== TAB_KEY))) {
        return
      }

      const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1);

      for (let i = 0, len = toggles.length; i < len; i++) {
        const context = Dropdown.getInstance(toggles[i]);
        if (!context || context._config.autoClose === false) {
          continue
        }

        if (!context._isShown()) {
          continue
        }

        const relatedTarget = {
          relatedTarget: context._element
        };

        if (event) {
          const composedPath = event.composedPath();
          const isMenuTarget = composedPath.includes(context._menu);
          if (
            composedPath.includes(context._element) ||
            (context._config.autoClose === 'inside' && !isMenuTarget) ||
            (context._config.autoClose === 'outside' && isMenuTarget)
          ) {
            continue
          }

          // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
          if (context._menu.contains(event.target) && ((event.type === 'keyup' && event.key === TAB_KEY) || /input|select|option|textarea|form/i.test(event.target.tagName))) {
            continue
          }

          if (event.type === 'click') {
            relatedTarget.clickEvent = event;
          }
        }

        context._completeHide(relatedTarget);
      }
    }

    static getParentFromElement(element) {
      return getElementFromSelector(element) || element.parentNode
    }

    static dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ?
        event.key === SPACE_KEY || (event.key !== ESCAPE_KEY &&
        ((event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY) ||
          event.target.closest(SELECTOR_MENU))) :
        !REGEXP_KEYDOWN.test(event.key)) {
        return
      }

      const isActive = this.classList.contains(CLASS_NAME_SHOW$1);

      if (!isActive && event.key === ESCAPE_KEY) {
        return
      }

      event.preventDefault();
      event.stopPropagation();

      if (isDisabled(this)) {
        return
      }

      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$1) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$1)[0];
      const instance = Dropdown.getOrCreateInstance(getToggleButton);

      if (event.key === ESCAPE_KEY) {
        instance.hide();
        return
      }

      if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
        if (!isActive) {
          instance.show();
        }

        instance._selectMenuItem(event);
        return
      }

      if (!isActive || event.key === SPACE_KEY) {
        Dropdown.clearMenus();
      }
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$1, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$1, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    event.preventDefault();
    Dropdown.getOrCreateInstance(this).toggle();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Dropdown to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Dropdown);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME = 'collapse';
  const DATA_KEY = 'bs.collapse';
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';

  const Default = {
    toggle: true,
    parent: null
  };

  const DefaultType = {
    toggle: 'boolean',
    parent: '(null|element)'
  };

  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;

  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_COLLAPSE = 'collapse';
  const CLASS_NAME_COLLAPSING = 'collapsing';
  const CLASS_NAME_COLLAPSED = 'collapsed';
  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';

  const WIDTH = 'width';
  const HEIGHT = 'height';

  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Collapse extends BaseComponent {
    constructor(element, config) {
      super(element);

      this._isTransitioning = false;
      this._config = this._getConfig(config);
      this._triggerArray = [];

      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE);

      for (let i = 0, len = toggleList.length; i < len; i++) {
        const elem = toggleList[i];
        const selector = getSelectorFromElement(elem);
        const filterElement = SelectorEngine.find(selector)
          .filter(foundElem => foundElem === this._element);

        if (selector !== null && filterElement.length) {
          this._selector = selector;
          this._triggerArray.push(elem);
        }
      }

      this._initializeChildren();

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    // Getters

    static get Default() {
      return Default
    }

    static get NAME() {
      return NAME
    }

    // Public

    toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }

    show() {
      if (this._isTransitioning || this._isShown()) {
        return
      }

      let actives = [];
      let activesData;

      if (this._config.parent) {
        const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
        actives = SelectorEngine.find(SELECTOR_ACTIVES, this._config.parent).filter(elem => !children.includes(elem)); // remove children if greater depth
      }

      const container = SelectorEngine.findOne(this._selector);
      if (actives.length) {
        const tempActiveData = actives.find(elem => container !== elem);
        activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;

        if (activesData && activesData._isTransitioning) {
          return
        }
      }

      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW);
      if (startEvent.defaultPrevented) {
        return
      }

      actives.forEach(elemActive => {
        if (container !== elemActive) {
          Collapse.getOrCreateInstance(elemActive, { toggle: false }).hide();
        }

        if (!activesData) {
          Data.set(elemActive, DATA_KEY, null);
        }
      });

      const dimension = this._getDimension();

      this._element.classList.remove(CLASS_NAME_COLLAPSE);
      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.style[dimension] = 0;

      this._addAriaAndCollapsedClass(this._triggerArray, true);
      this._isTransitioning = true;

      const complete = () => {
        this._isTransitioning = false;

        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

        this._element.style[dimension] = '';

        EventHandler.trigger(this._element, EVENT_SHOWN);
      };

      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;

      this._queueCallback(complete, this._element, true);
      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }

    hide() {
      if (this._isTransitioning || !this._isShown()) {
        return
      }

      const startEvent = EventHandler.trigger(this._element, EVENT_HIDE);
      if (startEvent.defaultPrevented) {
        return
      }

      const dimension = this._getDimension();

      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;

      reflow(this._element);

      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

      const triggerArrayLength = this._triggerArray.length;
      for (let i = 0; i < triggerArrayLength; i++) {
        const trigger = this._triggerArray[i];
        const elem = getElementFromSelector(trigger);

        if (elem && !this._isShown(elem)) {
          this._addAriaAndCollapsedClass([trigger], false);
        }
      }

      this._isTransitioning = true;

      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE);
        EventHandler.trigger(this._element, EVENT_HIDDEN);
      };

      this._element.style[dimension] = '';

      this._queueCallback(complete, this._element, true);
    }

    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW)
    }

    // Private

    _getConfig(config) {
      config = {
        ...Default,
        ...Manipulator.getDataAttributes(this._element),
        ...config
      };
      config.toggle = Boolean(config.toggle); // Coerce string values
      config.parent = getElement(config.parent);
      typeCheckConfig(NAME, config, DefaultType);
      return config
    }

    _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT
    }

    _initializeChildren() {
      if (!this._config.parent) {
        return
      }

      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      SelectorEngine.find(SELECTOR_DATA_TOGGLE, this._config.parent).filter(elem => !children.includes(elem))
        .forEach(element => {
          const selected = getElementFromSelector(element);

          if (selected) {
            this._addAriaAndCollapsedClass([element], this._isShown(selected));
          }
        });
    }

    _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return
      }

      triggerArray.forEach(elem => {
        if (isOpen) {
          elem.classList.remove(CLASS_NAME_COLLAPSED);
        } else {
          elem.classList.add(CLASS_NAME_COLLAPSED);
        }

        elem.setAttribute('aria-expanded', isOpen);
      });
    }

    // Static

    static jQueryInterface(config) {
      return this.each(function () {
        const _config = {};
        if (typeof config === 'string' && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        const data = Collapse.getOrCreateInstance(this, _config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }

          data[config]();
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A' || (event.delegateTarget && event.delegateTarget.tagName === 'A')) {
      event.preventDefault();
    }

    const selector = getSelectorFromElement(this);
    const selectorElements = SelectorEngine.find(selector);

    selectorElements.forEach(element => {
      Collapse.getOrCreateInstance(element, { toggle: false }).toggle();
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Collapse to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Collapse);

})(Popper = () => {});
//# sourceMappingURL=bootstrap--async-p1.js.map
