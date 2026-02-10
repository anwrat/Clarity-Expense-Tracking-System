import {z} from "zod";

export const transactionSchema = z.object({
    body:z.object({
        amount: z.number().positive("Amount must be greater than 0"),
        category: z.string().min(2),
        description: z.string().max(100,"Description must be under 100 characters").optional(),
        type: z.enum(["INCOME", "EXPENSE"]),
        date: z.preprocess((arg) => {
          if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
        }, z.date().default(() => new Date())),
    }),
});