// src/components/ShoppingCart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import hook context
import { formatCurrency } from '../utils/formatters'; // Import hàm định dạng

function ShoppingCart() {
  // Lấy state và các hàm cần thiết từ context
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
    getCartItemCount
  } = useCart();

  // Tính tổng tiền
  const totalCartPrice = getCartTotal();
  // --- Các hàm xử lý sự kiện ---
  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleIncreaseQuantity = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = (item) => {
    // Chỉ giảm nếu số lượng > 1, nếu không thì không làm gì hoặc xóa (tùy logic)
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
        // Optional: Hoặc có thể xóa luôn nếu giảm về 0
        // removeFromCart(item.id);
    }
  };

   const handleQuantityChange = (item, event) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= 1) {
            updateQuantity(item.id, newQuantity);
        }
   };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Giỏ hàng của bạn</h2>
      {cartItems.length === 0 ? (
        <div className="text-center p-5 border rounded bg-light">
           <i className="bi bi-cart-x" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
           <p className="text-muted mt-3">Giỏ hàng của bạn đang trống.</p>
           <Link to="/" className="btn btn-primary">Tiếp tục mua sắm</Link>
        </div>

      ) : (
        <div className="row">
          {/* Cột trái: Danh sách sản phẩm */}
          <div className="col-lg-8 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Sản phẩm ({cartItems.length})</h5>
                 {/* Nút xóa tất cả (tùy chọn) */}
                 <button
                     className="btn btn-outline-danger btn-sm"
                     onClick={clearCart}
                     disabled={cartItems.length === 0} // Disable nếu giỏ trống
                 >
                     <i className="bi bi-trash me-1"></i> Xóa tất cả
                 </button>
              </div>
              <div className="list-group list-group-flush">
                {cartItems.map(item => (
                  <div key={item.id} className="list-group-item px-3 py-3">
                    <div className="row align-items-center">
                      {/* Hình ảnh */}
                      <div className="col-auto">
                        <Link to={`/product/${item.id}`}>
                          <img
                            src={item.image || 'https://via.placeholder.com/80'}
                            alt={item.name}
                            className="img-fluid rounded"
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                          />
                        </Link>
                      </div>
                      {/* Tên sản phẩm */}
                      <div className="col">
                        <Link to={`/product/${item.id}`} className="text-decoration-none text-dark fw-medium">
                          {item.name}
                        </Link>
                        {/* Giá đơn vị */}
                        <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>
                            Đơn giá: {formatCurrency(item.price)}
                        </p>
                         {/* Nút xóa mobile (hiện ở màn hình nhỏ) */}
                         <button
                            className="btn btn-link text-danger p-0 d-md-none"
                            onClick={() => handleRemoveItem(item.id)}
                            style={{ fontSize: '0.9rem' }}
                         >
                           <i className="bi bi-trash"></i> Xóa
                         </button>
                      </div>
                      {/* Số lượng */}
                      <div className="col-md-3 d-flex align-items-center justify-content-md-end mt-2 mt-md-0">
                        <button
                          className="btn btn-outline-secondary btn-sm px-2"
                          onClick={() => handleDecreaseQuantity(item)}
                          disabled={item.quantity <= 1} // Disable nút giảm nếu SL=1
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        {/* <span className="mx-2">{item.quantity}</span> */}
                         <input
                            type="number"
                            className="form-control form-control-sm text-center mx-1"
                            value={item.quantity}
                            min="1"
                            onChange={(e) => handleQuantityChange(item, e)}
                            style={{ width: '50px' }}
                            aria-label={`Số lượng ${item.name}`}
                         />
                        <button
                          className="btn btn-outline-secondary btn-sm px-2"
                          onClick={() => handleIncreaseQuantity(item)}
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                       {/* Thành tiền */}
                       <div className="col-md-2 text-md-end fw-medium mt-2 mt-md-0">
                            {formatCurrency(item.price * item.quantity)}
                       </div>

                      {/* Nút xóa desktop */}
                      <div className="col-auto d-none d-md-block">
                        <button
                          className="btn btn-link text-danger p-0"
                          title="Xóa sản phẩm"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <i className="bi bi-trash fs-5"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cột phải: Thông tin tổng quan */}
          <div className="col-lg-4">
            <div className="card shadow-sm sticky-lg-top" style={{ top: '80px' }}> {/* Thêm sticky */}
              <div className="card-body">
                <h5 className="card-title mb-3">Tổng cộng</h5>
                {/* Mã giảm giá (UI ví dụ) */}
                {/* <div className="input-group mb-3">
                     <input type="text" className="form-control" placeholder="Nhập mã giảm giá" />
                     <button className="btn btn-outline-secondary" type="button">Áp dụng</button>
                </div>
                <hr /> */}

                <div className="d-flex justify-content-between mb-2">
                  <span>Tạm tính ({getCartItemCount()} sản phẩm)</span>
                  {/* Sử dụng hàm getCartTotal từ context và format */}
                  <span>{formatCurrency(totalCartPrice)}</span>
                </div>
                 {/* Có thể thêm các dòng khác như Phí vận chuyển, Giảm giá */}
                 {/* <div className="d-flex justify-content-between mb-2">
                     <span>Phí vận chuyển</span>
                     <span>Miễn phí</span>
                 </div>
                 <div className="d-flex justify-content-between mb-3 text-success">
                     <span>Giảm giá</span>
                     <span>- {formatCurrency(0)}</span> // Cần logic tính giảm giá
                 </div> */}
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Tổng tiền</span>
                  <span className="text-danger">
                    {formatCurrency(totalCartPrice)} {/* Hiển thị tổng cuối cùng */}
                  </span>
                </div>
                 <div className="d-grid mt-3">
                    <button className="btn btn-danger btn-lg">
                       Tiến hành đặt hàng
                    </button>
                 </div>
                 <div className="text-center mt-2">
                    <Link to="/" className="text-decoration-none">
                       <i className="bi bi-arrow-left me-1"></i> Tiếp tục mua sắm
                    </Link>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;