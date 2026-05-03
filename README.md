# 🛍️ ShopApp — Full Stack Ecommerce Application

A full stack ecommerce web application built with **Spring Boot** (backend) and **React + Vite** (frontend), featuring JWT authentication, role-based access control, cart management, and order processing.



---

## 🖥️ Live Demo

> Run locally following the setup guide below.

| Layer | URL |
|---|---|
| Frontend (React) | http://localhost:5173 |
| Backend (Spring Boot) | http://localhost:8084 |
| API Docs (Swagger) | http://localhost:8084/swagger-ui.html |

---

## 📁 Project Structure

```
ecommerce/
├── ecommerce-backend/          # Spring Boot REST API
│   ├── src/main/java/com/ecommerce/
│   │   ├── config/             # SecurityConfig, CorsConfig
│   │   ├── controller/         # AuthController, ProductController, CartController, OrderController, UserController
│   │   ├── dto/                # LoginRequest, RegisterRequest, ProductRequest, CartRequest, OrderRequest
│   │   ├── entity/             # User, Product, Cart, Order, OrderItem
│   │   ├── exception/          # GlobalExceptionHandler, ResourceNotFoundException
│   │   ├── repository/         # JPA Repositories
│   │   ├── security/           # JwtUtil, JwtFilter
│   │   └── service/            # Service interfaces + implementations
│   └── src/main/resources/
│       └── application.properties
│
└── ecommerce-frontend/         # React + Vite UI
    └── src/
        ├── api/                # API helper (fetch + JWT header)
        ├── context/            # AuthContext (global auth state)
        ├── components/         # Reusable UI components
        │   ├── common/         # Navbar, Modal, Alert, Input, Spinner
        │   ├── auth/           # LoginForm, RegisterForm
        │   ├── products/       # ProductCard, ProductForm
        │   ├── cart/           # CartItem
        │   └── orders/         # OrderCard
        ├── pages/              # ProductsPage, CartPage, OrdersPage, ProfilePage, AuthPage
        │   └── admin/          # AdminPage, AdminProducts, AdminUsers
        ├── styles/             # Shared style objects
        └── utils/              # JWT decoder utility
```

---

## ⚙️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Java 17 | Core language |
| Spring Boot 3 | REST API framework |
| Spring Security | Authentication & authorization |
| JWT (JJWT 0.11.5) | Token-based auth |
| Spring Data JPA | Database ORM |
| Hibernate | ORM implementation |
| MySQL | Relational database |
| BCrypt | Password encryption |
| Maven | Build tool |

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| Context API | Global state management |
| React Hooks | State & lifecycle |
| Fetch API | HTTP requests |

---

## 🚀 Features

### User Features
- ✅ Register & Login with JWT authentication
- ✅ Browse all products (public — no login required)
- ✅ Search products by name and category
- ✅ Add to cart with custom quantity
- ✅ View and manage cart items
- ✅ Place orders — server calculates total & checks stock
- ✅ View order history with item breakdown
- ✅ Update profile (name, email, password)
- ✅ Delete account

### Admin Features
- ✅ Add, Edit, Delete products
- ✅ View and manage all users
- ✅ Admin-only routes protected by role

### Security Features
- ✅ JWT token issued on login, validated on every request
- ✅ BCrypt password hashing
- ✅ Role-based access — ROLE_USER / ROLE_ADMIN
- ✅ Ownership checks — users can only access their own cart/orders
- ✅ Server-side order total calculation — client cannot manipulate price
- ✅ Stock validation before order placement
- ✅ CORS configured for secure cross-origin requests
- ✅ Stateless session — no server-side sessions

---

## 🗃️ Database Schema

```
users
  id, name, email, password (bcrypt), role

products
  id, name, description, price, category, stock, imageUrl

cart
  id, quantity, user_id (FK), product_id (FK)

orders
  id, totalAmount, orderDate, status, user_id (FK)

order_items
  id, quantity, price, order_id (FK), product_id (FK)
```

---

## 🔐 API Endpoints

### Auth — Public
```
POST   /api/auth/register     Register new user
POST   /api/auth/login        Login → returns JWT token
```

### Products
```
GET    /api/products           Get all products (public)
GET    /api/products/{id}      Get product by ID (public)
POST   /api/products/add       Add product (ADMIN only)
PUT    /api/products/update/{id}  Update product (ADMIN only)
DELETE /api/products/delete/{id}  Delete product (ADMIN only)
```

### Cart — Requires Auth
```
POST   /api/cart               Add item to cart
GET    /api/cart               Get my cart items
DELETE /api/cart/{cartId}      Remove cart item
```

### Orders — Requires Auth
```
POST   /api/orders             Place order from cart
GET    /api/orders             Get my orders
```

### Users — Requires Auth
```
GET    /api/users              Get all users (ADMIN only)
GET    /api/users/{id}         Get user by ID (self or admin)
PUT    /api/users/{id}         Update user (self only)
DELETE /api/users/{id}         Delete user (ADMIN only)
```

### How to call protected endpoints
```
Authorization: Bearer <your-jwt-token>
```

---

## 🛠️ Local Setup

### Prerequisites
- Java 17+
- Node.js v20+
- MySQL 8+
- Maven

---

### Backend Setup

**1. Clone the repo**
```bash
git clone https://github.com/yourusername/ecommerce.git
cd ecommerce/ecommerce-backend
```

**2. Create MySQL database**
```sql
CREATE DATABASE ecommerce_db;
```

**3. Configure `application.properties`**
```properties
server.port=8084

spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

**4. Run Spring Boot**
```bash
./mvnw spring-boot:run
```

Backend runs at → **http://localhost:8084**

Test: open http://localhost:8084/api/products in browser — should return `[]`

---

### Frontend Setup

**1. Go to frontend folder**
```bash
cd ecommerce/ecommerce-frontend
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure `.env`**
```env
VITE_API_URL=http://localhost:8084
```

**4. Run React app**
```bash
npm run dev
```

Frontend runs at → **http://localhost:5173**

---

### Run Both Together

| Terminal 1 — Backend | Terminal 2 — Frontend |
|---|---|
| `cd ecommerce-backend` | `cd ecommerce-frontend` |
| `./mvnw spring-boot:run` | `npm run dev` |
| http://localhost:8084 | http://localhost:5173 |

---

## 🧪 Test the App

**Step 1 — Register admin account**
```json
POST /api/auth/register
{
  "name": "Admin User",
  "email": "admin@gmail.com",
  "password": "admin1234"
}
```

**Step 2 — Login and get token**
```json
POST /api/auth/login
{
  "email": "admin@gmail.com",
  "password": "admin1234"
}
→ returns { "token": "eyJhbGci..." }
```

**Step 3 — Use token in header**
```
Authorization: Bearer eyJhbGci...
```

**Step 4 — Add a product (admin)**
```json
POST /api/products/add
{
  "name": "iPhone 15",
  "description": "Apple iPhone 15 128GB",
  "price": 79999,
  "category": "Electronics",
  "stock": 50,
  "imageUrl": "https://example.com/image.jpg"
}
```

**Step 5 — Add to cart**
```json
POST /api/cart
{
  "productId": 1,
  "quantity": 2
}
```

**Step 6 — Place order**
```json
POST /api/orders
{
  "cartIds": [1]
}
→ returns order with totalAmount, status: "PENDING", orderDate
```

---

## 🔑 Default Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@gmail.com | (set during register) |
| User | any other email | (set during register) |

> Admin role is automatically assigned to `admin@gmail.com` during registration.

---

## 📦 Dependencies

### Backend (pom.xml)
```xml
spring-boot-starter-web
spring-boot-starter-security
spring-boot-starter-data-jpa
mysql-connector-j
jjwt-api (0.11.5)
jjwt-impl (0.11.5)
jjwt-jackson (0.11.5)
lombok
spring-boot-starter-validation
```

### Frontend (package.json)
```
react
react-dom
vite
@vitejs/plugin-react
```

---

## 🏗️ Architecture

```
React (port 5173)
      │
      │  HTTP + JWT Bearer token
      ▼
Spring Boot (port 8084)
      │
      ├── JwtFilter          → validates token on every request
      ├── SecurityConfig     → route-level access control
      ├── Controller layer   → handles HTTP requests
      ├── Service layer      → business logic + ownership checks
      ├── Repository layer   → JPA database queries
      │
      ▼
MySQL Database (port 3306)
```

---

## 👨‍💻 Author

 Dineshkumar
- GitHub: dineshkumararumugam-dev(https://github.com/dineshkumararumugam-dev)
- LinkedIn: www.linkedin.com/in/dineshkumar242001


---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
