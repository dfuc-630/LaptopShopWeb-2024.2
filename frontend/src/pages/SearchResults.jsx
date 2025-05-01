// src/components/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchProductsByName } from '../services/productService';
import ProductCard from '../components/ProductCard'; 

function SearchResults() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Lấy từ khóa từ query parameter
  const query = new URLSearchParams(location.search).get('name');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setError('Vui lòng nhập từ khóa tìm kiếm.');
        setLoading(false);
        return;
      }

      try {
        const data = await searchProductsByName(query);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải kết quả tìm kiếm. Vui lòng thử lại.');
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container my-4">
      <h2>Kết quả tìm kiếm cho: "{query}"</h2>
      {products.length === 0 ? (
        <p>Không tìm thấy sản phẩm nào.</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;