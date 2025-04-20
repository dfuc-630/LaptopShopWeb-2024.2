// src/pages/OrdersPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrdersByUserId } from '../services/orderService';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatters';
import OrderStatusBadge from '../components/OrderStatusBadge';


function OrdersPage() {
    const { user } = useAuth(); // Lấy thông tin người dùng đang đăng nhập
    const [orders, setOrders] = useState([]); // State lưu danh sách đơn hàng
    const [loading, setLoading] = useState(true); // State trạng thái tải
    const [error, setError] = useState(''); // State lỗi

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.id) {
                setError('Vui lòng đăng nhập để xem lịch sử đơn hàng.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError('');
                const fetchedOrders = await getOrdersByUserId(user.id); // Gọi service lấy đơn hàng
                setOrders(fetchedOrders);
            } catch (err) {
                console.error("OrdersPage: Lỗi khi tải đơn hàng:", err);
                setError(err.message || 'Không thể tải lịch sử đơn hàng. Vui lòng thử lại.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]); // Chạy lại khi user thay đổi (ví dụ: sau khi đăng nhập)

    // --- Render UI ---

    // 1. Trạng thái đang tải
    if (loading) {
        return (
            <div className="container text-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Đang tải lịch sử đơn hàng...</p>
            </div>
        );
    }

    // 2. Trạng thái lỗi
    if (error) {
        return (
            <div className="container my-4">
                <div className="alert alert-danger" role="alert">{error}</div>
                {!user && <Link to="/" className="btn btn-primary">Về trang chủ</Link>} {/* Nút về trang chủ nếu lỗi do chưa đăng nhập */}
            </div>
        );
    }

    // 3. Không có đơn hàng nào
    if (orders.length === 0) {
        return (
            <div className="container my-5 text-center">
                <i className="bi bi-receipt fs-1 text-muted"></i>
                <h4 className="mt-3">Bạn chưa có đơn hàng nào.</h4>
                <p className="text-muted">Hãy bắt đầu mua sắm ngay!</p>
                <Link to="/" className="btn btn-primary"> <i className="bi bi-cart-plus me-1"></i> Mua hàng ngay</Link>
            </div>
        );
    }

    // 4. Hiển thị danh sách đơn hàng
    return (
        <div className="container my-4">
            <h2 className="mb-4">Lịch sử đơn hàng</h2>
            <div className="list-group shadow-sm">
                {orders.map(order => (
                    <div key={order.orderId} className="list-group-item list-group-item-action p-3 mb-2 border rounded">
                        <div className="row align-items-center gy-2"> {/* gy-2 thêm khoảng cách dọc trên mobile */}
                            {/* Thông tin chính */}
                            <div className="col-md-4">
                                <h6 className="mb-1">Mã đơn hàng: <Link to={`/orders/${order.orderId}`} className="fw-bold text-decoration-none text-primary">{order.orderId}</Link></h6>
                                <small className="text-muted">Ngày đặt: {new Date(order.orderDate).toLocaleString('vi-VN')}</small>
                            </div>
                            {/* Trạng thái */}
                            <div className="col-6 col-md-2 text-md-center">
                                <OrderStatusBadge status={order.status} />
                            </div>
                            {/* Tổng tiền */}
                            <div className="col-6 col-md-3 text-end text-md-start">
                                <span className="fw-bold">{formatCurrency(order.totalAmount)}</span>
                            </div>
                            {/* Nút xem chi tiết */}
                            <div className="col-12 col-md-3 text-md-end">
                                <Link to={`/orders/${order.orderId}`} className="btn btn-outline-primary btn-sm">
                                    Xem chi tiết <i className="bi bi-chevron-right small"></i>
                                </Link>
                                {/* Có thể thêm nút Mua lại ở đây */}
                            </div>
                        </div>
                        {/* Có thể thêm phần xem nhanh sản phẩm nếu muốn */}
                         {/* <hr className='my-2 d-md-none' />
                         <div className="mt-2 small d-md-none">
                             {order.items.slice(0, 2).map(item => item.name).join(', ')}
                             {order.items.length > 2 ? '...' : ''}
                         </div> */}
                    </div>
                ))}
            </div>
            {/* Có thể thêm phân trang cho đơn hàng nếu cần */}
        </div>
    );
}

export default OrdersPage;