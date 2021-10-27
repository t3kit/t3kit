import fsPromises from 'fs/promises'

import fse from 'fs-extra'
import size from 'filesize'
import pEachSeries from 'p-each-series'
import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import sizes from 'rollup-plugin-sizes'

import * as utils from './utils.js'

async function compileJs (localConf, options) {
  try {
    options = options || {}
    const hideStatus = options.hideStatus || false

    const timeStart = utils.start('compileJs', 'yellow')
    const fileList = []

    let replaceVal = {
      preventAssignment: false,
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
          replace(replaceVal)
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
      const bundle = await rollup(inputOptions)
      await bundle.write(outputOptions)

      const fileStats = await fsPromises.stat(`${localConf.JS_DIST}${file.name}`)
      fileList[index] = { name: `${localConf.ASSETS_FOLDER}${localConf.CONTEXT}/${localConf.JS_FOLDER}${file.name}`, size: size(fileStats.size) }
    })

    hideStatus || utils.boxEnd({ files: fileList, functionName: 'compileJs', timeStart: timeStart, endColor: 'yellow' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'compileJs' })
  }
}

export { compileJs }
