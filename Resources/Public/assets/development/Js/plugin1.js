(function (Popper) {
  'use strict';

  Popper = Popper && Object.prototype.hasOwnProperty.call(Popper, 'default') ? Popper['default'] : Popper;

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha1): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  const MAX_UID = 1000000;

  // Shoutout AngusCroll (https://goo.gl/pxwQGp)
  const toType = obj => {
    if (obj === null || obj === undefined) {
      return `${obj}`
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase()
  };

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  const getUID = prefix => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix))

    return prefix
  };

  const getSelector = element => {
    let selector = element.getAttribute('data-target');

    if (!selector || selector === '#') {
      const hrefAttr = element.getAttribute('href');

      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
    }

    return selector
  };

  const getElementFromSelector = element => {
    const selector = getSelector(element);

    return selector ? document.querySelector(selector) : null
  };

  const isElement = obj => (obj[0] || obj).nodeType;

  const typeCheckConfig = (componentName, config, configTypes) => {
    Object.keys(configTypes)
      .forEach(property => {
        const expectedTypes = configTypes[property];
        const value = config[property];
        const valueType = value && isElement(value) ?
          'element' :
          toType(value);

        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new Error(
            `${componentName.toUpperCase()}: ` +
            `Option "${property}" provided type "${valueType}" ` +
            `but expected type "${expectedTypes}".`)
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

  const getjQuery = () => {
    const { jQuery } = window;

    if (jQuery && !document.body.hasAttribute('data-no-jquery')) {
      return jQuery
    }

    return null
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha1): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
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
        if (typeof element.key === 'undefined') {
          element.key = {
            key,
            id
          };
          id++;
        }

        storeData[element.key.id] = data;
      },
      get(element, key) {
        if (!element || typeof element.key === 'undefined') {
          return null
        }

        const keyProperties = element.key;
        if (keyProperties.key === key) {
          return storeData[keyProperties.id]
        }

        return null
      },
      delete(element, key) {
        if (typeof element.key === 'undefined') {
          return
        }

        const keyProperties = element.key;
        if (keyProperties.key === key) {
          delete storeData[keyProperties.id];
          delete element.key;
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

  /* istanbul ignore file */

  let find = Element.prototype.querySelectorAll;
  let findOne = Element.prototype.querySelector;

  // MSEdge resets defaultPrevented flag upon dispatchEvent call if at least one listener is attached
  const defaultPreventedPreservedOnDispatch = (() => {
    const e = new CustomEvent('Bootstrap', {
      cancelable: true
    });

    const element = document.createElement('div');
    element.addEventListener('Bootstrap', () => null);

    e.preventDefault();
    element.dispatchEvent(e);
    return e.defaultPrevented
  })();

  const scopeSelectorRegex = /:scope\b/;
  const supportScopeQuery = (() => {
    const element = document.createElement('div');

    try {
      element.querySelectorAll(':scope *');
    } catch (_) {
      return false
    }

    return true
  })();

  if (!supportScopeQuery) {
    find = function (selector) {
      if (!scopeSelectorRegex.test(selector)) {
        return this.querySelectorAll(selector)
      }

      const hasId = Boolean(this.id);

      if (!hasId) {
        this.id = getUID('scope');
      }

      let nodeList = null;
      try {
        selector = selector.replace(scopeSelectorRegex, `#${this.id}`);
        nodeList = this.querySelectorAll(selector);
      } finally {
        if (!hasId) {
          this.removeAttribute('id');
        }
      }

      return nodeList
    };

    findOne = function (selector) {
      if (!scopeSelectorRegex.test(selector)) {
        return this.querySelector(selector)
      }

      const matches = find.call(this, selector);

      if (typeof matches[0] !== 'undefined') {
        return matches[0]
      }

      return null
    };
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha1): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const $ = getjQuery();
  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  const stripNameRegex = /\..*/;
  const stripUidRegex = /::\d+$/;
  const eventRegistry = {}; // Events storage
  let uidEvent = 1;
  const customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  const nativeEvents = [
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
  ];

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
            if (handler.oneOff) {
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

    const isNative = nativeEvents.indexOf(typeEvent) > -1;

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

    Object.keys(storeElementEvent)
      .forEach(handlerKey => {
        if (handlerKey.indexOf(namespace) > -1) {
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
      const isNamespace = originalTypeEvent.charAt(0) === '.';

      if (typeof originalHandler !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!events || !events[typeEvent]) {
          return
        }

        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
        return
      }

      if (isNamespace) {
        Object.keys(events)
          .forEach(elementEvent => {
            removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
          });
      }

      const storeElementEvent = events[typeEvent] || {};
      Object.keys(storeElementEvent)
        .forEach(keyHandlers => {
          const handlerKey = keyHandlers.replace(stripUidRegex, '');

          if (!inNamespace || originalTypeEvent.indexOf(handlerKey) > -1) {
            const event = storeElementEvent[keyHandlers];

            removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
          }
        });
    },

    trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null
      }

      const typeEvent = event.replace(stripNameRegex, '');
      const inNamespace = event !== typeEvent;
      const isNative = nativeEvents.indexOf(typeEvent) > -1;

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

      // merge custom informations in our event
      if (typeof args !== 'undefined') {
        Object.keys(args)
          .forEach(key => {
            Object.defineProperty(evt, key, {
              get() {
                return args[key]
              }
            });
          });
      }

      if (defaultPrevented) {
        evt.preventDefault();

        if (!defaultPreventedPreservedOnDispatch) {
          Object.defineProperty(evt, 'defaultPrevented', {
            get: () => true
          });
        }
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
   * Bootstrap (v5.0.0-alpha1): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
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
      element.setAttribute(`data-${normalizeDataKey(key)}`, value);
    },

    removeDataAttribute(element, key) {
      element.removeAttribute(`data-${normalizeDataKey(key)}`);
    },

    getDataAttributes(element) {
      if (!element) {
        return {}
      }

      const attributes = {
        ...element.dataset
      };

      Object.keys(attributes).forEach(key => {
        attributes[key] = normalizeData(attributes[key]);
      });

      return attributes
    },

    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-${normalizeDataKey(key)}`))
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
    },

    toggleClass(element, className) {
      if (!element) {
        return
      }

      if (element.classList.contains(className)) {
        element.classList.remove(className);
      } else {
        element.classList.add(className);
      }
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha1): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NODE_TEXT = 3;

  const SelectorEngine = {
    matches(element, selector) {
      return element.matches(selector)
    },

    find(selector, element = document.documentElement) {
      return [].concat(...find.call(element, selector))
    },

    findOne(selector, element = document.documentElement) {
      return findOne.call(element, selector)
    },

    children(element, selector) {
      const children = [].concat(...element.children);

      return children.filter(child => child.matches(selector))
    },

    parents(element, selector) {
      const parents = [];

      let ancestor = element.parentNode;

      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (this.matches(ancestor, selector)) {
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
        if (this.matches(next, selector)) {
          return [next]
        }

        next = next.nextElementSibling;
      }

      return []
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha1): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME = 'dropdown';
  const VERSION = '5.0.0-alpha1';
  const DATA_KEY = 'bs.dropdown';
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';

  const ESCAPE_KEY = 'Escape';
  const SPACE_KEY = 'Space';
  const TAB_KEY = 'Tab';
  const ARROW_UP_KEY = 'ArrowUp';
  const ARROW_DOWN_KEY = 'ArrowDown';
  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY}`);

  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const EVENT_CLICK = `click${EVENT_KEY}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`;
  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;

  const CLASS_NAME_DISABLED = 'disabled';
  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_DROPUP = 'dropup';
  const CLASS_NAME_DROPRIGHT = 'dropright';
  const CLASS_NAME_DROPLEFT = 'dropleft';
  const CLASS_NAME_MENURIGHT = 'dropdown-menu-right';
  const CLASS_NAME_NAVBAR = 'navbar';
  const CLASS_NAME_POSITION_STATIC = 'position-static';

  const SELECTOR_DATA_TOGGLE = '[data-toggle="dropdown"]';
  const SELECTOR_FORM_CHILD = '.dropdown form';
  const SELECTOR_MENU = '.dropdown-menu';
  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';

  const PLACEMENT_TOP = 'top-start';
  const PLACEMENT_TOPEND = 'top-end';
  const PLACEMENT_BOTTOM = 'bottom-start';
  const PLACEMENT_BOTTOMEND = 'bottom-end';
  const PLACEMENT_RIGHT = 'right-start';
  const PLACEMENT_LEFT = 'left-start';

  const Default = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  };

  const DefaultType = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Dropdown {
    constructor(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
      Data.setData(element, DATA_KEY, this);
    }

    // Getters

    static get VERSION() {
      return VERSION
    }

    static get Default() {
      return Default
    }

    static get DefaultType() {
      return DefaultType
    }

    // Public

    toggle() {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED)) {
        return
      }

      const isActive = this._element.classList.contains(CLASS_NAME_SHOW);

      Dropdown.clearMenus();

      if (isActive) {
        return
      }

      this.show();
    }

    show() {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || this._menu.classList.contains(CLASS_NAME_SHOW)) {
        return
      }

      const parent = Dropdown.getParentFromElement(this._element);
      const relatedTarget = {
        relatedTarget: this._element
      };

      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW, relatedTarget);

      if (showEvent.defaultPrevented) {
        return
      }

      // Disable totally Popper.js for Dropdown in Navbar
      if (!this._inNavbar) {
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org)')
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
        }

        // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251
        if (this._config.boundary !== 'scrollParent') {
          parent.classList.add(CLASS_NAME_POSITION_STATIC);
        }

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
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

      Manipulator.toggleClass(this._menu, CLASS_NAME_SHOW);
      Manipulator.toggleClass(this._element, CLASS_NAME_SHOW);
      EventHandler.trigger(parent, EVENT_SHOWN, relatedTarget);
    }

    hide() {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || !this._menu.classList.contains(CLASS_NAME_SHOW)) {
        return
      }

      const parent = Dropdown.getParentFromElement(this._element);
      const relatedTarget = {
        relatedTarget: this._element
      };

      const hideEvent = EventHandler.trigger(parent, EVENT_HIDE, relatedTarget);

      if (hideEvent.defaultPrevented) {
        return
      }

      if (this._popper) {
        this._popper.destroy();
      }

      Manipulator.toggleClass(this._menu, CLASS_NAME_SHOW);
      Manipulator.toggleClass(this._element, CLASS_NAME_SHOW);
      EventHandler.trigger(parent, EVENT_HIDDEN, relatedTarget);
    }

    dispose() {
      Data.removeData(this._element, DATA_KEY);
      EventHandler.off(this._element, EVENT_KEY);
      this._element = null;
      this._menu = null;
      if (this._popper) {
        this._popper.destroy();
        this._popper = null;
      }
    }

    update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper) {
        this._popper.scheduleUpdate();
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

      typeCheckConfig(
        NAME,
        config,
        this.constructor.DefaultType
      );

      return config
    }

    _getMenuElement() {
      return SelectorEngine.next(this._element, SELECTOR_MENU)[0]
    }

    _getPlacement() {
      const parentDropdown = this._element.parentNode;
      let placement = PLACEMENT_BOTTOM;

      // Handle dropup
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        placement = PLACEMENT_TOP;
        if (this._menu.classList.contains(CLASS_NAME_MENURIGHT)) {
          placement = PLACEMENT_TOPEND;
        }
      } else if (parentDropdown.classList.contains(CLASS_NAME_DROPRIGHT)) {
        placement = PLACEMENT_RIGHT;
      } else if (parentDropdown.classList.contains(CLASS_NAME_DROPLEFT)) {
        placement = PLACEMENT_LEFT;
      } else if (this._menu.classList.contains(CLASS_NAME_MENURIGHT)) {
        placement = PLACEMENT_BOTTOMEND;
      }

      return placement
    }

    _detectNavbar() {
      return Boolean(this._element.closest(`.${CLASS_NAME_NAVBAR}`))
    }

    _getOffset() {
      const offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = data => {
          data.offsets = {
            ...data.offsets,
            ...this._config.offset(data.offsets, this._element) || {}
          };

          return data
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset
    }

    _getPopperConfig() {
      const popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      };

      // Disable Popper.js if we have a static display
      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return {
        ...popperConfig,
        ...this._config.popperConfig
      }
    }

    // Static

    static dropdownInterface(element, config) {
      let data = Data.getData(element, DATA_KEY);
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
      if (event && (event.button === RIGHT_MOUSE_BUTTON ||
        (event.type === 'keyup' && event.key !== TAB_KEY))) {
        return
      }

      const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE);

      for (let i = 0, len = toggles.length; i < len; i++) {
        const parent = Dropdown.getParentFromElement(toggles[i]);
        const context = Data.getData(toggles[i], DATA_KEY);
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
        if (!toggles[i].classList.contains(CLASS_NAME_SHOW)) {
          continue
        }

        if (event && ((event.type === 'click' &&
            /input|textarea/i.test(event.target.tagName)) ||
            (event.type === 'keyup' && event.key === TAB_KEY)) &&
            dropdownMenu.contains(event.target)) {
          continue
        }

        const hideEvent = EventHandler.trigger(parent, EVENT_HIDE, relatedTarget);
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

        dropdownMenu.classList.remove(CLASS_NAME_SHOW);
        toggles[i].classList.remove(CLASS_NAME_SHOW);
        EventHandler.trigger(parent, EVENT_HIDDEN, relatedTarget);
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
      const isActive = this.classList.contains(CLASS_NAME_SHOW);

      if (event.key === ESCAPE_KEY) {
        const button = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE)[0];
        button.focus();
        Dropdown.clearMenus();
        return
      }

      if (!isActive || event.key === SPACE_KEY) {
        Dropdown.clearMenus();
        return
      }

      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, parent)
        .filter(isVisible);

      if (!items.length) {
        return
      }

      let index = items.indexOf(event.target);

      if (event.key === ARROW_UP_KEY && index > 0) { // Up
        index--;
      }

      if (event.key === ARROW_DOWN_KEY && index < items.length - 1) { // Down
        index++;
      }

      // index is -1 if the first keydown is an ArrowUp
      index = index === -1 ? 0 : index;

      items[index].focus();
    }

    static getInstance(element) {
      return Data.getData(element, DATA_KEY)
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();
    Dropdown.dropdownInterface(this, 'toggle');
  });
  EventHandler
    .on(document, EVENT_CLICK_DATA_API, SELECTOR_FORM_CHILD, e => e.stopPropagation());

  const $$1 = getjQuery();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .dropdown to jQuery only if jQuery is present
   */
  /* istanbul ignore if */
  if ($$1) {
    const JQUERY_NO_CONFLICT = $$1.fn[NAME];
    $$1.fn[NAME] = Dropdown.jQueryInterface;
    $$1.fn[NAME].Constructor = Dropdown;
    $$1.fn[NAME].noConflict = () => {
      $$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown.jQueryInterface
    };
  }

  // import Popper from '../../node_modules/popper.js/dist/popper.js'

  console.log('fff');

}(Popper));
//# sourceMappingURL=plugin1.js.map
