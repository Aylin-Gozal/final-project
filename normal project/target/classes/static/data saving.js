document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const usernameDisplay = document.getElementById("usernameDisplay");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (currentUser) {
    const username = currentUser.username;

    
    if (usernameDisplay) usernameDisplay.textContent = username;
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";


    const savedOrders = localStorage.getItem(`userOrders_${username}`);
    const savedProducts = localStorage.getItem(`userProducts_${username}`);
    const savedCart = localStorage.getItem(`cart_${username}`);

    if (savedOrders) localStorage.setItem("orders", savedOrders);
    if (savedProducts) localStorage.setItem("products", savedProducts);
    if (savedCart) localStorage.setItem("cart", savedCart);
  } else {
    if (logoutBtn) logoutBtn.style.display = "none";
    if (loginBtn) loginBtn.style.display = "inline-block";
  }

 

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        const username = currentUser.username;

        
        const orders = localStorage.getItem("orders");
        const products = localStorage.getItem("products");
        const cart = localStorage.getItem("cart");

        if (orders) localStorage.setItem(`userOrders_${username}`, orders);
        if (products) localStorage.setItem(`userProducts_${username}`, products);
        if (cart) localStorage.setItem(`cart_${username}`, cart);
      }

      
      localStorage.removeItem("orders");
      localStorage.removeItem("products");
      localStorage.removeItem("cart");
      localStorage.removeItem("currentUser");

      window.location.reload();
    });
  }
});





function clearUserDataOnLogout() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || !currentUser.username) return;

  const username = currentUser.username;

  
  localStorage.removeItem(`userProducts_${username}`);
  localStorage.removeItem(`orders_${username}`);
  localStorage.removeItem("cart");

  localStorage.removeItem("products");
}


function restoreUserDataOnLogin() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || !currentUser.username) return;

  const username = currentUser.username;
  const savedData = JSON.parse(localStorage.getItem(`sessionData_${username}`));
  if (!savedData) return;

  
  localStorage.setItem(`userProducts_${username}`, JSON.stringify(savedData.products || []));
  localStorage.setItem(`orders_${username}`, JSON.stringify(savedData.orders || []));
  localStorage.setItem("cart", JSON.stringify(savedData.cart || []));

  
  if (savedData.products && savedData.products.length > 0) {
    localStorage.setItem("products", JSON.stringify(savedData.products));
  } else {
    localStorage.removeItem("products");
  }
}


function saveSessionDataBeforeLogout() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || !currentUser.username) return;

  const username = currentUser.username;

  const userOrders = JSON.parse(localStorage.getItem(`orders_${username}`)) || [];
  const userProducts = JSON.parse(localStorage.getItem(`userProducts_${username}`)) || [];
  const userCart = JSON.parse(localStorage.getItem("cart")) || [];

  localStorage.setItem(`sessionData_${username}`, JSON.stringify({
    orders: userOrders,
    products: userProducts,
    cart: userCart
  }));
}


window.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      saveSessionDataBeforeLogout();
      clearUserDataOnLogout();
      localStorage.removeItem("currentUser");
      localStorage.removeItem("username");
      window.location.reload();
    });
  }

  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    restoreUserDataOnLogin();
  }
});

