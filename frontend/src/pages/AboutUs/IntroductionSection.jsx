import React from 'react';
import './IntroductionSection.css'; // Import CSS cho section này

function IntroductionSection() {
  return (
    <section className="gioi-thieu-section">
      <h3 className="section-title">Giới thiệu về HustLaptop</h3>
      <p className="section-description">
        Chào mừng đến với <strong>HustLaptop</strong>! Chúng tôi là một đội ngũ đam mê công nghệ, chuyên cung cấp các sản phẩm laptop chất lượng cao, đáp ứng mọi nhu cầu của người dùng từ học tập, làm việc đến giải trí.
      </p>

      {/* Thông tin chi tiết về công ty */}
      <div className="company-info">
        <h3>Tầm nhìn</h3>
        <p>
          Trở thành nền tảng mua sắm laptop hàng đầu tại Việt Nam, mang đến trải nghiệm mua sắm tiện lợi, nhanh chóng và đáng tin cậy.
        </p>

        <h3>Sứ mệnh</h3>
        <p>
          Cung cấp các sản phẩm công nghệ tiên tiến với giá cả hợp lý, đồng thời hỗ trợ khách hàng tận tình để họ có thể khai thác tối đa giá trị từ sản phẩm.
        </p>

        <h3>Giá trị cốt lõi</h3>
        <ul>
          <li>Chất lượng sản phẩm là ưu tiên hàng đầu.</li>
          <li>Khách hàng là trung tâm của mọi hoạt động.</li>
          <li>Đổi mới không ngừng để mang lại giá trị tốt nhất.</li>
        </ul>
      </div>

      {/* Thông tin về nhóm BTL */}
      <div className="team-info">
        <h3>Thông tin về nhóm BTL</h3>
        <p>
          Nhóm BTL bao gồm các sinh viên từ Đại học Bách Khoa Hà Nội, với niềm đam mê công nghệ và mong muốn mang lại giá trị thực tiễn qua dự án này. Chúng tôi đã cùng nhau phát triển <strong>HustLaptop</strong> như một phần của bài tập lớn môn học.
        </p>
        <ul>
          <li><strong>Thành viên nhóm</strong>: Đoàn Đại Phúc, Đỗ Minh Phúc, Phùng Hữu Phú, Trịnh Tuấn Phong.</li>
          <li><strong>Vai trò</strong>: Phân tích, thiết kế, phát triển giao diện frontend và backend.</li>
        </ul>
      </div>

      {/* Định hướng phát triển */}
      <div className="future-plans">
        <h3>Định hướng phát triển</h3>
        <p>
          Trong tương lai, chúng tôi dự định mở rộng nền tảng với các tính năng mới như:
        </p>
        <ul>
          <li>Hỗ trợ AI để gợi ý sản phẩm phù hợp với nhu cầu người dùng.</li>
          <li>Tích hợp hệ thống đánh giá và nhận xét sản phẩm từ khách hàng.</li>
          <li>Phát triển ứng dụng di động để tăng tính tiện lợi.</li>
        </ul>
      </div>

      {/* Công nghệ sử dụng */}
      <div className="technologies">
        <h3>Công nghệ sử dụng</h3>
        <p>
          Dự án được xây dựng dựa trên các công nghệ hiện đại:
        </p>
        <ul>
          <li><strong>ReactJS:</strong> Xây dựng giao diện người dùng linh hoạt và hiệu quả.</li>
          <li><strong>Node.js & Express:</strong> Xử lý backend và API.</li>
          <li><strong>MongoDB:</strong> Lưu trữ dữ liệu sản phẩm và người dùng.</li>
          <li><strong>Bootstrap:</strong> Tăng tốc phát triển giao diện với các thành phần sẵn có.</li>
        </ul>
        <p>
          Những công nghệ này giúp đảm bảo hiệu suất cao, khả năng mở rộng và trải nghiệm người dùng tốt nhất.
        </p>
      </div>
    </section>
  );
}

export default IntroductionSection;