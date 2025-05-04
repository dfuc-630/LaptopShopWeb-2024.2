// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; 

// Pages
import HomePage from './pages/HomePage.jsx';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx'; 
import OrdersPage from './pages/OrdersPage.jsx'; 
import SearchResults from './pages/SearchResults.jsx'; // Trang tìm kiếm
// Connect
import ConnectPage from './pages/ConnectPage.jsx';
//About Us
import AboutUs from './pages/AboutUs.jsx'; 
import CareerSection from './pages/AboutUs/CareerSection.jsx'; 
import NewsSection from './pages/AboutUs/NewsSection.jsx'; 
import IntroductionSection from './pages/AboutUs/IntroductionSection.jsx'; 
// Policy
import Policy from './pages/Policy.jsx';
import WarrantyPolicy from './pages/Policy/WarrantyPolicy.jsx';
import RefundPolicy from './pages/Policy/RefundPolicy.jsx';
import SecurityPolicy from './pages/Policy/SecurityPolicy.jsx';
import BuyPolicy from './pages/Policy/BuyPolicy.jsx';
// Components
import Header from './components/Layouts/Header.jsx';
import Footer from './components/Layouts/Footer.jsx';
import AuthModal from './components/Auth/AuthModal.jsx'; 
import ProtectedRoute from './components/ProtectedRoute.jsx'; 

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
              <Route path="/search" element={<SearchResults />} />
              <Route path="/ket-noi" element={<ConnectPage />} />
              <Route path="/ve-chung-toi" element={<AboutUs />} />
              <Route path="/tuyen-dung" element={<CareerSection />} />
              <Route path="/tin-tuc" element={<NewsSection />} />
              <Route path="/gioi-thieu" element={<IntroductionSection />} />
              {/* Policy Section (nested) */}
              <Route path="/chinh-sach" element={<Policy />}> 
                <Route path="bao-hanh" element={<WarrantyPolicy />} />
                <Route path="doi-tra" element={<RefundPolicy />} />
                <Route path="bao-mat" element={<SecurityPolicy />} />
                <Route path="mua-hang" element={<BuyPolicy />} />
              </Route>
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
                 path="/checkout"
                 element={
                   <ProtectedRoute>
                     <CheckoutPage />
                   </ProtectedRoute>
                 }
              />
              <Route
                 path="/orders" // Route chính cho lịch sử đơn hàng
                 element={
                   <ProtectedRoute>
                     <OrdersPage /> {/* Sử dụng component OrdersPage */}
                   </ProtectedRoute>
                 }
               />
               {/* Thêm Route cho chi tiết đơn hàng (ví dụ) */}
               <Route
                  path="/orders/:orderId" // Route xem chi tiết 1 đơn hàng
                  element={
                    <ProtectedRoute>
                       {/* TODO: Tạo component OrderDetailPage */}
                       <div className='text-center'><h2>Chi tiết đơn hàng (TODO)</h2></div>
                    </ProtectedRoute>
                  }
                />


              {/* Route trang chưa có link trong footer ví dụ*/}
              {/* <Route 
                path="/gioi-thieu" 
                element={
                  <ProtectedRoute>
                    <KetNoiPage />   
                  </ProtectedRoute>
                } 
              /> */}
              {/* ... thêm các route khác cho chính sách, tuyển dụng... */}
              <Route 
                path="/search" 
                element={
                  <ProtectedRoute>
                    <SearchResults />   
                  </ProtectedRoute>
                } 
              />

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
