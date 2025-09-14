import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  accessToken: string;
  refreshToken: string;
  tokenExpiry: Date;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  tokenExpiry: { type: Date, required: true },
});

export default model<IUser>('User', userSchema);
