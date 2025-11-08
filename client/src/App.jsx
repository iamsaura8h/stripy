// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar'
import Landing from "./pages/LandingPage";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Failure from "./pages/Fail";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
      </Routes>
    </BrowserRouter>
  );
}
