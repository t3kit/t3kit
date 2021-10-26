import { localConf } from './localconf/index.js'
import { checkNode } from './check/node.js'
import { cleanFileTypeIcons } from './clean/index.js'
import { copyFileTypeIcons } from './copy/index.js'
import * as utils from './utils/index.js'
checkNode()

async function fileTypeIcons () {
  const timeStart = utils.mainTaskStart('Add filetype icons task')
  await cleanFileTypeIcons(localConf)
  await copyFileTypeIcons(localConf)
  utils.mainTaskEnd({ taskName: 'Add filetype icons task', timeStart: timeStart, skipContext: true })
}
fileTypeIcons()
