// src/services/orderService.js

// Mảng giả lập lưu trữ các đơn hàng đã tạo
const orders = [];
let nextOrderId = 1;

/**
 * Giả lập API tạo đơn hàng mới.
 * @param {object} orderData - Dữ liệu đơn hàng từ frontend.
 * @returns {Promise<object>} - Promise giải quyết với thông tin đơn hàng đã tạo (vd: orderId).
 */
export const createOrder = async (orderData) => {
  console.log('OrderService: Attempting to create order with data:', orderData);
  return new Promise((resolve, reject) => {
    setTimeout(() => { // Giả lập độ trễ mạng
      try {
        // --- Validate dữ liệu cơ bản (Backend sẽ validate kỹ hơn) ---
        if (!orderData.userId || !orderData.items || orderData.items.length === 0 || !orderData.shippingInfo || !orderData.paymentMethod || !orderData.totalAmount) {
           console.error('OrderService: Invalid order data received.');
           return reject(new Error('Dữ liệu đơn hàng không hợp lệ.'));
        }

        const newOrder = {
          orderId: `AERSHOP-${Date.now()}-${nextOrderId++}`, // Tạo mã đơn hàng duy nhất
          ...orderData,
          status: 'pending', // Trạng thái ban đầu
          orderDate: new Date().toISOString(),
        };

        orders.push(newOrder);
        console.log('OrderService: Order created successfully:', newOrder);
        console.log('OrderService: Current orders:', orders); // Log toàn bộ đơn hàng (chỉ để demo)

        // Chỉ trả về thông tin cần thiết cho frontend sau khi tạo
        resolve({
            orderId: newOrder.orderId,
            orderDate: newOrder.orderDate,
            totalAmount: newOrder.totalAmount
        });

      } catch (error) {
          console.error('OrderService: Error creating order', error);
          reject(new Error('Đã xảy ra lỗi khi tạo đơn hàng.'));
      }
    }, 1500); // 1.5 giây độ trễ
  });
};