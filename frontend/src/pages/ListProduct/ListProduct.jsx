// src/pages/HomePage.jsx
import React from 'react';
import { getAllProducts } from '../../services/productService';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useQuery } from '@tanstack/react-query';

function ListProduct() {
  const {data: products, isLoading, error} = useQuery({
    queryKey: ['allProducts'],
    queryFn: getAllProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false, // Khong tự động refetch khi chuyển tab
    retry: 2
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container my-4">
      <h2 className="mb-4">Danh sách sản phẩm</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Không có sản phẩm nào để hiển thị</p>
        )}
      </div>
    </div>
  );
}

export default ListProduct;