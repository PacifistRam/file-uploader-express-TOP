const multer = require('multer')
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"..", "temp","uploads"))
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext)

    cb(null, `${name}-${Date.now()}${ext}`)
  }
});

function fileFilter(req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if(extname && mimetype) {
        return cb(null, true);
    }else {
        cb(new Error("Only image files are allowed"), false)
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter                        
})

module.exports = upload;