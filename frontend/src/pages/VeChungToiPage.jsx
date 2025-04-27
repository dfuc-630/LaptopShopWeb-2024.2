// src/pages/VeChungToiPage.jsx
import React from 'react';
import GioiThieuSection from '../components/VeChungToi/GioiThieuSection';
import TuyenDungSection from '../components/VeChungToi/TuyenDungSection';
import TinTucSection from '../components/VeChungToi/TinTucSection';
//import './VeChungToiPage.css';

function VeChungToiPage() {
  return (
    <div className="ve-chung-toi-container">
      <h1 className="page-title">Về Chúng Tôi</h1>
      <GioiThieuSection />
      <TuyenDungSection />
      <TinTucSection />
    </div>
  );
}

export default VeChungToiPage;