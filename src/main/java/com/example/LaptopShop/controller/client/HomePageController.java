package com.example.LaptopShop.controller.client;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.LaptopShop.controller.UserInfo;
import com.example.LaptopShop.domain.User;
import com.example.LaptopShop.domain.dto.RegisterDTO;
import com.example.LaptopShop.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class HomePageController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public HomePageController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/")
    public String getHomePage() {
        UserInfo.userInfo = null;
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (username == "anonymousUser")
            UserInfo.userInfo = null;
        else
            UserInfo.userInfo = username;
        return "redirect:https://dominhphuc20225064.id.vn"; // hompage frontend sửa vào đây theo cú pháp:
                                                            // "redirect:http://"
    }

    @GetMapping("/register")
    public String getRegisterPage(Model model) {
        model.addAttribute("registerUser", new RegisterDTO());
        return "client/auth/register";
    }

    @PostMapping("/register")
    public String handleRegister(@ModelAttribute("registerUser") RegisterDTO registerDTO, Model model) {
        if (userService.getUserByEmail(registerDTO.getEmail()) != null) {
            model.addAttribute("registerUser", registerDTO);
            model.addAttribute("emailExistsError", "Email đã tồn tại. Vui lòng chọn email khác.");
            return "client/auth/register";
        }

        User user = userService.registerDTOtoUser(registerDTO);
        String hashPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashPassword);
        user.setRole(userService.getRoleByName("USER"));
        userService.handleSaveUser(user);

        return "redirect:/login";
    }

    @GetMapping("/login")
    public String getLoginPage(Model model, CsrfToken csrfToken) {
        model.addAttribute("_csrf", csrfToken);
        return "client/auth/login";
    }

    @GetMapping("/order-history")
    public String getOrderHistoryPage(Model model, HttpServletRequest request) {
        User curUser = new User();
        HttpSession session = request.getSession(false);
        long id = (long) session.getAttribute("id");
        curUser.setId(id);

        // List<Order> orders = this.orderService.fetchOrderByUser(curUser) ;
        // model.addAttribute("orders", orders) ;
        return "client/cart/order-history";
    }

}
