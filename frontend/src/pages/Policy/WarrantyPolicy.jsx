import React from 'react';
import './WarrantyPolicy.css';

function WarrantyPolicy() {
  return (
    <div className="bao-hanh-policy">
      <h2>Chính Sách Bảo Hành</h2>
      <p>
        Tất cả sản phẩm tại HustLaptop kinh doanh đều là sản phẩm chính hãng và được bảo hành theo đúng chính sách của nhà sản xuất (*). Ngoài ra, HustLaptop cũng hỗ trợ gửi bảo hành miễn phí giúp khách hàng đối với cả sản phẩm do HustLaptop bán ra và sản phẩm Quý khách mua tại các chuỗi bán lẻ khác.
      </p>

      <h3>Đặc quyền khi mua hàng tại HustLaptop</h3>
      <ul>
        <li>Bảo hành đổi sản phẩm mới ngay tại shop trong 30 ngày nếu có lỗi NSX (**).</li>
        <li>Gửi bảo hành chính hãng không mất phí vận chuyển (***).</li>
        <li>Theo dõi tiến độ bảo hành nhanh chóng qua kênh hotline hoặc tự tra cứu <a href="#">Tại đây</a>.</li>
        <li>Hỗ trợ làm việc với hãng để xử lý phát sinh trong quá trình bảo hành.</li>
      </ul>

      <h3>Các trường hợp nằm ngoài chính sách bảo hành</h3>
      <ul>
        <li>Sản phẩm hết hạn bảo hành (Vui lòng tra cứu thời hạn bảo hành sản phẩm <a href="#">Tại đây</a>).</li>
        <li>Sản phẩm đã bị thay đổi, sửa chữa không thuộc các Trung Tâm Bảo Hành Ủy Quyền của Hãng.</li>
        <li>Sản phẩm lắp đặt, bảo trì, sử dụng không đúng theo hướng dẫn của Nhà sản xuất gây ra hư hỏng.</li>
        <li>Sản phẩm lỗi do ngấm nước, chất lỏng và bụi bẩn. Quy định này áp dụng cho cả những thiết bị đạt chứng nhận kháng nước/kháng bụi cao nhất là IP68.</li>
        <li>Sản phẩm bị biến dạng, nứt vỡ, cấn móp, trầy xước nặng do tác động nhiệt, tác động bên ngoài.</li>
        <li>Sản phẩm có vết mốc, rỉ sét hoặc bị ăn mòn, oxy hóa bởi hóa chất.</li>
        <li>Sản phẩm bị hư hại do thiên tai, hỏa hoạn, lụt lội, sét đánh, côn trùng, động vật vào.</li>
        <li>Sản phẩm trong tình trạng bị khóa tài khoản cá nhân như: Tài khoản khóa máy/màn hình, khóa tài khoản trực tuyến Xiaomi Cloud, Samsung Cloud, iCloud, Gmail...</li>
        <li>Khách hàng sử dụng phần mềm, ứng dụng không chính hãng, không bản quyền.</li>
        <li>Màn hình có bốn (04) điểm chết trở xuống.</li>
      </ul>

      <h3>Lưu ý</h3>
      <ul>
        <li>Chương trình bảo hành bắt đầu có hiệu lực từ thời điểm HustLaptop xuất hóa đơn cho Quý khách.</li>
        <li>Với mỗi dòng sản phẩm khác nhau sẽ có chính sách bảo hành khác nhau tùy theo chính sách của Hãng/Nhà cung cấp.</li>
        <li>Để tìm hiểu thông tin chi tiết về chính sách bảo hành cho sản phẩm cụ thể, xin liên hệ bộ phận Chăm sóc Khách hàng của HustLaptop qua hotline <strong>1800 6616</strong>.</li>
        <li>Tra cứu tình trạng máy gửi bảo hành bất cứ lúc nào <a href="#">Tại đây</a>.</li>
        <li>
          Trong quá trình thực hiện dịch vụ bảo hành, các nội dung lưu trữ trên sản phẩm của Quý khách sẽ bị xóa và định dạng lại. Do đó, Quý khách vui lòng tự sao lưu toàn bộ dữ liệu trong sản phẩm, đồng thời gỡ bỏ tất cả các thông tin cá nhân mà Quý khách muốn bảo mật. HustLaptop không chịu trách nhiệm đối với bất kỳ mất mát nào liên quan tới các chương trình phần mềm, dữ liệu hoặc thông tin nào khác lưu trữ trên sản phẩm bảo hành.
        </li>
        <li>Vui lòng tắt tất cả các mật khẩu bảo vệ, HustLaptop sẽ từ chối tiếp nhận bảo hành nếu thiết bị của bạn bị khóa bởi bất cứ phương pháp nào.</li>
      </ul>

      <p>
        (*) Áp dụng với các sản phẩm bán mới hoặc còn hạn bảo hành mặc định nếu đã qua sử dụng.<br />
        (**) Áp dụng với các sản phẩm thuộc diện đổi mới trong 30 ngày nếu có lỗi NSX được công bố trên website Chính sách đổi trả.<br />
        (***) Trừ các sản phẩm có chính sách bảo hành tại nhà, sản phẩm thuộc diện cồng kềnh.
      </p>
    </div>
  );
}

export default WarrantyPolicy;