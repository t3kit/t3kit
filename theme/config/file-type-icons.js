const localConf = require('./localConf')
require('./check/dependencies').checkDependencies(localConf)
require('./check/node').checkNode()

const utils = require('./utils')
const { cleanFileTypeIcons } = require('./clean')
const { copyFileTypeIcons } = require('./copy')

async function fileTypeIcons () {
  const timeStart = utils.mainTaskStart('Add filetype icons task')
  await cleanFileTypeIcons(localConf)
  await copyFileTypeIcons(localConf)
  utils.mainTaskEnd({ taskName: 'Add filetype icons task', timeStart: timeStart, skipContext: true })
}
fileTypeIcons()
