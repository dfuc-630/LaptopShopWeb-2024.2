import React from 'react';
import './BuyPolicy.css';

function BuyPolicy() {
  return (
    <div className="mua-hang-policy">
      <h2>Chính Sách Mua Hàng</h2>
      <p>
        Chào mừng bạn đến với trang chính sách mua hàng của HustLaptop. Dưới đây là các thông tin chi tiết về quy trình mua hàng, phương thức thanh toán, và các điều khoản liên quan nhằm đảm bảo quyền lợi của khách hàng.
      </p>

      <h3>1. Quy trình đặt hàng</h3>
      <ol>
        <li>Tìm kiếm và chọn sản phẩm bạn muốn mua trên website hoặc ứng dụng HustLaptop.</li>
        <li>Thêm sản phẩm vào giỏ hàng bằng cách nhấn nút "Thêm vào giỏ".</li>
        <li>Kiểm tra giỏ hàng để đảm bảo thông tin sản phẩm, số lượng và giá cả chính xác.</li>
        <li>Nhấn nút "Thanh toán" và cung cấp thông tin giao hàng (họ tên, địa chỉ, số điện thoại).</li>
        <li>Chọn phương thức thanh toán phù hợp (COD, chuyển khoản, ví điện tử, v.v.).</li>
        <li>Xác nhận đơn hàng và hoàn tất thanh toán.</li>
        <li>HustLaptop sẽ gửi email xác nhận đơn hàng và tiến hành xử lý, giao hàng trong thời gian quy định.</li>
      </ol>

      <h3>2. Phương thức thanh toán</h3>
      <ul>
        <li><strong>Thanh toán khi nhận hàng (COD):</strong> Khách hàng thanh toán trực tiếp cho nhân viên giao hàng khi nhận sản phẩm.</li>
        <li><strong>Thanh toán trực tuyến:</strong> Sử dụng thẻ ngân hàng (Visa, Mastercard, JCB, v.v.) để thanh toán an toàn và tiện lợi.</li>
        <li><strong>Chuyển khoản ngân hàng:</strong> Thực hiện chuyển khoản đến tài khoản ngân hàng của HustLaptop. Thông tin tài khoản sẽ được cung cấp trong quá trình đặt hàng.</li>
        <li><strong>Thanh toán qua ví điện tử:</strong> Hỗ trợ các ví điện tử phổ biến như MoMo, ZaloPay, ShopeePay, v.v.</li>
      </ul>

      <h3>3. Xác nhận đơn hàng</h3>
      <p>
        Sau khi hoàn tất đặt hàng, bạn sẽ nhận được email xác nhận từ HustLaptop. Email này bao gồm thông tin chi tiết về sản phẩm, số lượng, giá cả, địa chỉ giao hàng và phương thức thanh toán. Nếu có bất kỳ sai sót nào, vui lòng liên hệ ngay với bộ phận hỗ trợ khách hàng để được điều chỉnh.
      </p>

      <h3>4. Thời gian giao hàng</h3>
      <ul>
        <li>Thời gian giao hàng dự kiến từ 2-5 ngày làm việc đối với khu vực nội thành.</li>
        <li>Đối với các khu vực ngoại thành hoặc vùng sâu, vùng xa, thời gian giao hàng có thể kéo dài từ 5-7 ngày làm việc.</li>
        <li>HustLaptop sẽ thông báo cụ thể thời gian giao hàng trong email xác nhận đơn hàng.</li>
      </ul>

      <h3>5. Phí vận chuyển</h3>
      <ul>
        <li>Miễn phí vận chuyển cho đơn hàng có giá trị từ 1.000.000 VNĐ trở lên.</li>
        <li>Đối với đơn hàng dưới 1.000.000 VNĐ, phí vận chuyển sẽ được tính dựa trên khoảng cách và trọng lượng sản phẩm.</li>
        <li>Phí vận chuyển cụ thể sẽ được hiển thị trong quá trình đặt hàng.</li>
      </ul>

      <h3>6. Hủy đơn hàng</h3>
      <p>
        Bạn có thể hủy đơn hàng trong vòng 24 giờ kể từ khi đặt hàng nếu đơn hàng chưa được xử lý hoặc giao đi. Để hủy đơn hàng, vui lòng liên hệ với bộ phận hỗ trợ khách hàng qua hotline <strong>1800 6601</strong> hoặc email <strong>hustlaptop@hust.com.vn</strong>.
      </p>

      <h3>7. Chính sách đổi trả</h3>
      <p>
        Nếu sản phẩm bạn nhận được không đúng với đơn đặt hàng, bị lỗi hoặc hư hỏng trong quá trình vận chuyển, bạn có thể yêu cầu đổi trả trong vòng 7 ngày kể từ ngày nhận hàng. Vui lòng tham khảo <a href="#doi-tra">Chính sách đổi trả</a> để biết thêm chi tiết.
      </p>

      <h3>8. Liên hệ hỗ trợ</h3>
      <p>
        Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ liên quan đến đơn hàng, vui lòng liên hệ với chúng tôi qua:
      </p>
      <ul>
        <li>Hotline: <strong>1800 9999 </strong></li>
        <li>Email: <strong>hustlaptop@hust.com.vn</strong></li>
        <li>Trò chuyện trực tiếp trên website hoặc ứng dụng HustLaptop.</li>
      </ul>
    </div>
  );
}

export default BuyPolicy;