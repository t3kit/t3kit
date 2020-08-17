const semver = require('semver')
const boxen = require('boxen')
const nodeEngine = require('../../../package').engines.node

function checkNode () {
  if (!semver.satisfies(process.version, nodeEngine)) {
    console.log(boxen(`ERROR: Required node version ${nodeEngine} not satisfied with current version ${process.version}`, { padding: 1 }))
    process.exit(1)
  }
}

exports.checkNode = checkNode
