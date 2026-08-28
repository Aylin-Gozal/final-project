package com.ecommerce.service;

import com.ecommerce.entity.*;
import com.ecommerce.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

@Service
public class EcommerceService {
    private final ProductRepository products;
    private final ReviewRepository reviews;
    private final RatingRepository ratings;
    private final CustomerOrderRepository orders;
    private final UserAccountRepository users;
    private final ClientRepository clients;
    private final ObjectMapper objectMapper;
    private final PasswordEncoder passwordEncoder;

    public EcommerceService(ProductRepository products, ReviewRepository reviews, RatingRepository ratings,
                            CustomerOrderRepository orders, UserAccountRepository users,
                            ClientRepository clients, ObjectMapper objectMapper, PasswordEncoder passwordEncoder) {
        this.products = products; this.reviews = reviews; this.ratings = ratings;
        this.orders = orders; this.users = users; this.clients = clients; this.objectMapper = objectMapper; this.passwordEncoder = passwordEncoder;
    }

    public Map<String, Object> register(Map<String, Object> request) {
        String username = requiredText(request, "username");
        if (users.existsById(username)) throw new IllegalArgumentException("Username already exists");
        UserAccount user = new UserAccount();
        user.setUsername(username); user.setPassword(passwordEncoder.encode(requiredText(request, "password"))); user.setPayload(json(request));
        users.save(user);
        return Map.of("message", "Account created", "username", username);
    }

    public String login(Map<String, Object> request) {
        UserAccount user = users.findById(requiredText(request, "username"))
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));
        if (!passwordEncoder.matches(String.valueOf(request.get("password")), user.getPassword()))
            throw new IllegalArgumentException("Invalid username or password");
        return UUID.randomUUID().toString();
    }
    public String refreshToken() { return UUID.randomUUID().toString(); }

    public Map<String, Object> createProduct(Map<String, Object> data) {
        Product product = new Product(); product.setTitle(text(data, "title")); product.setPayload(json(data));
        return product(products.save(product));
    }
    public Map<String, Object> getAllProducts() {
        List<Map<String, Object>> content = products.findAll(Sort.by("id")).stream().map(this::product).toList();
        return Map.of("content", content, "totalElements", content.size());
    }
    public Map<String, Object> getProductById(Long id) { return product(productEntity(id)); }
    public Map<String, Object> updateProduct(Long id, Map<String, Object> data) {
        Product product = productEntity(id); product.setTitle(text(data, "title")); product.setPayload(json(data));
        return product(products.save(product));
    }
    public void deleteProduct(Long id) { products.delete(productEntity(id)); }
    public Map<String, Object> filterProducts(String title) {
        List<Product> found = title == null ? products.findAll(Sort.by("id")) : products.findByTitleContainingIgnoreCase(title);
        List<Map<String, Object>> content = found.stream().map(this::product).toList();
        return Map.of("content", content, "totalElements", content.size());
    }

    public Map<String, Object> createReview(Map<String, Object> data) {
        Review review = new Review(); review.setProductId(longValue(data, "productId")); review.setPayload(json(data));
        return review(reviews.save(review));
    }
    public Map<String, Object> updateReview(Long id, Map<String, Object> data) {
        Review review = reviewEntity(id); review.setProductId(longValue(data, "productId")); review.setPayload(json(data));
        return review(reviews.save(review));
    }
    public Map<String, Object> getReviewById(Long id) { return review(reviewEntity(id)); }
    public List<Map<String, Object>> getReviewsByProduct(Long productId) { return reviews.findByProductId(productId).stream().map(this::review).toList(); }
    public void deleteReview(Long id) { reviews.delete(reviewEntity(id)); }

    public Map<String, Object> createRating(Map<String, Object> data) {
        Rating rating = new Rating(); rating.setProductId(longValue(data, "productId")); rating.setPayload(json(data));
        return rating(ratings.save(rating));
    }
    public List<Map<String, Object>> getRatingsByProduct(Long productId) { return ratings.findByProductId(productId).stream().map(this::rating).toList(); }

    public Map<String, Object> createOrder(Map<String, Object> data) {
        CustomerOrder order = new CustomerOrder(); order.setOwner(text(data, "owner")); order.setCustomer(text(data, "customer")); order.setPayload(json(data));
        return order(orders.save(order));
    }
    public List<Map<String, Object>> getOwnerSales(String owner) { return orders.findByOwner(owner).stream().map(this::order).toList(); }
    public List<Map<String, Object>> getCustomerOrders(String customer) { return orders.findByCustomer(customer).stream().map(this::order).toList(); }

    public Map<String, Object> createClient(Map<String, Object> data) {
        Client client = new Client(); client.setUsername(requiredText(data, "username")); client.setPayload(json(data));
        return client(clients.save(client));
    }
    public Map<String, Object> getClientDetails(String username) { return client(clients.findById(username).orElseThrow(() -> new NoSuchElementException("Client not found"))); }
    public List<String> getCategories() { return List.of("Clothing", "Footwear", "Accessories", "Tablets"); }
    public List<String> getLocations() { return List.of("Baku", "Ganja", "Sumqayit"); }

    private Product productEntity(Long id) { return products.findById(id).orElseThrow(() -> new NoSuchElementException("Product not found")); }
    private Review reviewEntity(Long id) { return reviews.findById(id).orElseThrow(() -> new NoSuchElementException("Review not found")); }
    private Map<String, Object> product(Product entity) { return withId(entity.getPayload(), entity.getId()); }
    private Map<String, Object> review(Review entity) { return withId(entity.getPayload(), entity.getId()); }
    private Map<String, Object> rating(Rating entity) { return withId(entity.getPayload(), entity.getId()); }
    private Map<String, Object> order(CustomerOrder entity) { return withId(entity.getPayload(), entity.getId()); }
    private Map<String, Object> client(Client entity) { return map(entity.getPayload()); }
    private Map<String, Object> withId(String value, Long id) { Map<String, Object> result = map(value); result.put("id", id); return result; }
    private Map<String, Object> map(String value) { try { return objectMapper.readValue(value, new TypeReference<HashMap<String, Object>>() {}); } catch (JsonProcessingException e) { throw new IllegalStateException("Saved data could not be read", e); } }
    private String json(Map<String, Object> value) { try { return objectMapper.writeValueAsString(value); } catch (JsonProcessingException e) { throw new IllegalArgumentException("Request data is not valid", e); } }
    private String requiredText(Map<String, Object> value, String key) { String text = text(value, key); if (text == null || text.isBlank()) throw new IllegalArgumentException(key + " is required"); return text; }
    private String text(Map<String, Object> value, String key) { Object result = value.get(key); return result == null ? null : String.valueOf(result); }
    private Long longValue(Map<String, Object> value, String key) { try { return Long.valueOf(requiredText(value, key)); } catch (NumberFormatException e) { throw new IllegalArgumentException(key + " must be a number"); } }
}
