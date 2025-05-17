import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import './ProductCard.css'; // Import custom CSS

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
  
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  if (!product) {
    return null;
  }

  // Extract specs from product if available
  const specs = product.specs || {};
  const hasSpecs = Object.keys(specs).length > 0;

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4 product-card-wrapper">
      <div className="card h-100 shadow-sm product-card">
        <Link to={`/product/${product.id}`} className="text-decoration-none text-dark product-link" onClick={handleClick}>
          <div className="d-flex product-content">
            {/* Image on the left */}
            <div className="image-container">
              <img
                src={product.images ? product.images[0] : (product.image || 'https://via.placeholder.com/300x200?text=No+Image')}
                alt={product.name}
                className="card-img-top product-image"
                style={{ objectFit: 'contain', padding: '10px' }}
              />
            </div>
            
            {/* Specs on the right */}
            {hasSpecs && (
              <div className="specs-container p-2">
                <ul className="specs-list">
                  {specs.CPU && <li><small><i className="bi bi-cpu"></i> {specs.CPU}</small></li>}
                  {specs.RAM && <li><small><i className="bi bi-memory"></i> {specs.RAM}</small></li>}
                  {specs.ROM && <li><small><i className="bi bi-device-hdd"></i> {specs.ROM}</small></li>}
                  {specs.Screen && <li><small><i className="bi bi-display"></i> {specs.Screen}</small></li>}
                  {specs.GPU && <li><small><i className="bi bi-gpu-card"></i> {specs.GPU}</small></li>}
                </ul>
              </div>
            )}
          </div>

          {/* Product name below both image and specs */}
          <div className="card-body d-flex flex-column pt-2">
            <h6 className="card-title product-title flex-grow-1">
              {product.name}
            </h6>
            <p className="card-text product-price text-danger fw-bold mb-2">
              {formatCurrency(product.price)}
            </p>
            <div className="mt-auto d-flex justify-content-between align-items-center product-actions">
              <Link to={`/product/${product.id}`} className="btn btn-outline-primary btn-sm details-button" onClick={handleClick}>
                <i className="bi bi-info-circle me-1"></i> Chi tiết
              </Link>
              <button
                className="btn btn-danger btn-sm add-to-cart-button"
                onClick={handleAddToCart}
              >
                <i className="bi bi-cart-plus me-1"></i> Thêm
              </button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;