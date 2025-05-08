import React from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { useState} from 'react';
// import bannerImage1 from '../../assets/H1_1440x242_a9763619b0.webp';
import './Banner.css';

function Banner () {
    const [activeSlide, setActiveSlide] = useState(0);
  
    // Banner slides data
    const bannerSlides = [
      {
        id: 1,
        image: "/assets/Banner1.webp",
        title: "Laptop Mới Nhất 2025",
        description: "Hiệu suất vượt trội, thiết kế sang trọng",
        buttonText: "Khám phá ngay"
      },
      {
        id: 2,
        image: "/assets/BannerImage2.webp",
        title: "Giảm giá đến 30%",
        description: "Cho các dòng laptop cao cấp",
        buttonText: "Xem ưu đãi"
      },
      {
        id: 3,
        image: "/assets/Banner3.webp",
        title: "Bảo hành 3 năm",
        description: "Đổi mới trong 30 ngày nếu có lỗi",
        buttonText: "Tìm hiểu thêm"
      }
    ];

    // Handle carousel navigation
    const handlePrev = () => {
        setActiveSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
    };
    return (
        <div className="position-relative banner-container">
        <Carousel 
          className="homepage-banner" 
          interval={5000} 
          indicators={true} 
          controls={false}
          activeIndex={activeSlide}
          onSelect={() => {}} // Prevent default selection behavior since we're controlling it manually
        >
          {bannerSlides.map((slide) => (
            <Carousel.Item key={slide.id}>
              <div className="banner-image-container" style={{ height: '500px', overflow: 'hidden' }}>
                <img 
                  className="d-block w-100" 
                  src={slide.image} 
                  alt={slide.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center h-100" style={{ top: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}>
                  <h2 className="display-4 fw-bold">{slide.title}</h2>
                  <p className="lead mb-4">{slide.description}</p>
                  <Button variant="primary" size="lg">{slide.buttonText}</Button>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        
        {/* Custom control buttons */}
        <div className="carousel-custom-controls">
          <Button 
            variant="light" 
            className="carousel-control-prev-custom position-absolute top-50 start-0 translate-middle-y ms-2 opacity-0"
            onClick={handlePrev}
          >
            <i className="bi bi-chevron-left fs-4"></i>
          </Button>
          <Button 
            variant="light" 
            className="carousel-control-next-custom position-absolute top-50 end-0 translate-middle-y me-2 opacity-0"
            onClick={handleNext}
          >
            <i className="bi bi-chevron-right fs-4"></i>
          </Button>
        </div>
      </div>
    );
}

export default Banner;