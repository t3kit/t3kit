
import { localConf } from './localconf/index.js'
import { checkNode } from './check/node.js'
import { clean } from './clean/index.js'
import { compileCss } from './css/index.js'
import { compileScss } from './sass/index.js'
import { compileJs } from './rollup/index.js'
import { addCssTemplate, addJsTemplate } from './template/index.js'
import { watchAll } from './watch/index.js'
import * as utils from './utils/index.js'
checkNode()

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
