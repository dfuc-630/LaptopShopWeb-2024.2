// src/components/Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Sử dụng NavLink để active link
import { useCart } from '../context/CartContext'; // Import useCart

function Header() {
  // Lấy hàm getCartItemCount từ context
  const { getCartItemCount } = useCart();
  const totalItems = getCartItemCount(); // Gọi hàm để lấy số lượng

  return (
    <header className="bg-danger text-white shadow-sm sticky-top"> {/* Thêm sticky-top */}
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark"> {/* Sử dụng Navbar của Bootstrap */}
          {/* Logo */}
          <Link to="/" className="navbar-brand fw-bold fs-4">
            AE Rọt Shop
          </Link>

           {/* Nút bật tắt menu cho mobile */}
           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
           </button>


          {/* Menu */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Thanh tìm kiếm - căn giữa */}
            <div className="mx-auto my-2 my-lg-0" style={{ width: '50%' }}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm laptop..."
                  aria-label="Tìm kiếm sản phẩm"
                />
                <button className="btn btn-light" type="button">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>

             {/* Các icon chức năng - căn phải */}
            <ul className="navbar-nav ms-auto align-items-center">
               {/* Trang chủ */}
               <li className="nav-item me-3">
                 <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? "nav-link active text-warning" : "nav-link text-white"}
                 >
                   <i className="bi bi-house-door me-1"></i> Trang chủ
                 </NavLink>
               </li>

               {/* Dropdown Danh mục */}
               {/* <li className="nav-item dropdown me-3">
                    <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                       <i className="bi bi-grid-3x3-gap me-1"></i> Danh mục
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                       <li><Link className="dropdown-item" to="/category/laptop-gaming">Laptop Gaming</Link></li>
                       <li><Link className="dropdown-item" to="/category/laptop-van-phong">Laptop Văn phòng</Link></li>
                       <li><Link className="dropdown-item" to="/category/macbook">Macbook</Link></li>
                       <li><hr className="dropdown-divider" /></li>
                       <li><Link className="dropdown-item" to="/category/phu-kien">Phụ kiện</Link></li>
                    </ul>
               </li> */}


               {/* Giỏ hàng */}
               <li className="nav-item me-3">
                 <NavLink
                    to="/cart" // Link tới /cart
                    className={({ isActive }) => isActive ? "nav-link active text-warning position-relative" : "nav-link text-white position-relative"}
                 >
                    <i className="bi bi-cart me-1"></i> Giỏ hàng
                    {totalItems > 0 && (
                       <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark" style={{ fontSize: '0.65rem' }}>
                          {totalItems}
                       </span>
                    )}
                 </NavLink>
               </li>

               {/* Tài khoản */}
               <li className="nav-item">
                 <NavLink
                    to="/account" // Link tới trang tài khoản (cần tạo)
                    className={({ isActive }) => isActive ? "nav-link active text-warning" : "nav-link text-white"}
                 >
                   <i className="bi bi-person me-1"></i> Tài khoản
                 </NavLink>
               </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;