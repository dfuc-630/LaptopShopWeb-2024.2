import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

const ActiveFilters = ({
  filterFactories,
  setFilterFactories,
  filterPriceRanges,
  setFilterPriceRanges,
  filterDemands,
  setFilterDemands,
  filterScreenSizes,
  setFilterScreenSizes,
  filterCPUs,
  setFilterCPUs,
  filterRAMs,
  setFilterRAMs,
  filterROMs,
  setFilterROMs,
  filterRefreshRates,
  setFilterRefreshRates,
  clearFilters,
}) => {
  const allActiveFilters = [
    ...filterFactories.map(filter => ({ type: 'Hãng sản xuất', value: filter, setFilter: setFilterFactories })),
    ...filterPriceRanges.map(filter => ({ type: 'Mức giá', value: filter, setFilter: setFilterPriceRanges })),
    ...filterDemands.map(filter => ({ type: 'Nhu cầu', value: filter, setFilter: setFilterDemands })),
    ...filterScreenSizes.map(filter => ({ type: 'Màn hình', value: filter, setFilter: setFilterScreenSizes })),
    ...filterCPUs.map(filter => ({ type: 'CPU', value: filter, setFilter: setFilterCPUs })),
    ...filterRAMs.map(filter => ({ type: 'RAM', value: filter, setFilter: setFilterRAMs })),
    ...filterROMs.map(filter => ({ type: 'Ổ cứng', value: filter, setFilter: setFilterROMs })),
    ...filterRefreshRates.map(filter => ({ type: 'Tần số quét', value: filter, setFilter: setFilterRefreshRates })),
  ];

  if (allActiveFilters.length === 0) return null;

  return (
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
        <Button variant="outline-danger" size="sm" onClick={clearFilters}>
          Xóa tất cả bộ lọc
        </Button>
      </div>
    </div>
  );
};

export default ActiveFilters;