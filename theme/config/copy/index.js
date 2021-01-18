const pEachSeries = require('p-each-series')
const utils = require('../utils')
const cpy = require('cpy')

async function copyIcons (localConf) {
  try {
    const timeStart = utils.start('copyIcons', 'blue')

    await pEachSeries(localConf.ICONS, async (icons) => {
      await cpy(icons.src, icons.dist)
    })

    utils.boxEnd({ functionName: 'copyIcons', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'copyIcons' })
  }
}

async function copyFileTypeIcons (localConf) {
  try {
    const timeStart = utils.start('copyFileTypeIcons', 'blue')

    await cpy(`${localConf.FILE_TYPE_ICONS_SRC}`, `${localConf.FILE_TYPE_ICONS_DIST}`)

    utils.boxEnd({ functionName: 'copyFileTypeIcons', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'copyFileTypeIcons' })
  }
}

exports.copyIcons = copyIcons
exports.copyFileTypeIcons = copyFileTypeIcons
