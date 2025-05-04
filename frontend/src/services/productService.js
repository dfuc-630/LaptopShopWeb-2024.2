// src/services/productService.js

// Lấy API base URL từ biến môi trường, có giá trị dự phòng cho local dev
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
const API_BASE_URL = `${BASE_URL}/data/product`;

//ham tach cac truong thong tin
const parseProductDetail = (detailDesc) => {
  if (!detailDesc || typeof detailDesc !== 'string') {
    return {
      CPU:'',
      RAM:'',
      ROM:'',
      display:'',
    }
  }

  const specs = {
    CPU: '',
    RAM: '',
    ROM: '',
    display: '',
  };

  const parts = detailDesc.split(',').map(part => part.trim());
  if (parts.length >= 1) specs.CPU = parts[0] || '';
  if (parts.length >= 2) specs.RAM = parts[1] || '';
  if (parts.length >= 3) specs.ROM = parts[2] || '';
  if (parts.length >= 4) specs.display = parts[3] || '';
  
  return specs;
}

/**
 * Fetches all products from the server API.
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 * @throws {Error} If the network request fails or the server returns an error status.
 */
export const getAllProducts = async () => {
  const url = `${API_BASE_URL}`;
  console.log(`ProductService: Fetching all products from ${url}`);
  try {
      const response = await fetch(url);

      if (!response.ok) {
          console.error(`ProductService: Lỗi HTTP: ${response.status} - ${response.statusText}`);
          const text = await response.text();
          console.log('Response:', text);
          throw new Error(`Lỗi HTTP: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log('ProductService: Lấy danh sách sản phẩm thành công.');
      return data.map(product => (
        {
          ...product,
          specs: parseProductDetail(product.detailDesc),
        }
      ));

  } catch (error) {
      console.error("ProductService: Lỗi khi fetch tất cả sản phẩm:", error);
      throw new Error('Không thể kết nối hoặc lấy dữ liệu sản phẩm từ máy chủ.');
  }
};


/**
 * Fetches a single product by its ID from the server API.
 * @param {string | number} id - The ID of the product to fetch.
 * @returns {Promise<object | null>} A promise that resolves to the product object, or null if not found (404).
 * @throws {Error} If the ID is invalid, network request fails, or server returns an error (other than 404).
 */
export const getProductById = async (id) => {
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
        console.error('ProductService: Mã sản phẩm không hợp lệ:', id);
        throw new Error('Mã sản phẩm không hợp lệ.');
    }

    const url = `${API_BASE_URL}/${productId}`;
    console.log(`ProductService: Fetching product ID ${productId} from ${url}`);

    try {
        const response = await fetch(url);

        if (response.status === 404) {
            console.log(`ProductService: Không tìm thấy sản phẩm ID ${productId} (404).`);
            return null;
        }

        if (!response.ok) {
            throw new Error(`Lỗi HTTP: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (data && typeof data.price !== 'number') {
            console.warn(`ProductService: Dữ liệu giá cho sản phẩm ID ${productId} có thể không phải là số!`);
        }

        console.log(`ProductService: Lấy chi tiết sản phẩm ID ${productId} thành công.`);
        return {
          ...data,
          images: data.images || [data.image], // fallback nếu chỉ có 1 ảnh
          specs: parseProductDetail(data.detailDesc),
          discount: data.discount || 0,
          originalPrice: data.originalPrice || null,
          description: data.description || data.detailDesc || '',
          relatedProducts: data.relatedProducts || [],
        };

    } catch (error) {
        console.error(`ProductService: Lỗi khi fetch sản phẩm ID ${productId}:`, error);
        throw new Error(`Không thể kết nối hoặc lấy chi tiết sản phẩm (ID: ${productId}).`);
    }
};

/**
 * Searches for products by name using the server API.
 * @param {string} name - The name or keyword to search for products.
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 * @throws {Error} If the network request fails or the server returns an error status.
 */
export const searchProductsByName = async (name) => {
  if (!name || typeof name !== 'string' || name.trim() === '') {
    console.error('ProductService: Tên tìm kiếm không hợp lệ:', name);
    throw new Error('Tên tìm kiếm không hợp lệ.');
  }

  const url = `${API_BASE_URL}/search/${encodeURIComponent(name.trim())}`;
  console.log(`ProductService: Searching products with name "${name}" from ${url}`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`ProductService: Lỗi HTTP: ${response.status} - ${response.statusText}`);
      const text = await response.text();
      console.log('Response:', text);
      throw new Error(`Lỗi HTTP: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`ProductService: Tìm kiếm sản phẩm với tên "${name}" thành công.`);
    return data.map(product => ({
      ...product,
      specs:parseProductDetail(product.detailDesc),
    }));

  } catch (error) {
    console.error(`ProductService: Lỗi khi tìm kiếm sản phẩm với tên "${name}":`, error);
    throw new Error('Không thể kết nối hoặc tìm kiếm sản phẩm từ máy chủ.');
  }
};

/**
 * Generates a dynamic description based on the product's factory.
 * @param {string} factory - The factory type of the product (e.g., Predator, Nitro, Aspire).
 * @returns {string} HTML string containing the factory-specific description.
 */
export const generateFactoryDescription = (factory) => {
  let description = '';
  switch (factory?.toLowerCase()) {
    case 'asus':
      description = `
        <h1>Laptop Gaming ASUS – Chiến Game Cực Đỉnh, Hiệu Năng Mạnh Mẽ, Thiết Kế Ấn Tượng</h1>

        <h3>Sự lựa chọn hoàn hảo cho game thủ từ phổ thông đến chuyên nghiệp</h3>
    
        <p>Laptop gaming <strong>ASUS</strong> từ lâu đã là một biểu tượng trong cộng đồng game thủ với các dòng sản phẩm <strong>ROG (Republic of Gamers)</strong> và <strong>TUF Gaming</strong>. Những chiếc máy này không chỉ có hiệu năng khủng, mà còn sở hữu thiết kế đậm chất gaming, hệ thống tản nhiệt tiên tiến và nhiều tính năng tối ưu cho game thủ.</p>
    
        <h3>Thiết kế đậm chất gaming – chắc chắn, cá tính</h3>
        <p>Dòng laptop gaming <strong>ROG</strong> mang đến thiết kế <strong>hầm hố</strong>, đậm chất chiến đấu với những đường cắt sắc sảo, hiệu ứng đèn RGB cực kỳ ấn tượng. Các dòng <strong>TUF Gaming</strong> mang vẻ ngoài chắc chắn, với khả năng chịu được những tác động mạnh mẽ. Cả hai dòng đều sở hữu khung máy cứng cáp, bảo vệ laptop trong mọi điều kiện.</p>
    
        <h3>Cấu hình khủng – chiến mượt mọi tựa game từ eSports đến AAA</h3>
        <p>Laptop gaming ASUS được trang bị vi xử lý <strong>Intel Core i7/i9</strong> hoặc <strong>AMD Ryzen 7/9</strong>, cùng với <strong>card đồ họa NVIDIA GeForce RTX 3060, 3070, 3080</strong> giúp bạn chiến mượt các tựa game AAA, từ <strong>Cyberpunk 2077</strong> đến <strong>League of Legends</strong> hay <strong>Dota 2</strong>. Với <strong>RAM 16GB hoặc 32GB</strong>, bạn có thể đa nhiệm mà không gặp phải hiện tượng giật lag.</p>
    
        <h3>Màn hình tần số quét cao – hiển thị mượt mà, không giật lag</h3>
        <p>Laptop ASUS gaming thường được trang bị màn hình <strong>Full HD hoặc 4K</strong> với <strong>tần số quét lên đến 165Hz</strong>, giúp bạn có những trải nghiệm chơi game mượt mà, phản ứng nhanh và chính xác. Công nghệ <strong>G-Sync</strong> giúp đồng bộ hóa tốc độ khung hình của card đồ họa và màn hình, giảm thiểu hiện tượng xé hình.</p>
    
        <h3>Hệ thống tản nhiệt ưu việt – đảm bảo máy không bị nóng</h3>
        <p>Laptop ASUS gaming sử dụng công nghệ tản nhiệt <strong>Cooler Boost</strong>, với quạt kép và các ống dẫn nhiệt tiên tiến giúp máy luôn duy trì nhiệt độ lý tưởng trong suốt quá trình chơi game căng thẳng. Điều này giúp tăng hiệu suất và kéo dài tuổi thọ của máy.</p>
    
        <h3>Bàn phím RGB – kết nối đa dạng – pin đủ dùng</h3>
        <p>Laptop ASUS gaming có <strong>bàn phím RGB</strong> với hành trình phím cực kỳ chính xác, giúp bạn thao tác nhanh chóng trong mọi trận đấu. Cổng kết nối <strong>USB-C, HDMI</strong> và <strong>RJ45</strong> giúp bạn kết nối với nhiều thiết bị ngoại vi. Máy có <strong>pin sử dụng lên đến 6-8 giờ</strong> cho những công việc nhẹ nhàng hoặc chơi game vừa phải.</p>
    
        <h3>Giá cả hợp lý – bảo hành chính hãng</h3>
        <p>Laptop gaming ASUS có mức giá từ <strong>18 triệu đồng</strong> đến <strong>50 triệu đồng</strong>, tùy vào cấu hình và dòng máy. Sản phẩm được bảo hành chính hãng, giúp bạn an tâm sử dụng lâu dài.</p>
      `;
      break;
    case 'acer':
      description = `
        <h1>Laptop Gaming Acer – Chiến Game Mượt Mà, Hiệu Năng Đỉnh Cao, Giá Hấp Dẫn</h1>

        <h3>Lựa chọn lý tưởng cho game thủ đam mê hiệu suất mạnh mẽ</h3>

        <p>Laptop gaming <strong>Acer</strong> được trang bị cấu hình mạnh mẽ, thiết kế đậm chất thể thao điện tử và khả năng chiến mượt mà mọi tựa game. Các dòng như <strong>Acer Predator Helios</strong> và <strong>Acer Nitro 5</strong> được ưa chuộng nhờ khả năng xử lý các tựa game đồ họa cao, từ eSports đến game AAA.</p>

        <h3>Thiết kế hầm hố – đậm chất gaming</h3>
        <p>Với các dòng <strong>Acer Predator</strong> và <strong>Acer Nitro</strong>, bạn sẽ có những chiếc laptop gaming với thiết kế <strong>hầm hố</strong>, các chi tiết sắc sảo, mạnh mẽ, cùng với hệ thống đèn RGB tạo điểm nhấn nổi bật.</p>

        <h3>Cấu hình mạnh mẽ – chiến mượt mọi tựa game</h3>
        <p>Laptop Acer gaming được trang bị các bộ vi xử lý <strong>Intel Core i7/i9</strong> hoặc <strong>AMD Ryzen 7/9</strong>, cùng với <strong>card đồ họa NVIDIA GeForce RTX</strong> giúp máy có thể chiến mượt mà các tựa game như <strong>Cyberpunk 2077</strong>, <strong>Fortnite</strong> và <strong>Call of Duty</strong>.</p>

        <h3>Màn hình tần số quét cao – trải nghiệm game mượt mà</h3>
        <p>Với màn hình <strong>Full HD</strong> hoặc <strong>4K</strong> và tần số quét lên đến <strong>240Hz</strong>, laptop Acer gaming cung cấp hình ảnh sắc nét, mượt mà, đồng thời giảm thiểu hiện tượng xé hình nhờ công nghệ <strong>G-Sync</strong>.</p>

        <h3>Tản nhiệt hiệu quả – chiến game không lo nhiệt độ</h3>
        <p>Với công nghệ <strong>CoolBoost</strong> và hệ thống quạt kép, Acer giúp giữ cho laptop luôn mát mẻ ngay cả trong những trận game căng thẳng.</p>

        <h3>Giá cả hợp lý – bảo hành chính hãng</h3>
        <p>Giá laptop gaming Acer dao động từ <strong>15 triệu đồng</strong> đến <strong>40 triệu đồng</strong>, phù hợp với nhiều phân khúc game thủ. Máy được bảo hành chính hãng tại các trung tâm dịch vụ của Acer trên toàn quốc.</p>
      `;
      break;
    case 'lenovo':
      description = `
        <h1>Laptop Gaming Lenovo – Hiệu Năng Mạnh Mẽ, Thiết Kế Hầm Hố, Giá Cả Phải Chăng</h1>

        <h3>Chinh phục mọi tựa game với cấu hình cực khủng</h3>
    
        <p>Laptop gaming <strong>Lenovo</strong> luôn mang đến cho game thủ một trải nghiệm tuyệt vời với <strong>cấu hình mạnh mẽ</strong> và <strong>thiết kế đậm chất gaming</strong>. Các dòng như <strong>Legion 5</strong> và <strong>Legion 7i</strong> nổi bật với khả năng chiến mượt mà mọi tựa game, từ những trò chơi eSports đến các game AAA yêu cầu cấu hình cao.</p>
    
        <h3>Thiết kế hầm hố – đậm chất gaming</h3>
        <p>Với thiết kế mạnh mẽ và đậm chất thể thao điện tử, các dòng laptop <strong>Lenovo Legion</strong> được trang bị hệ thống đèn RGB và các chi tiết sắc sảo, giúp bạn thể hiện đẳng cấp trong từng trận game. Khung máy chắc chắn, tản nhiệt hiệu quả, mang đến cảm giác gaming chuyên nghiệp.</p>
    
        <h3>Cấu hình cực mạnh – chiến game mọi lúc, mọi nơi</h3>
        <p>Lenovo trang bị cho laptop gaming của mình các vi xử lý <strong>Intel Core i7/i9</strong> hoặc <strong>AMD Ryzen 7/9</strong> kết hợp với <strong>card đồ họa NVIDIA GeForce RTX</strong> giúp máy có thể chiến mượt mà mọi tựa game nặng như <strong>Cyberpunk 2077</strong>, <strong>Red Dead Redemption 2</strong>, và <strong>Call of Duty: Warzone</strong>. Tốc độ xử lý và khả năng đa nhiệm vượt trội sẽ đáp ứng mọi nhu cầu của game thủ.</p>
    
        <h3>Màn hình tần số quét cao – trải nghiệm mượt mà</h3>
        <p>Với màn hình <strong>Full HD</strong> hoặc <strong>4K</strong> và tần số quét lên đến <strong>165Hz</strong>, laptop Lenovo Legion mang đến trải nghiệm game cực kỳ mượt mà. Các công nghệ đồng bộ như <strong>NVIDIA G-Sync</strong> giúp loại bỏ hiện tượng xé hình, mang lại hình ảnh sắc nét và cực kỳ mượt mà.</p>
    
        <h3>Tản nhiệt hiệu quả – luôn mát mẻ trong trận đấu</h3>
        <p>Với công nghệ <strong>Coldfront 3.0</strong>, hệ thống quạt kép và các khe tản nhiệt được thiết kế thông minh, laptop Lenovo Legion giúp duy trì hiệu suất làm việc ổn định và làm mát máy ngay cả khi chiến game lâu dài, giúp bạn thoải mái chơi game mà không lo về nhiệt độ.</p>
    
        <h3>Giá cả hợp lý – bảo hành chính hãng</h3>
        <p>Máy có giá từ <strong>15 triệu đồng</strong> đến <strong>40 triệu đồng</strong>, phù hợp với nhiều đối tượng game thủ. Lenovo cũng cung cấp dịch vụ bảo hành chính hãng tại các trung tâm bảo hành trên toàn quốc, giúp bạn yên tâm khi sử dụng máy lâu dài.</p>
      `;
      break;
      case 'apple':
        description = `
            <h1>MacBook – Sự Lựa Chọn Hoàn Hảo Cho Doanh Nhân Và Chuyên Gia</h1>

            <h3>Thiết kế sang trọng – chất liệu cao cấp</h3>

            <p>MacBook luôn nổi bật với thiết kế <strong>sang trọng</strong>, <strong>mỏng nhẹ</strong> và được làm từ chất liệu <strong>nhôm nguyên khối</strong> cao cấp. Dòng sản phẩm này luôn được các doanh nhân và chuyên gia ưa chuộng nhờ vào vẻ ngoài thanh lịch, tinh tế.</p>

            <h3>Cấu hình mạnh mẽ – đáp ứng mọi nhu cầu công việc</h3>
            <p>MacBook được trang bị chip <strong>Apple M1/M2</strong> hoặc <strong>Intel Core i5/i7</strong>, giúp xử lý nhanh chóng mọi tác vụ, từ chỉnh sửa video, thiết kế đồ họa, cho đến các công việc văn phòng chuyên nghiệp. MacBook Air và MacBook Pro đều sở hữu hiệu năng ấn tượng và thời gian sử dụng pin lâu dài.</p>

            <h3>Màn hình Retina sắc nét – độ sáng cao, màu sắc trung thực</h3>
            <p>Màn hình Retina của MacBook có độ phân giải cao, với màu sắc <strong>sắc nét</strong> và trung thực. Công nghệ True Tone giúp điều chỉnh ánh sáng màn hình, bảo vệ mắt trong suốt quá trình làm việc.</p>

            <h3>Hệ sinh thái Apple – kết nối mạnh mẽ, dễ dàng sử dụng</h3>
            <p>MacBook là sản phẩm trong hệ sinh thái <strong>Apple</strong>, giúp kết nối dễ dàng với các thiết bị như iPhone, iPad, Apple Watch, v.v. Bạn có thể tận dụng các tính năng như Handoff, Continuity và AirDrop để làm việc hiệu quả hơn.</p>

            <h3>Giá trị lâu dài – bảo hành chính hãng</h3>
            <p>MacBook có giá từ <strong>20 triệu đồng</strong> đến <strong>50 triệu đồng</strong>, và được bảo hành chính hãng tại các trung tâm dịch vụ của Apple trên toàn quốc. Sản phẩm này không chỉ có giá trị sử dụng lâu dài mà còn có giá trị bán lại cao.</p>
        `;
        break;
    default:
      description = `
        <h3>Thông tin dòng sản phẩm</h3>
        <p>Đây là một dòng laptop chất lượng với hiệu năng ổn định, phù hợp cho nhiều nhu cầu sử dụng. Vui lòng liên hệ để biết thêm chi tiết!</p>
      `;
      break;
  }
  return description;
};