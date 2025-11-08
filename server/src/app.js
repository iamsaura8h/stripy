const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/product.routes");
const paymentRoutes = require("./routes/payment.routes");

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/products", productRoutes);
app.use("/api", paymentRoutes);

app.get("/", (req, res) => res.send("Backend running ✅"));

module.exports = app;
