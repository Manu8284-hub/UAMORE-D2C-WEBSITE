document.addEventListener("DOMContentLoaded", () => {
  updateOrderSummary();

  const payBtn = document.getElementById("pay-btn");
  if (payBtn) {
    payBtn.addEventListener("click", handleDummyPayment);
  }
});

function updateOrderSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemsTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = itemsTotal > 0 ? 4.99 : 0;
  const totalPayable = itemsTotal + shipping;

  const itemTotalEl = document.getElementById("item-total");
  const shippingEl = document.getElementById("shipping");
  const totalPayableEl = document.getElementById("total-payable");

  if (itemTotalEl) itemTotalEl.textContent = `$${itemsTotal.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = `$${shipping.toFixed(2)}`;
  if (totalPayableEl) totalPayableEl.textContent = `$${totalPayable.toFixed(2)}`;
}

function handleDummyPayment(e) {
  e.preventDefault();

  const name = document.getElementById("card-name")?.value;
  const number = document.getElementById("card-number")?.value;
  const expiry = document.getElementById("card-expiry")?.value;
  const cvv = document.getElementById("card-cvv")?.value;

  if (name && number && expiry && cvv) {
    alert("✅ Payment Successful (Dummy)");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  } else {
    alert("❌ Please fill in all payment details.");
  }
}
