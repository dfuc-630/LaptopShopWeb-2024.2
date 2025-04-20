// src/components/OrderStatusBadge.jsx
import React from 'react';

/**
 * Component hiển thị trạng thái đơn hàng dưới dạng badge màu.
 * @param {object} props - Props của component.
 * @param {string} props.status - Trạng thái đơn hàng (vd: 'pending', 'processing', 'delivered', 'cancelled').
 * @returns {JSX.Element} - Phần tử span hiển thị badge.
 */
function OrderStatusBadge({ status }) {
    let badgeClass = 'bg-secondary'; // Màu nền mặc định (cho trạng thái không xác định)
    let statusText = 'Không xác định'; // Text mặc định

    // Xác định class và text dựa trên giá trị status (chuyển về chữ thường để không phân biệt hoa/thường)
    switch (status?.toLowerCase()) {
        case 'pending': // Chờ xác nhận/thanh toán
            badgeClass = 'bg-warning text-dark'; // Vàng
            statusText = 'Chờ xử lý';
            break;
        case 'processing': // Đã xác nhận, đang chuẩn bị hàng
            badgeClass = 'bg-info text-dark'; // Xanh dương nhạt
            statusText = 'Đang xử lý';
            break;
        case 'shipped': // Đã giao cho đơn vị vận chuyển
            badgeClass = 'bg-primary'; // Xanh dương đậm
            statusText = 'Đang giao hàng';
            break;
        case 'delivered': // Khách đã nhận hàng
            badgeClass = 'bg-success'; // Xanh lá
            statusText = 'Đã giao hàng';
            break;
        case 'cancelled': // Đơn hàng bị hủy
            badgeClass = 'bg-danger'; // Đỏ
            statusText = 'Đã hủy';
            break;
        case 'failed': // Giao hàng thất bại / Thanh toán thất bại
             badgeClass = 'bg-danger'; // Đỏ
             statusText = 'Thất bại';
             break;
        default: // Trường hợp status không khớp hoặc null/undefined
            badgeClass = 'bg-secondary';
            statusText = status || 'Không rõ'; // Hiển thị status gốc nếu có, nếu không thì 'Không rõ'
    }

    // Trả về thẻ span với các class của Bootstrap badge
    return (
        <span className={`badge rounded-pill ${badgeClass}`}>
            {statusText}
        </span>
    );
}

export default OrderStatusBadge; // Export component để sử dụng ở nơi khác