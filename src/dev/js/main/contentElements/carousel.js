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
