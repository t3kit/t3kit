const utils = require('../utils')
const chokidar = require('chokidar')
const chalk = require('chalk')
const { compileCss } = require('../css')
const { compileScss } = require('../sass')
const { compileJs } = require('../rollup')
const { addCssTemplate, addJsTemplate } = require('../template')

async function watchAll () {
  try {
    chokidar.watch(['Resources/Public/assets/development/Css/*.css'], { ignoreInitial: true, awaitWriteFinish: false }).on('add', (event, path) => {
      addCssTemplate()
    })

    chokidar.watch(['Resources/Public/assets/development/Js/*.js'], { ignoreInitial: true, awaitWriteFinish: false }).on('add', (event, path) => {
      addJsTemplate()
    })

    chokidar.watch(['theme/src/css/**/*.css', 'theme/src/vendor/css/*.css'], { ignoreInitial: true, awaitWriteFinish: false }).on('all', (event, path) => {
      console.log(chalk`{red ${event}} ${path}`)
      compileCss({ hideStatus: true })
    })

    chokidar.watch(['theme/src/js/**/*.js', 'theme/src/vendor/js/*.js'], { ignoreInitial: true, awaitWriteFinish: false }).on('all', (event, path) => {
      console.log(chalk`{red ${event}} ${path}`)
      compileJs({ hideStatus: true })
    })

    chokidar.watch('theme/src/scss/**/*.scss', { ignoreInitial: true }).on('all', (event, path) => {
      console.log(chalk`{red ${event}} ${path}`)
      compileScss({ hideStatus: true })
    })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'watchAll' })
  }
}

exports.watchAll = watchAll
