const StoreApi = {
  headers() {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
  async request(path, options = {}) {
    const response = await fetch(path, {
      ...options,
      headers: { ...(options.skipAuth ? {} : this.headers()), ...(options.headers || {}) }
    });
    if (!response.ok) throw new Error((await response.text()) || 'Request failed');
    if (response.status === 204) return null;
    const type = response.headers.get('content-type') || '';
    return type.includes('application/json') ? response.json() : response.text();
  },
  productFromApi(product) {
    return {
      id: product.id, name: product.title, brand: product.title, model: '', author: product.author,
      category: product.category || product.author || 'Uncategorized', description: product.description || '',
      price: product.price, rating: product.rating || 0, image: product.image || 'placeholder.jpg'
    };
  },
  productPayload(product) {
    return {
      title: product.brand || product.name,
      author: product.category || 'General', price: Number(product.price),
      category: product.category, description: product.description, image: product.image,
      rating: Number(product.rating) || 0
    };
  },
  async products() {
    const page = await this.request('/api/products?size=100');
    return page.content.map(this.productFromApi);
  },
  createProduct(product) { return this.request('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.productPayload(product)) }); },
  updateProduct(id, product) { return this.request(`/api/products/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.productPayload(product)) }); },
  deleteProduct(id) { return this.request(`/api/products/${id}`, { method: 'DELETE' }); }
};
