const fsPromises = require('fs').promises
const pEachSeries = require('p-each-series')
const size = require('filesize')
const fse = require('fs-extra')
const sass = require('sass')
const conf = require('../conf')
const utils = require('../utils')

function sassPromise (fileName) {
  return new Promise((resolve, reject) => {
    sass.render({ file: fileName }, function (error, result) {
      if (error) {
        utils.errLogFn(error.message, 'sassPromise', `${fileName}`, true)
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

async function compileScss () {
  try {
    const timeStart = utils.start('compileScss', 'magenta')
    const fileList = []

    await fse.ensureDir(conf.SCSS_DIST)
    const files = await utils.getFileList(`${conf.SCSS_SRC}*.scss`, { objectMode: true })
    await pEachSeries(files, async (file, index) => {
      const scssResult = await sassPromise(file.path)
      const fileName = `${file.name.slice(0, -5)}.css`
      await fsPromises.writeFile(`${conf.SCSS_DIST}${fileName}`, scssResult.css)
      const fileStats = await fsPromises.stat(`${conf.SCSS_DIST}${fileName}`)
      fileList[index] = { name: `src/vendor/css/${fileName}`, size: size(fileStats.size) }
    })

    utils.boxEnd(fileList, 'compileScss', timeStart, 'magenta', false)
  } catch (error) {
    utils.errLogFn(error, 'compileScss')
  }
}

exports.compileScss = compileScss
