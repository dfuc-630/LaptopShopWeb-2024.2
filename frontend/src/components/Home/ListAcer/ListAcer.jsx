import React, { useRef } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import ProductCard from '../../ProductCard/ProductCard';
import { getAllProducts } from '../../../services/productService';
import { useQuery } from '@tanstack/react-query';
import './ListAcer.css';

const ListAcer = () => {
    const scrollContainerRef = useRef(null);
    
    const { data: allProducts = [], isLoading, error } = useQuery({ 
        queryKey: ['allProducts'], 
        queryFn: getAllProducts,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Filter for Acer products
    const acerProducts = allProducts.filter(product => product.factory === 'Acer');
    
    // Scroll handlers
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

    if (acerProducts.length === 0) {
        return (
            <Container className="py-4">
                <div className="alert alert-info">
                    <h4 className="fw-bold">Không có sản phẩm nào của Acer</h4>
                    <p className="mb-0">Chúng tôi sẽ cập nhật thêm sản phẩm Acer trong thời gian tới.</p>
                </div>
            </Container>
        );
    }


    return (
        <div className="acer-products-section py-4">
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h2 className="acer-section-title fs-4 fw-bold mb-0">
                            <span className="text-primary">ACER</span> | MÁY TÍNH ACER
                        </h2>
                        <small className="product-count">{acerProducts.length} sản phẩm</small>
                    </div>
                    
                    <a href="/acer-laptop" className="view-all-link">
                        Xem tất cả 
                        <span className="arrow">→</span>
                    </a>
                </div>
                
                <div className="products-carousel-container position-relative">
                    {acerProducts.length > 4 && (
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
                        {acerProducts.map((product) => (

                                <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    
                    {acerProducts.length > 4 && (
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

export default ListAcer;