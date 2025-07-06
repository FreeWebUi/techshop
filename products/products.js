
// productPage.js
import { updateCartQty } from "../common/uihelp.js";
import { getStoredProducts } from "../common/dataService.js";

const viewProducts = document.querySelector("#viewProducts");
viewProducts.innerHTML = "";

function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  let stars = '★'.repeat(fullStars); // Full stars
  if (halfStar) stars += '☆';        // Optional: Use half star or empty
  stars += '✩'.repeat(emptyStars);   // Empty stars

  return stars;
}

function renderProducts(products) {
  

  if (!products || products.length === 0) {
    viewProducts.innerHTML = "<p>No products available.</p>";
    return;
  }

  products.forEach((product) => {
    const img = product.thumbnail || "https://dummyimage.com/256x256/f5f5f5/bfbfbf&text=TechShop";
    const div = document.createElement("div");
    div.className = 'bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center';
    div.innerHTML = `
      <a href="/product/?id=${product.id}" class="flex justify-center rounded bg-neutral-50 p-4 mb-4">
        <img src="${img}" />
      </a>
      <h5>${product.title}</h5> 
      <p class="mb-4 text-yellow-500 text-lg">${getStarRating(product.rating)} <span class="text-gray-700 text-sm">(${product.rating})</span></p>
      <p class="font-semibold my-2">$${product.price}</p> 
      <button id="${product.id}"
        data-title="${product.title}" 
        data-price="${product.price}" 
        data-thumbnail="${product.thumbnail || 'https://dummyimage.com/256x256/f5f5f5/bfbfbf&text=TechShop'}"
        class="btn btnAddCart">Add to cart</button>`;
    viewProducts.appendChild(div);
  });

  addToCart();
}

function addToCart() {
  const btnAddCart = document.querySelectorAll(".btnAddCart");
  const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

  btnAddCart.forEach((btn) => {
    btn.addEventListener("click", () => {
      const thumbnail = btn.getAttribute("data-thumbnail");
      const pId = btn.getAttribute("id");
      const pTitle = btn.getAttribute("data-title");
      const pPrice = parseFloat(btn.getAttribute("data-price"));

      const existing = cartData.find(item => item.id === pId);
      if (existing) {
        existing.qty += 1;
        existing.subtotal = existing.qty * existing.price;
      } else {
        cartData.push({
          thumbnail: thumbnail, 
          id: pId,
          title: pTitle,
          price: pPrice,
          qty: 1,
          subtotal: pPrice,
        });
      }

      localStorage.setItem("cartData", JSON.stringify(cartData));
      updateCartQty();
    });
  });
}

// ✅ Init on page load
function initPage() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const products = getStoredProducts(category);
  const productsTitle = document.querySelector("#productsTitle");
  if (category == null || category == 'all') {
    productsTitle.innerHTML = "All Products";
  } else if (category == 'laptop') {
    productsTitle.innerHTML = "Laptops";
  } else if (category == 'mobile-accessories') {
    productsTitle.innerHTML = "Accessories";
  }else if (category == 'smartphones') {
    productsTitle.innerHTML = "Mobiles";
  }
   else {
    productsTitle.innerHTML = category;
  }
  renderProducts(products);
}


initPage();
