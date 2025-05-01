// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function Footer() {
  // Nên định nghĩa các URL thực tế ở đây hoặc lấy từ config
  const facebookUrl = "https://facebook.com/fptshop.com.vn"; // Ví dụ
  const youtubeUrl = "https://www.youtube.com/user/FptShopOnline"; // Ví dụ
  const tiktokUrl = "https://www.tiktok.com/@fptshop.official"; // Ví dụ

  return (
    <footer className="bg-dark text-white py-4 mt-auto"> {/* Thêm mt-auto */}
      <div className="container">
        <div className="row">
          {/* Thông tin công ty */}
          <div className="col-md-3 mb-3">
            <h5>Hệ thống AE Rọt Shop</h5>
            <p className="small">Tìm cửa hàng gần nhất.</p> {/* Ví dụ */}
            <p className="small mb-1">
              <strong>Hotline:</strong> 1800-6601 (Miễn phí, 8h-22h)
            </p>
             <p className="small mb-0">
               <strong>Email:</strong> fptshop@fpt.com.vn
             </p>
          </div>

          {/* Kết nối */}
          <div className="col-md-2 col-6 mb-3">
            <h5>Kết nối</h5>
            <ul className="list-unstyled">
              {/* Dùng thẻ a cho link ngoài, thêm target và rel */}
              <li><a href={facebookUrl} className="text-white text-decoration-none small" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook me-2"></i>Facebook</a></li>
              <li><a href={youtubeUrl} className="text-white text-decoration-none small" target="_blank" rel="noopener noreferrer"><i className="bi bi-youtube me-2"></i>YouTube</a></li>
              <li><a href={tiktokUrl} className="text-white text-decoration-none small" target="_blank" rel="noopener noreferrer"><i className="bi bi-tiktok me-2"></i>TikTok</a></li>
              {/* Thêm các mạng xã hội khác nếu cần */}
            </ul>
          </div>

          {/* Về chúng tôi */}
          <div className="col-md-2 col-6 mb-3">
            <h5>Về chúng tôi</h5>
            <ul className="list-unstyled">
              {/* Dùng Link cho các trang nội bộ */}
              <li><Link to="/gioi-thieu" className="text-white text-decoration-none small">Giới thiệu công ty</Link></li>
              <li><Link to="/tuyen-dung" className="text-white text-decoration-none small">Tuyển dụng</Link></li>
              <li><Link to="/tin-tuc" className="text-white text-decoration-none small">Tin tức</Link></li>
            </ul>
          </div>

          {/* Chính sách */}
          <div className="col-md-2 col-6 mb-3">
            <h5>Chính sách</h5>
            <ul className="list-unstyled">
              <li><Link to="/chinh-sach/bao-hanh" className="text-white text-decoration-none small">Chính sách bảo hành</Link></li>
              <li><Link to="/chinh-sach/doi-tra" className="text-white text-decoration-none small">Chính sách đổi trả</Link></li>
              <li><Link to="/chinh-sach/bao-mat" className="text-white text-decoration-none small">Chính sách bảo mật</Link></li>
              <li><Link to="/chinh-sach/mua-hang" className="text-white text-decoration-none small">Chính sách mua hàng</Link></li>
            </ul>
          </div>

          {/* Hỗ trợ thanh toán */}
          <div className="col-md-3 col-6 mb-3">
            <h5>Hỗ trợ thanh toán</h5>
            {/* Thay placeholder bằng logo thật */}
            <div className="d-flex flex-wrap gap-2">
              <img src="/images/payment/visa.png" alt="Visa" title="Visa" style={{ height: '25px' }} />
              <img src="/images/payment/mastercard.png" alt="MasterCard" title="MasterCard" style={{ height: '25px' }} />
              <img src="/images/payment/jcb.png" alt="JCB" title="JCB" style={{ height: '25px' }} />
              <img src="/images/payment/momo.png" alt="Momo" title="Momo" style={{ height: '25px' }} />
              <img src="/images/payment/zalopay.png" alt="ZaloPay" title="ZaloPay" style={{ height: '25px' }} />
              <img src="/images/payment/vnpay.png" alt="VNPay" title="VNPay" style={{ height: '25px' }} />
               {/* Thêm các phương thức khác */}
            </div>
          </div>
        </div>

        {/* Thông tin pháp lý */}
        <div className="text-center border-top border-secondary pt-3 mt-3">
          <p className="small text-muted mb-0">
            © 2024 Công ty TNHH AE Rọt. Chịu trách nhiệm nội dung: Ông Nguyễn Văn A.<br />
            Địa chỉ: 123 Đường ABC, Phường XYZ, Quận 1, TP. HCM. Email: support@aerotshop.vn. Điện thoại: 1900 xxxx.<br/>
            {/* GPĐKKD số 0123456789 do Sở KHĐT TP.HCM cấp ngày dd/mm/yyyy. */}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;