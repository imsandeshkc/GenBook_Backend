const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // Link the order to the user who bought it
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    orderItems: [
      {
        title: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        // Link back to the original book
        book: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Book",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);