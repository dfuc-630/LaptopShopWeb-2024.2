// package com.example.LaptopShop.controller;

// import com.example.LaptopShop.domain.User;
// import com.example.LaptopShop.service.UserService;
// import com.example.LaptopShop.util.JwtUtil;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RestController;

// import java.util.HashMap;
// import java.util.Map;

// @RestController
// public class AuthController {

//     @Autowired
//     private AuthenticationManager authenticationManager;

//     @Autowired
//     private UserService userService;

//     @Autowired
//     private JwtUtil jwtUtil;

//     @PostMapping("/api/auth/login")
//     public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
//         String username = loginRequest.get("username");
//         String password = loginRequest.get("password");

//         try {
//             authenticationManager.authenticate(
//                 new UsernamePasswordAuthenticationToken(username, password)
//             );

//             User user = userService.getUserByEmail(username);
//             String token = jwtUtil.generateToken(username);

//             Map<String, Object> response = new HashMap<>();
//             response.put("success", true);
//             response.put("token", token);
//             response.put("role", user.getRole().getName());
//             response.put("user", user);

//             return ResponseEntity.ok(response);
//         } catch (Exception e) {
//             return ResponseEntity.status(401)
//                 .body(Map.of("success", false, "message", "Tên đăng nhập hoặc mật khẩu không đúng"));
//         }
//     }
// }

package com.example.LaptopShop.controller;

import com.example.LaptopShop.domain.User;
import com.example.LaptopShop.service.UserService;
import com.example.LaptopShop.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    AuthController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/api/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
            );

            User user = userService.getUserByEmail(username);
            System.out.println("User from DB: " + user);
            if (user == null) {
                throw new Exception("User not found");
            }

            String token = jwtUtil.generateToken(username);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("token", token);
            response.put("role", user.getRole().getName());
            response.put("user", Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "fullName", user.getFullName(),
                "role", user.getRole().getName()
            ));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401)
                .body(Map.of("success", false, "message", "Tên đăng nhập hoặc mật khẩu không đúng"));
        }
    }

    @PutMapping("/api/user/update")
    public ResponseEntity<?> updateUser(@RequestBody Map<String, String> updateRequest) {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            if (username == null || username.equals("anonymousUser")) {
                return ResponseEntity.status(401)
                    .body(Map.of("success", false, "message", "Unauthorized"));
            }

            User user = userService.getUserByEmail(username);
            if (user == null) {
                return ResponseEntity.status(404)
                    .body(Map.of("success", false, "message", "User not found"));
            }

            // Cập nhật thông tin
            user.setFullName(updateRequest.get("name"));
            user.setAddress(updateRequest.get("address"));
            user.setPhone(updateRequest.get("phone"));
            userService.handleSaveUser(user);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "user", Map.of(
                    "id", user.getId(),
                    "email", user.getEmail(),
                    "name", user.getFullName(),
                    "address", user.getAddress() != null ? user.getAddress() : "",
                    "phone", user.getPhone() != null ? user.getPhone() : "",
                    "role", user.getRole().getName()
                )
            ));
        } catch (Exception e) {
            return ResponseEntity.status(400)
                .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @PostMapping("/api/user/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> passwordRequest) {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            if (username == null || username.equals("anonymousUser")) {
                return ResponseEntity.status(401)
                    .body(Map.of("success", false, "message", "Unauthorized"));
            }

            User user = userService.getUserByEmail(username);
            if (user == null) {
                return ResponseEntity.status(404)
                    .body(Map.of("success", false, "message", "User not found"));
            }

            // Xác minh mật khẩu hiện tại
            String currentPassword = passwordRequest.get("currentPassword");
            String newPassword = passwordRequest.get("newPassword");
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, currentPassword)
            );

            // Mã hóa và cập nhật mật khẩu mới
            user.setPassword(new BCryptPasswordEncoder().encode(newPassword));
            userService.handleSaveUser(user);

            return ResponseEntity.ok(Map.of("success", true, "message", "Đổi mật khẩu thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(400)
                .body(Map.of("success", false, "message", "Mật khẩu hiện tại không đúng hoặc lỗi hệ thống"));
        }
    }

    @PostMapping("/api/auth/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> registerRequest) {
        try {
            String email = registerRequest.get("email");
            String password = registerRequest.get("password");
            String fullName = registerRequest.get("fullName");
            String phone = registerRequest.get("phone");
            String address = registerRequest.get("address");

            // Kiểm tra email đã tồn tại
            if (userService.getUserByEmail(email) != null) {
                return ResponseEntity.status(400)
                    .body(Map.of("success", false, "message", "Email đã tồn tại. Vui lòng chọn email khác."));
            }

            // Tạo user mới
            User user = new User();
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password));
            user.setFullName(fullName);
            user.setPhone(phone);
            user.setAddress(address);
            user.setRole(userService.getRoleByName("USER"));

            // Lưu user
            userService.handleSaveUser(user);

            // Trả về phản hồi thành công
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Đăng ký thành công. Vui lòng đăng nhập."
            ));
        } catch (Exception e) {
            return ResponseEntity.status(400)
                .body(Map.of("success", false, "message", "Đăng ký thất bại: " + e.getMessage()));
        }
    }
}