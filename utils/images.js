const path = require('path')
const fs = require('fs')

module.exports.write = (base64, filePath, filetype) => {
  const imagePath = path.join(__dirname, '..', `${filePath}.${filetype}`)
  fs.writeFile(imagePath, base64)
}
