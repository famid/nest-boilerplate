// import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
//
// @Schema({ timestamps: true })
// export class User extends Document {
//   @Prop({ required: true })
//   name: string;
//
//   @Prop({ required: true, unique: true })
//   email: string;
//
//   @Prop({ required: true })
//   password: string;
//
//   @Prop({ required: true })
//   phoneNumber: string;
//
//   @Prop({ default: false })
//   status: boolean;
//
//   @Prop()
//   role?: string;
// }
//
// export const UserSchema = SchemaFactory.createForClass(User);

import { Model, Document, Schema, model } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber: string;
  status: boolean;
  role?: string;
}

export const UserSchema: Schema<User> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    phoneNumber: { type: String, required: true },
    status: { type: Boolean, default: false },
    role: { type: String },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

export const UserModel: Model<User> = model<User>('User', UserSchema);
