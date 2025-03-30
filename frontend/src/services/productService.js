// src/services/productService.js
const products = [
    {
      id: 1,
      name: "Laptop Lenovo Gaming LOQ 15ARP9",
      price: "19,990,000 đ",
      originalPrice: "22,990,000 đ",
      discount: "3,000,000 đ",
      images: [
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&angle=90",
      ],
      specs: {
        cpu: "AMD Ryzen 5 7235HS",
        ram: "16GB",
        storage: "512GB SSD",
        display: "15.6 inch, FHD, 144Hz",
        gpu: "NVIDIA GeForce RTX 3050 6GB",
      },
      description: "Laptop Lenovo Gaming LOQ 15ARP9 là lựa chọn hoàn hảo cho game thủ với hiệu năng mạnh mẽ, thiết kế hiện đại và màn hình 144Hz mượt mà.",
      relatedProducts: [
        { id: 2, name: "MacBook Pro 14", price: "45,000,000 đ", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
        { id: 3, name: "Asus ROG Zephyrus", price: "35,000,000 đ", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a0a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
      ],
    },
    // Thêm các sản phẩm khác nếu cần
  ];
  
  export const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id)) || null;
  };
  
  export const getAllProducts = () => {
    return products;
  };