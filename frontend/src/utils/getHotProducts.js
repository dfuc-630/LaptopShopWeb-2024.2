export const getHotProduct = (products) => {
    if (!products || products.length === 0) return null;
    return [...products].sort((a, b) => (b.sold || 0) - (a.sold || 0))[0];
  };