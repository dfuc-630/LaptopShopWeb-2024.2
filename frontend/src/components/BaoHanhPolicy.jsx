// src/components/ChinhSach/BaoHanhPolicy.jsx
import React from 'react';
import './BaoHanhPolicy.css';

function BaoHanhPolicy() {
  return (
    <div className="bao-hanh-policy">
      <h2>Chính Sách Bảo Hành</h2>
      <p>Thời gian bảo hành cho các sản phẩm laptop là...</p>
      {/* Thêm nội dung chi tiết về chính sách bảo hành */}
      <ul>
        <li>Điều kiện bảo hành</li>
        <li>Quy trình bảo hành</li>
        <li>Các trường hợp không được bảo hành</li>
      </ul>
    </div>
  );
}

export default BaoHanhPolicy;