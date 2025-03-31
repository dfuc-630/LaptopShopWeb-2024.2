// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx'; // Giữ nguyên

// Import Pages
import HomePage from './pages/HomePage.jsx'; // Import trang chủ mới
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';

// Import Components
import Header from './components/Header'; // Đã có
import Footer from './components/Footer'; // Đã có

function App() {
  return (
    <Router>
      <CartProvider> {/* CartProvider bao bọc toàn bộ ứng dụng */}
        <Header />
        <main className="container my-4" style={{ minHeight: '70vh' }}> {/* Thêm minHeight */}
          <Routes>
            {/* Route trang chủ */}
            <Route path="/" element={<HomePage />} />

            {/* Route chi tiết sản phẩm */}
            <Route path="/product/:id" element={<ProductDetailPage />} />

            {/* Route giỏ hàng */}
            <Route path="/cart" element={<CartPage />} />

            {/* Thêm các Route khác nếu cần (ví dụ: trang tài khoản, danh mục...) */}
            {/* <Route path="/account" element={<AccountPage />} /> */}
            {/* <Route path="/category/:categoryName" element={<CategoryPage />} /> */}

             {/* Route mặc định nếu không khớp */}
             <Route path="*" element={<div className='text-center'><h2>404 - Trang không tìm thấy</h2></div>} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;