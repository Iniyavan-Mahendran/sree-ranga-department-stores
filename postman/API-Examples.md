# API Examples - Simple Guide

This document shows simple examples of how to use each API endpoint. Think of these like recipes for talking to our website!

## 🔐 Authentication (Login/Signup)

### 1. Register a New User
**What it does:** Creates a new user account (like signing up for the first time)

**How to use:**
```
Method: POST
URL: {{base_url}}/api/auth/register
Body (JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "MyPassword123!",
  "phone": "+91 9876543210"
}
```

**What you get back:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Login
**What it does:** Signs in an existing user

**How to use:**
```
Method: POST
URL: {{base_url}}/api/auth/login
Body (JSON):
{
  "email": "john@example.com",
  "password": "MyPassword123!"
}
```

**What you get back:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🛍️ Products (Browse Items)

### 3. Get All Products
**What it does:** Shows all products in the store (like browsing the catalog)

**How to use:**
```
Method: GET
URL: {{base_url}}/api/products
```

**What you get back:**
```json
{
  "success": true,
  "products": [
    {
      "id": 1,
      "name": "Basmati Rice - 5kg",
      "price": 450,
      "category": "groceries",
      "image": "https://example.com/rice.jpg",
      "inStock": true
    },
    {
      "id": 2,
      "name": "Samsung Galaxy Phone",
      "price": 15000,
      "category": "electronics",
      "image": "https://example.com/phone.jpg",
      "inStock": true
    }
  ]
}
```

### 4. Get One Product
**What it does:** Shows details of a specific product

**How to use:**
```
Method: GET
URL: {{base_url}}/api/products/1
```

**What you get back:**
```json
{
  "success": true,
  "product": {
    "id": 1,
    "name": "Basmati Rice - 5kg",
    "description": "Premium quality basmati rice",
    "price": 450,
    "originalPrice": 500,
    "category": "groceries",
    "brand": "India Gate",
    "rating": 4.5,
    "reviews": 1250,
    "image": "https://example.com/rice.jpg",
    "inStock": true
  }
}
```

### 5. Search Products
**What it does:** Finds products based on search terms

**How to use:**
```
Method: GET
URL: {{base_url}}/api/products/search?q=rice&category=groceries
```

**What you get back:**
```json
{
  "success": true,
  "query": "rice",
  "results": [
    {
      "id": 1,
      "name": "Basmati Rice - 5kg",
      "price": 450,
      "category": "groceries",
      "image": "https://example.com/rice.jpg"
    }
  ],
  "total": 1
}
```

## 🛒 Shopping Cart

### 6. Add Item to Cart
**What it does:** Puts an item in your shopping cart

**How to use:**
```
Method: POST
URL: {{base_url}}/api/cart/add
Headers: Authorization: Bearer {{auth_token}}
Body (JSON):
{
  "productId": 1,
  "quantity": 2
}
```

**What you get back:**
```json
{
  "success": true,
  "message": "Item added to cart",
  "cart": {
    "items": [
      {
        "id": 1,
        "productId": 1,
        "name": "Basmati Rice - 5kg",
        "price": 450,
        "quantity": 2,
        "total": 900
      }
    ],
    "totalItems": 2,
    "totalPrice": 900
  }
}
```

### 7. View Cart
**What it does:** Shows everything in your cart

**How to use:**
```
Method: GET
URL: {{base_url}}/api/cart
Headers: Authorization: Bearer {{auth_token}}
```

**What you get back:**
```json
{
  "success": true,
  "cart": {
    "items": [
      {
        "id": 1,
        "productId": 1,
        "name": "Basmati Rice - 5kg",
        "price": 450,
        "quantity": 2,
        "total": 900
      }
    ],
    "totalItems": 2,
    "totalPrice": 900
  }
}
```

### 8. Remove Item from Cart
**What it does:** Takes an item out of your cart

**How to use:**
```
Method: DELETE
URL: {{base_url}}/api/cart/items/1
Headers: Authorization: Bearer {{auth_token}}
```

**What you get back:**
```json
{
  "success": true,
  "message": "Item removed from cart"
}
```

## 📦 Orders (Buying Items)

### 9. Create Order
**What it does:** Buys everything in your cart

**How to use:**
```
Method: POST
URL: {{base_url}}/api/orders
Headers: Authorization: Bearer {{auth_token}}
Body (JSON):
{
  "shippingAddress": {
    "name": "John Doe",
    "street": "123 Main Street",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "zipCode": "600001",
    "phone": "+91 9876543210"
  },
  "paymentMethod": "CARD"
}
```

**What you get back:**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "order": {
    "id": "ORD123456",
    "status": "CONFIRMED",
    "total": 950,
    "items": [
      {
        "productId": 1,
        "name": "Basmati Rice - 5kg",
        "quantity": 2,
        "price": 450
      }
    ],
    "shippingAddress": {
      "name": "John Doe",
      "street": "123 Main Street",
      "city": "Chennai"
    }
  }
}
```

### 10. Get My Orders
**What it does:** Shows all your past orders

**How to use:**
```
Method: GET
URL: {{base_url}}/api/orders
Headers: Authorization: Bearer {{auth_token}}
```

**What you get back:**
```json
{
  "success": true,
  "orders": [
    {
      "id": "ORD123456",
      "date": "2024-01-15",
      "status": "DELIVERED",
      "total": 950,
      "itemCount": 2
    },
    {
      "id": "ORD123457",
      "date": "2024-01-10",
      "status": "SHIPPED",
      "total": 1200,
      "itemCount": 3
    }
  ]
}
```

## 📋 Categories

### 11. Get All Categories
**What it does:** Shows all product categories (like different sections of the store)

**How to use:**
```
Method: GET
URL: {{base_url}}/api/categories
```

**What you get back:**
```json
{
  "success": true,
  "categories": [
    {
      "id": "groceries",
      "name": "Groceries",
      "icon": "🛒",
      "description": "Daily essentials and food items"
    },
    {
      "id": "electronics",
      "name": "Electronics",
      "icon": "📱",
      "description": "Electronic devices and gadgets"
    }
  ]
}
```

## 🔑 Important Notes:

1. **{{base_url}}** = Replace with actual server address (like http://localhost:8080)
2. **{{auth_token}}** = Replace with the token you get after login
3. **Headers** = Extra information sent with the request
4. **Body (JSON)** = The data you're sending to the server
5. **What you get back** = The response from the server

## 🚨 Common Errors:

- **401 Unauthorized** = You need to login first
- **404 Not Found** = The item doesn't exist
- **400 Bad Request** = Something wrong with your request
- **500 Server Error** = Problem with our server

## 💡 Tips for Beginners:

1. Always login first to get your auth token
2. Copy the token and use it in other requests
3. Check the response to see if your request worked
4. Start with simple requests like "Get All Products"
5. Don't worry if you make mistakes - that's how you learn!