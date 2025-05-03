import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchProductsByName } from '../services/productService';
import ProductCard from '../components/ProductCard/ProductCard';

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
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy từ khóa từ query parameter
  const query = new URLSearchParams(location.search).get('name') || '';

  // Danh sách các tùy chọn lọc
  const factories = ['Asus', 'Acer', 'Apple', 'HP', 'Lenovo', 'MSI', 'Dell', 'Gigabyte', 'Huawei', 'Masstel', 'VAIO'];
  const priceRanges = [
    'Dưới 10 triệu',
    'Từ 10 - 15 triệu',
    'Từ 15 - 20 triệu',
    'Từ 20 - 25 triệu',
    'Từ 25 - 30 triệu',
    'Trên 30 triệu'
  ];
  const demands = ['Gaming - Đồ họa', 'Sinh viên - Văn phòng', 'Mỏng nhẹ', 'Doanh nhân', 'AI'];
  const screenSizes = ['Dưới 14 inch', 'Từ 14 - 15 inch', 'Từ 15 - 17 inch'];
  const cpus = [
    'Apple M4 series', 'Apple M3 series', 'Apple M2 series', 'Apple M1 series',
    'Intel Celeron', 'Intel Core Ultra', 'Intel Core i7', 'Intel Core i5', 'Intel Core i3',
    'AMD Ryzen 7', 'AMD Ryzen 5'
  ];
  const rams = ['64GB', '48GB', '36GB', '32GB', '24GB', '18GB', '16GB', '12GB', '8GB', '4GB'];
  const roms = ['SSD 2TB', 'SSD 1TB', 'SSD 512GB', 'SSD 256GB', 'SSD 128GB'];
  const refreshRates = ['≤120 Hz', '144 Hz', '165 Hz', '240 Hz'];

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

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?name=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Xử lý thay đổi lựa chọn (checkbox hoặc button)
  const handleFilterChange = (setFilter, value) => {
    return (e) => {
      setFilter(prev => {
        if (e.target.checked) {
          return [...prev, value];
        }
        return prev.filter(item => item !== value);
      });
    };
  };

  // Lọc sản phẩm
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
      filterDemands.length === 0 || filterDemands.includes(product.specs?.Demand || '')
    )
    .filter(product => 
      filterScreenSizes.length === 0 || filterScreenSizes.includes(product.specs?.Screen || '')
    )
    .filter(product => 
      filterCPUs.length === 0 || filterCPUs.includes(product.specs?.CPU || '')
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

  // Xóa tất cả bộ lọc
  const clearFilters = () => {
    setFilterFactories([]);
    setFilterPriceRanges([]);
    setFilterDemands([]);
    setFilterScreenSizes([]);
    setFilterCPUs([]);
    setFilterRAMs([]);
    setFilterROMs([]);
    setFilterRefreshRates([]);
  };

  if (loading) return <div className="text-center my-4">Đang tải...</div>;
  if (error) return <div className="text-danger text-center my-4">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center text-2xl font-weight-bold text-dark">Kết quả tìm kiếm cho: "{query}"</h2>
      <div className="row">
        {/* Sidebar với bộ lọc */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSearch}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Nhập từ khóa tìm kiếm"
                  />
                  <button type="submit" className="btn btn-primary">Tìm</button>
                </div>
              </form>
              {/* Hãng sản xuất */}
              <div className="accordion" id="filterAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFactory">
                    <button className="accordion-button bg-light text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFactory" aria-expanded="true" aria-controls="collapseFactory">
                      Hãng sản xuất
                    </button>
                  </h2>
                  <div id="collapseFactory" className="accordion-collapse collapse show" aria-labelledby="headingFactory" data-bs-parent="#filterAccordion">
                    <div className="accordion-body">
                      <div className="btn-group-vertical w-100" role="group">
                        {factories.map(factory => (
                          <button
                            key={factory}
                            type="button"
                            className={`btn btn-outline-secondary mb-1 ${filterFactories.includes(factory) ? 'btn-primary text-white' : ''}`}
                            onClick={handleFilterChange(setFilterFactories, factory)}
                          >
                            {factory}
                            {filterFactories.includes(factory) && (
                              <span className="ms-2">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Mức giá */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingPrice">
                    <button className="accordion-button bg-light text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePrice" aria-expanded="true" aria-controls="collapsePrice">
                      Mức giá
                    </button>
                  </h2>
                  <div id="collapsePrice" className="accordion-collapse collapse show" aria-labelledby="headingPrice" data-bs-parent="#filterAccordion">
                    <div className="accordion-body">
                      {priceRanges.map(range => (
                        <div className="form-check mb-2" key={range}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`price-${range}`}
                            checked={filterPriceRanges.includes(range)}
                            onChange={handleFilterChange(setFilterPriceRanges, range)}
                          />
                          <label className="form-check-label" htmlFor={`price-${range}`}>{range}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Nhu cầu */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingDemand">
                    <button className="accordion-button bg-light text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDemand" aria-expanded="true" aria-controls="collapseDemand">
                      Nhu cầu
                    </button>
                  </h2>
                  <div id="collapseDemand" className="accordion-collapse collapse show" aria-labelledby="headingDemand" data-bs-parent="#filterAccordion">
                    <div className="accordion-body">
                      {demands.map(demand => (
                        <div className="form-check mb-2" key={demand}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`demand-${demand}`}
                            checked={filterDemands.includes(demand)}
                            onChange={handleFilterChange(setFilterDemands, demand)}
                          />
                          <label className="form-check-label" htmlFor={`demand-${demand}`}>{demand}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Kích thước màn hình */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingScreen">
                    <button className="accordion-button bg-light text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseScreen" aria-expanded="true" aria-controls="collapseScreen">
                      Kích thước màn hình
                    </button>
                  </h2>
                  <div id="collapseScreen" className="accordion-collapse collapse show" aria-labelledby="headingScreen" data-bs-parent="#filterAccordion">
                    <div className="accordion-body">
                      {screenSizes.map(size => (
                        <div className="form-check mb-2" key={size}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`screen-${size}`}
                            checked={filterScreenSizes.includes(size)}
                            onChange={handleFilterChange(setFilterScreenSizes, size)}
                          />
                          <label className="form-check-label" htmlFor={`screen-${size}`}>{size}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Công nghệ CPU */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingCPU">
                    <button className="accordion-button bg-light text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCPU" aria-expanded="true" aria-controls="collapseCPU">
                      Công nghệ CPU
                    </button>
                  </h2>
                  <div id="collapseCPU" className="accordion-collapse collapse show" aria-labelledby="headingCPU" data-bs-parent="#filterAccordion">
                    <div className="accordion-body">
                      {cpus.map(cpu => (
                        <div className="form-check mb-2" key={cpu}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`cpu-${cpu}`}
                            checked={filterCPUs.includes(cpu)}
                            onChange={handleFilterChange(setFilterCPUs, cpu)}
                          />
                          <label className="form-check-label" htmlFor={`cpu-${cpu}`}>{cpu}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* RAM */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingRAM">
                    <button className="accordion-button bg-light text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRAM" aria-expanded="true" aria-controls="collapseRAM">
                      RAM
                    </button>
                  </h2>
                  <div id="collapseRAM" className="accordion-collapse collapse show" aria-labelledby="headingRAM" data-bs-parent="#filterAccordion">
                    <div className="accordion-body">
                      {rams.map(ram => (
                        <div className="form-check mb-2" key={ram}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`ram-${ram}`}
                            checked={filterRAMs.includes(ram)}
                            onChange={handleFilterChange(setFilterRAMs, ram)}
                          />
                          <label className="form-check-label" htmlFor={`ram-${ram}`}>{ram}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Ổ cứng */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingROM">
                    <button className="accordion-button bg-light text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseROM" aria-expanded="true" aria-controls="collapseROM">
                      Ổ cứng
                    </button>
                  </h2>
                  <div id="collapseROM" className="accordion-collapse collapse show" aria-labelledby="headingROM" data-bs-parent="#filterAccordion">
                    <div className="accordion-body">
                      {roms.map(rom => (
                        <div className="form-check mb-2" key={rom}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`rom-${rom}`}
                            checked={filterROMs.includes(rom)}
                            onChange={handleFilterChange(setFilterROMs, rom)}
                          />
                          <label className="form-check-label" htmlFor={`rom-${rom}`}>{rom}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Tần số quét */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingRefresh">
                    <button className="accordion-button bg-light text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRefresh" aria-expanded="true" aria-controls="collapseRefresh">
                      Tần số quét
                    </button>
                  </h2>
                  <div id="collapseRefresh" className="accordion-collapse collapse show" aria-labelledby="headingRefresh" data-bs-parent="#filterAccordion">
                    <div className="accordion-body">
                      {refreshRates.map(rate => (
                        <div className="form-check mb-2" key={rate}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`refresh-${rate}`}
                            checked={filterRefreshRates.includes(rate)}
                            onChange={handleFilterChange(setFilterRefreshRates, rate)}
                          />
                          <label className="form-check-label" htmlFor={`refresh-${rate}`}>{rate}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-secondary w-100 mt-3" onClick={clearFilters}>Xóa tất cả</button>
            </div>
          </div>
        </div>
        {/* Danh sách sản phẩm */}
        <div className="col-md-9">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-danger">Không tìm thấy sản phẩm nào.</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {filteredProducts.map((product) => (
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