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
        res.status(200).json({success: true, message: "Successfully added transaction", data: transaction});
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Internal Server Error while adding transaction"});
    }
}

export const getAllTransactions = async(req: Request, res: Response)=>{
    try{
        const userId = req.user?.id;
        if(!userId){
            return res.status(401).json({success: false, message: "Unauthorized: No user Id found"});
        }
        const transactions = await prisma.transaction.findMany({
            where:{userId:userId},
            orderBy: {
                date: "desc",
            }
        });
        return res.status(200).json({success: true, message: "Successfully fetched transactions", data: transactions});
    }catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal Server Error while fetching all transactions"});
    }
}