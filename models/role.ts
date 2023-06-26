import { Schema, model } from 'mongoose';

export interface IRole {
  rol: string;
}


const RoleSchema = new Schema<IRole>({
  rol: {
    type: String,
    required: [true, 'Rol is required']
  }
})


export const Role = model<IRole>('Role', RoleSchema);