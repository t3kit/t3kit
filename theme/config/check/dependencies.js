const fs = require('fs')
const nodeEngine = require('../../../package').engines.node

function checkNodeModules (localConf) {
  if (!fs.existsSync(`${localConf.rootPath}/node_modules`)) {
    console.log('Error: No node modules installed in this extension')
    console.log('Please install all required dependencies by running <npm install>')
    console.log(`You should use Node.js ${nodeEngine}\n`)
    process.exit(1)
  }
}

function checkDependencies (localConf) {
  checkNodeModules(localConf)
}

exports.checkDependencies = checkDependencies
