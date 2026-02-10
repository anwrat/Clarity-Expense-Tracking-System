import { Router } from "express";
import { addTransaction, getAllTransactions } from "../controllers/transaction.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/zodValidate.middleware.js";
import { transactionSchema } from "../schemas/transaction.schema.js";

const router = Router();

router.post('/',authenticateToken,validate(transactionSchema),addTransaction);
router.get('/',authenticateToken,getAllTransactions);

export default router;