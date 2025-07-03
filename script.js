const openSearchBtn = document.getElementById("openSearchBtn");
const closeSearchBtn = document.getElementById("closeSearchBtn");
const searchModal = document.getElementById("searchModal");

openSearchBtn.addEventListener("click", () => {
  searchModal.classList.remove("hidden");
});

closeSearchBtn.addEventListener("click", () => {
  searchModal.classList.add("hidden");
});

// Optional: close on outside click
window.addEventListener("click", (e) => {
  if (e.target === searchModal) {
    searchModal.classList.add("hidden");
  }
});
