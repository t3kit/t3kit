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
      
      if (!self.parents('.swiper-wrapper').length) {
        self.addClass('_animated')
      }
    })
  })
})(jQuery)
