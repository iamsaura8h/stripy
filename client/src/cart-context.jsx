import { createContext, useContext, useState } from "react";

const C = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add multiple same items
  const add = (item) => setCart((prev) => [...prev, item]);

  // Remove only one instance of that item
  const remove = (itemToRemove) => {
    setCart((prev) => {
      const index = prev.findIndex((i) => i.id === itemToRemove.id);
      if (index !== -1) {
        const newCart = [...prev];
        newCart.splice(index, 1);
        return newCart;
      }
      return prev;
    });
  };

  return (
    <C.Provider value={{ cart, add, remove }}>
      {children}
    </C.Provider>
  );
}

export function useCart() {
  return useContext(C);
}
