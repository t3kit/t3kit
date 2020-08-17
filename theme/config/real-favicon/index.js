const realFavicon = require('gulp-real-favicon')
const fs = require('fs')
const fse = require('fs-extra')
const gitRev = require('git-rev-sync')
const { dest, src, series } = require('gulp')
const conf = require('../conf')

// File where the favicon markups are stored
const FAVICON_DATA_FILE = `${conf.TEMP}faviconData.json`

function generateFavicon (done) {
  realFavicon.generateFavicon({
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
      htmlCodeFile: false,
      usePathAsIs: false
    },
    versioning: {
      paramName: 'v',
      paramValue: gitRev.short()
    },
    markupFile: FAVICON_DATA_FILE
  }, function () {
    done()
  })
}

async function createFaviconTmpl () {
  try {
    await fse.ensureFile(`${conf.TEMP}${conf.FAVICONS_TMPL}`)
  } catch (error) {
    console.error('(createFaviconHtml) Error:', error)
  }
}

function injectFaviconMarkups () {
  return src(conf.FAVICONS_TMPL, { cwd: `${conf.TEMP}` })
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(dest(conf.FAVICONS_DIST))
}

exports.generateFavicon = generateFavicon
exports.injectFaviconMarkups = series(createFaviconTmpl, injectFaviconMarkups)
