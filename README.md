# 🛍️ TechDev – eCommerce Frontend

This is the frontend of **TechDev**, a full-featured eCommerce website built with **React.js** and **Tailwind CSS**. Users can browse products, add them to cart, checkout via Cash on Delivery or Stripe, and view their orders.

## 🌐 Live Site

[https://ecommercetechdev.vercel.app](https://ecommercetechdev.vercel.app)

---

## 🚀 Features

- 🛒 Product Listing with Filters (Category, Price, Ratings, Search)
- 📦 Add to Cart, Update Quantity, Remove Item
- 🧾 Checkout Page with:
  - ✅ Cash on Delivery
  - 💳 Stripe Online Payment
- 🔐 JWT Authentication & Role-based Access
- 📜 Order History
- 📚 FAQ and Tech Blog Sections
- 📉 Admin Dashboard with:
  - Overview Cards
  - Sales & Product Charts
  - Product/Order Management

---

## 🧰 Tech Stack

- **React.js**
- **Tailwind CSS**
- **React Router DOM**
- **React Hook Form**
- **Axios + Axios Interceptors**
- **React Query / Context API**
- **Stripe.js**
- **Cloudinary (image hosting)**

---

## 📦 Installation

```bash
git clone https://github.com/Adnan-Rony/ecommerce-frontend.git
cd ecommerce-frontend
npm install


# 🛍️ TechDev – eCommerce Backend



---

## 🧰 Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT Authentication**
- **Stripe Integration**
- **Multer & Cloudinary** (Image Upload & Hosting)
- **CORS** Configuration
- **dotenv**, **cookie-parser**, **helmet**, etc.

---

## 🚀 Core Features

### 🛍️ Product Features
- Create, Read, Update, Delete Products (Admin Only)
- Fetch products with filters (search, category, etc.)
- Cloudinary-based product image upload

### 🛒 Cart & Orders
- Add to cart
- Place orders using:
  - 🛵 Cash on Delivery
  - 💳 Online (Stripe PaymentElement Integration)
- Order history per user
- Admin: View all orders with filtering

### 🔐 Authentication
- Register / Login with JWT token
- Secure protected routes using middleware
- Role-based access (User / Admin)

### 📊 Admin Dashboard APIs
- Get total counts (users, orders, sales)
- Monthly sales report (MongoDB Aggregation)
- Admin-only access to products, orders, and user management

---

## 📦 Installation

```bash
git clone https://github.com/Adnan-Rony/ecommerce-backend.git
cd ecommerce-backend
npm install
