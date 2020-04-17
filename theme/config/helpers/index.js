const fse = require('fs-extra')
const conf = require('../conf')

async function ensureTmpDir () {
  try {
    await fse.ensureDir(`${conf.TEMP}`)
  } catch (error) {
    console.error('(ensureTmpDir) Error:', error)
  }
}

exports.ensureTmpDir = ensureTmpDir
