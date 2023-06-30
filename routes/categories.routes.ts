import { Router } from "express";
import { check } from "express-validator";

import { validateFields, validateJWT } from "../middlewares"
import { createCategory } from "../controllers/categories.controller";

const catogoriesRouter: Router = Router();


// Get Categories - public
catogoriesRouter.get('/', (req, res) => res.json("todo ok") )


// Get category by id - public
catogoriesRouter.get('/:id', (req, res) => res.json("todo ok") )


// Create category - Private - any person with valid token
catogoriesRouter.post('/', [
  validateJWT,
  check('name', 'Name is required').not().isEmpty(),
  validateFields,
], createCategory )


// update category by id - Private - any person with valid token
catogoriesRouter.put('/:id', (req, res) => res.json("put") )


// Delete category by id - Admin
catogoriesRouter.delete('/:id', (req, res) => res.json("tdelete") )




export default catogoriesRouter;