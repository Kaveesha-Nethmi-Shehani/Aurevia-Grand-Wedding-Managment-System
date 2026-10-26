import { Schema, model, Document, Types } from 'mongoose';
import { BookingStatus } from '../types/enums';

export interface IBookingDocument extends Document {
userId: Types.ObjectId;
venueId: Types.ObjectId;
packageId?: Types.ObjectId;
weddingDate: Date;
guestCount: number;
totalAmount: number;
bookingStatus: BookingStatus;
createdAt: Date;
updatedAt: Date;
}

const bookingSchema = new Schema<IBookingDocument>(
{
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    venueId: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    packageId: { type: Schema.Types.ObjectId, ref: 'Package' },
    weddingDate: { type: Date, required: true },
    guestCount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    bookingStatus: {
    type: String,
    enum: Object.values(BookingStatus),
    default: BookingStatus.PENDING,
    },
},
{ timestamps: true }
);

export const Booking = model<IBookingDocument>('Booking', bookingSchema);