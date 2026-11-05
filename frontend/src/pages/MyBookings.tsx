import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Calendar, Users, Download, Sparkles, CheckCircle2, Clock } from 'lucide-react';

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

  // Days Calculation
  const calculateDaysLeft = (weddingDate: string) => {
    const today = new Date().getTime();
    const event = new Date(weddingDate).getTime();
    const diffTime = event - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // PDF
  const handleDownloadPDF = async (bookingId: string) => {
    try {
      const response = await API.get(`/bookings/${bookingId}/pdf`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `AureviaGrand_Booking_${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('Error downloading PDF confirmation slip.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {
        /* Header */
        }
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold font-serif text-slate-900">My Wedding Bookings</h1>
            <p className="text-sm text-slate-600 mt-1">View your reservation details and official passes</p>
          </div>
          
        </div>

        {

        }
        {bookings.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border-2 border-amber-500/30 shadow-md flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                  Wedding Countdown
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {new Date(bookings[0].weddingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </h3>
              </div>
            </div>

            {

            }
            <div className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-center shadow-sm">
              <span className="text-2xl font-serif font-extrabold text-amber-400">
                {calculateDaysLeft(bookings[0].weddingDate)}
              </span>
              <span className="text-xs text-slate-300 font-medium block">Days to Go</span>
            </div>
          </div>
        )}

        {
        /* Confirmed Bookings List */
        }
        <div>
          {loading ? (
            <div className="text-center py-20 text-slate-500">Loading your reservations...</div>
          ) : bookings.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl text-center border border-slate-200">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-700">No Reservations Found</h3>
              <p className="text-sm text-slate-500 mt-1">You haven't reserved any wedding ballrooms yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{booking.bookingStatus.toUpperCase()}</span>
                      </span>
                      <span className="text-xs text-slate-400">Ref: {booking._id}</span>
                    </div>

                    <h4 className="text-xl font-bold font-serif text-slate-900">
                      {booking.venueId?.name || 'The Grand Bliss Ballroom'}
                    </h4>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 pt-1">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        <span>Date: {new Date(booking.weddingDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Users className="w-4 h-4 text-amber-500" />
                        <span>Guests: {booking.guestCount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full md:w-auto">
                    <div>
                      <span className="text-xs text-slate-400 block">Total Reserved Cost</span>
                      <span className="text-xl font-extrabold text-slate-900 font-serif">
                        Rs. {booking.totalAmount?.toLocaleString()}
                      </span>
                    </div>

                    {
                      
                    }
                    <button
                      onClick={() => handleDownloadPDF(booking._id)}
                      className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-sm cursor-pointer"
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
    </div>
  );
};

export default MyBookings;