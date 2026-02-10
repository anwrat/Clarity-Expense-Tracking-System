import express from "express";
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true,
}));

//Authentication routes
app.use('/api/auth',authRoutes);
//Transaction routes
app.use('/api/transaction',transactionRoutes);

export default app;