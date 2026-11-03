 import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { Users, MapPin, Sparkles, Search } from 'lucide-react';

interface Venue {
  _id: string;
  name: string;
  location: string;
  description: string;
  capacity: number;
  price: number;
  images: string[];
  facilities: string[];
}

const Venues: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [capacityFilter, setCapacityFilter] = useState('');
  const [search, setSearch] = useState('');

  // Default Luxury Venues for Presentation
  const defaultVenues: Venue[] = [
    {
      _id: '65f1a2b3c4d5e6f7a8b9c0d1',
      name: 'The Grand Bliss Ballroom',
      location: 'Grand Wing, 1st Floor',
      description: 'Our flagship luxury ballroom featuring crystal chandeliers and a dedicated dance floor.',
      capacity: 450,
      price: 350000,
      images: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000'],
      facilities: ['Fully Air Conditioned', 'Crystal Stage Decor', 'Valet Parking', 'Changing Rooms']
    },
    {
      _id: '65f1a2b3c4d5e6f7a8b9c0d2',
      name: 'The Royal Crystal Hall',
      location: 'Heritage Wing, 2nd Floor',
      description: 'Intimate and elegant, perfect for medium-sized traditional and modern wedding ceremonies.',
      capacity: 250,
      price: 220000,
      images: ['https://images.unsplash.com/photo-1545232979-fbf68fe9f1f9?auto=format&fit=crop&q=80&w=1000'],
      facilities: ['Ambient Lighting', 'Sound System', 'Bridal Dressing Room', 'Dedicated Buffet Area']
    },
    {
      _id: '65f1a2b3c4d5e6f7a8b9c0d3',
      name: 'Bliss Garden Pavilion',
      location: 'Outdoor Lakefront Lawn',
      description: 'A magical open-air garden venue surrounded by lush palm trees and water features.',
      capacity: 350,
      price: 280000,
      images: ['https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1000'],
      facilities: ['Garden Lighting', 'Outdoor Barbecue Area', 'Covered Marquee', 'Scenic Photo Spots']
    }
  ];

  useEffect(() => {
    fetchVenues();
  }, [capacityFilter, search]);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/venues?capacity=${capacityFilter}&search=${search}`);
      if (res.data.success && res.data.data.length > 0) {
        setVenues(res.data.data);
      } else {
        setVenues(defaultVenues);
      }
    } catch (error) {
      setVenues(defaultVenues);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center space-x-2 text-amber-600 bg-amber-100 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Royal Bliss Venues</span>
          </span>
          <h1 className="text-4xl font-extrabold font-serif text-slate-900">
            Our Wedding Ballrooms & Halls
          </h1>
          <p className="text-slate-600 mt-2 max-w-xl mx-auto">
            Choose the perfect setting for your vows. Filter by capacity to match your guest list.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search by hall name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Users className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-600 font-medium">Guest Capacity:</span>
            <select
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
              className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            >
              <option value="">All Capacities</option>
              <option value="200">200+ Guests</option>
              <option value="300">300+ Guests</option>
              <option value="400">400+ Guests</option>
            </select>
          </div>
        </div>

        {/* Venues Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading royal venues...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {venues.map((venue) => (
              <div key={venue._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition border border-slate-200 flex flex-col">
                <img
                  src={venue.images[0] || defaultVenues[0].images[0]}
                  alt={venue.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-1 text-xs text-amber-600 font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{venue.location}</span>
                    </div>
                    <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">{venue.name}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{venue.description}</p>
                    
                    <div className="flex items-center justify-between py-3 border-t border-b border-slate-100 text-sm mb-4">
                      <div className="flex items-center space-x-1 text-slate-700 font-medium">
                        <Users className="w-4 h-4 text-amber-500" />
                        <span>Up to {venue.capacity} Guests</span>
                      </div>
                      <div className="flex items-center text-slate-900 font-bold">
                        <span>Rs. {venue.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/book/${venue._id}`}
                    className="w-full text-center bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold py-3 rounded-xl transition text-sm"
                  >
                    Check Dates & Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Venues;