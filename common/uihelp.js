// This script manages the shopping cart functionality for a tech shop website.
export function updateCartQty() {
  const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
  const totalQty = cartData.reduce((sum, item) => sum + item.qty, 0);
  const qtyElem = document.querySelector("#cartQty");

  if (qtyElem) {
    qtyElem.textContent = totalQty;
  }
}

export function setupSearchModal() {
  const searchModal = document.getElementById("searchModal");
  const openSearchBtn = document.getElementById("openSearchBtn");
  const closeSearchBtn = document.getElementById("closeSearchBtn");

  if (!searchModal || !openSearchBtn || !closeSearchBtn) return;

  openSearchBtn.addEventListener("click", () => {
    searchModal.classList.remove("hidden");
  });

  closeSearchBtn.addEventListener("click", () => {
    searchModal.classList.add("hidden");
  });

  // ✅ Close modal when clicking outside modal content
  searchModal.addEventListener("click", (event) => {
    if (event.target === searchModal) {
      searchModal.classList.add("hidden");
    }
  });
}


export function setupSearchFunctionality() {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  if (!searchInput || !searchResults) return;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    // ✅ Require minimum 3 characters
    if (query.length < 3) {
      searchResults.innerHTML = `<p class="text-gray-400 col-span-2">Type at least 3 characters</p>`;
      return;
    }

    const categoryData = JSON.parse(localStorage.getItem("selectedCategoryProducts")) || {};
    const allProducts = Object.values(categoryData).flat();

    const results = allProducts.filter(p =>
      p.title.toLowerCase().includes(query)
    );

    searchResults.innerHTML = results.length
      ? results.map(p => `
        <div class="border rounded p-2 hover:shadow">
          <a href="/product/?id=${p.id}" class="flex flex-col items-center">
            <img src="${p.thumbnail}" class="w-24 h-24 object-cover rounded mb-2" />
            <h5 class="font-semibold">${p.title}</h5>
            <p class="text-sm text-gray-600">₹${p.price}</p>
          </a>
        </div>
      `).join("")
      : `<p class="text-gray-500 col-span-2">No products found.</p>`;
  });
}




