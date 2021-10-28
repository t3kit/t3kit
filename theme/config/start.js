
import { localConf } from './localconf.js'
import { checkNode } from './modules/check.js'
import { clean } from './modules/clean.js'
import { compileCss } from './modules/css.js'
import { compileScss } from './modules/sass.js'
import { compileJs } from './modules/rollup.js'
import { addCssTemplate, addJsTemplate } from './modules/template.js'
import { watchAll } from './modules/watch.js'
import * as utils from './modules/utils.js'
checkNode(localConf)

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
