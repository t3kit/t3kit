(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global = global || self, factory(global.$));
}(this, function ($) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  const TRANSITION_END = 'transitionend';
  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;

  // Shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase()
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments) // eslint-disable-line prefer-rest-params
        }
        return undefined // eslint-disable-line no-undefined
      }
    }
  }

  function transitionEndEmulator(duration) {
    let called = false;

    $(this).one(Util.TRANSITION_END, () => {
      called = true;
    });

    setTimeout(() => {
      if (!called) {
        Util.triggerTransitionEnd(this);
      }
    }, duration);

    return this
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  const Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix))
      return prefix
    },

    getSelectorFromElement(element) {
      let selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        const hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null
      } catch (err) {
        return null
      }
    },

    getTransitionDurationFromElement(element) {
      if (!element) {
        return 0
      }

      // Get transition-duration of the element
      let transitionDuration = $(element).css('transition-duration');
      let transitionDelay = $(element).css('transition-delay');

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
    },

    reflow(element) {
      return element.offsetHeight
    },

    triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },

    // TODO: Remove in v5
    supportsTransitionEnd() {
      return Boolean(TRANSITION_END)
    },

    isElement(obj) {
      return (obj[0] || obj).nodeType
    },

    typeCheckConfig(componentName, config, configTypes) {
      for (const property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          const expectedTypes = configTypes[property];
          const value         = config[property];
          const valueType     = value && Util.isElement(value)
            ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(
              `${componentName.toUpperCase()}: ` +
              `Option "${property}" provided type "${valueType}" ` +
              `but expected type "${expectedTypes}".`)
          }
        }
      }
    },

    findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null
      }

      // Can find the shadow root otherwise it'll return the document
      if (typeof element.getRootNode === 'function') {
        const root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null
      }

      if (element instanceof ShadowRoot) {
        return element
      }

      // when we don't find a shadow root
      if (!element.parentNode) {
        return null
      }

      return Util.findShadowRoot(element.parentNode)
    }
  };

  setTransitionEndSupport();

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME                = 'alert';
  const VERSION             = '4.3.1';
  const DATA_KEY            = 'bs.alert';
  const EVENT_KEY           = `.${DATA_KEY}`;
  const DATA_API_KEY        = '.data-api';
  const JQUERY_NO_CONFLICT  = $.fn[NAME];

  const Selector = {
    DISMISS : '[data-dismiss="alert"]'
  };

  const Event = {
    CLOSE          : `close${EVENT_KEY}`,
    CLOSED         : `closed${EVENT_KEY}`,
    CLICK_DATA_API : `click${EVENT_KEY}${DATA_API_KEY}`
  };

  const ClassName = {
    ALERT : 'alert',
    FADE  : 'fade',
    SHOW  : 'show'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Alert {
    constructor(element) {
      this._element = element;
    }

    // Getters

    static get VERSION() {
      return VERSION
    }

    // Public

    close(element) {
      let rootElement = this._element;
      if (element) {
        rootElement = this._getRootElement(element);
      }

      const customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return
      }

      this._removeElement(rootElement);
    }

    dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    }

    // Private

    _getRootElement(element) {
      const selector = Util.getSelectorFromElement(element);
      let parent     = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $(element).closest(`.${ClassName.ALERT}`)[0];
      }

      return parent
    }

    _triggerCloseEvent(element) {
      const closeEvent = $.Event(Event.CLOSE);

      $(element).trigger(closeEvent);
      return closeEvent
    }

    _removeElement(element) {
      $(element).removeClass(ClassName.SHOW);

      if (!$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);
        return
      }

      const transitionDuration = Util.getTransitionDurationFromElement(element);

      $(element)
        .one(Util.TRANSITION_END, (event) => this._destroyElement(element, event))
        .emulateTransitionEnd(transitionDuration);
    }

    _destroyElement(element) {
      $(element)
        .detach()
        .trigger(Event.CLOSED)
        .remove();
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        const $element = $(this);
        let data       = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      })
    }

    static _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      }
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(
    Event.CLICK_DATA_API,
    Selector.DISMISS,
    Alert._handleDismiss(new Alert())
  );

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME]             = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;
  $.fn[NAME].noConflict  = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$1                = 'button';
  const VERSION$1             = '4.3.1';
  const DATA_KEY$1            = 'bs.button';
  const EVENT_KEY$1           = `.${DATA_KEY$1}`;
  const DATA_API_KEY$1        = '.data-api';
  const JQUERY_NO_CONFLICT$1  = $.fn[NAME$1];

  const ClassName$1 = {
    ACTIVE : 'active',
    BUTTON : 'btn',
    FOCUS  : 'focus'
  };

  const Selector$1 = {
    DATA_TOGGLE_CARROT : '[data-toggle^="button"]',
    DATA_TOGGLE        : '[data-toggle="buttons"]',
    INPUT              : 'input:not([type="hidden"])',
    ACTIVE             : '.active',
    BUTTON             : '.btn'
  };

  const Event$1 = {
    CLICK_DATA_API      : `click${EVENT_KEY$1}${DATA_API_KEY$1}`,
    FOCUS_BLUR_DATA_API : `focus${EVENT_KEY$1}${DATA_API_KEY$1} ` +
                            `blur${EVENT_KEY$1}${DATA_API_KEY$1}`
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Button {
    constructor(element) {
      this._element = element;
    }

    // Getters

    static get VERSION() {
      return VERSION$1
    }

    // Public

    toggle() {
      let triggerChangeEvent = true;
      let addAriaPressed = true;
      const rootElement = $(this._element).closest(
        Selector$1.DATA_TOGGLE
      )[0];

      if (rootElement) {
        const input = this._element.querySelector(Selector$1.INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked &&
              this._element.classList.contains(ClassName$1.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              const activeElement = rootElement.querySelector(Selector$1.ACTIVE);

              if (activeElement) {
                $(activeElement).removeClass(ClassName$1.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') ||
              rootElement.hasAttribute('disabled') ||
              input.classList.contains('disabled') ||
              rootElement.classList.contains('disabled')) {
              return
            }
            input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (addAriaPressed) {
        this._element.setAttribute('aria-pressed',
          !this._element.classList.contains(ClassName$1.ACTIVE));
      }

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName$1.ACTIVE);
      }
    }

    dispose() {
      $.removeData(this._element, DATA_KEY$1);
      this._element = null;
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY$1);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY$1, data);
        }

        if (config === 'toggle') {
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

  $(document)
    .on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, (event) => {
      event.preventDefault();

      let button = event.target;

      if (!$(button).hasClass(ClassName$1.BUTTON)) {
        button = $(button).closest(Selector$1.BUTTON);
      }

      Button._jQueryInterface.call($(button), 'toggle');
    })
    .on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, (event) => {
      const button = $(event.target).closest(Selector$1.BUTTON)[0];
      $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
    });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$1] = Button._jQueryInterface;
  $.fn[NAME$1].Constructor = Button;
  $.fn[NAME$1].noConflict = () => {
    $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$2                   = 'carousel';
  const VERSION$2                = '4.3.1';
  const DATA_KEY$2               = 'bs.carousel';
  const EVENT_KEY$2              = `.${DATA_KEY$2}`;
  const DATA_API_KEY$2           = '.data-api';
  const JQUERY_NO_CONFLICT$2     = $.fn[NAME$2];
  const ARROW_LEFT_KEYCODE     = 37; // KeyboardEvent.which value for left arrow key
  const ARROW_RIGHT_KEYCODE    = 39; // KeyboardEvent.which value for right arrow key
  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch
  const SWIPE_THRESHOLD        = 40;

  const Default = {
    interval : 5000,
    keyboard : true,
    slide    : false,
    pause    : 'hover',
    wrap     : true,
    touch    : true
  };

  const DefaultType = {
    interval : '(number|boolean)',
    keyboard : 'boolean',
    slide    : '(boolean|string)',
    pause    : '(string|boolean)',
    wrap     : 'boolean',
    touch    : 'boolean'
  };

  const Direction = {
    NEXT     : 'next',
    PREV     : 'prev',
    LEFT     : 'left',
    RIGHT    : 'right'
  };

  const Event$2 = {
    SLIDE          : `slide${EVENT_KEY$2}`,
    SLID           : `slid${EVENT_KEY$2}`,
    KEYDOWN        : `keydown${EVENT_KEY$2}`,
    MOUSEENTER     : `mouseenter${EVENT_KEY$2}`,
    MOUSELEAVE     : `mouseleave${EVENT_KEY$2}`,
    TOUCHSTART     : `touchstart${EVENT_KEY$2}`,
    TOUCHMOVE      : `touchmove${EVENT_KEY$2}`,
    TOUCHEND       : `touchend${EVENT_KEY$2}`,
    POINTERDOWN    : `pointerdown${EVENT_KEY$2}`,
    POINTERUP      : `pointerup${EVENT_KEY$2}`,
    DRAG_START     : `dragstart${EVENT_KEY$2}`,
    LOAD_DATA_API  : `load${EVENT_KEY$2}${DATA_API_KEY$2}`,
    CLICK_DATA_API : `click${EVENT_KEY$2}${DATA_API_KEY$2}`
  };

  const ClassName$2 = {
    CAROUSEL      : 'carousel',
    ACTIVE        : 'active',
    SLIDE         : 'slide',
    RIGHT         : 'carousel-item-right',
    LEFT          : 'carousel-item-left',
    NEXT          : 'carousel-item-next',
    PREV          : 'carousel-item-prev',
    ITEM          : 'carousel-item',
    POINTER_EVENT : 'pointer-event'
  };

  const Selector$2 = {
    ACTIVE      : '.active',
    ACTIVE_ITEM : '.active.carousel-item',
    ITEM        : '.carousel-item',
    ITEM_IMG    : '.carousel-item img',
    NEXT_PREV   : '.carousel-item-next, .carousel-item-prev',
    INDICATORS  : '.carousel-indicators',
    DATA_SLIDE  : '[data-slide], [data-slide-to]',
    DATA_RIDE   : '[data-ride="carousel"]'
  };

  const PointerType = {
    TOUCH : 'touch',
    PEN   : 'pen'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Carousel {
    constructor(element, config) {
      this._items         = null;
      this._interval      = null;
      this._activeElement = null;
      this._isPaused      = false;
      this._isSliding     = false;
      this.touchTimeout   = null;
      this.touchStartX    = 0;
      this.touchDeltaX    = 0;

      this._config            = this._getConfig(config);
      this._element           = element;
      this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
      this._touchSupported    = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent      = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    }

    // Getters

    static get VERSION() {
      return VERSION$2
    }

    static get Default() {
      return Default
    }

    // Public

    next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    }

    nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden &&
        ($(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden')) {
        this.next();
      }
    }

    prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    }

    pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(Selector$2.NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    }

    cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval(
          (document.visibilityState ? this.nextWhenVisible : this.next).bind(this),
          this._config.interval
        );
      }
    }

    to(index) {
      this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      const activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return
      }

      if (this._isSliding) {
        $(this._element).one(Event$2.SLID, () => this.to(index));
        return
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return
      }

      const direction = index > activeIndex
        ? Direction.NEXT
        : Direction.PREV;

      this._slide(direction, this._items[index]);
    }

    dispose() {
      $(this._element).off(EVENT_KEY$2);
      $.removeData(this._element, DATA_KEY$2);

      this._items             = null;
      this._config            = null;
      this._element           = null;
      this._interval          = null;
      this._isPaused          = null;
      this._isSliding         = null;
      this._activeElement     = null;
      this._indicatorsElement = null;
    }

    // Private

    _getConfig(config) {
      config = {
        ...Default,
        ...config
      };
      Util.typeCheckConfig(NAME$2, config, DefaultType);
      return config
    }

    _handleSwipe() {
      const absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return
      }

      const direction = absDeltax / this.touchDeltaX;

      // swipe left
      if (direction > 0) {
        this.prev();
      }

      // swipe right
      if (direction < 0) {
        this.next();
      }
    }

    _addEventListeners() {
      if (this._config.keyboard) {
        $(this._element)
          .on(Event$2.KEYDOWN, (event) => this._keydown(event));
      }

      if (this._config.pause === 'hover') {
        $(this._element)
          .on(Event$2.MOUSEENTER, (event) => this.pause(event))
          .on(Event$2.MOUSELEAVE, (event) => this.cycle(event));
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    }

    _addTouchEventListeners() {
      if (!this._touchSupported) {
        return
      }

      const start = (event) => {
        if (this._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          this.touchStartX = event.originalEvent.clientX;
        } else if (!this._pointerEvent) {
          this.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      const move = (event) => {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          this.touchDeltaX = 0;
        } else {
          this.touchDeltaX = event.originalEvent.touches[0].clientX - this.touchStartX;
        }
      };

      const end = (event) => {
        if (this._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          this.touchDeltaX = event.originalEvent.clientX - this.touchStartX;
        }

        this._handleSwipe();
        if (this._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling

          this.pause();
          if (this.touchTimeout) {
            clearTimeout(this.touchTimeout);
          }
          this.touchTimeout = setTimeout((event) => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
        }
      };

      $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, (e) => e.preventDefault());
      if (this._pointerEvent) {
        $(this._element).on(Event$2.POINTERDOWN, (event) => start(event));
        $(this._element).on(Event$2.POINTERUP, (event) => end(event));

        this._element.classList.add(ClassName$2.POINTER_EVENT);
      } else {
        $(this._element).on(Event$2.TOUCHSTART, (event) => start(event));
        $(this._element).on(Event$2.TOUCHMOVE, (event) => move(event));
        $(this._element).on(Event$2.TOUCHEND, (event) => end(event));
      }
    }

    _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break
        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break
        default:
      }
    }

    _getItemIndex(element) {
      this._items = element && element.parentNode
        ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM))
        : [];
      return this._items.indexOf(element)
    }

    _getItemByDirection(direction, activeElement) {
      const isNextDirection = direction === Direction.NEXT;
      const isPrevDirection = direction === Direction.PREV;
      const activeIndex     = this._getItemIndex(activeElement);
      const lastItemIndex   = this._items.length - 1;
      const isGoingToWrap   = isPrevDirection && activeIndex === 0 ||
                              isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement
      }

      const delta     = direction === Direction.PREV ? -1 : 1;
      const itemIndex = (activeIndex + delta) % this._items.length;

      return itemIndex === -1
        ? this._items[this._items.length - 1] : this._items[itemIndex]
    }

    _triggerSlideEvent(relatedTarget, eventDirectionName) {
      const targetIndex = this._getItemIndex(relatedTarget);
      const fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));
      const slideEvent = $.Event(Event$2.SLIDE, {
        relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });

      $(this._element).trigger(slideEvent);

      return slideEvent
    }

    _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        const indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
        $(indicators)
          .removeClass(ClassName$2.ACTIVE);

        const nextIndicator = this._indicatorsElement.children[
          this._getItemIndex(element)
        ];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName$2.ACTIVE);
        }
      }
    }

    _slide(direction, element) {
      const activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);
      const activeElementIndex = this._getItemIndex(activeElement);
      const nextElement   = element || activeElement &&
        this._getItemByDirection(direction, activeElement);
      const nextElementIndex = this._getItemIndex(nextElement);
      const isCycling = Boolean(this._interval);

      let directionalClassName;
      let orderClassName;
      let eventDirectionName;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName$2.LEFT;
        orderClassName = ClassName$2.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName$2.RIGHT;
        orderClassName = ClassName$2.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
        this._isSliding = false;
        return
      }

      const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
      if (slideEvent.isDefaultPrevented()) {
        return
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      const slidEvent = $.Event(Event$2.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($(this._element).hasClass(ClassName$2.SLIDE)) {
        $(nextElement).addClass(orderClassName);

        Util.reflow(nextElement);

        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);

        const nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);
        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        const transitionDuration = Util.getTransitionDurationFromElement(activeElement);

        $(activeElement)
          .one(Util.TRANSITION_END, () => {
            $(nextElement)
              .removeClass(`${directionalClassName} ${orderClassName}`)
              .addClass(ClassName$2.ACTIVE);

            $(activeElement).removeClass(`${ClassName$2.ACTIVE} ${orderClassName} ${directionalClassName}`);

            this._isSliding = false;

            setTimeout(() => $(this._element).trigger(slidEvent), 0);
          })
          .emulateTransitionEnd(transitionDuration);
      } else {
        $(activeElement).removeClass(ClassName$2.ACTIVE);
        $(nextElement).addClass(ClassName$2.ACTIVE);

        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY$2);
        let _config = {
          ...Default,
          ...$(this).data()
        };

        if (typeof config === 'object') {
          _config = {
            ..._config,
            ...config
          };
        }

        const action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError(`No method named "${action}"`)
          }
          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      })
    }

    static _dataApiClickHandler(event) {
      const selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return
      }

      const target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
        return
      }

      const config = {
        ...$(target).data(),
        ...$(this).data()
      };
      const slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document)
    .on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);

  $(window).on(Event$2.LOAD_DATA_API, () => {
    const carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));
    for (let i = 0, len = carousels.length; i < len; i++) {
      const $carousel = $(carousels[i]);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$2] = Carousel._jQueryInterface;
  $.fn[NAME$2].Constructor = Carousel;
  $.fn[NAME$2].noConflict = () => {
    $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$3                = 'collapse';
  const VERSION$3             = '4.3.1';
  const DATA_KEY$3            = 'bs.collapse';
  const EVENT_KEY$3           = `.${DATA_KEY$3}`;
  const DATA_API_KEY$3        = '.data-api';
  const JQUERY_NO_CONFLICT$3  = $.fn[NAME$3];

  const Default$1 = {
    toggle : true,
    parent : ''
  };

  const DefaultType$1 = {
    toggle : 'boolean',
    parent : '(string|element)'
  };

  const Event$3 = {
    SHOW           : `show${EVENT_KEY$3}`,
    SHOWN          : `shown${EVENT_KEY$3}`,
    HIDE           : `hide${EVENT_KEY$3}`,
    HIDDEN         : `hidden${EVENT_KEY$3}`,
    CLICK_DATA_API : `click${EVENT_KEY$3}${DATA_API_KEY$3}`
  };

  const ClassName$3 = {
    SHOW       : 'show',
    COLLAPSE   : 'collapse',
    COLLAPSING : 'collapsing',
    COLLAPSED  : 'collapsed'
  };

  const Dimension = {
    WIDTH  : 'width',
    HEIGHT : 'height'
  };

  const Selector$3 = {
    ACTIVES     : '.show, .collapsing',
    DATA_TOGGLE : '[data-toggle="collapse"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Collapse {
    constructor(element, config) {
      this._isTransitioning = false;
      this._element         = element;
      this._config          = this._getConfig(config);
      this._triggerArray    = [].slice.call(document.querySelectorAll(
        `[data-toggle="collapse"][href="#${element.id}"],` +
        `[data-toggle="collapse"][data-target="#${element.id}"]`
      ));

      const toggleList = [].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));
      for (let i = 0, len = toggleList.length; i < len; i++) {
        const elem = toggleList[i];
        const selector = Util.getSelectorFromElement(elem);
        const filterElement = [].slice.call(document.querySelectorAll(selector))
          .filter((foundElem) => foundElem === element);

        if (selector !== null && filterElement.length > 0) {
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

    static get VERSION() {
      return VERSION$3
    }

    static get Default() {
      return Default$1
    }

    // Public

    toggle() {
      if ($(this._element).hasClass(ClassName$3.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    }

    show() {
      if (this._isTransitioning ||
        $(this._element).hasClass(ClassName$3.SHOW)) {
        return
      }

      let actives;
      let activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES))
          .filter((elem) => {
            if (typeof this._config.parent === 'string') {
              return elem.getAttribute('data-parent') === this._config.parent
            }

            return elem.classList.contains(ClassName$3.COLLAPSE)
          });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).not(this._selector).data(DATA_KEY$3);
        if (activesData && activesData._isTransitioning) {
          return
        }
      }

      const startEvent = $.Event(Event$3.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');
        if (!activesData) {
          $(actives).data(DATA_KEY$3, null);
        }
      }

      const dimension = this._getDimension();

      $(this._element)
        .removeClass(ClassName$3.COLLAPSE)
        .addClass(ClassName$3.COLLAPSING);

      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray)
          .removeClass(ClassName$3.COLLAPSED)
          .attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      const complete = () => {
        $(this._element)
          .removeClass(ClassName$3.COLLAPSING)
          .addClass(ClassName$3.COLLAPSE)
          .addClass(ClassName$3.SHOW);

        this._element.style[dimension] = '';

        this.setTransitioning(false);

        $(this._element).trigger(Event$3.SHOWN);
      };

      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;
      const transitionDuration = Util.getTransitionDurationFromElement(this._element);

      $(this._element)
        .one(Util.TRANSITION_END, complete)
        .emulateTransitionEnd(transitionDuration);

      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }

    hide() {
      if (this._isTransitioning ||
        !$(this._element).hasClass(ClassName$3.SHOW)) {
        return
      }

      const startEvent = $.Event(Event$3.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return
      }

      const dimension = this._getDimension();

      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;

      Util.reflow(this._element);

      $(this._element)
        .addClass(ClassName$3.COLLAPSING)
        .removeClass(ClassName$3.COLLAPSE)
        .removeClass(ClassName$3.SHOW);

      const triggerArrayLength = this._triggerArray.length;
      if (triggerArrayLength > 0) {
        for (let i = 0; i < triggerArrayLength; i++) {
          const trigger = this._triggerArray[i];
          const selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            const $elem = $([].slice.call(document.querySelectorAll(selector)));
            if (!$elem.hasClass(ClassName$3.SHOW)) {
              $(trigger).addClass(ClassName$3.COLLAPSED)
                .attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      const complete = () => {
        this.setTransitioning(false);
        $(this._element)
          .removeClass(ClassName$3.COLLAPSING)
          .addClass(ClassName$3.COLLAPSE)
          .trigger(Event$3.HIDDEN);
      };

      this._element.style[dimension] = '';
      const transitionDuration = Util.getTransitionDurationFromElement(this._element);

      $(this._element)
        .one(Util.TRANSITION_END, complete)
        .emulateTransitionEnd(transitionDuration);
    }

    setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    }

    dispose() {
      $.removeData(this._element, DATA_KEY$3);

      this._config          = null;
      this._parent          = null;
      this._element         = null;
      this._triggerArray    = null;
      this._isTransitioning = null;
    }

    // Private

    _getConfig(config) {
      config = {
        ...Default$1,
        ...config
      };
      config.toggle = Boolean(config.toggle); // Coerce string values
      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config
    }

    _getDimension() {
      const hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT
    }

    _getParent() {
      let parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent;

        // It's a jQuery object
        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      const selector =
        `[data-toggle="collapse"][data-parent="${this._config.parent}"]`;

      const children = [].slice.call(parent.querySelectorAll(selector));
      $(children).each((i, element) => {
        this._addAriaAndCollapsedClass(
          Collapse._getTargetFromElement(element),
          [element]
        );
      });

      return parent
    }

    _addAriaAndCollapsedClass(element, triggerArray) {
      const isOpen = $(element).hasClass(ClassName$3.SHOW);

      if (triggerArray.length) {
        $(triggerArray)
          .toggleClass(ClassName$3.COLLAPSED, !isOpen)
          .attr('aria-expanded', isOpen);
      }
    }

    // Static

    static _getTargetFromElement(element) {
      const selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null
    }

    static _jQueryInterface(config) {
      return this.each(function () {
        const $this   = $(this);
        let data      = $this.data(DATA_KEY$3);
        const _config = {
          ...Default$1,
          ...$this.data(),
          ...typeof config === 'object' && config ? config : {}
        };

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY$3, data);
        }

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

  $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    const $trigger = $(this);
    const selector = Util.getSelectorFromElement(this);
    const selectors = [].slice.call(document.querySelectorAll(selector));

    $(selectors).each(function () {
      const $target = $(this);
      const data    = $target.data(DATA_KEY$3);
      const config  = data ? 'toggle' : $trigger.data();
      Collapse._jQueryInterface.call($target, config);
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$3] = Collapse._jQueryInterface;
  $.fn[NAME$3].Constructor = Collapse;
  $.fn[NAME$3].noConflict = () => {
    $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$4               = 'tab';
  const VERSION$4            = '4.3.1';
  const DATA_KEY$4           = 'bs.tab';
  const EVENT_KEY$4          = `.${DATA_KEY$4}`;
  const DATA_API_KEY$4       = '.data-api';
  const JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];

  const Event$4 = {
    HIDE           : `hide${EVENT_KEY$4}`,
    HIDDEN         : `hidden${EVENT_KEY$4}`,
    SHOW           : `show${EVENT_KEY$4}`,
    SHOWN          : `shown${EVENT_KEY$4}`,
    CLICK_DATA_API : `click${EVENT_KEY$4}${DATA_API_KEY$4}`
  };

  const ClassName$4 = {
    DROPDOWN_MENU : 'dropdown-menu',
    ACTIVE        : 'active',
    DISABLED      : 'disabled',
    FADE          : 'fade',
    SHOW          : 'show'
  };

  const Selector$4 = {
    DROPDOWN              : '.dropdown',
    NAV_LIST_GROUP        : '.nav, .list-group',
    ACTIVE                : '.active',
    ACTIVE_UL             : '> li > .active',
    DATA_TOGGLE           : '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE       : '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD : '> .dropdown-menu .active'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Tab {
    constructor(element) {
      this._element = element;
    }

    // Getters

    static get VERSION() {
      return VERSION$4
    }

    // Public

    show() {
      if (this._element.parentNode &&
          this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
          $(this._element).hasClass(ClassName$4.ACTIVE) ||
          $(this._element).hasClass(ClassName$4.DISABLED)) {
        return
      }

      let target;
      let previous;
      const listElement = $(this._element).closest(Selector$4.NAV_LIST_GROUP)[0];
      const selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        const itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$4.ACTIVE_UL : Selector$4.ACTIVE;
        previous = $.makeArray($(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      const hideEvent = $.Event(Event$4.HIDE, {
        relatedTarget: this._element
      });

      const showEvent = $.Event(Event$4.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() ||
          hideEvent.isDefaultPrevented()) {
        return
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(
        this._element,
        listElement
      );

      const complete = () => {
        const hiddenEvent = $.Event(Event$4.HIDDEN, {
          relatedTarget: this._element
        });

        const shownEvent = $.Event(Event$4.SHOWN, {
          relatedTarget: previous
        });

        $(previous).trigger(hiddenEvent);
        $(this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    }

    dispose() {
      $.removeData(this._element, DATA_KEY$4);
      this._element = null;
    }

    // Private

    _activate(element, container, callback) {
      const activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL')
        ? $(container).find(Selector$4.ACTIVE_UL)
        : $(container).children(Selector$4.ACTIVE);

      const active = activeElements[0];
      const isTransitioning = callback && (active && $(active).hasClass(ClassName$4.FADE));
      const complete = () => this._transitionComplete(
        element,
        active,
        callback
      );

      if (active && isTransitioning) {
        const transitionDuration = Util.getTransitionDurationFromElement(active);

        $(active)
          .removeClass(ClassName$4.SHOW)
          .one(Util.TRANSITION_END, complete)
          .emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    }

    _transitionComplete(element, active, callback) {
      if (active) {
        $(active).removeClass(ClassName$4.ACTIVE);

        const dropdownChild = $(active.parentNode).find(
          Selector$4.DROPDOWN_ACTIVE_CHILD
        )[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName$4.ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $(element).addClass(ClassName$4.ACTIVE);
      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(ClassName$4.FADE)) {
        element.classList.add(ClassName$4.SHOW);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName$4.DROPDOWN_MENU)) {
        const dropdownElement = $(element).closest(Selector$4.DROPDOWN)[0];

        if (dropdownElement) {
          const dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector$4.DROPDOWN_TOGGLE));

          $(dropdownToggleList).addClass(ClassName$4.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        const $this = $(this);
        let data = $this.data(DATA_KEY$4);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$4, data);
        }

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

  $(document)
    .on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function (event) {
      event.preventDefault();
      Tab._jQueryInterface.call($(this), 'show');
    });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$4] = Tab._jQueryInterface;
  $.fn[NAME$4].Constructor = Tab;
  $.fn[NAME$4].noConflict = () => {
    $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Tab._jQueryInterface
  };

}));
//# sourceMappingURL=bootstrap.js.map
