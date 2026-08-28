async function onCreateAccount(event) {
  event.preventDefault();
  try {
    const profile = {
      firstName: document.getElementById('name').value.trim(),
      lastName: document.getElementById('surname').value.trim(),
      email: document.getElementById('email').value.trim(),
      username: document.getElementById('username').value.trim(),
      password: document.getElementById('password').value
    };
    await StoreApi.request('/api/auth/register', { method: 'POST', skipAuth: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile) });
    localStorage.setItem(`profile_${profile.username}`, JSON.stringify({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      username: profile.username
    }));
    alert('The account has been successfully created! Now log in.');
    window.location.href = 'log in.html';
  } catch (error) { alert(error.message); }
}
