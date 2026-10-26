import { Schema, model, Document, Types } from 'mongoose';

export interface IPackageDocument extends Document {
  venueId: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  services: string[];
  createdAt: Date;
  updatedAt: Date;
}

const packageSchema = new Schema<IPackageDocument>(
  {
    venueId: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    services: [{ type: String, default: [] }],
  },
  { timestamps: true }
);

export const Package = model<IPackageDocument>('Package', packageSchema);