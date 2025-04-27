import React from 'react';
import './BaoMatPolicy.css';

function BaoMatPolicy() {
  return (
    <div className="bao-mat-policy">
      <h2>Chính Sách Bảo Mật Thông Tin</h2>
      <p>HustLaptop cam kết bảo vệ sự riêng tư và thông tin cá nhân của khách hàng. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn:</p>
      <h3>Thông tin chúng tôi thu thập:</h3>
      <ul>
        <li>Thông tin cá nhân bạn cung cấp khi đăng ký tài khoản, đặt hàng (tên, địa chỉ, số điện thoại, email, v.v.).</li>
        <li>Thông tin về lịch sử mua hàng và tương tác của bạn trên website.</li>
        <li>Thông tin kỹ thuật về thiết bị và trình duyệt bạn sử dụng.</li>
        {/* Thêm các loại thông tin khác */}
      </ul>
      <h3>Cách chúng tôi sử dụng thông tin của bạn:</h3>
      <ul>
        <li>Xử lý đơn hàng và cung cấp dịch vụ hỗ trợ khách hàng.</li>
        <li>Cá nhân hóa trải nghiệm mua sắm và gợi ý sản phẩm phù hợp.</li>
        <li>Gửi thông tin về các chương trình khuyến mãi, sản phẩm mới (nếu bạn đồng ý).</li>
        <li>Cải thiện website và nâng cao chất lượng dịch vụ.</li>
        {/* Thêm các mục đích sử dụng khác */}
      </ul>
      <h3>Bảo vệ thông tin cá nhân:</h3>
      <ul>
        <li>Chúng tôi sử dụng các biện pháp bảo mật tiêu chuẩn để bảo vệ thông tin của bạn khỏi truy cập trái phép, mất mát hoặc lạm dụng.</li>
        <li>Thông tin thanh toán của bạn được mã hóa an toàn.</li>
        <li>Chúng tôi cam kết không chia sẻ thông tin cá nhân của bạn với bên thứ ba không liên quan mà không có sự đồng ý của bạn, trừ các trường hợp pháp luật quy định.</li>
        {/* Thêm các biện pháp bảo mật cụ thể */}
      </ul>
      <h3>Quyền của bạn đối với thông tin cá nhân:</h3>
      <ul>
        <li>Bạn có quyền truy cập, chỉnh sửa hoặc yêu cầu xóa thông tin cá nhân của mình.</li>
        <li>Bạn có quyền từ chối nhận các thông tin quảng cáo từ chúng tôi.</li>
        {/* Thêm các quyền khác */}
      </ul>
      <p>Để biết thêm chi tiết, vui lòng liên hệ với bộ phận hỗ trợ khách hàng của chúng tôi.</p>
    </div>
  );
}

export default BaoMatPolicy;