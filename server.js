require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.stripe_privateKey);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to eShop website.");
});

const calculateOrderAmount = (items) => {
  let tempCartTotalAmount = 0;
      for (let i = 0; i < items.length; i++) {
        tempCartTotalAmount +=
          items[i].price * items[i].cartQuantiy;
      }
  return tempCartTotalAmount * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items, shipping, description, userEmail } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        address:shipping.address,
        city:shipping.city,
        country:shipping.country,
        postal_code:shipping.postal_code,
      },
      name:shipping.name,
      phone:shipping.phone,
    },
    // receipt_email: userEmail
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));
