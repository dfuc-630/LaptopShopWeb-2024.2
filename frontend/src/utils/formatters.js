// src/utils/formatters.js
/**
 * Định dạng một số thành chuỗi tiền tệ Việt Nam (VND).
 * @param {number} value Số tiền cần định dạng.
 * @param {string} currencySymbol Ký hiệu tiền tệ (mặc định là 'đ').
 * @returns {string} Chuỗi tiền tệ đã định dạng (ví dụ: "19.990.000 đ") hoặc chuỗi rỗng nếu đầu vào không hợp lệ.
 */
export const formatCurrency = (value, currencySymbol = 'đ') => {
    if (typeof value !== 'number' || isNaN(value)) {
      // console.warn("formatCurrency: Invalid input value:", value); // Cảnh báo nếu giá trị không hợp lệ
      return ''; // Hoặc trả về '0 đ' tùy theo yêu cầu
    }
  
    // Sử dụng Intl.NumberFormat để định dạng số theo chuẩn Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      // style: 'currency', // Không dùng style currency để có thể tùy chỉnh vị trí 'đ'
      // currency: 'VND', // Không cần thiết nếu không dùng style currency
      minimumFractionDigits: 0, // Không hiển thị phần thập phân
      maximumFractionDigits: 0,
    });
  
    const formattedNumber = formatter.format(value);
  
    // Thêm ký hiệu tiền tệ vào cuối chuỗi
    return `${formattedNumber} ${currencySymbol}`;
  };