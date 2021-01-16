const fsPromises = require('fs').promises
const fse = require('fs-extra')
const gitRev = require('git-rev-sync')
const rfg = require('rfg-api').init()
const conf = require('../conf')
const utils = require('../utils')

const API_KEY = 'eabf77c98d6bd1eea81fb58be7895c42dafc2b21'

const faviconOptions = {
  masterPicture: `${conf.FAVICONS_SRC}${conf.FAVICON_MASTER_PICTURE}`,
  dest: conf.FAVICONS_DIST,
  iconsPath: conf.FAVICON_PATH,
  design: {
    ios: {
      pictureAspect: 'noChange',
      assets: {
        ios6AndPriorIcons: false,
        ios7AndLaterIcons: false,
        precomposedIcons: false,
        declareOnlyDefaultIcon: true
      }
    },
    desktopBrowser: {
      design: 'raw'
    },
    windows: {
      pictureAspect: 'noChange',
      backgroundColor: '#2b5797',
      onConflict: 'override',
      assets: {
        windows80Ie10Tile: false,
        windows10Ie11EdgeTiles: {
          small: false,
          medium: true,
          big: false,
          rectangle: false
        }
      }
    },
    androidChrome: {
      pictureAspect: 'noChange',
      themeColor: '#ffffff',
      manifest: {
        display: 'browser',
        orientation: 'notSet',
        onConflict: 'override',
        declared: true
      },
      assets: {
        legacyIcon: false,
        lowResolutionIcons: false
      }
    },
    safariPinnedTab: {
      pictureAspect: 'blackAndWhite',
      threshold: 50,
      themeColor: '#6d6d6d'
    }
  },
  settings: {
    compression: 2,
    scalingAlgorithm: 'Mitchell',
    errorOnImageTooSmall: false,
    readmeFile: false,
    htmlCodeFile: true,
    usePathAsIs: false
  },
  versioning: {
    paramName: 'v',
    paramValue: gitRev.short()
  },
  markupFile: `${conf.TEMP}faviconData.json`
}

function generateFaviconsPromise (fileName) {
  return new Promise((resolve, reject) => {
    const request = rfg.createRequest({
      apiKey: API_KEY,
      masterPicture: faviconOptions.masterPicture,
      iconsPath: faviconOptions.iconsPath,
      design: faviconOptions.design,
      settings: faviconOptions.settings,
      versioning: faviconOptions.versioning
    })

    rfg.generateFavicon(request, faviconOptions.dest, function (error, data) {
      if (error) {
        utils.errLogFn(error.message, { functionName: 'generateFaviconsPromise', newPromise: true })
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

async function generateFavicons () {
  try {
    const timeStart = utils.start('generateFavicons', 'blue')

    const data = await generateFaviconsPromise()

    await fse.ensureDir(`${conf.TEMP}`)
    await fsPromises.writeFile(faviconOptions.markupFile, JSON.stringify(data))
    await fsPromises.rename(`${conf.FAVICONS_DIST}html_code.html`, `${conf.FAVICONS_DIST}Favicons.html`)

    utils.boxEnd({ functionName: 'generateFavicons', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'generateFavicons' })
  }
}

exports.generateFavicons = generateFavicons
