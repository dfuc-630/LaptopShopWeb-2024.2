// src/pages/OrderDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getOrderById } from '../services/orderService';
import { formatCurrency } from '../utils/formatters';
import OrderStatusBadge from '../components/OrderStatusBadge';

// --- Component Chi tiết Đơn hàng ---
function OrderDetailPage() {
    const { orderId } = useParams(); // Lấy orderId từ URL
    const { user } = useAuth();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null); // State lưu chi tiết đơn hàng
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrderDetail = async () => {
            if (!user?.id) {
                setError("Vui lòng đăng nhập để xem chi tiết đơn hàng.");
                setLoading(false);
                return;
            }
            if (!orderId) {
                setError("Mã đơn hàng không hợp lệ.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError('');
                console.log(`OrderDetailPage: Fetching details for orderId: ${orderId}, userId: ${user.id}`);
                const fetchedOrder = await getOrderById(orderId, user.id); // Gọi service lấy chi tiết

                if (fetchedOrder) {
                    setOrder(fetchedOrder);
                    console.log("OrderDetailPage: Order details fetched:", fetchedOrder);
                } else {
                    setError("Không tìm thấy đơn hàng hoặc bạn không có quyền xem đơn hàng này.");
                    console.log("OrderDetailPage: Order not found or permission denied.");
                }
            } catch (err) {
                console.error("OrderDetailPage: Lỗi khi tải chi tiết đơn hàng:", err);
                setError(err.message || "Không thể tải chi tiết đơn hàng.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [orderId, user, navigate]); // Phụ thuộc vào orderId và user

    // --- Render UI ---
    if (loading) {
        return (
            <div className="container text-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Đang tải chi tiết đơn hàng...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container my-4">
                <div className="alert alert-danger" role="alert">{error}</div>
                <Link to="/orders" className="btn btn-secondary"> <i className="bi bi-arrow-left"></i> Quay lại danh sách</Link>
            </div>
        );
    }

    if (!order) {
        // Trường hợp này ít xảy ra nếu error được xử lý đúng, nhưng để chắc chắn
        return (
            <div className="container my-4">
                <div className="alert alert-warning" role="alert">Không tìm thấy thông tin đơn hàng.</div>
                 <Link to="/orders" className="btn btn-secondary"> <i className="bi bi-arrow-left"></i> Quay lại danh sách</Link>
            </div>
        );
    }

    // Hiển thị chi tiết đơn hàng
    const { shippingInfo, items, paymentMethod, status, orderDate, totalAmount, subtotal, shippingCost, discountAmount, discountCode } = order;

    return (
        <div className="container my-4">
            <nav aria-label="breadcrumb" style={{'--bs-breadcrumb-divider': "'>'"}}>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                    <li className="breadcrumb-item"><Link to="/orders">Đơn hàng của tôi</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Chi tiết đơn hàng #{orderId}</li>
                </ol>
            </nav>

            <h2 className="mb-4">Chi tiết đơn hàng: <span className="text-primary">{orderId}</span></h2>

            <div className="row g-4">
                {/* --- Cột Trái: Thông tin giao hàng & thanh toán --- */}
                <div className="col-lg-5">
                    {/* Thông tin chung */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Thông tin chung</h5>
                            <p className="mb-1"><strong>Ngày đặt:</strong> {new Date(orderDate).toLocaleString('vi-VN')}</p>
                            <p className="mb-1"><strong>Trạng thái:</strong> <OrderStatusBadge status={status} /></p>
                            <p className="mb-0"><strong>Tổng tiền:</strong> <span className="fw-bold text-danger fs-5">{formatCurrency(totalAmount)}</span></p>
                        </div>
                    </div>

                    {/* Thông tin giao hàng */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-light"> <h5 className="mb-0">Thông tin giao hàng</h5> </div>
                        <div className="card-body">
                            <p className="mb-1"><strong>Người nhận:</strong> {shippingInfo.name}</p>
                            <p className="mb-1"><strong>Điện thoại:</strong> {shippingInfo.phone}</p>
                            {shippingInfo.email && <p className="mb-1"><strong>Email:</strong> {shippingInfo.email}</p>}
                            <p className="mb-1"><strong>Hình thức:</strong> {shippingInfo.shippingType === 'delivery' ? 'Giao tận nơi' : 'Nhận tại cửa hàng'}</p>
                            {shippingInfo.shippingType === 'delivery' && <p className="mb-1"><strong>Địa chỉ:</strong> {shippingInfo.address}</p>}
                            {shippingInfo.shippingType === 'pickup' && <p className="mb-1"><strong>Cửa hàng:</strong> {/* TODO: Hiển thị tên cửa hàng */} Cửa hàng AE Rọt Shop - Quận 1 (Ví dụ)</p>}
                            {shippingInfo.orderNotes && <p className="mb-0 pt-2 border-top mt-2"><strong>Ghi chú:</strong> <span className='text-muted fst-italic'>{shippingInfo.orderNotes}</span></p>}
                        </div>
                    </div>

                    {/* Thông tin thanh toán */}
                    <div className="card shadow-sm">
                         <div className="card-header bg-light"> <h5 className="mb-0">Thông tin thanh toán</h5> </div>
                         <div className="card-body">
                             <p className="mb-1"><strong>Phương thức:</strong>
                                {paymentMethod === 'cod' && ' Thanh toán khi nhận hàng (COD)'}
                                {paymentMethod === 'vnpay' && ' Đã thanh toán qua VNPAY'}
                                {paymentMethod === 'momo' && ' Đã thanh toán qua MoMo'}
                                {paymentMethod === 'zalopay' && ' Đã thanh toán qua ZaloPay'}
                                {/* Thêm các phương thức khác */}
                             </p>
                              {/* Có thể thêm trạng thái thanh toán nếu backend trả về */}
                              <p className="mb-1"><strong>Tổng tiền hàng:</strong> {formatCurrency(subtotal)}</p>
                              <p className="mb-1"><strong>Phí vận chuyển:</strong> {formatCurrency(shippingCost)}</p>
                              {discountAmount > 0 && <p className="mb-1 text-success"><strong>Giảm giá ({discountCode || 'Khuyến mãi'}):</strong> -{formatCurrency(discountAmount)}</p>}
                              <hr className="my-2"/>
                              <p className="mb-0 fw-bold"><strong>Tổng thanh toán:</strong> <span className="text-danger fs-5">{formatCurrency(totalAmount)}</span></p>
                         </div>
                    </div>
                </div>

                {/* --- Cột Phải: Danh sách sản phẩm --- */}
                <div className="col-lg-7">
                    <div className="card shadow-sm">
                        <div className="card-header bg-light"> <h5 className="mb-0">Sản phẩm trong đơn hàng ({items.length})</h5> </div>
                        <div className="card-body p-0"> {/* p-0 để table chiếm hết */}
                            <div className="table-responsive">
                                <table className="table table-hover mb-0 align-middle">
                                    <thead>
                                        <tr className='table-light'>
                                            <th scope="col" colSpan="2">Sản phẩm</th>
                                            <th scope="col" className="text-center">Số lượng</th>
                                            <th scope="col" className="text-end">Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, index) => (
                                            <tr key={item.productId + '-' + index}> {/* Thêm index để key unique nếu có thể trùng productId */}
                                                <td style={{width: '70px'}}>
                                                    <Link to={`/product/${item.productId}`}>
                                                        {/* Cần lấy ảnh từ item hoặc gọi API lấy ảnh */}
                                                        <img src={item.image || 'https://via.placeholder.com/60'} alt={item.name} className="img-fluid rounded" style={{maxHeight: '60px', objectFit: 'contain'}}/>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link to={`/product/${item.productId}`} className="text-decoration-none text-dark">
                                                        {item.name}
                                                    </Link>
                                                    <p className="small text-muted mb-0">{formatCurrency(item.price)}</p>
                                                </td>
                                                <td className="text-center">{item.quantity}</td>
                                                <td className="text-end fw-medium">{formatCurrency(item.price * item.quantity)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* Có thể thêm các nút hành động khác như "Mua lại", "Yêu cầu hỗ trợ" */}
                    <div className="mt-3 text-end">
                         <Link to="/orders" className="btn btn-secondary me-2"> <i className="bi bi-arrow-left"></i> Quay lại danh sách</Link>
                         {/* <button className='btn btn-primary' disabled={status === 'delivered' || status === 'cancelled'}>Mua lại đơn hàng</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailPage;