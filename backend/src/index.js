import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();  

const PORT = process.env.PORT || 3002;  

async function main() {
  try {
   
    await mongoose.connect(process.env.MONGODB_URL, {
    
    });
    console.log(" Connected to MongoDB");

    // Start the Express server
    // app.listen(PORT, () => {
    //   console.log(` App listening on port ${PORT}`);
    // });
  } catch (err) {
    console.error(" Failed to connect to the database", err);
    process.exit(1); 
  }
}

main();
