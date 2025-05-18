package com.example.LaptopShop.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.LaptopShop.domain.Product;
import com.example.LaptopShop.domain.dto.OrderDTO;
import com.example.LaptopShop.domain.dto.OrderData;
import com.example.LaptopShop.repository.OrderDTORepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;

@Controller
@RequestMapping("/admin/order")
public class OrderController {

    private final OrderDTORepository orderDTORepository;

    public OrderController(OrderDTORepository orderDTORepository) {
        this.orderDTORepository = orderDTORepository;
    }

    @GetMapping
    public String getAllOrders(Model model) {
        List<OrderDTO> orders = orderDTORepository.findAll();

        ObjectMapper mapper = new ObjectMapper(); // hoặc khai báo @Autowired nếu dùng nhiều nơi

        for (OrderDTO order : orders) {
            try {
                if (order.getData() != null && !order.getData().isBlank()) {
                    OrderData parsed = mapper.readValue(order.getData(), OrderData.class);

                    if (parsed.getStatus() == null || parsed.getStatus().isBlank()) {
                        parsed.setStatus("Chờ xác thực");
                    }

                    order.setParsedData(parsed);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        model.addAttribute("orders", orders);
        return "admin/order/show";
    }

    @GetMapping("/{id}")
    public String getOrderDetail(@PathVariable long id, Model model) {
        OrderDTO order = orderDTORepository.getById(id);

        ObjectMapper mapper = new ObjectMapper();
        try {
            OrderData parsed = mapper.readValue(order.getData(), OrderData.class);
            order.setParsedData(parsed);
        } catch (Exception e) {
            e.printStackTrace();
        }

        model.addAttribute("order", order);
        model.addAttribute("data", order.getParsedData());

        return "admin/order/detail"; // Trang chi tiết đơn hàng
    }

    @GetMapping("/delete/{id}")
    public String deleteOrderPage(@PathVariable long id, Model model) {
        model.addAttribute("id", id);
        model.addAttribute("newOrder", new OrderDTO());
        return "admin/order/delete";
    }

    @PostMapping("/delete")
    @Transactional
    public String postDeleteOrder(@ModelAttribute("newOrder") OrderDTO orderDTO) {
        orderDTORepository.deleteOrderDTOById(orderDTO.getId());
        return "redirect:/admin/order";
    }
}
