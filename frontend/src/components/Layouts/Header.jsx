// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Button, NavDropdown } from 'react-bootstrap';

function Header() {
  const { getCartItemCount } = useCart();
  const { isAuthenticated, user, logout, openLoginModal, isLoading } = useAuth();
  const totalItems = getCartItemCount();
  const navigate = useNavigate();

  // State để lưu từ khóa tìm kiếm
  const [searchQuery, setSearchQuery] = useState('');

  // Xử lý khi nhấn vào link cần đăng nhập
  const handleProtectedLinkClick = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      openLoginModal();
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Chuyển hướng tới trang kết quả tìm kiếm với từ khóa
      navigate(`/search?name=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Xóa input sau khi tìm kiếm
    }
  };

  // Xử lý nhấn Enter trong input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <header className="bg-danger text-white shadow-sm sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link to="/" className="navbar-brand fw-bold fs-4">
            AE Rọt Shop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Search bar */}
            <div className="mx-auto my-2 my-lg-0" style={{ width: '50%' }}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm laptop..."
                  aria-label="Tìm kiếm sản phẩm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress} // Xử lý nhấn Enter
                />
                <button className="btn btn-light" type="button" onClick={handleSearch}>
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>

            {/* Nav items */}
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item me-3">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? 'nav-link active text-warning' : 'nav-link text-white'
                  }
                >
                  <i className="bi bi-house-door me-1"></i> Trang chủ
                </NavLink>
              </li>

              {/* Giỏ hàng - Check Auth */}
              <li className="nav-item me-3">
                <Link
                  to="/cart"
                  onClick={(e) => handleProtectedLinkClick(e, '/cart')}
                  className="nav-link text-white position-relative"
                >
                  <i className="bi bi-cart me-1"></i> Giỏ hàng
                  {totalItems > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
                      style={{ fontSize: '0.65rem' }}
                    >
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>

              {/* Tài khoản / Đăng nhập */}
              {isLoading ? (
                <li className="nav-item">
                  <span className="nav-link text-white">...</span>
                </li>
              ) : isAuthenticated ? (
                <NavDropdown
                  title={
                    <>
                      <i className="bi bi-person-circle me-1"></i>
                      {user?.name || 'Tài khoản'}
                    </>
                  }
                  id="basic-nav-dropdown"
                  menuVariant="dark"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/account">
                    Thông tin tài khoản
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/orders">
                    Đơn hàng của tôi
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <li className="nav-item">
                  <Button
                    variant="link"
                    className="nav-link text-white"
                    onClick={openLoginModal}
                  >
                    <i className="bi bi-person me-1"></i> Tài khoản
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;