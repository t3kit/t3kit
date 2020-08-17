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

exports.revJs = revJs
