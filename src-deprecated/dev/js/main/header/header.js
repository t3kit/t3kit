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
