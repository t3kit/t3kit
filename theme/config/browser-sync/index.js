const bs = require('browser-sync').create()
const conf = require('../conf')

function serve (cb) {
  bs.init({
    ui: false,
    proxy: {
      target: 'localhost',
      reqHeaders: function () {
        return {
          host: conf.PROXY
        }
      }
    },
    files: [conf.DIST],
    serveStatic: [conf.DIST],
    port: 9001,
    ghostMode: false,
    open: false
  })
  cb()
}

exports.serve = serve
