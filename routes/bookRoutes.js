const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  createBookReview,
} = require("../controllers/bookController");
const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// --- Review Route ---
router.route("/:id/reviews").post(protect, createBookReview);

// --- Base Book Routes (/, /search, /create) ---
router
  .route("/")
  .get(getBooks)
  .post(protect, admin, upload.single("image"), createBook);

// --- Single Book Routes (Get, Update, Delete) ---
router
  .route("/:id")
  .get(getBookById)
  .put(protect, admin, upload.single("image"), updateBook)
  .delete(protect, admin, deleteBook);

module.exports = router;