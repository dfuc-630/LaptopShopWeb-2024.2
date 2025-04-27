// src/components/VeChungToi/TinTucSection.jsx
import React from 'react';
import './TinTucSection.css'; // Import CSS cho section này

function TinTucSection() {
  const tinTucMoiNhat = [
    { id: 1, title: 'Ra mắt dòng laptop mới siêu mạnh', date: '24/04/2025', excerpt: 'HustLaptop tự hào giới thiệu...' },
    { id: 2, title: 'Sự kiện khuyến mãi lớn nhất năm', date: '20/04/2025', excerpt: 'Đừng bỏ lỡ cơ hội mua laptop với giá ưu đãi...' },
    // Thêm các tin tức khác
  ];

  return (
    <section className="tin-tuc-section">
      <h2>Tin tức mới nhất</h2>
      <ul className="danh-sach-tin-tuc">
        {tinTucMoiNhat.map(tin => (
          <li key={tin.id} className="item-tin-tuc">
            <h3>{tin.title}</h3>
            <p className="ngay-dang">{tin.date}</p>
            <p className="mo-ta">{tin.excerpt}</p>
            <button>Xem chi tiết</button>
          </li>
        ))}
      </ul>
      {/* Có thể thêm link để xem tất cả tin tức */}
    </section>
  );
}

export default TinTucSection;