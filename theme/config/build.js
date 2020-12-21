const { clean } = require('./clean')
const { compileCss } = require('./css')
const { compileScss } = require('./sass')
const { compileJs } = require('./rollup')
const { addCssTemplate, addJsTemplate } = require('./template')
const { compressCss, compressJs } = require('./compress')
const { revCss, revJs } = require('./rev')
const utils = require('./utils')
const conf = require('./conf')

async function build () {
  const timeStart = utils.mainTaskStart(`build [${conf.CONTEXT}]`)
  await clean()
  await compileScss()
  await Promise.all([compileCss(), compileJs()])
  if (process.env.NODE_ENV === 'production') {
    await Promise.all([revCss(), revJs()])
    await Promise.all([addCssTemplate(), addJsTemplate()])
    // await Promise.all([compressCss(), compressJs()])
  } else {
    await Promise.all([addCssTemplate(), addJsTemplate()])
  }
  // console.log(`${utils.end('build')} s`)
  utils.mainTaskEnd(`build [${conf.CONTEXT}]`, timeStart)
}
build()
