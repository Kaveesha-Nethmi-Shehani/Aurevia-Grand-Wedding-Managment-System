import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserRole } from '../types/enums';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  phone: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { 
      type: String, 
      enum: Object.values(UserRole), 
      default: UserRole.CUSTOMER 
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password || '');
};

export const User = model<IUserDocument>('User', userSchema);