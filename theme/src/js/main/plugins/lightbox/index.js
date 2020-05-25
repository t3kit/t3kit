import SimpleLightbox from 'simplelightbox'

const simpleLightbox = function (className, options) {
  return new SimpleLightbox(className, options)
}

// simpleLightbox for picture partial
simpleLightbox('.picture-partial__zoom-link', {
  captionSelector: 'self',
  captionType: 'data',
  captionsData: 'caption'
})

// simpleLightbox for image partial
simpleLightbox('.image-partial__zoom-link', {
  captionSelector: 'self',
  captionType: 'data',
  captionsData: 'caption'
})
