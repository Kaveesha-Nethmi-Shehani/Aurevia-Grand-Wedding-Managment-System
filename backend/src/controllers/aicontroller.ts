import { Request, Response } from 'express';

export const getAIWeddingAdvice = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Please provide a question' });
    }

    const lower = prompt.toLowerCase();

    
    if (lower.includes('guest') || lower.includes('people') || lower.includes('budget') || lower.includes('cost') || lower.includes('price')) {
      const numbers = prompt.match(/\d+/g)?.map(Number) || [];
      const guests = numbers.find((n: number) => n >= 50 && n <= 600) || 0;

      if (guests > 350) {
        return res.status(200).json({
          success: true,
          answer: `For a grand gathering of ${guests} guests, our flagship "The Grand Bliss Ballroom" (Capacity: up to 450 guests, Price: Rs. 350,000) is the ultimate choice! We suggest combining it with our Premium Package (Rs. 250,000) for crystal stage decor and DJ entertainment. Total: Rs. 600,000.`,
        });
      } else if (guests > 250 && guests <= 350) {
        return res.status(200).json({
          success: true,
          answer: `For ${guests} guests, we highly recommend our "Bliss Garden Pavilion" (Outdoor lakefront lawn, capacity up to 350 guests, Rs. 280,000) or "The Grand Bliss Ballroom" (Rs. 350,000). Both provide spacious dance floors and banquet dining!`,
        });
      } else if (guests >= 50 && guests <= 250) {
        return res.status(200).json({
          success: true,
          answer: `For an intimate wedding of ${guests} guests, "The Royal Crystal Hall" (Capacity: up to 250 guests, Price: Rs. 220,000) is your perfect match! Combined with our Silver Package (Rs. 150,000), your total reserved cost would be Rs. 370,000.`,
        });
      } else {
        return res.status(200).json({
          success: true,
          answer: `At Aurevia Grand, hall reservations start from: 
• The Royal Crystal Hall (up to 250 guests): Rs. 220,000
• Bliss Garden Pavilion (Outdoor lawn, up to 350 guests): Rs. 280,000
• The Grand Bliss Ballroom (up to 450 guests): Rs. 350,000

We also offer Silver (+150k), Premium (+250k), and Royal Luxury (+400k) packages. Tell me your guest count, and I will recommend the best fit!`,
        });
      }
    }

    
    if (lower.includes('outdoor') || lower.includes('garden') || lower.includes('lawn')) {
      return res.status(200).json({
        success: true,
        answer: `Yes! Our "Bliss Garden Pavilion" is an enchanting outdoor venue situated on a lakefront lawn accommodating up to 350 guests for Rs. 280,000. It features covered marquees and romantic garden lighting.`,
      });
    }

    
    if (lower.includes('package') || lower.includes('silver') || lower.includes('premium') || lower.includes('luxury')) {
      return res.status(200).json({
        success: true,
        answer: `Aurevia Grand offers three curated packages:
1. Silver Package (Rs. 150,000): Tables, banquet chairs, entrance arch.
2. Premium Package (Rs. 250,000): Floral stage decor, DJ sound console, wash lighting.
3. Royal Luxury Package (Rs. 400,000): Gourmet catering setup, red carpet, photo stage, and bridal suite.`,
      });
    }

    
    return res.status(200).json({
      success: true,
      answer: `Welcome to Aurevia Grand Hotel & Banquets! We offer 3 luxury venues: The Grand Bliss Ballroom (450 guests), The Royal Crystal Hall (250 guests), and Bliss Garden Pavilion (350 guests). How many guests are you expecting?`,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error processing AI response', error });
  }
};