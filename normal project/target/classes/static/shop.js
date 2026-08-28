document.addEventListener('DOMContentLoaded', async () => {
  const defaults = [
    { name:'Hanes Hanes Cotton T-Shirt', category:'Clothing', price:19.99, rating:3, image:'shop images/Hanes t-shirt.jpg', description:'Comfortable cotton T-shirt perfect for everyday wear.' },
    { name:'Nike Nike Running Shoes', category:'Footwear', price:89.99, rating:4, image:'shop images/Nike running shoes.avif', description:'Lightweight running shoes designed for performance.' },
    { name:'Samsonite Samsonite Backpack', category:'Accessories', price:79.99, rating:2, image:'shop images/Samsonite blue backpack.jpg', description:'Durable backpack with multiple compartments.' },
    { name:'Apple Apple iPad Pro', category:'Tablets', price:899.99, rating:5, image:'shop images/Apple ipad pro.jpg', description:'High performance tablet with stunning display.' }
  ];
  let products = [...defaults];
  if (localStorage.getItem('authToken')) { try { products = [...defaults, ...await StoreApi.products()]; } catch (_) {} }
  const list = document.getElementById('productList');
  function render(items) {
    list.innerHTML = '';
    items.forEach(product => {
      const col = document.createElement('div'); col.className = 'col-md-3 mb-4';
      col.innerHTML = `<div class="card text-center h-100"><img src="${product.image}" alt="${product.name}" class="card-img-top" style="height:150px;object-fit:contain;background:#f9f9f9;"><div class="card-body"><h6>${product.name}</h6><p class="text-muted small">${product.category}</p><p class="text-danger">${Number(product.price).toFixed(2)}$</p><div>${'★'.repeat(product.rating)}${'☆'.repeat(5-product.rating)}</div><button class="btn btn-dark btn-sm mt-2 add-to-cart">Add to Cart</button></div></div>`;
      col.querySelector('.card').addEventListener('click', event => { if (event.target.classList.contains('add-to-cart')) return; localStorage.setItem('selectedProduct', JSON.stringify(product)); window.location.href = 'product.html'; });
      col.querySelector('.add-to-cart').addEventListener('click', () => {
        if (!localStorage.getItem('authToken')) return alert('Please log in to add products to your cart.');
        const cart = JSON.parse(localStorage.getItem('cart')) || []; const existing = cart.find(item => item.name === product.name);
        if (existing) existing.quantity++; else cart.push({ name:product.name, price:product.price, image:product.image, quantity:1 });
        localStorage.setItem('cart', JSON.stringify(cart)); alert(`${product.name} added to cart!`);
      }); list.appendChild(col);
    });
  }
  render(products);
  const search = document.getElementById('searchInputSidebar'); if (search) search.addEventListener('input', e => render(products.filter(p => p.name.toLowerCase().includes(e.target.value.toLowerCase()))));
  const sort = document.getElementById('sortSelect'); if (sort) sort.addEventListener('change', e => render([...products].sort((a,b) => e.target.value === 'low-high' ? a.price-b.price : e.target.value === 'high-low' ? b.price-a.price : 0)));
});
