async function onLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  try { const data=await StoreApi.request('/api/auth/login',{method:'POST',publicRequest:true,headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})}); StoreApi.saveAuth(data); location.href='home.html'; }
  catch(error){ alert(error.message); }
}
