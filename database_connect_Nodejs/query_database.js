const express = require('express');
const pool = require('./connect_data');

const app = express();
const port = 3000;


app.get("/products", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM products");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Lỗi truy vấn MySQL", details: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM users");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Lỗi truy vấn MySQL", details: err.message });
  }
});

app.get("/roles", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM roles");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Lỗi truy vấn MySQL", details: err.message });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM orders");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Lỗi truy vấn MySQL", details: err.message });
  }
});

app.get("/order_detail", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM order_detail");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Lỗi truy vấn MySQL", details: err.message });
  }
});


//search
app.get("/products/search", async (req, res) => {
  try {
      const { query } = req.query;
      if (!query) return res.status(400).json({ message: "Vui lòng nhập từ khóa tìm kiếm" });

      const sql = `SELECT * FROM products WHERE name LIKE ?`;
      const [rows] = await pool.execute(sql, [`%${query}%`])

      res.json(rows);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


//update

//insert
app.use(express.json()); 
app.post("/products", async (req, res) => {
  try {
    const { detail_desc, factory, image, name ,price, quantity, short_desc, sold, target } = req.body;
    if (!price || !quantity || !sold ) {
      return res.status(400).json({ message: "price, quantity, sold là bắt buộc!" });
    }

    const sql = `INSERT INTO products (detail_desc, factory, image, name ,price, quantity, short_desc, sold, target) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [detail_desc, factory, image, name ,price, quantity, short_desc, sold, target]);

    res.status(201).json({ 
      message: "Sản phẩm đã được thêm thành công!",
      productId: result.insertId
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});


app.post("/users", async (req, res) => {
  try {
    const { address, avatar, email, full_name, password, phone, role_id } = req.body;
    

    const sql = `INSERT INTO users (address, avatar, email, full_name, password, phone, role_id) VALUES ( ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [address ?? null, avatar ?? null, email ?? null, full_name ?? null, password ?? null, phone ?? null, role_id ?? null]);

    res.status(201).json({ 
      message: "Sản phẩm đã được thêm thành công!",
      productId: result.insertId
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});


//delete
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params; 

    const sql = `DELETE FROM users WHERE id = ?`;
    const [result] = await pool.execute(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy đói tượng để xóa!" });
    }

    res.json({ message: "Đối tượng đã được xóa thành công!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});


