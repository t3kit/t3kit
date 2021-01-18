const fsPromises = require('fs').promises
const pEachSeries = require('p-each-series')
const hasha = require('hasha')
const size = require('filesize')
const utils = require('../utils')

async function revCss (localConf) {
  try {
    const timeStart = utils.start('revCss', 'blue.bold')
    const fileList = []

    const files = await utils.getFileList(`${localConf.CSS_DIST}*.css`, { objectMode: true })
    await pEachSeries(files, async (file, index) => {
      const filePath = file.path.slice(0, -4)
      const fileName = file.name.slice(0, -4)
      const fileExt = '.css'
      let hash = await hasha.fromFile(file.path, { algorithm: 'md5' })
      hash = hash.slice(0, 10)
      await fsPromises.rename(file.path, `${filePath}-${hash}${fileExt}`)

      const fileStats = await fsPromises.stat(`${filePath}-${hash}${fileExt}`)
      fileList[index] = { name: `${localConf.ASSETS_FOLDER}${localConf.CONTEXT}/${localConf.CSS_FOLDER}${fileName}-${hash}${fileExt}`, size: size(fileStats.size) }
    })

    utils.boxEnd({ files: fileList, functionName: 'revCss', timeStart: timeStart, endColor: 'blue.bold' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'revCss' })
  }
}

async function revJs (localConf) {
  try {
    const timeStart = utils.start('revJs', 'yellow.bold')
    const fileList = []

    const files = await utils.getFileList(`${localConf.JS_DIST}*.js`, { objectMode: true })
    await pEachSeries(files, async (file, index) => {
      const filePath = file.path.slice(0, -3)
      const fileName = file.name.slice(0, -3)
      const fileExt = '.js'
      let hash = await hasha.fromFile(file.path, { algorithm: 'md5' })
      hash = hash.slice(0, 10)
      await fsPromises.rename(file.path, `${filePath}-${hash}${fileExt}`)

      const fileStats = await fsPromises.stat(`${filePath}-${hash}${fileExt}`)
      fileList[index] = { name: `${localConf.ASSETS_FOLDER}${localConf.CONTEXT}/${localConf.JS_FOLDER}${fileName}-${hash}${fileExt}`, size: size(fileStats.size) }
    })

    utils.boxEnd({ files: fileList, functionName: 'revJs', timeStart: timeStart, endColor: 'yellow.bold' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'revJs' })
  }
}

exports.revCss = revCss
exports.revJs = revJs
