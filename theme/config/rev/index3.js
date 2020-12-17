const { dest, src } = require('gulp')
const rev = require('gulp-rev')
const revdel = require('gulp-rev-delete-original')
const conf = require('../conf')

function revJs () {
  return src(`${conf.JS_DIST}**/*.js`)
    .pipe(rev())
    .pipe(revdel())
    .pipe(dest(conf.JS_DIST))
}

function revCsss () {
  return src(`${conf.CSS_DIST}**/*.css`)
    .pipe(rev())
    .pipe(revdel())
    .pipe(dest(conf.CSS_DIST))
}

exports.revJs = revJs
exports.revCsss = revCsss
