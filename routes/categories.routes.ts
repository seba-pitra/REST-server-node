import { Router } from "express";
import { check } from "express-validator";



const catogoriesRouter: Router = Router();


// Get Categories - public
catogoriesRouter.get('/', (req, res) => res.json("todo ok") )


// Get category by id - public
catogoriesRouter.get('/:id', (req, res) => res.json("todo ok") )


// Create category - Private - any person with valid token
catogoriesRouter.post('/', (req, res) => res.json("todo ok") )


// update category by id - Private - any person with valid token
catogoriesRouter.put('/:id', (req, res) => res.json("put") )


// Delete category by id - Admin
catogoriesRouter.delete('/:id', (req, res) => res.json("tdelete") )




export default catogoriesRouter;