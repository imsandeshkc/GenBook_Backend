const crypto = require("crypto");

// @desc    Generate eSewa Signature
// @route   POST /api/payments/initiate-esewa
exports.initiateEsewa = async (req, res) => {
  try {
    const { amount, transaction_uuid, product_code } = req.body;
    const message = `total_amount=${String(amount)},transaction_uuid=${String(transaction_uuid)},product_code=${String(product_code)}`;

    const secret = process.env.ESEWA_SECRET_KEY;

    const hash = crypto
      .createHmac("sha256", secret)
      .update(message)
      .digest("base64");

    res.json({
      signature: hash,
      message: message,
    });
  } catch (error) {
    console.error("Signature Error:", error);
    res.status(500).json({ message: "eSewa Signature Error" });
  }
};