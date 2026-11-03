export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
  phone: string;
}

export interface Venue {
  _id: string;
  name: string;
  location: string;
  description: string;
  capacity: number;
  price: number;
  images: string[];
  facilities: string[];
}

export interface Package {
  _id: string;
  venueId: string;
  name: string;
  description: string;
  price: number;
  services: string[];
}

export interface Booking {
  _id: string;
  userId: string;
  venueId: Venue;
  packageId?: Package;
  weddingDate: string;
  guestCount: number;
  totalAmount: number;
  bookingStatus: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
}