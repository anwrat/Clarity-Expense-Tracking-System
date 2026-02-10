import { Router } from "express";
import { addTransaction } from "../controllers/transaction.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/zodValidate.middleware.js";
import { transactionSchema } from "../schemas/transaction.schema.js";

const router = Router();

router.post('/',authenticateToken,validate(transactionSchema),addTransaction);

export default router;