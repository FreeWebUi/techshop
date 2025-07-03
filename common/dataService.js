// dataService.js

const STORAGE_KEY = "selectedCategoryProducts";
const SELECTED_CATEGORIES = [
  "smartphones",
  "laptops",
  "tablets",
  "mobile-accessories"
];

// ✅ Call this only once on first site load (e.g., in main.js)
export async function fetchAndStoreProducts() {
  try {
    const fetches = SELECTED_CATEGORIES.map((cat) =>
      fetch(`https://dummyjson.com/products/category/${cat}?limit=100`)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch ${cat}`);
          return res.json();
        })
        .then((data) => ({ category: cat, products: data.products }))
    );

    const results = await Promise.all(fetches);
    const categoryData = {};

    results.forEach(({ category, products }) => {
      categoryData[category] = products;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(categoryData));
    return categoryData;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

export function getStoredProducts(category = null) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!data) return [];

  if (category && SELECTED_CATEGORIES.includes(category)) {
    return data[category] || [];
  }

  // If no category passed, combine all products
  return Object.values(data).flat();
}

