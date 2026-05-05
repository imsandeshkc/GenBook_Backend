const Order = require("../models/orderModel");

// @desc    Create new order
// @route   POST /api/orders
exports.addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: "No order items" });
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id, // From authMiddleware
      shippingAddress,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};