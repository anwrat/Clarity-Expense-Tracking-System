import type{ Request,Response } from "express";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { signToken } from "../utils/jwt.js";
import prisma from '../config/db.js';

export const register = async (req: Request, res: Response)=>{
    
}