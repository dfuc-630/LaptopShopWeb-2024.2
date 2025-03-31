// // src/pages/CartPage.jsx
// import React from 'react';
// import ShoppingCart from '../components/ShoppingCart';
// import AddToCart from '../components/AddToCart';

// function CartPage() {
//   return (
//     <div className="container-fluid bg-light min-vh-100">
//       <main className="py-4">
//         <AddToCart />
//         <ShoppingCart />
//       </main>
//     </div>
//   );
// }

// export default CartPage;

// src/pages/CartPage.jsx
import React from 'react';
import ShoppingCart from '../components/ShoppingCart'; // Chỉ import ShoppingCart

function CartPage() {
  return (
    // Container đã có trong App.js, không cần thêm ở đây trừ khi muốn style khác
    // <div className="container my-4">
        <ShoppingCart />
    // </div>
  );
}

export default CartPage;