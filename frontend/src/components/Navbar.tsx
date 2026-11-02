import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { logout } from '../redux/authSlice';
import { Crown, User, LogOut, Calendar } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 text-white shadow-xl sticky top-0 z-50 border-b border-amber-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-amber-500 p-2 rounded-full text-slate-950">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-wider text-amber-400 block font-serif">
                Aurevia Grand
              </span>
              <span className="text-xs tracking-widest text-slate-400 block uppercase">
                Wedding  & Banquets
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link to="/" className="hover:text-amber-400 transition">Home</Link>
            <Link to="/venues" className="hover:text-amber-400 transition">Wedding Venues</Link>
            
            {isAuthenticated && (
              <Link to="/my-bookings" className="flex items-center space-x-1 hover:text-amber-400 transition">
                <Calendar className="w-4 h-4 text-amber-500" />
                <span>My Bookings</span>
              </Link>
            )}

            {user?.role === 'ADMIN' && (
              <Link to="/admin" className="text-amber-400 font-semibold border border-amber-500/50 px-3 py-1 rounded-md hover:bg-amber-500 hover:text-slate-950 transition">
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-slate-300">
                  <User className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-sm">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-600/80 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm transition shadow-lg shadow-amber-500/20"
                >
                  Book Now
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
