import { updateCartQty } from "../common/uihelp.js";

const onSubmit = document.querySelector("#onSubmit");
const cartSummary = JSON.parse(localStorage.getItem("cartData")) || [];

const orderSummary = document.getElementById("orderSummary");
const orderDetails = document.getElementById("orderDetails");
const message = document.getElementById("message");
const orderNote = document.getElementById("orderNote");

orderSummary.innerHTML = "";

let totalPrice = 0;

// Show empty cart message
if (cartSummary.length === 0) {
  message.innerHTML = `<p class="text-red-600 font-medium text-center text-lg">Your cart is empty.</p>`;
  orderDetails.classList.add("hidden");
} else {
  cartSummary.forEach((item) => {
    const itemRow = document.createElement("div");
    itemRow.className = "flex justify-between border-b pb-2";

    const itemInfo = document.createElement("div");
    const itemTitle = document.createElement("p");
    itemTitle.className = "font-medium";
    itemTitle.textContent = item.title;

    const itemQty = document.createElement("p");
    itemQty.className = "text-sm text-gray-500";
    itemQty.textContent = `Qty: ${item.qty}`;

    itemInfo.appendChild(itemTitle);
    itemInfo.appendChild(itemQty);

    const itemSubtotal = document.createElement("p");
    itemSubtotal.textContent = `₹${item.subtotal.toFixed(2)}`;

    itemRow.appendChild(itemInfo);
    itemRow.appendChild(itemSubtotal);
    orderSummary.appendChild(itemRow);

    totalPrice += item.subtotal;
  });

  const subtotalRow = document.createElement("div");
  subtotalRow.className = "flex justify-between pt-4";
  subtotalRow.innerHTML = `<p class="font-semibold">Subtotal</p><p>₹${totalPrice.toFixed(2)}</p>`;

  const shippingRow = document.createElement("div");
  shippingRow.className = "flex justify-between";
  shippingRow.innerHTML = `<p class="font-semibold">Shipping</p><p>₹0.00</p>`;

  const totalRow = document.createElement("div");
  totalRow.className = "flex justify-between text-xl font-bold border-t pt-4";
  totalRow.innerHTML = `<p>Total</p><p>₹${totalPrice.toFixed(2)}</p>`;

  orderSummary.appendChild(subtotalRow);
  orderSummary.appendChild(shippingRow);
  orderSummary.appendChild(totalRow);
}

// Form submission
onSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.querySelector("#orderForm");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Prevent double click
  onSubmit.disabled = true;
  onSubmit.textContent = "Processing...";

  // Clear localStorage and UI
  localStorage.clear();
  updateCartQty();

  orderDetails.classList.add("hidden");
  message.innerHTML = `
    <h2 class="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully</h2>
    <p class="text-gray-700 mb-4">Thank you for your purchase!</p>
    <a href="/" class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition">Back to Home</a>
  `;
});
