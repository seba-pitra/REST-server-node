import { Router } from "express";
import { check } from "express-validator";

import { 
  getUsers, 
  postUsers, 
  putUsers, 
  deleteUsers } from "../controllers/users.controller"
import { 
  isValidRol, 
  emailAlreadyExists, 
  userAlreadyExistsWithId } from "../helpers/db.validators"
import { 
  validateFields, 
  validateJWT, 
  isAdminRole, 
  hasRole } from "../middlewares"



const userRouter = Router();

userRouter.get('/', getUsers);


userRouter.put('/:id', [
  check('id', `id is not a valid ID`).isMongoId(),
  check('id', `id is not a valid ID`).custom(userAlreadyExistsWithId),
  check('rol').custom(isValidRol),
  validateFields
], putUsers);



userRouter.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password should be more than 6 characters').isLength({ min:6 }),
  check('email', 'Email is not valid').custom(emailAlreadyExists),
  check('rol').custom(isValidRol),
  
  validateFields
], postUsers);



userRouter.delete('/:id', [
  validateJWT,
  isAdminRole,
  hasRole('ADMIN_ROLE'),
  check('id', `id is not a valid ID`).isMongoId(),
  check('id', `id is not a valid ID`).custom(userAlreadyExistsWithId),
  validateFields
], deleteUsers);



export default userRouter;