// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { products } = useCart();
  const totalItems = products.reduce((sum, product) => sum + (product.quantity || 1), 0);

  return (
    <header className="bg-danger text-white">
      <div className="container">
        <div className="row align-items-center py-2">
          {/* Logo */}
          <div className="col-md-2">
            <Link to="/" className="text-white text-decoration-none">
              <h3 className="mb-0">AE Rọt Shop</h3>
            </Link>
          </div>

          {/* Thanh tìm kiếm */}
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm sản phẩm..."
                aria-label="Tìm kiếm sản phẩm"
              />
              <button className="btn btn-light" type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>

          {/* Các icon chức năng */}
          <div className="col-md-4 d-flex justify-content-end align-items-center">
            <div className="dropdown me-3">
              <button
                className="btn btn-danger text-white dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Danh mục
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><Link className="dropdown-item" to="/category/laptop">Laptop</Link></li>
                <li><Link className="dropdown-item" to="/category/apple">Apple</Link></li>
                <li><Link className="dropdown-item" to="/category/samsung">Samsung</Link></li>
              </ul>
            </div>

            <Link to="/" className="text-white me-3">
              <i className="bi bi-house-door"></i> Trang chủ
            </Link>

            <Link to="/cart" className="text-white me-3 position-relative">
              <i className="bi bi-cart"></i> Giỏ hàng
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link to="/account" className="text-white">
              <i className="bi bi-person"></i> Tài khoản
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;