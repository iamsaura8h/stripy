## **Overview**

This is a simple shopping app built using **React (Vite)** on the frontend and **Node.js + Express + MongoDB + Stripe** on the backend.
Users can view products, add them to cart, and complete payment using Stripe Checkout.

For the demo/submission, Stripe Test Mode is used, so test cards are supported.

---

## **Tech Stack used**

* **Frontend:** React + Vite + Tailwind
* **Backend:** Node.js, Express
* **Database:** MongoDB (Mongoose)
* **Payments:** Stripe Checkout (Test Mode)

---

## **Features**

* Simple product list (4 products)
* Add to cart
* Cart modal with item count badge
* Checkout page
* Stripe integrated checkout
* Stores successful & failed orders in MongoDB

---

## **Folder Structure**
server\
client\

---

## **Environment Variables**

In `server/.env`:

```
MONGO_URI=your_mongo_connection_string
STRIPE_SECRET_KEY=asfwafwgawgasf
```

Make sure Stripe is in **test mode** while submitting.

---

## **Backend Explanation (server.js)**

## **1. Setup**

* Loads env
* Connects to MongoDB
* Initializes Stripe
* Enables CORS + JSON parsing

### **2. Order Schema**

Stores:

* items
* email
* status
* transactionId

### **3. Products Endpoint**

Static product list returned when frontend calls `/api/products`.

### **4. Checkout Session**

When user clicks “Pay”, frontend sends:

* items
* email

Server creates a Stripe Checkout Session and returns the payment URL.

### **5. Order Saving**

Two endpoints:

* `/api/payment-success`
* `/api/payment-failed`

Both store order records in MongoDB for tracking.

---

## **Frontend Flow**

### Navbar

* Cart button
* Shows number of items
* Clicking opens modal with cart items and Checkout button

### Landing Page

Shows 4 products with **Add to Cart** button.

### Checkout Page

User enters email → sees cart summary → Stripe Payment.

---

## **How Payments Work**

NOT WORKING AS OF NOW but if you have Stripe INDIA account then go ahead and setup your bank account and get the STRIPE API KEY, put it in .env file as 
STRIPE_SECRET_KEY=aakgsbangwghlka

---


## **Limitations / Notes**

* UPI not available because Stripe India verification is pending
* Only card payments enabled for now
* Prices are static
* No advanced security as of now due to time constraints

---

## ✅ **How to Run**

### **Backend**

```
cd server
npm install
node server.js
```

### **Frontend**

```
cd client
npm install
npm run dev
```

---

## **Final Notes**

This is a very lightweight e-commerce demo focusing mainly on the payment flow and basic cart functionality.
UI is intentionally kept minimal to keep the focus on logic.

