import { Request, Response } from 'express';

export const getAIWeddingAdvice = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Please provide a question' });
    }

    const text = prompt.toLowerCase();

  
    const numbers = prompt.match(/\d+/g)?.map(Number) || [];
    const guests = numbers.find((n: number) => n >= 30 && n <= 600) || 0;

    
    if (guests > 0) {
      if (guests > 350) {
        return res.status(200).json({
          success: true,
          answer: `For your gathering of ${guests} guests, our premier ballroom "The Grand Bliss Ballroom" (Capacity: up to 450 guests, Hall Rental: Rs. 350,000) is the only suitable luxury venue. Combined with our Premium Package (Rs. 250,000) for crystal stage decor and DJ entertainment, your total estimate will be Rs. 600,000.`,
        });
      } else if (guests > 250) {
        return res.status(200).json({
          success: true,
          answer: `For ${guests} guests, you have two great options: 1) "Bliss Garden Pavilion" (Outdoor lakefront lawn, capacity up to 350 guests, Rs. 280,000), or 2) "The Grand Bliss Ballroom" (Indoor ballroom, Rs. 350,000). Both include dedicated banquet dining setups.`,
        });
      } else {
        return res.status(200).json({
          success: true,
          answer: `For ${guests} guests, "The Royal Crystal Hall" (Capacity: up to 250 guests, Hall Rental: Rs. 220,000) is the perfect fit! Paired with our Silver Package (Rs. 150,000), your total reservation comes to Rs. 370,000.`,
        });
      }
    }

    
    if (text.includes('budget') || text.includes('price') || text.includes('cost') || text.includes('gana') || text.includes('kiyada') || text.includes('mila')) {
      return res.status(200).json({
        success: true,
        answer: `At Aurevia Grand, our venue hall pricing is as follows:
• The Royal Crystal Hall (up to 250 guests): Rs. 220,000
• Bliss Garden Pavilion (Outdoor lawn, up to 350 guests): Rs. 280,000
• The Grand Bliss Ballroom (up to 450 guests): Rs. 350,000

Our packages: Silver (Rs. 150,000), Premium (Rs. 250,000), and Luxury (Rs. 400,000). Tell me your guest count, and I will calculate the exact total for you!`,
      });
    }

    
    if (text.includes('outdoor') || text.includes('garden') || text.includes('lawn') || text.includes('elimahan')) {
      return res.status(200).json({
        success: true,
        answer: `Yes! We feature the "Bliss Garden Pavilion", an enchanting open-air venue on an outdoor lakefront lawn. It accommodates up to 350 guests for Rs. 280,000, complete with covered marquees, romantic lighting, and scenic photo backdrops.`,
      });
    }

    
    if (text.includes('package') || text.includes('silver') || text.includes('premium') || text.includes('luxury') || text.includes('service') || text.includes('deco') || text.includes('food')) {
      return res.status(200).json({
        success: true,
        answer: `We offer 3 curated wedding packages:
1. Silver Package (Rs. 150,000): Standard table styling, banquet chairs, entrance arch.
2. Premium Package (Rs. 250,000): Floral stage decor, DJ sound console, wash lighting.
3. Royal Luxury Package (Rs. 400,000): Gourmet catering setup, red carpet, photo stage, and complimentary bridal suite.`,
      });
    }

  
    if (text.includes('date') || text.includes('available') || text.includes('book') || text.includes('dawasa')) {
      return res.status(200).json({
        success: true,
        answer: `You can check live date availability directly from our website! Simply go to "Wedding Venues", select your desired hall, pick your wedding date, and click "Check Availability" to see instant confirmation.`,
      });
    }

 
    return res.status(200).json({
      success: true,
      answer: `Hello! Welcome to Aurevia Grand Hotel & Banquets. I can assist you with venue recommendations, wedding packages, and pricing estimates. How many guests are you planning to invite?`,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error processing AI response', error });
  }
};