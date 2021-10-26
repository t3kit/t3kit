import { localConf } from './localconf/index.js'
import { checkNode } from './check/node.js'
import { cleanIcons } from './clean/index.js'
import { copyIcons } from './copy/index.js'
import * as utils from './utils/index.js'
checkNode()

async function icons () {
  const timeStart = utils.mainTaskStart('Add icons task')
  await cleanIcons(localConf)
  await copyIcons(localConf)
  utils.mainTaskEnd({ taskName: 'Add icons task', timeStart: timeStart, skipContext: true })
}
icons()
