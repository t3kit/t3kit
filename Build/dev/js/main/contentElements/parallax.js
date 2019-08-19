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
