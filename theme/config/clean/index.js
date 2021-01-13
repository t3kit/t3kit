const utils = require('../utils')
const del = require('del')
const conf = require('../conf')

async function clean () {
  try {
    const timeStart = utils.start('clean', 'blue')

    await del([`${conf.DIST}${conf.CONTEXT}*`], { force: true })

    utils.boxEnd({ functionName: 'clean', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'clean' })
  }
}

async function cleanFavicons () {
  try {
    const timeStart = utils.start('cleanFavicons', 'blue')

    await del([`${conf.FAVICONS_DIST}*`], { force: true })

    utils.boxEnd({ functionName: 'cleanFavicons', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'cleanFavicons' })
  }
}

async function cleanBootstrapIcons () {
  try {
    const timeStart = utils.start('cleanBootstrapIcons', 'blue')

    await del([`${conf.BOOTSTRAP_ICONS_DIST}*`], { force: true })

    utils.boxEnd({ functionName: 'cleanBootstrapIcons', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'cleanBootstrapIcons' })
  }
}

async function cleanFileTypeIcons () {
  try {
    const timeStart = utils.start('cleanFileTypeIcons', 'blue')

    await del([`${conf.FILE_TYPE_ICONS_DIST}*`], { force: true })

    utils.boxEnd({ functionName: 'cleanFileTypeIcons', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'cleanFileTypeIcons' })
  }
}

exports.clean = clean
exports.cleanFavicons = cleanFavicons
exports.cleanBootstrapIcons = cleanBootstrapIcons
exports.cleanFileTypeIcons = cleanFileTypeIcons
