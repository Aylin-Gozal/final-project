document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const usernameDisplay = document.getElementById('usernameDisplay');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
  
    if (currentUser) {
      
      usernameDisplay.textContent = currentUser.username;
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
    }
  
    
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.reload(); 
    });
  });








document.addEventListener("DOMContentLoaded", () => {
  const defaultProducts = [
    {
      name: "Hanes Hanes Cotton T-Shirt",
      category: "Clothing",
      price: 19.99,
      rating: 3,
      reviews: 3,
      image: "shop images/Hanes t-shirt.jpg",
      description: "Comfortable cotton T-shirt perfect for everyday wear."
    },
    {
      name: "Nike Nike Running Shoes",
      category: "Footwear",
      price: 89.99,
      rating: 4,
      reviews: 4,
      image: "shop images/Nike running shoes.avif",
      description: "Lightweight running shoes designed for performance."
    },
    {
      name: "Samsonite Samsonite Backpack",
      category: "Accessories",
      price: 79.99,
      rating: 2,
      reviews: 2,
      image: "shop images/Samsonite blue backpack.jpg",
      description: "Durable backpack with multiple compartments."
    },
    {
      name: "Apple Apple iPad Pro",
      category: "Tablets",
      price: 899.99,
      rating: 5,
      reviews: 5,
      image: "shop images/Apple ipad pro.jpg",
      description: "High performance tablet with stunning display."
    }
  ];

  
  const currentUser = localStorage.getItem("username");
  const userProducts = JSON.parse(localStorage.getItem(`userProducts_${currentUser}`)) || [];

  
  const allProducts = [...defaultProducts, ...userProducts];

  
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!product) {
    document.body.innerHTML = '<h2 class="text-center mt-5">Product not found!</h2>';
    return;
  }

  
  const imageEl = document.getElementById("product-image");
  const nameEl = document.getElementById("product-name");
  const priceEl = document.getElementById("product-price");
  const descEl = document.getElementById("product-description");
  const ratingEl = document.getElementById("product-rating");

  imageEl.src = product.image || "placeholder.jpg";
  
  nameEl.textContent = product.name || product.brand || "Unnamed Product";
  priceEl.textContent = "$" + (parseFloat(product.price) || 0).toFixed(2);

  
  descEl.textContent = product.description || "";

  
  function renderStars(container, rating) {
    container.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.classList.add("star");
      star.innerHTML = "&#9733;";
      star.style.color = i <= rating ? "#FFD700" : "#ccc";
      container.appendChild(star);
    }
  }
  renderStars(ratingEl, product.rating || 0);


  document.getElementById("add-to-cart").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const identifier = product.name || product.brand || ""; 
    const idx = cart.findIndex(item => item.name === identifier);
    if (idx > -1) {
      cart[idx].quantity += 1;
    } else {
      cart.push({ 
        name: identifier,
        price: parseFloat(product.price),
        image: product.image,
        quantity: 1
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${identifier} added to cart!`);
  });


  function getRandomRelated(products, excludeIdentifier, count = 4) {
    const filtered = products.filter(p => (p.name || p.brand) !== excludeIdentifier);
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const relatedContainer = document.getElementById("related-items");
  relatedContainer.innerHTML = "";  

  const currentIdentifier = product.name || product.brand || "";
  const relatedItems = getRandomRelated(allProducts, currentIdentifier, 4);

  relatedItems.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-md-3";

    const itemName = p.name || p.brand || "Unnamed Product";

    col.innerHTML = `
      <div class="card h-100">
        <img src="${p.image || "placeholder.jpg"}" class="card-img-top" alt="${itemName}">
        <div class="card-body text-center">
          <h6>${itemName}</h6>
          <p class="text-danger fw-bold">$${parseFloat(p.price).toFixed(2)}</p>
          <div class="rating mb-2"></div>
          <button class="btn btn-sm btn-danger add-related-to-cart">Add to Cart</button>
        </div>
      </div>
    `;

    renderStars(col.querySelector(".rating"), p.rating || 0);


    col.querySelector(".card").addEventListener("click", (e) => {
      if (e.target.classList.contains("add-related-to-cart")) return;
      localStorage.setItem("selectedProduct", JSON.stringify(p));
      window.location.reload();
    });


    col.querySelector(".add-related-to-cart").addEventListener("click", (e) => {
      e.stopPropagation();
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const id = p.name || p.brand || "";
      const idx = cart.findIndex(item => item.name === id);
      if (idx > -1) {
        cart[idx].quantity += 1;
      } else {
        cart.push({ 
          name: id,
          price: parseFloat(p.price),
          image: p.image,
          quantity: 1
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${id} added to cart!`);
    });

    relatedContainer.appendChild(col);
  });
});
