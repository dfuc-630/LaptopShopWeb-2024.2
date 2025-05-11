import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';
import { useNavigate, Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatters';
import { ListGroup } from 'react-bootstrap';

const PaymentMethodOption = ({ id, value, label, icon, checked, onChange, disabled, details }) => (
    <div className="form-check border rounded p-3 mb-2">
        <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            id={id}
            value={value}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
        />
        <label
            className="form-check-label d-flex justify-content-between align-items-center w-100"
            htmlFor={id}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
            <div>
                {icon && <img src={icon} alt={value} style={{ height: '20px', marginRight: '10px', verticalAlign: 'middle' }} />}
                <span className={disabled ? 'text-muted' : ''}>{label}</span>
                {details && <small className={`d-block ${disabled ? 'text-body-secondary' : 'text-muted'}`}>{details}</small>}
            </div>
        </label>
    </div>
);

function CheckoutPage() {
    const { user } = useAuth();
    const { cartItems, getCartTotal, clearCart, discountCode, discountAmount, shippingCost, applyDiscount } = useCart();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [shippingType, setShippingType] = useState('delivery');
    const [orderNotes, setOrderNotes] = useState('');
    const [wantsEinvoice, setWantsEinvoice] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [inputDiscountCode, setInputDiscountCode] = useState(discountCode);
    const [applyingDiscount, setApplyingDiscount] = useState(false);
    const [discountError, setDiscountError] = useState('');
    const [discountSuccess, setDiscountSuccess] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [orderError, setOrderError] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(null);

    const subtotal = getCartTotal();
    const totalAmount = subtotal + shippingCost - discountAmount;
    const rewardPoints = Math.floor(totalAmount / 10000);

    useEffect(() => {
        if (cartItems.length === 0 && !isPlacingOrder && !orderSuccess) {
            console.log("CheckoutPage: Giỏ hàng trống, chuyển về trang giỏ hàng.");
            navigate('/cart');
        }
        if (user) {
            setName(prev => prev || user.name || '');
            setPhone(prev => prev || user.phone || '');
            setEmail(prev => prev || user.email || '');
            setAddress(prev => prev || user.address || '');
        }
    }, [cartItems, navigate, isPlacingOrder, orderSuccess, user]);

    const handleApplyDiscountCode = () => {
        setDiscountError('');
        setDiscountSuccess('');
        setApplyingDiscount(true);
        console.log("Đang áp dụng mã:", inputDiscountCode);

        setTimeout(() => {
            const codeUpper = inputDiscountCode.toUpperCase();
            if (codeUpper === 'GIAM10') {
                const calculatedDiscount = subtotal * 0.1;
                applyDiscount(codeUpper, calculatedDiscount, shippingCost);
                setDiscountSuccess("Áp dụng mã giảm giá 10% thành công!");
            } else if (codeUpper === 'FREESHIP') {
                applyDiscount(codeUpper, discountAmount, 0);
                setDiscountSuccess("Áp dụng mã Freeship thành công!");
            } else if (inputDiscountCode) {
                setDiscountError(`Mã giảm giá "${inputDiscountCode}" không hợp lệ hoặc đã hết hạn.`);
                applyDiscount('', 0, shippingCost);
            } else {
                setDiscountError('Vui lòng nhập mã giảm giá.');
            }
            setApplyingDiscount(false);
        }, 1000);
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setOrderError('');
        setIsPlacingOrder(true);
        setOrderSuccess(null);

        if (!name || !phone || (shippingType === 'delivery' && !address)) {
            setOrderError('Vui lòng điền đầy đủ thông tin bắt buộc.');
            setIsPlacingOrder(false);
            return;
        }

        const orderData = {
            userId: user?.id,
            items: cartItems.map(item => ({
                productId: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
            shippingInfo: { name, phone, email, address, shippingType, orderNotes },
            paymentMethod,
            wantsEinvoice,
            subtotal,
            shippingCost,
            discountCode,
            discountAmount,
            totalAmount,
        };

        try {
            console.log("CheckoutPage: Đang gửi đơn hàng:", orderData);
            const createdOrder = await createOrder(orderData);
            setOrderSuccess(createdOrder);
            clearCart();
            console.log("CheckoutPage: Đặt hàng thành công, giỏ hàng đã xóa.");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error("CheckoutPage: Lỗi khi đặt hàng:", error);
            setOrderError(error.message || 'Đặt hàng không thành công. Vui lòng kiểm tra lại thông tin hoặc thử lại sau.');
        } finally {
            setIsPlacingOrder(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className='container my-5 text-center'>
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading"><i className="bi bi-check-circle-fill me-2"></i> Đặt hàng thành công!</h4>
                    <p>Cảm ơn bạn đã tin tưởng và mua hàng tại AE Rọt Shop.</p>
                    <p>Mã đơn hàng của bạn là: <strong>{orderSuccess.orderId}</strong></p>
                    <p>Ngày đặt: {new Date(orderSuccess.orderDate).toLocaleString('vi-VN')}</p>
                    <hr />
                    <p className="mb-0">Chúng tôi sẽ xử lý đơn hàng và liên hệ với bạn trong thời gian sớm nhất.</p>
                </div>
                <Link to="/" className="btn btn-primary me-2 mt-3"><i className="bi bi-house-door me-1"></i> Về trang chủ</Link>
                <Link to="/orders" className="btn btn-outline-secondary mt-3"><i className="bi bi-receipt me-1"></i> Xem lịch sử đơn hàng</Link>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className='container my-5 text-center'>
                <div className="alert alert-info">Giỏ hàng của bạn hiện đang trống.</div>
                <Link to="/" className="btn btn-primary"><i className="bi bi-arrow-left me-1"></i> Quay lại mua sắm</Link>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">Thông tin đặt hàng</h2>
            <form onSubmit={handlePlaceOrder}>
                <div className="row">
                    <div className="col-lg-7 col-xl-8 mb-4 order-lg-1">
                        <div className="card shadow-sm mb-4">
                            <div className="card-header bg-light py-3"><h5 className="mb-0">Thông tin nhận hàng</h5></div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="checkoutName" className="form-label">Họ và tên <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="checkoutName"
                                        placeholder="Nhập họ tên người nhận"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        disabled={isPlacingOrder}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="checkoutPhone" className="form-label">Số điện thoại <span className="text-danger">*</span></label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="checkoutPhone"
                                            placeholder="Nhập số điện thoại"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                            pattern="[0-9]{10,11}"
                                            title="Số điện thoại 10-11 chữ số"
                                            disabled={isPlacingOrder}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="checkoutEmail" className="form-label">Email <span className="text-muted">(Để nhận thông tin đơn hàng)</span></label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="checkoutEmail"
                                            placeholder="Nhập email (không bắt buộc)"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={isPlacingOrder}
                                        />
                                    </div>
                                </div>
                                <label className="form-label">Hình thức nhận hàng <span className="text-danger">*</span></label>
                                <div className="d-flex mb-3">
                                    <div className="form-check form-check-inline border rounded p-2 flex-fill me-2">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="shippingType"
                                            id="shippingDelivery"
                                            value="delivery"
                                            checked={shippingType === 'delivery'}
                                            onChange={(e) => setShippingType(e.target.value)}
                                            disabled={isPlacingOrder}
                                        />
                                        <label className="form-check-label" htmlFor="shippingDelivery"><i className="bi bi-truck me-1"></i> Giao hàng tận nơi</label>
                                    </div>
                                    <div className="form-check form-check-inline border rounded p-2 flex-fill">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="shippingType"
                                            id="shippingPickup"
                                            value="pickup"
                                            checked={shippingType === 'pickup'}
                                            onChange={(e) => setShippingType(e.target.value)}
                                            disabled={isPlacingOrder}
                                        />
                                        <label className="form-check-label" htmlFor="shippingPickup"><i className="bi bi-shop me-1"></i> Nhận tại cửa hàng</label>
                                    </div>
                                </div>
                                {shippingType === 'delivery' && (
                                    <div className="mb-3">
                                        <label htmlFor="checkoutAddress" className="form-label">Địa chỉ nhận hàng <span className="text-danger">*</span></label>
                                        <textarea
                                            className="form-control"
                                            id="checkoutAddress"
                                            rows={3}
                                            placeholder="Nhập địa chỉ chi tiết (Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành)"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required={shippingType === 'delivery'}
                                            disabled={isPlacingOrder}
                                        ></textarea>
                                    </div>
                                )}
                                {shippingType === 'pickup' && (
                                    <div className="mb-3">
                                        <label htmlFor="pickupStore" className="form-label">Chọn cửa hàng <span className="text-danger">*</span></label>
                                        <select className="form-select" id="pickupStore" required={shippingType === 'pickup'} disabled={isPlacingOrder}>
                                            <option value="">Tìm cửa hàng gần bạn...</option>
                                            <option value="store1">AE Rọt Shop - Quận 1</option>
                                            <option value="store2">AE Rọt Shop - Quận 3</option>
                                        </select>
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="orderNotes" className="form-label">Ghi chú <span className="text-muted">(Tùy chọn)</span></label>
                                    <textarea
                                        className="form-control"
                                        id="orderNotes"
                                        rows={2}
                                        placeholder="Ví dụ: Giao hàng trong giờ hành chính, gọi trước khi giao..."
                                        value={orderNotes}
                                        onChange={(e) => setOrderNotes(e.target.value)}
                                        disabled={isPlacingOrder}
                                    ></textarea>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="wantsEinvoice"
                                        checked={wantsEinvoice}
                                        onChange={(e) => setWantsEinvoice(e.target.checked)}
                                        disabled={isPlacingOrder}
                                    />
                                    <label className="form-check-label" htmlFor="wantsEinvoice">Yêu cầu xuất hoá đơn công ty</label>
                                </div>
                                {wantsEinvoice && (
                                    <div className="mt-2 p-2 border rounded bg-light small">
                                        Vui lòng điền thông tin xuất hóa đơn vào phần ghi chú hoặc liên hệ bộ phận CSKH.
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="card shadow-sm">
                            <div className="card-header bg-light py-3"><h5 className="mb-0">Phương thức thanh toán <span className="text-danger">*</span></h5></div>
                            <div className="card-body">
                                <PaymentMethodOption
                                    id="payment-cod"
                                    value="cod"
                                    label="Thanh toán tiền mặt khi nhận hàng"
                                    icon="/images/payment/cod.png"
                                    checked={paymentMethod === 'cod'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    disabled={isPlacingOrder}
                                />
                                <PaymentMethodOption
                                    id="payment-vnpay"
                                    value="vnpay"
                                    label="VNPAY (ATM/Visa/Master/JCB/QR Pay)"
                                    icon="/images/payment/vnpay.png"
                                    checked={paymentMethod === 'vnpay'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    disabled={isPlacingOrder}
                                    details="Thanh toán online bảo mật qua VNPAY"
                                />
                                <PaymentMethodOption
                                    id="payment-momo"
                                    value="momo"
                                    label="Ví MoMo"
                                    icon="/images/payment/momo.png"
                                    checked={paymentMethod === 'momo'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    disabled
                                    details="Chức năng đang phát triển"
                                />
                                <PaymentMethodOption
                                    id="payment-zalopay"
                                    value="zalopay"
                                    label="Ví ZaloPay"
                                    icon="/images/payment/zalopay.png"
                                    checked={paymentMethod === 'zalopay'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    disabled
                                    details="Chức năng đang phát triển"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-xl-4 order-lg-2">
                        <div className="card shadow-sm sticky-lg-top" style={{ top: '20px' }}>
                            <div className="card-header bg-light py-3">
                                <h5 className="mb-0">Tóm tắt đơn hàng</h5>
                            </div>
                            <div className="card-body">
                                <ListGroup variant="flush" className="mb-3">
                                    {cartItems.map((item) => (
                                        <ListGroup.Item key={item.id}>
                                            <div className="d-flex justify-content-between">
                                                <span>{item.name} x {item.quantity}</span>
                                                <span>{formatCurrency(item.price * item.quantity)}</span>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                <div className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Mã giảm giá"
                                        value={inputDiscountCode}
                                        onChange={(e) => {
                                            setInputDiscountCode(e.target.value);
                                            setDiscountError('');
                                            setDiscountSuccess('');
                                        }}
                                        disabled={applyingDiscount || isPlacingOrder}
                                    />
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        type="button"
                                        onClick={handleApplyDiscountCode}
                                        disabled={!inputDiscountCode || applyingDiscount || isPlacingOrder}
                                    >
                                        {applyingDiscount ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        ) : (
                                            'Áp dụng'
                                        )}
                                    </button>
                                </div>
                                {discountError && <div className="alert alert-danger small py-1 px-2 mb-3" role="alert">{discountError}</div>}
                                {discountSuccess && <div className="alert alert-success small py-1 px-2 mb-3" role="alert">{discountSuccess}</div>}
                                <hr className='my-3'/>
                                <div className="d-flex justify-content-between mb-1"><span className="text-muted">Tổng tiền hàng</span><span>{formatCurrency(subtotal)}</span></div>
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="text-muted">Phí vận chuyển</span>
                                    <span className={shippingCost === 0 ? 'text-success' : ''}>{shippingCost === 0 ? 'Miễn phí' : formatCurrency(shippingCost)}</span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="d-flex justify-content-between mb-1 text-success">
                                        <span>Giảm giá</span>
                                        <span>- {formatCurrency(discountAmount)}</span>
                                    </div>
                                )}
                                <hr className='my-2'/>
                                <div className="d-flex justify-content-between fw-bold mb-2"><span>Thanh toán</span><span className="text-danger fs-5">{formatCurrency(totalAmount)}</span></div>
                                <div className="d-flex justify-content-between small text-muted mb-3">
                                    <span>Điểm thưởng (dự kiến)</span>
                                    <span className='text-warning fw-medium'><i className="bi bi-coin"></i> +{rewardPoints}</span>
                                </div>
                                {orderError && <div className="alert alert-danger py-2" role="alert">{orderError}</div>}
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-danger btn-lg"
                                        disabled={isPlacingOrder || cartItems.length === 0}
                                    >
                                        {isPlacingOrder ? (
                                            <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang xử lý...</>
                                        ) : (
                                            `Đặt hàng (${formatCurrency(totalAmount)})`
                                        )}
                                    </button>
                                </div>
                                <p className="text-muted small mt-2 text-center">
                                    Bằng việc Đặt hàng, bạn đồng ý với <Link to="/dieu-khoan" target="_blank" className='text-primary'>Điều khoản sử dụng</Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CheckoutPage;