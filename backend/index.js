import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import productRoutes from "./routers/productRoutes.js";
import categoryRoutes from "./routers/categoryRoutes.js";
import userRoutes from "./routers/userRoutes.js";

const app = express();

// Allow requests from React app
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // optional, if you use cookies/auth
  })
);

app.use(express.json());

//Auth
app.use("/api/users", userRoutes);

//PRODUCT ROUTES
app.use("/api/products", productRoutes);

//CATEGORY ROUTES
app.use("/api/categories", categoryRoutes);

export default app;
