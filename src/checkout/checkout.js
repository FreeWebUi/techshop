import { updateCartQty } from "../common/uihelp.js"; 

const onSubmit = document.querySelector("#onSubmit");
const ordeDetails = document.querySelector("#orderDetails");
const orderSummary = document.querySelector("#orderSummary");
const message = document.querySelector("#message");
const cartSummary = JSON.parse(localStorage.getItem("cartData")) || [];

const totalpriceElement = document.createElement("p");
const cartQtyElement = document.createElement("p");
totalpriceElement.classList = "text-xl font-bold my-4";

let totalPrice = 0;
let cartQty = 0;

if (cartSummary.length === 0) {
  const noOrder = document.createElement("p"); 
  noOrder.textContent = "Your cart is empty.";
  message.appendChild(noOrder);
  ordeDetails.classList.add("hidden");
} else {  
  cartSummary.forEach((item) => {
    totalPrice += item.subtotal;
    cartQty += item.qty;
  });

  cartQtyElement.textContent = `Cart Quantity: ${cartQty}`;
  totalpriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  orderSummary.appendChild(cartQtyElement);
  orderSummary.appendChild(totalpriceElement);
}

onSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.querySelector("#orderForm");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Clear localStorage and update header
  localStorage.clear();
  updateCartQty();

  // Create message
  const heading = document.createElement("h2");
  heading.textContent = "Order Placed Successfully";
  heading.classList = "text-3xl font-bold text-green-700 my-6";

  const link = document.createElement("a");
  link.href = "/src";
  link.textContent = "Back to Home";
  link.classList = "btn primary mt-4";

  ordeDetails.classList.add("hidden");
  message.innerHTML = ""; // clear old message if any
  message.appendChild(heading);
  message.appendChild(link);
});
