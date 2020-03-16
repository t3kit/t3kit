const del = require('del')
const conf = require('../conf')

async function clean () {
  try {
    await del([`${conf.DIST}*`], { force: true })
  } catch (error) {
    console.error('(clean) Error:', error)
  }
}

async function cleanFavicons () {
  try {
    await del([`${conf.FAVICONS_DIST}*`], { force: true })
  } catch (error) {
    console.error('(clean) Error:', error)
  }
}

exports.clean = clean
exports.cleanFavicons = cleanFavicons
