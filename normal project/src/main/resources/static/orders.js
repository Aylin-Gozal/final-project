function renderOrders() {
  const ordersContainer = document.getElementById("orders-container");
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    ordersContainer.innerHTML = "<p>No orders placed yet.</p>";
    return;
  }

  const reversedOrders = orders.slice().reverse();
  ordersContainer.innerHTML = "";

  reversedOrders.forEach(order => {
    const orderDiv = document.createElement("div");
    orderDiv.classList.add("order", "mb-4", "p-3", "border", "rounded", "position-relative");

    let orderHTML = `
      <h4>Order ID: ${order.id}</h4>
      <p><strong>Date:</strong> ${order.date}</p>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
    `;

    let orderTotal = 0;

    order.items.forEach(item => {
      const priceNum = parseFloat(item.price) || 0;
      const totalItemPrice = priceNum * item.quantity;
      orderTotal += totalItemPrice;

      orderHTML += `
        <tr>
          <td><img src="${item.image}" alt="${item.name}" style="max-width: 60px;"></td>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>$${totalItemPrice.toFixed(2)}</td>
        </tr>
      `;
    });

    orderHTML += `
        </tbody>
      </table>

      <div class="text-end mt-3">
        <strong>Total: $${orderTotal.toFixed(2)}</strong>
      </div>
    `;

    orderDiv.innerHTML = orderHTML;
    ordersContainer.appendChild(orderDiv);
  });
}

document.addEventListener("DOMContentLoaded", renderOrders);













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