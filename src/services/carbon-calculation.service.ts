import Product, { IProduct } from '../models/Product.model';
import CarbonFootprint from '../models/CarbonFootprint.model';
import logger from '../middleware/logger.middleware';

const categoryFactors = {
  'electronics': 1.5,
  'clothing': 1.2,
  'food': 1.0,
  'default': 1.0
} as const;

interface DetailedCarbonMetrics {
  manufacturingEmissions: number;
  transportationEmissions: number;
  usageEmissions: number;
  disposalEmissions: number;
  totalEmissions: number;
}

export class CarbonFootprintService {
  static async calculateDetailedCarbonMetrics(product: IProduct): Promise<DetailedCarbonMetrics> {
    const baseFactor = this.calculateProductCarbonFootprint(product);
    
    return {
      manufacturingEmissions: baseFactor * 0.4,
      transportationEmissions: baseFactor * 0.3,
      usageEmissions: baseFactor * 0.2,
      disposalEmissions: baseFactor * 0.1,
      totalEmissions: baseFactor
    };
  }

  static calculateProductCarbonFootprint(product: IProduct): number {
    const baseCarbonFactor = 10;
    const categoryFactor = categoryFactors[product.category] || categoryFactors['default'];
    
    return Math.round(
      baseCarbonFactor * 
      categoryFactor * 
      (product.price / 100) * 
      (product.weight || 1)
    );
  }

  static async updateProductCarbonFootprint(productId: string) {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    const detailedMetrics = await this.calculateDetailedCarbonMetrics(product);
    
    // Save detailed metrics
    await CarbonFootprint.create({
      productId: product._id,
      manufacturing: detailedMetrics.manufacturingEmissions,
      transportation: detailedMetrics.transportationEmissions,
      usage: detailedMetrics.usageEmissions,
      disposal: detailedMetrics.disposalEmissions,
      totalFootprint: detailedMetrics.totalEmissions
    });

    product.carbonFootprint = detailedMetrics.totalEmissions;
    product.sustainabilityScore = this.calculateSustainabilityScore(detailedMetrics.totalEmissions);
    
    await product.save();
    logger.info(`Updated carbon footprint for product ${productId}`);
    return product;
  }

  static calculateSustainabilityScore(carbonFootprint: number): number {
    const maxScore = 100;
    const baseScore = maxScore - (carbonFootprint / 10);
    return Math.max(0, Math.min(maxScore, baseScore));
  }
}