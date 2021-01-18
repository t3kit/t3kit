
const localConf = require('./localConf')
require('./check/dependencies').checkDependencies(localConf)
require('./check/node').checkNode()

const utils = require('./utils')
const { clean } = require('./clean')
const { compileCss } = require('./css')
const { compileScss } = require('./sass')
const { compileJs } = require('./rollup')
const { addCssTemplate, addJsTemplate } = require('./template')
const { watchAll } = require('./watch')

async function start () {
  const timeStart = utils.mainTaskStart('Build task')
  await clean(localConf)
  await compileScss(localConf)
  await Promise.all([compileCss(localConf), compileJs(localConf)])
  await Promise.all([addCssTemplate(localConf), addJsTemplate(localConf)])
  utils.mainTaskEnd({ taskName: 'Build task', timeStart: timeStart })
  await watchAll(localConf)
  console.log('Watching files...')
}
start()
