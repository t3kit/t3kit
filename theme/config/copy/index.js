const cpy = require('cpy')
const conf = require('../conf')

async function copyBootstrapIcons () {
  try {
    await cpy(`${conf.BOOTSTRAP_ICONS_SRC}`, `${conf.BOOTSTRAP_ICONS_DIST}`)
  } catch (error) {
    console.error('(copyBootstrapIcons) Error:', error)
  }
}

async function copyFileTypeIcons () {
  try {
    await cpy(`${conf.FILE_TYPE_ICONS_SRC}`, `${conf.FILE_TYPE_ICONS_DIST}`)
  } catch (error) {
    console.error('(copyFileTypeIcons) Error:', error)
  }
}

exports.copyBootstrapIcons = copyBootstrapIcons
exports.copyFileTypeIcons = copyFileTypeIcons
