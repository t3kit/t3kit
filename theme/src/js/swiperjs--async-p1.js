// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination, A11y } from 'swiper'

// configure Swiper to use modules
Swiper.use([Navigation, Pagination, A11y])

const swiper = function (className, options) {
  return new Swiper(className, options)
}

swiper('.t3kit-swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  a11y: {
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide'
  },
  // If we need pagination
  pagination: {
    el: '.t3kit-swiper-pagination',
    clickable: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.t3kit-swiper-button-next',
    prevEl: '.t3kit-swiper-button-prev'
  }
})
