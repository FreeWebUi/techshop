import { updateCartQty, setupSearchModal, setupSearchFunctionality } from "./uihelp.js";
import { fetchAndStoreProducts } from "./dataService.js";

document.addEventListener("DOMContentLoaded", () => {
  updateCartQty();
  setupSearchModal();
  setupSearchFunctionality();
  fetchAndStoreProducts()
});


const subsBtn = document.querySelector("#subsBtn");

subsBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const form = document.querySelector("#onSubscribe");
  const emailInput = form.querySelector("input[type='email']");
  const message = document.querySelector("#subscribeMessage");

  // Use built-in form validation
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Show thank-you message
  form.classList.add("hidden");
  message.textContent = "Thank you for signing up for our newsletter!";
  message.classList.remove("hidden");
});

// const menuToggle = document.querySelector("#mobileMenuBtn");
//   const mobileMenu = document.getElementById('mobileMenu');

//   menuToggle.addEventListener('click', () => {
//     mobileMenu.classList.toggle('hidden');
//   });

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector("#mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }
  });



