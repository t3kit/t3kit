const { clean } = require('./clean')
const { compileCss } = require('./css')
const { compileScss } = require('./sass')
const { compileJs } = require('./rollup')
const { addCssTemplate, addJsTemplate } = require('./template')
const { compressCss, compressJs } = require('./compress')
const { revCss, revJs } = require('./rev')
const utils = require('./utils')
const chokidar = require('chokidar')
const { async } = require('hasha')
const gaze = require('gaze')

// Watch all .js files/dirs in process.cwd()
gaze('Resources/Public/assets/development/Css/*.css', function () {
  this.on('added', function () {
    addCssTemplate()
  })
})
gaze('Resources/Public/assets/development/Js/*.js', function () {
  this.on('added', function () {
    addJsTemplate()
  })
})

gaze(['theme/src/css/**/*.css', 'theme/src/vendor/css/*.css'], { mode: 'poll' }, function () {
  this.on('all', function (event, filepath) {
    // compileCss()
    console.log(event)
    console.log(filepath)
  })
})

gaze(['theme/src/js/**/*.js', 'theme/src/vendor/js/*.js'], function (error, watcher) {
  if (error) {
    // Handle error if it occurred while starting up
  }
  this.on('all', function () {
    compileJs()
  })
})

gaze('theme/src/scss/**/*.scss', function () {
  this.on('all', function (event, filepath) {
    compileScss()
    console.log(event)
    console.log(filepath)
  })
})
