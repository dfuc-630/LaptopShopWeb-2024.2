// src/services/orderService.js

// Mảng giả lập lưu trữ các đơn hàng đã tạo
// const orders = [];
let nextOrderId = 1;

/**
 * Giả lập API tạo đơn hàng mới.
 * @param {object} orderData - Dữ liệu đơn hàng từ frontend.
 * @returns {Promise<object>} - Promise giải quyết với thông tin đơn hàng đã tạo (vd: orderId).
 */
export const createOrder = async (orderData) => {
  console.log('OrderService: Attempting to create order with data:', orderData);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
          if (!orderData.userId || !orderData.items || orderData.items.length === 0 || !orderData.shippingInfo || !orderData.paymentMethod || orderData.totalAmount === undefined) {
          console.error('OrderService: Invalid order data received:', orderData);
          return reject(new Error('Dữ liệu đơn hàng không hợp lệ. Thiếu thông tin cần thiết.'));
          }

          const newOrder = {
          orderId: `AERSHOP-${Date.now()}-${nextOrderId++}`, // Sử dụng nextOrderId đã cập nhật
          userId: orderData.userId,
          items: orderData.items,
          shippingInfo: orderData.shippingInfo,
          paymentMethod: orderData.paymentMethod,
          wantsEinvoice: orderData.wantsEinvoice,
          subtotal: orderData.subtotal,
          shippingCost: orderData.shippingCost,
          discountCode: orderData.discountCode,
          discountAmount: orderData.discountAmount,
          totalAmount: orderData.totalAmount,
          status: 'processing',
          orderDate: new Date().toISOString(),
          };

          orders.push(newOrder);
          console.log('OrderService: Order created successfully:', newOrder);

          resolve({
              orderId: newOrder.orderId,
              orderDate: newOrder.orderDate,
              totalAmount: newOrder.totalAmount
          });

      } catch (error) {
          console.error('OrderService: Error creating order', error);
          reject(new Error('Đã xảy ra lỗi khi tạo đơn hàng.'));
      }
      }, 1500);
  });
};
// --- DỮ LIỆU ĐƠN HÀNG GIẢ LẬP ---
const orders = [
  // Đơn hàng 1: Đã giao, nhiều sản phẩm, COD
  {
      orderId: 'AERSHOP-1700000000000-1',
      userId: 1, // ID của user 'user@example.com' trong authService
      items: [
          { productId: 1, name: "Laptop Lenovo Gaming LOQ 15ARP9", quantity: 1, price: 19990000 },
          { productId: 101, name: "Dell XPS 13", quantity: 1, price: 25000000 }
      ],
      shippingInfo: { name: 'Test User', phone: '0987654321', email: 'user@example.com', address: '123 Đường ABC, Phường X, Quận Y, TP.HCM', shippingType: 'delivery' },
      paymentMethod: 'cod',
      wantsEinvoice: false,
      subtotal: 44990000,
      shippingCost: 0,
      discountCode: '',
      discountAmount: 0,
      totalAmount: 44990000,
      status: 'delivered', // Đã giao hàng
      orderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 ngày trước
  },
  // Đơn hàng 2: Đang xử lý, 1 sản phẩm, VNPay
  {
      orderId: 'AERSHOP-1710000000000-2',
      userId: 1,
      items: [
          { productId: 5, name: "Acer Swift 3", quantity: 1, price: 16990000 }
      ],
      shippingInfo: { name: 'Người Nhận Khác', phone: '0123456789', email: 'receiver@email.com', address: '456 Đường XYZ, Quận Z, TP. Thủ Đức', shippingType: 'delivery', orderNotes: 'Giao giờ hành chính, gọi trước 30p' },
      paymentMethod: 'vnpay',
      wantsEinvoice: true,
      subtotal: 16990000,
      shippingCost: 0,
      discountCode: 'GIAM10',
      discountAmount: 1699000, // Giả sử đã áp dụng giảm giá
      totalAmount: 15291000,
      status: 'processing', // Đang xử lý
      orderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 ngày trước
  },
  // Đơn hàng 3: Đã hủy, nhận tại cửa hàng
  {
      orderId: 'AERSHOP-1715000000000-3',
      userId: 1,
      items: [
          { productId: 10, name: "MacBook Air M2", quantity: 1, price: 27990000 }
      ],
      shippingInfo: { name: 'Test User', phone: '0987654321', email: 'user@example.com', address: '', shippingType: 'pickup' }, // Địa chỉ trống vì nhận tại cửa hàng
      paymentMethod: 'cod', // COD tại cửa hàng
      wantsEinvoice: false,
      subtotal: 27990000,
      shippingCost: 0,
      discountCode: '',
      discountAmount: 0,
      totalAmount: 27990000,
      status: 'cancelled', // Đã hủy
      orderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 ngày trước
  },
   // Đơn hàng 4: Đang giao hàng (Shipped)
  {
      orderId: 'AERSHOP-1716000000000-4',
      userId: 1, // Đảm bảo userId khớp
      items: [
          { productId: 7, name: "Lenovo Yoga Slim 7 Pro", quantity: 1, price: 24500000 },
      ],
      shippingInfo: { name: 'Test User', phone: '0987654321', email: 'user@example.com', address: '789 Đường DEF, Quận K, TP.HCM', shippingType: 'delivery' },
      paymentMethod: 'cod',
      wantsEinvoice: false,
      subtotal: 24500000,
      shippingCost: 30000, // Ví dụ có phí ship
      discountCode: '',
      discountAmount: 0,
      totalAmount: 24530000,
      status: 'shipped', // Đã gửi hàng
      orderDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 giờ trước
  },
  // Thêm đơn hàng cho user khác (sẽ không hiển thị cho user ID 1)
   {
      orderId: 'AERSHOP-1717000000000-5',
      userId: 2, // User ID khác
      items: [ { productId: 14, name: "MSI Modern 14", quantity: 1, price: 17500000 } ],
      shippingInfo: { name: 'Another User', phone: '0112233445', email: 'another@example.com', address: '...', shippingType: 'delivery' },
      paymentMethod: 'vnpay',
      totalAmount: 17500000,
      status: 'delivered',
      orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },

];
/**
 * Giả lập API lấy danh sách đơn hàng của một người dùng.
 * @param {number | string} userId - ID của người dùng.
 * @returns {Promise<Array>} - Promise giải quyết với mảng các đơn hàng của người dùng đó.
 */
export const getOrdersByUserId = async (userId) => {
    console.log(`OrderService: Fetching orders for userId: ${userId}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          const userIdNum = parseInt(userId, 10);
          if (isNaN(userIdNum)) {
              console.error('OrderService: Invalid userId provided:', userId);
              return reject(new Error('ID người dùng không hợp lệ.'));
          }
          const userOrders = orders.filter(order => parseInt(order.userId, 10) === userIdNum);
          userOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
          console.log(`OrderService: Found ${userOrders.length} orders for userId: ${userIdNum}`);
          resolve(userOrders);
      }, 800); // Giả lập độ trễ mạng 0.8 giây
    });
}

/**
 * Giả lập API lấy chi tiết một đơn hàng theo ID.
 * @param {string} orderId - Mã đơn hàng cần lấy chi tiết.
 * @param {number | string} userId - ID của người dùng (để kiểm tra quyền truy cập).
 * @returns {Promise<object | null>} - Promise giải quyết với object đơn hàng hoặc null nếu không tìm thấy/không có quyền.
 */
export const getOrderById = async (orderId, userId) => {
  console.log(`OrderService: Fetching order details for orderId: ${orderId}, userId: ${userId}`);
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          const userIdNum = parseInt(userId, 10);
           if (isNaN(userIdNum)) {
              console.error('OrderService: Invalid userId provided for fetching order details:', userId);
              return reject(new Error('ID người dùng không hợp lệ.'));
          }
          const foundOrder = orders.find(order => order.orderId === orderId);
          if (foundOrder) {
              if (parseInt(foundOrder.userId, 10) === userIdNum) {
                  console.log(`OrderService: Order details found for ${orderId}`);
                  resolve(foundOrder);
              } else {
                  console.warn(`OrderService: User ${userIdNum} does not have permission to view order ${orderId}`);
                  resolve(null);
              }
          } else {
              console.log(`OrderService: Order with id ${orderId} not found.`);
              resolve(null);
          }
      }, 600);
    });
}