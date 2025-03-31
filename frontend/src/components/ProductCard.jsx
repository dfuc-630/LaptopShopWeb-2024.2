// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatters';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product) {
      addToCart(product, 1);
      console.log(`Đã thêm ${product.name} vào giỏ`);
    }
  };

  if (!product) {
    return null;
  }

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card h-100 shadow-sm">
         <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
            {/* ... phần img và card-body ... */}
            <img
              src={product.images ? product.images[0] : (product.image || 'https://via.placeholder.com/300x200?text=No+Image')}
              alt={product.name}
              className="card-img-top"
              style={{ height: '200px', objectFit: 'contain', paddingTop: '10px' }}
            />
            <div className="card-body d-flex flex-column">
              <h6 className="card-title flex-grow-1" style={{ fontSize: '0.9rem' }}>
                 {product.name}
              </h6>
              <p className="card-text text-danger fw-bold mb-2">
                {formatCurrency(product.price)}
              </p>
              <div className="mt-auto d-flex justify-content-between align-items-center">
                 <Link to={`/product/${product.id}`} className="btn btn-outline-primary btn-sm">
                    Chi tiết
                 </Link>
                 <button
                    className="btn btn-danger btn-sm"
                    onClick={handleAddToCart}
                 >
                   <i className="bi bi-cart-plus"></i> Thêm
                 </button>
              </div>
            </div>
         </Link>
      </div>
    </div>
  );

}

export default ProductCard;