const utils = require('./utils')
const { clean } = require('./clean')
const { compileCss } = require('./css')
const { compileScss } = require('./sass')
const { compileJs } = require('./rollup')
const { addCssTemplate, addJsTemplate } = require('./template')
const { watchAll } = require('./watch')

async function start () {
  const timeStart = utils.mainTaskStart('Development task')
  await clean()
  await compileScss()
  await Promise.all([compileCss(), compileJs()])
  await Promise.all([addCssTemplate(), addJsTemplate()])
  utils.mainTaskEnd('Development task', timeStart)
  await watchAll()
  console.log('Watching files...')
}
start()
