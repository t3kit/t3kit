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
