import { localConf } from './localconf/index.js'
import { checkNode } from './check/node.js'
import { clean } from './clean/index.js'
import { compileCss } from './css/index.js'
import { compileScss } from './sass/index.js'
import { compileJs } from './rollup/index.js'
import { addCssTemplate, addJsTemplate } from './template/index.js'
import { compressCss, compressJs } from './compress/index.js'
import { revCss, revJs } from './rev/index.js'
import * as utils from './utils/index.js'
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
