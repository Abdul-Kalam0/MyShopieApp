import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const dbInitialization = async () => {
  await mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("DB is connected"))
    .catch((error) => console.error("Error in connected DB", error));
};

export default dbInitialization;
