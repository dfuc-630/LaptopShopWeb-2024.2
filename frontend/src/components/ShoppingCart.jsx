// src/components/ShoppingCart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ShoppingCart() {
  const { products, setProducts } = useCart();

  // Xóa sản phẩm
  const removeProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // Cập nhật số lượng
  const updateQuantity = (id, delta) => {
    setProducts(
      products.map(product =>
        product.id === id
          ? { ...product, quantity: Math.max(1, (product.quantity || 1) + delta) }
          : product
      )
    );
  };

  // Tính tổng tiền
  const totalPrice = products.reduce((total, product) => {
    const price = parseInt(product.price.replace(/[^0-9]/g, ''));
    return total + price * (product.quantity || 1);
  }, 0);

  return (
    <div className="container my-4">
      <div className="row">
        {/* Cột trái: Danh sách sản phẩm */}
        <div className="col-lg-8">
          <h2 className="mb-3">Giỏ hàng</h2>
          {products.length === 0 ? (
            <p className="text-muted">Giỏ hàng của bạn đang trống.</p>
          ) : (
            products.map(product => (
              <div key={product.id} className="card mb-3">
                <div className="card-body d-flex align-items-center">
                  {/* Hình ảnh sản phẩm */}
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid me-3 rounded"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                  </Link>
                  {/* Thông tin sản phẩm */}
                  <div className="flex-grow-1">
                    <Link to={`/product/${product.id}`} className="text-decoration-none">
                      <h5 className="card-title mb-1 text-dark">{product.name}</h5>
                    </Link>
                    <p className="text-muted mb-1">Hãng: {product.factory}</p>
                    <p className="text-muted mb-1">{product.shortDesc}</p>
                    <p className="text-danger mb-1">{product.price}</p>
                    <div className="d-flex align-items-center mb-1">
                      <button
                        className="btn btn-outline-secondary btn-sm me-2"
                        onClick={() => updateQuantity(product.id, -1)}
                      >
                        -
                      </button>
                      <span>{product.quantity || 1}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm ms-2"
                        onClick={() => updateQuantity(product.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <a href="#" className="text-danger text-decoration-none">
                        Chọn gói bảo hành
                      </a>
                    </div>
                    <p className="text-muted mb-0">Đã bán: {product.sold}</p>
                    <p className="text-muted mb-0">Dành cho: {product.target}</p>
                  </div>
                  {/* Nút xóa */}
                  <button
                    className="btn btn-link text-danger"
                    onClick={() => removeProduct(product.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cột phải: Thông tin tổng quan */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Thông tin đơn hàng</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Tổng tiền hàng</span>
                <span>{totalPrice.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Khuyến mãi</span>
                <span>9,300,000 đ</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Cần thanh toán</span>
                <span className="text-danger fw-bold">
                  {(totalPrice - 9300000).toLocaleString('vi-VN')} đ
                </span>
              </div>
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="loyaltyDiscount"
                />
                <label className="form-check-label" htmlFor="loyaltyDiscount">
                  Ưu đãi cho khách hàng thân thiết
                </label>
              </div>
              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="redeemPoints" />
                <label className="form-check-label" htmlFor="redeemPoints">
                  Đổi điểm (0 điểm - 0 đ)
                </label>
              </div>
              <button className="btn btn-danger w-100">Xác nhận</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;