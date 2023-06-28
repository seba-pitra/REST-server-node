import { Schema, model } from 'mongoose';

export interface ICategory {
  name:   string;
  status: boolean;
  user:   Schema.Types.ObjectId;
}


const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
})


export const Category = model<ICategory>('Category', CategorySchema);