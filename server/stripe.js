const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Create Checkout Session
async function createCheckoutSession(items, email) {
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

  return session;
}

module.exports = { createCheckoutSession };
