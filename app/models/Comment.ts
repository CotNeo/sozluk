import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IComment extends Document {
  content: string;
  author: IUser['_id'];
  entryId: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'Please provide content for the comment'],
      trim: true,
      maxlength: [1000, 'Comment cannot be more than 1000 characters long'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    entryId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Check if model exists before creating a new one (for hot reloading)
export default mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema); 