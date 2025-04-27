// src/pages/ChinhSachPage.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './ChinhSachPage.css';

function ChinhSachPage() {
  return (
    <div className="chinh-sach-container">
      <h1 className="page-title">Chính Sách</h1>
      <ul className="chinh-sach-menu">
        <li><Link to="/chinh-sach/bao-hanh">Bảo hành</Link></li>
        <li><Link to="/chinh-sach/doi-tra">Đổi trả</Link></li>
        <li><Link to="/chinh-sach/bao-mat">Bảo mật</Link></li>
        <li><Link to="/chinh-sach/mua-hang">Mua hàng</Link></li>
      </ul>

      <div className="chinh-sach-content">
        <Outlet /> {/* Nơi các component con sẽ được hiển thị */}
      </div>
    </div>
  );
}

export default ChinhSachPage;