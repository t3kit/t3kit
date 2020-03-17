
require('./check').checkNode()
const { series, parallel } = require('gulp')
const { clean, cleanFavicons } = require('./clean')
const { compileCss, compileCssWatch } = require('./sass')
const { compileJs, compileJsWatch } = require('./rollup')
const { revJs } = require('./rev')
const { addJsTemplate, addCssTemplate } = require('./template')
const { compressCss, compressJs } = require('./compress')
const { serve } = require('./browser-sync')
const { generateFavicon, injectFaviconMarkups } = require('./real-favicon')
const conf = require('./conf')

if (process.env.NODE_ENV === 'production') {
  exports.build = series(
    clean,
    parallel(compileCss, compileJs),
    revJs,
    parallel(addJsTemplate, addCssTemplate),
    parallel(compressCss, compressJs),
    conf.showInfo
  )
} else {
  exports.build = series(
    clean,
    parallel(compileCss, compileJs),
    parallel(addJsTemplate, addCssTemplate),
    conf.showInfo
  )
}

exports.default = series(
  clean,
  parallel(compileCss, compileJs),
  parallel(addJsTemplate, addCssTemplate),
  conf.showInfo,
  parallel(compileCssWatch, compileJsWatch, serve)
)

exports.favicons = series(
  cleanFavicons,
  generateFavicon,
  injectFaviconMarkups,
  conf.showInfo
)
