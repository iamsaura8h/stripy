const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://husainali7865253:husain2002@clustor.ftwa08a.mongodb.net/?appName=Clustor/saurabh");
    console.log(`✅ MongoDB Connected `); 
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
connectDB();

// mock products
const products = [
  {id:1,name:"Zara Top",price:1200},
  {id:1,name:"Levis Jeans",price:1200},
  {id:1,name:"h&m hoodie",price:1200},
];

// order shchema
const orderSchema = new mongoose.Schema({
  items:Array,
  email:String,
  status:String,
  transactionId:String,
});
const Order = mongoose.model("Order",orderSchema);

app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

const PORT = 3000
app.listen(PORT,()=>console.log(`Server is running on ${PORT} `));