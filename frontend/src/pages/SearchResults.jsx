import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchProductsByName } from '../services/productService';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar.jsx';
import ActiveFilters from '../components/ActiveFilters/ActiveFilters.jsx';
import ProductList from '../components/ProductList/ProductList.jsx';
import SortOptions from '../components/SortOptions/SortOptions.jsx';
import { useProductFilter } from '../hooks/useProductFilter';
import { Button, Card, Offcanvas } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SearchResults() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('name') || '';
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
  } = useProductFilter(products);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setError('Vui lòng nhập từ khóa tìm kiếm.');
        setLoading(false);
        return;
      }

      try {
        const data = await searchProductsByName(query);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải kết quả tìm kiếm. Vui lòng thử lại.');
        setLoading(false);
      }
    };

    setSearchQuery(query);
    fetchSearchResults();
  }, [query]);

  if (loading) return <div className="container py-5">Đang tải...</div>;
  if (error) return (
    <div className="container py-5">
      <div className="alert alert-danger">{error}</div>
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
              <li className="breadcrumb-item active">Tìm kiếm: "{query}"</li>
            </ol>
          </nav>
          <h2 className="mb-3 fw-bold">Kết quả tìm kiếm cho: "{query}"</h2>
        </div>
      </div>

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

      <div className="row">
        <div className="col-md-3 d-none d-md-block">
          <FilterSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
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

        <div className="col-12 col-md-9">
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <div className="row align-items-center">
                <div className="col-12 col-md-6">
                  <p className="mb-md-0">Tìm thấy {sortedProducts.length} sản phẩm</p>
                </div>
                <div className="col-12 col-md-6">
                  <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
                </div>
              </div>
            </Card.Body>
          </Card>

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

          <ProductList products={sortedProducts} clearFilters={clearFilters} />
        </div>
      </div>
    </div>
  );
}

export default SearchResults;