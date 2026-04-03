import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";
import app from "./app.js";

dotenv.config();

// Force Node.js to use Google DNS
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 30000,
      family: 4,
    });
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`✅ App listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  }
}

main();