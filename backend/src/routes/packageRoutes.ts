import { Router } from 'express';
import { getPackagesByVenue, createPackage, deletePackage } from '../controllers/packageController';
import { protect, adminOnly } from '../middleware/authMiddleware';

const router = Router();

router.get('/venue/:venueId', getPackagesByVenue);
router.post('/', protect, adminOnly, createPackage);
router.delete('/:id', protect, adminOnly, deletePackage);

export default router;