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
