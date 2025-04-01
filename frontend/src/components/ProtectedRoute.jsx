// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spinner } from 'react-bootstrap'; // Để hiển thị loading

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, openLoginModal } = useAuth();
  const location = useLocation(); // Lấy vị trí hiện tại

  if (isLoading) {
    // Hiển thị loading indicator trong khi đang kiểm tra trạng thái xác thực
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Nếu chưa đăng nhập:
    // 1. Mở modal đăng nhập (useEffect không hoạt động tốt ở đây vì cần trigger ngay)
    //    Việc mở modal đã được xử lý ở Header khi click link.
    // 2. Chuyển hướng người dùng về trang chủ hoặc trang trước đó (nếu muốn)
    //    Ở đây ta chuyển về trang chủ. Có thể lưu lại location để redirect sau khi login thành công.
    console.log("ProtectedRoute: Not authenticated, redirecting from", location.pathname);
    // Mở modal nếu cố truy cập trực tiếp URL (hành vi này có thể cần xem xét lại)
    // React.useEffect(() => {
    //   openLoginModal();
    // }, [openLoginModal]); // Mở modal - có thể gây vòng lặp hoặc không mong muốn

     // Tốt hơn là chỉ redirect về trang chủ
     return <Navigate to="/" state={{ from: location }} replace />;

     // Hoặc hiển thị một thông báo yêu cầu đăng nhập thay vì redirect
     // return (
     //    <div className='text-center my-5'>
     //       <h2>Vui lòng đăng nhập</h2>
     //       <p>Bạn cần đăng nhập để truy cập trang này.</p>
     //       <Button onClick={openLoginModal}>Đăng nhập ngay</Button>
     //    </div>
     // );
  }

  // Nếu đã đăng nhập, cho phép render component con
  return children;
}

export default ProtectedRoute;