import { Router } from 'express';
import {
  checkAvailability,
  createBooking,
  getMyBookings,
  updateMyBooking,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
  downloadPdf,
} from '../controllers/bookingController';
import { protect, adminOnly } from '../middleware/authMiddleware';

const router = Router();

router.post('/check-availability', checkAvailability);
router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.put('/my/:id', protect, updateMyBooking);
router.delete('/my/:id', protect, cancelBooking);
router.get('/all', protect, adminOnly, getAllBookings);
router.put('/:id/status', protect, adminOnly, updateBookingStatus);
router.get('/:id/pdf', protect, downloadPdf);

export default router;