const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: Array,
  email: String,
  status: String,
  transactionId: String,
});

module.exports = mongoose.model("Order", orderSchema);
