import { localConf } from './localconf.js'
import { checkNode } from './modules/check.js'
import { cleanFileTypeIcons } from './modules/clean.js'
import { copyFileTypeIcons } from './modules/copy.js'
import * as utils from './modules/utils.js'
checkNode(localConf)

async function fileTypeIcons () {
  const timeStart = utils.mainTaskStart('Add filetype icons task')
  await cleanFileTypeIcons(localConf)
  await copyFileTypeIcons(localConf)
  utils.mainTaskEnd({ taskName: 'Add filetype icons task', timeStart: timeStart, skipContext: true })
}
fileTypeIcons()
