import mongoose, { Schema, Document } from "mongoose";

// Extend the Document interface with required fields
export interface IUser extends Document {
  name: string;
  email: string;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiry?: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    accessToken: { type: String, required: false },
    refreshToken: { type: String, required: false },
    tokenExpiry: { type: Date, required: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
