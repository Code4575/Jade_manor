const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please, provide a name!"],
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please, provide an email!"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please, provide a valid email!",
    ],
  },
  password: {
    type: String,
    required: [true, "Please, provide a password!"],
    minlength: 6,
  },
});

UserSchema.pre("save", async function () {
  // Generating salt
  const salt = await bcrypt.genSalt(10);
  // Hashing password
  this.password = await bcrypt.hash(this.password, salt); // The "this" keyword points to the user
});

module.exports = mongoose.model("User", UserSchema);
