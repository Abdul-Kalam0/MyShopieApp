import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

/**
 * ✅ CRITICAL — Manually handle OPTIONS preflight FIRST
 */
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://my-shopie-app-001.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // ✅ Return OK immediately
  }
  next();
});

/**
 * ✅ Standard cors() follows AFTER manual preflight handler
 */
app.use(
  cors({
    origin: "https://my-shopie-app-001.vercel.app",
    credentials: true, // ✅ allow cookies/JWT
  })
);

// ✅ ROUTES
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Health check
app.get("/", (req, res) => res.json({ success: true, message: "API running" }));

export default app;
