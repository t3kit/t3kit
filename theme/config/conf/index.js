const rootDir = require('app-root-path').path

const conf = module.exports = {}
const rootDirName = rootDir.split('/').pop()

// parse project package.json
// const PKG = require(`${rootDir}/package`)

// SRC, DIST and temp dirs path
conf.THEME_FOLDER = 'theme/'
conf.SRC_FOLDER = 'src/'
conf.TMP_FOLDER = '.tmp/'
conf.ASSETS_FOLDER = 'assets/'
conf.VENDOR_FOLDER = 'vendor/'
conf.RESOURCES_FOLDER = 'Resources/Public/'
conf.CSS_FOLDER = 'Css/'
conf.JS_FOLDER = 'Js/'
conf.SCSS_FOLDER = 'scss/'
conf.CONTEXT = 'development'
if (process.env.NODE_ENV === 'production') {
  conf.CONTEXT = 'production'
}

conf.SRC = `${rootDir}/${conf.THEME_FOLDER}${conf.SRC_FOLDER}`
conf.DIST = `${rootDir}/${conf.RESOURCES_FOLDER}${conf.ASSETS_FOLDER}`
conf.TEMP = `${rootDir}/${conf.THEME_FOLDER}${conf.TMP_FOLDER}`

// CSS compilation variables
conf.CSS_SRC = `${conf.SRC}${conf.CSS_FOLDER.toLowerCase()}`
conf.CSS_DIST = `${conf.DIST}${conf.CONTEXT}/${conf.CSS_FOLDER}`
conf.CSS_LINK = `<f:asset.css identifier="%_id_%" href="EXT:{site.configuration.theme}/${conf.RESOURCES_FOLDER}${conf.ASSETS_FOLDER}${conf.CONTEXT}/${conf.CSS_FOLDER}%_file_%" />`
conf.CSS_LINK_ASYNC = `<f:asset.css identifier="%_id_%" href="EXT:{site.configuration.theme}/${conf.RESOURCES_FOLDER}${conf.ASSETS_FOLDER}${conf.CONTEXT}/${conf.CSS_FOLDER}%_file_%" media="print" additionalAttributes="{onload=\'this.media=\\'all\\'\'}" />` // eslint-disable-line

// SCSS compilation variables
conf.SCSS_SRC = `${conf.SRC}${conf.SCSS_FOLDER}`
conf.SCSS_DIST = `${conf.CSS_SRC}${conf.VENDOR_FOLDER}`

// JS compilation variables
conf.JS_SRC = `${conf.SRC}${conf.JS_FOLDER.toLowerCase()}`
conf.JS_DIST = `${conf.DIST}${conf.CONTEXT}/${conf.JS_FOLDER}`
conf.JS_LINK = `<f:asset.script identifier="%_id_%" %_settings_% src="EXT:{site.configuration.theme}/${conf.RESOURCES_FOLDER}${conf.ASSETS_FOLDER}${conf.CONTEXT}/${conf.JS_FOLDER}%_file_%" />`

// FAVICONS compilation variables
// add more favicon customization into generateFavicon object --> (theme/config/real-favicon/index.js)
conf.FAVICONS_SRC = `${conf.SRC}favicon/`
conf.FAVICONS_DIST = `${conf.DIST}Favicons/`
conf.FAVICON_MASTER_PICTURE = 'favicon.svg'
conf.FAVICON_PATH = `/typo3conf/ext/${rootDirName}/${conf.RESOURCES_FOLDER}${conf.ASSETS_FOLDER}Favicons`

// Icons variables
conf.ICONS_DIST = `${conf.DIST}Icons/`
// Bootstrap Icons
conf.BOOTSTRAP_ICONS_DIST = `${conf.ICONS_DIST}Bootstrap/`
conf.BOOTSTRAP_ICONS_SRC = [`${rootDir}/node_modules/bootstrap-icons/icons/*.svg`]
// ------------------------------

// File Type Icons variables
conf.FILE_TYPE_ICONS_DIST = `${conf.DIST}Filetypes/`
conf.FILE_TYPE_ICONS_SRC = [`${rootDir}/node_modules/file-icon-vectors/dist/icons/vivid/*.svg`]
// ------------------------------
