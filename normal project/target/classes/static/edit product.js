document.addEventListener('DOMContentLoaded', () => {
  const product = JSON.parse(localStorage.getItem('editingProduct'));
  if (!product) { window.location.href = 'user products.html'; return; }
  ['brand', 'category', 'description', 'price', 'rating', 'image'].forEach(field => document.getElementById(field).value = product[field] || '');
  document.getElementById('model').value = product.model || '';
  const preview = document.getElementById('preview'); const previewContainer = document.getElementById('previewContainer');
  preview.src = product.image; previewContainer.style.display = 'block';
  document.getElementById('image').addEventListener('input', event => { preview.src = event.target.value; previewContainer.style.display = event.target.value ? 'block' : 'none'; });
  document.getElementById('editForm').addEventListener('submit', async event => {
    event.preventDefault();
    try {
      await StoreApi.updateProduct(product.id, { brand: document.getElementById('brand').value, model: document.getElementById('model').value, category: document.getElementById('category').value, description: document.getElementById('description').value, price: document.getElementById('price').value, rating: document.getElementById('rating').value, image: document.getElementById('image').value });
      localStorage.removeItem('editingProduct'); alert('Product updated successfully!'); window.location.href = 'user products.html';
    } catch (error) { alert(error.message); }
  });
});
