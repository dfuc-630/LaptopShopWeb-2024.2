// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import ProductCard from '../components/ProductCard';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchedProduct = getProductById(id);
    setProduct(fetchedProduct);
    if (fetchedProduct && fetchedProduct.images.length > 0) {
      setSelectedImage(fetchedProduct.images[0]);
    }
  }, [id]);

  if (!product) {
    return <div className="container my-4">Sản phẩm không tồn tại.</div>;
  }

  return (
    <div className="container my-4">
      <div className="row">
        {/* Cột trái: Hình ảnh sản phẩm */}
        <div className="col-md-6">
          <div className="card">
            <img
              src={selectedImage}
              alt={product.name}
              className="card-img-top"
              style={{ height: '400px', objectFit: 'contain' }}
            />
            <div className="card-body d-flex">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index}`}
                  className="img-thumbnail me-2"
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: selectedImage === image ? '2px solid #dc3545' : 'none',
                  }}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Cột phải: Thông tin sản phẩm */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <div className="d-flex align-items-center mb-2">
            <span className="text-danger fs-4 me-3">{product.price}</span>
            {product.originalPrice && (
              <span className="text-muted text-decoration-line-through">
                {product.originalPrice}
              </span>
            )}
          </div>
          {product.discount && (
            <p className="text-success mb-2">Khuyến mãi: Giảm {product.discount}</p>
          )}

          {/* Thông số kỹ thuật */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Thông số kỹ thuật</h5>
              <ul className="list-unstyled">
                <li><strong>CPU:</strong> {product.specs.cpu}</li>
                <li><strong>RAM:</strong> {product.specs.ram}</li>
                <li><strong>Ổ cứng:</strong> {product.specs.storage}</li>
                <li><strong>Màn hình:</strong> {product.specs.display}</li>
                <li><strong>Card đồ họa:</strong> {product.specs.gpu}</li>
              </ul>
            </div>
          </div>

          {/* Tùy chọn bảo hành */}
          <div className="mb-3">
            <label className="form-label">Chọn gói bảo hành:</label>
            <select className="form-select">
              <option>Không chọn gói bảo hành</option>
              <option>12 tháng - 800,000 đ</option>
              <option>24 tháng - 1,500,000 đ</option>
            </select>
          </div>

          {/* Nút hành động */}
          <div className="d-flex gap-2">
            <button className="btn btn-danger flex-grow-1">Mua ngay</button>
            <button className="btn btn-outline-primary">Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>

      {/* Mô tả sản phẩm */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Mô tả sản phẩm</h5>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      <div className="row mt-4">
        <div className="col-12">
          <h5>Sản phẩm liên quan</h5>
          <div className="row">
            {product.relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;