import { localConf } from './localconf.js'
import { checkNode } from './modules/check.js'
import { cleanIcons } from './modules/clean.js'
import { copyIcons } from './modules/copy.js'
import * as utils from './modules/utils.js'
checkNode()

async function icons () {
  const timeStart = utils.mainTaskStart('Add icons task')
  await cleanIcons(localConf)
  await copyIcons(localConf)
  utils.mainTaskEnd({ taskName: 'Add icons task', timeStart: timeStart, skipContext: true })
}
icons()
