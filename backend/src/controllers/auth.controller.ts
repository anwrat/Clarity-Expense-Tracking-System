import type{ Request,Response } from "express";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { signToken } from "../utils/jwt.js";
import {prisma} from '../config/db.js';

export const register = async (req: Request, res: Response)=>{
    try{
        const {name,email,password} = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data:{name,email,password:hashedPassword}
        });
        res.status(200).json({success: true, message: "User Registration successful"});
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Internal Server Error while registering"});
    }
}