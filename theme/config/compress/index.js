const zlib = require('zlib')
const { pipeline } = require('stream')
const { createReadStream, createWriteStream } = require('fs')
const conf = require('../conf')
const utils = require('../utils')

async function compressFiles (glob) {
  try {
    const files = await utils.getFileList(glob, { objectMode: true })
    files.forEach(async (file) => {
      const source = createReadStream(file.path)
      const gzipDestination = createWriteStream(`${file.path}.gz`)
      const brotliDestination = createWriteStream(`${file.path}.br`)

      const gzip = zlib.createGzip()
      const brotli = zlib.createBrotliCompress()

      pipeline(source, gzip, gzipDestination, (err) => {
        if (err) {
          console.error('gzip error', err)
          process.exitCode = 1
        }
      })
      pipeline(source, brotli, brotliDestination, (err) => {
        if (err) {
          console.error('brotli error', err)
          process.exitCode = 1
        }
      })
    })
  } catch (error) {
    console.error(`compressFiles(${glob}) Error:`, error)
  }
}

async function compressCss () {
  await compressFiles(`${conf.CSS_DIST}*.css`)
}
async function compressJs () {
  await compressFiles(`${conf.JS_DIST}*.js`)
}

exports.compressCss = compressCss
exports.compressJs = compressJs

// compressFiles(`${conf.CSS_DIST}*.css`)
// compressFiles(`${conf.JS_DIST}*.js`)
