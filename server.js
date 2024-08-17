const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // เพื่อให้สามารถรับข้อมูล JSON ได้
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "secondhandmarket", // ชื่อฐานข้อมูล
});

// เชื่อมต่อฐานข้อมูล
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.get("/products", (req, res) => {
  const sql = "SELECT * FROM Products";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Error fetching products");
      return;
    }
    res.json(results);
  });
});

app.get("/search", (req, res) => {
  const searchTerm = req.query.q;
  const sql = "SELECT * FROM Products WHERE name LIKE ?";
  db.query(sql, [`%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error("Error searching products:", err);
      res.status(500).send("Error searching products");
      return;
    }
    res.json(results);
  });
});

app.get("/daily-discover", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});


// API เพื่อดึงข้อมูลสินค้าโดยใช้ id
app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'SELECT * FROM products WHERE Product_id = ?';

  db.query(query, [productId], (err, results) => {
      if (err) {
          console.error('Error fetching product:', err);
          res.status(500).send('Error fetching product');
          return;
      }
      if (results.length > 0) {
          res.json(results[0]); // ส่งคืนเฉพาะรายการแรก
      } else {
          res.status(404).send('Product not found');
      }
  });
});

//เพิ่มสินค้าลงฐานข้อมูล
app.post("/products", (req, res) => {
  const { name, price, description, image, stock } = req.body;

  const sql = "INSERT INTO products (name, price, description, image, stock) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, price, description, image, stock], (err, result) => {
    if (err) {
      console.error("Error inserting product:", err);
      return res.status(500).json({ error: err.toString() });
    }
    res.status(201).json({
      message: "Product added successfully",
      productId: result.insertId,
    });
  });
});

//ลงทะเบียน
app.post('/register', (req, res) => {
    const { username, password, firstname, lastname, email, phone } = req.body;

    // Insert into customer table
    const customerSql = 'INSERT INTO customer (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)';
    db.query(customerSql, [firstname, lastname, email, phone], (err, result) => {
        if (err) throw err;

        const customerId = result.insertId;

        // Insert into register table with registration_date
        const registerSql = 'INSERT INTO register (username, password, customer_id, regis_date) VALUES (?, ?, ?, NOW())';
        db.query(registerSql, [username, password, customerId], (err, result) => {
            if (err) throw err;
            res.send('Registration successful');
        });
    });
});

app.get("/address", (req, res) => {
  const sql = "SELECT * FROM address";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Error fetching products");
      return;
    }
    res.json(results);
  });
});

//หน้า login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT Customer_id, Register_id FROM register WHERE username = ? AND password = ?`;
  
  db.query(query, [username, password], (error, results) => {
      if (error) {
          return res.status(500).json({ success: false, message: 'Internal server error' });
      }
      if (results.length > 0) {
          const { Customer_id, Register_id } = results[0];
          return res.json({ success: true, Customer_id, Register_id });
      } else {
          return res.json({ success: false, message: 'Invalid username or password' });
      }
  });
});

//ดึงข้อมูล Cus-id
app.get('/customer/:id', (req, res) => {
  const customerId = req.params.id;
  const query = `SELECT first_name, last_name, email, phone FROM customer WHERE Customer_id = ?`;

  db.query(query, [customerId], (error, results) => {
      if (error) {
          return res.status(500).json({ success: false, message: 'Internal server error' });
      }
      if (results.length > 0) {
          return res.json({ success: true, customer: results[0] });
      } else {
          return res.json({ success: false, message: 'Customer not found' });
      }
  });
});

// API สำหรับบันทึกข้อมูลการสั่งซื้อ (correct)
app.post('/orders', (req, res) => {
  const { customer_id, product_id, quantity, payment_id, status } = req.body;
  const sql = 'INSERT INTO `order` (customer_id, product_id, order_date, quantity, payment_id, status) VALUES (?, ?, NOW(), ?, ?, ?)';
  db.query(sql, [customer_id, product_id, quantity, payment_id, status], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.status(201).json({ success: true, orderId: result.insertId });
  });
});


// API สำหรับบันทึกข้อมูลการชำระเงิน (correct)
app.post('/payments', (req, res) => {
  const { customer_id, payment_method, amount } = req.body;
  const sql = 'INSERT INTO payments (customer_id, payment_method, amount) VALUES (?, ?, ?)';
  db.query(sql, [customer_id, payment_method, amount], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.status(201).json({ success: true, paymentId: result.insertId });
  });
});

// API สำหรับอัพเดตสต็อกสินค้า (correct)
app.put('/products/:id/stock', (req, res) => {
  const productId = req.params.id;
  const { quantity } = req.body;
  const sql = 'UPDATE products SET stock = stock - ? WHERE product_id = ?';
  db.query(sql, [quantity, productId], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.status(200).json({ success: true });
  });
});

// api order_id


// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
