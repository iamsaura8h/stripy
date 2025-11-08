import { useEffect, useState } from "react";
import { useCart } from "../cart-context.jsx";

export default function LandingPage() {
  const { add, remove, cart } = useCart();
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("Error fetching products:", err));
  }, []);

  // Count how many of a product are in the cart
  const getQuantity = (id) => cart.filter((item) => item.id === id).length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500 text-sm">Loading products...</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="border p-4 rounded-lg w-60 shadow-md bg-white flex flex-col justify-between hover:shadow-lg transition"
            >
              {/* Product Image */}
              <div className="text-center">
                <img
                  src="/nike.jpeg"
                  alt={p.name}
                  className="h-60 w-full object-fill rounded mb-3"
                />
                <b className="block text-lg">{p.name}</b>
                <div className="text-gray-600 text-sm mb-3">₹{p.price}</div>
              </div>

              {/* Add / Remove Controls */}
              <div className="flex items-center justify-between mt-auto">
                <button
                  className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800"
                  onClick={() => remove(p)}
                >
                  −
                </button>

                <span className="font-semibold text-gray-800">
                  {getQuantity(p.id)}
                </span>

                <button
                  className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800"
                  onClick={() => add(p)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
