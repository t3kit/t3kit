
// header
/* global touchSupport, jQuery */

jQuery(function ($) {
  // Caching variables
  var $html = $('html')
  var $mainNavigation = $('.js__main-navigation')
  var $openSubMenuLink = $('.js__main-navigation__open-sub-menu-link')
  var $mainNavigationItemsList = $mainNavigation.find('.js__main-navigation__items-list').children('li')
  var $secondNavLevel = $('.second-navigation-level')
  var $thirdNavLevel = $('.third-navigation-level')
  var $openThirdMenuLink = $('.js__main-navigation__open-third-menu-link')
  var $dropdownMenuWithColumns = $('.js__dropdown-menu-with-columns .js__main-navigation__item._sub')

  if (!touchSupport) {
    $dropdownMenuWithColumns.mouseenter(function () {
      $(this).addClass('open')
    }).mouseleave(function () {
      $(this).removeClass('open')
    })
  }

  // Set class for third-navigation-level to handle position on left or right
  var setThirdMenuPosition = function () {
    if ($thirdNavLevel.length) {
      if (window.matchMedia('(min-width: 992px)').matches) {
        $secondNavLevel.each(function () {
          var offsetRight = $(window).width() - $(this).offset().left - $(this).outerWidth()
          var secondNavLevelWidth = $(this).width()
          var thirdNavLevelWidth = $(this).find($thirdNavLevel).width()
          if (offsetRight < thirdNavLevelWidth) {
            $(this).find($thirdNavLevel).css('left', -secondNavLevelWidth)
          } else {
            $(this).find($thirdNavLevel).css('left', secondNavLevelWidth)
          }
        })
      } else {
        $thirdNavLevel.css('left', 'auto')
      }
    }
  }
  // Initial call for function
  setThirdMenuPosition()
  // Cleanup function to clean unneeded classes
  var cleanup = function () {
    $mainNavigation.find('.js__main-navigation__items-list').find('li').removeClass('_open-mobile-dropdown _open-tablet-dropdown')
    $html.removeClass('mobile-menu-opened')

    if (window.matchMedia('(min-width: 992px)').matches) {
      $('.js__navigation__items-wrp').show()
    } else {
      $('.js__navigation__items-wrp').hide()
    }

    // Set timeout for third menu position to load the width
    window.setTimeout(function () {
      setThirdMenuPosition()
    }, 500)
  }

  // Add click event to dropdown link on mobile devices.
  $openSubMenuLink.on('click', function (e) {
    e.preventDefault()
    if (window.matchMedia('(min-width: 992px)').matches) {
      $mainNavigationItemsList.not($(this).parents()).removeClass('_open-tablet-dropdown')
      $(this).parents('.main-navigation__item').toggleClass('_open-tablet-dropdown')
    } else {
      $(this).parents('.main-navigation__item').toggleClass('_open-mobile-dropdown')
    }
  })

  // Add click event to second menu dropdown link on mobile devices.
  $openThirdMenuLink.on('click', function (e) {
    e.preventDefault()
    if (window.matchMedia('(min-width: 992px)').matches) {
      $('.main-navigation__sub-item').not($(this).parents('.main-navigation__sub-item')).removeClass('_open-tablet-dropdown')
      $(this).parents('.main-navigation__sub-item').toggleClass('_open-tablet-dropdown')
    } else {
      $(this).parents('.main-navigation__sub-item').toggleClass('_open-mobile-dropdown')
    }
  })

  var mobileMenuAnimationComplete = true
  $('.js__main-navigation__toggle-btn').on('click', function (e) {
    e.preventDefault()
    if (mobileMenuAnimationComplete) {
      mobileMenuAnimationComplete = false
      $html.toggleClass('mobile-menu-opened')
    }
    $('.js__navigation__items-wrp').not(':animated').slideToggle(300, function () {
      mobileMenuAnimationComplete = true
    })
  })

  // detect if we cross 992px window width.
  window.matchMedia('(min-width: 992px)').addListener(cleanup)
})

// ====== class fo fixed main navigation bar   =======
jQuery(function ($) {
  var navbar = $('.js__main-navigation')

  if (navbar.length) {
    var offsetTop = navbar.offset().top

    // function that calculates offsetTop-value.
    var calcOffsetTop = function () {
      if (window.matchMedia('(min-width: 992px)').matches) {
        var navbarPos = navbar.css('position')
        offsetTop = $('header').height() - (navbarPos === 'fixed' ? 0 : navbar.outerHeight())
      }
    }

    // detect if we cross 992px window width.
    window.matchMedia('(min-width: 992px)').addListener(calcOffsetTop)
    $(window).on('load scroll', function () {
      var scrollPos = $(window).scrollTop()
      if (scrollPos > offsetTop) {
        $('body').addClass('main-navigation-fixed')
      } else {
        $('body').removeClass('main-navigation-fixed')
      }
    })
  }
})

jQuery(function ($) {
  var $mainNavigationSearchBtn = $('.js__main-navigation__search-btn')
  var $mainNavigationSearchBox = $('.js__main-navigation__search-box')
  var $mainNavigationSearchBoxOverlay = $('.js__main-navigation__search-box-overlay')

  var $languageMenuOverlay = $('.js__header-top__language-menu-overlay')
  var $languageMenuBtn = $('.js__header-top__language-menu-btn')
  var $languageMenuBox = $('.js__header-top__language-menu-box')
  var $languageMenuBoxCloseBtn = $('.js__header-top__language-menu-box-close-btn')
  var $metaNavigationNav = $('.js__header-top_meta-nav')

  $mainNavigationSearchBtn.on('click', function (e) {
    e.preventDefault()
    $mainNavigationSearchBox.toggleClass('_search-box-visible')
    if ($mainNavigationSearchBox.hasClass('_search-box-visible')) {
      $mainNavigationSearchBox.find('input[type="search"]').focus()
      $mainNavigationSearchBtn.addClass('_search-close-btn')
      $mainNavigationSearchBoxOverlay.addClass('_search-box-overlay-visible')
    } else {
      $mainNavigationSearchBtn.removeClass('_search-close-btn')
      $mainNavigationSearchBoxOverlay.removeClass('_search-box-overlay-visible')
    }
  })
  $mainNavigationSearchBoxOverlay.on('click', function () {
    $(this).removeClass('_search-box-overlay-visible')
    $mainNavigationSearchBtn.removeClass('_search-close-btn')
    $mainNavigationSearchBox.removeClass('_search-box-visible')
  })

  $languageMenuBtn.on('click', function (e) {
    e.preventDefault()
    $languageMenuBox.addClass('_language-menu-box-visible')
    $languageMenuOverlay.addClass('_language-menu-box-overlay-visible')

    // hide meta-navigation if showHeaderTopLangMenu = 1
    if ($('.header-top .js__header-top__language-menu-box').length) {
      $metaNavigationNav.addClass('hidden')
    }
  })
  $languageMenuOverlay.on('click', function () {
    $(this).removeClass('_language-menu-box-overlay-visible')
    $languageMenuBox.removeClass('_language-menu-box-visible')
    $metaNavigationNav.removeClass('hidden')
  })
  $languageMenuBoxCloseBtn.on('click', function () {
    $languageMenuOverlay.removeClass('_language-menu-box-overlay-visible')
    $languageMenuBox.removeClass('_language-menu-box-visible')
    $metaNavigationNav.removeClass('hidden')
  })
})


// elements
/* global Swiper, jQuery */

;(function ($) {
  'use strict'

  // document load event
  $(document).ready(function () {
    // initialize swiper when document ready
    // http://idangero.us/swiper/api/
    var $elem = $('.js__img-slider')
    $elem.each(function () {
      var time = $(this).attr('data-autoplay')
      var slider = new Swiper($(this), {
        nextButton: '.js__img-slider__btn-next',
        prevButton: '.js__img-slider__btn-prev',
        pagination: '.js__img-slider__pagination',
        paginationClickable: true,
        preloadImages: false,
        lazyLoading: true,
        watchSlidesVisibility: true,
        lazyLoadingInPrevNext: true,
        speed: 600,
        autoplay: time
      })
      // Makes it possible to skip between slider images if they have links, using the tab button
      slider.container.on('focus', 'a', function (e) {
        // Index of focused slide
        var focusIndex = $(e.target).parents('.swiper-slide').index()
        // Reset scrollLeft set by browser on focus
        slider.container.scrollLeft(0)

        // IE fix
        setTimeout(function () {
          slider.container.scrollLeft(0)
        }, 0)
        // Slide to focused slide
        slider.slideTo(focusIndex)
      })
    })
  })
})(jQuery)

/* global jQuery */

;(function ($) {
  'use strict'
  // document load event
  $(document).ready(function () {
    // initialize swiper when document ready
    // http://idangero.us/swiper/api/

    // Get json content from element LogoCarousel.html
    var ariaLabels = document.getElementsByClassName('js__aria-labels')
    if (ariaLabels && ariaLabels.length > 0) {
      // Use only first aria label object because they are all equal
      var label = JSON.parse(ariaLabels[0].innerHTML)

      $('.js__logo-carousel').each(function () {
        var swiper = $(this).swiper({
          nextButton: '.js__logo-carousel__btn-next',
          prevButton: '.js__logo-carousel__btn-prev',
          slidesPerView: 5,
          preloadImages: false,
          lazyLoading: true,
          watchSlidesVisibility: true,
          lazyLoadingInPrevNext: true,
          slideVisibleClass: 'is-visible',
          spaceBetween: 20,
          autoplay: $(this).data('autoplay'),
          a11y: true,
          prevSlideMessage: label.ariaLabel.prevSlideMessage,
          nextSlideMessage: label.ariaLabel.nextSlideMessage,
          firstSlideMessage: label.ariaLabel.firstSlideMessage,
          lastSlideMessage: label.ariaLabel.lastSlideMessage,
          paginationBulletMessage: label.ariaLabel.paginationBulletMessage,
          // Responsive breakpoints
          breakpoints: {
            // when window width is <= 480px
            480: {
              slidesPerView: 1
            },

            // when window width is <= 600px
            600: {
              slidesPerView: 2
            },

            // when window width is <= 768px
            768: {
              slidesPerView: 3
            },

            // when window width is <= 992px
            992: {
              slidesPerView: 4
            }
          }
        })
        // if the selected swipe is not visible when focused
        // put it into view
        $(swiper.slides).each(function (index, element) {
          $(element).on('focusin', function (e) {
            if ($(e.target).not('.is-visible')) {
              swiper.slideTo(index)
            }
          })
        })
      })
    }
  })
})(jQuery)

/* global jQuery */

;(function ($) {
  'use strict'

  // document load event
  $(document).ready(function () {
    // Parallax
    // https://github.com/nk-o/jarallax
    if (!$('html').hasClass('IE')) { // if the browser is not IE
      $('.parallax-img').jarallax({
        type: 'scroll', // scroll, scale, opacity, scroll-opacity, scale-opacity
        speed: 0.5
      })
      $('.parallax-resimg').each(function () {
        $(this).jarallax({
          type: 'scroll', // scroll, scale, opacity, scroll-opacity, scale-opacity
          speed: 0.5,
          imgSrc: $(this).css('background-image').match(/\(([^)]+)\)/)[1].replace(/"/g, '')
        })
      })
      $('.parallax-video').each(function () {
        $(this).jarallax({
          type: 'scroll', // scroll, scale, opacity, scroll-opacity, scale-opacity
          speed: 0.5,
          videoSrc: $(this).attr('data-video-url')
        })
      })
    } else { // disabled parallax in IE since scrolling looks jerky
      $('.parallax-img').jarallax({
        type: 'scroll', // scroll, scale, opacity, scroll-opacity, scale-opacity
        speed: 0.5,
        disableParallax: /IE/
      })
      $('.parallax-resimg').each(function () {
        $(this).jarallax({
          type: 'scroll', // scroll, scale, opacity, scroll-opacity, scale-opacity
          speed: 0.5,
          imgSrc: $(this).css('background-image').match(/\(([^)]+)\)/)[1].replace(/"/g, ''),
          disableParallax: /IE/
        })
      })
      $('.parallax-video').each(function () {
        $(this).jarallax({
          type: 'scroll', // scroll, scale, opacity, scroll-opacity, scale-opacity
          speed: 0.5,
          videoSrc: $(this).attr('data-video-url'),
          disableParallax: /IE/
        })
      })
    }
  })
})(jQuery)

/* global jQuery */

;(function ($) {
  'use strict'

  // document load event
  $(document).ready(function () {
    var $frame = $('.js__hero-image')
    // var $slider = $('.slider-container')
    $frame.each(function () {
      var self = $(this)
      var $p = self.find('.hero-image__caption-p')
      if ($p.length) {
        $p.dotdotdot({
          watch: 'window',
          height: 55
        })
      }
      if (!self.parents('.swiper-wrapper').length) {
        self.addClass('_animated')
      }
    })
  })
})(jQuery)

/* global Swiper,jQuery */
;(function ($) {
  'use strict'
  // document load event
  $(document).ready(function () {
    if ($('.slider-container').length > 0) {
      var $swiperContainerWrapper = $('.js__slider-container__wrapper')
      // dividing content into sliders
      $swiperContainerWrapper.each(function () {
        $(this).children().wrap('<div class="swiper-slide slider-container__slide js__slider-container__slide"></div>')
      })
      var $swiperContainer = $('.js__slider-container__container')
      // initialization of the Slider
      $swiperContainer.each(function () {
        var currentSlider = $(this)
        var time = currentSlider.attr('data-autoplay')
        var loopParam = currentSlider.attr('data-loop')
        var amountOfSlides = parseInt(currentSlider.attr('data-slidesperview'))
        var effectName = currentSlider.attr('data-effect')
        var transition = currentSlider.attr('data-speed')
        var widthForMobile
        var widthForTablet
        var widthForLaptop
        var widthForMediumLaptop
        if (amountOfSlides >= 4) {
          widthForMobile = 1
          widthForTablet = 2
          widthForLaptop = 3
          widthForMediumLaptop = 4
        } else if (amountOfSlides === 2) {
          widthForMobile = 1
          widthForTablet = 1
          widthForLaptop = 1
          widthForMediumLaptop = 2
        } else if (amountOfSlides === 1) {
          widthForMobile = 1
          widthForTablet = 1
          widthForLaptop = 1
          widthForMediumLaptop = 1
        } else {
          widthForMobile = 1
          widthForTablet = 2
          widthForLaptop = 2
          widthForMediumLaptop = 3
        }
        var slider = new Swiper(currentSlider, {
          containerModifierClass: 'swiper-container-',
          wrapperClass: 'js__slider-container__wrapper',
          slideClass: 'js__slider-container__slide',
          nextButton: currentSlider.parent().find('.js__slider-container__btn-next'),
          prevButton: currentSlider.parent().find('.js__slider-container__btn-prev'),
          pagination: currentSlider.parent().find('.js__slider-container__pagination'),
          paginationClickable: true,
          speed: parseInt(transition),
          loop: loopParam,
          autoplay: time,
          effect: effectName,
          watchSlidesVisibility: true,
          spaceBetween: 20,
          preloadImages: false,
          lazyLoading: true,
          lazyLoadingInPrevNext: true,
          slidesPerView: amountOfSlides,
          breakpoints: {
            // Responsive breakpoints
            480: {
              slidesPerView: widthForMobile
            },
            767: {
              slidesPerView: widthForTablet
            },
            992: {
              slidesPerView: widthForLaptop
            },
            1024: {
              slidesPerView: widthForMediumLaptop
            }
          },
          coverflow: {
            rotate: 90,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false
          },
          cube: {
            slideShadows: false,
            shadow: false
          },
          fade: {
            crossFade: true
          },
          flip: {
            slideShadows: false
          },
          onInit: function () {
            currentSlider.closest('.slider-container').css('height', 'auto')
            $('.slider-container_loader').css('display', 'none')
          }
        })
        // Makes it possible to skip between slider images if they have links, using the tab button
        slider.container.on('focus', 'a', function (e) {
          // Index of focused slide
          var focusIndex = $(e.target).parents('.slider-container__slide').index()
          // Reset scrollLeft set by browser on focus
          slider.container.scrollLeft(0)
          // IE fix
          setTimeout(function () {
            slider.container.scrollLeft(0)
          }, 0)
          // Slide to focused slide
          slider.slideTo(focusIndex)
        })
      })
    }
  })
})(jQuery)

/* global jQuery */

;(function ($) {
  'use strict'

  // document load event
  $(document).ready(function () {
    var $paragraph = $('.js__img-text-link')
    $paragraph.dotdotdot({
      height: 60
    })
  })
})(jQuery)

/* global jQuery */

;(function ($) {
  'use strict'
  // document load event
  $(document).ready(function () {
    $('.carousel').each(function () {
      var $this = $(this)
      var $quickLinks = $this.find('.carousel-indicators li')
      var $control = $this.find('.carousel-control')
      var $btn = $this.find('.carousel__btn')

      // Set tabindex on quicklinks on init
      $quickLinks.attr('tabindex', 0)

      // add handler to quickLinks to allow changing the slide via enter key
      $this.on('keydown', $quickLinks, function (e) {
        if (e.which === 13) {
          $(e.target).trigger('click')
        }
      })

      // Enable swipe for each carousel element
      $this.swipe({
        swipe: function (event, direction) {
          if (direction === 'left') {
            $this.carousel('next')
          }
          if (direction === 'right') {
            $this.carousel('prev')
          }
        },
        allowPageScroll: 'vertical'
      })

      // Pause carousel if it has focus
      if ($this.data('interval') !== false) {
        pauseCarouselOnFocus()
      }

      // After carousel slide update aria-selected and tab index
      $this.on('slid.bs.carousel', function (event) {
        setAriaOnQuickLinks()
        updateControlAriaLabel($(event.relatedTarget))
      })

      // Extend keydown function from carousel.js
      // Update quick link focus on keyboard use
      $.fn.carousel.Constructor.prototype.keydown = function (e) {
        if (/input|textarea/i.test(e.target.tagName)) return
        switch (e.which) {
          case 37:
            this.prev()
            updateFocusOnQuickLinks()
            break
          case 39:
            this.next()
            updateFocusOnQuickLinks()
            break
          default: return
        }

        e.preventDefault()
      }

        // Set aria-selected and tab index to true only for active item
      function setAriaOnQuickLinks () {
        $quickLinks.each(function () {
          var link = $(this)
          if (link.hasClass('active')) {
            link.attr('aria-selected', 'true')
          } else {
            link.attr('aria-selected', 'false')
          }
        })
      }

      // Set focus on active quick link item
      function updateFocusOnQuickLinks () {
        $quickLinks.each(function () {
          if ($(this).hasClass('active')) {
            $(this).focus()
          } else {
            $(this).blur()
          }
        })
      }

      // Detect carousel focus elements and pause when one is focused
      function pauseCarouselOnFocus () {
        $quickLinks.add($control).add($btn).each(function () {
          $(this).focus(function () {
            $this.carousel('pause')
          })
          $(this).blur(function () {
            $this.carousel('cycle')
          })
        })
      }

      // Update aria-label on prev and next button depending on active slide
      function updateControlAriaLabel (element) {
        var $slideLeft = $('.carousel-control.left')
        var $slideRight = $('.carousel-control.right')
        var nextLabel
        var prevLabel

        if (element.next().length) {
          nextLabel = element.next().attr('data-controllabel')
        } else {
          nextLabel = element.parent().children('.item').first().attr('data-controllabel')
        }

        if (element.prev().length) {
          prevLabel = element.prev().attr('data-controllabel')
        } else {
          prevLabel = element.parent().children('.item').last().attr('data-controllabel')
        }

        $slideLeft.attr('aria-label', prevLabel)
        $slideRight.attr('aria-label', nextLabel)
      }
    })
  })
})(jQuery)


// plugins
/* global jQuery */

;(function ($) {
  'use strict'

  // document load event
  $(document).ready(function () {
    // initialize swiper when document ready
    // http://idangero.us/swiper/api/
    $('.js__news-carousel').each(function () {
      $(this).swiper({
        nextButton: $(this).parent().find('.js__news-carousel__btn-next'),
        prevButton: $(this).parent().find('.js__news-carousel__btn-prev'),
        pagination: '.js__news-carousel__pagination',
        paginationClickable: true,
        slidesPerView: 4,
        preloadImages: false,
        spaceBetween: 30,

        // Responsive breakpoints
        breakpoints: {

          // when window width is <= 480px
          500: {
            slidesPerView: 1
          },
          // when window width is <= 768px
          767: {
            slidesPerView: 2
          },
          // when window width is <= 992px
          991: {
            slidesPerView: 3
          },
          // when window width is <= 1199px
          1199: {
            slidesPerView: 4
          }
        }
      })
    })
  })
})(jQuery)

/* global $ */

// news Timeline
$('.js__news-timeline__item').on('click', function (e) {
  if ($(this).hasClass('collapsed')) {
    e.preventDefault()
    $(this).removeClass('collapsed')
    $(this).closest('.js__news-timeline__item-wrp').find('.js__news-timeline__date').addClass('open')
  }
})

// news Cards
$('.js__news-cards__dotdotdot').dotdotdot({
  watch: 'window'
})

// news Simple list
$('.js__news-simple-list__dotdotdot').dotdotdot({
  watch: 'window'
})


/* global forceEnableSuggest, Awesomplete, touchSupport, jQuery */

// container for Search suggestion data
var mainSearchInputList = {}

;(function ($) {
  'use strict'

  // init function
  var searchSuggestFn = function () {
    // ============================
    // Search Suggest DATA-API
    // ============================
    $('[data-search="searchSuggest"]').each(function (index, el) {
      mainSearchInputList['searchItem' + index] = new Awesomplete(el, {
        list: [],
        maxItems: 20,
        minChars: 2,
        autoFirst: true
      })
      var req = false

      $(this).on('keyup.search.suggest', function (e) {
        var c = e.keyCode
        if (c === 13 || c === 27 || c === 38 || c === 40) {
          return
        }
        var that = $(this)
        var fetchSuggestData = function () {
          if (!req) {
            req = true
            $.ajax({
              url: that.closest('form').data('suggest'),
              dataType: 'jsonp',
              jsonp: 'tx_solr[callback]',
              data: {
                tx_solr: {
                  queryString: that.val().toLowerCase()
                }
              },
              success: function (data) {
                var suggestions = data.suggestions || []

                req = false
                var arrr = []
                $.each(suggestions, function (term) {
                  arrr.push(term)
                })
                mainSearchInputList['searchItem' + index]._list = arrr
                mainSearchInputList['searchItem' + index].evaluate()
              }
            })
          }
        }
        typeof $(this).closest('form').data('suggest') !== 'undefined' && fetchSuggestData() // eslint-disable-line
      })
      $(this).on('awesomplete-selectcomplete', function () {
        $(this).closest('form').submit()
      })
    })
    // =============end==============
  }

  // document load event
  $(document).ready(function () {
    // Make it possible to enable suggest even on devices with touch support
    // by setting var forceEnableSuggest = true;
    var overrideTouchSupport = typeof forceEnableSuggest !== 'undefined' ? forceEnableSuggest : false

    if ((!touchSupport || overrideTouchSupport) && $(window).width() >= 992) {
      searchSuggestFn()
    }
  })
})(jQuery)


// ########## general.js ###########
/* global jQuery */
/* global objectFitImages */

;(function ($) {
  'use strict'

  // document load event
  $(document).ready(function () {
    // Image Lightbox
    // initialize simpleLightbox when document ready
    // https://github.com/andreknieriem/simplelightbox
    $("div[class*='lightbox__wrp-']").each(function () {
      $(this).find('.lightbox').simpleLightbox({
        captionType: 'data',
        captionsData: 'caption',
        captionPosition: 'outside',
        heightRatio: 0.6
      })
    })
  })

  // Apply dotdotdot.js jquery function on elements with ".js__dotdotdot" class.
  var $dotdotdot = $('.js__dotdotdot')

  if ($dotdotdot.length) {
    $dotdotdot.each(function () {
      $(this).dotdotdot({
        watch: 'window'
      })
    })
  }

  // call object-fit-images plugin
  objectFitImages()
})(jQuery)

// ^^^^^^^^^^ general.js ^^^^^^^^^^^

