import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../config/environment';

const genAI = new GoogleGenerativeAI(environment.geminiApiKey || 'default_api_key');

export const generateSustainabilityInsights = async (req: Request, res: Response) => {
  try {
    const { productDescription } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Analyze the following product description and provide sustainability insights: ${productDescription}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.json({ insights: response.text() });
  } catch (error) {
    res.status(500).json({ message: 'Error generating sustainability insights' });
  }
};
