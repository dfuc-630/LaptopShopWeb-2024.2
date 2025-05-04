import React from 'react';
import './RefundPolicy.css';

function RefundPolicy() {
  return (
    <div className="doi-tra-policy">
      <h2>Chính Sách Đổi Trả</h2>

      {/* I. QUY ĐỊNH CHUNG */}
      <h3>I. Quy định chung</h3>
      <table className="policy-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Hạng mục</th>
            <th>Nội dung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Đủ điều kiện đổi trả</td>
            <td>
              Sản phẩm chưa sử dụng còn giữ nguyên 100% hình dạng ban đầu hoặc đã sử dụng nhưng đảm bảo:
              <ul>
                <li>Màn hình không trầy xước.</li>
                <li>Đủ điều kiện bảo hành theo chính sách của hãng, không có các tình trạng bất thường về chức năng và ngoại quan (mất/chập chờn nguồn, treo đơ, cấn móp, sứt mẻ, nút, vỡ, đọng nước/hơi ẩm, có mùi khét,...).</li>
                <li>Tài khoản: Máy đã được đăng xuất khỏi tất cả các tài khoản như: iCloud, Google Account, Mi Account,...</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Đủ điều kiện bảo hành</td>
            <td>
              Sản phẩm đủ điều kiện bảo hành theo chính sách của hãng công bố và được kết luận bởi nhà sản xuất hoặc trung tâm bảo hành chính hãng/đối tác ủy quyền.
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Không đủ điều kiện bảo hành hãng</td>
            <td>
              Sản phẩm nằm ngoài chính sách bảo hành được công bố bởi hãng và được trung tâm bảo hành chính hãng hoặc đối tác ủy quyền kiểm tra, kết luận.
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Phí phát sinh trong quá trình đổi trả</td>
            <td>
              HustLaptop sẽ kiểm tra tình trạng máy và thông báo đến khách hàng về mức phí phải thu ngay tại cửa hàng. Bao gồm:
              <ul>
                <li>Phí khấu hao</li>
                <li>Phí vỏ hộp</li>
                <li>Phí phụ kiện</li>
                <li>Phí trầy xước</li>
                <li>Phí hóa đơn công ty nếu không có bản thu hồi (Đổi trả hàng trong 30 ngày)</li>
                <li>Số tiền tương đương giá trị quà tặng khuyến mãi đi kèm nếu không được hoàn trả</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      {/* II. CÁC CHÍNH SÁCH ĐỔI TRẢ */}
      <h3>II. Các chính sách đổi trả</h3>
      <table className="policy-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Loại sản phẩm</th>
            <th>Chính sách đổi trả</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Laptop</td>
            <td>
              <ul>
                <li>Đổi trả trong vòng 30 ngày nếu sản phẩm bị lỗi kỹ thuật do nhà sản xuất.</li>
                <li>Hoàn tiền 100% nếu không có sản phẩm thay thế.</li>
                <li>Phí đổi trả áp dụng nếu sản phẩm không bị lỗi (theo quy định tại mục I.4).</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Phụ kiện</td>
            <td>
              <ul>
                <li>Đổi trả trong vòng 7 ngày nếu sản phẩm bị lỗi kỹ thuật.</li>
                <li>Không áp dụng đổi trả nếu sản phẩm đã qua sử dụng hoặc không còn nguyên vẹn.</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Phần mềm</td>
            <td>
              <ul>
                <li>Không áp dụng đổi trả cho các sản phẩm phần mềm đã kích hoạt.</li>
                <li>Hỗ trợ kỹ thuật nếu có lỗi trong quá trình cài đặt.</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Quy trình đổi trả</h3>
      <ol>
        <li>Liên hệ với bộ phận hỗ trợ khách hàng của HustLaptop để thông báo về yêu cầu đổi trả.</li>
        <li>Cung cấp thông tin chi tiết về sản phẩm, tình trạng lỗi, và hóa đơn mua hàng.</li>
        <li>Gửi sản phẩm cần đổi trả về địa chỉ [địa chỉ nhận đổi trả].</li>
        <li>Sau khi nhận và kiểm tra sản phẩm, chúng tôi sẽ tiến hành đổi sản phẩm mới hoặc hoàn tiền theo quy định.</li>
      </ol>
    </div>
  );
}

export default RefundPolicy;