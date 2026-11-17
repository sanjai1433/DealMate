const defaultDeals = [
  {
    title: "iPhone",
    description: "Apple iPhone",
    image: "images/iphone.jpg",
    price: "₹69,999",
    oldPrice: "₹79,999",
    discount: "10% OFF",
    store: "Amazon",
    link: "https://link.amazon/B0gw4XICk"
  },
  {
    title: "MacBook",
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
    description: "Portable Bluetooth Speaker",
    price: "₹999",
    oldPrice: "₹1999",
    discount: "50% OFF",
    store: "Amazon",
    image: "images/speaker.jpg",
    link: "https://link.amazon/B0ixHMvd2"
   }
];

// Admin-la save panna products
let savedDeals = [];

try {
  savedDeals = JSON.parse(
    localStorage.getItem("dealMateProducts") || "[]"
  );
  if (!Array.isArray(savedDeals)) savedDeals = [];
} catch (error) {
  savedDeals = [];
}

// Admin product details normalize pannuvom
const adminDeals = savedDeals.map(product => ({
  title: product.title || product.name || "Product",
  description: product.description || product.title || product.name || "Special Deal",
  image: product.image || "",
  price: product.price || "",
  oldPrice: product.oldPrice || "",
  discount: product.discount || "",
  store: product.store || "Online Store",
  link: product.link || "#"
}));

// Default + Admin products
const deals = [...defaultDeals, ...adminDeals];

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const storeFilter = document.getElementById("storeFilter");

function showDeals(productList) {
  if (!productsContainer) return;

  productsContainer.innerHTML = "";

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

// Search and store filter
function filterDeals() {
  const searchText = searchInput
    ? searchInput.value.toLowerCase().trim()
    : "";

  const selectedStore = storeFilter
    ? storeFilter.value
    : "All";

  const filteredDeals = deals.filter(product => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText);

    const matchesStore =
      selectedStore === "All" ||
      product.store === selectedStore;

    return matchesSearch && matchesStore;
  });

  showDeals(filteredDeals);
}

if (searchInput) {
  searchInput.addEventListener("input", filterDeals);
}

if (storeFilter) {
  storeFilter.addEventListener("change", filterDeals);
}

// Show all products
showDeals(deals);
