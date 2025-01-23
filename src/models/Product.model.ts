import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  category: 'electronics' | 'clothing' | 'food' | 'default';
  carbonFootprint: number;
  sustainabilityScore: number;
  manufacturer?: string;
  weight?: number;
  recyclability: 'Low' | 'Medium' | 'High';
  imageUrl?: string;
}

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  carbonFootprint: { 
    type: Number, 
    default: 0,
    min: 0 
  },
  category: { 
    type: String, 
    enum: ['electronics', 'clothing', 'food', 'default'],
    required: true 
  },
  manufacturer: { type: String },
  weight: { type: Number },
  sustainabilityScore: { 
    type: Number, 
    min: 0, 
    max: 100, 
    default: 50 
  },
  recyclability: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    default: 'Medium' 
  },
  imageUrl: { type: String }
}, { timestamps: true });

export default mongoose.model<IProduct>('Product', ProductSchema);