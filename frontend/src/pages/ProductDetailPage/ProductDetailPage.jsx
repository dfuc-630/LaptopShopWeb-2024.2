import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, generateFactoryDescription, getAllProducts } from '../../services/productService';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import DOMPurify from 'dompurify';

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sameFactoryProducts, setSameFactoryProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await getProductById(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setSelectedImage(fetchedProduct.images?.[0] || fetchedProduct.image || 'https://via.placeholder.com/600x400?text=No+Image');

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

          // Lấy các sản phẩm cùng loại (cùng factory)
          const allProducts = await getAllProducts();
          const filtered = allProducts.filter(
            (p) => p.factory === fetchedProduct.factory && p.id !== fetchedProduct.id
          );
          setSameFactoryProducts(filtered.slice(0, 4));
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

  //Them vao gio hang
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      console.log(`Đã thêm ${quantity} ${product.name} vào giỏ`);
    }
  };

  // Mua ngay
  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  // Check so luong trong kho
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > product?.quantity) {
      alert(`Số lượng tối đa là ${product.quantity}`);
      setQuantity(product.quantity);
    } else {
      setQuantity(value || 1);
    }
  };

  // Thong so ki thuat
  const getCategoryIcon = (category) => {
    const icons = {
      CPU: 'bi-cpu',
      RAM: 'bi-memory',
      ROM: 'bi-device-hdd',
      Screen: 'bi-display',
      GPU: 'bi-gpu-card',
      Battery: 'bi-battery-full',
      Weight: 'bi-box2',
      OS: 'bi-windows',
      Camera: 'bi-camera',
    };
    return icons[category] || 'bi-info-circle';
  };

  // Render loading, error, or not found states
  if (loading) 
    return <div className="container my-4">Đang tải...</div>;
  if (error) 
    return <div className="container my-4">{error}</div>;
  if (!product) 
    return <div className="container my-4">Sản phẩm không tồn tại hoặc đã bị xóa.</div>;

  // Tạo mô tả chi tiết cho nhà sản xuất
  const factoryDescription = product.factory ? generateFactoryDescription(product.factory) : '';

  // Tách mô tả thành 2 phần: phần đầu luôn hiển thị, phần sau chỉ hiện khi mở rộng
  const splitTitles = [
    'Cấu hình cực mạnh', // Lenovo
    'Cấu hình mạnh mẽ – đáp ứng mọi nhu cầu công việc', // Macbook
    'Cấu hình khủng – chiến mượt mọi tựa game từ eSports đến AAA', // Asus
    'Cấu hình mạnh mẽ – chiến mượt mọi tựa game', // Acer
  ];
  let firstPart = factoryDescription;
  let secondPart = '';
  for (const title of splitTitles) {
    if (factoryDescription.includes(title)) {
      const idx = factoryDescription.indexOf(title) + title.length;
      firstPart = factoryDescription.slice(0, idx);
      secondPart = factoryDescription.slice(idx);
      break;
    }
  }

  // Check if specs exist
  const hasSpecs = product.specs && Object.keys(product.specs).length > 0;

  return (
    <div className="container my-4">
      <div className="row">
        {/* Cot trai: Anh san pham */}
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm">
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
              </div>            )}
          </div>
          
          {/* Chính sách sản phẩm */}
          <div className="policy-section mt-3">
            <div className="card border-0">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-shield-check fs-4 text-primary me-2"></i>
                      <div>
                        <div className="fw-medium">Hàng chính hãng - Bảo hành 24 tháng</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-truck fs-4 text-primary me-2"></i>
                      <div>
                        <div className="fw-medium">Giao hàng miễn phí toàn quốc</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-tools fs-4 text-primary me-2"></i>
                      <div>
                        <div className="fw-medium">Hỗ trợ cài đặt miễn phí</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-headset fs-4 text-primary me-2"></i>                      <div>
                        <div className="fw-medium">Kỹ thuật viên hỗ trợ trực tuyến</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tìm hiểu thêm button */}
                <div className="text-center mt-3">                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate('/chinh-sach')}
                  >
                    Tìm hiểu thêm <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Product details */}
        <div className="col-md-6">
          <h2 className="product-title-detail ">{product.name}</h2>
          <p className="text-muted mb-2">{product.shortDesc}</p>
          
          <div className="d-flex align-items-baseline mb-2">
            <span className="text-danger fs-3 fw-bold me-3">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-muted text-decoration-line-through fs-5">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
          {/* Giam gia */}
          {product.discount > 0 && (
            <p className="text-success mb-3">
              <i className="bi bi-tag-fill"></i> Tiết kiệm: {formatCurrency(product.discount)}
            </p>
          )}

          {/* Technical specifications - Enhanced version */}
          {hasSpecs && (
            <div className="specs-section mb-4">
              <div className="card spec-card border-0">
                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                  <h6 className="m-0">
                    <i className="bi bi-gear me-2"></i>
                    Thông số kỹ thuật
                  </h6>
                  {product.target && (
                    <span className="badge bg-primary">
                      <i className="bi bi-bullseye me-1"></i>
                      {product.target}
                    </span>
                  )}
                </div>
                <div className="card-body py-3">
                  <div className="row">
                    {Object.entries(product.specs).map(([key, value], index) => (
                      <div key={index} className="col-md-6 mb-2">
                        <div className="spec-item d-flex align-items-center">
                          <div className="spec-icon">
                            <i className={`bi ${getCategoryIcon(key)} fs-5`}></i>
                          </div>
                          <div className="spec-details ms-2">
                            <div className="spec-name text-muted small">{key}</div>
                            <div className="spec-value fw-medium">{value}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Factory info card */}
          {product.factory && (
            <div className="factory-info mt-4">
              <div className="card border-0 bg-light">
                <div className="card-body py-2">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-building fs-4 me-2 text-primary"></i>
                    <div>
                      <div className="text-muted small">Nhà sản xuất</div>
                      <div className="fw-medium">{product.factory}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* So luong trong kho va da ban*/}
          <div className="d-flex my-3">
            <div className="me-4">
              <i className="bi bi-box-seam me-1"></i> Còn lại: <span className="fw-medium">{product.quantity} sản phẩm</span>
            </div>
            <div>
              <i className="bi bi-cart-check me-1"></i> Đã bán: <span className="fw-medium">{product.sold || 0}</span>
            </div>
          </div>

          {/* So luong mua */}
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
      </div>      {/* Product description */}
      {factoryDescription && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="card product-description shadow-sm">
              <div className="card-header bg-light">
                <h5 className="mb-0">Mô tả sản phẩm</h5>
              </div>
              <div className="card-body">
                <div className="factory-description">
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{
                      __html: (firstPart + (isExpanded ? secondPart : '')).replace(/<input[^>]*>/gi, ''),
                    }}
                  />
                </div>
                <button
                  className={`btn-expand-collapse ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <span>{isExpanded ? 'Thu gọn' : 'Xem thêm'}</span>
                  <i className="bi bi-chevron-down ms-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sản phẩm cùng loại */}
      {sameFactoryProducts.length > 0 && (
        <div className="row mt-4 mb-5">
          <div className="col-12">
            <h5 className="mb-3 text-uppercase text-primary">Sản phẩm cùng loại</h5>
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {sameFactoryProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
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