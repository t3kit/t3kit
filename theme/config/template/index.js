const fsPromises = require('fs').promises
const pEachSeries = require('p-each-series')
const conf = require('../conf')
const utils = require('../utils')

function addLinkSettings (link, settings) {
  return link.replace('%_settings_%', settings)
}

async function addCssTemplate () {
  try {
    const timeStart = utils.start('addCssTemplate', 'blue')
    const fileList = []

    const files = await utils.getFileList(`${conf.CSS_DIST}*.css`, { objectMode: true })
    let link = ''
    await pEachSeries(files, async (file, index) => {
      const fileName = file.name
      let tmplName = fileName.split('.')[0]
      if (process.env.NODE_ENV === 'production') {
        tmplName = tmplName.slice(0, -11)
      }
      if (fileName.includes('async')) {
        link = conf.CSS_LINK_ASYNC
      } else {
        link = conf.CSS_LINK
      }
      tmplName = tmplName.charAt(0).toUpperCase() + tmplName.slice(1)
      link = link.replace('%_file_%', fileName).replace('%_id_%', fileName.slice(0, -4))
      await fsPromises.writeFile(`${conf.CSS_DIST}${tmplName}.html`, link)

      fileList[index] = { name: `${conf.ASSETS_FOLDER}${conf.CONTEXT}/${conf.CSS_FOLDER}${tmplName}.html` }
    })

    utils.boxEnd({ files: fileList, functionName: 'addCssTemplate', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'addCssTemplate' })
  }
}

async function addJsTemplate () {
  try {
    const timeStart = utils.start('addJsTemplate', 'yellow')
    const fileList = []

    const files = await utils.getFileList(`${conf.JS_DIST}*.js`, { objectMode: true })
    let link = ''
    await pEachSeries(files, async (file, index) => {
      const fileName = file.name
      let tmplName = fileName.split('.')[0]
      if (process.env.NODE_ENV === 'production') {
        tmplName = tmplName.slice(0, -11)
      }

      if (fileName.includes('defer')) {
        if (fileName.includes('defer-p1')) {
          link = addLinkSettings(conf.JS_LINK, 'defer="true" priority="1"')
        } else {
          link = addLinkSettings(conf.JS_LINK, 'defer="true"')
        }
      } else if (fileName.includes('async')) {
        if (fileName.includes('async-p1')) {
          link = addLinkSettings(conf.JS_LINK, 'async="true" priority="1"')
        } else {
          link = addLinkSettings(conf.JS_LINK, 'async="true"')
        }
      } else {
        link = addLinkSettings(conf.JS_LINK, '')
      }
      tmplName = tmplName.charAt(0).toUpperCase() + tmplName.slice(1)
      link = link.replace('%_file_%', fileName).replace('%_id_%', fileName.slice(0, -3))
      await fsPromises.writeFile(`${conf.JS_DIST}${tmplName}.html`, link)

      fileList[index] = { name: `${conf.ASSETS_FOLDER}${conf.CONTEXT}/${conf.JS_FOLDER}${tmplName}.html` }
    })

    utils.boxEnd({ files: fileList, functionName: 'addJsTemplate', timeStart: timeStart, endColor: 'yellow' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'addJsTemplate' })
  }
}

exports.addJsTemplate = addJsTemplate
exports.addCssTemplate = addCssTemplate
