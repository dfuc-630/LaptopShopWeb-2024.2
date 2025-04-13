// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // Import AuthProvider

// Pages
import HomePage from './pages/HomePage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import AccountPage from './pages/AccountPage.jsx'; // Import trang tài khoản
import CheckoutPage from './pages/CheckoutPage.jsx'; // Import trang thanh toán
// Thêm trang AccountPage, OrdersPage nếu cần
// import OrdersPage from './pages/OrdersPage';

// Components
import Header from './components/Layouts/Header.jsx';
import Footer from './components/Layouts/Footer.jsx';
import AuthModal from './components/Auth/AuthModal.jsx'; // Import AuthModal
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Import ProtectedRoute

// CSS Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // File CSS tùy chỉnh của bạn (nếu có)

function App() {
  return (
    // AuthProvider bao ngoài CartProvider hoặc ngược lại đều được
    // nhưng nên bao ngoài cùng nếu CartContext có thể cần thông tin user
    <Router>
      <AuthProvider>
        <CartProvider>
          <Header />
          <AuthModal /> {/* Render AuthModal ở đây để nó có thể được gọi từ mọi nơi */}

          <main className="container my-4" style={{ minHeight: '70vh' }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />

              {/* Protected Routes */}
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
               {/* Ví dụ thêm các trang được bảo vệ khác */}
               <Route
                 path="/account"
                 element={
                   <ProtectedRoute>
                     {/* Thay bằng component AccountPage thật */}
                     <AccountPage /> 
                   </ProtectedRoute>
                 }
               />
                <Route
                 path="/orders"
                 element={
                   <ProtectedRoute>
                      {/* Thay bằng component OrdersPage thật */}
                     <div className='text-center'><h2>Trang Đơn Hàng (Được bảo vệ)</h2></div>
                   </ProtectedRoute>
                 }
               />
               <Route
                 path="/checkout"
                 element={
                   <ProtectedRoute>
                     <CheckoutPage />
                   </ProtectedRoute>
                 }
              />


              {/* Route trang chưa có link trong footer ví dụ */}
              <Route path="/gioi-thieu" element={<div className='text-center'><h2>Giới Thiệu</h2></div>} />
              {/* ... thêm các route khác cho chính sách, tuyển dụng... */}


              {/* 404 Not Found */}
              <Route path="*" element={<div className='text-center'><h2>404 - Trang không tìm thấy</h2></div>} />
            </Routes>
          </main>

          <Footer />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;