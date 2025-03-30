// src/context/CartContext.jsx
import { createContext, useContext, useState } from 'react';
import Product from '../models/Product';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [products, setProducts] = useState([
    new Product({
      id: 1,
      detail_desc: 'Laptop Dell XPS 13 với thiết kế mỏng nhẹ, hiệu năng cao, phù hợp cho công việc và giải trí.',
      factory: 'Dell',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      name: 'Dell XPS 13',
      price: '25,000,000 đ',
      quantity: 1,
      short_desc: 'Laptop mỏng nhẹ, hiệu năng cao',
      sold: 150,
      target: 'Sinh viên, Nhân viên văn phòng',
    }),
    new Product({
      id: 2,
      detail_desc: 'MacBook Pro 14 với chip M1 Pro, màn hình Retina, lý tưởng cho các nhà phát triển và sáng tạo nội dung.',
      factory: 'Apple',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      name: 'MacBook Pro 14',
      price: '45,000,000 đ',
      quantity: 1,
      short_desc: 'Hiệu năng mạnh mẽ, màn hình Retina',
      sold: 200,
      target: 'Nhà phát triển, Người sáng tạo nội dung',
    }),
    new Product({
      id: 3,
      detail_desc: 'Asus ROG Zephyrus với card đồ họa RTX 3050, màn hình 144Hz, dành cho game thủ chuyên nghiệp.',
      factory: 'Asus',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a0a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      name: 'Asus ROG Zephyrus',
      price: '35,000,000 đ',
      quantity: 1,
      short_desc: 'Laptop gaming mạnh mẽ',
      sold: 100,
      target: 'Game thủ',
    }),
  ]);

  return (
    <CartContext.Provider value={{ products, setProducts }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}