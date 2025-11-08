// src/Navbar.jsx
import { useState } from "react";
import { useCart } from "../context/cart-context";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Calculate quantity of each product
  const grouped = cart.reduce((acc, item) => {
    const found = acc.find((x) => x.id === item.id);
    if (found) found.qty += 1;
    else acc.push({ ...item, qty: 1 });
    return acc;
  }, []);

  const total = grouped.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      {/* NAVBAR */}
      <div className="w-full p-4 bg-slate-400 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
          stripy
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="relative px-3 py-1 bg-gray-800 rounded"
        >
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* CART MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-80 p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">Your Cart</h2>

            {cart.length === 0 ? (
              <p className="text-sm text-gray-600">Cart is empty</p>
            ) : (
              <div className="max-h-40 overflow-auto mb-3">
                {grouped.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b py-1 text-sm"
                  >
                    <span>{item.name}</span>
                    <span>
                      {item.qty} × ₹{item.price}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold mt-2 border-t pt-1">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                Close
              </button>

              <button
                disabled={cart.length === 0}
                onClick={() => {
                  setOpen(false);
                  navigate("/checkout");
                }}
                className={`px-3 py-1 rounded text-white ${
                  cart.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800"
                }`}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
