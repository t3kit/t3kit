
require('./check').checkNode()
const { series, parallel, watch } = require('gulp')

const { clean, cleanFavicons, cleanBootstrapIcons, cleanFileTypeIcons } = require('./clean')
const { copyBootstrapIcons, copyFileTypeIcons } = require('./copy')
const { compileScss, compileScssWatch } = require('./sass')
const { compileCss, compileCssWatch } = require('./css')
const { compileJs, compileJsWatch } = require('./rollup')
const { revJs, revCsss } = require('./rev')
const { addJsTemplate, addCssTemplate } = require('./template')
// const { addCssTemplate222 } = require('./222')
const { compressCss, compressJs } = require('./compress')
// // const { serve } = require('./browser-sync')
const { generateFavicon, injectFaviconMarkups } = require('./real-favicon')
const conf = require('./conf')
const { ensureTmpDir } = require('./helpers')
ensureTmpDir()


function watchFiles () {
  watch([`${conf.SCSS_SRC}**/*.scss`], series(compileScss, compileCss))
  watch([`${conf.CSS_SRC}**/*.css`], series(compileCss, addCssTemplate))
  watch([`${conf.JS_SRC}**/*.js`], series(compileJs, addJsTemplate))
}
// // Watch files
// function watchFiles() {
//   gulp.watch("./assets/scss/**/*", css);
//   gulp.watch("./assets/js/**/*", gulp.series(scriptsLint, scripts));
//   gulp.watch(
//     [
//       "./_includes/**/*",
//       "./_layouts/**/*",
//       "./_pages/**/*",
//       "./_posts/**/*",
//       "./_projects/**/*"
//     ],
//     gulp.series(jekyll, browserSyncReload)
//   );
//   gulp.watch("./assets/img/**/*", images);
// }


if (process.env.NODE_ENV === 'production') {
  exports.build = series(
    clean,
    compileScss,
    parallel(compileCss, compileJs),
    parallel(revCsss, revJs),
    parallel(addCssTemplate, addJsTemplate),
    parallel(compressCss, compressJs)
  )
} else {
  exports.build = series(
    clean,
    compileScss,
    parallel(compileCss, compileJs),
    parallel(addCssTemplate, addJsTemplate)
  )
}

exports.default = series(
  clean,
  compileScss,
  parallel(compileCss, compileJs),
  parallel(addCssTemplate, addJsTemplate),
  watchFiles
  // parallel(compileCssWatch, compileJsWatch, compileScssWatch)
  // compileScssWatch,
  // compileCssWatch,
  // compileJsWatch
)

exports.favicons = series(
  cleanFavicons,
  generateFavicon,
  injectFaviconMarkups
)

exports.icons = series(
  cleanBootstrapIcons,
  copyBootstrapIcons
)

exports.filetype = series(
  cleanFileTypeIcons,
  copyFileTypeIcons
)

// exports.testt = series(
//   clean,
//   // compileJs
//   // parallel(compileCss, compileJs),
//   parallel(compileJs),
//   parallel(addJsTemplate)
//   // parallel(addJsTemplate, addCssTemplate)
//   // conf.showInfo
// )


