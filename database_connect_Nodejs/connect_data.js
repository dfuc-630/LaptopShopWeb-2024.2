const mysql = require('mysql2/promise');

// Cấu hình kết nối
const pool = mysql.createPool({
  host: "localhost",     // Đổi thành host của bạn (VD: 127.0.0.1)
  user: "root",          // Đổi thành username của bạn
  password: "tuanphong2004",          // Đổi thành mật khẩu của bạn
  database: "webdatabase",  // Đổi thành tên database của bạn
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Kiểm tra kết nối
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Kết nối MySQL thành công!");
    connection.release(); // Trả kết nối về pool
  } catch (err) {
    console.error("❌ Lỗi kết nối MySQL:", err);
  }
})();

// Export pool để dùng trong file khác
module.exports = pool;