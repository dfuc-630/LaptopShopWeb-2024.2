import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrdersByUserId, getOrderById, cancelOrder } from '../services/orderService';
import { formatCurrency } from '../utils/formatters';

function OrdersPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [cancelLoading, setCancelLoading] = useState({}); // Theo dõi trạng thái loading khi hủy

    // Lấy danh sách đơn hàng khi component mount
    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.id) {
                setError('Vui lòng đăng nhập để xem đơn hàng.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const userOrders = await getOrdersByUserId(user.id);
                setOrders(userOrders);
                setError('');
            } catch (err) {
                setError(err.message || 'Không thể tải danh sách đơn hàng.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    // Xem chi tiết đơn hàng
    const handleViewOrder = async (orderId) => {
        try {
            const order = await getOrderById(orderId, user.id);
            setSelectedOrder(order);
        } catch (err) {
            setError(err.message || 'Không thể tải chi tiết đơn hàng.');
        }
    };

    // Hủy đơn hàng
    const handleCancelOrder = async (orderId) => {
        setCancelLoading(prev => ({ ...prev, [orderId]: true }));
        try {
            const updatedOrder = await cancelOrder(orderId, user.id);
            if (updatedOrder) {
                setOrders(orders.map(order =>
                    order.orderId === orderId ? updatedOrder : order
                ));
                if (selectedOrder?.orderId === orderId) {
                    setSelectedOrder(updatedOrder);
                }
            }
        } catch (err) {
            setError(err.message || 'Không thể hủy đơn hàng.');
        } finally {
            setCancelLoading(prev => ({ ...prev, [orderId]: false }));
        }
    };

    // Xử lý trạng thái đơn hàng để hiển thị
    const getStatusText = (status) => {
        switch (status) {
            case 'processing': return 'Đang xử lý';
            case 'shipped': return 'Đang giao';
            case 'delivered': return 'Đã giao';
            case 'cancelled': return 'Đã hủy';
            default: return status;
        }
    };

    if (!user) {
        return <div className="container my-5">Vui lòng đăng nhập để xem đơn hàng.</div>;
    }

    return (
        <div className="container my-5">
            <h2>Lịch sử đơn hàng</h2>

            {loading && <div className="alert alert-info">Đang tải...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && orders.length === 0 && !error && (
                <p>Chưa có đơn hàng nào.</p>
            )}

            {orders.length > 0 && (
                <div className="row">
                    {/* Danh sách đơn hàng */}
                    <div className="col-md-6">
                        <ul className="list-group">
                            {orders.map(order => (
                                <li
                                    key={order.orderId}
                                    className={`list-group-item ${selectedOrder?.orderId === order.orderId ? 'active' : ''}`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleViewOrder(order.orderId)}
                                >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="mb-1"><strong>Mã đơn:</strong> {order.orderId}</p>
                                            <p className="mb-1"><strong>Ngày đặt:</strong> {new Date(order.orderDate).toLocaleString('vi-VN')}</p>
                                            <p className="mb-1"><strong>Tổng tiền:</strong> {formatCurrency(order.totalAmount)}</p>
                                            <p className="mb-0"><strong>Trạng thái:</strong> {getStatusText(order.status)}</p>
                                        </div>
                                        {order.status === 'processing' && (
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Ngăn click vào li
                                                    handleCancelOrder(order.orderId);
                                                }}
                                                disabled={cancelLoading[order.orderId]}
                                            >
                                                {cancelLoading[order.orderId] ? 'Đang hủy...' : 'Hủy đơn'}
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Chi tiết đơn hàng */}
                    <div className="col-md-6">
                        {selectedOrder ? (
                            <div className="card">
                                <div className="card-header">
                                    <h5>Chi tiết đơn hàng: {selectedOrder.orderId}</h5>
                                </div>
                                <div className="card-body">
                                    <p><strong>Ngày đặt:</strong> {new Date(selectedOrder.orderDate).toLocaleString('vi-VN')}</p>
                                    <p><strong>Trạng thái:</strong> {getStatusText(selectedOrder.status)}</p>
                                    <p><strong>Phương thức thanh toán:</strong> {selectedOrder.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'VNPay'}</p>
                                    <p><strong>Tổng tiền:</strong> {formatCurrency(selectedOrder.totalAmount)}</p>

                                    <h6>Thông tin giao hàng</h6>
                                    <p><strong>Tên:</strong> {selectedOrder.shippingInfo.name}</p>
                                    <p><strong>Số điện thoại:</strong> {selectedOrder.shippingInfo.phone}</p>
                                    <p><strong>Email:</strong> {selectedOrder.shippingInfo.email || 'N/A'}</p>
                                    <p><strong>Địa chỉ:</strong> {selectedOrder.shippingInfo.address || 'Nhận tại cửa hàng'}</p>
                                    <p><strong>Ghi chú:</strong> {selectedOrder.shippingInfo.orderNotes || 'N/A'}</p>

                                    <h6>Sản phẩm</h6>
                                    <ul className="list-group">
                                        {selectedOrder.items.map(item => (
                                            <li key={item.productId} className="list-group-item">
                                                <p><strong>{item.name}</strong></p>
                                                <p>Số lượng: {item.quantity}</p>
                                                <p>Đơn giá: {formatCurrency(item.price)}</p>
                                                <p>Tổng: {formatCurrency(item.price * item.quantity)}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <p>Chọn một đơn hàng để xem chi tiết.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrdersPage;