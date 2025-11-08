const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-10-29", // explicit, optional but recommended
});

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
    mode: "payment",
    line_items: lineItems,
    customer_email: email,
    automatic_payment_methods: { enabled: true }, // ✅
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/failure",
  });

  return session;
}

module.exports = { createCheckoutSession };
