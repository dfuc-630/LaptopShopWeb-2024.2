import React from 'react';
import './MuaHangPolicy.css';

function MuaHangPolicy() {
  return (
    <div className="mua-hang-policy">
      <h2>Chính Sách Mua Hàng</h2>
      <p>Chào mừng bạn đến với trang chính sách mua hàng của HustLaptop. Dưới đây là các thông tin chi tiết về quy trình mua hàng và các điều khoản liên quan:</p>
      <h3>Quy trình đặt hàng:</h3>
      <ol>
        <li>Tìm kiếm và chọn sản phẩm bạn muốn mua.</li>
        <li>Thêm sản phẩm vào giỏ hàng.</li>
        <li>Kiểm tra giỏ hàng và tiến hành thanh toán.</li>
        <li>Cung cấp thông tin giao hàng và chọn phương thức thanh toán.</li>
        <li>Xác nhận đơn hàng và hoàn tất thanh toán.</li>
        <li>Chúng tôi sẽ gửi email xác nhận đơn hàng và tiến hành giao hàng trong thời gian quy định.</li>
      </ol>
      <h3>Phương thức thanh toán:</h3>
      <ul>
        <li>Thanh toán khi nhận hàng (COD).</li>
        <li>Thanh toán trực tuyến qua thẻ ngân hàng (Visa, Mastercard, v.v.).</li>
        <li>Chuyển khoản ngân hàng.</li>
        <li>Thanh toán qua ví điện tử (MoMo, ZaloPay, v.v.).</li>
        {/* Thêm các phương thức thanh toán khác */}
      </ul>
      <h3>Xác nhận đơn hàng:</h3>
      <p>Sau khi bạn hoàn tất đặt hàng, chúng tôi sẽ gửi email xác nhận đơn hàng bao gồm thông tin chi tiết về sản phẩm, số lượng, giá cả, địa chỉ giao hàng và phương thức thanh toán.</p>
      <h3>Hủy đơn hàng:</h3>
      <p>Bạn có thể hủy đơn hàng trong vòng [thời gian] kể từ khi đặt hàng nếu đơn hàng chưa được xử lý hoặc giao đi. Vui lòng liên hệ với bộ phận hỗ trợ khách hàng để được hỗ trợ hủy đơn hàng.</p>
      {/* Thông tin về thời gian giao hàng, phí vận chuyển, v.v. */}
    </div>
  );
}

export default MuaHangPolicy;