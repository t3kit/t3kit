const fsPromises = require('fs').promises
const pEachSeries = require('p-each-series')
const sass = require('sass')
const size = require('filesize')
const boxen = require('boxen')
const conf = require('../conf')
const utils = require('../utils')


function logFiles (val, file, fnVal = '', promise = false) {
  const fnValStyle = `${chalk.white.reset(`${fnVal}`)}`
  const fnNameStyle = chalk.blue.bold(`${fnName}(${fnValStyle})`)
  let msgStyle = `${chalk.red.bold('Error in func:')}${fnNameStyle}${chalk.red.bold(' -->')}`
  if (promise) {
    msgStyle = `${chalk.red.dim.bold('Error in func:')}${fnNameStyle}${chalk.red.dim.bold(' -->')}`
  }
  console.error(msgStyle, error)
}



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
    utils.start('compileScss')
    const files = await utils.getFileList(`${conf.SCSS_SRC}*.scss`, { objectMode: true })
    const fileList = []
    await pEachSeries(files, async (file, index) => {
      const scssResult = await sassPromise(file.path)
      const fileName = `${file.name.slice(0, -5)}.css`
      await fsPromises.writeFile(`${conf.SCSS_DIST}${fileName}`, scssResult.css)
      const fileStats = await fsPromises.stat(`${conf.SCSS_DIST}${fileName}`)
      fileList[index] = { name: fileName, size: size(fileStats.size) }
    })
    utils.boxEnd(fileList, 'compileScss')
  } catch (error) {
    utils.errLogFn(error, 'compileScss')
  }
}
// compileScss()
// exports.compileScss = compileScss

async function start () {
  await Promise.all([compileScss(), compileScss()])

}
start()
