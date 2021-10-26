import { localConf } from './localconf/index.js'
import { checkNode } from './check/node.js'
import { cleanFavicons } from './clean/index.js'
import { generateFavicons } from './real-favicon/index.js'
import * as utils from './utils/index.js'
checkNode()

async function favicons () {
  const timeStart = utils.mainTaskStart('Add favicons task')
  await cleanFavicons(localConf)
  await generateFavicons(localConf)
  utils.mainTaskEnd({ taskName: 'Add favicons task', timeStart: timeStart, skipContext: true })
}
favicons()
