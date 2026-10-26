import { Router } from 'express';
import { getAllVenues, getVenueById, createVenue, updateVenue, deleteVenue } from '../controllers/venueController';
import { protect, adminOnly } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getAllVenues);
router.get('/:id', getVenueById);
router.post('/', protect, adminOnly, createVenue);
router.put('/:id', protect, adminOnly, updateVenue);
router.delete('/:id', protect, adminOnly, deleteVenue);

export default router;