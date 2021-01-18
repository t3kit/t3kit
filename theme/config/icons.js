const localConf = require('./localConf')
require('./check/dependencies').checkDependencies(localConf)
require('./check/node').checkNode()

const utils = require('./utils')
const { cleanIcons } = require('./clean')
const { copyIcons } = require('./copy')

async function icons () {
  const timeStart = utils.mainTaskStart('Add icons task')
  await cleanIcons(localConf)
  await copyIcons(localConf)
  utils.mainTaskEnd({ taskName: 'Add icons task', timeStart: timeStart, skipContext: true })
}
icons()
