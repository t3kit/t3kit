require('./check').checkNode()
const utils = require('./utils')
const { cleanBootstrapIcons } = require('./clean')
const { copyBootstrapIcons } = require('./copy')

async function icons () {
  const timeStart = utils.mainTaskStart('Add icons task')
  await cleanBootstrapIcons()
  await copyBootstrapIcons()
  // add more icons here
  // ...
  utils.mainTaskEnd({ taskName: 'Add icons task', timeStart: timeStart, skipContext: true })
}
icons()
