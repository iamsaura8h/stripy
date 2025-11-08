import { useCart } from "../context/cart-context";
import { useState } from "react";

export default function Checkout() {
  const { cart } = useCart();
  const [email, setEmail] = useState("");

  async function pay() {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address before proceeding.");
      return;
    }

    const res = await fetch("http://localhost:3000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart, email }),
    });

    const data = await res.json();

    // ✅ If Stripe fails (fallback order)
    if (data.fallback) {
      alert("Payment system unavailable. Your order is saved as pending.");
      window.location = "/failure";
      return;
    }

    // ✅ Stripe works
    window.location = data.url;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-lg mb-4">Checkout</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Simple Cart List */}
      <ul className="mb-3">
        {cart.map((item, idx) => (
          <li key={idx}>
            {item.name} — ₹{item.price}
          </li>
        ))}
      </ul>

      <p className="font-semibold mb-3">Total: ₹{total}</p>

      <button className="bg-black text-white px-4 py-2" onClick={pay}>
        Pay with Stripe
      </button>
    </div>
  );
}
