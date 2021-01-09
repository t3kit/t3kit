const { clean } = require('./clean')
const { compileCss } = require('./css')
const { compileScss } = require('./sass')
const { compileJs } = require('./rollup')
const { addCssTemplate, addJsTemplate } = require('./template')
const { compressCss, compressJs } = require('./compress')
const { revCss, revJs } = require('./rev')
const utils = require('./utils')
const chokidar = require('chokidar')
const { async } = require('hasha')

// One-liner for current directory
// (async () => {
  // })()
  // chokidar.watch('Resources/Public/assets/development/Css/*.css').on('change', (event, path) => {
  //   // console.log(event, path)
  //   addCssTemplate()
  //   // await addCssTemplate()
  // })

chokidar.watch(['theme/src/css/**/*.css', 'theme/src/vendor/css/*.css'], { ignoreInitial: true, awaitWriteFinish: true }).on('all', (event, path) => {
  console.log(event, path)
  compileCss()
  // await addCssTemplate()
})

chokidar.watch('theme/src/scss/**/*.scss', { ignoreInitial: true }).on('all', (event, path) => {
  console.log(event, path)
  compileScss()
  // await addCssTemplate()
})

