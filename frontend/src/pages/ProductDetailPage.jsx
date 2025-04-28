// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, generateFactoryDescription } from '../services/productService';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';
import DOMPurify from 'dompurify';

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await getProductById(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setSelectedImage(fetchedProduct.images?.[0] || fetchedProduct.image || 'https://via.placeholder.com/600x400?text=No+Image');

          // Fetch related products if available
          if (fetchedProduct.relatedProducts?.length > 0) {
            const relatedPromises = fetchedProduct.relatedProducts.map((rel) =>
              getProductById(rel.id)
            );
            const relatedData = await Promise.all(relatedPromises);
            setProduct((prev) => ({
              ...prev,
              relatedProducts: relatedData.filter((p) => p !== null),
            }));
          }
        } else {
          setProduct(null);
        }
      } catch (err) {
        setError('Không thể tải sản phẩm. Vui lòng thử lại sau.');
        console.error('Lỗi khi tải sản phẩm:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle adding to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      console.log(`Đã thêm ${quantity} ${product.name} vào giỏ`);
    }
  };

  // Handle buy now
  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  // Handle quantity change with inventory check
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > product?.quantity) {
      alert(`Số lượng tối đa là ${product.quantity}`);
      setQuantity(product.quantity);
    } else {
      setQuantity(value || 1);
    }
  };

  // Render loading, error, or not found states
  if (loading) return <div className="container my-4">Đang tải...</div>;
  if (error) return <div className="container my-4">{error}</div>;
  if (!product) return <div className="container my-4">Sản phẩm không tồn tại hoặc đã bị xóa.</div>;

  // Tạo mô tả động từ factory chỉ khi render trang chi tiết
  const factoryDescription = product.factory ? generateFactoryDescription(product.factory) : '';

  return (
    <div className="container my-4">
      <div className="row">
        {/* Left column: Product images */}
        <div className="col-md-6 mb-3">
          <div className="card">
            <img
              src={selectedImage}
              alt={product.name}
              className="card-img-top"
              style={{ maxHeight: '450px', objectFit: 'contain', padding: '20px' }}
            />
            {product.images?.length > 1 && (
              <div className="card-body d-flex flex-wrap justify-content-center p-2">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="img-thumbnail m-1"
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: selectedImage === image ? '2px solid #dc3545' : '1px solid #ddd',
                    }}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column: Product details */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <div className="d-flex align-items-baseline mb-2">
            <span className="text-danger fs-3 fw-bold me-3">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-muted text-decoration-line-through fs-5">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
          {product.discount > 0 && (
            <p className="text-success mb-3">
              <i className="bi bi-tag-fill"></i> Tiết kiệm: {formatCurrency(product.discount)}
            </p>
          )}
          <p className="text-muted mb-2">
            <i className="bi bi-box-seam me-1"></i> Còn lại: {product.quantity} sản phẩm
          </p>
          <p className="text-muted mb-3">
            <i className="bi bi-cart-check me-1"></i> Đã bán: {product.sold || 0}
          </p>

          {/* Technical specifications */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="card mb-3 bg-light border-0">
              <div className="card-body py-2 px-3">
                <h6 className="card-title mb-2">Thông số kỹ thuật chính:</h6>
                <ul className="list-unstyled mb-0" style={{ fontSize: '0.9rem' }}>
                  {/* Can tach ra sau nay */}
                  {product.description}
                  {/* ----------------  */}
                  {product.specs.cpu && (
                    <li>
                      <i className="bi bi-cpu me-2"></i> {product.specs.cpu}
                    </li>
                  )}
                  {product.specs.ram && (
                    <li>
                      <i className="bi bi-memory me-2"></i> {product.specs.ram}
                    </li>
                  )}
                  {product.specs.storage && (
                    <li>
                      <i className="bi bi-device-hdd me-2"></i> {product.specs.storage}
                    </li>
                  )}
                  {product.specs.display && (
                    <li>
                      <i className="bi bi-display me-2"></i> {product.specs.display}
                    </li>
                  )}
                  {product.specs.gpu && (
                    <li>
                      <i className="bi bi-gpu-card me-2"></i> {product.specs.gpu}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Quantity input */}
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label fw-bold">
              Số lượng:
            </label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              value={quantity}
              min="1"
              max={product.quantity}
              onChange={handleQuantityChange}
              style={{ width: '80px' }}
            />
          </div>

          {/* Action buttons */}
          <div className="d-grid gap-2 d-sm-flex">
            <button className="btn btn-danger btn-lg flex-grow-1" onClick={handleBuyNow}>
              <i className="bi bi-cart-check-fill me-2"></i> Mua ngay
            </button>
            <button className="btn btn-outline-primary btn-lg" onClick={handleAddToCart}>
              <i className="bi bi-cart-plus me-2"></i> Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>

      {/* Product description */}
      {factoryDescription && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="card product-description">
              <div className="card-header bg-light">
                <h5 className="mb-0">Mô tả sản phẩm</h5>
              </div>
              <div className="card-body">
                {factoryDescription && (
                  <div
                    className="factory-description"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(factoryDescription),
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related products */}
      {product.relatedProducts?.length > 0 && (
        <div className="row mt-4">
          <div className="col-12">
            <h5 className="mb-3">Sản phẩm liên quan</h5>
            <div className="row">
              {product.relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;