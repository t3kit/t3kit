const utils = require('../utils')
const cpy = require('cpy')
const conf = require('../conf')

async function copyBootstrapIcons () {
  try {
    const timeStart = utils.start('copyBootstrapIcons', 'blue')

    await cpy(`${conf.BOOTSTRAP_ICONS_SRC}`, `${conf.BOOTSTRAP_ICONS_DIST}`)

    utils.boxEnd({ functionName: 'copyBootstrapIcons', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'copyBootstrapIcons' })
  }
}

async function copyFileTypeIcons () {
  try {
    const timeStart = utils.start('copyFileTypeIcons', 'blue')

    await cpy(`${conf.FILE_TYPE_ICONS_SRC}`, `${conf.FILE_TYPE_ICONS_DIST}`)

    utils.boxEnd({ functionName: 'copyFileTypeIcons', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'copyFileTypeIcons' })
  }
}

exports.copyBootstrapIcons = copyBootstrapIcons
exports.copyFileTypeIcons = copyFileTypeIcons
