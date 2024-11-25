const multer = require("multer");

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (request, file, cb) => {
    cb(null, `photo-${Date.now()}.jpg`);
  },
});

const imageMiddleware = multer({
  storage,
  limits: { fieldNameSize: 5 * 1024 * 1024 },
}).array("images", 10);

module.exports = imageMiddleware;
