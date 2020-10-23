// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination, A11y } from 'swiper'

// configure Swiper to use modules
Swiper.use([Navigation, Pagination, A11y])

const swiper = function (className, options) {
  return new Swiper(className, options)
}

swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  autoplay: {
    delay: 3000
  },
  a11y: {
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide'
  },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination'
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
})
