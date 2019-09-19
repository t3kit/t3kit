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
