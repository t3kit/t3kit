const dotenv = require('dotenv')
const rootDir = require('app-root-path').path
const yaml = require('js-yaml')
const fs = require('fs')
const boxen = require('boxen')
const chalk = require('chalk')
const conf = module.exports = {}

// parse project package.json
const pkg = require(`${rootDir}/package`)
const t3kitConf = pkg.t3kit

// parse project root .env file
const env = dotenv.config({ path: `${rootDir}/../../../../.env` })

// parse TYPO3 site configuration
try {
  const siteConf = yaml.safeLoad(fs.readFileSync(`${rootDir}/../../../../config/sites/${t3kitConf['typo3-site-config-dir']}/config.yaml`, 'utf8'))
  conf.THEME_NAME = siteConf.theme
} catch (error) {
  console.log(boxen(chalk`
  {red no such file or directory:} {green config/sites/${t3kitConf['typo3-site-config-dir']}/config.yaml}
  ***
  {red if no t3kit-starter}
  Seems you are using your extension without t3kit-starter at the root.
  If it is true then change variables inside your package.json file in t3kit section.
  {yellow theme-name} from package.json config will be used to compile favicons.
  --------------------
  {red if t3kit-starter}
  If you are using t3kit-starter at the root of your project then check if you set correct {yellow typo3-site-config-dir} value in package.json
  --------------------
  Current package.json config:
  theme-name: {yellow ${t3kitConf['theme-name']}}
  typo3-site-config-dir: {yellow ${t3kitConf['typo3-site-config-dir']}}
  `, { padding: { top: 0, bottom: 0, left: 0, right: 3 } }))
  console.error('(yaml)', error)
  conf.THEME_NAME = t3kitConf['theme-name']
}

// read project local host name from .env file
// use with Browser-Sync
if (env.error) {
  console.log(boxen(chalk`
  {red no such file at the root of the project:} {green .env}
  ***
  {red if no t3kit-starter}
  Seems you are using your extension without t3kit-starter at the root.
  If it is true then change variables inside your package.json file in t3kit section.
  {yellow proxy-host} from package.json config will be used to run Browser-Sync.
  --------------------
  {red if t3kit-starter}
  If you are using t3kit-starter at the root of your project then check if you have .env file there
  (run {yellow composer env} to setup correct .env file)
  --------------------
  Current package.json config:
  proxy-host: {yellow ${t3kitConf['proxy-host']}}
  `, { padding: { top: 0, bottom: 0, left: 0, right: 3 } }))
  conf.PROXY = t3kitConf['proxy-host']
} else {
  conf.PROXY = process.env.COMPOSE_PROJECT_NAME
}

// SRC, DIST and temp dirs path
conf.SRC = `${rootDir}/theme/src/`
conf.TEMP = `${rootDir}/theme/.tmp/`
conf.DIST_ROOT = `${rootDir}/Resources/Public/assets/`
if (process.env.NODE_ENV === 'production') {
  conf.DIST = `${conf.DIST_ROOT}production/`
} else {
  conf.DIST = `${conf.DIST_ROOT}development/`
}

// CSS compilation variables
conf.CSS_SRC = `${conf.SRC}scss/`
conf.CSS_DIST = `${conf.DIST}Css/`
conf.CSS_LINK_DEV = '<f:asset.css identifier="%_id_%" href="EXT:{site.configuration.theme}/Resources/Public/assets/development/Css/%_file_%" />'
conf.CSS_LINK_PROD = '<f:asset.css identifier="%_id_%" href="EXT:{site.configuration.theme}/Resources/Public/assets/production/Css/%_file_%" />'

// JS compilation variables
conf.JS_SRC = `${conf.SRC}js/`
conf.JS_DIST = `${conf.DIST}Js/`
conf.JS_LINK_DEV = '<f:asset.script identifier="%_id_%" src="EXT:{site.configuration.theme}/Resources/Public/assets/development/Js/%_file_%" />'
conf.JS_LINK_PROD = '<f:asset.script identifier="%_id_%" src="EXT:{site.configuration.theme}/Resources/Public/assets/production/Js/%_file_%" />'

// FAVICONS compilation variables
// add more favicon customization into generateFavicon object --> (theme/config/real-favicon/index.js)
conf.FAVICONS_SRC = `${conf.SRC}favicon/`
conf.FAVICONS_DIST = `${conf.DIST_ROOT}Favicons/`
conf.FAVICONS_TMPL = 'Favicons.html'
conf.FAVICON_MASTER_PICTURE = t3kitConf['favicon-master-picture']
conf.FAVICON_PATH = `/typo3conf/ext/${conf.THEME_NAME}/Resources/Public/assets/Favicons`

// Icons variables
conf.ICONS_DIST = `${conf.DIST_ROOT}Icons/`
// Bootstrap Icons
conf.BOOTSTRAP_ICONS_DIST = `${conf.ICONS_DIST}Bootstrap/`
conf.BOOTSTRAP_ICONS_SRC = [`${rootDir}/node_modules/bootstrap-icons/icons/*.svg`]
// ------------------------------

// File Type Icons variables
conf.FILE_TYPE_ICONS_DIST = `${conf.DIST_ROOT}Filetypes/`
conf.FILE_TYPE_ICONS_SRC = [`${rootDir}/node_modules/file-icon-vectors/dist/icons/vivid/*.svg`]
// ------------------------------

conf.FONTS_DIST = 'Fonts/'
conf.IMAGES_DIST = 'Images/'

// show info about current project config
async function showInfo () {
  try {
    console.log(boxen(chalk`
    Theme name: {blue ${conf.THEME_NAME}}
    Proxy Host: {yellow ${conf.PROXY}}
    Favicon master picture: {yellow ${conf.FAVICON_MASTER_PICTURE}}
    Site config directory: {green config/sites/${t3kitConf['typo3-site-config-dir']}/config.yaml}
    `, { padding: { top: 0, bottom: 0, left: 0, right: 3 } }))
  } catch (error) {
    console.error('(info)', error)
  }
}
conf.showInfo = showInfo
