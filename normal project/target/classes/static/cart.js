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








  function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartBody = document.getElementById("cart-body");
  const grandTotal = document.getElementById("grand-total");
  const totalPriceSpan = document.getElementById("totalPrice");
  const cartTable = document.getElementById("cart-table");
  const emptyCartMessage = document.getElementById("empty-cart-message");
  const checkoutBtn = document.getElementById("checkout-btn");

  cartBody.innerHTML = "";

  if (cart.length === 0) {
    cartTable.style.display = "none";
    grandTotal.style.display = "none";
    checkoutBtn.style.display = "none";
    emptyCartMessage.style.display = "block";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
   
    const priceNum = parseFloat(item.price) || 0;
    const itemTotal = priceNum * item.quantity;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.image}" style="max-width: 50px;"> ${item.name}</td>
      <td>$${priceNum.toFixed(2)}</td>
      <td>
        <button class="btn btn-outline-secondary btn-sm me-2" onclick="updateQuantity(${index}, -1)">−</button>
        ${item.quantity}
        <button class="btn btn-outline-secondary btn-sm ms-2" onclick="updateQuantity(${index}, 1)">+</button>
      </td>
      <td>$${itemTotal.toFixed(2)}</td>
      <td><button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remove</button></td>
    `;
    cartBody.appendChild(row);
  });

  cartTable.style.display = "table";
  grandTotal.style.display = "block";
  checkoutBtn.style.display = "inline-block";
  emptyCartMessage.style.display = "none";
  totalPriceSpan.textContent = total.toFixed(2);
}

function updateQuantity(index, change) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);   





