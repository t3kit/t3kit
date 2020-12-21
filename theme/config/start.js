const conf = require('./conf')
const utils = require('./utils')
const { clean } = require('./clean')
const { compileCss } = require('./css')
const { compileScss } = require('./sass')
const { compileJs } = require('./rollup')
const { addCssTemplate, addJsTemplate } = require('./template')
const { compressCss, compressJs } = require('./compress')
const { revCss, revJs } = require('./rev')
// const fsPromises = require('fs').promises
// const pSeries = require('p-series')


// async function addTemplate () {
//   await Promise.all([compileCss(), compileJs()])
// }

// async function compile () {
//   await Promise.all([addCssTemplate(), addJsTemplate()])
// }
// async function starts () {
//   try {
//     await clean()
//     // await compile()
//     // await addTemplate()
//     await compileCss()
//     // console.log('🚀 ~ file: start.js ~ line 22 ~ starts ~ lll', lll)
//     const kkk = await compressCss
//     console.log('🚀 ~ file: start.js ~ line 24 ~ starts ~ kkk', kkk)
//     // await addCssTemplate()
//     // await Promise.all([compileCss(), compileJs()])
//     // await Promise.all([addCssTemplate(), addJsTemplate()])
//   } catch (error) {
//     console.error('(start) Error:', error)
//   }
// }
async function start () {
  // const tasks = [
  //   async () => await compileCss(),
  //   async () => await addCssTemplate()
  // ]
  // await pSeries(tasks)
  await clean()
  await compileScss()
  await Promise.all([compileCss(), compileJs()])
  // await Promise.all([revCss(), revJs()])
  await Promise.all([addCssTemplate(), addJsTemplate()])
  // await Promise.all([compressCss(), compressJs()])

  // await compressCss
}
start()
