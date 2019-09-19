/* global forceEnableSuggest, Awesomplete, touchSupport, jQuery */

// container for Search suggestion data
var mainSearchInputList = {}

;(function ($) {
  'use strict'

  // init function
  var searchSuggestFn = function () {
    // ============================
    // Search Suggest DATA-API
    // ============================
    $('[data-search="searchSuggest"]').each(function (index, el) {
      mainSearchInputList['searchItem' + index] = new Awesomplete(el, {
        list: [],
        maxItems: 20,
        minChars: 2,
        autoFirst: true
      })
      var req = false

      $(this).on('keyup.search.suggest', function (e) {
        var c = e.keyCode
        if (c === 13 || c === 27 || c === 38 || c === 40) {
          return
        }
        var that = $(this)
        var fetchSuggestData = function () {
          if (!req) {
            req = true
            $.ajax({
              url: that.closest('form').data('suggest'),
              dataType: 'jsonp',
              jsonp: 'tx_solr[callback]',
              data: {
                tx_solr: {
                  queryString: that.val().toLowerCase()
                }
              },
              success: function (data) {
                var suggestions = data.suggestions || []

                req = false
                var arrr = []
                $.each(suggestions, function (term) {
                  arrr.push(term)
                })
                mainSearchInputList['searchItem' + index]._list = arrr
                mainSearchInputList['searchItem' + index].evaluate()
              }
            })
          }
        }
        typeof $(this).closest('form').data('suggest') !== 'undefined' && fetchSuggestData() // eslint-disable-line
      })
      $(this).on('awesomplete-selectcomplete', function () {
        $(this).closest('form').submit()
      })
    })
    // =============end==============
  }

  // document load event
  $(document).ready(function () {
    // Make it possible to enable suggest even on devices with touch support
    // by setting var forceEnableSuggest = true;
    var overrideTouchSupport = typeof forceEnableSuggest !== 'undefined' ? forceEnableSuggest : false

    if ((!touchSupport || overrideTouchSupport) && $(window).width() >= 992) {
      searchSuggestFn()
    }
  })
})(jQuery)
