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
