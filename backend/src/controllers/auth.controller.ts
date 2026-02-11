import type{ Request,Response } from "express";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { signToken } from "../utils/jwt.js";
import {prisma} from '../config/db.js';
import { success } from "zod";

export const register = async (req: Request, res: Response)=>{
    try{
        const {name,email,password} = req.body;
        const existingUser = await prisma.user.findUnique({
            where:{email}
        });
        if(existingUser){
            return res.status(400).json({success: false, message: "The email is already registered."});
        }
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

export const login = async(req:Request, res: Response)=>{
    try{
        const {email, password} = req.body;
        const user = await prisma.user.findUnique({where: {email}});
        if(!user){
            return res.status(401).json({success: false, message: "Invalid credentials"});
        }
        const checkPassword = await comparePassword(password,user.password);
        if(!user || !checkPassword){
            return res.status(401).json({success: false, message: "Invalid credentials"});
        }
        const token = signToken({id: user.id, name: user.name, email: user.email});
        res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 2*24*60*60*1000 //2 days in milliseconds
        });
        return res.status(200).json({
            success: true, 
            message: "User logged in successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            }});
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Internal Server Error while registering"});
    }
}

export const getCurrentUser = async(req: Request, res: Response) =>{
    try{
        if(!req.user){
            return res.status(401).json({success: false, message: "Unauthorized"});
        }
        const user = await prisma.user.findUnique({
            where: {id: req.user.id},
            select: {id: true, email: true, name: true}
        });
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }
        return res.status(200).json({success: true, message: "User found", data: user});
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Internal Server Error while getting current user"});
    }
}

export const logOutUser = async (req: Request, res: Response) =>{
    res.clearCookie('token',{
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
    return res.status(200).json({message: 'User logged out successfully'});
}