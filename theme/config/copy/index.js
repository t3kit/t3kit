import pEachSeries from 'p-each-series'
import cpy from 'cpy'
import * as utils from '../utils/index.js'

async function copyIcons (localConf) {
  try {
    const timeStart = utils.start('copyIcons', 'blue')

    await pEachSeries(localConf.ICONS, async (icons) => {
      await cpy(icons.src, icons.dist)
    })

    utils.boxEnd({ functionName: 'copyIcons', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'copyIcons' })
  }
}

async function copyFileTypeIcons (localConf) {
  try {
    const timeStart = utils.start('copyFileTypeIcons', 'blue')

    await cpy(`${localConf.FILE_TYPE_ICONS_SRC}`, `${localConf.FILE_TYPE_ICONS_DIST}`)

    utils.boxEnd({ functionName: 'copyFileTypeIcons', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'copyFileTypeIcons' })
  }
}

export { copyIcons, copyFileTypeIcons }
