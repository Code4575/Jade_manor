const express = require("express");
const {
  uploadImageFromUrl,
  uploadImageFromDevice,
} = require("../controllers/upload");
const imageMiddleware = require("../middleware/imageMiddleware");
const uploadRouter = express.Router();

uploadRouter.post("/uploadFromUrl", uploadImageFromUrl);
uploadRouter.post("/uploadFromDevice", imageMiddleware, uploadImageFromDevice);

module.exports = uploadRouter;
