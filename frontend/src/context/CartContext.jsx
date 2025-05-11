import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [discountCode, setDiscountCode] = useState(() => {
        const savedMeta = localStorage.getItem('cartMeta');
        return savedMeta ? JSON.parse(savedMeta).discountCode || '' : '';
    });
    const [discountAmount, setDiscountAmount] = useState(() => {
        const savedMeta = localStorage.getItem('cartMeta');
        return savedMeta ? JSON.parse(savedMeta).discountAmount || 0 : 0;
    });
    const [shippingCost, setShippingCost] = useState(() => {
        const savedMeta = localStorage.getItem('cartMeta');
        return savedMeta ? JSON.parse(savedMeta).shippingCost || 0 : 0;
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        localStorage.setItem('cartMeta', JSON.stringify({ discountCode, discountAmount, shippingCost }));
    }, [cartItems, discountCode, discountAmount, shippingCost]);

    const addToCart = useCallback((productToAdd, quantityToAdd = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === productToAdd.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === productToAdd.id
                        ? { ...item, quantity: item.quantity + quantityToAdd }
                        : item
                );
            } else {
                const cartItem = {
                    id: productToAdd.id,
                    name: productToAdd.name,
                    price: productToAdd.price,
                    image: productToAdd.images ? productToAdd.images[0] : (productToAdd.image || ''),
                    quantity: quantityToAdd,
                };
                return [...prevItems, cartItem];
            }
        });
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId, newQuantity) => {
        const quantity = Math.max(1, newQuantity);
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
        setDiscountCode('');
        setDiscountAmount(0);
        setShippingCost(0);
    }, []);

    const getCartItemCount = useCallback(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    const getCartTotal = useCallback(() => {
        return cartItems.reduce((total, item) => {
            const itemPrice = typeof item.price === 'number' ? item.price : 0;
            const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 0;
            return total + (itemPrice * itemQuantity);
        }, 0);
    }, [cartItems]);

    const applyDiscount = useCallback((code, amount, shipping) => {
        setDiscountCode(code);
        setDiscountAmount(amount);
        setShippingCost(shipping);
    }, []);

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemCount,
        getCartTotal,
        discountCode,
        discountAmount,
        shippingCost,
        applyDiscount,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}