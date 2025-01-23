import mongoose from 'mongoose';

export interface ICarbonFootprint extends mongoose.Document {
  productId: mongoose.Types.ObjectId;
  manufacturing: number;
  transportation: number;
  usage: number;
  disposal: number;
  totalFootprint: number;
  calculatedAt: Date;
}

const CarbonFootprintSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product',
    required: true 
  },
  manufacturing: { type: Number, required: true },
  transportation: { type: Number, required: true },
  usage: { type: Number, required: true },
  disposal: { type: Number, required: true },
  totalFootprint: { type: Number, required: true },
  calculatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<ICarbonFootprint>('CarbonFootprint', CarbonFootprintSchema);
