// src/components/Header.jsx
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import { Button, NavDropdown } from 'react-bootstrap'; // Import Dropdown

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
    <header className="bg-danger text-white shadow-sm sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link to="/" className="navbar-brand fw-bold fs-4">
            AE Rọt Shop
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Search bar */}
            <div className="mx-auto my-2 my-lg-0" style={{ width: '50%' }}>
              {/* ... (search bar code) ... */}
            </div>

            {/* Nav items */}
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item me-3">
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active text-warning" : "nav-link text-white"}>
                  <i className="bi bi-house-door me-1"></i> Trang chủ
                </NavLink>
              </li>

              {/* Giỏ hàng - Check Auth */}
              <li className="nav-item me-3">
                 <Link
                    to="/cart"
                    onClick={(e) => handleProtectedLinkClick(e, '/cart')} // Xử lý click
                    className="nav-link text-white position-relative" // Giữ style như NavLink
                 >
                    <i className="bi bi-cart me-1"></i> Giỏ hàng
                    {totalItems > 0 && (
                       <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark" style={{ fontSize: '0.65rem' }}>
                          {totalItems}
                       </span>
                    )}
                 </Link>
              </li>

              {/* Tài khoản / Đăng nhập */}
              {isLoading ? (
                 <li className="nav-item"><span className="nav-link text-white">...</span></li> // Hiển thị loading nếu đang check auth
              ) : isAuthenticated ? (
                // Nếu đã đăng nhập -> Hiển thị Dropdown Tài khoản
                <NavDropdown
                   title={
                      <>
                         <i className="bi bi-person-circle me-1"></i>
                         {user?.name || 'Tài khoản'} {/* Hiển thị tên user */}
                      </>
                   }
                   id="basic-nav-dropdown"
                   menuVariant="dark" // Style dropdown tối màu
                   align="end" // Căn phải
                >
                   <NavDropdown.Item as={Link} to="/account">Thông tin tài khoản</NavDropdown.Item>
                   <NavDropdown.Item as={Link} to="/orders">Đơn hàng của tôi</NavDropdown.Item>
                   <NavDropdown.Divider />
                   <NavDropdown.Item onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                   </NavDropdown.Item>
                </NavDropdown>
              ) : (
                // Nếu chưa đăng nhập -> Hiển thị nút mở Modal
                <li className="nav-item">
                   <Button
                      variant="link"
                      className="nav-link text-white"
                      onClick={openLoginModal} // Mở modal khi click
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