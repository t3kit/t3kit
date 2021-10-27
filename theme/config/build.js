import { localConf } from './localconf.js'
import { checkNode } from './modules/check.js'
import { clean } from './modules/clean.js'
import { compileCss } from './modules/css.js'
import { compileScss } from './modules/sass.js'
import { compileJs } from './modules/rollup.js'
import { addCssTemplate, addJsTemplate } from './modules/template.js'
import { compressCss, compressJs } from './modules/compress.js'
import { revCss, revJs } from './modules/rev.js'
import * as utils from './modules/utils.js'
checkNode()

async function build () {
  const timeStart = utils.mainTaskStart('Build task')
  await clean(localConf)
  await compileScss(localConf)
  await Promise.all([compileCss(localConf), compileJs(localConf)])
  if (process.env.NODE_ENV === 'production') {
    await Promise.all([revCss(localConf), revJs(localConf)])
    await Promise.all([addCssTemplate(localConf), addJsTemplate(localConf)])
    await Promise.all([compressCss(localConf), compressJs(localConf)])
  } else {
    await Promise.all([addCssTemplate(localConf), addJsTemplate(localConf)])
  }

  utils.mainTaskEnd({ taskName: 'Build task', timeStart: timeStart })
}
build()
