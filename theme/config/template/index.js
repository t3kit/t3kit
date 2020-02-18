const fs = require('fs')
const fsPromises = fs.promises
const vars = require('../vars')

const CSS_DIST = `${vars.DIST}${vars.CSS_DIST}`
const JS_DIST = `${vars.DIST}${vars.JS_DIST}`

let JS_LINK
let CSS_LINK
if (process.env.NODE_ENV === 'production') {
  JS_LINK = vars.JS_LINK_PROD
  CSS_LINK = vars.CSS_LINK_PROD
} else {
  JS_LINK = vars.JS_LINK_DEV
  CSS_LINK = vars.CSS_LINK_DEV
}

async function getFileList (dir) {
  let files
  try {
    files = await fsPromises.readdir(dir)
  } catch (err) {
    console.error('(getFileList) Error:', err)
  }

  if (files !== undefined) {
    files = files.filter(item => {
      return !(item.includes('map') || item.includes('br') || item.includes('gz') || item.includes('html'))
    })
    return files
  }
}

async function addJsTemplate () {
  try {
    const files = await getFileList(JS_DIST)
    let link = ''
    files.forEach(async (fileName) => {
      if (fileName.includes('jquery') || fileName.includes('main')) {
        link += JS_LINK.replace('%_file_%', fileName) + '\n'
        await fsPromises.writeFile(`${JS_DIST}mainjs.html`, link)
      } else {
        let tmplName
        if (fileName.includes('-')) {
          tmplName = fileName.split('.')[0].split('-')[0]
        } else {
          tmplName = fileName.split('.')[0]
        }
        link = JS_LINK.replace('%_file_%', fileName)
        await fsPromises.writeFile(`${JS_DIST}${tmplName}.html`, link)
      }
    })
  } catch (error) {
    console.error('(addJsTemplate) Error:', error)
  }
}

async function addCssTemplate () {
  try {
    const files = await getFileList(CSS_DIST)
    let link = ''
    files.forEach(async (fileName) => {
      if (fileName.includes('main')) {
        link += CSS_LINK.replace('%_file_%', fileName) + '\n'
        await fsPromises.writeFile(`${CSS_DIST}maincss.html`, link)
      } else {
        let tmplName
        if (fileName.includes('-')) {
          tmplName = fileName.split('.')[0].split('-')[0]
        } else {
          tmplName = fileName.split('.')[0]
        }
        link = CSS_LINK.replace('%_file_%', fileName)
        await fsPromises.writeFile(`${CSS_DIST}${tmplName}.html`, link)
      }
    })
  } catch (error) {
    console.error('(addCssTemplate) Error:', error)
  }
}

exports.addJsTemplate = addJsTemplate
exports.addCssTemplate = addCssTemplate
