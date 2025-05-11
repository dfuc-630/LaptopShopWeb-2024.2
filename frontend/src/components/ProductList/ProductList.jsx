import React from 'react';
import { Card, Button } from 'react-bootstrap';
import ProductCard from '../ProductCard/ProductCard.jsx';

const ProductList = ({ products, clearFilters }) => {
  if (products.length === 0) {
    return (
      <Card className="shadow-sm">
        <Card.Body className="text-center p-5">
          <h3 className="text-muted mb-3">Không tìm thấy sản phẩm nào</h3>
          <p>Hãy thử các từ khóa khác hoặc điều chỉnh lại bộ lọc</p>
          <Button variant="primary" className="mt-2" onClick={clearFilters}>
            Xóa tất cả bộ lọc
          </Button>
        </Card.Body>
      </Card>
    );
  }
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;