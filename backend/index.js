import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import productRoutes from "./routers/productRoutes.js";
import categoryRoutes from "./routers/categoryRoutes.js";
import userRoutes from "./routers/userRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

//Auth
app.use("/api/users", userRoutes);

//PRODUCT ROUTES
app.use("/api/products", productRoutes);

//CATEGORY ROUTES
app.use("/api/categories", categoryRoutes);

export default app;
