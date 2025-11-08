// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar'
import Landing from "./pages/LandingPage";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}
