import { useCart } from "../cart-context";
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

    if (!res.ok) {
      const err = await res.json();
      alert("Checkout failed: " + (err.message || "Unknown error"));
      return;
    }

    const data = await res.json();
    window.location = data.url; // safe redirect
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
