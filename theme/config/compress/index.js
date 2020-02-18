const { dest, src, parallel, series } = require('gulp')
const size = require('gulp-size')
const gulpBrotli = require('gulp-brotli')
const gulpGzip = require('gulp-gzip')
const vars = require('../vars')

const CSS_DIST = `${vars.DIST}${vars.CSS_DIST}`
const JS_DIST = `${vars.DIST}${vars.JS_DIST}`

// compress with brotli
function brotliCss () {
  return src(`${CSS_DIST}**/*.css`)
    .pipe(gulpBrotli())
    .pipe(size({ showFiles: true }))
    .pipe(dest(CSS_DIST))
}
function brotliJs () {
  return src(`${JS_DIST}**/*.js`)
    .pipe(gulpBrotli())
    .pipe(size({ showFiles: true }))
    .pipe(dest(JS_DIST))
}

// compress with gzip
function gzipCss () {
  return src(`${CSS_DIST}**/*.css`)
    .pipe(gulpGzip())
    .pipe(size({ showFiles: true }))
    .pipe(dest(CSS_DIST))
}
function gzipJs () {
  return src(`${JS_DIST}**/*.js`)
    .pipe(gulpGzip())
    .pipe(size({ showFiles: true }))
    .pipe(dest(JS_DIST))
}

exports.compressCss = parallel(brotliCss, gzipCss)
exports.compressJs = series(brotliJs, gzipJs)
