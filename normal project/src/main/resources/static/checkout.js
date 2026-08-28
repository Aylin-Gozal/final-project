function calculateCheckoutTotals() {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    let subtotal = 0;

    for (const key in cart) {
        const item = cart[key];
        subtotal += item.price * item.quantity;
    }

    let shipping = 0;
    if (subtotal > 200) {
        shipping = 0;
    } else if (subtotal === 0) {
        shipping = 0;
    } else {
        shipping = 15;
    }

    let total = subtotal + shipping;

    
    document.getElementById("subtotal").textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    document.getElementById("shipping").textContent = `Shipping: $${shipping.toFixed(2)}`;
    document.getElementById("total").textContent = `Total: $${total.toFixed(2)}`;
}

window.onload = calculateCheckoutTotals;

function placeOrder() {


  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

 
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  
  const order = {
    id: Date.now(), 
    date: new Date().toLocaleString(),
    items: cart
  };

  
  orders.push(order);

 
  localStorage.setItem("orders", JSON.stringify(orders));

  
  localStorage.removeItem("cart");

  alert("Order placed successfully!");

  
  window.location.href = "orders.html";








    
    const subtotal = document.getElementById("subtotal");
    const shipping = document.getElementById("shipping");
    const total = document.getElementById("total");

    if (subtotal) subtotal.style.display = "none";
    if (shipping) shipping.style.display = "none";
    if (total) total.style.display = "none";

    
    alert("Thank you for your purchase!");

    
    localStorage.removeItem("cart");

    
    setTimeout(function () {
        window.location.href = "home.html"; 
    },);
}

  

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
