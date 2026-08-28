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
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    window.location.reload(); 
  });
});

      




document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const usernameNavbar = document.getElementById('usernameDisplay');
    const usernameCard = document.getElementById('usernameCardDisplay');
    const nameDisplay = document.getElementById('nameDisplay');
    const surnameDisplay = document.getElementById('surnameDisplay');
    const emailDisplay = document.getElementById('emailDisplay');
    const myProductsBtn = document.getElementById('myProductsBtn');


    if (currentUser) {
        usernameNavbar.textContent = currentUser.username || '';
        usernameCard.textContent = currentUser.username || 'Not available';
        nameDisplay.textContent = currentUser.firstName || 'Not available';
        surnameDisplay.textContent = currentUser.lastName || 'Not available';
        emailDisplay.textContent = currentUser.email || 'Not available';


        myProductsBtn.href = 'user products.html';  
    } else {

      usernameNavbar.textContent = '';
        usernameCard.textContent = 'User not logged in';
        nameDisplay.textContent = 'Not available';
        surnameDisplay.textContent = 'Not available';
        emailDisplay.textContent = 'Not available';


        myProductsBtn.addEventListener('click', (event) => {
            event.preventDefault(); 
            alert('Please log in to access your products for sale!');
        });
    }
});
