import { Schema, model, Document, Types } from 'mongoose';
import { PaymentMethod, PaymentStatus } from '../types/enums';

export interface IPaymentDocument extends Document {
  bookingId: Types.ObjectId;
  amount: number;
  paymentDate: Date;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPaymentDocument>(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      default: PaymentMethod.CARD,
    },
    transactionId: { type: String },
  },
  { timestamps: true }
);

export const Payment = model<IPaymentDocument>('Payment', paymentSchema);