import chokidar from 'chokidar'
import chalk from 'chalk'
import { compileCss } from '../css/index.js'
import { compileScss } from '../sass/index.js'
import { compileJs } from '../rollup/index.js'
import { addCssTemplate, addJsTemplate } from '../template/index.js'
import * as utils from '../utils/index.js'

async function watchAll (localConf) {
  try {
    chokidar.watch([`${localConf.CSS_DIST}*.css`], { ignoreInitial: true, awaitWriteFinish: false }).on('add', (event, path) => {
      addCssTemplate(localConf)
    })

    chokidar.watch([`${localConf.JS_DIST}*.js`], { ignoreInitial: true, awaitWriteFinish: false }).on('add', (event, path) => {
      addJsTemplate(localConf)
    })

    chokidar.watch([`${localConf.CSS_SRC}**/*.css`, `${localConf.CSS_SRC}${localConf.VENDOR_FOLDER}*.css`], { ignoreInitial: true, awaitWriteFinish: false }).on('all', (event, path) => {
      console.log(chalk`{red ${event}} ${path}`)
      compileCss(localConf, { hideStatus: true })
    })

    chokidar.watch([`${localConf.JS_SRC}**/*.js`, `${localConf.JS_SRC}${localConf.VENDOR_FOLDER}*.js`], { ignoreInitial: true, awaitWriteFinish: false }).on('all', (event, path) => {
      console.log(chalk`{red ${event}} ${path}`)
      compileJs(localConf, { hideStatus: true })
    })

    chokidar.watch(`${localConf.SCSS_SRC}**/*.scss`, { ignoreInitial: true }).on('all', (event, path) => {
      console.log(chalk`{red ${event}} ${path}`)
      compileScss(localConf, { hideStatus: true })
    })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'watchAll' })
  }
}

export { watchAll }
