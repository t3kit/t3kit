const del = require('del')
const vars = require('../vars')

async function clean () {
  try {
    await del([`${vars.DIST}*`], { force: true })
  } catch (error) {
    console.error('(clean) Error:', error)
  }
}

exports.clean = clean
