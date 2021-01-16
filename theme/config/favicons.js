require('./check').checkNode()
const utils = require('./utils')
const { cleanFavicons } = require('./clean')
const { generateFavicons } = require('./real-favicon')

async function favicons () {
  const timeStart = utils.mainTaskStart('Add favicons task')
  await cleanFavicons()
  await generateFavicons()
  utils.mainTaskEnd({ taskName: 'Add favicons task', timeStart: timeStart, skipContext: true })
}
favicons()
