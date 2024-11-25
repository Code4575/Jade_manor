const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized");
const BadRequestError = require("../errors/badRequest");
const { StatusCodes } = require("http-status-codes");

// Register new user
const register = async (request, response) => {
  const { name, email, password } = request.body;

  // Check if email is already registered
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError(
      "An account with this email already exists! Please, log in or use a different email to sign up."
    );
  }

  // Create a new user
  const user = await User.create({ name, email, password });
  response.status(StatusCodes.CREATED).json({ user });
};

// Login user and generate token
const login = async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });

  // If user does not exist, throw error
  if (!user) {
    throw new UnauthorizedError(
      "Invalid credentials! Please, check your email and password and try again."
    );
  }

  // Check if password matches
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Incorrect password!");
  }

  // Check if JWT_SECRET exists
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing. Please configure it in the .env file.");
  }

  // Set the JWT expiration time
  const jwtLifetime = process.env.JWT_LIFETIME || "1d"; // Default to 1 day if not provided

  // Create JWT token
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: jwtLifetime }
  );

  // Set token in cookie and send response
  response
    .status(StatusCodes.OK)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      signed: true, // Sign the cookie for additional security
    })
    .json({ user });
};

// Logout user
const logout = async (request, response) => {
  response.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  response.status(StatusCodes.OK).json({ msg: "User logged out!" });
};

// Get current logged-in user
const getCurrentUser = (request, response) => {
  const { token } = request.signedCookies;
  
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, data) => {
      if (error) throw error;

      // Fetch user details from the database
      const { _id, name, email } = await User.findById(data.id);
      response.status(StatusCodes.OK).json({ name, email, _id });
    });
  } else {
    response.json(null); // If no token is present, return null
  }
};

module.exports = { register, login, logout, getCurrentUser };
