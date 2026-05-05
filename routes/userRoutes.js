const express = require("express");
const router = express.Router();
// 1. Import BOTH functions from your controller!
const { registerUser, authUser } = require("../controllers/userController.js");

router.post("/register", registerUser);

// 2. Add the missing login route!
router.post("/login", authUser);

module.exports = router;