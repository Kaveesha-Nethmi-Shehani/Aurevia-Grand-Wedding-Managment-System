import { Request, Response } from 'express';
import { Venue } from '../models/Venue';

// 1. Get All Venues (With Filtering by capacity & search)
export const getAllVenues = async (req: Request, res: Response) => {
  try {
    const { capacity, search } = req.query;
    let query: any = {};

    if (capacity) {
      query.capacity = { $gte: Number(capacity) }; // ඉල්ලන ගණනට වඩා ධාරිතාව වැඩි ඒවා
    }
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const venues = await Venue.find(query);
    return res.status(200).json({ success: true, count: venues.length, data: venues });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// 2. Get Single Venue by ID
export const getVenueById = async (req: Request, res: Response) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ success: false, message: 'Venue not found' });
    }
    return res.status(200).json({ success: true, data: venue });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// 3. Create Venue (Admin Only)
export const createVenue = async (req: Request, res: Response) => {
  try {
    const newVenue = await Venue.create(req.body);
    return res.status(201).json({ success: true, message: 'Venue created successfully', data: newVenue });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating venue', error });
  }
};

// 4. Update Venue (Admin Only)
export const updateVenue = async (req: Request, res: Response) => {
  try {
    const updated = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({ success: true, message: 'Venue updated', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating venue', error });
  }
};

// 5. Delete Venue (Admin Only)
export const deleteVenue = async (req: Request, res: Response) => {
  try {
    await Venue.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Venue deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting venue', error });
  }
};