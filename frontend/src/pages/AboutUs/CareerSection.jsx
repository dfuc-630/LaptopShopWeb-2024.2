import React from 'react';
import './CareerSection.css'; // Import CSS cho section này

function CareerSection() {
  const positions = [
    {
      id: 1,
      title: 'Nhân viên Kinh doanh',
      description: 'Chịu trách nhiệm tư vấn khách hàng, phát triển thị trường và đạt chỉ tiêu doanh số.',
      requirements: [
        'Tốt nghiệp Cao đẳng/Đại học chuyên ngành Kinh tế, Quản trị kinh doanh hoặc liên quan.',
        'Kỹ năng giao tiếp và đàm phán tốt.',
        'Có kinh nghiệm trong lĩnh vực kinh doanh là một lợi thế.'
      ],
      benefits: [
        'Lương cơ bản + hoa hồng hấp dẫn.',
        'Được đào tạo chuyên sâu về sản phẩm và kỹ năng bán hàng.',
        'Môi trường làm việc năng động, chuyên nghiệp.'
      ]
    },
    {
      id: 2,
      title: 'Kỹ thuật viên Phần cứng',
      description: 'Thực hiện sửa chữa, bảo trì và nâng cấp phần cứng laptop cho khách hàng.',
      requirements: [
        'Tốt nghiệp Trung cấp/Cao đẳng chuyên ngành Công nghệ thông tin, Điện tử hoặc liên quan.',
        'Hiểu biết sâu về phần cứng máy tính và laptop.',
        'Kỹ năng phân tích và giải quyết vấn đề tốt.'
      ],
      benefits: [
        'Lương cạnh tranh, thưởng theo hiệu suất.',
        'Được tiếp cận với các công nghệ mới nhất.',
        'Cơ hội phát triển nghề nghiệp trong lĩnh vực công nghệ.'
      ]
    },
    {
      id: 3,
      title: 'Chuyên viên Marketing',
      description: 'Lên kế hoạch và triển khai các chiến dịch marketing để tăng nhận diện thương hiệu.',
      requirements: [
        'Tốt nghiệp Đại học chuyên ngành Marketing, Truyền thông hoặc liên quan.',
        'Kỹ năng sáng tạo nội dung và phân tích dữ liệu.',
        'Có kinh nghiệm chạy quảng cáo trên các nền tảng như Facebook, Google là một lợi thế.'
      ],
      benefits: [
        'Lương cơ bản + thưởng theo KPI.',
        'Được tham gia các khóa đào tạo chuyên sâu về marketing.',
        'Môi trường làm việc sáng tạo, khuyến khích đổi mới.'
      ]
    }
  ];

  return (
    <section className="tuyen-dung-section">
      <p className="section-description">
        Chúng tôi luôn tìm kiếm những tài năng gia nhập đội ngũ của mình. Hãy cùng chúng tôi xây dựng một môi trường làm việc chuyên nghiệp, sáng tạo và đầy cơ hội phát triển.
      </p>
      <ul className="position-list">
        {positions.map(position => (
          <li key={position.id} className="position-item">
            <h3 className="position-title">{position.title}</h3>
            <p className="position-description">{position.description}</p>
            <h4>Yêu cầu:</h4>
            <ul className="requirements-list">
              {position.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
            <h4>Quyền lợi:</h4>
            <ul className="benefits-list">
              {position.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            <button className="apply-button">Ứng tuyển ngay</button>
          </li>
        ))}
      </ul>
      <div className="additional-info">
        <h3>Quy trình ứng tuyển</h3>
        <p>
          1. Gửi CV và thư ứng tuyển qua email: <strong>hr@hustlaptop.com</strong>.<br />
          2. Tham gia phỏng vấn trực tiếp tại văn phòng.<br />
          3. Nhận kết quả trong vòng 3-5 ngày làm việc.
        </p>
        <h3>Văn hóa công ty</h3>
        <p>
          Tại HustLaptop, chúng tôi đề cao sự sáng tạo, tinh thần làm việc nhóm và không ngừng học hỏi. Chúng tôi cam kết mang lại môi trường làm việc thân thiện, nơi mọi người đều có cơ hội phát triển.
        </p>
      </div>
    </section>
  );
}

export default CareerSection;