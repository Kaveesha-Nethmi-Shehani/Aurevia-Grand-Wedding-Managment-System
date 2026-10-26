import PDFDocument from 'pdfkit';
import { Response } from 'express';

export const generateBookingPDF = (booking: any, res: Response) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=booking_${booking._id}.pdf`);

  doc.pipe(res);

  doc.fontSize(22).text('👑 ROYAL BLISS HOTEL & BANQUETS', { align: 'center' });
  doc.fontSize(14).text('Official Wedding Venue Booking Confirmation', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Booking Reference ID: ${booking._id}`);
  doc.text(`Status: ${booking.bookingStatus}`);
  doc.moveDown();

  doc.fontSize(12).text(`Wedding Date: ${new Date(booking.weddingDate).toLocaleDateString()}`);
  doc.text(`Guest Count: ${booking.guestCount} Guests`);
  doc.text(`Total Amount: Rs. ${booking.totalAmount}`);
  doc.moveDown();

  doc.end();
};

export default generateBookingPDF;