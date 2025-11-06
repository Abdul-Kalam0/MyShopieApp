# MyShopieApp – Full-Stack E-Commerce Web Application

MyShopieApp is a modern, responsive, full-stack e-commerce platform built with React (Vite), Bootstrap, Node.js, Express, and MongoDB. It includes authentication, product browsing, cart, wishlist, checkout, order management, and a fully mobile-friendly UI.

## 🔗 Live Project Links

- **Live Website:** [https://my-shopie-app-001.vercel.app/](https://my-shopie-app-001.vercel.app/)
- **Backend API:** [https://my-shopie-app.vercel.app/](https://my-shopie-app.vercel.app/)
- **GitHub Repository:** [https://github.com/Abdul-Kalam0/MyShopieApp](https://github.com/Abdul-Kalam0/MyShopieApp)

## 🔐 Demo Login Credentials

- Mobile Number: `1234567890`
- Password: `123@Demo`

---

## ✅ Features Overview

### 👤 Authentication

- Register / Login / Logout
- JWT-based authentication
- Protected routes (Cart, Wishlist, Checkout, Orders)

### 🛒 Shopping Experience

- Browse products by category (T-Shirts, Hoodies, Jeans, Jackets, Shirts, etc.)
- Product details with size selection
- Add to Cart
- Add to Wishlist
- Move items between Cart ↔ Wishlist
- Quantity update inside Cart

### 🔍 Product Filters & Sorting

- Search products by keyword
- Filter by categories
- Filter by price
- Filter by rating
- Sort by price (Low → High, High → Low)

### 📦 Order Management

- Add, update, delete addresses
- Place order with selected address
- Order summary page
- Order history with item details

### ❤️ Wishlist

- Add to wishlist
- Remove from wishlist
- Move wishlist item to cart

---

## 🖥️ Frontend Tech

- React (Vite)
- Bootstrap
- React Router
- Axios
- Context API

## 🛠️ Backend Tech

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt
- CORS

---

## 📁 Complete Project Structure

```
MyShopieApp/
│
├── client/                     # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── FiltersSidebar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Checkout.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   ├── services/
│   │       ├── api.js
│   │   ├── main.jsx
│   │   ├── App.jsx
│   ├── package.json
│   ├── vite.config.js
│
├── server/                     # Node.js Backend
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   ├── cartController.js
│   │   ├── wishlistController.js
│   │   ├── orderController.js
│   │   ├── addressController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Cart.js
│   │   ├── Wishlist.js
│   │   ├── Order.js
│   │   ├── Address.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── wishlistRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── addressRoutes.js
│   ├── config/
│   │   ├── db.js
│   ├── .env.example
│   ├── index.js
│   ├── package.json
│
└── README.md

```

---

## ⚙️ Setup Instructions

### 🖥️ Backend Setup

1. Navigate to the **server** folder:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` folder:

   ```bash
   JWT_SECRET=YOUR_JWT_SECRET
   DB_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. Start the backend server:

   ```bash
   npm run dev
   ```

> The backend will start at `http://localhost:3000`

---

### 💻 Frontend Setup

1. Navigate to the **client** folder:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend:

   ```bash
   npm run dev
   ```

---

## 🧪 Run Locally

### 1. Clone Repo
```bash
git clone https://github.com/Abdul-Kalam0/MyShopieApp
cd MyShopieApp
```

---

## 🔌 API Overview

### Auth
- POST `/api/users/login`
- POST `/api/users/registration`
- POST `/api/users/logout`

### Products
- GET `/api/products`
- GET `/api/products/:productId`

### Categories
- GET `/api/categories`

### Cart
- GET `/api/cart`
- POST `/api/cart`
- PUT `/api/cart`
- DELETE `/api/cart`

### Wishlist
- GET `/api/wishlist`
- POST `/api/wishlist`
- DELETE `/api/wishlist`

### Orders
- GET `/api/orders`
- POST `/api/orders`

---

## 🧑‍💻 Author

**Abdul Kalam**
💼 [GitHub](https://github.com/Abdul-Kalam0/MyShopieApp) • 🌐 [Live Project](https://my-shopie-app-001.vercel.app)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use and modify it.



