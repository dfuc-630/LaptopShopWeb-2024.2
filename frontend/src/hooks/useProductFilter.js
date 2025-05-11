import { useState, useMemo } from 'react';

const extractRAMValue = (ramString) => {
  if (!ramString || typeof ramString !== 'string') return '';
  const match = ramString.match(/(\d+\s*GB)/i);
  return match ? match[1].replace(/\s+/g, '') : '';
};

const extractScreenSize = (displayString) => {
  if (!displayString || typeof displayString !== 'string') return null;
  const normalized = displayString.replace(',', '.').replace(/['"inch]+/g, '').trim();
  const value = parseFloat(normalized);
  return isNaN(value) ? null : value;
};

const extractRefreshRate = (refreshRateString) => {
  if (!refreshRateString || typeof refreshRateString !== 'string') return null;
  // Loại bỏ khoảng trắng và "Hz", chuẩn hóa dấu phẩy thành dấu chấm
  const normalized = refreshRateString.replace(/\s*Hz/i, '').replace(',', '.').trim();
  const value = parseFloat(normalized);
  return isNaN(value) ? null : value;
};

export const useProductFilter = (initialProducts = []) => {
  const [filterFactories, setFilterFactories] = useState([]);
  const [filterPriceRanges, setFilterPriceRanges] = useState([]);
  const [filterDemands, setFilterDemands] = useState([]);
  const [filterScreenSizes, setFilterScreenSizes] = useState([]);
  const [filterCPUs, setFilterCPUs] = useState([]);
  const [filterRAMs, setFilterRAMs] = useState([]);
  const [filterROMs, setFilterROMs] = useState([]);
  const [filterRefreshRates, setFilterRefreshRates] = useState([]);
  const [sortOption, setSortOption] = useState('default');

  const filteredProducts = useMemo(() => {
    return initialProducts
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
        filterDemands.length === 0 || filterDemands.includes(product.target)
      )
      .filter(product => {
        if (filterScreenSizes.length === 0) return true;
        const screenSize = extractScreenSize(product.specs?.display);
        if (screenSize === null) return false;
        return filterScreenSizes.some(range => {
          switch (range) {
            case 'Dưới 14 inch': return screenSize < 14;
            case 'Từ 14 đến 16 inch': return screenSize >= 14 && screenSize <= 16;
            case 'Trên 16 inch': return screenSize > 16;
            default: return true;
          }
        });
      })
      .filter(product => 
        filterCPUs.length === 0 || filterCPUs.includes(product.specs?.CPU || '')
      )
      .filter(product => {
        if (filterRAMs.length === 0) return true;
        const ramValue = extractRAMValue(product.specs?.RAM);
        return filterRAMs.includes(ramValue);
      })
      .filter(product => 
        filterROMs.length === 0 || filterROMs.includes(product.specs?.ROM || '')
      )
      .filter(product => {
        if (filterRefreshRates.length === 0) return true;
        const refreshRate = extractRefreshRate(product.specs?.RefreshRate);
        if (refreshRate === null) return false; // Loại sản phẩm nếu tần số quét không hợp lệ
        return filterRefreshRates.some(range => {
          switch (range) {
            case 'Dưới 100Hz': return refreshRate < 100;
            case 'Từ 100 đến 144Hz': return refreshRate >= 100 && refreshRate <= 144;
            case 'Trên 144Hz': return refreshRate > 144;
            default: return true;
          }
        });
      });
  }, [
    initialProducts,
    filterFactories,
    filterPriceRanges,
    filterDemands,
    filterScreenSizes,
    filterCPUs,
    filterRAMs,
    filterROMs,
    filterRefreshRates,
  ]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortOption) {
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
  }, [filteredProducts, sortOption]);

  const activeFiltersCount = useMemo(() => {
    return (
      filterFactories.length +
      filterPriceRanges.length +
      filterDemands.length +
      filterScreenSizes.length +
      filterCPUs.length +
      filterRAMs.length +
      filterROMs.length +
      filterRefreshRates.length
    );
  }, [
    filterFactories,
    filterPriceRanges,
    filterDemands,
    filterScreenSizes,
    filterCPUs,
    filterRAMs,
    filterROMs,
    filterRefreshRates,
  ]);

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

  return {
    filteredProducts,
    sortedProducts,
    activeFiltersCount,
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
    sortOption,
    setSortOption,
    clearFilters,
  };
};