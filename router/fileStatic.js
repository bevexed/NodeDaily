const path = require('path')
const mime = require('mime')
const fs = require('fs');


const readStaticFile = async (filePathName,) => {
  const { ext } = path.parse(filePathName)
  let mimeType = mime.getType(ext)
  let data
  if (fs.existsSync(filePathName)) {
    if (ext) {
      console.log(filePathName);
      data = await fs.promises.readFile(filePathName, )
    } else {
      console.log(filePathName);
      data = await fs.promises.readFile(path.join(filePathName,  '/index.html'))
    }
  } else {
    data = '404'
  }
  return {
    data,
    mimeType
  }
}

module.exports = readStaticFile
