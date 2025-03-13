import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { ITopic } from './Topic';

export interface IEntry extends Document {
  content: string;
  author: IUser['_id'];
  topic: ITopic['_id'];
  likes: IUser['_id'][];
  isEdited: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EntrySchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'Please provide content for the entry'],
      trim: true,
      minlength: [10, 'Entry must be at least 10 characters long'],
      maxlength: [5000, 'Entry cannot be more than 5000 characters long'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    topic: {
      type: Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isEdited: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Update topic entry count when a new entry is created
EntrySchema.post('save', async function(this: IEntry) {
  try {
    const Topic = mongoose.model('Topic');
    await Topic.findByIdAndUpdate(this.topic, { $inc: { entryCount: 1 } });
  } catch (error) {
    console.error('Error updating topic entry count:', error);
  }
});

// Check if model exists before creating a new one (for hot reloading)
export default mongoose.models.Entry || mongoose.model<IEntry>('Entry', EntrySchema); 