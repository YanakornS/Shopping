const cart = {};

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("data-product-id");
    const price = parseFloat(button.getAttribute("data-price"));
    if (!cart[productId]) {
      cart[productId] = { quantity: 1, price: price };
    } else {
      cart[productId].quantity++;
    }
    updateCartDisplay();
  });
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("decrease-quantity")) {
    const productId = event.target.getAttribute("data-product-id");

    if (cart[productId] && cart[productId].quantity > 1) {
      cart[productId].quantity--;
      updateCartDisplay();
    }
  }

  if (event.target.classList.contains("remove-from-cart")) {
    const productId = event.target.getAttribute("data-product-id");
    if (cart[productId]) {
      delete cart[productId];
      updateCartDisplay();
    }
  }
});

function updateCartDisplay() {
  const cartElement = document.getElementById("cart");
  cartElement.innerHTML = "";
  let totalPrice = 0;
  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.quantity * item.price;
    totalPrice += itemTotalPrice;
    const productElement = document.createElement("div");
    const productName = document.createElement("p");
    productName.textContent = `Product ${productId}: ${item.quantity} x $${item.price} = $${itemTotalPrice}`;

    // Add icon
    const icon = document.createElement("i");
    icon.className = "fas fa-shopping-cart"; // Adjust the class for the icon you want

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "Decrease Quantity";
    decreaseButton.setAttribute("class", "decrease-quantity");
    decreaseButton.setAttribute("data-product-id", productId);

    productElement.appendChild(productName);
    productElement.appendChild(decreaseButton);
    productElement.appendChild(icon); // Add the icon

    cartElement.appendChild(productElement);
  }
  if (Object.keys(cart).length === 0) {
    cartElement.innerHTML = "<p>No items in cart.</p>";
  } else {
    const totalPriceElement = document.createElement("p");
    totalPriceElement.textContent = `Total Price: $${totalPrice}`;
    cartElement.appendChild(totalPriceElement);
  }
}

