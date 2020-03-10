const dotenv = require('dotenv').config({ path: '../../../../../../.env' })
const vars = module.exports = {}

// set proxy to use with Browser-Sync
const t3kitDefaultHost = 't3kit10.t3.localhost'
if (dotenv.error) {
  console.error('.env', dotenv)
  vars.proxy = t3kitDefaultHost
} else {
  console.log('.env', dotenv)
  vars.proxy = process.env.COMPOSE_PROJECT_NAME
}

vars.rootDir = require('app-root-path').path
vars.SRC = `${vars.rootDir}/theme/src/`
vars.JS_SRC = `${vars.SRC}js/`
vars.CSS_SRC = `${vars.SRC}styles/`

vars.DIST_ROOT = `${vars.rootDir}/Resources/Public/assets/`
if (process.env.NODE_ENV === 'production') {
  vars.DIST = `${vars.DIST_ROOT}production/`
} else {
  vars.DIST = `${vars.DIST_ROOT}development/`
}

vars.JS_DIST = 'Js/'
vars.CSS_DIST = 'Css/'
vars.FONTS_DIST = 'Fonts/'
vars.FAVICONS_DIST = 'Favicons/'
vars.ICONS_DIST = 'Icons/'

// vars.JS_LINK_DEV = '<script src="{f:uri.resource(path:"assets/development/js/%_file_%", extensionName: "{site.identifier}")}"></script>'
// vars.CSS_LINK_DEV = '<link rel="stylesheet" type="text/css" href="{f:uri.resource(path:"assets/development/css/%_file_%", extensionName: "{site.identifier}")}"></link>'
// vars.JS_LINK_PROD = '<script src="{f:uri.resource(path:"assets/production/js/%_file_%", extensionName: "{site.identifier}")}"></script>'
// vars.CSS_LINK_PROD = '<link rel="stylesheet" type="text/css" href="{f:uri.resource(path:"assets/production/css/%_file_%", extensionName: "{site.identifier}")}"></link>'

vars.JS_LINK_DEV = '<f:asset.script identifier="%_id_%" src="EXT:{site.configuration.theme}/Resources/Public/assets/development/js/%_file_%" />'
vars.CSS_LINK_DEV = '<f:asset.css identifier="%_id_%" href="EXT:{site.configuration.theme}/Resources/Public/assets/development/css/%_file_%" />'
vars.JS_LINK_PROD = '<f:asset.script identifier="%_id_%" src="EXT:{site.configuration.theme}/Resources/Public/assets/production/js/%_file_%" />'
vars.CSS_LINK_PROD = '<f:asset.css identifier="%_id_%" href="EXT:{site.configuration.theme}/Resources/Public/assets/production/css/%_file_%" />'
