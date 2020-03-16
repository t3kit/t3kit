const { dest, src, parallel, series } = require('gulp')
const size = require('gulp-size')
const gulpBrotli = require('gulp-brotli')
const gulpGzip = require('gulp-gzip')
const conf = require('../conf')

// compress with brotli
function brotliCss () {
  return src(`${conf.CSS_DIST}**/*.css`)
    .pipe(gulpBrotli())
    .pipe(size({ showFiles: true }))
    .pipe(dest(conf.CSS_DIST))
}
function brotliJs () {
  return src(`${conf.JS_DIST }**/*.js`)
    .pipe(gulpBrotli())
    .pipe(size({ showFiles: true }))
    .pipe(dest(conf.JS_DIST ))
}

// compress with gzip
function gzipCss () {
  return src(`${conf.CSS_DIST}**/*.css`)
    .pipe(gulpGzip())
    .pipe(size({ showFiles: true }))
    .pipe(dest(conf.CSS_DIST))
}
function gzipJs () {
  return src(`${conf.JS_DIST }**/*.js`)
    .pipe(gulpGzip())
    .pipe(size({ showFiles: true }))
    .pipe(dest(conf.JS_DIST ))
}

exports.compressCss = parallel(brotliCss, gzipCss)
exports.compressJs = series(brotliJs, gzipJs)
