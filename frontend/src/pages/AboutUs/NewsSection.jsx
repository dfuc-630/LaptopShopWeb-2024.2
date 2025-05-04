import React, { useState } from 'react';
import './NewsSection.css'; // Import CSS cho section này

function NewsSection() {
  const tinTucMoiNhat = [
    {
      id: 1,
      title: 'Ra mắt dòng laptop mới siêu mạnh',
      date: '24/04/2025',
      excerpt: 'HustLaptop tự hào giới thiệu dòng laptop mới với hiệu năng vượt trội, thiết kế hiện đại và giá cả hợp lý.',
      details: 'Dòng laptop mới của chúng tôi được trang bị bộ vi xử lý Intel thế hệ 13, card đồ họa NVIDIA RTX 40-series, và màn hình OLED 4K. Đây là lựa chọn hoàn hảo cho cả công việc và giải trí.'
    },
    {
      id: 2,
      title: 'Sự kiện khuyến mãi lớn nhất năm',
      date: '20/04/2025',
      excerpt: 'Đừng bỏ lỡ cơ hội mua laptop với giá ưu đãi cực sốc trong sự kiện khuyến mãi lớn nhất năm của HustLaptop.',
      details: 'Sự kiện kéo dài từ ngày 20/04 đến 30/04 với hàng loạt ưu đãi hấp dẫn: giảm giá lên đến 30%, tặng kèm phụ kiện cao cấp, và cơ hội trúng thưởng laptop miễn phí.'
    },
    {
      id: 3,
      title: 'Hướng dẫn chọn laptop phù hợp',
      date: '15/04/2025',
      excerpt: 'Bạn đang phân vân không biết chọn laptop nào? Hãy đọc bài viết của chúng tôi để tìm hiểu cách chọn laptop phù hợp nhất.',
      details: 'Chúng tôi cung cấp hướng dẫn chi tiết về cách chọn laptop dựa trên nhu cầu sử dụng, ngân sách, và các tính năng cần thiết. Đừng bỏ lỡ!'
    },
    {
      id: 4,
      title: 'Top 5 laptop dành cho sinh viên',
      date: '10/04/2025',
      excerpt: 'Khám phá 5 mẫu laptop tốt nhất dành cho sinh viên với giá cả phải chăng và hiệu năng vượt trội.',
      details: 'Danh sách này bao gồm các mẫu laptop từ các thương hiệu nổi tiếng như Dell, HP, Lenovo, và Asus, phù hợp với nhu cầu học tập và giải trí.'
    },
    {
      id: 5,
      title: 'Cách bảo quản laptop đúng cách',
      date: '05/04/2025',
      excerpt: 'Hướng dẫn chi tiết cách bảo quản laptop để kéo dài tuổi thọ và duy trì hiệu suất.',
      details: 'Bài viết cung cấp các mẹo hữu ích như vệ sinh định kỳ, sử dụng đúng cách, và bảo quản trong môi trường phù hợp.'
    },
    {
      id: 6,
      title: 'So sánh các dòng laptop gaming 2025',
      date: '01/04/2025',
      excerpt: 'Đánh giá và so sánh các dòng laptop gaming nổi bật nhất năm 2025.',
      details: 'Bài viết phân tích hiệu năng, thiết kế, và giá cả của các dòng laptop gaming từ các thương hiệu hàng đầu như MSI, Asus ROG, và Alienware.'
    },
    {
      id: 7,
      title: 'Lợi ích của việc nâng cấp SSD cho laptop',
      date: '28/03/2025',
      excerpt: 'Tìm hiểu tại sao nâng cấp SSD có thể cải thiện hiệu suất laptop của bạn.',
      details: 'SSD giúp tăng tốc độ khởi động, cải thiện hiệu suất đọc/ghi dữ liệu và mang lại trải nghiệm mượt mà hơn so với ổ cứng HDD truyền thống.'
    },
    {
      id: 8,
      title: 'Top 10 laptop tốt nhất năm 2025',
      date: '20/03/2025',
      excerpt: 'Danh sách 10 laptop tốt nhất năm 2025 dành cho mọi nhu cầu sử dụng.',
      details: 'Bài viết đánh giá các mẫu laptop hàng đầu từ các thương hiệu nổi tiếng, phù hợp cho cả công việc, học tập và giải trí.'
    },
    {
      id: 9,
      title: 'Hướng dẫn vệ sinh laptop đúng cách',
      date: '15/03/2025',
      excerpt: 'Bảo vệ laptop của bạn bằng cách vệ sinh đúng cách và định kỳ.',
      details: 'Hướng dẫn chi tiết cách vệ sinh bàn phím, màn hình và các linh kiện bên trong laptop để duy trì hiệu suất và tuổi thọ.'
    },
    {
      id: 10,
      title: 'Cách chọn laptop cho dân thiết kế đồ họa',
      date: '10/03/2025',
      excerpt: 'Những yếu tố cần cân nhắc khi chọn laptop cho công việc thiết kế đồ họa.',
      details: 'Bài viết cung cấp thông tin về cấu hình, màn hình và các yếu tố quan trọng khác để chọn laptop phù hợp cho dân thiết kế.'
    },
    {
      id: 11,
      title: 'Laptop nào phù hợp cho lập trình viên?',
      date: '05/03/2025',
      excerpt: 'Tìm hiểu các mẫu laptop tốt nhất dành cho lập trình viên.',
      details: 'Bài viết phân tích các yếu tố như hiệu năng CPU, RAM, và bàn phím để giúp lập trình viên chọn laptop phù hợp.'
    },
    {
      id: 12,
      title: 'So sánh MacBook và laptop Windows',
      date: '01/03/2025',
      excerpt: 'MacBook hay laptop Windows? Đâu là lựa chọn tốt nhất cho bạn?',
      details: 'Bài viết so sánh ưu và nhược điểm của MacBook và laptop Windows để giúp bạn đưa ra quyết định phù hợp.'
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tinTucMoiNhat.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(tinTucMoiNhat.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="tin-tuc-section">
      <h2 className="section-title">Tin tức mới nhất</h2>
      <p className="section-description">
        Cập nhật những thông tin mới nhất về sản phẩm, sự kiện và các chương trình khuyến mãi từ <strong>HustLaptop</strong>.
      </p>
      <p className="current-page">Trang hiện tại: {currentPage} / {totalPages}</p>
      <ul className="danh-sach-tin-tuc">
        {currentItems.map(tin => (
          <li key={tin.id} className="item-tin-tuc">
            <h3 className="tin-title">{tin.title}</h3>
            <p className="ngay-dang">Ngày đăng: {tin.date}</p>
            <p className="mo-ta">{tin.excerpt}</p>
            <details className="chi-tiet">
              <summary>Xem chi tiết</summary>
              <p>{tin.details}</p>
            </details>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
}

export default NewsSection;