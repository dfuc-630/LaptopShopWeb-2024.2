// src/components/VeChungToi/TuyenDungSection.jsx
import React from 'react';
import './TuyenDungSection.css'; // Import CSS cho section này

function TuyenDungSection() {
  return (
    <section className="tuyen-dung-section">
      <h2>Cơ hội nghề nghiệp tại HustLaptop</h2>
      <p>Chúng tôi luôn tìm kiếm những tài năng gia nhập đội ngũ...</p>
      {/* Liệt kê các vị trí tuyển dụng hiện tại */}
      <ul>
        <li>
          <h3>Nhân viên Kinh doanh</h3>
          <p>Mô tả công việc: ...</p>
          <button>Ứng tuyển ngay</button>
        </li>
        <li>
          <h3>Kỹ thuật viên Phần cứng</h3>
          <p>Mô tả công việc: ...</p>
          <button>Ứng tuyển ngay</button>
        </li>
        {/* Thêm các vị trí khác */}
      </ul>
      {/* Thông tin về quy trình ứng tuyển, văn hóa công ty, lợi ích,... */}
    </section>
  );
}

export default TuyenDungSection;