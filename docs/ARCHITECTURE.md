# System Architecture Guide

This document explains how our e-commerce platform is built and how all the pieces work together.

## 🏗️ Overall Architecture

Our system follows a **modern web application architecture** with clear separation between frontend and backend:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (Next.js)     │◄──►│  (Spring Boot)  │◄──►│  (PostgreSQL)   │
│                 │    │                 │    │                 │
│ • User Interface│    │ • Business Logic│    │ • Data Storage  │
│ • State Mgmt    │    │ • API Endpoints │    │ • User Data     │
│ • Routing       │    │ • Authentication│    │ • Product Data  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Frontend Architecture (Next.js + React)

### App Router Structure
```
app/
├── layout.jsx              # Root layout (wraps all pages)
├── page.jsx                # Home page
├── globals.css             # Global styles
├── (auth)/                 # Authentication routes
│   ├── login/page.jsx      # Login page
│   └── register/page.jsx   # Registration page
├── products/               # Product-related pages
│   └── [id]/page.jsx       # Dynamic product detail page
├── category/               # Category pages
│   └── [slug]/page.jsx     # Dynamic category page
├── cart/page.jsx           # Shopping cart page
├── checkout/page.jsx       # Checkout process
└── payment/                # Payment result pages
    ├── success/page.jsx    # Payment success
    └── failure/page.jsx    # Payment failure
```

### Component Architecture
```
components/
├── Layout/                 # Layout components
│   ├── Header.jsx         # Top navigation
│   ├── Footer.jsx         # Bottom footer
│   ├── Navigation.jsx     # Main navigation
│   └── Sidebar.jsx        # Category sidebar
├── Product/               # Product-related components
│   ├── ProductCard.jsx    # Individual product display
│   ├── ProductGrid.jsx    # Grid of products
│   └── CategoryBanner.jsx # Category showcase
├── Cart/                  # Shopping cart components
│   └── CartSidebar.jsx    # Sliding cart panel
├── UI/                    # Reusable UI components
│   ├── Notification.jsx   # Toast notifications
│   ├── ErrorBoundary.jsx  # Error handling
│   └── LoadingSpinner.jsx # Loading indicators
└── Filters/               # Search and filter components
    └── ProductFilters.jsx # Product filtering
```

### State Management (Redux Toolkit)
```
store/
├── store.ts               # Main store configuration
└── slices/                # Feature-based state slices
    ├── authSlice.js       # User authentication state
    ├── cartSlice.js       # Shopping cart state
    ├── productsSlice.js   # Products and search state
    └── uiSlice.js         # UI state (modals, notifications)
```

**State Flow Example:**
```javascript
// User adds item to cart
dispatch(addToCart(product)) 
  ↓
// Action goes to cartSlice reducer
cartSlice.reducers.addToCart(state, action)
  ↓
// State is updated
state.cart.items.push(newItem)
  ↓
// Components re-render with new state
CartSidebar shows updated count
```

## ⚙️ Backend Architecture (Spring Boot)

### Package Structure
```
src/main/java/com/sreeranga/
├── SreeRangaApplication.java    # Main application entry point
├── config/                      # Configuration classes
│   ├── SecurityConfig.java     # Security configuration
│   ├── DatabaseConfig.java     # Database setup
│   └── SwaggerConfig.java      # API documentation
├── controller/                  # REST API endpoints
│   ├── AuthController.java     # Authentication endpoints
│   ├── ProductController.java  # Product CRUD operations
│   ├── CartController.java     # Cart management
│   └── OrderController.java    # Order processing
├── service/                     # Business logic layer
│   ├── UserService.java        # User management
│   ├── ProductService.java     # Product operations
│   ├── CartService.java        # Cart logic
│   └── OrderService.java       # Order processing
├── repository/                  # Data access layer
│   ├── UserRepository.java     # User data access
│   ├── ProductRepository.java  # Product data access
│   └── OrderRepository.java    # Order data access
├── model/                       # Data models/entities
│   ├── User.java              # User entity
│   ├── Product.java           # Product entity
│   ├── Cart.java              # Cart entity
│   └── Order.java             # Order entity
└── dto/                        # Data transfer objects
    ├── LoginRequest.java      # Login request data
    ├── ProductResponse.java   # Product response data
    └── OrderRequest.java      # Order request data
```

### API Layer Architecture
```
HTTP Request → Controller → Service → Repository → Database
     ↓             ↓          ↓          ↓          ↓
   Validation → Business → Data Access → SQL → PostgreSQL
                Logic      Layer       Query
```

## 🗄️ Database Architecture (PostgreSQL)

### Entity Relationship Diagram
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    Users    │    │   Orders    │    │ OrderItems  │
├─────────────┤    ├─────────────┤    ├─────────────┤
│ id (PK)     │◄──┐│ id (PK)     │◄──┐│ id (PK)     │
│ email       │   ││ user_id (FK)│   ││ order_id(FK)│
│ password    │   ││ total       │   ││ product_id  │
│ name        │   ││ status      │   ││ quantity    │
│ phone       │   ││ created_at  │   ││ price       │
└─────────────┘   │└─────────────┘   │└─────────────┘
                  │                  │
┌─────────────┐   │┌─────────────┐   │
│ CartItems   │   ││  Products   │   │
├─────────────┤   │├─────────────┤   │
│ id (PK)     │   ││ id (PK)     │◄──┘
│ user_id (FK)│◄──┘│ name        │
│ product_id  │◄───┤ description │
│ quantity    │    │ price       │
│ created_at  │    │ category    │
└─────────────┘    │ image_url   │
                   │ in_stock    │
                   └─────────────┘
```

### Database Tables
```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    category VARCHAR(100) NOT NULL,
    brand VARCHAR(100),
    image_url VARCHAR(500),
    in_stock BOOLEAN DEFAULT true,
    rating DECIMAL(3,2) DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart items table
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    shipping_address JSONB,
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL
);
```

## 🔄 Data Flow Architecture

### User Registration Flow
```
Frontend                Backend               Database
   │                       │                     │
   │ POST /auth/register   │                     │
   ├──────────────────────►│                     │
   │                       │ Validate data       │
   │                       │ Hash password       │
   │                       │ INSERT user         │
   │                       ├────────────────────►│
   │                       │                     │
   │                       │ ◄───────────────────┤
   │                       │ Generate JWT        │
   │ ◄──────────────────────┤                     │
   │ Store token           │                     │
```

### Product Search Flow
```
Frontend                Backend               Database
   │                       │                     │
   │ GET /products?q=rice  │                     │
   ├──────────────────────►│                     │
   │                       │ Parse query         │
   │                       │ SELECT products     │
   │                       ├────────────────────►│
   │                       │                     │
   │                       │ ◄───────────────────┤
   │                       │ Format response     │
   │ ◄──────────────────────┤                     │
   │ Update UI             │                     │
```

### Order Creation Flow
```
Frontend                Backend               Database
   │                       │                     │
   │ POST /orders          │                     │
   ├──────────────────────►│                     │
   │                       │ Validate cart       │
   │                       │ Calculate total     │
   │                       │ BEGIN transaction   │
   │                       ├────────────────────►│
   │                       │ INSERT order        │
   │                       │ INSERT order_items  │
   │                       │ CLEAR cart          │
   │                       │ COMMIT transaction  │
   │                       │ ◄───────────────────┤
   │                       │ Send confirmation   │
   │ ◄──────────────────────┤                     │
   │ Redirect to success   │                     │
```

## 🔐 Security Architecture

### Authentication Flow
```
1. User Login
   ├── Frontend sends credentials
   ├── Backend validates against database
   ├── JWT token generated with user info
   └── Token sent back to frontend

2. Authenticated Requests
   ├── Frontend includes JWT in Authorization header
   ├── Backend validates token
   ├── User info extracted from token
   └── Request processed if valid
```

### Security Layers
```
┌─────────────────────────────────────────┐
│ Frontend Security                       │
│ • Input validation                      │
│ • XSS prevention                        │
│ • CSRF protection                       │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│ API Security                            │
│ • JWT authentication                    │
│ • Rate limiting                         │
│ • Request validation                    │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│ Database Security                       │
│ • SQL injection prevention             │
│ • Encrypted passwords                  │
│ • Access controls                      │
└─────────────────────────────────────────┘
```

## 📱 Responsive Design Architecture

### Breakpoint System
```css
/* Mobile First Approach */
.container {
  /* Base styles for mobile (320px+) */
  padding: 1rem;
}

@media (min-width: 640px) {
  /* Tablet styles (640px+) */
  .container {
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  /* Desktop styles (1024px+) */
  .container {
    padding: 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### Component Responsiveness
```jsx
// Responsive grid using Tailwind
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

## 🚀 Performance Architecture

### Frontend Optimization
```
┌─────────────────────────────────────────┐
│ Code Splitting                          │
│ • Route-based splitting                 │
│ • Component lazy loading                │
│ • Dynamic imports                       │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│ State Management                        │
│ • Normalized state structure            │
│ • Memoized selectors                    │
│ • Optimistic updates                    │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│ Asset Optimization                      │
│ • Image optimization                    │
│ • CSS minification                      │
│ • JavaScript bundling                   │
└─────────────────────────────────────────┘
```

### Backend Optimization
```
┌─────────────────────────────────────────┐
│ Database Optimization                   │
│ • Indexed queries                       │
│ • Connection pooling                    │
│ • Query optimization                    │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│ Caching Strategy                        │
│ • Redis for session storage             │
│ • Application-level caching             │
│ • Database query caching                │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│ API Optimization                        │
│ • Pagination for large datasets         │
│ • Compression for responses             │
│ • Rate limiting                         │
└─────────────────────────────────────────┘
```

## 🔄 Deployment Architecture

### Development Environment
```
Developer Machine
├── Frontend (localhost:3000)
├── Backend (localhost:8080)
└── Database (localhost:5432)
```

### Production Environment
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN/Netlify   │    │  Cloud Server   │    │  Cloud Database │
│                 │    │                 │    │                 │
│ • Static Assets │    │ • Spring Boot   │    │ • PostgreSQL    │
│ • Frontend App  │    │ • API Server    │    │ • Backups       │
│ • Global Cache  │    │ • Load Balancer │    │ • Monitoring    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🧪 Testing Architecture

### Frontend Testing
```
├── Unit Tests
│   ├── Component testing (React Testing Library)
│   ├── Utility function testing (Jest)
│   └── Redux slice testing
├── Integration Tests
│   ├── API integration
│   ├── User flow testing
│   └── Component interaction
└── E2E Tests
    ├── Full user journeys
    ├── Cross-browser testing
    └── Mobile responsiveness
```

### Backend Testing
```
├── Unit Tests
│   ├── Service layer testing
│   ├── Repository testing
│   └── Utility testing
├── Integration Tests
│   ├── API endpoint testing
│   ├── Database integration
│   └── Security testing
└── Performance Tests
    ├── Load testing
    ├── Stress testing
    └── Database performance
```

## 📊 Monitoring and Analytics

### Application Monitoring
```
┌─────────────────────────────────────────┐
│ Frontend Monitoring                     │
│ • Error tracking (Sentry)              │
│ • Performance metrics                  │
│ • User analytics                       │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│ Backend Monitoring                      │
│ • API response times                    │
│ • Error rates                          │
│ • Resource usage                       │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│ Database Monitoring                     │
│ • Query performance                     │
│ • Connection pool status                │
│ • Storage usage                        │
└─────────────────────────────────────────┘
```

This architecture ensures our e-commerce platform is scalable, maintainable, and provides excellent user experience while maintaining security and performance standards.