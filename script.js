const defaultDeals = [
  {
    title: "iPhone 17 Pro",
    category: "iPhone",
    description: "Apple iPhone 17 Pro 256GB Cosmic Orange",
    image: "images/iphone.jpg",
    price: "₹1,27,900",
    oldPrice: "₹1,34,900",
    discount: "5% OFF",
    store: "Amazon",
    link: "https://link.amazon/B02Yv29D6"
  },
  {
    title: "iPhone 17 Pro Max",
    category: "iPhone",
    description: "Apple iPhone 17 Pro Max",
    image: "images/iphone17promax.png",
    price: "₹1,44,900",
    oldPrice: "1,49,900",
    discount: "3% OFF",
    store: "Amazon",
    link: "https://link.amazon/B032xdg3P"
  },
  {
    title: "iPhone 17",
    category: "iPhone",
    description: "Apple iPhone 17",
    image: "images/iphone17.jpg",
    price: "₹1,19,990",
    oldPrice: "1,24,900",
    discount: "4% OFF",
    store: "Amazon",
    link: "https://link.amazon/B08BfjcTi"
  },
  {
    title: "iPhone 16",
    category: "iPhone",
    description: "Apple iPhone 16",
    image: "images/iphone16.jpg",
    price: "₹79,990",
    oldPrice: "89,900",
    discount: "11% OFF",
    store: "Amazon",
    link: "https://link.amazon/B04ag9eib"
  },
  {
    title: "MacBook",
    category: "MacBook",
    description: "Apple MacBook Air M5",
    image: "images/macbook.jpg",
    price: "₹89,999",
    oldPrice: "₹99,999",
    discount: "15% OFF",
    store: "Amazon",
    link: "https://link.amazon/B0dVKSAa7"
  },
  {
    title: "Headphones",
    category: "Headphones",
    description: "Wireless Headphones",
    image: "images/headphones.jpg",
    price: "₹1,499",
    oldPrice: "₹2,499",
    discount: "40% OFF",
    store: "Amazon",
    link: "https://link.amazon/B06ItKAou"
  },
  {
    title: "Smart Watch",
    category: "Smart Watch",
    description: "Smart Watch",
    image: "images/watch.jpg",
    price: "₹999",
    oldPrice: "₹1,999",
    discount: "50% OFF",
    store: "Amazon",
    link: "https://link.amazon/B01rqelNI"
  },
  {
    title: "Fashion",
    category: "Fashion",
    description: "Men Fashion",
    image: "images/fashion.jpg",
    price: "₹499",
    oldPrice: "₹999",
    discount: "30% OFF",
    store: "Amazon",
    link: "https://link.amazon/B00PhxSHL"
  },
  {
    title: "Shoes",
    category: "Shoes",
    description: "Stylish Shoes",
    image: "images/shoes.jpg",
    price: "₹799",
    oldPrice: "₹1,499",
    discount: "35% OFF",
    store: "Amazon",
    link: "https://link.amazon/B01SoxiRx"
  },
  {
    title: "Bluetooth Speaker",
    category: "Bluetooth Speaker",
    description: "Portable Bluetooth Speaker",
    image: "images/speaker.jpg",
    price: "₹999",
    oldPrice: "₹1,999",
    discount: "50% OFF",
    store: "Amazon",
    link: "https://link.amazon/B0ixHMvd2"
  }
];

// Admin-la save panna products
let savedDeals = [];

try {
  savedDeals = JSON.parse(
    localStorage.getItem("dealMateProducts") || "[]"
  );

  if (!Array.isArray(savedDeals)) {
    savedDeals = [];
  }
} catch (error) {
  savedDeals = [];
}

// Admin products-ku category set pannuvom
const adminDeals = savedDeals.map(product => ({
  title: product.title || product.name || "Product",
  category: product.category || product.title || product.name || "Other",
  description: product.description || product.title || product.name || "Special Deal",
  image: product.image || "",
  price: product.price || "",
  oldPrice: product.oldPrice || "",
  discount: product.discount || "",
  store: product.store || "Online Store",
  link: product.link || "#"
}));

const deals = [...defaultDeals, ...adminDeals];

// HTML elements
const categoryList = document.getElementById("categoryList");
const categoryDeals = document.getElementById("categoryDeals");
const categoryTitle = document.getElementById("categoryTitle");
const backButton = document.getElementById("backButton");
const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");

let selectedCategory = "";

// Product cards display
function showDeals(productList) {
  if (!productsContainer) return;

  productsContainer.innerHTML = "";

  if (productList.length === 0) {
    productsContainer.innerHTML = "<p>No offers found in this category.</p>";
    return;
  }

  productList.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;

    img.onerror = function () {
      this.style.display = "none";
    };

    const heading = document.createElement("h3");
    heading.textContent = product.title;

    const description = document.createElement("p");
    description.textContent = product.description;

    const priceBox = document.createElement("div");
    priceBox.className = "price";

    const price = document.createElement("strong");
    price.textContent = product.price;

    const oldPrice = document.createElement("del");
    oldPrice.textContent = product.oldPrice;

    priceBox.append(price, oldPrice);

    const discount = document.createElement("span");
    discount.className = "discount";
    discount.textContent = product.discount;

    const store = document.createElement("p");
    store.textContent = product.store;

    const buyButton = document.createElement("a");
    buyButton.textContent = "Buy Now";
    buyButton.href = product.link;
    buyButton.target = "_blank";
    buyButton.rel = "noopener noreferrer";

    card.append(
      img,
      heading,
      description,
      priceBox,
      discount,
      store,
      buyButton
    );

    productsContainer.appendChild(card);
  });
}

// Category open
function openCategory(category) {
  selectedCategory = category;

  categoryTitle.textContent = category + " Offers";

  categoryList.hidden = true;
  categoryDeals.hidden = false;

  if (searchInput) {
    searchInput.value = "";
  }

  filterDeals();

  categoryDeals.scrollIntoView({
    behavior: "smooth"
  });
}

// Category buttons
if (categoryList) {
  categoryList.addEventListener("click", function (event) {
    const button = event.target.closest(".category-card");

    if (!button) return;

    openCategory(button.dataset.category);
  });
}

// Search within selected category
function filterDeals() {
  const searchText = searchInput
    ? searchInput.value.toLowerCase().trim()
    : "";

  const filteredDeals = deals.filter(product => {
    const matchesCategory =
      product.category === selectedCategory;

    const matchesSearch =
      product.title.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  showDeals(filteredDeals);
}

if (searchInput) {
  searchInput.addEventListener("input", filterDeals);
}

// Back to categories
if (backButton) {
  backButton.addEventListener("click", function () {
    categoryDeals.hidden = true;
    categoryList.hidden = false;
    selectedCategory = "";

    if (searchInput) {
      searchInput.value = "";
    }

    document.getElementById("categories").scrollIntoView({
      behavior: "smooth"
    });
  });
}
