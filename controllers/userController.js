const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Function to generate the JWT Key
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Register a new user
// @route   POST /api/users
exports.registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body; //

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  // Scramble the password before saving!
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin: isAdmin || false, // You can manually set this to true for yourself in Postman
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), // Here is your key!
    });
  }
};

// @desc    Authenticate a user & get token (Login)
// @route   POST /api/users/login
exports.authUser = async (req, res) => {
  const { email, password } = req.body;

  // 1. Find the user in the database by their email
  const user = await User.findOne({ email });

  // 2. Check if the user exists AND if the typed password matches the scrambled database password
  if (user && (await bcrypt.compare(password, user.password))) {
    // 3. If everything matches, log them in and give them a token!
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), 
    });
  } else {
    // 4. If they typed the wrong password or email, kick them out
    res.status(401).json({ message: "Invalid email or password" });
  }
};