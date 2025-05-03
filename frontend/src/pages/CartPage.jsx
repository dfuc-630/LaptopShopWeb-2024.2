// src/pages/CartPage.jsx
import React from 'react';
import ShoppingCart from '../components/ShoppingCart'; // Chỉ import ShoppingCart

function CartPage() {
  return (
    // Container đã có trong App.js, không cần thêm ở đây trừ khi muốn style khác
    <div className="container my-4">
        <ShoppingCart />
    </div>
  );
}

export default CartPage;