const { watch, parallel } = require('gulp')
const rollup = require('rollup')
const { terser } = require('rollup-plugin-terser')
const sizes = require('rollup-plugin-sizes')
const resolve = require('@rollup/plugin-node-resolve')
const legacy = require('@rollup/plugin-legacy')
const conf = require('../conf')

const SRC = conf.JS_SRC
const DIST = conf.JS_DIST

// compile mainjs
const mainJsInputOptions = {
  input: `${SRC}main.js`,
  plugins: [
    resolve(),
    sizes(),
    legacy({
      '../../node_modules/simplelightbox/dist/simple-lightbox.js': 'SimpleLightbox'
    })
  ]
}
process.env.NODE_ENV === 'production' && mainJsInputOptions.plugins.push(terser({
  output: {
    comments: false
  }
}))
const mainJsOutputOptions = {
  file: `${DIST}main.js`,
  format: 'iife',
  sourcemap: process.env.NODE_ENV === 'production' ? 'hidden' : true,
  sourcemapExcludeSources: true
}
async function compileMainJs () {
  const bundle = await rollup.rollup(mainJsInputOptions)
  await bundle.write(mainJsOutputOptions)
}

// compile plugin1
const plugin1InputOptions = {
  input: `${SRC}plugin1.js`,
  plugins: [
    resolve(),
    sizes()
  ]
}
process.env.NODE_ENV === 'production' && plugin1InputOptions.plugins.push(terser({
  output: {
    comments: false
  }
}))
const plugin1OutputOptions = {
  file: `${DIST}plugin1.js`,
  format: 'iife',
  sourcemap: process.env.NODE_ENV === 'production' ? 'hidden' : true,
  sourcemapExcludeSources: true
}
async function compilePlugin1 () {
  const bundle = await rollup.rollup(plugin1InputOptions)
  await bundle.write(plugin1OutputOptions)
}

// compile plugin2
const plugin2InputOptions = {
  input: `${SRC}plugin2.js`,
  plugins: [
    resolve(),
    sizes()
  ]
}
process.env.NODE_ENV === 'production' && plugin2InputOptions.plugins.push(terser({
  output: {
    comments: false
  }
}))
const plugin2OutputOptions = {
  file: `${DIST}plugin2.js`,
  format: 'iife',
  sourcemap: process.env.NODE_ENV === 'production' ? 'hidden' : true,
  sourcemapExcludeSources: true
}
async function compilePlugin2 () {
  const bundle = await rollup.rollup(plugin2InputOptions)
  await bundle.write(plugin2OutputOptions)
}

function compileMainJsWatch () {
  watch([`${SRC}main/**/*.js`, `${SRC}main.js`], compileMainJs)
}
function compilePlugin1JsWatch () {
  watch([`${SRC}plugin1/**/*.js`, `${SRC}plugin1.js`], compilePlugin1)
}
function compilePlugin2JsWatch () {
  watch([`${SRC}plugin2/**/*.js`, `${SRC}plugin2.js`], compilePlugin2)
}

exports.compileJs = parallel(compileMainJs, compilePlugin1, compilePlugin2)
exports.compileJsWatch = parallel(compileMainJsWatch, compilePlugin1JsWatch, compilePlugin2JsWatch)
