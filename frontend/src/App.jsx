import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Cart from "./pages/Cart.jsx";
import Profile from "./pages/Profile.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";
import useToast from "./hooks/useToast.js";
import Toast from "./components/Toast.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

export default function App() {
  const { toast, show, hide } = useToast();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products showToast={show} />} />
        <Route
          path="/product/:id"
          element={<ProductDetails showToast={show} />}
        />
        <Route path="/wishlist" element={<Wishlist showToast={show} />} />
        <Route path="/cart" element={<Cart showToast={show} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout showToast={show} />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login showToast={show} />} />
        <Route path="/register" element={<Register showToast={show} />} />
      </Routes>
      <Toast toast={toast} onClose={hide} />
    </>
  );
}
