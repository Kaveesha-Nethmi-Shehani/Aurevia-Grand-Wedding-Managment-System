import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';

// Routes Import කිරීම
import authRoutes from './routes/authRoutes';
import venueRoutes from './routes/venueRoutes';
import packageRoutes from './routes/packageRoutes';
import bookingRoutes from './routes/bookingRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes Mount කිරීම
app.use('/api/auth', authRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send('👑 Royal Bliss Hotel & Banquets API is 100% Live & Ready!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  connectDB();
});