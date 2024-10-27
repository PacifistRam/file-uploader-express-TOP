const fs = require("fs");

// Assuming that 'path/file.txt' is a regular file.
const deleteLocalFile =  (filepath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filepath, (err) => {
     if(err) {
       console.error("Failed to delete local file:", err);
       return reject(err);
     }
     console.log("Local image was deleted")
     resolve()
   })

  })
}

module.exports = deleteLocalFile