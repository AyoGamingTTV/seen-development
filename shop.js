const stripe = Stripe("pk_test_REPLACE_ME");

function checkout(priceId){
  fetch("https://your-backend.example.com/create-checkout-session", {
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ priceId })
  })
  .then(r => r.json())
  .then(data => stripe.redirectToCheckout({ sessionId: data.sessionId }));
}
