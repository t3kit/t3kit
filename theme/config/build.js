const localConf = require('./localConf')
require('./check/dependencies').checkDependencies(localConf)
require('./check/node').checkNode()

const { clean } = require('./clean')
const { compileCss } = require('./css')
const { compileScss } = require('./sass')
const { compileJs } = require('./rollup')
const { addCssTemplate, addJsTemplate } = require('./template')
const { compressCss, compressJs } = require('./compress')
const { revCss, revJs } = require('./rev')
const utils = require('./utils')

async function build () {
  const timeStart = utils.mainTaskStart('Build task')
  await clean(localConf)
  await compileScss(localConf)
  await Promise.all([compileCss(localConf), compileJs(localConf)])
  if (process.env.NODE_ENV === 'production') {
    await Promise.all([revCss(localConf), revJs(localConf)])
    await Promise.all([addCssTemplate(localConf), addJsTemplate(localConf)])
    await Promise.all([compressCss(localConf), compressJs(localConf)])
  } else {
    await Promise.all([addCssTemplate(localConf), addJsTemplate(localConf)])
  }

  utils.mainTaskEnd({ taskName: 'Build task', timeStart: timeStart })
}
build()
