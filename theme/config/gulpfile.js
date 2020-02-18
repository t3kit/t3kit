const { series, parallel } = require('gulp')
const { clean } = require('./clean')
const { compileCss, compileCssWatch } = require('./sass')
const { compileJs, compileJsWatch } = require('./rollup')
const { revJs } = require('./rev')
const { addJsTemplate, addCssTemplate } = require('./template')
const { compressCss, compressJs } = require('./compress')
const { serve } = require('./browser-sync')

if (process.env.NODE_ENV === 'production') {
  exports.build = series(
    clean,
    parallel(compileCss, compileJs),
    revJs,
    parallel(addJsTemplate, addCssTemplate),
    parallel(compressCss, compressJs)
  )
} else {
  exports.build = series(
    clean,
    parallel(compileCss, compileJs),
    parallel(addJsTemplate, addCssTemplate)
  )
}

exports.default = series(
  clean,
  parallel(compileCss, compileJs),
  parallel(addJsTemplate, addCssTemplate),
  parallel(compileCssWatch, compileJsWatch, serve)
)
