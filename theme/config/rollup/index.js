const { watch, parallel } = require('gulp')
const rollup = require('rollup')
const { terser } = require('rollup-plugin-terser')
const sizes = require('rollup-plugin-sizes')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
// const legacy = require('@rollup/plugin-legacy')
const conf = require('../conf')
const fs = require('fs')
const fse = require('fs-extra')
const fsPromises = fs.promises
// const rootDir = require('app-root-path').path





// const SRC = conf.JS_SRC
// const DIST = conf.JS_DIST

// let files
async function getFileList (dir) {
  let files
  try {
    await fse.ensureDir(dir)
    files = await fsPromises.readdir(dir, { withFileTypes: true })
  } catch (error) {
    console.error('(getFileList) Error:', error)
  }

  if (files !== undefined) {
    files = files.filter(dirent => dirent.isFile())
      .map(dirent => `${conf.JS_SRC}${dirent.name}`)
      .filter(item => { return !(item.includes('map') || item.includes('br') || item.includes('gz') || item.includes('html') || item.includes('md')) })
    // console.log('getFileList -> files', files)
    return files
  }
}

// const llll = `${rootDir}/theme/src/js`

// let /mmm
// (async () => { await getFileList(llll) })()

// (async () => { })()
// let files
// getFileList(llll).then((val) => { files = val })
// console.log('llll', llll)
// ( async function rrr () {
  // })()
// getFileList(llll).
// console.log('files2', getFileList(llll).then((val) => { console.log(val) }))

// getFileList(llll).then((val) => { console.log(val) })
// console.log('getFileList(llll)', Promise.resolve(getFileList(llll)))
// let lll = Promise.resolve(getFileList(llll).then((val) => lll = val))
// console.log('lll', (async () => { return await getFileList(llll) })())
// compile mainjs



async function rrrr () {
  const files = await getFileList(conf.JS_SRC)
  const mainJsInputOptions = {
    // input: `${SRC}main.js`,
    // input: getFileList(llll).then((val) => { console.log(val) }),
    input: files,
    plugins: [
      nodeResolve(),
      sizes()
    ]
  }
  process.env.NODE_ENV === 'production' && mainJsInputOptions.plugins.push(terser({
    output: {
      comments: false
    }
  }))

  // console.log('rrrr -> mainJsInputOptions', mainJsInputOptions)
  return mainJsInputOptions
}



// const mainJsInputOptions = {
//   // input: `${SRC}main.js`,
//   input: {
//     b: '/Users/mac/t3kit/t3kit-starter/public/typo3conf/ext/t3kit/theme/src/js/main.js'
//     // index: '/Users/mac/t3kit/t3kit-starter/public/typo3conf/ext/t3kit/theme/src/js/plugin3--async.js'
//   },
//   // input: getFileList(llll).then((val) => { console.log(val) }),
//   // input: (async () => { return await getFileList(llll) })(),
//   plugins: [
//     resolve(),
//     sizes()
//     // legacy({
//     //   '../../node_modules/simplelightbox/dist/simple-lightbox.js': 'SimpleLightbox'
//     // })
//   ]
// }

const mainJsOutputOptions = {
  // file: `${DIST}main.js`,
  dir: conf.JS_DIST,
  // entryFileNames: 'entry-[name].js',
  // format: 'iife'
  sourcemap: process.env.NODE_ENV === 'production' ? 'hidden' : true,
  sourcemapExcludeSources: true
}
async function compileJs () {
  // const bundle = await rollup.rollup(mainJsInputOptions)
  const bundle = await rollup.rollup(await rrrr())
  await bundle.write(mainJsOutputOptions)
}

// // compile plugin1
// const plugin1InputOptions = {
//   input: `${SRC}plugin1.js`,
//   plugins: [
//     resolve(),
//     sizes()
//   ]
// }
// process.env.NODE_ENV === 'production' && plugin1InputOptions.plugins.push(terser({
//   output: {
//     comments: false
//   }
// }))
// const plugin1OutputOptions = {
//   file: `${DIST}plugin1.js`,
//   format: 'iife',
//   sourcemap: process.env.NODE_ENV === 'production' ? 'hidden' : true,
//   sourcemapExcludeSources: true
// }
// async function compilePlugin1 () {
//   const bundle = await rollup.rollup(plugin1InputOptions)
//   await bundle.write(plugin1OutputOptions)
// }

// // compile plugin2
// const plugin2InputOptions = {
//   input: `${SRC}plugin2.js`,
//   plugins: [
//     resolve(),
//     sizes()
//   ]
// }
// process.env.NODE_ENV === 'production' && plugin2InputOptions.plugins.push(terser({
//   output: {
//     comments: false
//   }
// }))
// const plugin2OutputOptions = {
//   file: `${DIST}plugin2.js`,
//   format: 'iife',
//   sourcemap: process.env.NODE_ENV === 'production' ? 'hidden' : true,
//   sourcemapExcludeSources: true
// }
// async function compilePlugin2 () {
//   const bundle = await rollup.rollup(plugin2InputOptions)
//   await bundle.write(plugin2OutputOptions)
// }

function compileJsWatch () {
  watch([`${conf.JS_SRC}**/*.js`], compileJs)
}

// function compilePlugin1JsWatch () {
//   watch([`${SRC}plugin1/**/*.js`, `${SRC}plugin1.js`], compilePlugin1)
// }
// function compilePlugin2JsWatch () {
//   watch([`${SRC}plugin2/**/*.js`, `${SRC}plugin2.js`], compilePlugin2)
// }

// exports.compileJs = parallel(compileMainJs, compilePlugin1, compilePlugin2)
exports.compileJs = compileJs
exports.compileJsWatch = compileJsWatch
// exports.compileJsWatch = parallel(compileMainJsWatch, compilePlugin1JsWatch, compilePlugin2JsWatch)
