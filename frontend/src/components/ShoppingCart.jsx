// src/components/ShoppingCart.jsx
import React, { useState } from 'react'; // Thêm useState
import { Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';
import { Container } from 'react-bootstrap'; // Sử dụng Container từ React Bootstrap
// Import thêm các component từ React Bootstrap
import { Card, ListGroup, Button, Row, Col, InputGroup, Form, Alert, Spinner } from 'react-bootstrap';

function ShoppingCart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
    getCartItemCount,
  } = useCart();
  const navigate = useNavigate(); // Hook để điều hướng

  const handleCheckout = () => {
      console.log("Proceeding to checkout...");
      // Điều hướng đến trang checkout thay vì alert
      navigate('/checkout');
  }

  // State cho mã giảm giá và các chi phí/giảm giá khác (tạm thời)
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0); // Số tiền được giảm
  const [shippingCost, setShippingCost] = useState(0); // Phí vận chuyển (tạm = 0)
  const [applyingDiscount, setApplyingDiscount] = useState(false); // Trạng thái đang áp dụng mã
  const [discountError, setDiscountError] = useState(''); // Lỗi mã giảm giá

  // Tính toán các giá trị
  const subtotal = getCartTotal(); // Tạm tính
  const finalTotal = subtotal + shippingCost - discountAmount; // Tổng tiền cuối cùng

  // --- Các hàm xử lý sự kiện ---
  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleIncreaseQuantity = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

   const handleQuantityChange = (item, event) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= 1) {
            updateQuantity(item.id, newQuantity);
        }
   };

   // Hàm giả lập áp dụng mã giảm giá
   const handleApplyDiscountCode = () => {
     setDiscountError('');
     setApplyingDiscount(true);
     console.log("Attempting to apply discount code:", discountCode);
     // --- Logic giả lập ---
     setTimeout(() => {
         if (discountCode.toUpperCase() === 'GIAM10') {
             const calculatedDiscount = subtotal * 0.1; // Giảm 10%
             setDiscountAmount(calculatedDiscount);
             console.log("Applied 10% discount:", calculatedDiscount);
             alert("Áp dụng mã giảm giá 10% thành công!");
         } else if (discountCode.toUpperCase() === 'FREESHIP') {
             // Tạm thời chưa xử lý logic phí ship phức tạp
             setShippingCost(0); // Demo freeship
             console.log("Applied Freeship (set cost to 0)");
              alert("Áp dụng mã Freeship thành công!");
         } else if (discountCode) {
             setDiscountError(`Mã giảm giá "${discountCode}" không hợp lệ.`);
             console.log("Invalid discount code");
             setDiscountAmount(0); // Reset giảm giá nếu mã sai
         } else {
             // Không làm gì nếu không nhập mã
             setDiscountError('Vui lòng nhập mã giảm giá.');
         }
         setApplyingDiscount(false);
     }, 1000); // Giả lập 1 giây xử lý
   };

   // --- Render UI ---
  return (
    <Container className="my-4"> {/* Sử dụng Container thay div */}
      <h2 className="mb-4">Giỏ hàng của bạn</h2>
      {cartItems.length === 0 ? (
        <div className="text-center p-5 border rounded bg-light">
           <i className="bi bi-cart-x" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
           <p className="text-muted mt-3">Giỏ hàng của bạn đang trống.</p>
           <Link to="/" className="btn btn-primary">Tiếp tục mua sắm</Link>
        </div>
      ) : (
        <Row> {/* Sử dụng Row của React Bootstrap */}
          {/* Cột trái: Danh sách sản phẩm */}
          <Col lg={8} className="mb-4">
            <Card className="shadow-sm">
              <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Sản phẩm ({getCartItemCount()})</h5>
                 <Button
                     variant="outline-danger"
                     size="sm"
                     onClick={clearCart}
                     disabled={cartItems.length === 0}
                 >
                     <i className="bi bi-trash me-1"></i> Xóa tất cả
                 </Button>
              </Card.Header>
              <ListGroup variant="flush">
                {cartItems.map(item => (
                  <ListGroup.Item key={item.id} className="px-3 py-3">
                    <Row className="align-items-center">
                      {/* Ảnh */}
                      <Col xs={3} sm={2}>
                        <Link to={`/product/${item.id}`}>
                          <img
                            src={item.image || 'https://via.placeholder.com/80'}
                            alt={item.name}
                            className="img-fluid rounded"
                            style={{ /*width: '80px',*/ height: '80px', objectFit: 'contain' }}
                          />
                        </Link>
                      </Col>
                      {/* Tên & Giá đơn vị */}
                      <Col xs={9} sm={4} md={5}>
                        <Link to={`/product/${item.id}`} className="text-decoration-none text-dark fw-medium d-block mb-1" style={{ fontSize: '0.9rem' }}>
                          {item.name}
                        </Link>
                        <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                            {formatCurrency(item.price)}
                        </p>
                      </Col>
                      {/* Số lượng */}
                      <Col xs={7} sm={4} md={3} className="d-flex align-items-center justify-content-start justify-content-sm-center mt-2 mt-sm-0">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="px-2"
                          onClick={() => handleDecreaseQuantity(item)}
                          disabled={item.quantity <= 1}
                          aria-label={`Giảm số lượng ${item.name}`}
                        >
                          <i className="bi bi-dash"></i>
                        </Button>
                         <Form.Control
                            type="number"
                            size="sm"
                            className="text-center mx-1"
                            value={item.quantity}
                            min="1"
                            onChange={(e) => handleQuantityChange(item, e)}
                            style={{ width: '50px' }}
                            aria-label={`Số lượng ${item.name}`}
                         />
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="px-2"
                          onClick={() => handleIncreaseQuantity(item)}
                           aria-label={`Tăng số lượng ${item.name}`}
                        >
                          <i className="bi bi-plus"></i>
                        </Button>
                      </Col>
                      {/* Thành tiền & Nút xóa */}
                      <Col xs={5} sm={2} md={2} className="text-end mt-2 mt-sm-0">
                         <span className="fw-medium d-block mb-1">{formatCurrency(item.price * item.quantity)}</span>
                         <Button
                           variant="link"
                           className="text-danger p-0"
                           size="sm"
                           title="Xóa sản phẩm"
                           onClick={() => handleRemoveItem(item.id)}
                         >
                           <i className="bi bi-trash"></i> <span className="d-none d-md-inline">Xóa</span>
                         </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>

          {/* Cột phải: Thông tin thanh toán */}
          <Col lg={4}>
            <Card className="shadow-sm sticky-lg-top" style={{ top: '80px' }}>
               <Card.Header className="bg-light">
                   <h5 className="mb-0">Thông tin thanh toán</h5>
               </Card.Header>
              <Card.Body>
                {/* --- Mã giảm giá --- */}
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Nhập mã giảm giá (VD: GIAM10)"
                    aria-label="Mã giảm giá"
                    value={discountCode}
                    onChange={(e) => {
                        setDiscountCode(e.target.value);
                        setDiscountError(''); // Xóa lỗi khi người dùng gõ
                    }}
                    disabled={applyingDiscount}
                  />
                  <Button
                    variant="outline-primary" // Đổi màu nút áp dụng
                    onClick={handleApplyDiscountCode}
                    disabled={!discountCode || applyingDiscount}
                  >
                    {applyingDiscount ? (
                         <>
                             <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                             <span className="visually-hidden">Đang áp dụng...</span>
                         </>
                    ) : (
                      'Áp dụng'
                    )}
                  </Button>
                </InputGroup>
                 {discountError && <Alert variant="danger" size="sm" className="py-1 px-2">{discountError}</Alert>}
                 {discountAmount > 0 && !discountError && <Alert variant="success" size="sm" className="py-1 px-2">Đã áp dụng mã giảm giá!</Alert>}


                <hr />

                {/* --- Chi tiết giá --- */}
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Tạm tính:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Phí vận chuyển:</span>
                  {/* Placeholder, cần logic tính phí vận chuyển thực tế */}
                  <span>{shippingCost === 0 ? 'Miễn phí' : formatCurrency(shippingCost)}</span>
                </div>

                {/* Chỉ hiển thị dòng giảm giá nếu có discountAmount > 0 */}
                {discountAmount > 0 && (
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>Giảm giá:</span>
                    <span>- {formatCurrency(discountAmount)}</span>
                  </div>
                )}

                <hr />

                {/* --- Tổng tiền cuối cùng --- */}
                <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                  <span>Tổng cộng:</span>
                  <span className="text-danger">
                    {formatCurrency(finalTotal)}
                  </span>
                </div>

                {/* --- Nút Thanh toán --- */}
                 <div className="d-grid">
                    <Button
                       variant="danger"
                       size="lg"
                       onClick={handleCheckout}
                       disabled={cartItems.length === 0} // Disable nếu giỏ trống
                    >
                       Tiến hành đặt hàng
                    </Button>
                 </div>

                 {/* --- Link Tiếp tục mua sắm --- */}
                 <div className="text-center mt-3">
                    <Link to="/" className="text-decoration-none text-primary">
                       <i className="bi bi-arrow-left me-1"></i> Tiếp tục lựa chọn sản phẩm
                    </Link>
                 </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ShoppingCart;