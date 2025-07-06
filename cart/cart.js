import { updateCartQty } from "../common/uihelp.js"; // ✅ Import this at the top

const cartBody = document.querySelector("#cartBody");
let allTotal = document.querySelector("#totalPrice");
const cartSummary = JSON.parse(localStorage.getItem("cartData")) || [];

console.log(cartSummary);

function updateCart() {
  cartBody.innerHTML = "";
  let totalPrice = 0;
  cartSummary.forEach((item) => {
    const tr = document.createElement("tr");
    const td0 = document.createElement("td");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    td3.classList = "text-center";
    const td4 = document.createElement("td");
    td4.classList = "text-center";
    const img = document.createElement("img");
    img.src =
      item.thumbnail ||
      "https://dummyimage.com/64x64/f5f5f5/bfbfbf&text=TechShop";
    img.classList = "w-16 h-16 object-cover rounded";
    td0.appendChild(img);

    td1.textContent = item.title;

    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.classList = "input";
    qtyInput.min = 1;
    qtyInput.value = item.qty;

    // qtyInput.addEventListener("change", () => {
    //   const newQty = parseInt(qtyInput.value);
    //   if (newQty > 0) {
    //     item.qty = newQty;
    //     item.subtotal = newQty * item.price;
    //     localStorage.setItem("cartData", JSON.stringify(cartSummary));
    //     updateCart();
    //   }
    // });

    qtyInput.addEventListener("change", () => {
      const newQty = parseInt(qtyInput.value);
      if (newQty > 0) {
        item.qty = newQty;
        item.subtotal = parseFloat((newQty * item.price).toFixed(2));
        localStorage.setItem("cartData", JSON.stringify(cartSummary));

        updateCartQty();
        updateCart(); // Refresh the cart display
      }
    });

    td2.appendChild(qtyInput);
    td3.textContent = `$${item.price.toFixed(2)}`;
    td4.textContent = `$${parseFloat(item.subtotal).toFixed(2)}`;
    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    totalPrice += parseFloat(item.subtotal);

    cartBody.appendChild(tr);
  });

  allTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

const checkoutBtn = document.querySelector("#checkoutBtn");
const emptyMessage = document.querySelector("#emptyMessage");
const continueBtn = document.querySelector("#continueBtn");

if (cartSummary.length === 0) {
  cartBody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-gray-500">No items in cart.</td></tr>`;
  allTotal.textContent = "$0.00";

  checkoutBtn.classList.add(
    "cursor-not-allowed",
    "opacity-50",
    "pointer-events-none"
  );
  emptyMessage.classList.remove("hidden");
  continueBtn.classList.remove("hidden");
} else {
  checkoutBtn.classList.remove(
    "cursor-not-allowed",
    "opacity-50",
    "pointer-events-none"
  );
  emptyMessage.classList.add("hidden");
  continueBtn.classList.add("hidden");
}

updateCart();
