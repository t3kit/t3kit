const fsPromises = require('fs').promises
const { promisify } = require('util')
const size = require('filesize')
const zlib = require('zlib')
const { pipeline } = require('stream')
const pipe = promisify(pipeline)
const { createReadStream, createWriteStream } = require('fs')
const pEachSeries = require('p-each-series')
const conf = require('../conf')
const utils = require('../utils')

async function compressCss () {
  try {
    const timeStart = utils.start('compressCss', 'blue')
    const fileList = []

    const files = await utils.getFileList(`${conf.CSS_DIST}*.css`, { objectMode: true })

    await pEachSeries(files, async (file, index) => {
      const source = createReadStream(file.path)
      const source2 = createReadStream(file.path)

      const gzip = zlib.createGzip()
      const gzipDestination = createWriteStream(`${file.path}.gz`)
      await pipe(source, gzip, gzipDestination)

      const brotli = zlib.createBrotliCompress()
      const brotliDestination = createWriteStream(`${file.path}.br`)
      await pipe(source2, brotli, brotliDestination)

      const initialFileStats = await fsPromises.stat(`${conf.CSS_DIST}${file.name}`)
      const gzFileStats = await fsPromises.stat(`${conf.CSS_DIST}${file.name}.gz`)
      const brFileStats = await fsPromises.stat(`${conf.CSS_DIST}${file.name}.br`)
      const filePath = `${conf.ASSETS_FOLDER}${conf.CONTEXT}/${conf.CSS_FOLDER}${file.name}`
      fileList[index] = {
        compress: {
          initialFile: filePath,
          initialFileSize: size(initialFileStats.size),
          gzFile: `${filePath}.gz`,
          gzFileSize: size(gzFileStats.size),
          brFile: `${filePath}.br`,
          brFileSize: size(brFileStats.size)
        }
      }
    })

    utils.boxEnd({ files: fileList, functionName: 'compressCss', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'compressCss' })
  }
}

async function compressJs () {
  try {
    const timeStart = utils.start('compressJs', 'yellow')
    const fileList = []

    const files = await utils.getFileList(`${conf.JS_DIST}*.js`, { objectMode: true })

    await pEachSeries(files, async (file, index) => {
      const source = createReadStream(file.path)
      const source2 = createReadStream(file.path)

      const gzip = zlib.createGzip()
      const gzipDestination = createWriteStream(`${file.path}.gz`)
      await pipe(source, gzip, gzipDestination)

      const brotli = zlib.createBrotliCompress()
      const brotliDestination = createWriteStream(`${file.path}.br`)
      await pipe(source2, brotli, brotliDestination)

      const initialFileStats = await fsPromises.stat(`${conf.JS_DIST}${file.name}`)
      const gzFileStats = await fsPromises.stat(`${conf.JS_DIST}${file.name}.gz`)
      const brFileStats = await fsPromises.stat(`${conf.JS_DIST}${file.name}.br`)
      const filePath = `${conf.ASSETS_FOLDER}${conf.CONTEXT}/${conf.JS_FOLDER}${file.name}`
      fileList[index] = {
        compress: {
          initialFile: filePath,
          initialFileSize: size(initialFileStats.size),
          gzFile: `${filePath}.gz`,
          gzFileSize: size(gzFileStats.size),
          brFile: `${filePath}.br`,
          brFileSize: size(brFileStats.size)
        }
      }
    })

    utils.boxEnd({ files: fileList, functionName: 'compressJs', timeStart: timeStart, endColor: 'yellow' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'compressJs' })
  }
}

exports.compressCss = compressCss
exports.compressJs = compressJs
