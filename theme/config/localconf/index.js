const localConf = module.exports = {}
localConf.rootPath = process.cwd()
localConf.dirName = localConf.rootPath.split('/').pop()

// parse project package.json
// const PKG = require(`${localConf.rootPath}/package`)

// SRC, DIST and temp dirs path
localConf.THEME_FOLDER = 'theme/'
localConf.SRC_FOLDER = 'src/'
localConf.TMP_FOLDER = '.tmp/'
localConf.ASSETS_FOLDER = 'assets/'
localConf.VENDOR_FOLDER = 'vendor/'
localConf.RESOURCES_FOLDER = 'Resources/Public/'
localConf.CSS_FOLDER = 'Css/'
localConf.JS_FOLDER = 'Js/'
localConf.SCSS_FOLDER = 'scss/'
localConf.CONTEXT = 'development'
if (process.env.NODE_ENV === 'production') {
  localConf.CONTEXT = 'production'
}

localConf.SRC = `${localConf.rootPath}/${localConf.THEME_FOLDER}${localConf.SRC_FOLDER}`
localConf.DIST = `${localConf.rootPath}/${localConf.RESOURCES_FOLDER}${localConf.ASSETS_FOLDER}`
localConf.TEMP = `${localConf.rootPath}/${localConf.THEME_FOLDER}${localConf.TMP_FOLDER}`

// CSS compilation variables
localConf.CSS_SRC = `${localConf.SRC}${localConf.CSS_FOLDER.toLowerCase()}`
localConf.CSS_DIST = `${localConf.DIST}${localConf.CONTEXT}/${localConf.CSS_FOLDER}`
localConf.CSS_LINK = `<f:asset.css identifier="%_id_%" href="EXT:{site.configuration.theme}/${localConf.RESOURCES_FOLDER}${localConf.ASSETS_FOLDER}${localConf.CONTEXT}/${localConf.CSS_FOLDER}%_file_%" />`
localConf.CSS_LINK_ASYNC = `<f:asset.css identifier="%_id_%" href="EXT:{site.configuration.theme}/${localConf.RESOURCES_FOLDER}${localConf.ASSETS_FOLDER}${localConf.CONTEXT}/${localConf.CSS_FOLDER}%_file_%" media="print" additionalAttributes="{onload=\'this.media=\\'all\\'\'}" />` // eslint-disable-line

// SCSS compilation variables
localConf.SCSS_SRC = `${localConf.SRC}${localConf.SCSS_FOLDER}`
localConf.SCSS_DIST = `${localConf.CSS_SRC}${localConf.VENDOR_FOLDER}`

// JS compilation variables
localConf.JS_SRC = `${localConf.SRC}${localConf.JS_FOLDER.toLowerCase()}`
localConf.JS_DIST = `${localConf.DIST}${localConf.CONTEXT}/${localConf.JS_FOLDER}`
localConf.JS_LINK = `<f:asset.script identifier="%_id_%" %_settings_% src="EXT:{site.configuration.theme}/${localConf.RESOURCES_FOLDER}${localConf.ASSETS_FOLDER}${localConf.CONTEXT}/${localConf.JS_FOLDER}%_file_%" />`

// FAVICONS compilation variables
// add more favicon customization into generateFavicon object --> (theme/config/real-favicon/index.js)
localConf.FAVICONS_SRC = `${localConf.SRC}favicon/`
localConf.FAVICONS_DIST = `${localConf.DIST}Favicons/`
localConf.FAVICON_MASTER_PICTURE = 'favicon.svg'
localConf.FAVICON_PATH = `/typo3conf/ext/${localConf.dirName}/${localConf.RESOURCES_FOLDER}${localConf.ASSETS_FOLDER}Favicons`

// Icons variables
localConf.ICONS = [
  {
    src: `${localConf.rootPath}/node_modules/bootstrap-icons/icons/*.svg`,
    dist: `${localConf.DIST}Icons/Bootstrap/`
  }
]
// ------------------------------

// File Type Icons variables
localConf.FILE_TYPE_ICONS_DIST = `${localConf.DIST}Filetypes/`
localConf.FILE_TYPE_ICONS_SRC = [`${localConf.rootPath}/node_modules/file-icon-vectors/dist/icons/vivid/*.svg`]
// ------------------------------
