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
