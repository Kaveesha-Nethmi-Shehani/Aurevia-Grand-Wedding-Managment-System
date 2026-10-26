import { Schema, model, Document, Types } from 'mongoose';

export interface IReviewDocument extends Document {
  userId: Types.ObjectId;
  venueId: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReviewDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    venueId: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export const Review = model<IReviewDocument>('Review', reviewSchema);