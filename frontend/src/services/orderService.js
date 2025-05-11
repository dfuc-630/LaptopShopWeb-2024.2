import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

/**
 * Giả lập API tạo đơn hàng mới.
 * @param {object} orderData - Dữ liệu đơn hàng từ frontend.
 * @returns {Promise<object>} - Promise giải quyết với thông tin đơn hàng đã tạo.
 */
export const createOrder = async (orderData) => {
    console.log('[OrderService] POST /api/orders - Sending request:', {
        userId: orderData.userId,
        itemCount: orderData.items?.length,
        totalAmount: orderData.totalAmount
    });

    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await axios.post(`${API_URL}/orders`, orderData);
                console.log('[OrderService] POST /api/orders - Response:', response.data);
                resolve(response.data);
            } catch (error) {
                console.error('[OrderService] POST /api/orders - Error:', error.response?.data?.message || error.message);
                reject(new Error(error.response?.data?.message || 'Không thể tạo đơn hàng.'));
            }
        }, 1500); // Giả lập độ trễ mạng
    });
};

/**
 * Giả lập API lấy danh sách đơn hàng của một người dùng.
 * @param {number | string} userId - ID của người dùng.
 * @returns {Promise<Array>} - Promise giải quyết với mảng các đơn hàng.
 */
export const getOrdersByUserId = async (userId) => {
    console.log(`[OrderService] GET /api/orders/${userId} - Sending request`);

    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await axios.get(`${API_URL}/orders/${userId}`);
                console.log(`[OrderService] GET /api/orders/${userId} - Response: ${response.data.length} orders`, response.data.map(o => ({
                    orderId: o.orderId,
                    status: o.status,
                    totalAmount: o.totalAmount
                })));
                resolve(response.data);
            } catch (error) {
                console.error('[OrderService] GET /api/orders - Error:', error.response?.data?.message || error.message);
                reject(new Error(error.response?.data?.message || 'Không thể lấy danh sách đơn hàng.'));
            }
        }, 800);
    });
};

/**
 * Giả lập API lấy chi tiết một đơn hàng theo ID.
 * @param {string} orderId - Mã đơn hàng.
 * @param {number | string} userId - ID của người dùng.
 * @returns {Promise<object | null>} - Promise giải quyết với object đơn hàng hoặc null.
 */
export const getOrderById = async (orderId, userId) => {
    console.log(`[OrderService] GET /api/orders/${orderId}/${userId} - Sending request`);

    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await axios.get(`${API_URL}/orders/${orderId}/${userId}`);
                console.log(`[OrderService] GET /api/orders/${orderId}/${userId} - Response:`, response.data ? {
                    orderId: response.data.orderId,
                    status: response.data.status,
                    totalAmount: response.data.totalAmount
                } : null);
                resolve(response.data);
            } catch (error) {
                console.error('[OrderService] GET /api/orders - Error:', error.response?.data?.message || error.message);
                reject(new Error(error.response?.data?.message || 'Không thể lấy chi tiết đơn hàng.'));
            }
        }, 600);
    });
};

/**
 * Giả lập API cập nhật trạng thái đơn hàng.
 * @param {string} orderId - Mã đơn hàng.
 * @param {string} status - Trạng thái mới (processing, shipped, delivered, cancelled).
 * @param {number | string} userId - ID của người dùng.
 * @returns {Promise<object | null>} - Promise giải quyết với đơn hàng đã cập nhật hoặc null.
 */
export const updateOrderStatus = async (orderId, status, userId) => {
    console.log(`[OrderService] PATCH /api/orders/${orderId}/${userId}/status - Sending request with status: ${status}`);

    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await axios.patch(`${API_URL}/orders/${orderId}/${userId}/status`, { status });
                console.log(`[OrderService] PATCH /api/orders/${orderId}/${userId}/status - Response:`, response.data ? {
                    orderId: response.data.orderId,
                    newStatus: response.data.status,
                    updatedAt: response.data.updatedAt
                } : null);
                resolve(response.data);
            } catch (error) {
                console.error('[OrderService] PATCH /api/orders - Error:', error.response?.data?.message || error.message);
                reject(new Error(error.response?.data?.message || 'Không thể cập nhật trạng thái đơn hàng.'));
            }
        }, 600);
    });
};

/**
 * Giả lập API hủy đơn hàng.
 * @param {string} orderId - Mã đơn hàng.
 * @param {number | string} userId - ID của người dùng.
 * @returns {Promise<object | null>} - Promise giải quyết với đơn hàng đã hủy hoặc null.
 */
export const cancelOrder = async (orderId, userId) => {
    console.log(`[OrderService] DELETE /api/orders/${orderId}/${userId} - Sending request`);

    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await axios.delete(`${API_URL}/orders/${orderId}/${userId}`);
                console.log(`[OrderService] DELETE /api/orders/${orderId}/${userId} - Response:`, response.data ? {
                    orderId: response.data.orderId,
                    status: response.data.status,
                    updatedAt: response.data.updatedAt
                } : null);
                resolve(response.data);
            } catch (error) {
                console.error('[OrderService] DELETE /api/orders - Error:', error.response?.data?.message || error.message);
                reject(new Error(error.response?.data?.message || 'Không thể hủy đơn hàng.'));
            }
        }, 600);
    });
};