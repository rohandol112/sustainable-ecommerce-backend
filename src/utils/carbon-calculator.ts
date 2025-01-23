import { AppError } from '../middleware/error.middleware';

interface CarbonFootprintData {
  manufacturing: number;
  transportation: number;
  usage: number;
  disposal: number;
}

export const calculateCarbonFootprint = async (product: { carbonFootprint: CarbonFootprintData }) => {
  try {
    const manufacturingImpact = product.carbonFootprint.manufacturing * 0.4;
    const transportationImpact = product.carbonFootprint.transportation * 0.2;
    const usageImpact = product.carbonFootprint.usage * 0.2;
    const disposalImpact = product.carbonFootprint.disposal * 0.2;

    const totalImpact = manufacturingImpact + transportationImpact + usageImpact + disposalImpact;
    
    // Convert to a 0-100 scale
    const sustainabilityScore = Math.max(0, Math.min(100, 100 - (totalImpact * 10)));
    
    return sustainabilityScore;
  } catch (error) {
    throw new AppError('Error calculating carbon footprint', 500);
  }
};
