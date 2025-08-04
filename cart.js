document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const cartCountElement = document.querySelector(".cart-count");

  // Load cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update cart count
  cartCountElement.textContent = cart.length;

  // If cart is empty
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p style="text-align: center; color: #7f8c8d;">Your cart is empty 😕</p>`;
    cartTotalElement.textContent = "0.00";
    return;
  }

  let total = 0;

  // Render each cart item
  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <div class="cart-item-info">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div>
          <h4>${item.name}</h4>
          <p>Price: $${item.price.toFixed(2)}</p>
        </div>
      </div>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;

    cartItemsContainer.appendChild(itemDiv);

    total += item.price;
  });

  // Update total price
  cartTotalElement.textContent = total.toFixed(2);

  // Handle Remove
  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload(); // Reload to reflect changes
    }
  });
});
