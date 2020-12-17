const fsPromises = require('fs').promises
const conf = require('../conf')
const utils = require('../utils')
const globby = require('globby')

let JS_LINK
let CSS_LINK
let CSS_LINK_ASYNC
if (process.env.NODE_ENV === 'production') {
  JS_LINK = conf.JS_LINK_PROD
  CSS_LINK = conf.CSS_LINK_PROD
  CSS_LINK_ASYNC = conf.CSS_LINK_ASYNC_PROD
} else {
  JS_LINK = conf.JS_LINK_DEV
  CSS_LINK = conf.CSS_LINK_DEV
  CSS_LINK_ASYNC = conf.CSS_LINK_ASYNC_DEV
}

function addLinkSettings (link, settings) {
  return link.replace('%_settings_%', settings)
}

async function addCssTemplate () {
  try {
    const files = await utils.getFileList(`${conf.CSS_DIST}*.css`, { objectMode: true })
    let link = ''
    files.forEach(async (file) => {
      const fileName = file.name
      let tmplName = fileName.split('.')[0]
      if (process.env.NODE_ENV === 'production') {
        tmplName = tmplName.slice(0, -11)
      }
      if (fileName.includes('async')) {
        link = CSS_LINK_ASYNC
      } else {
        link = CSS_LINK
      }
      tmplName = tmplName.charAt(0).toUpperCase() + tmplName.slice(1)
      link = link.replace('%_file_%', fileName).replace('%_id_%', fileName.slice(0, -4))
      await fsPromises.writeFile(`${conf.CSS_DIST}${tmplName}.html`, link)
    })
    return true
  } catch (error) {
    console.error('(addCssTemplate) Error:', error)
  }
}

async function addJsTemplate () {
  try {
    const files = await utils.getFileList(`${conf.JS_DIST}*.js`, { objectMode: true })
    let link = ''
    files.forEach(async (file) => {
      const fileName = file.name
      let tmplName = fileName.split('.')[0]
      if (process.env.NODE_ENV === 'production') {
        tmplName = tmplName.slice(0, -11)
      }

      if (fileName.includes('defer')) {
        if (fileName.includes('defer-p1')) {
          link = addLinkSettings(JS_LINK, 'defer="true" priority="1"')
        } else {
          link = addLinkSettings(JS_LINK, 'defer="true"')
        }
      } else if (fileName.includes('async')) {
        if (fileName.includes('async-p1')) {
          link = addLinkSettings(JS_LINK, 'async="true" priority="1"')
        } else {
          link = addLinkSettings(JS_LINK, 'async="true"')
        }
      } else {
        link = addLinkSettings(JS_LINK, '')
      }
      tmplName = tmplName.charAt(0).toUpperCase() + tmplName.slice(1)
      link = link.replace('%_file_%', fileName).replace('%_id_%', fileName.slice(0, -3))
      await fsPromises.writeFile(`${conf.JS_DIST}${tmplName}.html`, link)
    })
  } catch (error) {
    console.error('(addJsTemplate) Error:', error)
  }
}

// addCssTemplate()
// addJsTemplate()


exports.addJsTemplate = addJsTemplate
exports.addCssTemplate = addCssTemplate
