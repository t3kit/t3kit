import { localConf } from './localconf.js'
import { checkNode } from './modules/check.js'
import { cleanFavicons } from './modules/clean.js'
import { generateFavicons } from './modules/real-favicon.js'
import * as utils from './modules/utils.js'
checkNode()

async function favicons () {
  const timeStart = utils.mainTaskStart('Add favicons task')
  await cleanFavicons(localConf)
  await generateFavicons(localConf)
  utils.mainTaskEnd({ taskName: 'Add favicons task', timeStart: timeStart, skipContext: true })
}
favicons()
