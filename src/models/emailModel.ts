import mongoose, { Schema, Document } from "mongoose";

export interface IEmail extends Document {
  subject: string;
  body: string;
  to: string;
  from: string;
  createdAt: Date;
}

const EmailSchema: Schema = new Schema(
  {
    subject: { type: String, required: true },
    body: { type: String, required: true },
    to: { type: String, required: true },
    from: { type: String, required: true },
  },
  { timestamps: true }
);

const EmailModel = mongoose.model<IEmail>("Email", EmailSchema);

export default EmailModel;