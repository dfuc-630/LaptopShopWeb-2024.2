// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
// Không cần import Product model ở đây nữa nếu cart item lưu đủ thông tin
// Hoặc import để type-check nếu cần

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  // State cartItems: Mảng chứa các sản phẩm trong giỏ hàng
  // Mỗi item trong mảng sẽ có dạng: { product: ProductObject, quantity: number }
  // Hoặc để đơn giản hơn khi truyền giữa các component và tránh object lồng sâu:
  // { id: number, name: string, price: number, image: string, quantity: number }
  // -> Chọn cách lưu thông tin cơ bản để tránh object phức tạp
  const [cartItems, setCartItems] = useState([]);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = useCallback((productToAdd, quantityToAdd = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productToAdd.id);

      if (existingItem) {
        // Nếu sản phẩm đã có, cập nhật số lượng
        return prevItems.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
        // Chỉ lấy những thông tin cần thiết của product vào cart item
        const cartItem = {
          id: productToAdd.id,
          name: productToAdd.name,
          price: productToAdd.price,
          image: productToAdd.images ? productToAdd.images[0] : (productToAdd.image || ''), // Lấy ảnh đầu tiên hoặc ảnh mặc định
          quantity: quantityToAdd,
        };
        return [...prevItems, cartItem];
      }
    });
     // console.log("Added to cart:", productToAdd.name, quantityToAdd); // debug
  }, []);

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
     // console.log("Removed from cart:", productId); // debug
  }, []);

  // Hàm cập nhật số lượng sản phẩm
  const updateQuantity = useCallback((productId, newQuantity) => {
    // Đảm bảo số lượng không nhỏ hơn 1
    const quantity = Math.max(1, newQuantity);
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
    // console.log("Updated quantity:", productId, quantity); // debug
  }, []);

  // Hàm xóa toàn bộ giỏ hàng
  const clearCart = useCallback(() => {
    setCartItems([]);
    // console.log("Cart cleared"); // debug
  }, []);

  // Hàm tính tổng số lượng các sản phẩm trong giỏ
  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  // Hàm tính tổng tiền của giỏ hàng
  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
        // Đảm bảo price là số và quantity là số
        const itemPrice = typeof item.price === 'number' ? item.price : 0;
        const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 0;
        return total + (itemPrice * itemQuantity);
    }, 0);
  }, [cartItems]);


  // Giá trị cung cấp bởi Context Provider
  const contextValue = {
    cartItems, // Danh sách các sản phẩm trong giỏ
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount, // Hàm lấy tổng số lượng
    getCartTotal,     // Hàm lấy tổng tiền
    // Không cần setProducts nữa, các hàm trên đã đủ để quản lý cartItems
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}