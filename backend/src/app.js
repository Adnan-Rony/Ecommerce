import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import indexRoutes from './routers/index.router.js';
import userRoutes from './routers/user.routes.js';
import productRoutes from './routers/product.routes.js';
import cartRoutes from './routers/cart.routes.js';
import orderRoutes from './routers/order.routes.js';
import wishRoutes from './routers/wishlistRoutes.js';
import adminRoutes from './routers/admin.routes.js';

dotenv.config()
const app =express()

app.use(express.json())

app.use(cookieParser())

const corsOptions = {
  origin: [
    "http://localhost:5173",
    
  ],
  credentials: true,
};

app.use(cors(corsOptions));

  
app.use("/api/v1",indexRoutes); //base route for all api routes
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/product",productRoutes)
app.use("/api/v1/cart",cartRoutes)
app.use("/api/v1/order",orderRoutes)
app.use("/api/v1/wishlist",wishRoutes)
app.use("/api/v1/admin",adminRoutes)



export default app;
