const crypto = require("crypto");

// @desc    Generate eSewa Signature
// @route   POST /api/payments/initiate-esewa
exports.initiateEsewa = async (req, res) => {
  try {
    const { amount, transaction_uuid, product_code } = req.body;

    // We force amount to a string to ensure no hidden decimals mess up the hash
    // eSewa v2 signature format: total_amount=XXX,transaction_uuid=XXX,product_code=XXX
    const message = `total_amount=${String(amount)},transaction_uuid=${String(transaction_uuid)},product_code=${String(product_code)}`;

    const secret = process.env.ESEWA_SECRET_KEY;

    const hash = crypto
      .createHmac("sha256", secret)
      .update(message)
      .digest("base64");

    res.json({
      signature: hash,
      message: message, // Sending this back helps you debug if needed
    });
  } catch (error) {
    console.error("Signature Error:", error);
    res.status(500).json({ message: "eSewa Signature Error" });
  }
};