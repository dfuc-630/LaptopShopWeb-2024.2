// src/pages/HomePage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import { Button, Offcanvas, Card, Spinner } from 'react-bootstrap';
import { useProductFilter } from '../../hooks/useProductFilter.js';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar.jsx';
import SortOptions from '../../components/SortOptions/SortOptions.jsx';
import ActiveFilters from '../../components/ActiveFilters/ActiveFilters.jsx';
import ProductList from '../../components/ProductList/ProductList.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import { useQuery } from '@tanstack/react-query';
import { getProductsByPage, getTotalProductCount } from '../../services/productService.js';

function ListProduct() {
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [showSidebarDesktop, setShowSidebarDesktop] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get query parameters from URL
  const queryParams = new URLSearchParams(location.search);
  const pageParam = parseInt(queryParams.get('page'), 10) || 1;
  
  // Constants for pagination
  const [currentPage, setCurrentPage] = useState(pageParam);
  const productsPerPage = 9; // Products per page
  const [totalProducts, setTotalProducts] = useState(0);
  
  // Fetch products for current page
  const { data: pageData = { products: [], pagination: { totalItems: 0, currentPage: 1 } }, isLoading, error } = useQuery({
    queryKey: ['products', 'page', currentPage],
    queryFn: () => getProductsByPage(currentPage),
    staleTime: 5 * 60 * 1000,
    onSuccess: (data) => {
      // Update total count if available from API
      if (data.pagination && typeof data.pagination.totalItems === 'number') {
        // Only update if we got a valid number and it's greater than what we already have
        // This prevents the total from jumping around as we navigate pages
        setTotalProducts(prev => Math.max(prev, data.pagination.totalItems));
      }
    }
  });
  
  // Extract the products array from the response
  const products = pageData.products || [];
  
  // Initialize filter states with values from URL if present
  const initialFactories = queryParams.get('factories') ? queryParams.get('factories').split(',') : [];
  const initialPriceRanges = queryParams.get('priceRanges') ? queryParams.get('priceRanges').split(',') : [];
  const initialDemands = queryParams.get('demands') ? queryParams.get('demands').split(',') : [];
  const initialScreenSizes = queryParams.get('screenSizes') ? queryParams.get('screenSizes').split(',') : [];
  const initialCPUs = queryParams.get('cpus') ? queryParams.get('cpus').split(',') : [];
  const initialRAMs = queryParams.get('rams') ? queryParams.get('rams').split(',') : [];
  const initialROMs = queryParams.get('roms') ? queryParams.get('roms').split(',') : [];
  const initialRefreshRates = queryParams.get('refreshRates') ? queryParams.get('refreshRates').split(',') : [];
  const initialSortOption = queryParams.get('sort') || 'default';

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
  } = useProductFilter(
    products, 
    initialFactories,
    initialPriceRanges,
    initialDemands,
    initialScreenSizes,
    initialCPUs,
    initialRAMs,
    initialROMs,
    initialRefreshRates,
    initialSortOption
  );
  
  // Update URL with filter parameters
  useEffect(() => {
    const params = new URLSearchParams();
    
    // Add page parameter
    params.set('page', currentPage.toString());
    
    // Add filter parameters (only if they have values)
    if (filterFactories.length > 0) params.set('factories', filterFactories.join(','));
    if (filterPriceRanges.length > 0) params.set('priceRanges', filterPriceRanges.join(','));
    if (filterDemands.length > 0) params.set('demands', filterDemands.join(','));
    if (filterScreenSizes.length > 0) params.set('screenSizes', filterScreenSizes.join(','));
    if (filterCPUs.length > 0) params.set('cpus', filterCPUs.join(','));
    if (filterRAMs.length > 0) params.set('rams', filterRAMs.join(','));
    if (filterROMs.length > 0) params.set('roms', filterROMs.join(','));
    if (filterRefreshRates.length > 0) params.set('refreshRates', filterRefreshRates.join(','));
    
    // Add sort parameter if not default
    if (sortOption !== 'default') params.set('sort', sortOption);
    
    // Update URL without page refresh
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [
    currentPage, 
    filterFactories, 
    filterPriceRanges, 
    filterDemands,
    filterScreenSizes,
    filterCPUs,
    filterRAMs,
    filterROMs,
    filterRefreshRates,
    sortOption,
    navigate,
    location.pathname
  ]);
  
  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [
    filterFactories, 
    filterPriceRanges, 
    filterDemands,
    filterScreenSizes,
    filterCPUs,
    filterRAMs,
    filterROMs,
    filterRefreshRates
  ]);
  
  // Scroll to top when component mounts or page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Get total product count from API once when component mounts
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const count = await getTotalProductCount();
        if (count > 0) {
          setTotalProducts(count);
        }
      } catch (error) {
        console.error('Failed to get total product count:', error);
      }
    };
    
    fetchTotalCount();
  }, []);
  
  // Calculate total pages based on current data
  // Ensure we have at least 1 page if we have products but no total count
  useEffect(() => {
    if (products.length > 0 && totalProducts === 0) {
      // If we have products but totalProducts is 0, use the current page's count
      setTotalProducts(products.length * Math.max(1, currentPage));
    }
  }, [products, currentPage, totalProducts]);

  const filterSectionRef = useRef(null);
  
  const scrollToFilterSection = () => {
    if (filterSectionRef.current) {
      filterSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // Custom clear filters that also resets URL parameters
  const handleClearFilters = () => {
    clearFilters();
    setCurrentPage(1);
    navigate(location.pathname, { replace: true });
  };

  if (isLoading && currentPage === 1) return (
    <div className="container py-5 d-flex justify-content-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Đang tải...</span>
      </Spinner>
    </div>
  );

  if (error) return (
    <div className="container py-5">
      <div className="alert alert-danger">
        Có lỗi xảy ra khi tải sản phẩm. Vui lòng thử lại sau!
      </div>
    </div>
  );

  // Calculate total pages - prevent division by zero
  const totalPages = Math.max(1, Math.ceil(totalProducts / productsPerPage));
  
  // Determine if we show "loading" for the whole component or just the product list
  const isInitialLoading = isLoading && currentPage === 1;

  return (
    <div className="container-fluid">
      {/* Thong tin cua Trang */}
      <div className="row">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
              <li className="breadcrumb-item active">Tất cả sản phẩm</li>
            </ol>
          </nav>
          <h2 className="mb-3 fw-bold">Tất cả sản phẩm</h2>
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
            clearFilters={handleClearFilters}
            setShowFiltersMobile={setShowFiltersMobile}
          />
        </Offcanvas.Body>
      </Offcanvas>

      {/* Banner */}
      <div className="row mb-4">
        <div className="col-12">
          <img src="/assets/Banner1.webp" alt="Banner" className="img-fluid" />
        </div>
      </div>

      {/* Tim kiem cac san pham */}
      <div className="row" ref={filterSectionRef}>
        {/* Toggle button for desktop */}
        <div className="col-12 d-none d-md-block mb-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setShowSidebarDesktop((prev) => !prev)}
          >
            {showSidebarDesktop ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
          </Button>
        </div>
        {/* Sidebar - only show if showSidebarDesktop is true */}
        {showSidebarDesktop && (
          <div className="col-md-3 d-none d-md-block">
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
              clearFilters={handleClearFilters}
              setShowFiltersMobile={setShowFiltersMobile}
            />
          </div>
        )}
        {/* Product list - take full width if sidebar is hidden */}
        <div className={showSidebarDesktop ? "col-12 col-md-9" : "col-12"}>
          <Card>
            <Card.Body>
              <div className="row align-items-center">
                <div className="col-12 col-md-6 d-flex align-items-center">
                  <div className="mb-md-0">
                    <p>
                      {isLoading ? (
                        <span>Đang tải...</span>
                      ) : products.length > 0 ? (
                        <span>Tìm thấy {totalProducts} sản phẩm (Trang {currentPage} / {totalPages})</span>
                      ) : (
                        <span>Không tìm thấy sản phẩm nào</span>
                      )}
                    </p>
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
            clearFilters={handleClearFilters}
          />
          {/* Danh sach san pham */}
          <ProductList products={sortedProducts} isLoading={isInitialLoading} />
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ListProduct;