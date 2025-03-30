const mysql = require('mysql2');

// Cấu hình kết nối
const connection = mysql.createConnection({
  host: '127.0.0.1',      // Địa chỉ MySQL Server (hoặc IP)
  user: 'root',           // Tên người dùng MySQL
  password: 'tuanphong2004',           // Mật khẩu MySQL (để trống nếu không có)
  database: 'webdatabase' // Tên database bạn muốn kết nối
});

// Kiểm tra kết nối
connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối MySQL:', err);
    return;
  }
  console.log('Kết nối MySQL thành công!');
});

module.exports = connection;
