const express = require("express");
const router = express.Router();
const { initiateEsewa } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

// This route allows a logged-in user to request a signature for eSewa
router.post("/initiate-esewa", protect, initiateEsewa);

module.exports = router;