const localConf = require('./localConf')
require('./check/dependencies').checkDependencies(localConf)
require('./check/node').checkNode()

const utils = require('./utils')
const { cleanFavicons } = require('./clean')
const { generateFavicons } = require('./real-favicon')

async function favicons () {
  const timeStart = utils.mainTaskStart('Add favicons task')
  await cleanFavicons(localConf)
  await generateFavicons(localConf)
  utils.mainTaskEnd({ taskName: 'Add favicons task', timeStart: timeStart, skipContext: true })
}
favicons()
