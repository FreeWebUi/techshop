import { updateCartQty, showCartMessage } from "../common/uihelp.js";

let singleProduct = {};
const productDetails = document.querySelector("#productDetails");

// Parse the URL query string
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Try to get product from localStorage
function getProductFromLocalStorage(productId) {
  const data =
    JSON.parse(localStorage.getItem("selectedCategoryProducts")) || {};
  const allProducts = Object.values(data).flat();
  const product = allProducts.find((p) => p.id == productId);
  console.log("Product from localStorage:", product);
  return product;
}

async function getProductDetails() {
  try {
    // Try from localStorage
    singleProduct = getProductFromLocalStorage(id);

    // If not found in localStorage, fallback to API
    if (!singleProduct) {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) throw new Error("API Response is not ok");
      singleProduct = await response.json();
      console.log("Fetched from API:", singleProduct);
    }

    renderProductDetails(singleProduct);
  } catch (error) {
    console.error("Error fetching product details:", error);
    productDetails.innerHTML = `<p class="text-red-500">Failed to load product details.</p>`;
  }
}

async function getRelatedproducts() {
  const singleProduct = getProductFromLocalStorage(id); // Make sure 'id' is available
  const currentProductId = singleProduct.id;

  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${singleProduct.category}?limit=10`
    );
    if (!response.ok) throw new Error("API Response is not ok");

    const data = await response.json();
    const relatedItems = data.products;

    // Filter out the current product from related items
    const filterItems = relatedItems.filter(
      (item) => item.id !== currentProductId
    );

    const relatedContainer = document.querySelector("#relatedProducts"); // ✅ Your DOM container

    filterItems.slice(0, 4).forEach((product) => {
      const img =
        product.thumbnail ||
        "https://dummyimage.com/256x256/f5f5f5/bfbfbf&text=TechShop";
      const div = document.createElement("div");
      div.className =
        "bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center";
      div.innerHTML = `
        <a href="/product/?id=${product.id}" class="flex justify-center rounded bg-neutral-50 p-4 mb-4">
          <img src="${img}" alt="${product.title}" />
        </a>
        <h5>${product.title}</h5> 
        <p class="font-semibold my-2">$${product.price}</p> 
        <button id="${product.id}"
          data-title="${product.title}" 
          data-price="${product.price}" 
          class="btn btnAddCart">Add to cart</button>`;
      relatedContainer.appendChild(div); // ✅ Append to correct container
    });

    // Bind Add to Cart for related products
    document.querySelectorAll(".btnAddCart").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.id;
        const title = button.dataset.title;
        const price = Number(button.dataset.price);
        const thumbnail =
          button.dataset.thumbnail ||
          "https://dummyimage.com/256x256/f5f5f5/bfbfbf&text=TechShop";

        const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

        const existingCartItem = cartData.find((item) => item.id == id);

        if (existingCartItem) {
          existingCartItem.qty += 1;
          existingCartItem.subtotal =
            existingCartItem.qty * existingCartItem.price;
        } else {
          cartData.push({
            thumbnail,
            id,
            title,
            price,
            qty: 1,
            subtotal: price,
          });
        }

        localStorage.setItem("cartData", JSON.stringify(cartData));
        updateCartQty();
        // alert("Item added to cart!");
        showCartMessage();
      });
    });
  } catch (error) {
    console.error("Error fetching related products:", error);
    const relatedContainer = document.querySelector("#relatedProducts");
    relatedContainer.innerHTML = `<p class="text-red-500">Error fetching related products.</p>`;
  }
}

function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  let stars = "★".repeat(fullStars); // Full stars
  if (halfStar) stars += "☆"; // Optional: Use half star or empty
  stars += "✩".repeat(emptyStars); // Empty stars

  return stars;
}

function renderProductDetails(product) {
  const eachProduct = document.createElement("div");
  eachProduct.className =
    "singleProduct mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8";
  eachProduct.innerHTML = `
    <div class="leftDiv">
    <div class="flex justify-center rounded shadow bg-neutral-50 p-4">
      <img src="${product.images?.[0]}" alt="${
    product.title
  }" class="rounded" />
      </div>
    </div>
    <div class="rightDiv">
     <div class="flex gap-6">
        <span class="text-blue-600 dark:text-sky-400 font-bold">${
          product.brand
        }</span>
      </div>
      <div class="flex justify-between items-start mb-2">
        <h2 class="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl">${
          product.title
        }</h2>
        <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">${
          product.availabilityStatus || "In Stock"
        }</span>
      </div>
      
        <p class="mb-4 text-yellow-500 text-lg">${getStarRating(
          product.rating
        )} <span class="text-gray-700 text-sm">(${product.rating})</span></p>
     
      <div class="mb-6">
        <div class="text-blue-600 dark:text-sky-400 font-bold text-lg mb-2">$${
          product.price
        }</div>
        <button id="${product.id}"
          data-title="${product.title}" 
          data-price="${product.price}"
           data-thumbnail="${
             product.thumbnail ||
             "https://dummyimage.com/256x256/f5f5f5/bfbfbf&text=TechShop"
           }"
          class="btnAddCart btn primary">
          Add to cart
        </button>
      </div>
    
      <p class="mb-4 blink">⛟ ${
        product.shippingInformation || "Ships in 3-5 days"
      }</p>
      <p class="text-gray-700 mb-4">${product.description}</p>
      <div class="mb-4">
       <h5 class="font-semibold mb-2">Warranty & Return Policy</h5>
       <div class="flex gap-8 items-start">
       <p><span class='text-lg'>✪</span> ${
         product.warrantyInformation || "No Warranty"
       }</p>
       <p>↩ ${product.returnPolicy}</p>
       </div>
       </div>
      

      <div class="">
        <h5 class="font-semibold mb-2">Recent Reviews</h5>
        <ul class="list-disc-none">
          ${
            product.reviews
              ? product.reviews
                  .map(
                    (review) => `<li class="mb-4 text-sm">
            <div class="flex items-center gap-2 justify-between">
            <span class="text-gray-700">${review.comment}</span>
            <span class="text-neutral-500">${review.reviewerName}</span>
            </div>
            <div class="flex items-center gap-2 justify-between">
            <span style='color: #eab308'>${getStarRating(review.rating)}</span>
            
            <span class="text-neutral-400 text-xs">${new Date(
              review.date
            ).toLocaleDateString()}</span>
            </div>
            
            </li>`
                  )
                  .join("")
              : "<li>No recent reviews available</li>"
          }
        </ul>
        </div>
      
    </div>
  `;

  productDetails.appendChild(eachProduct);

  setupAddToCart(product);
}

function setupAddToCart(product) {
  const btnAddCart = document.querySelector(".btnAddCart");
  const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

  btnAddCart.addEventListener("click", () => {
    const existingCartItem = cartData.find((item) => item.id == product.id);

    if (existingCartItem) {
      existingCartItem.qty += 1;
      existingCartItem.subtotal = existingCartItem.qty * existingCartItem.price;
    } else {
      cartData.push({
        thumbnail: product.thumbnail,
        id: product.id,
        title: product.title,
        price: product.price,
        qty: 1,
        subtotal: product.price,
      });
    }

    localStorage.setItem("cartData", JSON.stringify(cartData));
    updateCartQty(); // ✅ Now uses imported version
    // alert("Item added to cart!");
    showCartMessage();
  });
}

getRelatedproducts();
getProductDetails();
updateCartQty();
