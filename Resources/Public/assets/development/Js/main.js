(function () {
  'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha1): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;
  const TRANSITION_END = 'transitionend';

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
    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);

    const floatTransitionDuration = parseFloat(transitionDuration);
    const floatTransitionDelay = parseFloat(transitionDelay);

    // Return 0 if element or transition duration is not found
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0
    }

    // If multiple durations are defined, take the first
    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];

    return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER
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

  const reflow = element => element.offsetHeight;

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
   * Bootstrap (v5.0.0-alpha1): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME = 'collapse';
  const VERSION = '5.0.0-alpha1';
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
  const SELECTOR_DATA_TOGGLE = '[data-toggle="collapse"]';

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Collapse {
    constructor(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = SelectorEngine.find(
        `${SELECTOR_DATA_TOGGLE}[href="#${element.id}"],` +
        `${SELECTOR_DATA_TOGGLE}[data-target="#${element.id}"]`
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

      Data.setData(element, DATA_KEY, this);
    }

    // Getters

    static get VERSION() {
      return VERSION
    }

    static get Default() {
      return Default
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
      if (this._isTransitioning ||
        this._element.classList.contains(CLASS_NAME_SHOW)) {
        return
      }

      let actives;
      let activesData;

      if (this._parent) {
        actives = SelectorEngine.find(SELECTOR_ACTIVES, this._parent)
          .filter(elem => {
            if (typeof this._config.parent === 'string') {
              return elem.getAttribute('data-parent') === this._config.parent
            }

            return elem.classList.contains(CLASS_NAME_COLLAPSE)
          });

        if (actives.length === 0) {
          actives = null;
        }
      }

      const container = SelectorEngine.findOne(this._selector);
      if (actives) {
        const tempActiveData = actives.filter(elem => container !== elem);
        activesData = tempActiveData[0] ? Data.getData(tempActiveData[0], DATA_KEY) : null;

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

      EventHandler.one(this._element, TRANSITION_END, complete);

      emulateTransitionEnd(this._element, transitionDuration);
      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }

    hide() {
      if (this._isTransitioning ||
        !this._element.classList.contains(CLASS_NAME_SHOW)) {
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

      EventHandler.one(this._element, TRANSITION_END, complete);
      emulateTransitionEnd(this._element, transitionDuration);
    }

    setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    }

    dispose() {
      Data.removeData(this._element, DATA_KEY);

      this._config = null;
      this._parent = null;
      this._element = null;
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
      const hasWidth = this._element.classList.contains(WIDTH);
      return hasWidth ? WIDTH : HEIGHT
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

      const selector = `${SELECTOR_DATA_TOGGLE}[data-parent="${parent}"]`;

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
      if (element) {
        const isOpen = element.classList.contains(CLASS_NAME_SHOW);

        if (triggerArray.length) {
          triggerArray.forEach(elem => {
            if (isOpen) {
              elem.classList.remove(CLASS_NAME_COLLAPSED);
            } else {
              elem.classList.add(CLASS_NAME_COLLAPSED);
            }

            elem.setAttribute('aria-expanded', isOpen);
          });
        }
      }
    }

    // Static

    static collapseInterface(element, config) {
      let data = Data.getData(element, DATA_KEY);
      const _config = {
        ...Default,
        ...Manipulator.getDataAttributes(element),
        ...typeof config === 'object' && config ? config : {}
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

    static getInstance(element) {
      return Data.getData(element, DATA_KEY)
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A') {
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

  const $$1 = getjQuery();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .collapse to jQuery only if jQuery is present
   */
  /* istanbul ignore if */
  if ($$1) {
    const JQUERY_NO_CONFLICT = $$1.fn[NAME];
    $$1.fn[NAME] = Collapse.jQueryInterface;
    $$1.fn[NAME].Constructor = Collapse;
    $$1.fn[NAME].noConflict = () => {
      $$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse.jQueryInterface
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$1 = 'dropdown';
  const VERSION$1 = '5.0.0-alpha1';
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
  const CLASS_NAME_DROPRIGHT = 'dropright';
  const CLASS_NAME_DROPLEFT = 'dropleft';
  const CLASS_NAME_MENURIGHT = 'dropdown-menu-right';
  const CLASS_NAME_NAVBAR = 'navbar';

  const SELECTOR_DATA_TOGGLE$1 = '[data-toggle="dropdown"]';
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

  const Default$1 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic'
  };

  const DefaultType$1 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Dropdown {
    constructor(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
      Data.setData(element, DATA_KEY$1, this);
    }

    // Getters

    static get VERSION() {
      return VERSION$1
    }

    static get Default() {
      return Default$1
    }

    static get DefaultType() {
      return DefaultType$1
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

      // // Disable totally Popper.js for Dropdown in Navbar
      // if (!this._inNavbar) {
      //   if (typeof Popper === 'undefined') {
      //     throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org)')
      //   }

      //   let referenceElement = this._element

      //   if (this._config.reference === 'parent') {
      //     referenceElement = parent
      //   } else if (isElement(this._config.reference)) {
      //     referenceElement = this._config.reference

      //     // Check if it's jQuery element
      //     if (typeof this._config.reference.jquery !== 'undefined') {
      //       referenceElement = this._config.reference[0]
      //     }
      //   }

      //   // If boundary is not `scrollParent`, then set position to `static`
      //   // to allow the menu to "escape" the scroll parent's boundaries
      //   // https://github.com/twbs/bootstrap/issues/24251
      //   if (this._config.boundary !== 'scrollParent') {
      //     parent.classList.add(CLASS_NAME_POSITION_STATIC)
      //   }

      //   this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig())
      // }

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

      Manipulator.toggleClass(this._menu, CLASS_NAME_SHOW$1);
      Manipulator.toggleClass(this._element, CLASS_NAME_SHOW$1);
      EventHandler.trigger(parent, EVENT_SHOWN$1, relatedTarget);
    }

    hide() {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || !this._menu.classList.contains(CLASS_NAME_SHOW$1)) {
        return
      }

      const parent = Dropdown.getParentFromElement(this._element);
      const relatedTarget = {
        relatedTarget: this._element
      };

      const hideEvent = EventHandler.trigger(parent, EVENT_HIDE$1, relatedTarget);

      if (hideEvent.defaultPrevented) {
        return
      }

      // if (this._popper) {
      //   this._popper.destroy()
      // }

      Manipulator.toggleClass(this._menu, CLASS_NAME_SHOW$1);
      Manipulator.toggleClass(this._element, CLASS_NAME_SHOW$1);
      EventHandler.trigger(parent, EVENT_HIDDEN$1, relatedTarget);
    }

    dispose() {
      Data.removeData(this._element, DATA_KEY$1);
      EventHandler.off(this._element, EVENT_KEY$1);
      this._element = null;
      this._menu = null;
      // if (this._popper) {
      //   this._popper.destroy()
      //   this._popper = null
      // }
    }

    update() {
      this._inNavbar = this._detectNavbar();
      // if (this._popper) {
      //   this._popper.scheduleUpdate()
      // }
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
        NAME$1,
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

    // _getPopperConfig() {
    //   const popperConfig = {
    //     placement: this._getPlacement(),
    //     modifiers: {
    //       offset: this._getOffset(),
    //       flip: {
    //         enabled: this._config.flip
    //       },
    //       preventOverflow: {
    //         boundariesElement: this._config.boundary
    //       }
    //     }
    //   }

    //   // Disable Popper.js if we have a static display
    //   if (this._config.display === 'static') {
    //     popperConfig.modifiers.applyStyle = {
    //       enabled: false
    //     }
    //   }

    //   return {
    //     ...popperConfig,
    //     ...this._config.popperConfig
    //   }
    // }

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
      if (event && (event.button === RIGHT_MOUSE_BUTTON ||
        (event.type === 'keyup' && event.key !== TAB_KEY))) {
        return
      }

      const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1);

      for (let i = 0, len = toggles.length; i < len; i++) {
        const parent = Dropdown.getParentFromElement(toggles[i]);
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

        const hideEvent = EventHandler.trigger(parent, EVENT_HIDE$1, relatedTarget);
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

        // if (context._popper) {
        //   context._popper.destroy()
        // }

        dropdownMenu.classList.remove(CLASS_NAME_SHOW$1);
        toggles[i].classList.remove(CLASS_NAME_SHOW$1);
        EventHandler.trigger(parent, EVENT_HIDDEN$1, relatedTarget);
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
      return Data.getData(element, DATA_KEY$1)
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
  EventHandler
    .on(document, EVENT_CLICK_DATA_API$1, SELECTOR_FORM_CHILD, e => e.stopPropagation());

  /*!
  	By André Rinas, www.andrerinas.de
  	Documentation, www.simplelightbox.de
  	Available for use under the MIT License
  	Version 2.2.1
  */
  class SimpleLightbox {

      defaultOptions = {
          sourceAttr: 'href',
          overlay: true,
          spinner: true,
          nav: true,
          navText: ['&lsaquo;', '&rsaquo;'],
          captions: true,
          captionDelay: 0,
          captionSelector: 'img',
          captionType: 'attr',
          captionsData: 'title',
          captionPosition: 'bottom',
          captionClass: '',
          close: true,
          closeText: '&times;',
          swipeClose: true,
          showCounter: true,
          fileExt: 'png|jpg|jpeg|gif|webp',
          animationSlide: true,
          animationSpeed: 250,
          preloading: true,
          enableKeyboard: true,
          loop: true,
          rel: false,
          docClose: true,
          swipeTolerance: 50,
          className: 'simple-lightbox',
          widthRatio: 0.8,
          heightRatio: 0.9,
          scaleImageToRatio: false,
          disableRightClick: false,
          disableScroll: true,
          alertError: true,
          alertErrorMessage: 'Image not found, next image will be loaded',
          additionalHtml: false,
          history: true,
          throttleInterval: 0,
          doubleTapZoom: 2,
          maxZoom: 10,
          htmlClass: 'has-lightbox',
          rtl: false
      };

      transitionPrefix;
      transitionCapable = false;

      isTouchDevice = ('ontouchstart' in window);


      initialLocationHash;

      pushStateSupport = ('pushState' in history);

      isOpen = false;
      isAnimating = false;
      isClosing = false;
      urlChangedOnce = false;
      hashReseted = false;
      historyHasChanges = false;
      historyUpdateTimeout = null;

      currentImage;
      eventNamespace = 'simplelightbox';
      domNodes = {};

      loadedImages = [];
      initialImageIndex = 0;
      currentImageIndex = 0;

      initialSelector = null;
      globalScrollbarWidth = 0;

      controlCoordinates = {
          swipeDiff: 0,
          swipeYDiff: 0,
          swipeStart: 0,
          swipeEnd: 0,
          swipeYStart: 0,
          swipeYEnd: 0,
          mousedown: false,
          imageLeft: 0,
          zoomed: false,
          containerHeight: 0,
          containerWidth: 0,
          containerOffsetX: 0,
          containerOffsetY: 0,
          imgHeight: 0,
          imgWidth: 0,
          capture: false,
          initialOffsetX: 0,
          initialOffsetY: 0,
          initialPointerOffsetX: 0,
          initialPointerOffsetY: 0,
          initialPointerOffsetX2: 0,
          initialPointerOffsetY2: 0,
          initialScale: 1,
          initialPinchDistance: 0,
          pointerOffsetX: 0,
          pointerOffsetY: 0,
          pointerOffsetX2: 0,
          pointerOffsetY2: 0,
          targetOffsetX: 0,
          targetOffsetY: 0,
          targetScale: 0,
          pinchOffsetX: 0,
          pinchOffsetY: 0,
          limitOffsetX: 0,
          limitOffsetY: 0,
          scaleDifference: 0,
          targetPinchDistance: 0,
          touchCount: 0,
          doubleTapped: false,
          touchmoveCount: 0
      };

      constructor(elements, options) {

          this.options = Object.assign(this.defaultOptions, options);

          if (typeof elements === 'string') {
              this.initialSelector = elements;
              this.elements = Array.from(document.querySelectorAll(elements));
          } else {
              this.elements = ((typeof elements.length !== 'undefined') && elements.length > 0) ? Array.from(elements) : [elements];
          }

          this.relatedElements = [];

          this.transitionPrefix = this.calculateTransitionPrefix();
          this.transitionCapable = this.transitionPrefix !== false;
          this.initialLocationHash = this.hash;

          // this should be handled by attribute selector IMHO! => 'a[rel=bla]'...
          if (this.options.rel) {
              this.elements = this.getRelated(this.options.rel);
          }

          this.createDomNodes();

          if (this.options.close) {
              this.domNodes.wrapper.appendChild(this.domNodes.closeButton);
          }

          if (this.options.nav) {
              this.domNodes.wrapper.appendChild(this.domNodes.navigation);
          }

          if (this.options.spinner) {
              this.domNodes.wrapper.appendChild(this.domNodes.spinner);
          }

          this.addEventListener(this.elements, 'click.' + this.eventNamespace, (event) => {

              if (this.isValidLink(event.currentTarget)) {
                  event.preventDefault();
                  if (this.isAnimating) {
                      return false;
                  }

                  this.initialImageIndex = this.elements.indexOf(event.currentTarget);
                  this.openImage(event.currentTarget);
              }
          });

          // close addEventListener click addEventListener doc
          if (this.options.docClose) {
              this.addEventListener(this.domNodes.overlay, ['click.' + this.eventNamespace, 'touchstart.' + this.eventNamespace], (event) => {
                  if (this.isOpen) {
                      this.close();
                  }
              });
          }

          // disable rightclick
          if (this.options.disableRightClick) {
              this.addEventListener(document.body, 'contextmenu.' + this.eventNamespace, (event) => {
                  if (event.target.classList.contains('sl-overlay')) {
                      event.preventDefault();
                  }
              });
          }

          // keyboard-control
          if (this.options.enableKeyboard) {
              this.addEventListener(document.body, 'keyup.' + this.eventNamespace, this.throttle((event) => {
                  this.controlCoordinates.swipeDiff = 0;
                  // keyboard control only if lightbox is open

                  if (this.isAnimating && event.key === 'Escape') {
                      this.currentImage.setAttribute('src', '');
                      this.isAnimating = false;
                      return this.close();
                  }

                  if (this.isOpen) {
                      event.preventDefault();
                      if (event.key === 'Escape') {
                          this.close();
                      }
                      if(!this.isAnimating && ['ArrowLeft', 'ArrowRight'].indexOf(event.key) > -1) {
                        this.loadImage(event.key === 'ArrowRight' ? 1 : -1);
                      }
                  }
              }, this.options.throttleInterval));
          }

          this.addEvents();
      }

      createDomNodes() {
          this.domNodes.overlay = document.createElement('div');
          this.domNodes.overlay.classList.add('sl-overlay');
          this.domNodes.overlay.dataset.opacityTarget = ".7";

          this.domNodes.closeButton = document.createElement('button');
          this.domNodes.closeButton.classList.add('sl-close');
          this.domNodes.closeButton.innerHTML = this.options.closeText;

          this.domNodes.spinner = document.createElement('div');
          this.domNodes.spinner.classList.add('sl-spinner');
          this.domNodes.spinner.innerHTML = '<div></div>';

          this.domNodes.navigation = document.createElement('div');
          this.domNodes.navigation.classList.add('sl-navigation');
          this.domNodes.navigation.innerHTML = `<button class="sl-prev">${this.options.navText[0]}</button><button class="sl-next">${this.options.navText[1]}</button>`;

          this.domNodes.counter = document.createElement('div');
          this.domNodes.counter.classList.add('sl-counter');
          this.domNodes.counter.innerHTML = '<span class="sl-current"></span>/<span class="sl-total"></span>';

          this.domNodes.caption = document.createElement('div');
          this.domNodes.caption.classList.add('sl-caption', 'pos-' + this.options.captionPosition);
          if (this.options.captionClass) {
              this.domNodes.caption.classList.add(this.options.captionClass);
          }

          this.domNodes.image = document.createElement('div');
          this.domNodes.image.classList.add('sl-image');

          this.domNodes.wrapper = document.createElement('div');
          this.domNodes.wrapper.classList.add('sl-wrapper');
          if (this.options.className) {
              this.domNodes.wrapper.classList.add(this.options.className);
          }
          if(this.options.rtl) {
              this.domNodes.wrapper.classList.add('sl-dir-rtl');
          }
      }

      throttle(func, limit) {
          let inThrottle;
          return function () {
              if (!inThrottle) {
                  func.apply(this, arguments);
                  inThrottle = true;
                  setTimeout(function () {
                      return inThrottle = false;
                  }, limit);
              }
          };
      }

      isValidLink(element) {
          return (!this.options.fileExt) || ('pathname' in element && (new RegExp('(' + this.options.fileExt + ')$', 'i')).test(element.pathname));
      }

      calculateTransitionPrefix() {
          let s = (document.body || document.documentElement).style;

          return 'transition' in s ? '' :
              'WebkitTransition' in s ? '-webkit-' :
                  'MozTransition' in s ? '-moz-' :
                      'OTransition' in s ? '-o' :
                          false;
      }

      toggleScrollbar(type) {
          let scrollbarWidth = 0;
          if (type === 'hide') {
              let fullWindowWidth = window.innerWidth;
              if (!fullWindowWidth) {
                  let documentElementRect = document.documentElement.getBoundingClientRect();
                  fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
              }
              if (document.body.clientWidth < fullWindowWidth) {
                  let scrollDiv = document.createElement('div'),
                      paddingRight = parseInt(document.body.style.paddingRight || 0, 10);

                  scrollDiv.classList.add('sl-scrollbar-measure');

                  document.body.appendChild(scrollDiv);
                  scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                  document.body.removeChild(scrollDiv);

                  document.body.dataset.originalPaddingRight = paddingRight;
                  if (scrollbarWidth > 0) {
                      document.body.classList.add('hidden-scroll');
                      document.body.style.paddingRight = (paddingRight + scrollbarWidth) + 'px';
                  }
              }
          } else {
              document.body.classList.remove('hidden-scroll');
              document.body.style.paddingRight = document.body.dataset.originalPaddingRight;
          }
          return scrollbarWidth;
      }

      close() {
          if (!this.isOpen || this.isAnimating || this.isClosing) {
              return false;
          }

          this.isClosing = true;
          let element = this.relatedElements[this.currentImageIndex];
          element.dispatchEvent(new Event('close.simplelightbox'));

          if (this.options.history) {
              this.historyHasChanges = false;
              if(!this.hashReseted) {
                  this.resetHash();
              }
          }

          this.fadeOut(document.querySelectorAll('.sl-image img, .sl-overlay, .sl-close, .sl-navigation, .sl-image .sl-caption, .sl-counter'), 300, () => {
              if (this.options.disableScroll) {
                  this.toggleScrollbar('show');
              }

              if (this.options.htmlClass && this.options.htmlClass !== '') {
                  document.querySelector('html').classList.remove(this.options.htmlClass);
              }

              document.body.removeChild(this.domNodes.wrapper);
              document.body.removeChild(this.domNodes.overlay);
              this.domNodes.additionalHtml = null;

              element.dispatchEvent(new Event('closed.simplelightbox'));

              this.isClosing = false;
          });

          this.currentImage = null;
          this.isOpen = false;
          this.isAnimating = false;

          // reset touchcontrol coordinates
          for (let key in this.controlCoordinates) {
              this.controlCoordinates[key] = 0;
          }
          this.controlCoordinates.mousedown = false;
          this.controlCoordinates.zoomed = false;
          this.controlCoordinates.capture = false;
          this.controlCoordinates.initialScale = this.minMax(1, 1, this.options.maxZoom);
          this.controlCoordinates.doubleTapped = false;
      }

      get hash() {
          return window.location.hash.substring(1);
      }

      preload() {
          let index = this.currentImageIndex,
              length = this.relatedElements.length,
              next = (index + 1 < 0) ? length - 1 : (index + 1 >= length - 1) ? 0 : index + 1,
              prev = (index - 1 < 0) ? length - 1 : (index - 1 >= length - 1) ? 0 : index - 1,
              nextImage = new Image(),
              prevImage = new Image();

          nextImage.addEventListener('load', (event) => {
              let src = event.target.getAttribute('src');
              if (this.loadedImages.indexOf(src) === -1) { //is this condition even required... setting multiple times will not change usage...
                  this.loadedImages.push(src);
              }
              this.relatedElements[index].dispatchEvent(new Event('nextImageLoaded.' + this.eventNamespace));
          });
          nextImage.setAttribute('src', this.relatedElements[next].getAttribute(this.options.sourceAttr));

          prevImage.addEventListener('load', (event) => {
              let src = event.target.getAttribute('src');
              if (this.loadedImages.indexOf(src) === -1) {
                  this.loadedImages.push(src);
              }
              this.relatedElements[index].dispatchEvent(new Event('prevImageLoaded.' + this.eventNamespace));
          });
          prevImage.setAttribute('src', this.relatedElements[prev].getAttribute(this.options.sourceAttr));
      }

      loadImage(direction) {
          let slideDirection = direction;
          if(this.options.rtl) {
              direction = -direction;
          }

          this.relatedElements[this.currentImageIndex].dispatchEvent(new Event('change.' + this.eventNamespace));
          this.relatedElements[this.currentImageIndex].dispatchEvent(new Event((direction === 1 ? 'next' : 'prev') + '.' + this.eventNamespace));

          let newIndex = this.currentImageIndex + direction;

          if (this.isAnimating || (newIndex < 0 || newIndex >= this.relatedElements.length) && this.options.loop === false) {
              return false;
          }

          this.currentImageIndex = (newIndex < 0) ? this.relatedElements.length - 1 : (newIndex > this.relatedElements.length - 1) ? 0 : newIndex;

          this.domNodes.counter.querySelector('.sl-current').innerHTML = this.currentImageIndex + 1;


          if (this.options.animationSlide) {
              this.slide(this.options.animationSpeed / 1000, (-100 * slideDirection) - this.controlCoordinates.swipeDiff + 'px');
          }

          this.fadeOut(this.domNodes.image, 300, () => {
            this.isAnimating = true;
              setTimeout(() => {
                  let element = this.relatedElements[this.currentImageIndex];
                  this.currentImage.setAttribute('src', element.getAttribute(this.options.sourceAttr));

                  if (this.loadedImages.indexOf(element.getAttribute(this.options.sourceAttr)) === -1) {
                      this.show(this.domNodes.spinner);
                  }

                  if(this.domNodes.image.contains(this.domNodes.caption)) {
                    this.domNodes.image.removeChild(this.domNodes.caption);
                  }

                  this.adjustImage(slideDirection);
                  if (this.options.preloading) this.preload();
              }, 100);
          });
      }

      adjustImage(direction) {
          if (!this.currentImage) {
              return false;
          }

          let tmpImage = new Image(),
              windowWidth = window.innerWidth * this.options.widthRatio,
              windowHeight = window.innerHeight * this.options.heightRatio;

          tmpImage.setAttribute('src', this.currentImage.getAttribute('src'));

          this.currentImage.dataset.scale = 1;
          this.currentImage.dataset.translateX = 0;
          this.currentImage.dataset.translateY = 0;
          this.zoomPanElement(0, 0, 1);

          tmpImage.addEventListener('error', (event) => {
              this.relatedElements[this.currentImageIndex].dispatchEvent(new Event('error.' + this.eventNamespace));
              this.isAnimating = false;
              this.isOpen = false;
              this.domNodes.spinner.style.display = 'none';

              let dirIsDefined = direction === 1 || direction === -1;
              if (this.initialImageIndex === this.currentImageIndex && dirIsDefined) {
                  return this.close();
              }

              if (this.options.alertError) {
                  alert(this.options.alertErrorMessage);
              }

              this.loadImage(dirIsDefined ? direction : 1);
          });


          tmpImage.addEventListener('load', (event) => {
              if (typeof direction !== 'undefined') {
                  this.relatedElements[this.currentImageIndex].dispatchEvent(new Event('changed.' + this.eventNamespace));
                  this.relatedElements[this.currentImageIndex].dispatchEvent(new Event((direction === 1 ? 'nextDone' : 'prevDone') + '.' + this.eventNamespace));
              }

              // history
              if (this.options.history) {
                  this.updateURL();
              }

              if (this.loadedImages.indexOf(this.currentImage.getAttribute('src')) === -1) {
                  this.loadedImages.push(this.currentImage.getAttribute('src'));
              }

              let imageWidth = event.target.width,
                  imageHeight = event.target.height;

              if (this.options.scaleImageToRatio || imageWidth > windowWidth || imageHeight > windowHeight) {
                  let ratio = imageWidth / imageHeight > windowWidth / windowHeight ? imageWidth / windowWidth : imageHeight / windowHeight;
                  imageWidth /= ratio;
                  imageHeight /= ratio;
              }

              this.domNodes.image.style.top = (window.innerHeight - imageHeight) / 2 + 'px';
              this.domNodes.image.style.left = (window.innerWidth - imageWidth - this.globalScrollbarWidth) / 2 + 'px';
              this.domNodes.image.style.width = imageWidth + 'px';
              this.domNodes.image.style.height = imageHeight + 'px';

              this.domNodes.spinner.style.display = 'none';

              this.fadeIn(this.currentImage, 300);

              this.isOpen = true;

              let captionContainer = this.options.captionSelector === 'self' ? this.relatedElements[this.currentImageIndex] : this.relatedElements[this.currentImageIndex].querySelector(this.options.captionSelector),
                  captionText;
              if(this.options.captions && captionContainer) {
                  if (this.options.captionType === 'data') {
                      captionText = captionContainer.dataset[this.options.captionsData];
                  } else if (this.options.captionType === 'text') {
                      captionText = captionContainer.innerHTML;
                  } else {
                      captionText = captionContainer.getAttribute(this.options.captionsData);
                  }
              }

              if (!this.options.loop) {
                  if (this.currentImageIndex === 0) {
                      this.hide(this.domNodes.navigation.querySelector('.sl-prev'));
                  }
                  if (this.currentImageIndex >= this.relatedElements.length - 1) {
                      this.hide(this.domNodes.navigation.querySelector('.sl-next'));
                  }
                  if (this.currentImageIndex > 0) {
                      this.show(this.domNodes.navigation.querySelector('.sl-prev'));
                  }
                  if (this.currentImageIndex < this.relatedElements.length - 1) {
                      this.show(this.domNodes.navigation.querySelector('.sl-next'));
                  }
              }

              if (this.relatedElements.length === 1) {
                  this.hide(this.domNodes.navigation.querySelectorAll('.sl-prev, .sl-next'));
              } else {
                  this.show(this.domNodes.navigation.querySelectorAll('.sl-prev, .sl-next'));
              }

              if (direction === 1 || direction === -1) {
                  if (this.options.animationSlide) {
                      this.slide(0, 100 * direction + 'px');
                      setTimeout(() => {
                          this.slide(this.options.animationSpeed / 1000, 0 + 'px');
                      }, 50);
                  }
                  this.fadeIn(this.domNodes.image, 300, () => {
                      this.isAnimating = false;
                      this.setCaption(captionText, imageWidth);
                  });

              } else {
                  this.isAnimating = false;
                  this.setCaption(captionText, imageWidth);
              }

              if (this.options.additionalHtml && !this.domNodes.additionalHtml) {
                  this.domNodes.additionalHtml = document.createElement('div');
                  this.domNodes.additionalHtml.classList.add('sl-additional-html');
                  this.domNodes.additionalHtml.innerHTML = this.options.additionalHtml;
                  this.domNodes.image.appendChild(this.domNodes.additionalHtml);
              }

          });
      }

      zoomPanElement(targetOffsetX, targetOffsetY, targetScale) {

          this.currentImage.style[this.transitionPrefix + 'transform'] = 'translate(' + targetOffsetX + ',' + targetOffsetY + ') scale(' + targetScale + ')';

      };

      minMax(value, min, max) {
          return (value < min) ? min : (value > max) ? max : value;
      };

      setZoomData(initialScale, targetOffsetX, targetOffsetY) {
          this.currentImage.dataset.scale = initialScale;
          this.currentImage.dataset.translateX = targetOffsetX;
          this.currentImage.dataset.translateY = targetOffsetY;
      };


      hashchangeHandler() {
          if (this.isOpen && this.hash === this.initialLocationHash) {
              this.hashReseted = true;
              this.close();
          }
      }

      addEvents() {

          // resize/responsive
          this.addEventListener(window, 'resize.' + this.eventNamespace, (event) => {
              //this.adjustImage.bind(this)
              if (this.isOpen) {
                  this.adjustImage();
              }
          });

          this.addEventListener(this.domNodes.closeButton, ['click.' + this.eventNamespace, 'touchstart.' + this.eventNamespace], this.close.bind(this));

          if (this.options.history) {
              setTimeout(() => {
                  this.addEventListener(window, 'hashchange.' + this.eventNamespace, (event) => {
                      if (this.isOpen) {
                          this.hashchangeHandler();
                      }
                  });
              }, 40);
          }

          this.addEventListener(this.domNodes.navigation.getElementsByTagName('button'), 'click.' + this.eventNamespace, (event) => {
              if (!event.currentTarget.tagName.match(/button/i)) {
                  return true;
              }

              event.preventDefault();
              this.controlCoordinates.swipeDiff = 0;
              this.loadImage(event.currentTarget.classList.contains('sl-next') ? 1 : -1);
          });

          this.addEventListener(this.domNodes.image, ['touchstart.' + this.eventNamespace, 'mousedown.' + this.eventNamespace], (event) => {
              if (event.target.tagName === 'A' && event.type === 'touchstart') {
                  return true;
              }

              if (event.type === 'mousedown') {
                  this.controlCoordinates.initialPointerOffsetX = event.clientX;
                  this.controlCoordinates.initialPointerOffsetY = event.clientY;
                  this.controlCoordinates.containerHeight = this.getDimensions(this.domNodes.image).height;
                  this.controlCoordinates.containerWidth = this.getDimensions(this.domNodes.image).width;
                  this.controlCoordinates.imgHeight = this.getDimensions(this.currentImage).height;
                  this.controlCoordinates.imgWidth = this.getDimensions(this.currentImage).width;
                  this.controlCoordinates.containerOffsetX = this.domNodes.image.offsetLeft;
                  this.controlCoordinates.containerOffsetY = this.domNodes.image.offsetTop;

                  this.controlCoordinates.initialOffsetX = parseFloat(this.currentImage.dataset.translateX);
                  this.controlCoordinates.initialOffsetY = parseFloat(this.currentImage.dataset.translateY);
                  this.controlCoordinates.capture = true;
              } else {
                  this.controlCoordinates.touchCount = event.touches.length;
                  this.controlCoordinates.initialPointerOffsetX = event.touches[0].clientX;
                  this.controlCoordinates.initialPointerOffsetY = event.touches[0].clientY;
                  this.controlCoordinates.containerHeight = this.getDimensions(this.domNodes.image).height;
                  this.controlCoordinates.containerWidth = this.getDimensions(this.domNodes.image).width;
                  this.controlCoordinates.imgHeight = this.getDimensions(this.currentImage).height;
                  this.controlCoordinates.imgWidth = this.getDimensions(this.currentImage).width;
                  this.controlCoordinates.containerOffsetX = this.domNodes.image.offsetLeft;
                  this.controlCoordinates.containerOffsetY = this.domNodes.image.offsetTop;

                  if (this.controlCoordinates.touchCount === 1) /* Single touch */ {
                      if (!this.controlCoordinates.doubleTapped) {
                          this.controlCoordinates.doubleTapped = true;
                          setTimeout(() => {
                              this.controlCoordinates.doubleTapped = false;
                          }, 300);
                      } else {

                          this.currentImage.classList.add('sl-transition');
                          if (!this.controlCoordinates.zoomed) {
                              this.controlCoordinates.initialScale = this.options.doubleTapZoom;
                              this.setZoomData(this.controlCoordinates.initialScale,0, 0);
                              this.zoomPanElement(0 + "px", 0 + "px", this.controlCoordinates.initialScale);


                              if (!this.domNodes.caption.style.opacity && this.domNodes.caption.style.display !== 'none') {
                                  this.fadeOut(this.domNodes.caption, 200);
                              }

                              this.controlCoordinates.zoomed = true;
                          } else {
                              this.controlCoordinates.initialScale = 1;
                              this.setZoomData(this.controlCoordinates.initialScale,0, 0);
                              this.zoomPanElement(0 + "px", 0 + "px", this.controlCoordinates.initialScale);
                              this.controlCoordinates.zoomed = false;
                          }

                          setTimeout(() => {
                              if (this.currentImage) {
                                  this.currentImage.classList.remove('sl-transition');
                              }
                          }, 200);
                          return false;
                      }

                      this.controlCoordinates.initialOffsetX  = parseFloat(this.currentImage.dataset.translateX);
                      this.controlCoordinates.initialOffsetY = parseFloat(this.currentImage.dataset.translateY);
                  }
                  else if (this.controlCoordinates.touchCount === 2) /* Pinch */ {
                      this.controlCoordinates.initialPointerOffsetX2 = event.touches[1].clientX;
                      this.controlCoordinates.initialPointerOffsetY2 = event.touches[1].clientY;
                      this.controlCoordinates.initialOffsetX = parseFloat(this.currentImage.dataset.translateX);
                      this.controlCoordinates.initialOffsetY = parseFloat(this.currentImage.dataset.translateY);
                      this.controlCoordinates.pinchOffsetX = (this.controlCoordinates.initialPointerOffsetX + this.controlCoordinates.initialPointerOffsetX2) / 2;
                      this.controlCoordinates.pinchOffsetY = (this.controlCoordinates.initialPointerOffsetY + this.controlCoordinates.initialPointerOffsetY2) / 2;
                      this.controlCoordinates.initialPinchDistance = Math.sqrt(((this.controlCoordinates.initialPointerOffsetX - this.controlCoordinates.initialPointerOffsetX2) * (this.controlCoordinates.initialPointerOffsetX - this.controlCoordinates.initialPointerOffsetX2)) + ((this.controlCoordinates.initialPointerOffsetY - this.controlCoordinates.initialPointerOffsetY2) * (this.controlCoordinates.initialPointerOffsetY - this.controlCoordinates.initialPointerOffsetY2)));
                  }
                  this.controlCoordinates.capture = true;
              }
              if(this.controlCoordinates.mousedown) return true;
              if (this.transitionCapable) {
                  this.controlCoordinates.imageLeft = parseInt(this.domNodes.image.style.left, 10);
              }
              this.controlCoordinates.mousedown = true;
              this.controlCoordinates.swipeDiff = 0;
              this.controlCoordinates.swipeYDiff = 0;
              this.controlCoordinates.swipeStart = event.pageX || event.touches[0].pageX;
              this.controlCoordinates.swipeYStart = event.pageY || event.touches[0].pageY;

              return false;
          });

          this.addEventListener(this.domNodes.image, ['touchmove.' + this.eventNamespace, 'mousemove.' + this.eventNamespace, 'MSPointerMove'], (event) => {


              if (!this.controlCoordinates.mousedown) {
                  return true;
              }

              event.preventDefault();

              if (event.type === 'touchmove') {
                  if (this.controlCoordinates.capture === false) {
                      return false;
                  }

                  this.controlCoordinates.pointerOffsetX = event.touches[0].clientX;
                  this.controlCoordinates.pointerOffsetY = event.touches[0].clientY;
                  this.controlCoordinates.touchCount = event.touches.length;
                  this.controlCoordinates.touchmoveCount++;

                  if (this.controlCoordinates.touchCount > 1) /* Pinch */ {
                      this.controlCoordinates.pointerOffsetX2 = event.touches[1].clientX;
                      this.controlCoordinates.pointerOffsetY2 = event.touches[1].clientY;
                      this.controlCoordinates.targetPinchDistance = Math.sqrt(((this.controlCoordinates.pointerOffsetX - this.controlCoordinates.pointerOffsetX2) * (this.controlCoordinates.pointerOffsetX - this.controlCoordinates.pointerOffsetX2)) + ((this.controlCoordinates.pointerOffsetY - this.controlCoordinates.pointerOffsetY2) * (this.controlCoordinates.pointerOffsetY - this.controlCoordinates.pointerOffsetY2)));
                      if (this.controlCoordinates.initialPinchDistance === null) {
                          this.controlCoordinates.initialPinchDistance = this.controlCoordinates.targetPinchDistance;
                      }

                      if (Math.abs(this.controlCoordinates.initialPinchDistance - this.controlCoordinates.targetPinchDistance) >= 1) {
                          /* Initialize helpers */
                          this.controlCoordinates.targetScale = this.minMax(this.controlCoordinates.targetPinchDistance / this.controlCoordinates.initialPinchDistance * this.controlCoordinates.initialScale, 1, this.options.maxZoom);
                          this.controlCoordinates.limitOffsetX = ((this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale) - this.controlCoordinates.containerWidth) / 2;
                          this.controlCoordinates.limitOffsetY = ((this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale) - this.controlCoordinates.containerHeight) / 2;
                          this.controlCoordinates.scaleDifference = this.controlCoordinates.targetScale - this.controlCoordinates.initialScale;
                          this.controlCoordinates.targetOffsetX = (this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale) <= this.controlCoordinates.containerWidth ? 0 : this.minMax(this.controlCoordinates.initialOffsetX - ((((((this.controlCoordinates.pinchOffsetX - this.controlCoordinates.containerOffsetX) - (this.controlCoordinates.containerWidth / 2)) - this.controlCoordinates.initialOffsetX) / (this.controlCoordinates.targetScale - this.controlCoordinates.scaleDifference))) * this.controlCoordinates.scaleDifference), this.controlCoordinates.limitOffsetX * (-1), this.controlCoordinates.limitOffsetX);
                          this.controlCoordinates.targetOffsetY = (this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale) <= this.controlCoordinates.containerHeight ? 0 : this.minMax(this.controlCoordinates.initialOffsetY - ((((((this.controlCoordinates.pinchOffsetY - this.controlCoordinates.containerOffsetY) - (this.controlCoordinates.containerHeight / 2)) - this.controlCoordinates.initialOffsetY) / (this.controlCoordinates.targetScale - this.controlCoordinates.scaleDifference))) * this.controlCoordinates.scaleDifference), this.controlCoordinates.limitOffsetY * (-1), this.controlCoordinates.limitOffsetY);

                          this.zoomPanElement(this.controlCoordinates.targetOffsetX + "px", this.controlCoordinates.targetOffsetY + "px", this.controlCoordinates.targetScale);

                          if (this.controlCoordinates.targetScale > 1) {
                              this.controlCoordinates.zoomed = true;
                              if (!this.domNodes.caption.style.opacity && this.domNodes.caption.style.display !== 'none') {
                                  this.fadeOut(this.domNodes.caption, 200);
                              }
                          }

                          this.controlCoordinates.initialPinchDistance = this.controlCoordinates.targetPinchDistance;
                          this.controlCoordinates.initialScale = this.controlCoordinates.targetScale;
                          this.controlCoordinates.initialOffsetX = this.controlCoordinates.targetOffsetX;
                          this.controlCoordinates.initialOffsetY = this.controlCoordinates.targetOffsetY;
                      }
                  } else {
                      this.controlCoordinates.targetScale = this.controlCoordinates.initialScale;
                      this.controlCoordinates.limitOffsetX = ((this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale) - this.controlCoordinates.containerWidth) / 2;
                      this.controlCoordinates.limitOffsetY = ((this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale) - this.controlCoordinates.containerHeight) / 2;
                      this.controlCoordinates.targetOffsetX = (this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale) <= this.controlCoordinates.containerWidth ? 0 : this.minMax(this.controlCoordinates.pointerOffsetX - (this.controlCoordinates.initialPointerOffsetX - this.controlCoordinates.initialOffsetX), this.controlCoordinates.limitOffsetX * (-1), this.controlCoordinates.limitOffsetX);
                      this.controlCoordinates.targetOffsetY = (this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale) <= this.controlCoordinates.containerHeight ? 0 : this.minMax(this.controlCoordinates.pointerOffsetY - (this.controlCoordinates.initialPointerOffsetY - this.controlCoordinates.initialOffsetY), this.controlCoordinates.limitOffsetY * (-1), this.controlCoordinates.limitOffsetY);

                      if (Math.abs(this.controlCoordinates.targetOffsetX) === Math.abs(this.controlCoordinates.limitOffsetX)) {
                          this.controlCoordinates.initialOffsetX = this.controlCoordinates.targetOffsetX;
                          this.controlCoordinates.initialPointerOffsetX = this.controlCoordinates.pointerOffsetX;
                      }

                      if (Math.abs(this.controlCoordinates.targetOffsetY) === Math.abs(this.controlCoordinates.limitOffsetY)) {
                          this.controlCoordinates.initialOffsetY = this.controlCoordinates.targetOffsetY;
                          this.controlCoordinates.initialPointerOffsetY = this.controlCoordinates.pointerOffsetY;
                      }

                      this.setZoomData(this.controlCoordinates.initialScale, this.controlCoordinates.targetOffsetX, this.controlCoordinates.targetOffsetY);
                      this.zoomPanElement(this.controlCoordinates.targetOffsetX + "px", this.controlCoordinates.targetOffsetY + "px", this.controlCoordinates.targetScale);
                  }
              }

              /* Mouse Move implementation */
              if (event.type === 'mousemove' && this.controlCoordinates.mousedown) {
                if(event.type == 'touchmove') return true;
                if(this.controlCoordinates.capture === false) return false;

                this.controlCoordinates.pointerOffsetX = event.clientX;
                this.controlCoordinates.pointerOffsetY = event.clientY;

                this.controlCoordinates.targetScale = this.controlCoordinates.initialScale;
                this.controlCoordinates.limitOffsetX = ((this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale) - this.controlCoordinates.containerWidth) / 2;
                this.controlCoordinates.limitOffsetY = ((this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale) - this.controlCoordinates.containerHeight) / 2;
                this.controlCoordinates.targetOffsetX = (this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale) <= this.controlCoordinates.containerWidth ? 0 : this.minMax(this.controlCoordinates.pointerOffsetX - (this.controlCoordinates.initialPointerOffsetX - this.controlCoordinates.initialOffsetX), this.controlCoordinates.limitOffsetX * (-1), this.controlCoordinates.limitOffsetX);
                this.controlCoordinates.targetOffsetY = (this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale) <= this.controlCoordinates.containerHeight ? 0 : this.minMax(this.controlCoordinates.pointerOffsetY - (this.controlCoordinates.initialPointerOffsetY - this.controlCoordinates.initialOffsetY), this.controlCoordinates.limitOffsetY * (-1), this.controlCoordinates.limitOffsetY);

                if (Math.abs(this.controlCoordinates.targetOffsetX) === Math.abs(this.controlCoordinates.limitOffsetX)) {
                    this.controlCoordinates.initialOffsetX = this.controlCoordinates.targetOffsetX;
                    this.controlCoordinates.initialPointerOffsetX = this.controlCoordinates.pointerOffsetX;
                }

                if (Math.abs(this.controlCoordinates.targetOffsetY) === Math.abs(this.controlCoordinates.limitOffsetY)) {
                    this.controlCoordinates.initialOffsetY = this.controlCoordinates.targetOffsetY;
                    this.controlCoordinates.initialPointerOffsetY = this.controlCoordinates.pointerOffsetY;
                }

                this.setZoomData(this.controlCoordinates.initialScale, this.controlCoordinates.targetOffsetX, this.controlCoordinates.targetOffsetY);
                this.zoomPanElement(this.controlCoordinates.targetOffsetX + "px", this.controlCoordinates.targetOffsetY + "px", this.controlCoordinates.targetScale);

              }

              if (!this.controlCoordinates.zoomed) {

                  this.controlCoordinates.swipeEnd = event.pageX || event.touches[0].pageX;
                  this.controlCoordinates.swipeYEnd = event.pageY || event.touches[0].pageY;
                  this.controlCoordinates.swipeDiff = this.controlCoordinates.swipeStart - this.controlCoordinates.swipeEnd;
                  this.controlCoordinates.swipeYDiff = this.controlCoordinates.swipeYStart - this.controlCoordinates.swipeYEnd;
                  if (this.options.animationSlide) {
                      this.slide(0, -this.controlCoordinates.swipeDiff + 'px');
                  }
              }

          });


          this.addEventListener(this.domNodes.image, ['touchend.' + this.eventNamespace, 'mouseup.' + this.eventNamespace, 'touchcancel.' + this.eventNamespace, 'mouseleave.' + this.eventNamespace, 'pointerup', 'pointercancel', 'MSPointerUp', 'MSPointerCancel'], (event) => {


              if (this.isTouchDevice && event.type === 'touchend') {
                  this.controlCoordinates.touchCount = event.touches.length;
                  if (this.controlCoordinates.touchCount === 0) /* No touch */ {
                      /* Set attributes */
                      if (this.currentImage) {
                          this.setZoomData(this.controlCoordinates.initialScale, this.controlCoordinates.targetOffsetX, this.controlCoordinates.targetOffsetY);
                      }
                      if (this.controlCoordinates.initialScale === 1) {
                          this.controlCoordinates.zoomed = false;
                          if (this.domNodes.caption.style.display === 'none') {
                              this.fadeIn(this.domNodes.caption, 200);
                          }
                      }
                      this.controlCoordinates.initialPinchDistance = null;
                      this.controlCoordinates.capture = false;
                  } else if (this.controlCoordinates.touchCount === 1) /* Single touch */ {
                      this.controlCoordinates.initialPointerOffsetX = event.touches[0].clientX;
                      this.controlCoordinates.initialPointerOffsetY = event.touches[0].clientY;
                  } else if (this.controlCoordinates.touchCount > 1) /* Pinch */ {
                      this.controlCoordinates.initialPinchDistance = null;
                  }
              }


              if (this.controlCoordinates.mousedown) {
                  this.controlCoordinates.mousedown = false;
                  let possibleDir = true;
                  if (!this.options.loop) {
                      if (this.currentImageIndex === 0 && this.controlCoordinates.swipeDiff < 0) {
                          possibleDir = false;
                      }
                      if (this.currentImageIndex >= this.relatedElements.length - 1 && this.controlCoordinates.swipeDiff > 0) {
                          possibleDir = false;
                      }
                  }
                  if (Math.abs(this.controlCoordinates.swipeDiff) > this.options.swipeTolerance && possibleDir) {
                      this.loadImage(this.controlCoordinates.swipeDiff > 0 ? 1 : -1);
                  }
                  else if (this.options.animationSlide) {
                      this.slide(this.options.animationSpeed / 1000, 0 + 'px');
                  }

                  if (this.options.swipeClose && Math.abs(this.controlCoordinates.swipeYDiff) > 50 && Math.abs(this.controlCoordinates.swipeDiff) < this.options.swipeTolerance) {
                      this.close();
                  }
              }
          });

          this.addEventListener(this.domNodes.image, ['dblclick'], (event) => {
              if(this.isTouchDevice) return;
              this.controlCoordinates.initialPointerOffsetX = event.clientX;
              this.controlCoordinates.initialPointerOffsetY = event.clientY;
              this.controlCoordinates.containerHeight = this.getDimensions(this.domNodes.image).height;
              this.controlCoordinates.containerWidth = this.getDimensions(this.domNodes.image).width;
              this.controlCoordinates.imgHeight = this.getDimensions(this.currentImage).height;
              this.controlCoordinates.imgWidth = this.getDimensions(this.currentImage).width;
              this.controlCoordinates.containerOffsetX = this.domNodes.image.offsetLeft;
              this.controlCoordinates.containerOffsetY = this.domNodes.image.offsetTop;

              this.currentImage.classList.add('sl-transition');

              if(!this.controlCoordinates.zoomed) {
                  this.controlCoordinates.initialScale = this.options.doubleTapZoom;
                  this.setZoomData(this.controlCoordinates.initialScale, 0, 0);
                  this.zoomPanElement(0 + "px", 0 + "px", this.controlCoordinates.initialScale);
                  if (!this.domNodes.caption.style.opacity && this.domNodes.caption.style.display !== 'none') {
                      this.fadeOut(this.domNodes.caption, 200);
                  }
                  this.controlCoordinates.zoomed = true;
              } else {
                  this.controlCoordinates.initialScale = 1;
                  this.setZoomData(this.controlCoordinates.initialScale, 0, 0);
                  this.zoomPanElement(0 + "px", 0 + "px", this.controlCoordinates.initialScale);
                  this.controlCoordinates.zoomed = false;
                  if (this.domNodes.caption.style.display === 'none') {
                      this.fadeIn(this.domNodes.caption, 200);
                  }
              }
              setTimeout(() => {
                  if (this.currentImage) {
                      this.currentImage.classList.remove('sl-transition');
                  }
              }, 200);

              this.controlCoordinates.capture = true;
              return false;
          });

      }

      getDimensions(element) {
          let styles = window.getComputedStyle(element),
              height = element.offsetHeight,
              width = element.offsetWidth,
              borderTopWidth = parseFloat(styles.borderTopWidth),
              borderBottomWidth = parseFloat(styles.borderBottomWidth),
              paddingTop = parseFloat(styles.paddingTop),
              paddingBottom = parseFloat(styles.paddingBottom),
              borderLeftWidth = parseFloat(styles.borderLeftWidth),
              borderRightWidth = parseFloat(styles.borderRightWidth),
              paddingLeft = parseFloat(styles.paddingLeft),
              paddingRight = parseFloat(styles.paddingRight);
          return {
              height: height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom,
              width: width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight
          };
      }

      updateHash() {
          let newHash = 'pid=' + (this.currentImageIndex + 1),
              newURL = window.location.href.split('#')[0] + '#' + newHash;

          this.hashReseted = false;

          if (this.pushStateSupport) {
              window.history[this.historyHasChanges ? 'replaceState' : 'pushState']('', document.title, newURL);
          } else {
              // what is the browser target of this?
              if (this.historyHasChanges) {
                  window.location.replace(newURL);
              } else {
                  window.location.hash = newHash;
              }
          }
          if(!this.historyHasChanges) {
              this.urlChangedOnce = true;
          }

          this.historyHasChanges = true;
      }

      resetHash() {
          this.hashReseted = true;
          if(this.urlChangedOnce) {
              history.back();
          } else {
              if (this.pushStateSupport) {
                  history.pushState('', document.title, window.location.pathname + window.location.search);
              } else {
                  window.location.hash = '';
              }
          }
          //
          //in case an history operation is still pending
          clearTimeout(this.historyUpdateTimeout);
      }

      updateURL() {
          clearTimeout(this.historyUpdateTimeout);
          if (!this.historyHasChanges) {
              this.updateHash(); // first time
          } else {
              this.historyUpdateTimeout = setTimeout(this.updateHash.bind(this), 800);
          }
      }

      setCaption(captionText, imageWidth) {
          if (this.options.captions && captionText && captionText !== '' && typeof captionText !== "undefined") {
              this.hide(this.domNodes.caption);
              this.domNodes.caption.style.width = imageWidth + 'px';
              this.domNodes.caption.innerHTML = captionText;

              this.domNodes.image.appendChild(this.domNodes.caption);

              setTimeout(() => {
                  this.fadeIn(this.domNodes.caption, 300);
              }, this.options.captionDelay);
          }
      }

      slide(speed, pos) {
          if (!this.transitionCapable) {
              return this.domNodes.image.style.left = pos;
          }

          this.domNodes.image.style[this.transitionPrefix + 'transform'] = 'translateX(' + pos + ')';
          this.domNodes.image.style[this.transitionPrefix + 'transition'] = this.transitionPrefix + 'transform ' + speed + 's linear';
      }

      getRelated(rel) {
          let elems;
          if (rel && rel !== false && rel !== 'nofollow') {
              elems = Array.from(this.elements).filter(element => element.getAttribute('rel') === rel);
          } else {
              elems = this.elements;
          }
          return elems;
      }

      openImage(element) {
          element.dispatchEvent(new Event('show.' + this.eventNamespace));

          if (this.options.disableScroll) {
              this.globalScrollbarWidth = this.toggleScrollbar('hide');
          }

          if (this.options.htmlClass && this.options.htmlClass !== '') {
              document.querySelector('html').classList.add(this.options.htmlClass);
          }

          document.body.appendChild(this.domNodes.wrapper);

          this.domNodes.wrapper.appendChild(this.domNodes.image);
          if (this.options.overlay) {
              document.body.appendChild(this.domNodes.overlay);
          }

          this.relatedElements = this.getRelated(element.rel);

          if (this.options.showCounter) {
              if (this.relatedElements.length == 1 && this.domNodes.wrapper.contains(this.domNodes.counter)) {
                  this.domNodes.wrapper.removeChild(this.domNodes.counter);
              } else if(this.relatedElements.length > 1 && !this.domNodes.wrapper.contains(this.domNodes.counter)) {
                  this.domNodes.wrapper.appendChild(this.domNodes.counter);
              }
          }

          this.isAnimating = true;

          this.currentImageIndex = this.relatedElements.indexOf(element);

          let targetURL = element.getAttribute(this.options.sourceAttr);

          this.currentImage = document.createElement('img');
          this.currentImage.style.display = 'none';
          this.currentImage.setAttribute('src', targetURL);
          this.currentImage.dataset.scale = 1;
          this.currentImage.dataset.translateX = 0;
          this.currentImage.dataset.translateY = 0;

          if (this.loadedImages.indexOf(targetURL) === -1) {
              this.loadedImages.push(targetURL);
          }

          this.domNodes.image.innerHTML = '';
          this.domNodes.image.setAttribute('style', '');

          this.domNodes.image.appendChild(this.currentImage);


          this.fadeIn(this.domNodes.overlay, 300);
          this.fadeIn([this.domNodes.counter, this.domNodes.navigation, this.domNodes.closeButton], 300);

          this.show(this.domNodes.spinner);
          this.domNodes.counter.querySelector('.sl-current').innerHTML = this.currentImageIndex + 1;
          this.domNodes.counter.querySelector('.sl-total').innerHTML = this.relatedElements.length;

          this.adjustImage();
          if (this.options.preloading) {
              this.preload();
          }

          setTimeout(() => {
              element.dispatchEvent(new Event('shown.' + this.eventNamespace));
          }, this.options.animationSpeed);
      }

      // utility

      addEventListener(elements, events, callback, opts) {
          elements = this.wrap(elements);
          events = this.wrap(events);


          for (let element of elements) {
              if (!element.namespaces) {
                  element.namespaces = {};
              } // save the namespaces addEventListener the DOM element itself

              for (let event of events) {
                  let options = opts || false;
                  element.namespaces[event] = callback;
                  element.addEventListener(event.split('.')[0], callback, options);

              }
          }
      }

      removeEventListener(elements, events) {
          elements = this.wrap(elements);
          events = this.wrap(events);
          for (let element of elements) {
              for (let event of events) {
                  element.removeEventListener(event.split('.')[0], element.namespaces[event]);
                  delete element.namespaces[event];
              }
          }
      }

      fadeOut(elements, duration, callback) {
          elements = this.wrap(elements);
          for (let element of elements) {
              element.style.opacity = 1;
          }

          let step = 16.66666 / (duration || 300),
              fade = () => {
                  let currentOpacity = parseFloat(elements[0].style.opacity);
                  if ((currentOpacity -= step) < 0) {
                      for (let element of elements) {
                          element.style.display = "none";
                          element.style.opacity = '';
                      }
                      callback && callback.call(this, elements);
                  } else {
                      for (let element of elements) {
                          element.style.opacity = currentOpacity;
                      }
                      requestAnimationFrame(fade);
                  }
              };

          fade();
      }

      fadeIn(elements, duration, callback, display) {
          elements = this.wrap(elements);
          for (let element of elements) {
              element.style.opacity = 0;
              element.style.display = display || "block";
          }


          let opacityTarget = parseFloat(elements[0].dataset.opacityTarget || 1),
              step = (16.66666 * opacityTarget) / (duration || 300),
              fade = () => {
                  let currentOpacity = parseFloat(elements[0].style.opacity);
                  if (!((currentOpacity += step) > opacityTarget)) {
                      for (let element of elements) {
                          element.style.opacity = currentOpacity;
                      }
                      requestAnimationFrame(fade);
                  } else {
                      for (let element of elements) {
                          element.style.opacity = '';
                      }
                      callback && callback.call(this, elements);
                  }
              };

          fade();
      }

      hide(elements) {
          elements = this.wrap(elements);
          for (let element of elements) {
              element.dataset.initialDisplay = element.style.display;
              element.style.display = 'none';
          }
      }

      show(elements, display) {
          elements = this.wrap(elements);
          for (let element of elements) {
              element.style.display = element.dataset.initialDisplay || display || 'block';
          }
      }

      wrap(input) {
          return typeof input[Symbol.iterator] === 'function' && typeof input !== 'string' ? input : [input];
      }

      on(events, callback) {
          events = this.wrap(events);
          for (let element of this.elements) {
              if (!element.fullyNamespacedEvents) {
                  element.fullyNamespacedEvents = {};
              }
              for (let event of events) {
                  element.fullyNamespacedEvents[event] = callback;
                  element.addEventListener(event, callback);
              }
          }
          return this;
      }

      off(events) {
          events = this.wrap(events);
          for (let element of this.elements) {
              for (let event of events) {
                  if (typeof element.fullyNamespacedEvents !== 'undefined' && event in element.fullyNamespacedEvents) {
                      element.removeEventListener(event, element.fullyNamespacedEvents[event]);
                  }
              }
          }
          return this;
      }

      // api

      open(elem) {
          elem = elem || this.elements[0];
          if(typeof jQuery !== "undefined" && elem instanceof jQuery) {
              elem = elem.get(0);
          }
          this.initialImageIndex = this.elements.indexOf(elem);
          if(this.initialImageIndex > -1) {
              this.openImage(elem);
          }
      }

      next() {
          this.loadImage(1);
      }

      prev() {
          this.loadImage(-1);
      }

      //close is exposed anyways..

      destroy() {
          //remove all custom event listeners from elements
          this.off([
              'close.' + this.eventNamespace,
              'closed.' + this.eventNamespace,
              'nextImageLoaded.' + this.eventNamespace,
              'prevImageLoaded.' + this.eventNamespace,
              'change.' + this.eventNamespace,
              'nextDone.' + this.eventNamespace,
              'prevDone.' + this.eventNamespace,
              'error.' + this.eventNamespace,
              'changed.' + this.eventNamespace,
              'next.' + this.eventNamespace,
              'prev.' + this.eventNamespace,
              'show.' + this.eventNamespace,
              'shown.' + this.eventNamespace
          ]);

          this.removeEventListener(this.elements, 'click.' + this.eventNamespace);

          this.removeEventListener(document.body, 'contextmenu.' + this.eventNamespace);
          this.removeEventListener(document.body, 'keyup.' + this.eventNamespace);

          this.removeEventListener(this.domNodes.navigation.getElementsByTagName('button'), 'click.' + this.eventNamespace);
          this.removeEventListener(this.domNodes.closeButton, 'click.' + this.eventNamespace);
          this.removeEventListener(window, 'resize.' + this.eventNamespace);
          this.removeEventListener(window, 'hashchange.' + this.eventNamespace);

          this.close();
          if (this.isOpen) {
              document.body.removeChild(this.domNodes.wrapper);
              document.body.removeChild(this.domNodes.overlay);
          }

          this.elements = null;
      }

      refresh() {
          if (!this.initialSelector) {
              throw 'refreshing only works when you initialize using a selector!';
          }

          let options = this.options,
              selector = this.initialSelector;

          this.destroy();

          this.constructor(selector, options);

          return this;
      }
  }

  const simpleLightbox = function (className, options) {
    return new SimpleLightbox(className, options)
  };

  // simpleLightbox for picture partial
  simpleLightbox('.picture-partial__zoom-link', {
    captionSelector: 'self',
    captionType: 'data',
    captionsData: 'caption'
  });

  // simpleLightbox for image partial
  simpleLightbox('.image-partial__zoom-link', {
    captionSelector: 'self',
    captionType: 'data',
    captionsData: 'caption'
  });

}());
//# sourceMappingURL=main.js.map
