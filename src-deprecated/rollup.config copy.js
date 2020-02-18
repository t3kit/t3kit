
// export default {
//   input: 'index.js',
//   output: {
//     dir: 'output',
//     // format: 'cjs'
//     format: 'iife'
//     // globals: 'jquery'
//   },
//   globals: {
//     jquery: 'jQuery'
//   },
//   external: ['jquery', 'popper.js'],
//   plugins: [
//     inject({
//       $: 'jquery'

//     }),
//     commonjs({
//       include: ['node_modules/bootstrap/**', 'node_modules/jquery/**'],
//       namedExports: {
//         'node_modules/jquery/dist/jquery.js': 'jquery'
//       }
//     })
//   ]
// }

'use strict'

// const path = require('path')
const babel = require('rollup-plugin-babel')
// const resolve = require('rollup-plugin-node-resolve')

// const BUNDLE = process.env.BUNDLE === 'true'
// const ESM = process.env.ESM === 'true'

// let fileDest = `bootstrap${ESM ? '.esm' : ''}`
const external = ['jquery.js']
const plugins = [
  babel({
  // Only transpile our source code
    exclude: 'node_modules/**',
    // Include only required helpers
    externalHelpersWhitelist: [
      'defineProperties',
      'createClass',
      'inheritsLoose',
      'defineProperty',
      'objectSpread2'
    ]
  })
]
const globals = {
  'jquery.js': 'jQuery'
}

// if (BUNDLE) {
//   fileDest += '.bundle'
//   // Remove last entry in external array to bundle Popper
//   external.pop()
//   delete globals['popper.js']
//   plugins.push(resolve())
// }

const rollupConfig = {
  input: 'index.js',
  output: {
    dir: 'output',
    // format: 'cjs'
    // format: 'iife',
    format: 'umd',
    // input: path.resolve(__dirname, `../js/index.${ESM ? 'esm' : 'umd'}.js`),
    // output: {
    // file: path.resolve(__dirname, `../dist/js/${fileDest}.js`),
    // format: ESM ? 'esm' : 'umd',
    globals
  },
  external,
  plugins
}

module.exports = rollupConfig
