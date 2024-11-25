const express = require("express");
const {
  createAccommodation,
  getAllUserAccommodations,
  updateAccommodation,
  getAllAccommodations,
  getSingleAccommodation,
  bookAccommodation,
} = require("../controllers/booking");

const bookingRouter = express.Router();

bookingRouter
  .route("/accommodations")
  .get(getAllAccommodations)
  .post(createAccommodation)
  .put(updateAccommodation);

bookingRouter.get("/userAccommodations", getAllUserAccommodations);
bookingRouter.get("/accommodations/:id", getSingleAccommodation);
bookingRouter.post("/bookAccommodation", bookAccommodation);

module.exports = bookingRouter;
