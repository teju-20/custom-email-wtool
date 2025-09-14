import mongoose, { Schema, Document } from 'mongoose';

export interface IEmail extends Document {
  subject: string;
  body: string;
}

const emailSchema: Schema = new Schema({
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    minlength: [3, 'Subject must be at least 3 characters'],
    maxlength: [255, 'Subject can be at most 255 characters'],
  },
  body: {
    type: String,
    required: [true, 'Body is required'],
    trim: true,
    minlength: [10, 'Body must be at least 10 characters'],
  },
}, {
  timestamps: true,
});

const Email = mongoose.model<IEmail>('Email', emailSchema);
export default Email;
