const Cart = require("../models/cartModel");

// @desc    Add items to cart
// @route   POST /api/cart
exports.addToCart = async (req, res) => {
  const { bookId, title, price, quantity } = req.body;
  const userId = req.user._id; // Taken from 'protect' middleware

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // If cart exists, check if book is already in it
      const itemIndex = cart.items.findIndex((p) => p.bookId == bookId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ bookId, title, price, quantity });
      }
      cart = await cart.save();
      return res.status(201).json(cart);
    } else {
      // No cart for this user, create a new one
      const newCart = await Cart.create({
        userId,
        items: [{ bookId, title, price, quantity }],
      });
      return res.status(201).json(newCart);
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// @desc    Get current user cart
// @route   GET /api/cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user._id });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
