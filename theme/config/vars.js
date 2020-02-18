const vars = module.exports = {}

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

vars.JS_DIST = 'js/'
vars.CSS_DIST = 'css/'
vars.FONTS_DIST = 'fonts/'
vars.FAVICONS_DIST = 'favicons/'
vars.ICONS_DIST = 'icons/'

vars.proxy = 'http://t3kit10.t3.localhost'
vars.JS_LINK_DEV = '<script src="{f:uri.resource(path:"assets/development/js/%_file_%", extensionName: "{site.identifier}")}"></script>'
vars.CSS_LINK_DEV = '<link rel="stylesheet" type="text/css" href="{f:uri.resource(path:"assets/development/css/%_file_%", extensionName: "{site.identifier}")}"></link>'
vars.JS_LINK_PROD = '<script src="{f:uri.resource(path:"assets/production/js/%_file_%", extensionName: "{site.identifier}")}"></script>'
vars.CSS_LINK_PROD = '<link rel="stylesheet" type="text/css" href="{f:uri.resource(path:"assets/production/css/%_file_%", extensionName: "{site.identifier}")}"></link>'
