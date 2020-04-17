const cpy = require('cpy')
const conf = require('../conf')

async function copyBootstrapIcons () {
  try {
    await cpy(`${conf.BOOTSTRAP_ICONS_SRC}`, `${conf.BOOTSTRAP_ICONS_DIST}`)
  } catch (error) {
    console.error('(copyBootstrapIcons) Error:', error)
  }
}

exports.copyBootstrapIcons = copyBootstrapIcons
