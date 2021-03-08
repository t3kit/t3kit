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
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n['default'] = e;
    return Object.freeze(n);
  }

  var Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta2): util/index.js
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
        hrefAttr = '#' + hrefAttr.split('#')[1];
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

  const isElement = obj => (obj[0] || obj).nodeType;

  const emulateTransitionEnd = (element, duration) => {
    let called = false;
    const durationPadding = 5;
    const emulatedDuration = duration + durationPadding;

    function listener() {
      called = true;
      element.removeEventListener(TRANSITION_END, listener);
    }

    element.addEventListener(TRANSITION_END, listener);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(element);
      }
    }, emulatedDuration);
  };

  const typeCheckConfig = (componentName, config, configTypes) => {
    Object.keys(configTypes).forEach(property => {
      const expectedTypes = configTypes[property];
      const value = config[property];
      const valueType = value && isElement(value) ? 'element' : toType(value);

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(
          `${componentName.toUpperCase()}: ` +
          `Option "${property}" provided type "${valueType}" ` +
          `but expected type "${expectedTypes}".`
        )
      }
    });
  };

  const isVisible = element => {
    if (!element) {
      return false
    }

    if (element.style && element.parentNode && element.parentNode.style) {
      const elementStyle = getComputedStyle(element);
      const parentNodeStyle = getComputedStyle(element.parentNode);

      return elementStyle.display !== 'none' &&
        parentNodeStyle.display !== 'none' &&
        elementStyle.visibility !== 'hidden'
    }

    return false
  };

  const noop = () => function () {};

  const reflow = element => element.offsetHeight;

  const getjQuery = () => {
    const { jQuery } = window;

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery
    }

    return null
  };

  const onDOMContentLoaded = callback => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  };

  const isRTL = document.documentElement.dir === 'rtl';

  const defineJQueryPlugin = (name, plugin) => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      /* istanbul ignore if */
      if ($) {
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

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta2): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const mapData = (() => {
    const storeData = {};
    let id = 1;
    return {
      set(element, key, data) {
        if (typeof element.bsKey === 'undefined') {
          element.bsKey = {
            key,
            id
          };
          id++;
        }

        storeData[element.bsKey.id] = data;
      },
      get(element, key) {
        if (!element || typeof element.bsKey === 'undefined') {
          return null
        }

        const keyProperties = element.bsKey;
        if (keyProperties.key === key) {
          return storeData[keyProperties.id]
        }

        return null
      },
      delete(element, key) {
        if (typeof element.bsKey === 'undefined') {
          return
        }

        const keyProperties = element.bsKey;
        if (keyProperties.key === key) {
          delete storeData[keyProperties.id];
          delete element.bsKey;
        }
      }
    }
  })();

  const Data = {
    setData(instance, key, data) {
      mapData.set(instance, key, data);
    },
    getData(instance, key) {
      return mapData.get(instance, key)
    },
    removeData(instance, key) {
      mapData.delete(instance, key);
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta2): dom/event-handler.js
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
              // eslint-disable-next-line unicorn/consistent-destructuring
              EventHandler.off(element, event.type, fn);
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

    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    let typeEvent = originalTypeEvent.replace(stripNameRegex, '');
    const custom = customEvents[typeEvent];

    if (custom) {
      typeEvent = custom;
    }

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
      const typeEvent = event.replace(stripNameRegex, '');
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
   * Bootstrap (v5.0.0-beta2): dom/manipulator.js
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
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
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
   * Bootstrap (v5.0.0-beta2): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
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
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta2): base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const VERSION = '5.0.0-beta2';

  class BaseComponent {
    constructor(element) {
      if (!element) {
        return
      }

      this._element = element;
      Data.setData(element, this.constructor.DATA_KEY, this);
    }

    dispose() {
      Data.removeData(this._element, this.constructor.DATA_KEY);
      this._element = null;
    }

    /** Static */

    static getInstance(element) {
      return Data.getData(element, this.DATA_KEY)
    }

    static get VERSION() {
      return VERSION
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta2): dropdown.js
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
  const EVENT_CLICK = `click${EVENT_KEY$1}`;
  const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$1}${DATA_API_KEY$1}`;
  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$1}${DATA_API_KEY$1}`;
  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$1}${DATA_API_KEY$1}`;

  const CLASS_NAME_DISABLED = 'disabled';
  const CLASS_NAME_SHOW$1 = 'show';
  const CLASS_NAME_DROPUP = 'dropup';
  const CLASS_NAME_DROPEND = 'dropend';
  const CLASS_NAME_DROPSTART = 'dropstart';
  const CLASS_NAME_NAVBAR = 'navbar';

  const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="dropdown"]';
  const SELECTOR_FORM_CHILD = '.dropdown form';
  const SELECTOR_MENU = '.dropdown-menu';
  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';

  const PLACEMENT_TOP = isRTL ? 'top-end' : 'top-start';
  const PLACEMENT_TOPEND = isRTL ? 'top-start' : 'top-end';
  const PLACEMENT_BOTTOM = isRTL ? 'bottom-end' : 'bottom-start';
  const PLACEMENT_BOTTOMEND = isRTL ? 'bottom-start' : 'bottom-end';
  const PLACEMENT_RIGHT = isRTL ? 'left-start' : 'right-start';
  const PLACEMENT_LEFT = isRTL ? 'right-start' : 'left-start';

  const Default$1 = {
    offset: [0, 2],
    flip: true,
    boundary: 'clippingParents',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  };

  const DefaultType$1 = {
    offset: '(array|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element|object)',
    display: 'string',
    popperConfig: '(null|object|function)'
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

      this._addEventListeners();
    }

    // Getters

    static get Default() {
      return Default$1
    }

    static get DefaultType() {
      return DefaultType$1
    }

    static get DATA_KEY() {
      return DATA_KEY$1
    }

    // Public

    toggle() {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED)) {
        return
      }

      const isActive = this._element.classList.contains(CLASS_NAME_SHOW$1);

      Dropdown.clearMenus();

      if (isActive) {
        return
      }

      this.show();
    }

    show() {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || this._menu.classList.contains(CLASS_NAME_SHOW$1)) {
        return
      }

      const parent = Dropdown.getParentFromElement(this._element);
      const relatedTarget = {
        relatedTarget: this._element
      };

      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, relatedTarget);

      if (showEvent.defaultPrevented) {
        return
      }

      // Totally disable Popper for Dropdowns in Navbar
      if (this._inNavbar) {
        Manipulator.setDataAttribute(this._menu, 'popper', 'none');
      } else {
        if (typeof Popper__namespace === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)')
        }

        let referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (isElement(this._config.reference)) {
          referenceElement = this._config.reference;

          // Check if it's jQuery element
          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } else if (typeof this._config.reference === 'object') {
          referenceElement = this._config.reference;
        }

        const popperConfig = this._getPopperConfig();
        const isDisplayStatic = popperConfig.modifiers.find(modifier => modifier.name === 'applyStyles' && modifier.enabled === false);

        this._popper = Popper.createPopper(referenceElement, this._menu, popperConfig);

        if (isDisplayStatic) {
          Manipulator.setDataAttribute(this._menu, 'popper', 'static');
        }
      }

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement &&
        !parent.closest(SELECTOR_NAVBAR_NAV)) {
        [].concat(...document.body.children)
          .forEach(elem => EventHandler.on(elem, 'mouseover', null, noop()));
      }

      this._element.focus();
      this._element.setAttribute('aria-expanded', true);

      this._menu.classList.toggle(CLASS_NAME_SHOW$1);
      this._element.classList.toggle(CLASS_NAME_SHOW$1);
      EventHandler.trigger(this._element, EVENT_SHOWN$1, relatedTarget);
    }

    hide() {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || !this._menu.classList.contains(CLASS_NAME_SHOW$1)) {
        return
      }

      const relatedTarget = {
        relatedTarget: this._element
      };

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$1, relatedTarget);

      if (hideEvent.defaultPrevented) {
        return
      }

      if (this._popper) {
        this._popper.destroy();
      }

      this._menu.classList.toggle(CLASS_NAME_SHOW$1);
      this._element.classList.toggle(CLASS_NAME_SHOW$1);
      Manipulator.removeDataAttribute(this._menu, 'popper');
      EventHandler.trigger(this._element, EVENT_HIDDEN$1, relatedTarget);
    }

    dispose() {
      super.dispose();
      EventHandler.off(this._element, EVENT_KEY$1);
      this._menu = null;

      if (this._popper) {
        this._popper.destroy();
        this._popper = null;
      }
    }

    update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper) {
        this._popper.update();
      }
    }

    // Private

    _addEventListeners() {
      EventHandler.on(this._element, EVENT_CLICK, event => {
        event.preventDefault();
        event.stopPropagation();
        this.toggle();
      });
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
            altBoundary: this._config.flip,
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

    // Static

    static dropdownInterface(element, config) {
      let data = Data.getData(element, DATA_KEY$1);
      const _config = typeof config === 'object' ? config : null;

      if (!data) {
        data = new Dropdown(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config]();
      }
    }

    static jQueryInterface(config) {
      return this.each(function () {
        Dropdown.dropdownInterface(this, config);
      })
    }

    static clearMenus(event) {
      if (event && (event.button === RIGHT_MOUSE_BUTTON || (event.type === 'keyup' && event.key !== TAB_KEY))) {
        return
      }

      const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1);

      for (let i = 0, len = toggles.length; i < len; i++) {
        const context = Data.getData(toggles[i], DATA_KEY$1);
        const relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue
        }

        const dropdownMenu = context._menu;
        if (!toggles[i].classList.contains(CLASS_NAME_SHOW$1)) {
          continue
        }

        if (event && ((event.type === 'click' &&
            /input|textarea/i.test(event.target.tagName)) ||
            (event.type === 'keyup' && event.key === TAB_KEY)) &&
            dropdownMenu.contains(event.target)) {
          continue
        }

        const hideEvent = EventHandler.trigger(toggles[i], EVENT_HIDE$1, relatedTarget);
        if (hideEvent.defaultPrevented) {
          continue
        }

        // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support
        if ('ontouchstart' in document.documentElement) {
          [].concat(...document.body.children)
            .forEach(elem => EventHandler.off(elem, 'mouseover', null, noop()));
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        if (context._popper) {
          context._popper.destroy();
        }

        dropdownMenu.classList.remove(CLASS_NAME_SHOW$1);
        toggles[i].classList.remove(CLASS_NAME_SHOW$1);
        Manipulator.removeDataAttribute(dropdownMenu, 'popper');
        EventHandler.trigger(toggles[i], EVENT_HIDDEN$1, relatedTarget);
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

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || this.classList.contains(CLASS_NAME_DISABLED)) {
        return
      }

      const parent = Dropdown.getParentFromElement(this);
      const isActive = this.classList.contains(CLASS_NAME_SHOW$1);

      if (event.key === ESCAPE_KEY) {
        const button = this.matches(SELECTOR_DATA_TOGGLE$1) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$1)[0];
        button.focus();
        Dropdown.clearMenus();
        return
      }

      if (!isActive && (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY)) {
        const button = this.matches(SELECTOR_DATA_TOGGLE$1) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$1)[0];
        button.click();
        return
      }

      if (!isActive || event.key === SPACE_KEY) {
        Dropdown.clearMenus();
        return
      }

      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, parent).filter(isVisible);

      if (!items.length) {
        return
      }

      let index = items.indexOf(event.target);

      // Up
      if (event.key === ARROW_UP_KEY && index > 0) {
        index--;
      }

      // Down
      if (event.key === ARROW_DOWN_KEY && index < items.length - 1) {
        index++;
      }

      // index is -1 if the first keydown is an ArrowUp
      index = index === -1 ? 0 : index;

      items[index].focus();
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
    event.stopPropagation();
    Dropdown.dropdownInterface(this, 'toggle');
  });
  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_FORM_CHILD, e => e.stopPropagation());

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Dropdown to jQuery only if jQuery is present
   */

  defineJQueryPlugin(NAME$1, Dropdown);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta2): collapse.js
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
    parent: ''
  };

  const DefaultType = {
    toggle: 'boolean',
    parent: '(string|element)'
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

  const WIDTH = 'width';
  const HEIGHT = 'height';

  const SELECTOR_ACTIVES = '.show, .collapsing';
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
      this._triggerArray = SelectorEngine.find(
        `${SELECTOR_DATA_TOGGLE}[href="#${element.id}"],` +
        `${SELECTOR_DATA_TOGGLE}[data-bs-target="#${element.id}"]`
      );

      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE);

      for (let i = 0, len = toggleList.length; i < len; i++) {
        const elem = toggleList[i];
        const selector = getSelectorFromElement(elem);
        const filterElement = SelectorEngine.find(selector)
          .filter(foundElem => foundElem === element);

        if (selector !== null && filterElement.length) {
          this._selector = selector;
          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    // Getters

    static get Default() {
      return Default
    }

    static get DATA_KEY() {
      return DATA_KEY
    }

    // Public

    toggle() {
      if (this._element.classList.contains(CLASS_NAME_SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    }

    show() {
      if (this._isTransitioning || this._element.classList.contains(CLASS_NAME_SHOW)) {
        return
      }

      let actives;
      let activesData;

      if (this._parent) {
        actives = SelectorEngine.find(SELECTOR_ACTIVES, this._parent)
          .filter(elem => {
            if (typeof this._config.parent === 'string') {
              return elem.getAttribute('data-bs-parent') === this._config.parent
            }

            return elem.classList.contains(CLASS_NAME_COLLAPSE)
          });

        if (actives.length === 0) {
          actives = null;
        }
      }

      const container = SelectorEngine.findOne(this._selector);
      if (actives) {
        const tempActiveData = actives.find(elem => container !== elem);
        activesData = tempActiveData ? Data.getData(tempActiveData, DATA_KEY) : null;

        if (activesData && activesData._isTransitioning) {
          return
        }
      }

      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW);
      if (startEvent.defaultPrevented) {
        return
      }

      if (actives) {
        actives.forEach(elemActive => {
          if (container !== elemActive) {
            Collapse.collapseInterface(elemActive, 'hide');
          }

          if (!activesData) {
            Data.setData(elemActive, DATA_KEY, null);
          }
        });
      }

      const dimension = this._getDimension();

      this._element.classList.remove(CLASS_NAME_COLLAPSE);
      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        this._triggerArray.forEach(element => {
          element.classList.remove(CLASS_NAME_COLLAPSED);
          element.setAttribute('aria-expanded', true);
        });
      }

      this.setTransitioning(true);

      const complete = () => {
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

        this._element.style[dimension] = '';

        this.setTransitioning(false);

        EventHandler.trigger(this._element, EVENT_SHOWN);
      };

      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;
      const transitionDuration = getTransitionDurationFromElement(this._element);

      EventHandler.one(this._element, 'transitionend', complete);

      emulateTransitionEnd(this._element, transitionDuration);
      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }

    hide() {
      if (this._isTransitioning || !this._element.classList.contains(CLASS_NAME_SHOW)) {
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
      if (triggerArrayLength > 0) {
        for (let i = 0; i < triggerArrayLength; i++) {
          const trigger = this._triggerArray[i];
          const elem = getElementFromSelector(trigger);

          if (elem && !elem.classList.contains(CLASS_NAME_SHOW)) {
            trigger.classList.add(CLASS_NAME_COLLAPSED);
            trigger.setAttribute('aria-expanded', false);
          }
        }
      }

      this.setTransitioning(true);

      const complete = () => {
        this.setTransitioning(false);
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE);
        EventHandler.trigger(this._element, EVENT_HIDDEN);
      };

      this._element.style[dimension] = '';
      const transitionDuration = getTransitionDurationFromElement(this._element);

      EventHandler.one(this._element, 'transitionend', complete);
      emulateTransitionEnd(this._element, transitionDuration);
    }

    setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    }

    dispose() {
      super.dispose();
      this._config = null;
      this._parent = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    }

    // Private

    _getConfig(config) {
      config = {
        ...Default,
        ...config
      };
      config.toggle = Boolean(config.toggle); // Coerce string values
      typeCheckConfig(NAME, config, DefaultType);
      return config
    }

    _getDimension() {
      return this._element.classList.contains(WIDTH) ? WIDTH : HEIGHT
    }

    _getParent() {
      let { parent } = this._config;

      if (isElement(parent)) {
        // it's a jQuery object
        if (typeof parent.jquery !== 'undefined' || typeof parent[0] !== 'undefined') {
          parent = parent[0];
        }
      } else {
        parent = SelectorEngine.findOne(parent);
      }

      const selector = `${SELECTOR_DATA_TOGGLE}[data-bs-parent="${parent}"]`;

      SelectorEngine.find(selector, parent)
        .forEach(element => {
          const selected = getElementFromSelector(element);

          this._addAriaAndCollapsedClass(
            selected,
            [element]
          );
        });

      return parent
    }

    _addAriaAndCollapsedClass(element, triggerArray) {
      if (!element || !triggerArray.length) {
        return
      }

      const isOpen = element.classList.contains(CLASS_NAME_SHOW);

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

    static collapseInterface(element, config) {
      let data = Data.getData(element, DATA_KEY);
      const _config = {
        ...Default,
        ...Manipulator.getDataAttributes(element),
        ...(typeof config === 'object' && config ? config : {})
      };

      if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }

      if (!data) {
        data = new Collapse(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config]();
      }
    }

    static jQueryInterface(config) {
      return this.each(function () {
        Collapse.collapseInterface(this, config);
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

    const triggerData = Manipulator.getDataAttributes(this);
    const selector = getSelectorFromElement(this);
    const selectorElements = SelectorEngine.find(selector);

    selectorElements.forEach(element => {
      const data = Data.getData(element, DATA_KEY);
      let config;
      if (data) {
        // update parent attribute
        if (data._parent === null && typeof triggerData.parent === 'string') {
          data._config.parent = triggerData.parent;
          data._parent = data._getParent();
        }

        config = 'toggle';
      } else {
        config = triggerData;
      }

      Collapse.collapseInterface(element, config);
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Collapse to jQuery only if jQuery is present
   */

  defineJQueryPlugin(NAME, Collapse);

}(Popper));
//# sourceMappingURL=bootstrap--async-p1.js.map
