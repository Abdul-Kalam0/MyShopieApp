import server from "./index.js";
import dbInitialization from "./config/db.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await dbInitialization();
  server.listen(PORT, () => {
    console.log(`Sever listening on PORT ${PORT}`);
  });
};

startServer();
