const fse = require('fs-extra')
const globby = require('globby')
const conf = require('../conf')

async function ensureTmpDir () {
  try {
    await fse.ensureDir(`${conf.TEMP}`)
  } catch (error) {
    console.error('(ensureTmpDir) Error:', error)
  }
}

async function getFileList (glob, opt) {
  // let files
  try {
    const files = await globby(glob, opt)
    if (files !== undefined) {
      return files
    }
  } catch (error) {
    console.error(`(getFileList ${glob} ${opt} ) Error:`, error)
  }
}

exports.ensureTmpDir = ensureTmpDir
exports.getFileList = getFileList
