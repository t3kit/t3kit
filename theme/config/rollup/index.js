const fsPromises = require('fs').promises
const fse = require('fs-extra')
const size = require('filesize')
const pEachSeries = require('p-each-series')
const rollup = require('rollup')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')
const sizes = require('rollup-plugin-sizes')
const conf = require('../conf')
const utils = require('../utils')

async function compileJs () {
  try {
    const timeStart = utils.start('compileJs', 'yellow')
    const fileList = []

    await fse.ensureDir(conf.JS_DIST)
    const files = await utils.getFileList(`${conf.JS_SRC}*.js`, { objectMode: true })

    await pEachSeries(files, async (file, index) => {
      const inputOptions = {
        input: file.path,
        plugins: [
          nodeResolve(),
          sizes()
        ]
      }
      process.env.NODE_ENV === 'production' && inputOptions.plugins.push(terser({
        output: {
          comments: false
        }
      }))
      const outputOptions = {
        file: `${conf.JS_DIST}${file.name}`,
        format: 'iife',
        sourcemap: process.env.NODE_ENV === 'production' ? 'hidden' : true,
        sourcemapExcludeSources: true
      }
      const bundle = await rollup.rollup(inputOptions)
      await bundle.write(outputOptions)

      const fileStats = await fsPromises.stat(`${conf.JS_DIST}${file.name}`)
      fileList[index] = { name: `${conf.ASSETS_FOLDER}${conf.CONTEXT}/${conf.JS_FOLDER}${file.name}`, size: size(fileStats.size) }
    })

    utils.boxEnd(fileList, 'compileJs', timeStart, 'yellow')
  } catch (error) {
    utils.errLogFn(error, 'compileJs')
  }
}

exports.compileJs = compileJs
