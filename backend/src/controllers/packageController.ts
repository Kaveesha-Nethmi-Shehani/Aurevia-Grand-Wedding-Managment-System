import { Request, Response } from 'express';
import { Package } from '../models/Package';

export const getPackagesByVenue = async (req: Request, res: Response) => {
  try {
    const packages = await Package.find({ venueId: req.params.venueId });
    return res.status(200).json({ success: true, data: packages });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};

export const createPackage = async (req: Request, res: Response) => {
  try {
    const newPackage = await Package.create(req.body);
    return res.status(201).json({ success: true, data: newPackage });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating package', error });
  }
};

export const deletePackage = async (req: Request, res: Response) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Package deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting package', error });
  }
};