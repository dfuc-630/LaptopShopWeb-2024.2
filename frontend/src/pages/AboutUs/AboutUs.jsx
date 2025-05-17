// src/pages/VeChungToiPage.jsx
import React, { useEffect } from 'react';
import IntroductionSection from '../AboutUs/IntroductionSection.jsx';
import CareerSection from '../AboutUs/CareerSection.jsx';
import NewsSection from '../AboutUs/NewsSection.jsx';
//import './VeChungToiPage.css';

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ve-chung-toi-container">
      <h1 className="page-title">Về Chúng Tôi</h1>
      <IntroductionSection />
      <CareerSection />
      <NewsSection />
    </div>
  );
}

export default AboutUs;
