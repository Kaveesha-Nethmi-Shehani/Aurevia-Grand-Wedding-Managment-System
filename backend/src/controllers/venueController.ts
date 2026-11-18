import { Request, Response } from 'express';
import { Venue } from '../models/Venue';

export const getAllVenues = async (req: Request, res: Response) => {
  try {
    const { capacity, search } = req.query;
    let query: any = {};

    if (capacity && Number(capacity) > 0) {
      query.capacity = { $gte: Number(capacity) };
    }

    if (search && typeof search === 'string' && search.trim() !== '') {
      query.name = { $regex: search.trim(), $options: 'i' };
    }

    let venues = await Venue.find(query);

    if (venues.length === 0 && (!search || search === '') && (!capacity || capacity === '')) {
      const defaultVenues = [
        {
          name: 'The Grand Bliss Ballroom',
          location: 'Grand Wing, 1st Floor',
          description: 'Our flagship luxury ballroom featuring crystal chandeliers and a dedicated dance floor.',
          capacity: 450,
          price: 350000,
          images: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000'],
          facilities: ['Fully Air Conditioned', 'Crystal Stage Decor', 'Valet Parking', 'Changing Rooms']
        },
        {
          name: 'The Royal Crystal Hall',
          location: 'Heritage Wing, 2nd Floor',
          description: 'Intimate and elegant, perfect for medium-sized traditional and modern wedding ceremonies.',
          capacity: 250,
          price: 220000,
          images: ['https://images.unsplash.com/photo-1519225438848-842f494a8f90?auto=format&fit=crop&q=80&w=1000'],
          facilities: ['Ambient Lighting', 'Sound System', 'Bridal Dressing Room', 'Dedicated Buffet Area']
        },
        {
          name: 'Bliss Garden Pavilion',
          location: 'Outdoor Lakefront Lawn',
          description: 'A magical open-air garden venue surrounded by lush palm trees and water features.',
          capacity: 350,
          price: 280000,
          images: ['https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1000'],
          facilities: ['Garden Lighting', 'Outdoor Barbecue Area', 'Covered Marquee', 'Scenic Photo Spots']
        }
      ];

      await Venue.insertMany(defaultVenues);
      venues = await Venue.find();
    }

    return res.status(200).json({ success: true, count: venues.length, data: venues });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};

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

export const createVenue = async (req: Request, res: Response) => {
  try {
    const newVenue = await Venue.create(req.body);
    return res.status(201).json({ success: true, message: 'Venue created successfully', data: newVenue });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating venue', error });
  }
};

export const updateVenue = async (req: Request, res: Response) => {
  try {
    const updated = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({ success: true, message: 'Venue updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating venue', error });
  }
};

export const deleteVenue = async (req: Request, res: Response) => {
  try {
    await Venue.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Venue deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting venue', error });
  }
};