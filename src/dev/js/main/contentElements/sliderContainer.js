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
