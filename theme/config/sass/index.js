const fsPromises = require('fs').promises
const pEachSeries = require('p-each-series')
const size = require('filesize')
const fse = require('fs-extra')
const sass = require('sass')
const utils = require('../utils')

function sassPromise (fileName) {
  return new Promise((resolve, reject) => {
    sass.render({ file: fileName }, function (error, result) {
      if (error) {
        utils.errLogFn(error.message, { functionName: 'sassPromise', functionVal: fileName, newPromise: true })

        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

async function compileScss (localConf, options) {
  options = options || {}
  const hideStatus = options.hideStatus || false

  try {
    const timeStart = utils.start('compileScss', 'magenta')
    const fileList = []

    await fse.ensureDir(localConf.SCSS_DIST)
    const files = await utils.getFileList(`${localConf.SCSS_SRC}*.scss`, { objectMode: true })
    await pEachSeries(files, async (file, index) => {
      const scssResult = await sassPromise(file.path)
      const fileName = `${file.name.slice(0, -5)}.css`
      await fsPromises.writeFile(`${localConf.SCSS_DIST}${fileName}`, scssResult.css)
      const fileStats = await fsPromises.stat(`${localConf.SCSS_DIST}${fileName}`)
      fileList[index] = { name: `src/vendor/css/${fileName}`, size: size(fileStats.size) }
    })

    hideStatus || utils.boxEnd({ files: fileList, functionName: 'compileScss', timeStart: timeStart, endColor: 'magenta' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'compileScss' })
  }
}

exports.compileScss = compileScss
