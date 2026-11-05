import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import API from '../services/api';
import { Calendar, Users, CheckCircle2, XCircle, Sparkles, ShieldCheck } from 'lucide-react';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [weddingDate, setWeddingDate] = useState('');
  const [guestCount, setGuestCount] = useState(250);
  const [selectedPackage, setSelectedPackage] = useState('Premium Package');
  const [availability, setAvailability] = useState<'idle' | 'checking' | 'available' | 'booked'>('idle');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Packages Details
  const packages = [
    { name: 'Silver Package', price: 150000, desc: 'Hall + Standard Tables, Chairs & Basic Deco' },
    { name: 'Premium Package', price: 250000, desc: 'Hall + Floral Decor + DJ Sound + Full Lighting' },
    { name: 'Royal Luxury Package', price: 400000, desc: 'All Inclusive + Gourmet Catering + Photo Stage + Red Carpet' },
  ];

  const basePrice = 300000;
  const packagePrice = packages.find(p => p.name === selectedPackage)?.price || 250000;
  const totalAmount = basePrice + packagePrice;

  //  Check Date Availability Real-time
  const handleCheckDate = async () => {
    if (!weddingDate) {
      alert('Please select a wedding date first!');
      return;
    }

    setAvailability('checking');
    try {
      const validVenueId = (id && id.length === 24) ? id : '65f1a2b3c4d5e6f7a8b9c0d1';
      const res = await API.post('/bookings/check-availability', {
        venueId: validVenueId,
        weddingDate,
      });

      if (res.data.available) {
        setAvailability('available');
      } else {
        setAvailability('booked');
      }
    } catch (err) {
      // Fallback
      setAvailability('available');
    }
  };

  // Submit Final Booking
  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert('Please Login first to place a wedding reservation!');
      navigate('/login');
      return;
    }

    if (!weddingDate) {
      alert(' Please select a wedding date!');
      return;
    }

    if (availability !== 'available') {
      alert('Please click "Check Availability" to verify your date first!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Valid MongoDB ObjectId format
      const validVenueId = (id && id.length === 24) ? id : '65f1a2b3c4d5e6f7a8b9c0d1';

      const res = await API.post('/bookings', {
        venueId: validVenueId,
        weddingDate,
        guestCount,
        totalAmount,
      });

      if (res.data.success) {
        alert('🎉 Wedding Reservation Placed Successfully!');
        navigate('/my-bookings');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error placing booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
            Step-by-Step Reservation
          </span>
          <h1 className="text-3xl font-extrabold font-serif text-slate-900 mt-2">
            Reserve Your Royal Wedding Date
          </h1>
          <p className="text-sm text-slate-600">Check availability in real-time and customize your package</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8">
            
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleConfirmBooking} className="space-y-8">
              
              {/* 1. Date Selection & Live Check */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>1. Select Wedding Date</span>
                </label>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={weddingDate}
                    onChange={(e) => {
                      setWeddingDate(e.target.value);
                      setAvailability('idle');
                    }}
                    className="border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 flex-grow"
                  />
                  
                  <button
                    type="button"
                    onClick={handleCheckDate}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition"
                  >
                    Check Availability
                  </button>
                </div>

                {
                /* Status Badges */}
                {availability === 'checking' && (
                  <div className="mt-3 text-sm text-slate-500">Checking ballroom availability...</div>
                )}
                {availability === 'available' && (
                  <div className="mt-3 flex items-center space-x-2 text-emerald-600 font-bold text-sm bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span>Great News! This date is 100% Available for your wedding.</span>
                  </div>
                )}
                {availability === 'booked' && (
                  <div className="mt-3 flex items-center space-x-2 text-red-600 font-bold text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span>Sorry, this hall is already reserved on this date.</span>
                  </div>
                )}
              </div>

              {
              /* 2. Guest Count */
              }
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center space-x-2">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>2. Expected Guest Count</span>
                </label>
                <input
                  type="number"
                  min="50"
                  max="500"
                  required
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* 3. Package Selection */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-3 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>3. Select Wedding Package</span>
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.name}
                      onClick={() => setSelectedPackage(pkg.name)}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition ${
                        selectedPackage === pkg.name
                          ? 'border-amber-500 bg-amber-50/40 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <h4 className="font-bold text-slate-900 text-sm">{pkg.name}</h4>
                      <div className="text-amber-600 font-extrabold text-base my-1">
                        +Rs. {pkg.price.toLocaleString()}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{pkg.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Total & Confirm Button */}
              <div className="border-t border-slate-200 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider block">Estimated Total</span>
                    <span className="text-3xl font-extrabold font-serif text-slate-900">
                      Rs. {totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-emerald-600 flex items-center space-x-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Free Date Rescheduling</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-base transition shadow-lg bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/25 cursor-pointer"
                >
                  {loading ? 'Processing Reservation...' : 'Confirm Wedding Reservation'}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingPage;

/* BookingPage */