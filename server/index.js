const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { createCheckoutSession } = require("./stripe"); 

const app = express();
app.use(cors());
app.use(express.json());

//  CONNECT MONGO
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.log("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

//  MOCK PRODUCTS (unique IDs)
const products = [
  { id: 1, name: "Zara Top", price: 1200 },
  { id: 2, name: "Levis Jeans", price: 2200 },
  { id: 3, name: "H&M Hoodie", price: 1800 },
  { id: 4, name: "Nike Jersey", price: 2600 },
];

//  ORDER SCHEMA
const orderSchema = new mongoose.Schema({
  items: Array,
  email: String,
  status: String,
  transactionId: String,
});
const Order = mongoose.model("Order", orderSchema);

//  GET PRODUCTS
app.get("/api/products", (req, res) => {
  res.json(products);
});

//  CREATE CHECKOUT SESSION
app.post("/api/checkout", async (req, res) => {
  try {
    const { items, email } = req.body;
    const session = await createCheckoutSession(items, email);
    res.json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json("Error creating Stripe session");
  }
});

//  SAVE SUCCESS ORDER
app.post("/api/payment-success", async (req, res) => {
  const { items, email, transactionId } = req.body;

  await Order.create({
    items,
    email,
    transactionId,
    status: "successful",
  });

  res.json({ message: "Order saved successfully" });
});

//  SAVE FAILED ORDER
app.post("/api/payment-failed", async (req, res) => {
  const { items, email, transactionId } = req.body;

  await Order.create({
    items,
    email,
    transactionId,
    status: "failed",
  });

  res.json({ message: "Order saved as failed" });
});

// health route
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

// SERVER
const PORT = 3000;
app.listen(PORT, () => console.log(` Server running on PORT ${PORT}`));
