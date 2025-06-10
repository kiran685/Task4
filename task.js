// Dark Mode
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// To-Do List
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = '';
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.textContent = task;
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => {
      tasks.splice(i, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    };
    li.appendChild(btn);
    taskList.appendChild(li);
  });
}
function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    loadTasks();
  }
}

// Product + Cart
const products = [
  {
    name: "Smartphone",
    category: "electronics",
    price: 15000,
    rating: 4.5,
    image: "vivo.webp"
  },
  {
    name: "Laptop",
    category: "electronics",
    price: 40000,
    rating: 4.7,
    image: "laptop.webp"
  },
  {
    name: "Novel Book",
    category: "books",
    price: 300,
    rating: 4.2,
    image: "novel.webp"
  },
  {
    name: "Head Set",
    category: "electronics",
    price: 10000,
    rating: 4.3,
    image: "headset.jpeg"
  },
  {
    name: "shirt",
    category: "clothes",
    price: 500,
    rating: 4.0,
    image: "shirt.jpg"
  },
  {
    name: "T-Shirt",
    category: "clothes",
    price: 300,
    rating: 4.5,
    image: "tshirt.webp"
  },
  {
    name: "Study Guide",
    category: "books",
    price: 1000,
    rating: 4.0,
    image: "gate.jpg"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
  const container = document.getElementById("productContainer");
  const filter = document.getElementById("categoryFilter").value;
  const sort = document.getElementById("sortBy").value;

  let filtered = [...products];
  if (filter !== "all") filtered = filtered.filter(p => p.category === filter);
  if (sort === "priceLow") filtered.sort((a, b) => a.price - b.price);
  if (sort === "ratingHigh") filtered.sort((a, b) => b.rating - a.rating);

  container.innerHTML = '';
  filtered.forEach((p, i) => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>₹${p.price} | ⭐${p.rating}</p>
        <button onclick="addToCart(${i})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(index) {
  cart.push(products[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cartList");
  const totalEl = document.getElementById("cartTotal");
  list.innerHTML = '';
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price;
    list.innerHTML += `
      <li>${item.name} - ₹${item.price}
        <button onclick="removeFromCart(${i})">❌</button>
      </li>
    `;
  });
  totalEl.textContent = `Total: ₹${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Init
window.onload = () => {
  loadTasks();
  renderProducts();
  renderCart();
};

document.getElementById("categoryFilter").onchange = renderProducts;
document.getElementById("sortBy").onchange = renderProducts;
