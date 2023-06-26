import { Router } from "express";
import { check } from "express-validator";

import { googleSignIn, login } from "../controllers/auth.controller"
import { validateFields } from "../middlewares/validateFields";


const authRouter = Router();

authRouter.post('/login', [
  check('email', 'Email is required').not().isEmpty(),
  check('email', 'It is not a valid email').isEmail(),
  check('password', 'Password should be more than 6 characters').isLength({ min:6 }),
  validateFields
], login)

authRouter.post('/google', [
  check('id_token', 'id_token is required').not().isEmpty(),
  validateFields
], googleSignIn)



export default authRouter;