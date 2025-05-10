import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import indexRoutes from './routers/index.router.js';


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




export default app;
