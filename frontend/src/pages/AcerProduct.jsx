import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import { Button, Offcanvas, Card } from 'react-bootstrap';
import { useProductFilter } from '../hooks/useProductFilter';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar.jsx';
import SortOptions from '../components/SortOptions/SortOptions.jsx';
import ActiveFilters from '../components/ActiveFilters/ActiveFilters.jsx';
import ProductList from '../components/ProductList/ProductList.jsx';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../services/productService.js';

function AcerProduct() {
    const [showFiltersMobile, setShowFiltersMobile] = useState(false); //State dùng để hiển thị bộ lọc trên di động
    
    const { data: allProducts = [], isLoading, error } = useQuery({ 
        queryKey: ['allProducts'], 
        queryFn: getAllProducts,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Filter for Acer products
    const acerProducts = allProducts.filter(product => product.factory === 'Acer');

    const {
        sortedProducts,
        activeFiltersCount,
        filterFactories,    setFilterFactories,
        filterPriceRanges,  setFilterPriceRanges,
        filterDemands,      setFilterDemands,
        filterScreenSizes,  setFilterScreenSizes,
        filterCPUs,         setFilterCPUs,
        filterRAMs,         setFilterRAMs,
        filterROMs,         setFilterROMs,
        filterRefreshRates, setFilterRefreshRates,
        sortOption,         setSortOption,
        clearFilters,
    } = useProductFilter(acerProducts);
    
    const filterSectionRef = useRef(null);
    
    const scrollToFilterSection = () => {
        if (filterSectionRef.current) {
            filterSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (isLoading) return (
        <div className="container py-5">Đang tải...</div>
    );

    if (error) return (
        <div className="container py-5">
            <div className="alert alert-danger">
                Có lỗi xảy ra khi tải sản phẩm. Vui lòng thử lại sau!
            </div>
        </div>
    );

    return (
        <div className="container-fluid">
            {/* Thong tin cua Trang */}
            <div className="row">
                <div className="col-12">
                    <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                        <li className="breadcrumb-item active"> Laptop Acer</li>
                    </ol>
                    </nav>
                    <h2 className="mb-3 fw-bold">Laptop Acer</h2>
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <p className="mb-0">Tìm sản phẩm theo nhu cầu</p>
                        </div>
                        <div className="col-auto">
                            <button 
                                className="btn btn-outline-dark"
                                onClick={scrollToFilterSection}
                            >
                                Dùng bộ lọc ngay</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nut hien thi bo loc tren dien thoai */}
            <div className="d-md-none mb-3">
                <Button
                variant="primary"
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() => setShowFiltersMobile(true)}
                >
                <span><FaFilter className="me-2" /> Lọc sản phẩm</span>
                {activeFiltersCount > 0 && (
                    <span className="badge bg-danger rounded-pill">{activeFiltersCount}</span>
                )}
                </Button>
            </div>

            {/* Bo loc cho Mobile */}
            <Offcanvas
                show={showFiltersMobile}
                onHide={() => setShowFiltersMobile(false)}
                placement="start"
            >
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Bộ lọc sản phẩm</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <FilterSidebar
                    filterFactories={filterFactories}
                    setFilterFactories={setFilterFactories}
                    filterPriceRanges={filterPriceRanges}
                    setFilterPriceRanges={setFilterPriceRanges}
                    filterDemands={filterDemands}
                    setFilterDemands={setFilterDemands}
                    filterScreenSizes={filterScreenSizes}
                    setFilterScreenSizes={setFilterScreenSizes}
                    filterCPUs={filterCPUs}
                    setFilterCPUs={setFilterCPUs}
                    filterRAMs={filterRAMs}
                    setFilterRAMs={setFilterRAMs}
                    filterROMs={filterROMs}
                    setFilterROMs={setFilterROMs}
                    filterRefreshRates={filterRefreshRates}
                    setFilterRefreshRates={setFilterRefreshRates}
                    clearFilters={clearFilters}
                    setShowFiltersMobile={setShowFiltersMobile}
                />
                </Offcanvas.Body>
            </Offcanvas>

            {/* Banner cua hang */}
            <div className="row mb-4">
                <div className="col-12">
                    <img src="/assets/Banner1.webp" alt="Banner" className="img-fluid" />
                </div>
            </div>

            {/* Tim kiem cac san pham */}
            <div className="row" ref={filterSectionRef}>
                <div className="col-md-3">
                    <FilterSidebar
                        filterFactories={filterFactories}
                        setFilterFactories={setFilterFactories}
                        filterPriceRanges={filterPriceRanges}
                        setFilterPriceRanges={setFilterPriceRanges}
                        filterDemands={filterDemands}
                        setFilterDemands={setFilterDemands}
                        filterScreenSizes={filterScreenSizes}
                        setFilterScreenSizes={setFilterScreenSizes}
                        filterCPUs={filterCPUs}
                        setFilterCPUs={setFilterCPUs}
                        filterRAMs={filterRAMs}
                        setFilterRAMs={setFilterRAMs}
                        filterROMs={filterROMs}
                        setFilterROMs={setFilterROMs}
                        filterRefreshRates={filterRefreshRates}
                        setFilterRefreshRates={setFilterRefreshRates}
                        clearFilters={clearFilters}
                        setShowFiltersMobile={setShowFiltersMobile}
                    />
                </div>

                {/* Thong tin chung */}
                <div className="col-12 col-md-9">
                    <Card>
                        <Card.Body>
                            <div className="row align-items-center">
                                <div className="col-12 col-md-6 d-flex align-items-center">
                                    <div className="mb-md-0">
                                        <p>Tìm thấy {sortedProducts.length} sản phẩm</p>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <SortOptions sortOptions={sortOption} setSortOption={setSortOption}/>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Cac option loc dang chon */}
                    <ActiveFilters
                        filterFactories={filterFactories}
                        setFilterFactories={setFilterFactories}
                        filterPriceRanges={filterPriceRanges}
                        setFilterPriceRanges={setFilterPriceRanges}
                        filterDemands={filterDemands}
                        naive
                        setFilterDemands={setFilterDemands}
                        filterScreenSizes={filterScreenSizes}
                        setFilterScreenSizes={setFilterScreenSizes}
                        filterCPUs={filterCPUs}
                        setFilterCPUs={setFilterCPUs}
                        filterRAMs={filterRAMs}
                        setFilterRAMs={setFilterRAMs}
                        filterROMs={filterROMs}
                        setFilterROMs={setFilterROMs}
                        filterRefreshRates={filterRefreshRates}
                        setFilterRefreshRates={setFilterRefreshRates}
                        clearFilters={clearFilters}
                        />

                    {/* Danh sach san pham */}
                    <ProductList products={sortedProducts} clearFilters={clearFilters}/>
                </div>
            </div>
        </div>
    );
}

export default AcerProduct;