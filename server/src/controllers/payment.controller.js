const Stripe = require("stripe");
const Order = require("../models/Order");
const products = require("../data/products");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckout = async (req, res) => {
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
};

exports.paymentSuccess = async (req, res) => {
  const { items, email, transactionId } = req.body;
  try {
    await Order.create({ items, email, transactionId, status: "successful" });
    res.json({ message: "Order saved successfully" });
  } catch {
    res.status(500).json({ message: "Error saving order" });
  }
};

exports.paymentFailed = async (req, res) => {
  const { items, email, transactionId } = req.body;
  try {
    await Order.create({ items, email, transactionId, status: "failed" });
    res.json({ message: "Order saved as failed" });
  } catch {
    res.status(500).json({ message: "Error saving failed order" });
  }
};
