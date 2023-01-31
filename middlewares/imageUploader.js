const multer = require("multer")

// Image upload to local storage
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
  }
})

let upload = multer({
  storage: storage
}).single("image")

module.exports = upload
