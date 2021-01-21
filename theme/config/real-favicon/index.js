const fsPromises = require('fs').promises
const fse = require('fs-extra')
const gitRev = require('git-rev-sync')
const rfg = require('rfg-api').init()
const utils = require('../utils')

const API_KEY = 'eabf77c98d6bd1eea81fb58be7895c42dafc2b21'

function generateFaviconsPromise (localConf) {
  localConf.FAVICON_OPTIONS.versioning.paramValue = gitRev.short()
  const faviconOptions = localConf.FAVICON_OPTIONS
  return new Promise((resolve, reject) => {
    const request = rfg.createRequest({
      apiKey: API_KEY,
      masterPicture: `${localConf.FAVICONS_SRC}${localConf.FAVICON_MASTER_PICTURE}`,
      iconsPath: localConf.FAVICON_PATH,
      design: faviconOptions.design,
      settings: faviconOptions.settings,
      versioning: faviconOptions.versioning
    })

    rfg.generateFavicon(request, localConf.FAVICONS_DIST, function (error, data) {
      if (error) {
        utils.errLogFn(error.message, { functionName: 'generateFaviconsPromise', newPromise: true })
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

async function generateFavicons (localConf) {
  try {
    const timeStart = utils.start('generateFavicons', 'blue')

    const data = await generateFaviconsPromise(localConf)

    await fse.ensureDir(`${localConf.TEMP}`)
    await fsPromises.writeFile(`${localConf.TEMP}faviconData.json`, JSON.stringify(data))
    await fsPromises.rename(`${localConf.FAVICONS_DIST}html_code.html`, `${localConf.FAVICONS_DIST}Favicons.html`)

    utils.boxEnd({ functionName: 'generateFavicons', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'generateFavicons' })
  }
}

exports.generateFavicons = generateFavicons
