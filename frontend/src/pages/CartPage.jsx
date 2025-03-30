// src/pages/CartPage.jsx
import React from 'react';
import ShoppingCart from '../components/ShoppingCart';
import AddToCart from '../components/AddToCart';

function CartPage() {
  return (
    <div className="container-fluid bg-light min-vh-100">
      <main className="py-4">
        <AddToCart />
        <ShoppingCart />
      </main>
    </div>
  );
}

export default CartPage;