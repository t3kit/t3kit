const chokidar = require('chokidar')
const chalk = require('chalk')
const { compileCss } = require('../css')
const { compileScss } = require('../sass')
const { compileJs } = require('../rollup')
const { addCssTemplate, addJsTemplate } = require('../template')
const conf = require('../conf')
const utils = require('../utils')

async function watchAll () {
  try {
    chokidar.watch([`${conf.CSS_DIST}*.css`], { ignoreInitial: true, awaitWriteFinish: false }).on('add', (event, path) => {
      addCssTemplate()
    })

    chokidar.watch([`${conf.JS_DIST}*.js`], { ignoreInitial: true, awaitWriteFinish: false }).on('add', (event, path) => {
      addJsTemplate()
    })

    chokidar.watch([`${conf.CSS_SRC}**/*.css`, `${conf.CSS_SRC}${conf.VENDOR_FOLDER}*.css`], { ignoreInitial: true, awaitWriteFinish: false }).on('all', (event, path) => {
      console.log(chalk`{red ${event}} ${path}`)
      compileCss({ hideStatus: true })
    })

    chokidar.watch([`${conf.JS_SRC}**/*.js`, `${conf.JS_SRC}${conf.VENDOR_FOLDER}*.js`], { ignoreInitial: true, awaitWriteFinish: false }).on('all', (event, path) => {
      console.log(chalk`{red ${event}} ${path}`)
      compileJs({ hideStatus: true })
    })

    chokidar.watch(`${conf.SCSS_SRC}**/*.scss`, { ignoreInitial: true }).on('all', (event, path) => {
      console.log(chalk`{red ${event}} ${path}`)
      compileScss({ hideStatus: true })
    })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'watchAll' })
  }
}

exports.watchAll = watchAll
