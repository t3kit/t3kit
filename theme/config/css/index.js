const fsPromises = require('fs').promises
const fse = require('fs-extra')
const pEachSeries = require('p-each-series')
const size = require('filesize')
const postcss = require('postcss')
const cssimport = require('postcss-import')
const cssnano = require('cssnano')
const conf = require('../conf')
const utils = require('../utils')

const postcssPlugins = [
  cssimport
]
process.env.NODE_ENV === 'production' && postcssPlugins.push(cssnano({ preset: 'default' }))

async function compileCss () {
  try {
    const timeStart = utils.start('compileCss')
    const fileList = []

    await fse.ensureDir(conf.CSS_DIST)
    const files = await utils.getFileList(`${conf.CSS_SRC}*.css`, { objectMode: true })

    await pEachSeries(files, async (file, index) => {
      const css = await fsPromises.readFile(file.path)
      const postcssResult = await postcss(postcssPlugins).process(css, {
        map: process.env.NODE_ENV === 'production' ? { inline: false, annotation: false } : { inline: false },
        from: file.path,
        to: `${conf.CSS_DIST}${file.name}`
      })
      await fsPromises.writeFile(`${conf.CSS_DIST}${file.name}`, postcssResult.css)
      if (postcssResult.map) {
        await fsPromises.writeFile(`${conf.CSS_DIST}${file.name}.map`, postcssResult.map.toString())
      }
      const fileStats = await fsPromises.stat(`${conf.CSS_DIST}${file.name}`)
      fileList[index] = { name: `${conf.ASSETS_FOLDER}${conf.CONTEXT}/${conf.CSS_FOLDER}${file.name}`, size: size(fileStats.size) }
    })

    utils.boxEnd(fileList, 'compileCss', timeStart)
  } catch (error) {
    utils.errLogFn(error, 'compileCss')
  }
}

exports.compileCss = compileCss
