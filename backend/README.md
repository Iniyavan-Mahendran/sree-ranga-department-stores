# Sree Ranga Department Stores - Backend

This is the Spring Boot backend for the Sree Ranga Department Stores e-commerce application.

## Technology Stack

- **Java 17**
- **Spring Boot 3.x**
- **Spring Security** (JWT Authentication)
- **Spring Data JPA** (Database operations)
- **PostgreSQL** (Database)
- **Swagger/OpenAPI** (API Documentation)
- **Maven** (Build tool)

## Features

- RESTful API endpoints
- JWT-based authentication
- Role-based authorization
- Database integration with PostgreSQL
- API documentation with Swagger
- Error handling and validation
- Logging and monitoring

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh JWT token

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/search` - Search products
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/{id}` - Update product (Admin only)
- `DELETE /api/products/{id}` - Delete product (Admin only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}/products` - Get products by category

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/items/{id}` - Update cart item
- `DELETE /api/cart/items/{id}` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/{id}` - Get order by ID
- `PUT /api/orders/{id}/status` - Update order status (Admin only)

## Database Schema

The application uses PostgreSQL with the following main entities:

- **Users** - User accounts and authentication
- **Products** - Product catalog
- **Categories** - Product categories
- **CartItems** - Shopping cart items
- **Orders** - Order information
- **OrderItems** - Items within orders

## Configuration

Application properties are configured in `application.yml`:

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/sree_ranga_db
    username: ${DB_USERNAME:postgres}
    password: ${DB_PASSWORD:password}
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true

jwt:
  secret: ${JWT_SECRET:your-secret-key}
  expiration: 86400000 # 24 hours
```

## Running the Application

1. **Prerequisites:**
   - Java 17 or higher
   - PostgreSQL database
   - Maven

2. **Database Setup:**
   ```sql
   CREATE DATABASE sree_ranga_db;
   ```

3. **Environment Variables:**
   ```bash
   export DB_USERNAME=your_db_username
   export DB_PASSWORD=your_db_password
   export JWT_SECRET=your_jwt_secret
   ```

4. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

5. **Access API Documentation:**
   - Swagger UI: http://localhost:8080/swagger-ui.html
   - API Docs: http://localhost:8080/v3/api-docs

## Testing

The application includes comprehensive tests:

```bash
# Run all tests
mvn test

# Run integration tests
mvn test -Dtest=**/*IntegrationTest

# Run unit tests
mvn test -Dtest=**/*UnitTest
```

## Deployment

The application can be deployed using:

1. **Docker:**
   ```bash
   docker build -t sree-ranga-backend .
   docker run -p 8080:8080 sree-ranga-backend
   ```

2. **JAR file:**
   ```bash
   mvn clean package
   java -jar target/sree-ranga-backend-1.0.0.jar
   ```

## API Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer your-jwt-token
```

## Error Handling

The API returns standardized error responses:

```json
{
  "timestamp": "2024-01-01T10:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/products"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.