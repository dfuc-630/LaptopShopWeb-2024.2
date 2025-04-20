// src/components/Header.jsx
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import { Button, NavDropdown } from 'react-bootstrap'; // Import Dropdown
import './Header.css'; // Import custom CSS for the header

function Header() {
  const { getCartItemCount } = useCart();
  const { isAuthenticated, user, logout, openLoginModal, isLoading } = useAuth(); // Lấy state và hàm từ AuthContext
  const totalItems = getCartItemCount();
  const navigate = useNavigate();

  // Xử lý khi nhấn vào link cần đăng nhập
  const handleProtectedLinkClick = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault(); // Ngăn chặn chuyển trang mặc định
      openLoginModal();   // Mở modal đăng nhập
    } else {
      navigate(path); // Nếu đã đăng nhập thì chuyển trang bình thường
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Chuyển về trang chủ sau khi logout
  }

  return (
    <header className="header bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-lg sticky-top">
      <div className="container py-3"> {/* Added some padding */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent"> {/* Make navbar transparent */}
          <Link to="/" className="navbar-brand fw-bold fs-4 text-shadow-md logo">
            <i className="bi bi-laptop me-2 text-yellow-500 animate-pulse"></i> HustLaptop <span className="text-sm italic text-gray-200 version">v2.1</span>
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
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav"> {/* Align items to the end */}
            {/* Search bar */}
            <div className="mx-auto my-2 my-lg-0 search-bar"> {/* Reduced width slightly */}
              <div className="input-group rounded-pill bg-white shadow-sm"> {/* Rounded search bar with shadow */}
                <input
                  type="text"
                  className="form-control border-0 shadow-none rounded-pill"
                  placeholder="Tìm kiếm laptop..."
                  aria-label="Tìm kiếm sản phẩm"
                />
                <button className="btn btn-primary rounded-pill search-button" type="button"> {/* Colorful search button */}
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>

            {/* Nav items */}
            <ul className="navbar-nav ms-lg-3 align-items-center navigation"> {/* Added some margin for spacing */}
              <li className="nav-item me-3">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? 'nav-link active home-link' : 'nav-link text-white hover-effect'
                  }
                >
                  <i className="bi bi-house-door me-1 text-lg align-middle"></i> <span className="align-middle">Trang chủ</span>
                </NavLink>
              </li>

              {/* Giỏ hàng - Check Auth */}
              <li className="nav-item me-3 cart-item">
                <Link
                  to="/cart"
                  onClick={(e) => handleProtectedLinkClick(e, '/cart')} // Xử lý click
                  className="nav-link text-white hover-effect position-relative" // Keep position relative
                >
                  <i className="bi bi-cart me-1 text-lg align-middle"></i> <span className="align-middle">Giỏ hàng</span>
                  {totalItems > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill cart-badge"
                      style={{ fontSize: '0.7rem' }}
                    >
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>

              {/* Tài khoản / Đăng nhập */}
              {isLoading ? (
                <li className="nav-item"><span className="nav-link text-white loading-text">Đang tải...</span></li> 
              ) : isAuthenticated ? (
                // Nếu đã đăng nhập -- Hiển thị Dropdown Tài khoản
                <NavDropdown
                  title={
                    <>
                      <i className="bi bi-person-circle me-1 text-xl align-middle user-icon"></i>
                      <span className="align-middle user-name">{user?.name || 'Tài khoản'}</span> {/* More prominent username */}
                    </>
                  }
                  id="basic-nav-dropdown"
                  menuVariant="dark" // Keep dark menu
                  align="end" // Keep right alignment
                  className="me-2 user-dropdown" // Add a class for styling
                >
                  <NavDropdown.Item as={Link} to="/account" className="dropdown-item-custom">
                    <i className="bi bi-person-gear me-2"></i> Thông tin tài khoản
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/orders" className="dropdown-item-custom">
                    <i className="bi bi-list-ul me-2"></i> Đơn hàng của tôi
                  </NavDropdown.Item>
                  <NavDropdown.Divider className="dropdown-divider-custom" /> {/* Subtle divider */}
                  <NavDropdown.Item onClick={handleLogout} className="dropdown-item-logout">
                    <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                // Nếu chưa đăng nhập -- Hiển thị nút mở Modal
                <li className="nav-item">
                  <Button
                    variant="link"
                    className="nav-link text-white login-button"
                    onClick={openLoginModal} // Mở modal khi click
                  >
                    <i className="bi bi-person me-1 text-lg align-middle"></i> <span className="align-middle">Đăng nhập</span>
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
