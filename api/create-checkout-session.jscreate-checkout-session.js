// File: api/create-checkout-session.js

import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: "price_123456", // Replace with your Stripe price ID
          quantity: 1,
        },
      ],
      success_url: "https://www.seendeveopment.co/shop.html?success=true",
      cancel_url: "https://www.seendeveopment.co/shop.html?cancel=true",
    });

    return res.status(200).json({ url: session.url });
  } catch (e) {
    return res.status(400).send(`Error: ${e.message}`);
  }
}
