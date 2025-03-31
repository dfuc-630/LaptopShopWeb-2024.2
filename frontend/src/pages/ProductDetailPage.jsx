// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart(); // Lấy hàm addToCart từ context
  const navigate = useNavigate(); // Hook để chuyển trang

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1); // State cho số lượng (nếu cần)

  useEffect(() => {
    const fetchedProduct = getProductById(id); // id đã được parseInt trong service
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      if (fetchedProduct.images && fetchedProduct.images.length > 0) {
        setSelectedImage(fetchedProduct.images[0]);
      } else if (fetchedProduct.image) {
         setSelectedImage(fetchedProduct.image); // Fallback nếu chỉ có 1 ảnh
      }
    } else {
        setProduct(null); // Đặt là null nếu không tìm thấy
    }
  }, [id]);

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity); // Thêm sản phẩm hiện tại với số lượng đã chọn
      // Có thể hiển thị thông báo thành công
      console.log(`Đã thêm ${quantity} ${product.name} vào giỏ`);
      // Tùy chọn: Chuyển đến trang giỏ hàng sau khi thêm
      // navigate('/cart');
    }
  };

  // Xử lý Mua ngay (Tạm thời: thêm vào giỏ rồi chuyển đến trang giỏ hàng)
  const handleBuyNow = () => {
     if (product) {
      addToCart(product, quantity);
      navigate('/cart'); // Chuyển đến trang giỏ hàng
    }
  }

  if (!product) {
    return <div className="container my-4">Sản phẩm không tồn tại hoặc đã bị xóa.</div>;
  }

  return (
    <div className="container my-4">
      <div className="row">
        {/* Cột trái: Hình ảnh sản phẩm */}
        <div className="col-md-6 mb-3">
          <div className="card">
            <img
              src={selectedImage || 'https://via.placeholder.com/600x400?text=No+Image'}
              alt={product.name}
              className="card-img-top"
              style={{ maxHeight: '450px', objectFit: 'contain', padding: '20px' }}
            />
            {product.images && product.images.length > 1 && (
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
                    onMouseEnter={() => setSelectedImage(image)} // Thêm hiệu ứng hover
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cột phải: Thông tin sản phẩm */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <div className="d-flex align-items-baseline mb-2">
            <span className="text-danger fs-3 fw-bold me-3">
              {formatCurrency(product.price)} {/* Định dạng giá */}
            </span>
            {product.originalPrice && (
              <span className="text-muted text-decoration-line-through fs-5">
                {formatCurrency(product.originalPrice)} {/* Định dạng giá gốc */}
              </span>
            )}
          </div>
          {product.discount && product.discount > 0 && ( // Kiểm tra discount là số và > 0
            <p className="text-success mb-3">
              <i className="bi bi-tag-fill"></i> Tiết kiệm: {formatCurrency(product.discount)} {/* Định dạng giảm giá */}
            </p>
          )}

          {/* Thông số kỹ thuật */}
          {product.specs && (
            <div className="card mb-3 bg-light border-0">
              <div className="card-body py-2 px-3">
                <h6 className="card-title mb-2">Thông số kỹ thuật chính:</h6>
                <ul className="list-unstyled mb-0" style={{ fontSize: '0.9rem' }}>
                  {product.specs.cpu && <li><i className="bi bi-cpu me-2"></i> {product.specs.cpu}</li>}
                  {product.specs.ram && <li><i className="bi bi-memory me-2"></i> {product.specs.ram}</li>}
                  {product.specs.storage && <li><i className="bi bi-device-hdd me-2"></i> {product.specs.storage}</li>}
                  {product.specs.display && <li><i className="bi bi-display me-2"></i> {product.specs.display}</li>}
                  {product.specs.gpu && <li><i className="bi bi-gpu-card me-2"></i> {product.specs.gpu}</li>}
                </ul>
              </div>
            </div>
          )}

          {/* Tùy chọn bảo hành (Giữ nguyên UI, cần thêm logic nếu muốn) */}
          {/* <div className="mb-3">
            <label className="form-label fw-bold">Chọn gói bảo hành:</label>
            <select className="form-select">
              <option>Mặc định (12 tháng)</option>
              <option>Bảo hành vàng (Rơi vỡ, vào nước) + 800,000 đ</option>
              <option>Bảo hành mở rộng (24 tháng) + 1,500,000 đ</option>
            </select>
          </div> */}

           {/* Chọn số lượng (Ví dụ) */}
           <div className="mb-3">
                <label htmlFor="quantity" className="form-label fw-bold">Số lượng:</label>
                <input
                    type="number"
                    id="quantity"
                    className="form-control"
                    value={quantity}
                    min="1"
                    max="10" // Giới hạn số lượng mua
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
                    style={{ width: '80px' }}
                />
           </div>


          {/* Nút hành động */}
          <div className="d-grid gap-2 d-sm-flex">
            <button
              className="btn btn-danger btn-lg flex-grow-1"
              onClick={handleBuyNow} // Gọi hàm Mua ngay
            >
                <i className="bi bi-cart-check-fill me-2"></i> Mua ngay
            </button>
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={handleAddToCart} // Gọi hàm Thêm vào giỏ
            >
                <i className="bi bi-cart-plus me-2"></i> Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>

      {/* Mô tả sản phẩm */}
      {product.description && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header bg-light">
                 <h5 className="mb-0">Mô tả sản phẩm</h5>
              </div>
              <div className="card-body">
                {/* Sử dụng dangerouslySetInnerHTML nếu description chứa HTML, cần cẩn thận XSS */}
                {/* <div dangerouslySetInnerHTML={{ __html: product.description }}></div> */}
                {/* Hoặc hiển thị như text thông thường */}
                 <p style={{ whiteSpace: 'pre-line' }}>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Sản phẩm liên quan */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="row mt-4">
          <div className="col-12">
            <h5 className="mb-3">Sản phẩm liên quan</h5>
            <div className="row">
              {product.relatedProducts.map(relatedProduct => {
                  // Cần lấy đầy đủ thông tin sản phẩm liên quan từ service nếu cần
                  // Tạm thời chỉ hiển thị dựa trên thông tin có sẵn
                  const relatedProdData = getProductById(relatedProduct.id) || relatedProduct; // Lấy data đầy đủ nếu có
                  return <ProductCard key={relatedProdData.id} product={relatedProdData} />;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;