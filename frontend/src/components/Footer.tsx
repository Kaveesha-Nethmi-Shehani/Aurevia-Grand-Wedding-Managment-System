import React from 'react';
import { Crown, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
  <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-2 text-amber-400 font-serif text-lg font-bold mb-3">
              <Crown className="w-5 h-5" />
              <span>Aurevia Grand Wedding & Banquets</span>
            </div>
            </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-amber-400 transition">Home</a></li>
              <li><a href="/venues" className="hover:text-amber-400 transition">Venues & Packages</a></li>
              <li><a href="/login" className="hover:text-amber-400 transition">Client Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Contact Events Desk</h4>
            <p className="text-sm text-slate-500">📍 No 100, Palace Boulevard, Colombo</p>
            <p className="text-sm text-slate-500">📞 +94 11 234 5678</p>
            <p className="text-sm text-slate-500">✉️ events@royalblisshotel.com</p>
          </div>

        </div>

        
      </div>
    </footer>
  );
};

export default Footer;
