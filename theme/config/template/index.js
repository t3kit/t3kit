import fsPromises from 'fs/promises'
import pEachSeries from 'p-each-series'
import * as utils from '../utils/index.js'

function addLinkSettings (link, settings) {
  return link.replace('%_settings_%', settings)
}

async function addCssTemplate (localConf) {
  try {
    const timeStart = utils.start('addCssTemplate', 'blue')
    const fileList = []

    const files = await utils.getFileList(`${localConf.CSS_DIST}*.css`, { objectMode: true })
    let link = ''
    await pEachSeries(files, async (file, index) => {
      const fileName = file.name
      let tmplName = fileName.split('.')[0]
      if (process.env.NODE_ENV === 'production') {
        tmplName = tmplName.slice(0, -11)
      }
      if (fileName.includes('async')) {
        link = localConf.CSS_LINK_ASYNC
      } else if (fileName.includes('inline')) {
        const fileInline = await fsPromises.readFile(file.path, 'utf8')
        if (fileName.includes('inline-p1')) {
          link = addLinkSettings(localConf.CSS_LINK_INLINE, 'priority="1"').replace('%_inlineData_%', fileInline).replace('sourceMappingURL', '')
        } else {
          link = addLinkSettings(localConf.CSS_LINK_INLINE, '').replace('%_inlineData_%', fileInline).replace('sourceMappingURL', '')
        }
      } else {
        link = localConf.CSS_LINK
      }
      tmplName = tmplName.charAt(0).toUpperCase() + tmplName.slice(1)
      link = link.replace('%_file_%', fileName).replace('%_id_%', fileName.slice(0, -4))
      await fsPromises.writeFile(`${localConf.CSS_DIST}${tmplName}.html`, link)

      fileList[index] = { name: `${localConf.ASSETS_FOLDER}${localConf.CONTEXT}/${localConf.CSS_FOLDER}${tmplName}.html` }
    })

    utils.boxEnd({ files: fileList, functionName: 'addCssTemplate', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'addCssTemplate' })
  }
}

async function addJsTemplate (localConf) {
  try {
    const timeStart = utils.start('addJsTemplate', 'yellow')
    const fileList = []

    const files = await utils.getFileList(`${localConf.JS_DIST}*.js`, { objectMode: true })
    let link = ''
    await pEachSeries(files, async (file, index) => {
      const fileName = file.name
      let tmplName = fileName.split('.')[0]
      if (process.env.NODE_ENV === 'production') {
        tmplName = tmplName.slice(0, -11)
      }

      if (fileName.includes('defer')) {
        if (fileName.includes('defer-p1')) {
          link = addLinkSettings(localConf.JS_LINK, 'defer="true" priority="1"')
        } else {
          link = addLinkSettings(localConf.JS_LINK, 'defer="true"')
        }
      } else if (fileName.includes('async')) {
        if (fileName.includes('async-p1')) {
          link = addLinkSettings(localConf.JS_LINK, 'async="true" priority="1"')
        } else {
          link = addLinkSettings(localConf.JS_LINK, 'async="true"')
        }
      } else if (fileName.includes('inline')) {
        const fileInline = await fsPromises.readFile(file.path, 'utf8')
        if (fileName.includes('inline-p1')) {
          link = addLinkSettings(localConf.JS_LINK_INLINE, 'priority="1"').replace('%_inlineData_%', fileInline).replace('sourceMappingURL', '')
        } else {
          link = addLinkSettings(localConf.JS_LINK_INLINE, '').replace('%_inlineData_%', fileInline).replace('sourceMappingURL', '')
        }
      } else {
        if (fileName.includes('-p1')) {
          link = addLinkSettings(localConf.JS_LINK, 'priority="1"')
        } else {
          link = addLinkSettings(localConf.JS_LINK, '')
        }
      }
      tmplName = tmplName.charAt(0).toUpperCase() + tmplName.slice(1)
      link = link.replace('%_file_%', fileName).replace('%_id_%', fileName.slice(0, -3))
      await fsPromises.writeFile(`${localConf.JS_DIST}${tmplName}.html`, link)

      fileList[index] = { name: `${localConf.ASSETS_FOLDER}${localConf.CONTEXT}/${localConf.JS_FOLDER}${tmplName}.html` }
    })

    utils.boxEnd({ files: fileList, functionName: 'addJsTemplate', timeStart: timeStart, endColor: 'yellow' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'addJsTemplate' })
  }
}

export { addJsTemplate, addCssTemplate }
