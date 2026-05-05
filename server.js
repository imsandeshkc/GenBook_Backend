require("dotenv").config(); // CRITICAL: This MUST be the first line of code!
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");

const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// NEW: Added this to help parse multipart/form-data fields correctly
app.use(express.urlencoded({ extended: true }));

// Connect to Database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ GenBook Database Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/orders", require("./routes/orderRoutes"));

// Basic Route for Testing
app.get("/", (req, res) => {
  res.send("GenBook Server is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});