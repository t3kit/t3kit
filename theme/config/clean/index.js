const pEachSeries = require('p-each-series')
const utils = require('../utils')
const del = require('del')

async function clean (localConf) {
  try {
    const timeStart = utils.start('clean', 'blue')

    await del([`${localConf.DIST}${localConf.CONTEXT}*`], { force: true })

    utils.boxEnd({ functionName: 'clean', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'clean' })
  }
}

async function cleanFavicons (localConf) {
  try {
    const timeStart = utils.start('cleanFavicons', 'blue')

    await del([`${localConf.FAVICONS_DIST}*`], { force: true })

    utils.boxEnd({ functionName: 'cleanFavicons', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'cleanFavicons' })
  }
}

async function cleanFileTypeIcons (localConf) {
  try {
    const timeStart = utils.start('cleanFileTypeIcons', 'blue')

    await del([`${localConf.FILE_TYPE_ICONS_DIST}*`], { force: true })

    utils.boxEnd({ functionName: 'cleanFileTypeIcons', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'cleanFileTypeIcons' })
  }
}

async function cleanIcons (localConf) {
  try {
    const timeStart = utils.start('cleanIcons', 'blue')

    await pEachSeries(localConf.ICONS, async (icons) => {
      await del([`${icons.dist}*`], { force: true })
    })

    utils.boxEnd({ functionName: 'cleanIcons', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'cleanIcons' })
  }
}

exports.clean = clean
exports.cleanIcons = cleanIcons
exports.cleanFavicons = cleanFavicons
exports.cleanFileTypeIcons = cleanFileTypeIcons
