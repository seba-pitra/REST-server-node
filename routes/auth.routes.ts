import { Router } from "express";
import { check } from "express-validator";

import { login } from "../controllers/auth.controller"
import { validateFields } from "../middlewares/validateFields";


const authRouter = Router();

authRouter.post('/', [
  check('email', 'Email is required').not().isEmpty(),
  check('email', 'It is not a valid email').isEmail(),
  check('password', 'Password should be more than 6 characters').isLength({ min:6 }),
  validateFields
], login)



export default authRouter;