// src/components/AddToCart.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import Product from '../models/Product';

function AddToCart() {
  const { setProducts } = useCart();
  const laptop = new Product({
    id: 4,
    detail_desc: 'Laptop XYZ với hiệu năng ổn định, giá cả phải chăng, phù hợp cho học tập và làm việc.',
    factory: 'XYZ Corp',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    name: 'Laptop XYZ',
    price: '20,000,000 đ',
    quantity: 1,
    short_desc: 'Laptop giá rẻ, hiệu năng ổn định',
    sold: 50,
    target: 'Học sinh, Sinh viên',
  });

  const addProduct = () => {
    setProducts(prev => {
      const existingProduct = prev.find(p => p.id === laptop.id);
      if (existingProduct) {
        return prev.map(p =>
          p.id === laptop.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [...prev, laptop];
    });
  };

  return (
    <button className="btn btn-primary mb-3" onClick={addProduct}>
      Thêm Laptop XYZ vào giỏ hàng
    </button>
  );
}

export default AddToCart;