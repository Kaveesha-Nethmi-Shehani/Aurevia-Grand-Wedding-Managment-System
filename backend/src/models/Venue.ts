import { Schema, model, Document } from 'mongoose';

export interface IVenueDocument extends Document {
  name: string;
  location: string;
  description: string;
  capacity: number;
  price: number;
  images: string[];
  facilities: string[];
  createdAt: Date;
  updatedAt: Date;
}

const venueSchema = new Schema<IVenueDocument>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    facilities: [{ type: String, default: [] }],
  },
  { timestamps: true }
);

export const Venue = model<IVenueDocument>('Venue', venueSchema);