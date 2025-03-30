const connection = require('./query_database'); // Import kết nối

const query = 'SELECT * FROM products';

connection.query(query, (err, results) => {
  if (err) {
    console.error('Lỗi truy vấn:', err);
    return;
  }
  console.log('Dữ liệu từ MySQL:', results);
});

// Đóng kết nối sau khi lấy dữ liệu xong
connection.end();
