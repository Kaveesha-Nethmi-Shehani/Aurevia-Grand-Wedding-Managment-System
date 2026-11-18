import { Response } from 'express';
import { Booking } from '../models/Booking';
import { BookingStatus } from '../types/enums';
import { AuthRequest } from '../middleware/authMiddleware';
import { generateBookingPDF } from '../utils/genaratePdf';

export const checkAvailability = async (req: AuthRequest, res: Response) => {
  try {
    const { venueId, weddingDate } = req.body;
    const existing = await Booking.findOne({
      venueId,
      weddingDate: new Date(weddingDate),
      bookingStatus: { $ne: BookingStatus.CANCELLED },
    });

    if (existing) {
      return res.status(200).json({ available: false, message: 'Date already booked' });
    }
    return res.status(200).json({ available: true, message: 'Date available' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Create Booking
export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { venueId, packageId, weddingDate, guestCount, totalAmount } = req.body;

    const booking = await Booking.create({
      userId: req.user?.userId,
      venueId,
      packageId,
      weddingDate: new Date(weddingDate),
      guestCount,
      totalAmount,
      bookingStatus: BookingStatus.PENDING,
    });

    return res.status(201).json({ success: true, message: 'Booking created successfully', data: booking });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Get my Bookings
export const getMyBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ userId: req.user?.userId })
      .populate('venueId')
      .populate('packageId');
    return res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Update Booking (User)
export const updateMyBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { weddingDate, guestCount } = req.body;
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.userId },
      { weddingDate: new Date(weddingDate), guestCount },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    return res.status(200).json({ success: true, message: 'Reservation updated successfully', data: booking });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating reservation', error });
  }
};


// Cancel Booking (User)
export const cancelBooking = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await Booking.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.userId,
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    return res.status(200).json({ success: true, message: 'Reservation cancelled successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error cancelling reservation', error });
  }
};

// Get All Bookings (Admin)
export const getAllBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email phone')
      .populate('venueId')
      .populate('packageId');
    return res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Update Booking Status (Admin)
export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { bookingStatus: status },
      { new: true }
    );
    return res.status(200).json({ success: true, message: 'Status updated', data: booking });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating status', error });
  }
};

// Download Booking PDF
export const downloadPdf = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('venueId');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    generateBookingPDF(booking, res);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error generating PDF', error });
  }
};