import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchProductsByName } from '../services/productService';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard/ProductCard';
import { sortOptions } from '../constants/filterOptions';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { Button, Card, Form, Offcanvas, Badge } from 'react-bootstrap';

function SearchResults() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFactories, setFilterFactories] = useState([]);
  const [filterPriceRanges, setFilterPriceRanges] = useState([]);
  const [filterDemands, setFilterDemands] = useState([]);
  const [filterScreenSizes, setFilterScreenSizes] = useState([]);
  const [filterCPUs, setFilterCPUs] = useState([]);
  const [filterRAMs, setFilterRAMs] = useState([]);
  const [filterROMs, setFilterROMs] = useState([]);
  const [filterRefreshRates, setFilterRefreshRates] = useState([]);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get('name') || '';

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

  useEffect(() => {
    const count = 
      filterFactories.length +
      filterPriceRanges.length +
      filterDemands.length +
      filterScreenSizes.length +
      filterCPUs.length +
      filterRAMs.length +
      filterROMs.length +
      filterRefreshRates.length;
    
    setActiveFiltersCount(count);
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?name=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredProducts = products
    .filter(product => 
      filterFactories.length === 0 || filterFactories.includes(product.factory)
    )
    .filter(product => {
      if (filterPriceRanges.length === 0) return true;
      const price = product.price || 0;
      return filterPriceRanges.some(range => {
        switch (range) {
          case 'Dưới 10 triệu': return price < 10000000;
          case 'Từ 10 - 15 triệu': return price >= 10000000 && price <= 15000000;
          case 'Từ 15 - 20 triệu': return price > 15000000 && price <= 20000000;
          case 'Từ 20 - 25 triệu': return price > 20000000 && price <= 25000000;
          case 'Từ 25 - 30 triệu': return price > 25000000 && price <= 30000000;
          case 'Trên 30 triệu': return price > 30000000;
          default: return true;
        }
      });
    })
    .filter(product => 
      filterDemands.length === 0 || filterDemands.some(demand => 
        product.specs?.Demand?.includes(demand)
      )
    )
    .filter(product => 
      filterScreenSizes.length === 0 || filterScreenSizes.some(size => 
        product.specs?.Screen?.includes(size)
      )
    )
    .filter(product => 
      filterCPUs.length === 0 || filterCPUs.some(cpu => 
        product.specs?.CPU?.includes(cpu)
      )
    )
    .filter(product => 
      filterRAMs.length === 0 || filterRAMs.includes(product.specs?.RAM || '')
    )
    .filter(product => 
      filterROMs.length === 0 || filterROMs.includes(product.specs?.ROM || '')
    )
    .filter(product => 
      filterRefreshRates.length === 0 || filterRefreshRates.includes(product.specs?.RefreshRate || '')
    );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortOption) {
      case 'price_asc':
        return (a.price || 0) - (b.price || 0);
      case 'price_desc':
        return (b.price || 0) - (a.price || 0);
      case 'name_asc':
        return (a.name || '').localeCompare(b.name || '');
      case 'name_desc':
        return (b.name || '').localeCompare(a.name || '');
      case 'newest':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setFilterFactories([]);
    setFilterPriceRanges([]);
    setFilterDemands([]);
    setFilterScreenSizes([]);
    setFilterCPUs([]);
    setFilterRAMs([]);
    setFilterROMs([]);
    setFilterRefreshRates([]);
    setSortOption('default');
  };

  const renderActiveFilters = () => {
    const allActiveFilters = [
      ...filterFactories.map(filter => ({ type: 'Hãng sản xuất', value: filter, setFilter: setFilterFactories })),
      ...filterPriceRanges.map(filter => ({ type: 'Mức giá', value: filter, setFilter: setFilterPriceRanges })),
      ...filterDemands.map(filter => ({ type: 'Nhu cầu', value: filter, setFilter: setFilterDemands })),
      ...filterScreenSizes.map(filter => ({ type: 'Màn hình', value: filter, setFilter: setFilterScreenSizes })),
      ...filterCPUs.map(filter => ({ type: 'CPU', value: filter, setFilter: setFilterCPUs })),
      ...filterRAMs.map(filter => ({ type: 'RAM', value: filter, setFilter: setFilterRAMs })),
      ...filterROMs.map(filter => ({ type: 'Ổ cứng', value: filter, setFilter: setFilterROMs })),
      ...filterRefreshRates.map(filter => ({ type: 'Tần số quét', value: filter, setFilter: setFilterRefreshRates }))
    ];

    return allActiveFilters.length > 0 ? (
      <div className="mb-3 mt-3">
        <div className="d-flex flex-wrap gap-2">
          {allActiveFilters.map((filter, index) => (
            <Badge key={index} bg="primary" className="rounded-pill d-flex align-items-center p-2">
              {filter.type}: {filter.value}
              <Button 
                variant="link" 
                size="sm" 
                className="text-white ms-2 p-0" 
                onClick={() => filter.setFilter(prev => prev.filter(item => item !== filter.value))}
              >
                <FaTimes size={12} />
              </Button>
            </Badge>
          ))}
          {allActiveFilters.length > 0 && (
            <Button variant="outline-danger" size="sm" onClick={clearFilters}>
              Xóa tất cả bộ lọc
            </Button>
          )}
        </div>
      </div>
    ) : null;
  };

  if (loading) return (
    <div className="container py-5">
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="container py-5">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Có lỗi xảy ra!</h4>
        <p>{error}</p>
        <hr />
        <Button variant="outline-danger" onClick={() => navigate('/')}>
          Quay về trang chủ
        </Button>
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
              <li className="breadcrumb-item active" aria-current="page">Tìm kiếm: "{query}"</li>
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
            <Badge bg="danger" className="rounded-pill">{activeFiltersCount}</Badge>
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
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
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
            handleSearch={handleSearch}
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
                  <div className="d-flex justify-content-md-end align-items-center">
                    <Form.Label htmlFor="sortSelect" className="me-2">Sắp xếp:</Form.Label>
                    <Form.Select 
                      id="sortSelect" 
                      className="w-auto" 
                      value={sortOption} 
                      onChange={handleSortChange}
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          {renderActiveFilters()}

          {sortedProducts.length === 0 ? (
            <Card className="shadow-sm">
              <Card.Body className="text-center p-5">
                <h3 className="text-muted mb-3">Không tìm thấy sản phẩm nào</h3>
                <p>Hãy thử các từ khóa khác hoặc điều chỉnh lại bộ lọc</p>
                <Button variant="primary" className="mt-2" onClick={clearFilters}>
                  Xóa tất cả bộ lọc
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;