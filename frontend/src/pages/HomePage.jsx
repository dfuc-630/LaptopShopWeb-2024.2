import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import './HomePage.css'; // Import a CSS file for custom styling

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts(); // Assuming getAllProducts is now async
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container my-8 py-5 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-lg shadow-md text-center">
        <div className="spinner-border text-primary m-3" role="status">
          <span className="visually-hidden">Đang tải sản phẩm...</span>
        </div>
        <p className="text-lg text-gray-700">Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-8 py-5 bg-red-100 border border-red-400 rounded-lg shadow-md text-center">
        <p className="text-xl text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-8">
      <div className="bg-gradient-to-r from-green-100 to-yellow-100 py-6 px-8 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          <i className="bi bi-star-fill text-yellow-500 me-2"></i> Khám Phá Những Chiếc Laptop Tuyệt Vời Nhất <i className="bi bi-star-fill text-yellow-500 ms-2"></i>
        </h2>
        <p className="text-gray-700 text-center italic">
          Nâng tầm trải nghiệm công nghệ của bạn với bộ sưu tập laptop đa dạng và chất lượng cao.
        </p>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="col">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5 bg-gray-100 rounded-lg shadow-sm">
            <p className="text-lg text-gray-600"><i className="bi bi-exclamation-triangle-fill text-yellow-500 me-2"></i> Không có sản phẩm nào để hiển thị.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
