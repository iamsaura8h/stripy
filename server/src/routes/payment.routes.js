const express = require("express");
const {
  createCheckout,
  paymentSuccess,
  paymentFailed,
} = require("../controllers/payment.controller");

const router = express.Router();

router.post("/checkout", createCheckout);
router.post("/payment-success", paymentSuccess);
router.post("/payment-failed", paymentFailed);

module.exports = router;
