const fs = require('fs')
const fse = require('fs-extra')
const fsPromises = fs.promises
const conf = require('../conf')

const CSS_DIST = conf.CSS_DIST
const JS_DIST = conf.JS_DIST

let JS_LINK
// let JS_LINK_DEFER
// let JS_LINK_ASYNC
let CSS_LINK
let CSS_LINK_ASYNC
if (process.env.NODE_ENV === 'production') {
  JS_LINK = conf.JS_LINK_PROD
  // JS_LINK_DEFER = conf.JS_LINK_DEFER_PROD
  // JS_LINK_ASYNC = conf.JS_LINK_ASYNC_PROD
  CSS_LINK = conf.CSS_LINK_PROD
  CSS_LINK_ASYNC = conf.CSS_LINK_ASYNC_PROD
} else {
  JS_LINK = conf.JS_LINK_DEV
  // JS_LINK_DEFER = conf.JS_LINK_DEFER_DEV
  // JS_LINK_ASYNC = conf.JS_LINK_ASYNC_DEV
  CSS_LINK = conf.CSS_LINK_DEV
  CSS_LINK_ASYNC = conf.CSS_LINK_ASYNC_DEV
}

function addLinkSettings (link, settings) {
  return link.replace('%_settings_%', settings)
}
// async function getFileList (dir) {
//   let files
//   try {
//     await fse.ensureDir(dir)
//     files = await fsPromises.readdir(dir)
//   } catch (error) {
//     console.error('(getFileList) Error:', error)
//   }

//   if (files !== undefined) {
//     files = files.filter(item => {
//       return !(item.includes('map') || item.includes('br') || item.includes('gz') || item.includes('html'))
//     })
//     return files
//   }
// }

async function getFileList (dir) {
  let files
  try {
    await fse.ensureDir(dir)
    files = await fsPromises.readdir(dir, { withFileTypes: true })
  } catch (error) {
    console.error('(getFileList) Error:', error)
  }

  if (files !== undefined) {
    files = files.filter(dirent => dirent.isFile())
      .map(dirent => dirent.name)
      .filter(item => { return !(item.includes('map') || item.includes('br') || item.includes('gz') || item.includes('html')) })
    return files
  }
}






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
//         await fsPromises.writeFile(`${CSS_DIST}Maincss.html`, link)
//       } else {
//         let tmplName
//         if (fileName.includes('-')) {
//           tmplName = fileName.split('.')[0].split('-')[0]
//         } else {
//           tmplName = fileName.split('.')[0]
//         }
//         tmplName = tmplName.charAt(0).toUpperCase() + tmplName.slice(1)
//         link = CSS_LINK.replace('%_file_%', fileName).replace('%_id_%', fileName.slice(0, -4))
//         await fsPromises.writeFile(`${CSS_DIST}${tmplName}.html`, link)
//       }
//     })
//   } catch (error) {
//     console.error('(addCssTemplate) Error:', error)
//   }
// }

async function addCssTemplate () {
  try {
    const files = await getFileList(CSS_DIST)
    let link = ''
    files.forEach(async (fileName) => {
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
      await fsPromises.writeFile(`${CSS_DIST}${tmplName}.html`, link)
    })
  } catch (error) {
    console.error('(addCssTemplate) Error:', error)
  }
}

async function addJsTemplate () {
  try {
    const files = await getFileList(JS_DIST)
    let link = ''
    files.forEach(async (fileName) => {
      // if (fileName.includes('jquery')) {
      //   link = JS_LINK.replace('%_file_%', fileName).replace('%_id_%', fileName.slice(0, -3))
      //   await fsPromises.writeFile(`${JS_DIST}Jquery.html`, link)
      // } else if (fileName.includes('main')) {
      //   link = JS_LINK.replace('%_file_%', fileName).replace('%_id_%', fileName.slice(0, -3))
      //   await fsPromises.writeFile(`${JS_DIST}Mainjs.html`, link)
      // } else {
      //   let tmplName
      //   if (fileName.includes('-')) {
      //     tmplName = fileName.split('.')[0].split('-')[0]
      //   } else {
      //     tmplName = fileName.split('.')[0]
      //   }




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
      await fsPromises.writeFile(`${JS_DIST}${tmplName}.html`, link)
      // }
    })
  } catch (error) {
    console.error('(addJsTemplate) Error:', error)
  }
}


// addJsTemplate222()


exports.addJsTemplate = addJsTemplate
exports.addCssTemplate = addCssTemplate
