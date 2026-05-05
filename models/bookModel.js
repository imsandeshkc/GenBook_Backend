const mongoose = require("mongoose");

// Define a separate schema for reviews to track details more clearly
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name of the reviewer
    rating: { type: Number, required: true }, // Score from 1 to 5
    comment: { type: String, required: true }, // The text feedback
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }, // Reference to the User model
  },
  {
    timestamps: true, // Track when the review was written
  },
);

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    image: { type: String }, // URL for the book cover

    // An array of review sub-documents
    reviews: [reviewSchema],

    // The calculated average rating of all reviews
    rating: {
      type: Number,
      required: true,
      default: 0,
    },

    // Total count of reviews for easier display
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // Track when the book was added or modified
  },
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;