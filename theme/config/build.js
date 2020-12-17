const { clean } = require('./clean')
const { compileCss } = require('./css')
const { compileJs } = require('./rollup')
const { addCssTemplate, addJsTemplate } = require('./template')
const { compressCss, compressJs } = require('./compress')
const { revCss, revJs } = require('./rev')

async function build () {
  await clean()
  await Promise.all([compileCss(), compileJs()])
  if (process.env.NODE_ENV === 'production') {
    await Promise.all([revCss(), revJs()])
    await Promise.all([addCssTemplate(), addJsTemplate()])
    await Promise.all([compressCss(), compressJs()])
  } else {
    await Promise.all([addCssTemplate(), addJsTemplate()])
  }
}
build()
