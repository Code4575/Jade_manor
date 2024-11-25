const path = require("path");
const imageDownloader = require("image-downloader");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/badRequest");

const uploadImageFromUrl = async (request, response) => {
  const { link } = request.body;

  const imageName = "photo-" + Date.now() + ".jpg";

  await imageDownloader.image({
    url: link,
    dest: path.join(__dirname, ".." + "/uploads/" + imageName),
  });

  response.status(StatusCodes.OK).json(imageName);
};

const uploadImageFromDevice = (request, response) => {
  if (!request.files) {
    throw new BadRequestError("No file uploaded!");
  }
  const fileNames = request.files.map((file) => file.filename);
  response.status(StatusCodes.OK).json(fileNames);
};

module.exports = { uploadImageFromUrl, uploadImageFromDevice };
