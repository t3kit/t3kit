const conf = require('./conf')
const fs = require('fs')
const fsPromises = fs.promises
const hasha = require('hasha')

const jsDist = `${conf.PROD}${conf.JS_DIST}`

async function getFileList (dir) {
  let files
  try {
    files = await fsPromises.readdir(dir)
  } catch (err) {
    console.error('error', err)
  }

  if (files !== undefined) {
    files = files.filter(item => !item.includes('map'))
    return files
  }
}

function insertValue (string, value) {
  const dotIndex = string.indexOf('.')
  const name = string.slice(0, dotIndex)
  const ext = string.slice(dotIndex)
  return `${name}.${value}${ext}`
}

async function hashJs (val) {
  try {
    return (await hasha.fromFile(`${jsDist}${val}`, { algorithm: 'md5' })).slice(0, 10)
  } catch (err) {
    console.error('error', err)
  }
}

async function revFileJs () {
  try {
    const files = await getFileList(jsDist)
    files.forEach(async (element) => {
      fsPromises.rename(`${jsDist}${element}`, jsDist + insertValue(element, await hashJs(element)))
    })
  } catch (error) {
    console.error('Error occurred:', error)
  }
}

revFileJs()
