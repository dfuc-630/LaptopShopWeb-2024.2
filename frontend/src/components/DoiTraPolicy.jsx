import React from 'react';
import './DoiTraPolicy.css';

function DoiTraPolicy() {
  return (
    <div className="doi-tra-policy">
      <h2>Chính Sách Đổi Trả</h2>
      <p>Chúng tôi hiểu rằng đôi khi bạn có thể cần đổi hoặc trả lại sản phẩm. Dưới đây là các quy định về chính sách đổi trả của HustLaptop:</p>
      <h3>Điều kiện đổi trả:</h3>
      <ul>
        <li>Sản phẩm phải còn nguyên vẹn, không bị trầy xước, móp méo, hoặc có dấu hiệu đã qua sử dụng.</li>
        <li>Sản phẩm phải còn đầy đủ phụ kiện, tem mác, phiếu bảo hành (nếu có) và hóa đơn mua hàng.</li>
        <li>Thời gian đổi trả được áp dụng trong vòng [số ngày] kể từ ngày mua hàng.</li>
        {/* Thêm các điều kiện khác */}
      </ul>
      <h3>Các trường hợp được đổi trả:</h3>
      <ul>
        <li>Sản phẩm bị lỗi kỹ thuật do nhà sản xuất.</li>
        <li>Sản phẩm không đúng với đơn đặt hàng (sai mẫu mã, màu sắc, cấu hình).</li>
        <li>Sản phẩm bị hư hỏng trong quá trình vận chuyển (có bằng chứng).</li>
      </ul>
      <h3>Các trường hợp không được đổi trả:</h3>
      <ul>
        <li>Sản phẩm đã qua sử dụng.</li>
        <li>Sản phẩm bị lỗi do người sử dụng (va đập, rơi vỡ, vào nước, v.v.).</li>
        <li>Sản phẩm không còn đầy đủ phụ kiện, tem mác, hóa đơn.</li>
        {/* Thêm các trường hợp khác */}
      </ul>
      <h3>Quy trình đổi trả:</h3>
      <ol>
        <li>Liên hệ với bộ phận hỗ trợ khách hàng của HustLaptop để thông báo về yêu cầu đổi trả.</li>
        <li>Cung cấp thông tin chi tiết về sản phẩm, tình trạng lỗi, và hóa đơn mua hàng.</li>
        <li>Gửi sản phẩm cần đổi trả về địa chỉ [địa chỉ nhận đổi trả].</li>
        <li>Sau khi nhận và kiểm tra sản phẩm, chúng tôi sẽ tiến hành đổi sản phẩm mới hoặc hoàn tiền theo quy định.</li>
      </ol>
      {/* Thông tin về phí đổi trả (nếu có), thời gian xử lý, v.v. */}
    </div>
  );
}

export default DoiTraPolicy;