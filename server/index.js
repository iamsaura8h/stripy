require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// ------------------ MONGO CONNECTION ------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

// ------------------ ORDER SCHEMA ------------------
const orderSchema = new mongoose.Schema({
  items: Array,
  email: String,
  status: String,
  transactionId: String,
});
const Order = mongoose.model("Order", orderSchema);

// ------------------ MOCK PRODUCTS ------------------
const products = [
  { id: 1, name: "Zara Top", price: 1200 },
  { id: 2, name: "Levis Jeans", price: 2200 },
  { id: 3, name: "H&M Hoodie", price: 1800 },
  { id: 4, name: "Nike Jersey", price: 2600 },
];

// ------------------ GET PRODUCTS ------------------
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ------------------ CREATE CHECKOUT SESSION ------------------
app.post("/api/checkout", async (req, res) => {
  const { items, email } = req.body;

  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      customer_email: email,
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/failure",
    });

    return res.json({ url: session.url });

  } catch (err) {
    console.error("Stripe failed:", err.message);

    const fakeTransactionId = "txn_" + Math.random().toString(36).slice(2);

    await Order.create({
      items,
      email,
      transactionId: fakeTransactionId,
      status: "pending",
    });

    return res.json({
      fallback: true,
      message: "Payment gateway unavailable. Order saved as pending.",
    });
  }
});

// ------------------ SAVE SUCCESS ORDER ------------------
app.post("/api/payment-success", async (req, res) => {
  const { items, email, transactionId } = req.body;
  try {
    await Order.create({ items, email, transactionId, status: "successful" });
    res.json({ message: "Order saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving order" });
  }
});

// ------------------ SAVE FAILED ORDER ------------------
app.post("/api/payment-failed", async (req, res) => {
  const { items, email, transactionId } = req.body;
  try {
    await Order.create({ items, email, transactionId, status: "failed" });
    res.json({ message: "Order saved as failed" });
  } catch (err) {
    res.status(500).json({ message: "Error saving failed order" });
  }
});

// ------------------ HEALTH CHECK ------------------
app.get("/", (req, res) => res.send("Backend running ✅"));

// ------------------ START SERVER ------------------
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
