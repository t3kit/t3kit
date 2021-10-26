import fsPromises from 'fs/promises'
import fse from 'fs-extra'
import pEachSeries from 'p-each-series'
import size from 'filesize'
import postcss from 'postcss'
import cssimport from 'postcss-import'
import cssnano from 'cssnano'
import * as utils from '../utils/index.js'

const postcssPlugins = [cssimport]
process.env.NODE_ENV === 'production' && postcssPlugins.push(cssnano({ preset: 'default' }))

async function compileCss (localConf, options) {
  try {
    options = options || {}
    const hideStatus = options.hideStatus || false

    const timeStart = utils.start('compileCss', 'blue')
    const fileList = []

    await fse.ensureDir(localConf.CSS_DIST)
    const files = await utils.getFileList(`${localConf.CSS_SRC}*.css`, { objectMode: true })

    await pEachSeries(files, async (file, index) => {
      const css = await fsPromises.readFile(file.path)
      const postcssResult = await postcss(postcssPlugins).process(css, {
        map: process.env.NODE_ENV === 'production' ? { inline: false, annotation: false } : { inline: false },
        from: file.path,
        to: `${localConf.CSS_DIST}${file.name}`
      })
      await fsPromises.writeFile(`${localConf.CSS_DIST}${file.name}`, postcssResult.css)
      if (postcssResult.map) {
        await fsPromises.writeFile(`${localConf.CSS_DIST}${file.name}.map`, postcssResult.map.toString())
      }
      const fileStats = await fsPromises.stat(`${localConf.CSS_DIST}${file.name}`)
      fileList[index] = { name: `${localConf.ASSETS_FOLDER}${localConf.CONTEXT}/${localConf.CSS_FOLDER}${file.name}`, size: size(fileStats.size) }
    })

    hideStatus || utils.boxEnd({ files: fileList, functionName: 'compileCss', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'compileCss' })
  }
}

export { compileCss }
