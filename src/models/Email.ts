import mongoose, { Schema, Document } from 'mongoose';

export interface IEmail extends Document {
  subject: string;
  body: string;
}

const emailSchema: Schema = new Schema({
  subject: { type: String, required: true },
  body: { type: String, required: true },
}, {
  timestamps: true,
});

const Email = mongoose.model<IEmail>('Email', emailSchema);
export default Email;