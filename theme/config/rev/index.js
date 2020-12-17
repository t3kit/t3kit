// const globby = require('globby')
// const zlib = require('zlib')
// const { pipeline } = require('stream')
// const {
//   createReadStream,
//   createWriteStream
// } = require('fs')
const conf = require('../conf')
const utils = require('../utils')
const hasha = require('hasha')
const pEachSeries = require('p-each-series')
const fsPromises = require('fs').promises
// const { async } = require('hasha')
// const fs = require('fs')
// const fse = require('fs-extra')
// const fsPromises = fs.promises
// const glob = require("glob")
// const conf = require('../conf')
// zlib.constants.Z_DEFAULT_COMPRESSION = 5



// async function getFileList (dir) {
//   let files
//   try {
//     await fse.ensureDir(dir)
//     files = await fsPromises.readdir(dir, { withFileTypes: true })
//   } catch (error) {
//     console.error('(getFileList) Error:', error)
//   }

//   if (files !== undefined) {
//     files = files.filter(dirent => dirent.isFile())
//       .map(dirent => dirent.name)
//       .filter(item => { return !(item.includes('map') || item.includes('br') || item.includes('gz') || item.includes('html')) })
//       // console.log('🚀 ~ file: ttt.js ~ line 32 ~ getFileList ~ files', files)
//     return files
//   }
// }
// getFileList('Resources/Public/assets/production/Css')

// // const gzip = zlib.createGzip()
// const gzip = zlib.createGzip({ level: 5 })
// const brotli = zlib.createBrotliCompress({ level: 5 })
// // const brotli = zlib.createBrotliCompress()
// // console.log('🚀 ~ file: ttt.js ~ line 10 ~ gzip', gzip)
// const source = createReadStream('theme/src/css/*.css')
// const destination = createWriteStream('theme/config/main-8560424e7b5b5.css.br')

// pipeline(source, brotli, destination, (err) => {
//   if (err) {
//     console.error('An error occurred:', err)
//     process.exitCode = 1
//   }
// })


// function compress(fileIn, fileOut) {
//   const source = createReadStream('fileIn')
//   const gzipDestination = createWriteStream(`${fileOut}.gz`)
//   const brotliDestination = createWriteStream(`${fileOut}.br`)

//   const gzip = zlib.createGzip()
//   const brotli = zlib.createBrotliCompress()

//   pipeline(source, gzip, gzipDestination, (err) => {
//     if (err) {
//       console.error('gzip error', err)
//       process.exitCode = 1
//     }
//   })
//   pipeline(source, brotli, brotliDestination, (err) => {
//     if (err) {
//       console.error('brotli error', err)
//       process.exitCode = 1
//     }
//   })
// }


// async function getFileList (glob, cwd) {
//   let files
//   try {
//     // await fse.ensureDir(dir)
//     // files = await fsPromises.readdir(dir, { withFileTypes: true })
//     // files = await globby('*.css', { cwd: 'Resources/Public/assets/development/Css/' })
//     files = await globby(glob, { cwd: cwd })
//   } catch (error) {
//     console.error(`(getFileList ${glob} ${cwd} ) Error:`, error)
//   }

//   if (files !== undefined) {
//     return files
//   }
// }
// getFileList2('*.css', 'Resources/Public/assets/development/Css/')

async function revFiles (glob) {
  try {
    const files = await utils.getFileList(glob, '')
    await pEachSeries(files, async (fileName) => {
      let newFileName
      let fileExt
      if (fileName.endsWith('.css')) {
        newFileName = fileName.slice(0, -4)
        fileExt = '.css'
      } else if (fileName.endsWith('.js')) {
        newFileName = fileName.slice(0, -3)
        fileExt = '.js'
      }
      let hash = await hasha.fromFile(fileName, { algorithm: 'md5' })
      hash = hash.slice(0, 10)
      await fsPromises.rename(fileName, `${newFileName}-${hash}${fileExt}`)
    })
  } catch (error) {
    console.error(`func:compressFiles(${glob}) Error:`, error)
  }
}

async function revCss () {
  await revFiles(`${conf.CSS_DIST}*.css`)
}
async function revJs () {
  await revFiles(`${conf.JS_DIST}*.js`)
}

exports.revCss = revCss
exports.revJs = revJs

// ${conf.JS_DIST}*.js
// ${conf.CSS_DIST}*.css
// exports.compressCss = compressFiles(`${conf.CSS_DIST}*.css`)
// exports.compressJs = compressFiles(`${conf.JS_DIST}*.js`)

// exports.compressCss = compressFiles('Resources/Public/assets/production/Css/*.css')
// exports.compressJs = compressFiles('Resources/Public/assets/production/Js/*.js')

// compressFiles('Resources/Public/assets/production/Css/*.css')
// compressFiles('Resources/Public/assets/production/Js/*.js')
