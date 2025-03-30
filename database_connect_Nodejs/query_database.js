const express = require('express');
const connection = require('./connect_data');

const app = express();
const port = 3000;


app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn MySQL' });
      return;
    }
    res.json(results);
  });
});

app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn MySQL' });
      return;
    }
    res.json(results);
  });
})

app.get('/roles', (req, res) => {
  const query = 'SELECT * FROM roles';

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn MySQL' });
      return;
    }
    res.json(results);
  });
})

app.get('/orders', (req, res) => {
  const query = 'SELECT * FROM orders';

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn MySQL' });
      return;
    }
    res.json(results);
  });
})

app.get('/order_detail', (req, res) => {
  const query = 'SELECT * FROM order_detail';

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn MySQL' });
      return;
    }
    res.json(results);
  });
})






app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});


