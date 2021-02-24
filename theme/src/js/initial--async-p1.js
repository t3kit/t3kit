// ==============================
// initial JS file, should be first in js order if other scripts depenes on it
// ==============================

// use global variable as an alias for window obj. Needed for simpleLightbox pligin
window.global = window

// create an empty function with Popper name to skip errors in the Bootstrap dropdown js
window.Popper = () => {}
