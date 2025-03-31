// src/services/productService.js

// Lưu ý: Giá đã được chuyển thành kiểu Number
const products = [
  {
    id: 1,
    name: "Laptop Lenovo Gaming LOQ 15ARP9",
    price: 19990000, // Số
    originalPrice: 22990000, // Số
    discount: 3000000, // Số (Giả sử đây là số tiền giảm trực tiếp)
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
      { id: 2, name: "MacBook Pro 14", price: 45000000, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" }, // Giá là số
      { id: 3, name: "Asus ROG Zephyrus", price: 35000000, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a0a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" }, // Giá là số
    ],
  },
  // Thêm các sản phẩm khác nếu cần, đảm bảo giá là Number
  // Ví dụ các sản phẩm bạn đã có trong CartContext cũ (nếu muốn đưa vào đây làm nguồn chính)
  {
    id: 101, // Đổi ID để tránh trùng với id=1 ở trên
    name: 'Dell XPS 13',
    price: 25000000, // Số
    originalPrice: null, // Hoặc giá gốc nếu có
    discount: null, // Hoặc số tiền giảm nếu có
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'],
    specs: { // Thêm specs nếu cần
        cpu: "Intel Core i7", ram: "16GB", storage: "512GB SSD", display: "13.4 inch FHD+", gpu: "Intel Iris Xe"
    },
    description: 'Laptop Dell XPS 13 với thiết kế mỏng nhẹ, hiệu năng cao, phù hợp cho công việc và giải trí.',
    factory: 'Dell', // Thêm các trường còn thiếu từ model Product cũ nếu cần
    shortDesc: 'Laptop mỏng nhẹ, hiệu năng cao',
    sold: 150,
    target: 'Sinh viên, Nhân viên văn phòng',
    relatedProducts: [] // Thêm sản phẩm liên quan nếu có
  },
  {
    id: 102, // Đổi ID
    name: 'MacBook Pro 14',
    price: 45000000, // Số
    originalPrice: null,
    discount: null,
    images: ['https://cdn2.fptshop.com.vn/unsafe/150x0/filters:quality(100)/macbook_air_13_m3_midnight_1_368063bb53.png'],
     specs: {
        cpu: "Apple M1 Pro", ram: "16GB", storage: "512GB SSD", display: "14.2 inch Liquid Retina XDR", gpu: "Integrated"
    },
    description: 'MacBook Pro 14 với chip M1 Pro, màn hình Retina, lý tưởng cho các nhà phát triển và sáng tạo nội dung.',
    factory: 'Apple',
    shortDesc: 'Hiệu năng mạnh mẽ, màn hình Retina',
    sold: 200,
    target: 'Nhà phát triển, Người sáng tạo nội dung',
    relatedProducts: []
  },
   // ... thêm các sản phẩm khác tương tự
];

export const getProductById = (id) => {
  // Chuyển đổi id đầu vào thành số nguyên để so sánh chính xác
  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
      return null;
  }
  return products.find(product => product.id === productId) || null;
};

export const getAllProducts = () => {
  return products;
};

// Có thể thêm các hàm khác nếu cần, ví dụ: tìm kiếm, lọc sản phẩm...