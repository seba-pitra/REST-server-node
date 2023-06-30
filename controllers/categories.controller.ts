import { Request, Response } from "express"
import { Category } from "../models";
import { IUser } from "../models/user";
import { Types } from "mongoose";

interface CustomRequest extends Request {
  user?: any;
}

interface dataPOST  {
  name: string,
  user: any;
}

export const getCategories = () => {
}

export const getCategoryById = () => {
}

export const createCategory = async (req: CustomRequest, res: Response) => {
  try {
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name })

    if(categoryDB) {
      return res.status(400).json({ msg: `Category ${name} already exists` })
    }

    const data: dataPOST = {
      name,
      user: req.user?._id
    }

    const category = new Category(data)

    await category.save();

    res.status(200).json({ data: category })
  } catch (error) {
    res.status(500).json({ msg: 'Error creating category'})
  }
  
}

export const updateCategory = () => {
}

export const deleteCategories = () => {
}