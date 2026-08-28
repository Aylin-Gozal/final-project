document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('productForm');
  const image = document.getElementById('image');
  const preview = document.getElementById('preview');
  const previewContainer = document.getElementById('previewContainer');
  image.addEventListener('input', () => { preview.src = image.value.trim(); previewContainer.style.display = image.value.trim() ? 'block' : 'none'; });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!localStorage.getItem('authToken')) return alert('Please log in first.');
    try {
      await StoreApi.createProduct({ brand: document.getElementById('brand').value, model: document.getElementById('model').value, category: document.getElementById('category').value, description: document.getElementById('description').value, price: document.getElementById('price').value, rating: document.getElementById('rating').value, image: image.value });
      alert('Product saved!'); window.location.href = 'user products.html';
    } catch (error) { alert(error.message); }
  });
});
