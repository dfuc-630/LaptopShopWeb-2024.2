// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* Thông tin công ty */}
          <div className="col-md-3">
            <h5>Hệ thống FPT Shop toàn quốc</h5>
            <p>Bao gồm Cửa hàng FPT Shop, trung tâm Laptop, Studio, Gaming Brand Store.</p>
            <p>
              <strong>Hotline:</strong> 1800-6601 (8h - 22h)<br />
              <strong>Email:</strong> fptshop@fpt.com.vn
            </p>
          </div>

          {/* Kết nối với FPT Shop */}
          <div className="col-md-2">
            <h5>Kết nối với FPT Shop</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none"><i className="bi bi-facebook"></i> Facebook</a></li>
              <li><a href="#" className="text-white text-decoration-none"><i className="bi bi-youtube"></i> YouTube</a></li>
              <li><a href="#" className="text-white text-decoration-none"><i className="bi bi-tiktok"></i> TikTok</a></li>
            </ul>
          </div>

          {/* Về chúng tôi */}
          <div className="col-md-2">
            <h5>Về chúng tôi</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Giới thiệu công ty</a></li>
              <li><a href="#" className="text-white text-decoration-none">Tuyển dụng</a></li>
              <li><a href="#" className="text-white text-decoration-none">Tin tức</a></li>
            </ul>
          </div>

          {/* Chính sách */}
          <div className="col-md-2">
            <h5>Chính sách</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Chính sách bảo hành</a></li>
              <li><a href="#" className="text-white text-decoration-none">Chính sách đổi trả</a></li>
              <li><a href="#" className="text-white text-decoration-none">Chính sách bảo mật</a></li>
            </ul>
          </div>

          {/* Hỗ trợ thanh toán */}
          <div className="col-md-3">
            <h5>Hỗ trợ thanh toán</h5>
            <div className="d-flex flex-wrap gap-2">
              <img src="https://via.placeholder.com/40" alt="Visa" style={{ width: '40px' }} />
              <img src="https://via.placeholder.com/40" alt="MasterCard" style={{ width: '40px' }} />
              <img src="https://via.placeholder.com/40" alt="Momo" style={{ width: '40px' }} />
              <img src="https://via.placeholder.com/40" alt="ZaloPay" style={{ width: '40px' }} />
            </div>
          </div>
        </div>

        {/* Thông tin pháp lý */}
        <div className="text-center mt-4">
          <p className="mb-0">
            © 2024 Công ty Cổ phần Bán lẻ Kỹ thuật số FPT - Địa chỉ: 261-263 Khánh Hội, P2, Q4, TP.HCM.<br />
            GPĐKKD số 0301866629 do Sở KHĐT TP.HCM cấp ngày 08/03/2012.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;