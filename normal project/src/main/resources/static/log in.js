async function onLogin(event) {
  event.preventDefault();
  try {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    localStorage.removeItem('authToken');
    const token = await StoreApi.request('/api/auth/login', { method: 'POST', skipAuth: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
    localStorage.setItem('authToken', token);
    const profile = JSON.parse(localStorage.getItem(`profile_${username}`)) || { username };
    localStorage.setItem('currentUser', JSON.stringify(profile));
    localStorage.setItem('username', username);
    window.location.href = 'home.html';
  } catch (error) { alert(error.message); }
}

document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const usernameDisplay = document.getElementById('usernameDisplay');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  if (user && usernameDisplay) { usernameDisplay.textContent = user.username; if (loginBtn) loginBtn.style.display = 'none'; if (logoutBtn) logoutBtn.style.display = 'inline-block'; }
  if (logoutBtn) logoutBtn.addEventListener('click', () => { localStorage.removeItem('currentUser'); localStorage.removeItem('authToken'); localStorage.removeItem('username'); window.location.reload(); });
});
