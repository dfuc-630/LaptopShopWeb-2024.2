import { useQuery } from '@tanstack/react-query';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../services/productService.js';
import { getHotProduct } from '../../utils/getHotProducts.js';
import Banner from '../../components/Home/Banner';
import ProductCard from '../../components/ProductCard/ProductCard';
import AudienceCard from '../../components/Home/AudienceCard';
import RecommendationCard from '../../components/Home/RecommendationCard';

import ListAcer from '../../components/Home/ListAcer/ListAcer.jsx';
import ListAsus from '../../components/Home/ListAsus/ListAsus.jsx';
import ListLenovo from '../../components/Home/ListLenovo/ListLenovo.jsx';
import ListMacbook from '../../components/Home/ListMacbook/ListMacbook.jsx';

export default function Homepage() {
  const navigate = useNavigate();
  const { data: allProducts = [] } = useQuery({ 
    queryKey: ['allProducts'], 
    queryFn: getAllProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const hotProduct = getHotProduct(allProducts);
  const hotProducts = allProducts.length > 0 ? [...allProducts].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 4) : [];

  const handleViewAllProducts = () => {
    navigate('/listproduct');
  };

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
      image: "/assets/banner2.jpg",
      title: "Giảm giá đến 30%",
      description: "Cho các dòng laptop cao cấp",
      buttonText: "Xem ưu đãi"
    },
    {
      id: 3,
      image: "/assets/banner3.jpg",
      title: "Bảo hành 3 năm",
      description: "Đổi mới trong 30 ngày nếu có lỗi",
      buttonText: "Tìm hiểu thêm"
    }
  ];

  const audienceData = [
    {
      id: 1,
      iconClass: "bi bi-briefcase",
      title: "Doanh nghiệp",
      description: "Các dòng laptop bền bỉ, bảo mật cao, hiệu suất ổn định cho công việc doanh nghiệp"
    },
    {
      id: 2,
      iconClass: "bi bi-mortarboard",
      title: "Sinh viên",
      description: "Laptop giá tốt, cấu hình đủ dùng cho học tập và giải trí cơ bản"
    },
    {
      id: 3,
      iconClass: "bi bi-laptop",
      title: "Đồ họa & Thiết kế",
      description: "Màn hình chất lượng cao, cấu hình mạnh mẽ cho các phần mềm đồ họa"
    },
    {
      id: 4,
      iconClass: "bi bi-people",
      title: "Game thủ",
      description: "Hiệu năng đỉnh cao, tản nhiệt tốt, trải nghiệm chơi game mượt mà"
    }
  ];

  const recommendationData = [
    {
      id: 1,
      iconClass: "bi bi-mortarboard",
      title: "Laptop cho Sinh viên",
      description: "Laptop giá hợp lý, pin lâu, phù hợp học tập và làm việc nhóm",
      link: "/student-laptop"
    },
    {
      id: 2,
      iconClass: "bi bi-laptop",
      title: "Macbook",
      description: "Hiệu suất mạnh mẽ, màn hình chuẩn màu, hỗ trợ thiết kế chuyên nghiệp",
      link: "/design-laptop"
    },
    {
      id: 3,
      iconClass: "bi bi-controller",
      title: "Laptop cho Gaming",
      description: "Card đồ họa cao cấp, tần số quét cao, trải nghiệm chơi game đỉnh cao",
      link: "/gaming-laptop"
    }
  ];

  return (
    <div className="homepage">
      <Banner slides={bannerSlides} />
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2">Sản Phẩm Nổi Bật</h2>
            <p className="lead text-muted">Khám phá những laptop bán chạy nhất của chúng tôi</p>
          </div>
          <Row xs={1} md={2} lg={4} className="g-4">
            {hotProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
          </Row>
          <div className="text-center mt-5">
            <Button variant="primary" size="lg" onClick={handleViewAllProducts}>Xem tất cả sản phẩm</Button>
          </div>
        </Container>
      </section>
      <section className="py-5 bg-secondary bg-opacity-10">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2">Chúng Tôi Phục Vụ</h2>
            <p className="lead text-muted">Giải pháp laptop phù hợp cho mọi nhu cầu</p>
          </div>
          <Row xs={1} md={2} lg={4} className="g-4">
            {audienceData.map((audience) => (
              <Col key={audience.id}>
                <AudienceCard audience={audience} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section> 
        <ListAcer/>          
      </section>
      <section> 
        <ListAsus/>          
      </section>
      <section>
        <ListLenovo/>
      </section>
      <section>
        <ListMacbook/>
      </section>
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2">Gợi Ý Laptop</h2>
            <p className="lead text-muted">Lựa chọn laptop tối ưu cho từng nhu cầu cụ thể</p>
          </div>
          <Row xs={1} md={2} lg={3} className="g-4">
            {recommendationData.map((recommendation) => (
              <Col key={recommendation.id}>
                <RecommendationCard recommendation={recommendation} />
              </Col>
            ))}
          </Row>
          <div className="mt-5">
            <Card className="bg-primary text-white text-center shadow">
              <Card.Body className="py-5">
                <h3 className="fw-bold mb-3">Không tìm thấy thứ bạn cần?</h3>
                <p className="lead mb-4">Chúng tôi có thể tư vấn cấu hình laptop phù hợp với nhu cầu cụ thể của bạn</p>
                <Button variant="light" className="text-primary fw-bold">Liên hệ tư vấn</Button>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
}