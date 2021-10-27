import fsPromises from 'fs/promises'
import { promisify } from 'util'
import size from 'filesize'
import zlib from 'zlib'
import { pipeline } from 'stream'
import { createReadStream, createWriteStream } from 'fs'
import pEachSeries from 'p-each-series'
import * as utils from './utils.js'
const pipe = promisify(pipeline)

async function compressCss (localConf) {
  try {
    const timeStart = utils.start('compressCss', 'blue')
    const fileList = []

    const files = await utils.getFileList(`${localConf.CSS_DIST}*.css`, { objectMode: true })

    await pEachSeries(files, async (file, index) => {
      const source = createReadStream(file.path)
      const source2 = createReadStream(file.path)

      const gzip = zlib.createGzip()
      const gzipDestination = createWriteStream(`${file.path}.gz`)
      await pipe(source, gzip, gzipDestination)

      const brotli = zlib.createBrotliCompress()
      const brotliDestination = createWriteStream(`${file.path}.br`)
      await pipe(source2, brotli, brotliDestination)

      const initialFileStats = await fsPromises.stat(`${localConf.CSS_DIST}${file.name}`)
      const gzFileStats = await fsPromises.stat(`${localConf.CSS_DIST}${file.name}.gz`)
      const brFileStats = await fsPromises.stat(`${localConf.CSS_DIST}${file.name}.br`)
      const filePath = `${localConf.ASSETS_FOLDER}${localConf.CONTEXT}/${localConf.CSS_FOLDER}${file.name}`
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

async function compressJs (localConf) {
  try {
    const timeStart = utils.start('compressJs', 'yellow')
    const fileList = []

    const files = await utils.getFileList(`${localConf.JS_DIST}*.js`, { objectMode: true })

    await pEachSeries(files, async (file, index) => {
      const source = createReadStream(file.path)
      const source2 = createReadStream(file.path)

      const gzip = zlib.createGzip()
      const gzipDestination = createWriteStream(`${file.path}.gz`)
      await pipe(source, gzip, gzipDestination)

      const brotli = zlib.createBrotliCompress()
      const brotliDestination = createWriteStream(`${file.path}.br`)
      await pipe(source2, brotli, brotliDestination)

      const initialFileStats = await fsPromises.stat(`${localConf.JS_DIST}${file.name}`)
      const gzFileStats = await fsPromises.stat(`${localConf.JS_DIST}${file.name}.gz`)
      const brFileStats = await fsPromises.stat(`${localConf.JS_DIST}${file.name}.br`)
      const filePath = `${localConf.ASSETS_FOLDER}${localConf.CONTEXT}/${localConf.JS_FOLDER}${file.name}`
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

export { compressCss, compressJs }
