// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { loginUser, registerUser, getUserByToken } from '../services/authService';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken')); // Lấy token từ localStorage nếu có
  const [isLoading, setIsLoading] = useState(true); // Để xử lý kiểm tra token ban đầu
  const [authError, setAuthError] = useState(null); // Lưu lỗi xác thực

  // --- State cho Modal ---
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' or 'register'

  // --- Hàm kiểm tra token khi tải ứng dụng ---
  const verifyToken = useCallback(async () => {
    const storedToken = localStorage.getItem('authToken');
    console.log("AuthContext: Checking stored token:", storedToken);
    if (storedToken) {
      try {
        setToken(storedToken);
        const fetchedUser = await getUserByToken(storedToken); // Gọi service để xác thực token
        setUser(fetchedUser);
        setIsAuthenticated(true);
        console.log("AuthContext: User authenticated from stored token", fetchedUser);
      } catch (error) {
        console.error("AuthContext: Token verification failed", error);
        localStorage.removeItem('authToken'); // Xóa token hỏng
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
        console.log("AuthContext: No stored token found.")
    }
    setIsLoading(false); // Kết thúc quá trình kiểm tra ban đầu
  }, []);

  useEffect(() => {
    verifyToken(); // Chạy kiểm tra token khi component mount
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Chỉ chạy 1 lần

  // --- Hàm xử lý Đăng nhập ---
  const login = async (credentials) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const { user: loggedInUser, token: receivedToken } = await loginUser(credentials);
      setUser(loggedInUser);
      setToken(receivedToken);
      setIsAuthenticated(true);
      localStorage.setItem('authToken', receivedToken); // Lưu token
      setIsAuthModalOpen(false); // Đóng modal khi thành công
      console.log("AuthContext: Login successful, modal closed.");
    } catch (error) {
      console.error("AuthContext: Login error", error);
      setAuthError(error.message || 'Đăng nhập thất bại.');
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Hàm xử lý Đăng ký ---
  const register = async (userData) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const registeredUser = await registerUser(userData);
      console.log("AuthContext: Registration successful", registeredUser);
      // Không tự động đăng nhập, yêu cầu user đăng nhập lại
      setAuthModalMode('login'); // Chuyển modal sang form đăng nhập
      // Có thể set một thông báo thành công tạm thời ở đây
      // setSuccessMessage("Đăng ký thành công! Vui lòng đăng nhập.");
      alert("Đăng ký thành công! Vui lòng đăng nhập."); // Dùng alert tạm
    } catch (error) {
      console.error("AuthContext: Registration error", error);
      setAuthError(error.message || 'Đăng ký thất bại.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Hàm xử lý Đăng xuất ---
  const logout = () => {
    console.log("AuthContext: Logging out");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Xóa token khỏi localStorage
    // Có thể gọi API logout của backend nếu cần
    // await logoutUser(token);
  };

  // --- Hàm điều khiển Modal ---
  const openLoginModal = () => {
    setAuthError(null); // Xóa lỗi cũ
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
    console.log("AuthContext: Opening Login Modal");
  };

  const openRegisterModal = () => {
    setAuthError(null); // Xóa lỗi cũ
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
     console.log("AuthContext: Opening Register Modal");
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthError(null);
     console.log("AuthContext: Closing Auth Modal");
  };

  const switchToRegister = () => {
      setAuthError(null);
      setAuthModalMode('register');
       console.log("AuthContext: Switching to Register Mode");
  }

   const switchToLogin = () => {
       setAuthError(null);
       setAuthModalMode('login');
       console.log("AuthContext: Switching to Login Mode");
   }


  // --- Giá trị cung cấp bởi Context ---
  const value = {
    isAuthenticated,
    user,
    token,
    isLoading, // Trạng thái loading chung (cho login/register/verify)
    authError,
    login,
    register,
    logout,
    // Modal controls
    isAuthModalOpen,
    authModalMode,
    openLoginModal,
    openRegisterModal,
    closeAuthModal,
    switchToRegister,
    switchToLogin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}