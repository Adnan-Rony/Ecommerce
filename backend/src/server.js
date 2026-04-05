import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";
import app from "./app.js";

dotenv.config();

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 30000,
      family: 4,
    });

    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
}

startServer();