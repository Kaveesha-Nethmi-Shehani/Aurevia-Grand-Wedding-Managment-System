 import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Calendar, Users, Download, Sparkles, CheckCircle2 } from 'lucide-react';

interface Booking {
  _id: string;
  weddingDate: string;
  guestCount: number;
  totalAmount: number;
  bookingStatus: string;
  venueId?: { name: string; location: string };
}

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const res = await API.get('/bookings/my');
      if (res.data.success) {
        setBookings(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 📄 Advanced Feature: Download PDF Confirmation Slip
  const handleDownloadPDF = async (bookingId: string) => {
    try {
      const response = await API.get(`/bookings/${bookingId}/pdf`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `RoyalBliss_Booking_${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('Error downloading PDF confirmation slip.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold font-serif text-slate-900">My Wedding Bookings</h1>
            <p className="text-sm text-slate-600 mt-1">View your reservation details and official PDF passes</p>
          </div>
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Royal Bliss Client</span>
          </span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading your reservations...</div>
        ) : bookings.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center border border-slate-200">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">No Reservations Found</h3>
            <p className="text-sm text-slate-500 mt-1">You haven't reserved any wedding ballrooms yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{booking.bookingStatus.toUpperCase()}</span>
                    </span>
                    <span className="text-xs text-slate-400">Ref: {booking._id}</span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-slate-900">
                    {booking.venueId?.name || 'Grand Bliss Ballroom'}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 pt-1">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      <span>Date: {new Date(booking.weddingDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-amber-500" />
                      <span>Guests: {booking.guestCount}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
                  <div>
                    <span className="text-xs text-slate-400 block">Total Reserved Cost</span>
                    <span className="text-xl font-extrabold text-slate-900">
                      Rs. {booking.totalAmount?.toLocaleString()}
                    </span>
                  </div>

                  {/* 📄 PDF Download Button */}
                  <button
                    onClick={() => handleDownloadPDF(booking._id)}
                    className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-sm cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Slip</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyBookings;