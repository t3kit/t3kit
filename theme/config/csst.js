// const { clean } = require('./clean')
// const { compileCss } = require('./css')
// const { compileScss } = require('./sass')
// const { compileJs } = require('./rollup')
// const { addCssTemplate, addJsTemplate } = require('./template')
// const { compressCss, compressJs } = require('./compress')
// const { revCss, revJs } = require('./rev')
// const utils = require('./utils')
// const chokidar = require('chokidar')
// const { promisify } = require('util')
const cssom = require('cssom')
// const pipe = promisify(cssom)
const fsPromises = require('fs').promises
const pEachSeries = require('p-each-series')
const size = require('filesize')
const sass = require('sass')
const conf = require('./conf')
const utils = require('./utils')

// const test = cssom.parse('theme/src/css/main.css')
// console.log('🚀 ~ file: csst.js ~ line 13 ~ test', test)
// One-liner for current directory
// (async () => {
  // })()
  // chokidar.watch('Resources/Public/assets/development/Css/*.css').on('change', (event, path) => {
  //   // console.log(event, path)
  //   addCssTemplate()
  //   // await addCssTemplate()



function cssomPromise (css) {
  return new Promise((resolve) => {
    const result = cssom.parse(css)
    resolve(result)
    // resolve(cssom.parse(css))
  })
}




  // function sassPromise (fileName) {
  //   return new Promise((resolve, reject) => {
  //     sass.render({ file: fileName }, function (error, result) {
  //       if (error) {
  //         utils.errLogFn(error.message, 'sassPromise', `${fileName}`, true)
  //         reject(error)
  //       } else {
  //         resolve(result)
  //       }
  //     })
  //   })
  // }
  async function rrrr () {
    try {
      // const timeStart = utils.start('cssom', 'magenta')
      // const fileList = []

      const css = await fsPromises.readFile(`${conf.CSS_SRC}main.css`, 'utf8')
      const cssRules = await cssomPromise(css)
      // console.log('🚀 ~ file: csst.js ~ line 61 ~ rrrr ~ cssRules', cssRules.cssRules)
      // const files = await utils.getFileList(`${conf.CSS_SRC}main.css`)
      await pEachSeries(cssRules.cssRules, async (val, index) => {
        // console.log('🚀 ~ file: csst.js ~ line 64 ~ awaitpEachSeries ~ val', val)
        if (val.constructor.name === 'CSSImportRule') {
          // val.href
          console.log('🚀 ~ file: csst.js ~ line 66 ~ awaitpEachSeries ~ val.href', val.href)
        }
      })
        // const result = cssom.parse(css)
        // const result = cssom.parse(css).cssRules[0].constructor.name
        // const result = await pipe.parse(css).cssRules[0].constructor.name

        // console.log('🚀 ~ file: csst.js ~ line 55 ~ //awaitpEachSeries ~ result', result)
        // console.log('🚀 ~ file: csst.js ~ line 54 ~ //awaitpEachSeries ~ cssResult', cssResult)
        // const fileName = `${file.name.slice(0, -5)}.css`
        // await fsPromises.writeFile(`${conf.SCSS_DIST}${fileName}`, scssResult.css)
        // const fileStats = await fsPromises.stat(`${conf.SCSS_DIST}${fileName}`)
        // fileList[index] = { name: `src/vendor/css/${fileName}`, size: size(fileStats.size) }
      // })

      // utils.boxEnd(fileList, 'cssom', timeStart, 'magenta', false)
    } catch (error) {
      utils.errLogFn(error, 'cssom')
    }
  }

  rrrr()
  // exports.compileScss = compileScss
