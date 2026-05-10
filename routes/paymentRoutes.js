const express = require("express");
const router = express.Router();
const { initiateEsewa } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/initiate-esewa", protect, initiateEsewa);

module.exports = router;