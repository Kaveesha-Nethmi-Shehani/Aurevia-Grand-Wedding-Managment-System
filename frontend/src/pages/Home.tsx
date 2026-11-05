 import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, Award, Sparkles, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {
      /*Hero Section */
      }
      <div 
        className="relative bg-slate-900 text-white py-32 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
        style={{ 
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000')` 
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-tight text-white mb-6">
            Where Your Royal Love Story <span className="text-amber-400">Begins</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Book the perfect venue and custom wedding packages easily for your most memorable day
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/venues"
              className="inline-flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-4 rounded-xl text-base transition shadow-xl shadow-amber-500/25"
            >
              <span>Explore Wedding Venues</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center border-2 border-slate-400 hover:border-white text-white font-semibold px-8 py-4 rounded-xl text-base transition"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>

      {
      /* Features Section */
      }
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-serif text-slate-900">Why Celebrate at Aurevia Grand?</h2>
          <p className="text-slate-600 mt-2">Crafting timeless moments with unmatched perfection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-lg transition">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Grand Ballrooms</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Capacity from 100 to 500+ guests with customizable seating plans and luxurious banquet setups.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-lg transition">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Live Date Availability</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Real-time booking calendar allows you to instantly check available dates and reserve your dream day.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-lg transition">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">All-Inclusive Packages</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              From gourmet catering to floral decor, sound systems, and DJ services curated under one roof.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;