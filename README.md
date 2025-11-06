# MyShopieApp – Full-Stack E-Commerce Web Application

MyShopieApp is a modern, responsive, full-stack e-commerce platform built with React (Vite), Bootstrap, Node.js, Express, and MongoDB. It includes authentication, product browsing, cart, wishlist, checkout, order management, and a fully mobile-friendly UI.
Live Project Links: 
- Live Website: https://my-shopie-app-001.vercel.app/
- Backend API: https://my-shopie-app.vercel.app/
- GitHub Repository: https://github.com/Abdul-Kalam0/MyShopieApp

Demo Login Credentials: 
Mobile Number: 1234567890 
Password: 123@Demo

Features Overview: Authentication: Register / Login / Logout, JWT-based authentication, Protected routes (Cart, Wishlist, Checkout, Orders). Shopping Experience: Browse products by category (T-Shirts, Hoodies, Jeans, Jackets, Shirts, etc.), Product details with size selection, Add to Cart, Add to Wishlist, Move items between Cart ↔ Wishlist, Quantity update inside Cart. Product Filters & Sorting: Search products by keyword, Filter by categories, Filter by price, Filter by rating, Sort by price (Low → High, High → Low). Order Management: Add, update, delete addresses, Place order with selected address, Order summary page, Order history with item details. Wishlist: Add to wishlist, Remove from wishlist, Move wishlist item to cart.

Frontend Tech: React (Vite), Bootstrap, React Router, Axios, Context API. Backend Tech: Node.js, Express.js, MongoDB + Mongoose, JWT Authentication, bcrypt, CORS.

Complete Project Structure:
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
│   │   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
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

Installation & Setup: 
1. Clone the Repository: 
git clone https://github.com/Abdul-Kalam0/MyShopieApp
cd MyShopieApp

2. Install Dependencies:
Backend:
cd server
npm install
Frontend:
cd client
npm install

3. Create Environment Variables:
Create server/.env:
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:5173

4. Run the App:
Start Backend:
cd server
npm start
Start Frontend:
cd client
npm run dev

API Endpoints Overview: 
Auth: POST /api/users/register, POST /api/users/login, POST /api/users/logout. 
Products: GET /api/products, GET /api/products/:productId, POST /api/products (Admin). 
Categories: GET /api/categories. 
Cart: GET /api/cart, POST /api/cart, PUT /api/cart, DELETE /api/cart. 
Wishlist: GET /api/wishlist, POST /api/wishlist, DELETE /api/wishlist. 
Orders: GET /api/orders, POST /api/orders. 
Address: GET /api/addresses, POST /api/addresses, PUT /api/addresses, DELETE /api/addresses.

Contributing: Contributions, issues, and feature requests are welcome! Feel free to open a PR or raise an issue.

License: This project is licensed under the MIT License.

Support: If you like this project, please give it a star on GitHub! Your support motivates further improvements and features 💙
