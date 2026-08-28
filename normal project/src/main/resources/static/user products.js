document.addEventListener('DOMContentLoaded', async () => {
  const body = document.getElementById('productTableBody');
  const empty = document.getElementById('noProductsMessage');
  if (!localStorage.getItem('authToken')) { empty.style.display = 'block'; return; }
  try {
    const products = await StoreApi.products();
    empty.style.display = products.length ? 'none' : 'block';
    products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${product.brand}</td><td>${product.category}</td><td><img src="${product.image}" alt="Product Image" style="height: 60px;"></td><td>$${Number(product.price).toFixed(2)}</td><td><div class="stars">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</div></td><td><button class="btn btn-sm btn-warning me-2 edit-btn">Edit</button><button class="btn btn-sm btn-danger delete-btn">Delete</button></td>`;
      row.querySelector('.edit-btn').addEventListener('click', () => { localStorage.setItem('editingProduct', JSON.stringify(product)); window.location.href = 'edit product.html'; });
      row.querySelector('.delete-btn').addEventListener('click', async () => { if (!confirm('Delete this product?')) return; await StoreApi.deleteProduct(product.id); row.remove(); });
      body.appendChild(row);
    });
  } catch (error) { alert(error.message); }
});
