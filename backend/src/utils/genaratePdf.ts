import PDFDocument from 'pdfkit';
import { Response } from 'express';

export const generateBookingPDF = (booking: any, res: Response) => {
  const doc = new PDFDocument({ margin: 50, size: 'A4' });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=AureviaGrand_Booking_${booking._id}.pdf`);

  doc.pipe(res);

  // Header 
  doc.fontSize(22).font('Helvetica-Bold').text('AUREVIA GRAND HOTEL & BANQUETS', { align: 'center' });
  doc.fontSize(12).font('Helvetica').text('Official Wedding Venue Reservation Slip', { align: 'center' });
  doc.moveDown();

  
  doc.strokeColor('#d97706').lineWidth(2).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(1.5);

  // Booking
  doc.fontSize(11).font('Helvetica-Bold').text(`Booking Reference ID: `, { continued: true }).font('Helvetica').text(`${booking._id}`);
  doc.fontSize(11).font('Helvetica-Bold').text(`Reservation Status: `, { continued: true }).font('Helvetica').text(`${booking.bookingStatus.toUpperCase()}`);
  doc.fontSize(11).font('Helvetica-Bold').text(`Issued Date: `, { continued: true }).font('Helvetica').text(`${new Date().toLocaleDateString()}`);
  doc.moveDown(1.5);

  // Event Details
  doc.fontSize(14).font('Helvetica-Bold').text('Event & Venue Information');
  doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.8);

  doc.fontSize(11).font('Helvetica-Bold').text(`Reserved Wedding Date: `, { continued: true })
    .font('Helvetica').text(`${new Date(booking.weddingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`);

  doc.fontSize(11).font('Helvetica-Bold').text(`Selected Venue: `, { continued: true })
    .font('Helvetica').text(`${booking.venueId?.name || 'The Grand Bliss Ballroom'}`);

  doc.fontSize(11).font('Helvetica-Bold').text(`Expected Guests: `, { continued: true })
    .font('Helvetica').text(`${booking.guestCount} Guests`);

  doc.fontSize(11).font('Helvetica-Bold').text(`Package Selected: `, { continued: true })
    .font('Helvetica').text(`${booking.packageId?.name || 'Custom Wedding Package'}`);
  doc.moveDown(1.5);

  //  Financial
  doc.fontSize(14).font('Helvetica-Bold').text('Payment & Billing Details');
  doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.8);

  doc.fontSize(13).font('Helvetica-Bold').text(`Total Amount: `, { continued: true })
  .fillColor('#d97706').text(`Rs. ${Number(booking.totalAmount).toLocaleString()}`);
  doc.fillColor('#000000'); // Reset color
  doc.moveDown(2);

  //  Footer & Instructions
  doc.strokeColor('#d97706').lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(1);
  doc.fontSize(10).font('Helvetica-Oblique').text('Please present this official slip to the Aurevia Grand Events Desk upon arrival.', { align: 'center' });
  doc.fontSize(9).font('Helvetica').text('No 100, Palace Boulevard, Colombo | Contact: events@aureviagrand.com', { align: 'center' });

  doc.end();
};

export default generateBookingPDF;