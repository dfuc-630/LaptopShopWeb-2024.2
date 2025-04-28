// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Footer.css'; // Import custom CSS for the footer

function Footer() {
  // Nên định nghĩa các URL thực tế ở đây hoặc lấy từ config
  const facebookUrl = 'https://www.facebook.com/phu.phung.549668/';
  const youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1';
  const tiktokUrl = 'https://www.instagram.com/phuhp_/';

  return (
    <footer className="footer text-white py-5 mt-auto">
      <div className="container">
        <div className="row">

          {/* Company Info */}
          <div className="col-md-3 mb-4 company-info">
            <h5 className="fw-bold logo-text">💻 HustLaptop</h5>
            <p className="small slogan">Tìm cửa hàng gần bạn và trải nghiệm!</p>
            <p className="small mb-1 contact-info">
              <strong>📞 Hotline:</strong> <a href="tel:1800-0325" className="text-white text-decoration-none">1800-0325</a> (8h-22h)
            </p>
            <p className="small mb-0 contact-info">
              <strong>📧 Email:</strong> <a href="mailto:HustLaptop@gmail.com" className="text-white text-decoration-none">HustLaptop@gmail.com</a>
            </p>
          </div>

          {/* Social Media */}
          <div className="col-md-2 col-6 mb-4 social-links">
            <h5 className="fw-bold section-title">🌐 Kết nối</h5>
            <ul className="list-unstyled">
              <li><a href={facebookUrl} className="text-white text-decoration-none small link-hover" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook me-2"></i> Facebook</a></li>
              <li><a href={youtubeUrl} className="text-white text-decoration-none small link-hover" target="_blank" rel="noopener noreferrer"><i className="bi bi-youtube me-2"></i> YouTube</a></li>
              <li><a href={tiktokUrl} className="text-white text-decoration-none small link-hover" target="_blank" rel="noopener noreferrer"><i className="bi bi-tiktok me-2"></i> TikTok</a></li>
            </ul>
          </div>

          {/* About Us */}
          <div className="col-md-2 col-6 mb-4 about-us">
            <h5 className="fw-bold section-title">🏢 Về chúng tôi</h5>
            <ul className="list-unstyled">
              <li><Link to="/gioi-thieu" className="text-white text-decoration-none small link-hover">📄 Giới thiệu</Link></li>
              <li><Link to="/tuyen-dung" className="text-white text-decoration-none small link-hover">👨‍💼 Tuyển dụng</Link></li>
              <li><Link to="/tin-tuc" className="text-white text-decoration-none small link-hover">📰 Tin tức</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="col-md-2 col-6 mb-4 policies">
            <h5 className="fw-bold section-title">🛡 Chính sách</h5>
            <ul className="list-unstyled">
              <li><Link to="/chinh-sach/bao-hanh" className="text-white text-decoration-none small link-hover">🔧 Bảo hành</Link></li>
              <li><Link to="/chinh-sach/doi-tra" className="text-white text-decoration-none small link-hover">🔁 Đổi trả</Link></li>
              <li><Link to="/chinh-sach/bao-mat" className="text-white text-decoration-none small link-hover">🔒 Bảo mật</Link></li>
              <li><Link to="/chinh-sach/mua-hang" className="text-white text-decoration-none small link-hover">🛒 Mua hàng</Link></li>
            </ul>
          </div>

          {/* Payments */}
          <div className="col-md-3 col-6 mb-4 payments">
            <h5 className="fw-bold section-title">💳 Thanh toán</h5>
            <div className="d-flex flex-wrap gap-2 payment-icons">
              <img src="/images/payment/visa.png" alt="Visa" title="Visa" className="payment-icon" />
              <img src="/images/payment/mastercard.png" alt="MasterCard" title="MasterCard" className="payment-icon" />
              <img src="/images/payment/jcb.png" alt="JCB" title="JCB" className="payment-icon" />
              <img src="/images/payment/momo.png" alt="Momo" title="Momo" className="payment-icon" />
              <img src="/images/payment/zalopay.png" alt="ZaloPay" title="ZaloPay" className="payment-icon" />
              <img src="/images/payment/vnpay.png" alt="VNPay" title="VNPay" className="payment-icon" />
            </div>
          </div>
        </div>

        {/* Legal Info */}
        <div className="text-center border-top border-white pt-3 mt-4 legal-info">
          <p className="small text-white mb-0 copyright">
            © 2024 Công ty TNHH HustLaptop. Chịu trách nhiệm nội dung: Ông Nguyễn Văn A.<br />
            Địa chỉ: Số 1 Tạ Quang Bửu, Hai Bà Trưng, Hà Nội. Email: <a href="mailto:support@hustlaptop.vn" className="text-white text-decoration-none">support@hustlaptop.vn</a>. ĐT: <a href="tel:1900-9191" className="text-white text-decoration-none">1900 9191</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
