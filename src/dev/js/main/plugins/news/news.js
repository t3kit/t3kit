/* global $ */

// news Timeline
$('.js__news-timeline__item').on('click', function (e) {
  if ($(this).hasClass('collapsed')) {
    e.preventDefault()
    $(this).removeClass('collapsed')
    $(this).closest('.js__news-timeline__item-wrp').find('.js__news-timeline__date').addClass('open')
  }
})

// news Cards
$('.js__news-cards__dotdotdot').dotdotdot({
  watch: 'window'
})

// news Simple list
$('.js__news-simple-list__dotdotdot').dotdotdot({
  watch: 'window'
})
