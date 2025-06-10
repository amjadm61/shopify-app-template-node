import React, { useState, useEffect } from 'react';

function ProductTable({ products }) {
  return (
    <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>SKU</th>
          <th>Status</th>
          <th>Qty</th>
          <th>Sales Channels</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.title}</td>
            <td>{p.sku}</td>
            <td>{p.inStock ? 'In Stock' : 'OOS'}</td>
            <td>{p.quantity}</td>
            <td>{p.salesChannels.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);

  async function fetchProducts(search = '') {
    const res = await fetch(`/api/products${search ? `?search=${encodeURIComponent(search)}` : ''}`);
    if (res.ok) {
      const data = await res.json();
      setProducts(data.products || []);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetchProducts(query);
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Products</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products"
        />
        <button type="submit">Search</button>
      </form>
      <ProductTable products={products} />
    </div>
  );
}
