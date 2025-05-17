import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Policy.css';
import WarrantyPolicy from '../Policy/WarrantyPolicy.jsx';
import RefundPolicy from '../Policy/RefundPolicy.jsx';
import SecurityPolicy from '../Policy/SecurityPolicy.jsx';
import BuyPolicy from '../Policy/BuyPolicy.jsx';

function Policy() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Add click handler for the menu links to scroll to the top first
  const handleMenuClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="chinh-sach-container">
      <h1 className="page-title">Chính Sách</h1>
      <ul className="chinh-sach-menu">
        <li><a href="#bao-hanh" onClick={handleMenuClick}>Bảo hành</a></li>
        <li><a href="#doi-tra" onClick={handleMenuClick}>Đổi trả</a></li>
        <li><a href="#bao-mat" onClick={handleMenuClick}>Bảo mật</a></li>
        <li><a href="#mua-hang" onClick={handleMenuClick}>Mua hàng</a></li>
      </ul>

      <div className="chinh-sach-content">
        <section id="bao-hanh">
          
          <WarrantyPolicy />
        </section>

        <section id="doi-tra">
          
          <RefundPolicy />
        </section>

        <section id="bao-mat">
          
          <SecurityPolicy />
        </section>

        <section id="mua-hang">
          
          <BuyPolicy />
        </section>
      </div>
    </div>
  );
}

export default Policy;
