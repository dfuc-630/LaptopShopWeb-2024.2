import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="col-md-3 mb-3">
      <div className="card h-100">
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{ height: '150px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h6 className="card-title">{product.name}</h6>
          <p className="card-text text-danger">{product.price}</p>
          <Link to={`/product/${product.id}`} className="btn btn-outline-primary btn-sm">
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;