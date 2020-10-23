const fs = require('fs')
const fse = require('fs-extra')
const fsPromises = fs.promises
const conf = require('../conf')
const rootDir = require('app-root-path').path
var postcss = require("postcss")
var atImport = require("postcss-import")

const CSS_DIST = conf.CSS_DIST
// const JS_DIST = conf.JS_DIST
const llll = `${rootDir}/theme/src/css`

// let JS_LINK
let CSS_LINK
let CSS_LINK_ASYNC
if (process.env.NODE_ENV === 'production') {
  // JS_LINK = conf.JS_LINK_PROD
  CSS_LINK = conf.CSS_LINK_PROD
  CSS_LINK_ASYNC = conf.CSS_LINK_ASYNC_PROD
} else {
  // JS_LINK = conf.JS_LINK_DEV
  CSS_LINK = conf.CSS_LINK_DEV
  CSS_LINK_ASYNC = conf.CSS_LINK_ASYNC_DEV
}

async function getFileList (dir) {
  let files
  try {
    await fse.ensureDir(dir)
    files = await fsPromises.readdir(dir, { withFileTypes: true })
  } catch (error) {
    console.error('(getFileList) Error:', error)
  }

  if (files !== undefined) {
    // files = files.filter(item => {
    //   return !(item.includes('map') || item.includes('br') || item.includes('gz') || item.includes('html'))
    // })
    // files = files.filter(dirent => dirent.isFile())
    files = files.filter(dirent => dirent.isFile())
      .map(dirent => dirent.name)
      .filter(item => { return !(item.includes('map') || item.includes('br') || item.includes('gz') || item.includes('html')) })
    console.log('getFileList -> files', files)
    return files
  }

}

// getFileList(llll)


// async function addJsTemplate () {
//   try {
//     const files = await getFileList(JS_DIST)
//     let link = ''
//     files.forEach(async (fileName) => {
//       if (fileName.includes('jquery')) {
//         link = JS_LINK.replace('%_file_%', fileName).replace('%_id_%', fileName.slice(0, -3))
//         await fsPromises.writeFile(`${JS_DIST}Jquery.html`, link)
//       } else if (fileName.includes('main')) {
//         link = JS_LINK.replace('%_file_%', fileName).replace('%_id_%', fileName.slice(0, -3))
//         await fsPromises.writeFile(`${JS_DIST}Mainjs.html`, link)
//       } else {
//         let tmplName
//         if (fileName.includes('-')) {
//           tmplName = fileName.split('.')[0].split('-')[0]
//         } else {
//           tmplName = fileName.split('.')[0]
//         }
//         tmplName = tmplName.charAt(0).toUpperCase() + tmplName.slice(1)
//         link = JS_LINK.replace('%_file_%', fileName).replace('%_id_%', fileName.slice(0, -3))
//         await fsPromises.writeFile(`${JS_DIST}${tmplName}.html`, link)
//       }
//     })
//   } catch (error) {
//     console.error('(addJsTemplate) Error:', error)
//   }
// }

// async function addCssTemplate () {
//   try {
//     const files = await getFileList(CSS_DIST)
//     let link = ''
//     files.forEach(async (fileName) => {
//       if (fileName.includes('main')) {
//         link = CSS_LINK.replace('%_file_%', fileName).replace('%_id_%', fileName.slice(0, -4))
//         await fsPromises.writeFile(`Maincss.html`, link)
//         // await fsPromises.writeFile(`${CSS_DIST}Maincss.html`, link)
//       } else {
//         let tmplName
//         if (fileName.includes('-')) {
//           tmplName = fileName.split('.')[0].split('-')[0]
//         } else {
//           tmplName = fileName.split('.')[0]
//         }
//         tmplName = tmplName.charAt(0).toUpperCase() + tmplName.slice(1)
//         link = CSS_LINK.replace('%_file_%', fileName).replace('%_id_%', fileName.slice(0, -4))
//         // await fse.ensureDir(dir)
//         // await fsPromises.writeFile(`${tmplName}.html`, link)
//         await fsPromises.writeFile(`${CSS_DIST}${tmplName}.html`, link)
//       }
//     })
//   } catch (error) {
//     console.error('(addCssTemplate) Error:', error)
//   }
// }

async function addCssTemplate222 () {
  try {
    const files = await getFileList(llll)
    // await fse.ensureDir(CSS_DIST)
    let link = ''
    files.forEach(async (fileName) => {
    console.log('fileName', fileName)
      // if (fileName.includes('main')) {
      //   link = CSS_LINK.replace('%_file_%', fileName).replace('%_id_%', fileName.slice(0, -4))
      //   await fsPromises.writeFile(`Maincss.html`, link)
      //   // await fsPromises.writeFile(`${CSS_DIST}Maincss.html`, link)
      // } else {
        // let tmplName = fileName.split('.')[0]
        // if (fileName.includes('async')) {
        //   // tmplName = fileName.split('.')[0].split('--')[0]
        //   link = CSS_LINK_ASYNC
        //   // console.log('www', tmplName)
        // } else {
        //   // tmplName = fileName.split('.')[0]
        //   link = CSS_LINK
        // }
        // tmplName = tmplName.charAt(0).toUpperCase() + tmplName.slice(1)
        // link = link.replace('%_file_%', fileName).replace('%_id_%', fileName.slice(0, -4))
        // console.log('addCssTemplate -> tmplName', tmplName)
        // console.log('addCssTemplate -> link', link)
        // // await fsPromises.writeFile(`${tmplName}.html`, link)
        // // await fse.ensureDir(CSS_DIST)
        // await fsPromises.writeFile(`${CSS_DIST}${tmplName}.html`, link)
      // }
    })
  } catch (error) {
    console.error('(addCssTemplate) Error:', error)
  }
}

// console.log('llll', llll)
addCssTemplate222()
// addCssTemplate()

// exports.addJsTemplate = addJsTemplate
// exports.addCssTemplate222 = addCssTemplate222
