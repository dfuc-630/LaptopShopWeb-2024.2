package com.example.LaptopShop.controller.client;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.LaptopShop.domain.User;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/checkout")
@RequiredArgsConstructor
public class CheckoutController {

    @GetMapping("")
    public String checkoutPage(Principal principal, Model model) {
        if (principal == null) {
            return "redirect:/login";
        }
        String email = principal.getName();
        model.addAttribute("email", email);
        return "client/checkout/checkoutpage";
    }

    @GetMapping("/success")
    public String successPage() {
        return "client/checkout/success";
    }

    // @GetMapping("/error")
    // public String errorPage() {
    // return "client/checkout/error";
    // }
}