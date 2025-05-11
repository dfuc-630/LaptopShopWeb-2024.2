import React from 'react';
import { Accordion, Button, Card, Form } from 'react-bootstrap';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { factories, priceRanges, demands, screenSizes, cpus, rams, roms, refreshRates } from '../../constants/filterOptions';

const FilterSidebar = ({
  filterFactories, setFilterFactories,
  filterPriceRanges, setFilterPriceRanges,
  filterDemands, setFilterDemands,
  filterScreenSizes, setFilterScreenSizes,
  filterCPUs, setFilterCPUs,
  filterRAMs, setFilterRAMs,
  filterROMs, setFilterROMs,
  filterRefreshRates, setFilterRefreshRates,
  clearFilters, setShowFiltersMobile
}) => {
  const handleFilterChange = (setFilter, value) => {
    return () => {
      setFilter(prev => {
        if (prev.includes(value)) {
          return prev.filter(item => item !== value);
        }
        return [...prev, value];
      });
    };
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <FaFilter className="me-2" /> Bộ lọc
        </h5>
        <Button 
          variant="light" 
          size="sm" 
          className="d-md-none"
          onClick={() => setShowFiltersMobile(false)}
        >
          <FaTimes />
        </Button>
      </Card.Header>
      <Card.Body>
        <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Hãng sản xuất</Accordion.Header>
            <Accordion.Body className="p-2">
              <div className="d-flex flex-wrap gap-1">
                {factories.map(factory => (
                  <Button
                    key={factory}
                    variant={filterFactories.includes(factory) ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={handleFilterChange(setFilterFactories, factory)}
                  >
                    {factory}
                  </Button>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Mức giá</Accordion.Header>
            <Accordion.Body className="p-2">
              {priceRanges.map(range => (
                <Form.Check
                  key={range}
                  type="checkbox"
                  id={`price-${range}`}
                  label={range}
                  checked={filterPriceRanges.includes(range)}
                  onChange={handleFilterChange(setFilterPriceRanges, range)}
                  className="mb-2"
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Nhu cầu sử dụng</Accordion.Header>
            <Accordion.Body className="p-2">
              <div className="d-flex flex-wrap gap-1">
                {demands.map(demand => (
                  <Button
                    key={demand}
                    variant={filterDemands.includes(demand) ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={handleFilterChange(setFilterDemands, demand)}
                  >
                    {demand}
                  </Button>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>Kích thước màn hình</Accordion.Header>
            <Accordion.Body className="p-2">
              {screenSizes.map(size => (
                <Form.Check
                  key={size}
                  type="checkbox"
                  id={`screen-${size}`}
                  label={size}
                  checked={filterScreenSizes.includes(size)}
                  onChange={handleFilterChange(setFilterScreenSizes, size)}
                  className="mb-2"
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>Công nghệ CPU</Accordion.Header>
            <Accordion.Body className="p-2">
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {cpus.map(cpu => (
                  <Form.Check
                    key={cpu}
                    type="checkbox"
                    id={`cpu-${cpu}`}
                    label={cpu}
                    checked={filterCPUs.includes(cpu)}
                    onChange={handleFilterChange(setFilterCPUs, cpu)}
                    className="mb-2"
                  />
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>RAM</Accordion.Header>
            <Accordion.Body className="p-2">
              <div className="d-flex flex-wrap gap-1">
                {rams.map(ram => (
                  <Button
                    key={ram}
                    variant={filterRAMs.includes(ram) ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={handleFilterChange(setFilterRAMs, ram)}
                  >
                    {ram}
                  </Button>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="6">
            <Accordion.Header>Ổ cứng</Accordion.Header>
            <Accordion.Body className="p-2">
              <div className="d-flex flex-wrap gap-1">
                {roms.map(rom => (
                  <Button
                    key={rom}
                    variant={filterROMs.includes(rom) ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={handleFilterChange(setFilterROMs, rom)}
                  >
                    {rom}
                  </Button>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="7">
            <Accordion.Header>Tần số quét</Accordion.Header>
            <Accordion.Body className="p-2">
              <div className="d-flex flex-wrap gap-1">
                {refreshRates.map(rate => (
                  <Button
                    key={rate}
                    variant={filterRefreshRates.includes(rate) ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={handleFilterChange(setFilterRefreshRates, rate)}
                  >
                    {rate}
                  </Button>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Button variant="danger" className="w-100 mt-3" onClick={clearFilters}>
          <FaTimes className="me-1" /> Xóa tất cả bộ lọc
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FilterSidebar;