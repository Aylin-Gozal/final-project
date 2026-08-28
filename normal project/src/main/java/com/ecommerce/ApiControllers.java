package com.ecommerce;

import com.ecommerce.service.EcommerceService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequestMapping("/api/auth") @Tag(name = "Auth controller")
class AuthController {
    private final EcommerceService service;
    AuthController(EcommerceService service) { this.service = service; }
    @PostMapping("/register") Map<String, Object> register(@RequestBody Map<String, Object> user) { return service.register(user); }
    @PostMapping("/login") String login(@RequestBody Map<String, Object> request) { return service.login(request); }
    @PostMapping("/refresh") String refresh() { return service.refreshToken(); }
    @PostMapping("/verify-email") Map<String, String> verifyEmail() { return Map.of("message", "Email verified"); }
}

@RestController @RequestMapping("/api/products") @Tag(name = "Product controller")
class ProductController {
    private final EcommerceService service;
    ProductController(EcommerceService service) { this.service = service; }
    @PostMapping Map<String, Object> create(@RequestBody Map<String, Object> product) { return service.createProduct(product); }
    @GetMapping Map<String, Object> all() { return service.getAllProducts(); }
    @GetMapping("/{productId}") Map<String, Object> byId(@PathVariable Long productId) { return service.getProductById(productId); }
    @PutMapping("/{productId}") Map<String, Object> update(@PathVariable Long productId, @RequestBody Map<String, Object> product) { return service.updateProduct(productId, product); }
    @DeleteMapping("/{productId}") void delete(@PathVariable Long productId) { service.deleteProduct(productId); }
    @GetMapping("/my-products") Map<String, Object> mine() { return service.getAllProducts(); }
    @GetMapping("/filter") Map<String, Object> filter(@RequestParam(required = false) String title) { return service.filterProducts(title); }
}

@RestController @RequestMapping("/api/reviews") @Tag(name = "Review controller")
class ReviewController {
    private final EcommerceService service;
    ReviewController(EcommerceService service) { this.service = service; }
    @PostMapping Map<String, Object> create(@RequestBody Map<String, Object> review) { return service.createReview(review); }
    @PutMapping("/{reviewId}") Map<String, Object> update(@PathVariable Long reviewId, @RequestBody Map<String, Object> review) { return service.updateReview(reviewId, review); }
    @GetMapping("/{reviewId}") Map<String, Object> byId(@PathVariable Long reviewId) { return service.getReviewById(reviewId); }
    @GetMapping("/product/{productId}") List<Map<String, Object>> byProduct(@PathVariable Long productId) { return service.getReviewsByProduct(productId); }
    @DeleteMapping("/{reviewId}") void delete(@PathVariable Long reviewId) { service.deleteReview(reviewId); }
}

@RestController @RequestMapping("/api/ratings") @Tag(name = "Rating controller")
class RatingController {
    private final EcommerceService service;
    RatingController(EcommerceService service) { this.service = service; }
    @PostMapping Map<String, Object> create(@RequestBody Map<String, Object> rating) { return service.createRating(rating); }
    @GetMapping("/product/{productId}") List<Map<String, Object>> byProduct(@PathVariable Long productId) { return service.getRatingsByProduct(productId); }
}

@RestController @RequestMapping("/api/orders") @Tag(name = "Order controller")
class OrderController {
    private final EcommerceService service;
    OrderController(EcommerceService service) { this.service = service; }
    @PostMapping Map<String, Object> create(@RequestBody Map<String, Object> order) { return service.createOrder(order); }
    @GetMapping("/owner-sales") List<Map<String, Object>> sales(@RequestParam String owner) { return service.getOwnerSales(owner); }
    @GetMapping("/customer-orders") List<Map<String, Object>> customer(@RequestParam String customer) { return service.getCustomerOrders(customer); }
}

@RestController @RequestMapping("/api/clients") @Tag(name = "Client controller")
class ClientController {
    private final EcommerceService service;
    ClientController(EcommerceService service) { this.service = service; }
    @PostMapping Map<String, Object> create(@RequestBody Map<String, Object> client) { return service.createClient(client); }
    @GetMapping("/get-details") Map<String, Object> details(@RequestParam String username) { return service.getClientDetails(username); }
}

@RestController @RequestMapping("/api/categories") @Tag(name = "Category controller")
class CategoryController { private final EcommerceService service; CategoryController(EcommerceService service) { this.service = service; } @GetMapping List<String> all() { return service.getCategories(); } }

@RestController @RequestMapping("/api/locations") @Tag(name = "Location controller")
class LocationController { private final EcommerceService service; LocationController(EcommerceService service) { this.service = service; } @GetMapping List<String> all() { return service.getLocations(); } }

@RestController @RequestMapping("/health")
class HealthController { @GetMapping String health() { return "OK"; } }

@RestControllerAdvice
class ApiErrors { @ExceptionHandler({IllegalArgumentException.class, NoSuchElementException.class}) @ResponseStatus(HttpStatus.BAD_REQUEST) Map<String, String> error(RuntimeException error) { return Map.of("message", error.getMessage()); } }
