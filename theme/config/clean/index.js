const utils = require('../utils')
const del = require('del')
const conf = require('../conf')

async function clean () {
  try {
    await del([`${conf.DIST}${conf.CONTEXT}*`], { force: true })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'clean' })
  }
}

async function cleanFavicons () {
  try {
    await del([`${conf.FAVICONS_DIST}*`], { force: true })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'cleanFavicons' })
  }
}

async function cleanBootstrapIcons () {
  try {
    await del([`${conf.BOOTSTRAP_ICONS_DIST}*`], { force: true })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'cleanBootstrapIcons' })
  }
}

async function cleanFileTypeIcons () {
  try {
    await del([`${conf.FILE_TYPE_ICONS_DIST}*`], { force: true })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'cleanFileTypeIcons' })
  }
}

exports.clean = clean
exports.cleanFavicons = cleanFavicons
exports.cleanBootstrapIcons = cleanBootstrapIcons
exports.cleanFileTypeIcons = cleanFileTypeIcons
