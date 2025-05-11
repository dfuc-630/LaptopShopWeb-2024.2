import React, { useRef } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import ProductCard from '../../ProductCard/ProductCard';
import { getAllProducts } from '../../../services/productService';
import { useQuery } from '@tanstack/react-query';
import './ListAsus.css';

const ListAsus = () => {
    const scrollContainerRef = useRef(null);
    
    const { data: allProducts = [], isLoading, error } = useQuery({ 
        queryKey: ['allProducts'], 
        queryFn: getAllProducts,
        staleTime: 5 * 60 * 1000,
    });

    // Filter for Asus products
    const asusProducts = allProducts.filter(product => product.factory === 'Asus');
    
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };
    
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };
    
    if (isLoading) {
        return (
            <Container className="py-4 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Đang tải sản phẩm...</p>
            </Container>
        );
    }
    
    if (error) {
        return (
            <Container className="py-4">
                <div className="alert alert-danger">
                    Có lỗi xảy ra khi tải sản phẩm. Vui lòng thử lại sau!
                </div>
            </Container>
        );
    }

    if (asusProducts.length === 0) {
        return (
            <Container className="py-4">
                <div className="alert alert-info">
                    <h4 className="fw-bold">Không có sản phẩm nào của Asus</h4>
                    <p className="mb-0">Chúng tôi sẽ cập nhật thêm sản phẩm Asus trong thời gian tới.</p>
                </div>
            </Container>
        );
    }

    return (
        <div className="asus-products-section py-4">
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h2 className="asus-section-title fs-4 fw-bold mb-0">
                            <span className="text-primary">ASUS</span> | MÁY TÍNH ASUS
                        </h2>
                        <small className="product-count">{asusProducts.length} sản phẩm</small>
                    </div>
                    
                    <a href="/asus" className="view-all-link">
                        Xem tất cả 
                        <span className="arrow">→</span>
                    </a>
                </div>
                
                <div className="products-carousel-container position-relative">
                    {asusProducts.length > 4 && (
                        <Button 
                            variant="light" 
                            className="carousel-control carousel-control-prev" 
                            onClick={scrollLeft}
                            aria-label="Previous products"
                        >
                            <i className="bi bi-chevron-left"></i>
                        </Button>
                    )}
                    
                    <div 
                        ref={scrollContainerRef} 
                        className="products-scroll-container"
                    >
                        {asusProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    
                    {asusProducts.length > 4 && (
                        <Button 
                            variant="light" 
                            className="carousel-control carousel-control-next" 
                            onClick={scrollRight}
                            aria-label="Next products"
                        >
                            <i className="bi bi-chevron-right"></i>
                        </Button>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default ListAsus;