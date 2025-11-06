# 🛍️ MyShopieApp – Full-Stack E-Commerce Web Application

MyShopieApp is a fully responsive and feature-rich **full-stack e-commerce web application** built using **React**, **Node.js**, **Express**, and **MongoDB**.  
It supports product browsing, filtering, cart & wishlist management, address handling, checkout, and complete order history.

---

## 🚀 Live Demo

🔗 **Frontend:** https://my-shopie-app-001.vercel.app/  
🔗 **Backend API:** https://my-shopie-app.vercel.app/  
🔗 **GitHub Repo:** https://github.com/Abdul-Kalam0/MyShopieApp  

---

## 🔐 Demo Login Credentials

Use the following credentials to explore the application:

Mobile Number: 1234567890
Password: 123@Demo


---

## ✅ Features

### 👤 Authentication & User Account
- Register / Login / Logout
- JWT-based authentication
- Protected pages (Cart, Wishlist, Checkout, Orders)

### 🛒 Products & Categories
- Dynamic categories (Shirts, T-Shirts, Hoodies, Jeans, Jackets)
- Detailed product pages
- Size selection
- Search functionality
- Filters (Category, Rating, Price Range)
- Sorting (Low to High, High to Low)

### ❤️ Wishlist & Cart
- Add to Cart / Wishlist
- Move items Cart ↔ Wishlist
- Quantity update in cart
- Auto price calculation (discount, delivery, total)

### ✅ Orders & Checkout
- Address management
- Place orders
- View full order history

### 📱 Responsive UI
- Fully mobile-friendly
- Hamburger menu
- Adaptive grid layout
- Modern, clean Bootstrap UI

---

## 🛠️ Tech Stack

### **Frontend**
- React
- Bootstrap 5
- React Router
- Axios
- Context API

### **Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- CORS

### **Deployment**
- **Frontend:** Vercel  
- **Backend:** Vercel Serverless  
- **Database:** MongoDB Atlas  

---

## 📂 Project Structure

MyShopieApp/
│── client/               # React Frontend
│   ├── src/
│   ├── components/
│   └── pages/
│
└── server/               # Node.js Backend
    ├── routes/
    ├── controllers/
    ├── models/
    ├── validations/
    ├── middlewares/
    └── index.js


---

## 🔌 API Endpoints Overview

### **Users**
- POST `/api/users/registration`
- POST `/api/users/login`
- POST `/api/users/logout`

### **Products**
- GET `/api/products`
- GET `/api/products/:productId`

### **Categories**
- GET `/api/categories`

### **Cart**
- GET `/api/cart`
- POST `/api/cart`
- PUT `/api/cart`
- DELETE `/api/cart`

### **Wishlist**
- GET `/api/wishlist`
- POST `/api/wishlist`
- DELETE `/api/wishlist`

### **Orders**
- GET `/api/orders`
- POST `/api/orders`

---

## 🧪 Running Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Abdul-Kalam0/MyShopieApp
cd MyShopieApp
