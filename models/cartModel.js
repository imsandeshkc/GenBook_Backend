const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Links the cart to a specific user
    },
    items: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Book",
        },
        title: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Cart", cartSchema);
