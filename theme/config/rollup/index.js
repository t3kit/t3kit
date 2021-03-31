const fsPromises = require('fs').promises
const fse = require('fs-extra')
const size = require('filesize')
const pEachSeries = require('p-each-series')
const rollup = require('rollup')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const replace = require('@rollup/plugin-replace')
const { terser } = require('rollup-plugin-terser')
const sizes = require('rollup-plugin-sizes')
const { getBabelOutputPlugin } = require('@rollup/plugin-babel')
const utils = require('../utils')

async function compileJs (localConf, options) {
  try {
    options = options || {}
    const hideStatus = options.hideStatus || false

    const timeStart = utils.start('compileJs', 'yellow')
    const fileList = []

    let replaceVal = {
      preventAssignment: true,
      'process.env.NODE_ENV': process.env.NODE_ENV
    }
    replaceVal = { ...replaceVal, ...localConf.replace }

    await fse.ensureDir(localConf.JS_DIST)
    const files = await utils.getFileList(`${localConf.JS_SRC}*.js`, { objectMode: true })

    await pEachSeries(files, async (file, index) => {
      const inputOptions = {
        input: file.path,
        external: [],
        plugins: [
          nodeResolve(),
          replace(replaceVal),
          getBabelOutputPlugin({
            retainLines: true,
            allowAllFormats: true,
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-proposal-class-properties']]
          })
        ]
      }
      hideStatus || inputOptions.plugins.push(sizes())
      process.env.NODE_ENV === 'production' && inputOptions.plugins.push(terser({
        output: {
          comments: false
        }
      }))
      inputOptions.external = [...inputOptions.external, ...localConf.external]

      const outputOptions = {
        file: `${localConf.JS_DIST}${file.name}`,
        format: 'iife',
        sourcemap: process.env.NODE_ENV === 'production' ? 'hidden' : true,
        sourcemapExcludeSources: true,
        globals: {}
      }
      outputOptions.globals = { ...outputOptions.globals, ...localConf.globals }
      const bundle = await rollup.rollup(inputOptions)
      await bundle.write(outputOptions)

      const fileStats = await fsPromises.stat(`${localConf.JS_DIST}${file.name}`)
      fileList[index] = { name: `${localConf.ASSETS_FOLDER}${localConf.CONTEXT}/${localConf.JS_FOLDER}${file.name}`, size: size(fileStats.size) }
    })

    hideStatus || utils.boxEnd({ files: fileList, functionName: 'compileJs', timeStart: timeStart, endColor: 'yellow' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'compileJs' })
  }
}

exports.compileJs = compileJs
