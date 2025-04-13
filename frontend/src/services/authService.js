// src/services/authService.js

// Giả lập database người dùng đơn giản
const users = [
    { id: 1, email: 'user@example.com', password: 'password123', name: 'Test User' }
  ];
  let nextUserId = 2;
  
  // --- Các hàm giả lập gọi API ---
  
  /**
   * Giả lập API đăng nhập.
   * @param {object} credentials - { email, password }
   * @returns {Promise<object>} - Promise giải quyết với { user, token } nếu thành công, reject nếu thất bại.
   */
  export const loginUser = async (credentials) => {
    console.log('AuthService: Attempting login with', credentials);
    return new Promise((resolve, reject) => {
      setTimeout(() => { // Giả lập độ trễ mạng
        const foundUser = users.find(
          (user) => user.email === credentials.email && user.password === credentials.password
        );
  
        if (foundUser) {
          console.log('AuthService: Login successful for', foundUser.email);
          // Tạo một token giả lập
          const token = `fake-jwt-token-${foundUser.id}-${Date.now()}`;
          const userToReturn = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
          resolve({ user: userToReturn, token });
        } else {
          console.log('AuthService: Login failed - Invalid credentials');
          reject(new Error('Email hoặc mật khẩu không đúng.'));
        }
      }, 500); // 0.5 giây độ trễ
    });
  };
  
  /**
   * Giả lập API đăng ký.
   * @param {object} userData - { name, email, password }
   * @returns {Promise<object>} - Promise giải quyết với user đã tạo nếu thành công, reject nếu email tồn tại.
   */
  export const registerUser = async (userData) => {
     console.log('AuthService: Attempting registration with', userData);
     return new Promise((resolve, reject) => {
       setTimeout(() => {
         const emailExists = users.some(user => user.email === userData.email);
         if (emailExists) {
           console.log('AuthService: Registration failed - Email exists');
           reject(new Error('Email này đã được sử dụng.'));
         } else {
           const newUser = {
             id: nextUserId++,
             email: userData.email,
             password: userData.password, // Lưu ý: Backend thật sự nên hash password!
             name: userData.name,
           };
           users.push(newUser);
           console.log('AuthService: Registration successful', newUser);
           // Chỉ trả về thông tin cơ bản, không trả password
           const userToReturn = { id: newUser.id, email: newUser.email, name: newUser.name };
           resolve(userToReturn); // Chỉ trả về thông tin user, không tự động đăng nhập
         }
       }, 700); // 0.7 giây độ trễ
     });
  };
  
  // Hàm giả lập lấy thông tin user từ token (sẽ cần khi làm mới trang)
  export const getUserByToken = async (token) => {
      console.log('AuthService: Verifying token', token);
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              if (token && token.startsWith('fake-jwt-token-')) {
                   try {
                      const parts = token.split('-');
                      const userId = parseInt(parts[3], 10);
                      const foundUser = users.find(user => user.id === userId);
                       if (foundUser) {
                           console.log('AuthService: Token valid for', foundUser.email);
                           const userToReturn = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
                           resolve(userToReturn);
                       } else {
                            console.log('AuthService: Token invalid - User not found');
                            reject(new Error('Phiên đăng nhập không hợp lệ (user).'));
                       }
                   } catch (error) {
                       console.log('AuthService: Token invalid - Format error');
                       reject(new Error('Phiên đăng nhập không hợp lệ (format).'));
                   }
  
              } else {
                   console.log('AuthService: No valid token provided');
                   reject(new Error('Yêu cầu xác thực.'));
              }
          }, 300);
      })
  }
  
    /**
     * Giả lập API đăng xuất.
     * @returns {Promise<void>} - Promise giải quyết khi đăng xuất thành công.
     */