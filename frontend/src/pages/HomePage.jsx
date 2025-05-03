// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';
import ProductCard from '../components/ProductCard/ProductCard';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  

  if (loading) {
    return <div className="container my-4">Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div className="container my-4 text-danger">{error}</div>;
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">Danh sách sản phẩm</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Không có sản phẩm nào để hiển thị</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;