// src/components/VeChungToi/GioiThieuSection.jsx
import React from 'react';
import './GioiThieuSection.css'; // Import CSS cho section này

function GioiThieuSection() {
  return (
    <section className="gioi-thieu-section">
      <h2>Giới thiệu về HustLaptop</h2>
      <p>Chào mừng đến với HustLaptop! Chúng tôi là một đội ngũ đam mê công nghệ...</p>
      {/* Thêm nội dung chi tiết về công ty, lịch sử, tầm nhìn, sứ mệnh, đội ngũ,... */}
      <ul>
        <li>Tầm nhìn: ...</li>
        <li>Sứ mệnh: ...</li>
        <li>Giá trị cốt lõi: ...</li>
      </ul>
      {/* Bạn có thể thêm hình ảnh, video,... */}
    </section>
  );
}

export default GioiThieuSection;