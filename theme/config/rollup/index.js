const rollup = require('rollup')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')
const sizes = require('rollup-plugin-sizes')
const iife = require('rollup-plugin-iife')
const conf = require('../conf')
const utils = require('../utils')

async function inputOptions () {
  const files = await utils.getFileList(`${conf.JS_SRC}*.js`)
  console.log('🚀 ~ file: index.js ~ line 11 ~ inputOptions ~ files11111111', files)
  const inputOptions = {
    input: files,
    plugins: [
      nodeResolve(),
      sizes(),
      iife()
    ]
  }
  process.env.NODE_ENV === 'production' && inputOptions.plugins.push(terser({
    output: {
      comments: false
    }
  }))
  return inputOptions
}

const outputOptions = {
  dir: conf.JS_DIST,
  sourcemap: process.env.NODE_ENV === 'production' ? 'hidden' : true,
  sourcemapExcludeSources: true
}
async function compileJs () {
console.log('🚀 ~ file: index.js ~ line 34 ~ compileJs ~ compileJs', "1111111")

const bundle = await rollup.rollup(await inputOptions())
console.log('🚀 ~ file: index.js ~ line 34 ~ compileJs ~ compileJs', "22222")
await bundle.write(outputOptions)
console.log('🚀 ~ file: index.js ~ line 34 ~ compileJs ~ compileJs', "33333")
}

exports.compileJs = compileJs
