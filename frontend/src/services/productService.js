// src/services/productService.js

// Lưu ý: Giá đã được chuyển thành kiểu Number
const products = [
  // Sản phẩm gốc
  { id: 1, name: "Laptop Lenovo Gaming LOQ 15ARP9", price: 19990000, originalPrice: 22990000, discount: 3000000, images: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&angle=90"], specs: { cpu: "AMD Ryzen 5 7235HS", ram: "16GB", storage: "512GB SSD", display: "15.6 inch, FHD, 144Hz", gpu: "NVIDIA GeForce RTX 3050 6GB" }, description: "...", relatedProducts: [{ id: 102, name: "MacBook Pro 14", price: 45000000, image: "..." }, { id: 3, name: "Asus ROG Zephyrus", price: 35000000, image: "..." }] },
  { id: 101, name: 'Dell XPS 13', price: 25000000, images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'], specs: { cpu: "Intel Core i7", ram: "16GB", storage: "512GB SSD", display: "13.4 inch FHD+", gpu: "Intel Iris Xe" }, description: '...', factory: 'Dell', shortDesc: 'Laptop mỏng nhẹ', sold: 150, target: 'Văn phòng', relatedProducts: [] },
  { id: 102, name: 'MacBook Pro 14', price: 45000000, images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'], specs: { cpu: "Apple M1 Pro", ram: "16GB", storage: "512GB SSD", display: "14.2 inch Liquid Retina XDR", gpu: "Integrated" }, description: '...', factory: 'Apple', shortDesc: 'Hiệu năng mạnh mẽ', sold: 200, target: 'Sáng tạo', relatedProducts: [] },
  { id: 3, name: "Asus ROG Zephyrus G15", price: 35000000, images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a0a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"], specs: { cpu: "AMD Ryzen 9", ram: "16GB", storage: "1TB SSD", display: "15.6 inch QHD 165Hz", gpu: "RTX 3070" }, description: "Laptop gaming mạnh mẽ...", factory: "Asus", shortDesc: "Gaming đỉnh cao", sold: 100, target: "Game thủ", relatedProducts: []},

  // --- Thêm nhiều sản phẩm giả lập ---
  { id: 4, name: "HP Spectre x360 14", price: 32500000, images: ["https://via.placeholder.com/300x200/FFD700/000000?text=HP+Spectre"], specs: { cpu: "Intel Core i7", ram: "16GB", storage: "1TB SSD", display: "13.5 inch 3K2K OLED", gpu: "Intel Iris Xe" }, description: "Thiết kế xoay gập cao cấp...", factory: "HP", shortDesc: "Cao cấp, linh hoạt", sold: 80, target: "Doanh nhân", relatedProducts: [] },
  { id: 5, name: "Acer Swift 3", price: 16990000, images: ["https://via.placeholder.com/300x200/C0C0C0/000000?text=Acer+Swift"], specs: { cpu: "AMD Ryzen 5", ram: "8GB", storage: "512GB SSD", display: "14 inch FHD IPS", gpu: "Radeon Graphics" }, description: "Mỏng nhẹ, giá tốt...", factory: "Acer", shortDesc: "Phổ thông, mỏng nhẹ", sold: 250, target: "Sinh viên", relatedProducts: [] },
  { id: 6, name: "Microsoft Surface Laptop 5", price: 28990000, images: ["https://via.placeholder.com/300x200/ADD8E6/000000?text=Surface+Laptop"], specs: { cpu: "Intel Core i5", ram: "8GB", storage: "512GB SSD", display: "13.5 inch PixelSense", gpu: "Intel Iris Xe" }, description: "Trải nghiệm Windows tốt nhất...", factory: "Microsoft", shortDesc: "Màn hình đẹp, bàn phím tốt", sold: 90, target: "Văn phòng", relatedProducts: [] },
  { id: 7, name: "Lenovo Yoga Slim 7 Pro", price: 24500000, images: ["https://via.placeholder.com/300x200/E6E6FA/000000?text=Lenovo+Yoga"], specs: { cpu: "AMD Ryzen 7", ram: "16GB", storage: "512GB SSD", display: "14 inch 2.8K OLED", gpu: "Radeon Graphics" }, description: "Màn hình OLED rực rỡ...", factory: "Lenovo", shortDesc: "Mạnh mẽ, màn hình đẹp", sold: 110, target: "Sáng tạo, Văn phòng", relatedProducts: [] },
  { id: 8, name: "Asus Vivobook 15", price: 14800000, images: ["https://via.placeholder.com/300x200/90EE90/000000?text=Asus+Vivobook"], specs: { cpu: "Intel Core i3", ram: "8GB", storage: "256GB SSD", display: "15.6 inch FHD", gpu: "Intel UHD Graphics" }, description: "Giá rẻ, đáp ứng cơ bản...", factory: "Asus", shortDesc: "Giá rẻ, màn hình lớn", sold: 300, target: "Học sinh, Cơ bản", relatedProducts: [] },
  { id: 9, name: "Dell Inspiron 16", price: 21500000, images: ["https://via.placeholder.com/300x200/F08080/000000?text=Dell+Inspiron"], specs: { cpu: "Intel Core i5", ram: "16GB", storage: "512GB SSD", display: "16 inch FHD+", gpu: "Intel Iris Xe" }, description: "Màn hình lớn, đa dụng...", factory: "Dell", shortDesc: "Màn hình lớn, RAM nhiều", sold: 130, target: "Văn phòng, Gia đình", relatedProducts: [] },
  { id: 10, name: "MacBook Air M2", price: 27990000, images: ["https://via.placeholder.com/300x200/87CEEB/000000?text=MacBook+Air"], specs: { cpu: "Apple M2", ram: "8GB", storage: "256GB SSD", display: "13.6 inch Liquid Retina", gpu: "Integrated" }, description: "Thiết kế mới, pin trâu...", factory: "Apple", shortDesc: "Mỏng nhẹ, hiệu năng tốt", sold: 180, target: "Sinh viên, Văn phòng", relatedProducts: [] },
  // ... Thêm tiếp tục sao chép và sửa đổi cho đủ số lượng bạn muốn (ví dụ 20-30) ...
  { id: 11, name: "Lenovo Legion 5", price: 29990000, images: ["https://via.placeholder.com/300x200/00008B/FFFFFF?text=Lenovo+Legion"], specs: { cpu: "Intel Core i7", ram: "16GB", storage: "512GB SSD", display: "15.6 inch FHD 165Hz", gpu: "RTX 3060" }, description: "Tản nhiệt tốt, hiệu năng cao...", factory: "Lenovo", shortDesc: "Gaming tầm trung", sold: 95, target: "Game thủ", relatedProducts: [] },
  { id: 12, name: "Acer Predator Helios 300", price: 34500000, images: ["https://via.placeholder.com/300x200/FF0000/FFFFFF?text=Acer+Predator"], specs: { cpu: "Intel Core i7", ram: "16GB", storage: "1TB SSD", display: "15.6 inch QHD 165Hz", gpu: "RTX 3070" }, description: "Build hầm hố, mạnh mẽ...", factory: "Acer", shortDesc: "Gaming cao cấp", sold: 70, target: "Game thủ", relatedProducts: [] },
  { id: 13, name: "HP Envy 13", price: 22000000, images: ["https://via.placeholder.com/300x200/D2691E/FFFFFF?text=HP+Envy"], specs: { cpu: "Intel Core i5", ram: "8GB", storage: "512GB SSD", display: "13.3 inch FHD", gpu: "Intel Iris Xe" }, description: "Thiết kế đẹp, gọn nhẹ...", factory: "HP", shortDesc: "Văn phòng, thời trang", sold: 140, target: "Văn phòng", relatedProducts: [] },
  { id: 14, name: "MSI Modern 14", price: 17500000, images: ["https://via.placeholder.com/300x200/4682B4/FFFFFF?text=MSI+Modern"], specs: { cpu: "Intel Core i5", ram: "8GB", storage: "512GB SSD", display: "14 inch FHD", gpu: "Intel Iris Xe" }, description: "Cấu hình ổn, giá hợp lý...", factory: "MSI", shortDesc: "Văn phòng, phổ thông", sold: 160, target: "Sinh viên, Văn phòng", relatedProducts: [] },
  { id: 15, name: "Gigabyte Aorus 15", price: 38990000, images: ["https://via.placeholder.com/300x200/FFA500/000000?text=Gigabyte+Aorus"], specs: { cpu: "Intel Core i7", ram: "16GB", storage: "1TB SSD", display: "15.6 inch QHD 240Hz", gpu: "RTX 3080" }, description: "Màn hình tần số quét cao...", factory: "Gigabyte", shortDesc: "Gaming hiệu năng cao", sold: 50, target: "Game thủ chuyên nghiệp", relatedProducts: [] },
   // Thêm 10 sản phẩm nữa
  { id: 16, name: "Razer Blade 15", price: 55000000, images: ["https://via.placeholder.com/300x200/00FF00/000000?text=Razer+Blade"], specs: { cpu: "Intel Core i9", ram: "32GB", storage: "1TB SSD", display: "15.6 inch QHD 240Hz", gpu: "RTX 3080 Ti" }, description: "Cao cấp, mỏng nhẹ, mạnh mẽ...", factory: "Razer", shortDesc: "Gaming & Sáng tạo cao cấp", sold: 40, target: "Game thủ, Sáng tạo", relatedProducts: [] },
  { id: 17, name: "LG Gram 17", price: 31000000, images: ["https://via.placeholder.com/300x200/FFFFFF/000000?text=LG+Gram"], specs: { cpu: "Intel Core i7", ram: "16GB", storage: "1TB SSD", display: "17 inch WQXGA IPS", gpu: "Intel Iris Xe" }, description: "Siêu nhẹ, màn hình lớn...", factory: "LG", shortDesc: "Siêu nhẹ, pin trâu", sold: 60, target: "Doanh nhân, Di chuyển", relatedProducts: [] },
  { id: 18, name: "Samsung Galaxy Book3 Pro", price: 33500000, images: ["https://via.placeholder.com/300x200/B0C4DE/000000?text=Samsung+Book"], specs: { cpu: "Intel Core i7", ram: "16GB", storage: "512GB SSD", display: "16 inch 3K AMOLED", gpu: "Intel Iris Xe" }, description: "Màn hình AMOLED đẹp...", factory: "Samsung", shortDesc: "Hệ sinh thái Samsung", sold: 75, target: "Văn phòng, Giải trí", relatedProducts: [] },
  { id: 19, name: "Framework Laptop 13", price: 30000000, images: ["https://via.placeholder.com/300x200/D3D3D3/000000?text=Framework"], specs: { cpu: "Intel Core i5", ram: "16GB", storage: "512GB SSD", display: "13.5 inch 3:2", gpu: "Intel Iris Xe" }, description: "Dễ dàng sửa chữa, nâng cấp...", factory: "Framework", shortDesc: "Modular, bền vững", sold: 30, target: "Người yêu công nghệ", relatedProducts: [] },
  { id: 20, name: "Chromebook Duet 5", price: 12000000, images: ["https://via.placeholder.com/300x200/6495ED/FFFFFF?text=Chromebook"], specs: { cpu: "Snapdragon 7c", ram: "8GB", storage: "128GB eMMC", display: "13.3 inch OLED Touch", gpu: "Adreno 618" }, description: "ChromeOS, màn hình OLED...", factory: "Lenovo", shortDesc: "Giá rẻ, 2-in-1", sold: 100, target: "Học sinh, Lướt web", relatedProducts: [] },
  { id: 21, name: "Asus Zenbook 14 OLED", price: 26500000, images: ["https://via.placeholder.com/300x200/7FFFD4/000000?text=Asus+Zenbook"], specs: { cpu: "Intel Core i5", ram: "16GB", storage: "512GB SSD", display: "14 inch 2.8K OLED", gpu: "Intel Iris Xe" }, description: "OLED đẹp, mỏng nhẹ...", factory: "Asus", shortDesc: "Văn phòng cao cấp", sold: 115, target: "Văn phòng, Sáng tạo", relatedProducts: [] },
  { id: 22, name: "Dell Latitude 7430", price: 29500000, images: ["https://via.placeholder.com/300x200/A9A9A9/000000?text=Dell+Latitude"], specs: { cpu: "Intel Core i7", ram: "16GB", storage: "512GB SSD", display: "14 inch FHD", gpu: "Intel Iris Xe" }, description: "Bền bỉ, bảo mật cho doanh nghiệp...", factory: "Dell", shortDesc: "Doanh nghiệp, bền bỉ", sold: 85, target: "Doanh nghiệp", relatedProducts: [] },
  { id: 23, name: "HP Pavilion Aero 13", price: 19800000, images: ["https://via.placeholder.com/300x200/FFC0CB/000000?text=HP+Aero"], specs: { cpu: "AMD Ryzen 5", ram: "16GB", storage: "512GB SSD", display: "13.3 inch WUXGA", gpu: "Radeon Graphics" }, description: "Siêu nhẹ dưới 1kg...", factory: "HP", shortDesc: "Siêu nhẹ, giá tốt", sold: 125, target: "Sinh viên, Di chuyển", relatedProducts: [] },
  { id: 24, name: "ThinkPad X1 Carbon Gen 11", price: 42000000, images: ["https://via.placeholder.com/300x200/000000/FFFFFF?text=ThinkPad+X1"], specs: { cpu: "Intel Core i7", ram: "16GB", storage: "1TB SSD", display: "14 inch WUXGA IPS", gpu: "Intel Iris Xe" }, description: "Biểu tượng doanh nhân...", factory: "Lenovo", shortDesc: "Bền bỉ, bàn phím tốt nhất", sold: 55, target: "Doanh nhân", relatedProducts: [] },
  { id: 25, name: "Surface Pro 9", price: 36000000, images: ["https://via.placeholder.com/300x200/40E0D0/000000?text=Surface+Pro"], specs: { cpu: "Intel Core i7", ram: "16GB", storage: "256GB SSD", display: "13 inch PixelSense Flow", gpu: "Intel Iris Xe" }, description: "Máy tính bảng lai laptop...", factory: "Microsoft", shortDesc: "Linh hoạt, cảm ứng", sold: 65, target: "Sáng tạo, Di chuyển", relatedProducts: [] },
];

export const getProductById = (id) => {
  const productId = parseInt(id, 10);
  if (isNaN(productId)) return null;
  return products.find(product => product.id === productId) || null;
};

export const getAllProducts = () => {
  // Trả về bản sao để tránh sửa đổi trực tiếp mảng gốc
  return [...products];
};

// Có thể thêm các hàm khác nếu cần, ví dụ: tìm kiếm, lọc sản phẩm...