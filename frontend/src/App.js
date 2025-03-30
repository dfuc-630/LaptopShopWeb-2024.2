import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import CartPage from './pages/CartPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router> {/* Di chuyển Router lên trên */}
      <CartProvider>
        <Header />
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
