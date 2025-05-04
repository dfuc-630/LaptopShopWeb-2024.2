import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './ConnectPage.css';

function ConnectPage() {
  // Thay thế bằng URL thực tế của bạn
  const facebookUrl = 'https://www.facebook.com/phu.phung.549668/';
  const youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1';
  const instagramUrl = 'https://www.instagram.com/phuhp_/';

  return (
    <div className="ket-noi-container">
      <section className="ket-noi-mang-xa-hoi">
        <h2>KẾT NỐI VỚI HUSTLAPTOP</h2>
        <div className="cac-kenh-mang-xa-hoi">
          <a
            href={facebookUrl}
            className="kenh facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
            <span>Facebook</span>
          </a>
          <a
            href={youtubeUrl}
            className="kenh youtube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faYoutube} size="2x" />
            <span>YouTube</span>
          </a>
          <a
            href={instagramUrl}
            className="kenh instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
            <span>Instagram</span>
          </a>
          {/* Thêm các kênh khác nếu cần */}
        </div>
      </section>

      <section className="thong-tin-lien-he">
        <h2>THÔNG TIN LIÊN HỆ</h2>
        <div className="tong-dai">
          <h3>Tư vấn mua hàng (Miễn phí)</h3>
          <p><a href="tel:1800xxxx">1800 xxxx (Nhấn 1)</a></p>
        </div>
        <div className="tong-dai">
          <h3>Góp ý, khiếu nại</h3>
          <p><a href="tel:1900xxxx">1900 xxxx (8h00 - 22h00)</a></p>
        </div>
        <div className="ho-tro-ky-thuat">
          <h3>Hỗ trợ kỹ thuật</h3>
          <p>Gặp chuyên gia ngay!</p>
          <Link to="/ve-chung-toi">Đi đến trang Về chúng tôi</Link>
        </div>
        {/* Thêm thông tin khác như địa chỉ, email, form liên hệ nếu cần */}
      </section>
    </div>
  );
}

export default ConnectPage;