import 'awesomplete'

const mainSearchInputList = {}

const searchSuggestFn = function () {
  // find input
  const searchSuggest = document.querySelectorAll('[data-suggest] input')
  const searchButtonToggle = document.querySelectorAll('[id="search-toggle-btn"]')

  searchSuggest.forEach(myFunction)

  function myFunction (el, index) {
    const thisSearchSuggest = searchSuggest[index]
    const thisSearchButtonToggle = searchButtonToggle[index]

    mainSearchInputList['searchItem' + index] = new window.Awesomplete(el, {
      list: [],
      maxItems: 20,
      minChars: 2,
      autoFirst: false
    })

    // Prevent submit of empty search form
    thisSearchSuggest.closest('form').addEventListener('submit', function (e) {
      if (thisSearchSuggest.value === '') {
        e.preventDefault()
        thisSearchSuggest.focus()
      }
    })

    // Add focus to input when clicking on toggle button
    if (thisSearchButtonToggle) {
      thisSearchButtonToggle.addEventListener('click', function (e) {
        setTimeout(function () {
          thisSearchSuggest.focus()
        }, 500)
      })
    }

    thisSearchSuggest.addEventListener('keyup', logKey)

    function logKey (e) {
      const c = e.keyCode
      if (c === 13 || c === 27 || c === 38 || c === 40) {
        return
      }

      const getJSON = function (input) {
        return new Promise(function (resolve, reject) {
          const xhr = new window.XMLHttpRequest()
          const url = thisSearchSuggest.closest('form').dataset.suggest
          const params = '&tx_solr[queryString]='

          xhr.open('get', url + params + input, true)
          xhr.responseType = 'json'
          xhr.onload = function () {
            const status = xhr.status
            if (status === 200) {
              if (xhr.response.suggestions) {
                resolve(xhr.response.suggestions)
              } else {
                reject(status)
              }
            } else {
              reject(status)
            }
          }
          xhr.send()
        })
      }

      typeof thisSearchSuggest.closest('form').dataset.suggest !== 'undefined' && getJSON(thisSearchSuggest.value.toLowerCase()).then(function (data) {
        const suggestions = Object.keys(data)
        mainSearchInputList['searchItem' + index]._list = suggestions
        mainSearchInputList['searchItem' + index].evaluate()
      }, function (status) {
        console.log('something went wrong, probably bad search query')
      })
    }

    thisSearchSuggest.addEventListener('awesomplete-selectcomplete', function () {
      thisSearchSuggest.closest('form').submit()
    })
  }
}

function docReady (fn) {
  // see if DOM is already available
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // call on next available tick
    setTimeout(fn, 1)
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

docReady(function () {
  searchSuggestFn()
})
