import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { validate } from "../middlewares/zodValidate.middleware.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/register',validate(registerSchema),register);
router.post('/login',validate(loginSchema), login);

export default router;