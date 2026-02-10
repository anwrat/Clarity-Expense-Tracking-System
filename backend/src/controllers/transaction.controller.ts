import type{ Request, Response } from "express";
import { prisma } from "../config/db.js";

export const addTransaction = async(req: Request, res: Response) =>{
    try{
        const {amount, category, description, type, date} = req.body;
        const userId = req.user?.id;
        if(!userId){
            return res.status(401).json({success: false, message: "Unauthorized: No user Id found"});
        }
        const transaction = await prisma.transaction.create({
            data:{
                amount: parseFloat(amount),
                category,
                description,
                type,
                date,
                userId
            },
        });
        res.status(201).json({success: true, message: "Successfully added transaction", data: transaction});
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Internal Server Error while adding transaction"});
    }
}