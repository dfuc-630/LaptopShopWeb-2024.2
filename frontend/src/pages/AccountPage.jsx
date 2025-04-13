// src/pages/AccountPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

function AccountPage() {
  const { user, logout } = useAuth(); // Lấy thông tin user và hàm logout

  // Mặc dù ProtectedRoute đã kiểm tra, thêm một lớp bảo vệ nữa ở đây
  // Hoặc xử lý trường hợp user bị null đột ngột (ví dụ: token hết hạn giữa chừng)
  if (!user) {
     // Có thể hiển thị loading hoặc redirect về home
     // Vì ProtectedRoute đã xử lý, trường hợp này ít xảy ra trừ khi state bị lỗi
    console.warn("AccountPage: User data not found, redirecting.");
    // return <Navigate to="/" replace />; // Redirect nếu user null
    return <p className='text-center my-5'>Đang tải thông tin người dùng...</p>
  }

  const handleLogout = () => {
      logout();
      // Navigate đã được xử lý trong Header, nhưng có thể thêm ở đây nếu muốn
  }

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header as="h4" className="bg-light text-center">
              Thông tin tài khoản
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Tên hiển thị:</strong> {user.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> {user.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>User ID:</strong> {user.id} {/* Chỉ để demo */}
                </ListGroup.Item>
                 {/* Thêm các thông tin khác nếu có (Địa chỉ, SĐT...) */}
                 {/* <ListGroup.Item>
                    <strong>Địa chỉ:</strong> <span className='text-muted'>(Chưa cập nhật)</span>
                 </ListGroup.Item> */}
              </ListGroup>

              <hr />

              <div className="d-flex flex-column flex-sm-row justify-content-around mt-3 gap-2">
                 {/* Các nút chức năng (chưa có logic) */}
                 <Button variant="outline-primary" size="sm" disabled>
                    <i className="bi bi-pencil-square me-1"></i> Chỉnh sửa thông tin
                 </Button>
                 <Button variant="outline-secondary" size="sm" disabled>
                    <i className="bi bi-key me-1"></i> Đổi mật khẩu
                 </Button>
                 <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-1"></i> Đăng xuất
                 </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AccountPage;