const zlib = require('zlib')
const { pipeline } = require('stream')
const {
  createReadStream,
  createWriteStream
} = require('fs')
const fs = require('fs')
const fse = require('fs-extra')
const fsPromises = fs.promises
// const glob = require("glob")
const globby = require('globby');
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


async function getFileList (glob, cwd) {
  let files
  try {
    // await fse.ensureDir(dir)
    // files = await fsPromises.readdir(dir, { withFileTypes: true })
    // files = await globby('*.css', { cwd: 'Resources/Public/assets/development/Css/' })
    files = await globby(glob, { cwd: cwd })
  } catch (error) {
    console.error(`(getFileList ${glob} ${cwd} ) Error:`, error)
  }

  if (files !== undefined) {
    console.log('🚀 ~ file: ttt.js ~ line 89 ~ getFileList2 ~ files', files)
    return files
  }
}
// getFileList2('*.css', 'Resources/Public/assets/development/Css/')

async function compressFiles (glob) {
  try {
    const files = await getFileList(glob, '')
    files.forEach(async (fileName) => {
      const source = createReadStream(fileName)
      const gzipDestination = createWriteStream(`${fileName}.gz`)
      const brotliDestination = createWriteStream(`${fileName}.br`)

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
    console.error(`func:compressFiles(${glob}) Error:`, error)
  }
}

compressFiles('Resources/Public/assets/production/Css/*.css')
compressFiles('Resources/Public/assets/production/Js/*.js')
