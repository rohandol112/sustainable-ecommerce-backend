import Product, { IProduct } from '../models/Product.model';
import CarbonFootprint, { ICarbonFootprint } from '../models/CarbonFootprint.model';

export class DashboardService {
  static async getSustainabilityOverview() {
    try {
      const totalProducts = await Product.countDocuments();
      const averageSustainabilityScore = await Product.aggregate([
        { $group: { _id: null, avgScore: { $avg: "$sustainabilityScore" } } }
      ]);

      const categoryBreakdown = await Product.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } }
      ]);

      return {
        totalProducts,
        averageSustainabilityScore: averageSustainabilityScore[0]?.avgScore || 0,
        categoryBreakdown
      };
    } catch (error) {
      throw new Error('Error generating sustainability overview');
    }
  }

  static async getProductTrends() {
    // Implementation for product trends analysis
  }

  static async compareProducts(productIds: string[]) {
    try {
      const products: IProduct[] = await Product.find({ _id: { $in: productIds } }).lean();
      const carbonFootprints: ICarbonFootprint[] = await CarbonFootprint.find({ productId: { $in: productIds } }).lean();

      return products.map((product) => {
        const carbonData = carbonFootprints.find(cf => 
          cf.productId.toString() === (product as any)._id.toString()
        );
        
        return {
          product: {
            name: product.name,
            category: product.category,
            sustainabilityScore: product.sustainabilityScore,
            price: product.price
          },
          carbonMetrics: carbonData ? {
            manufacturing: carbonData.manufacturing,
            transportation: carbonData.transportation,
            usage: carbonData.usage,
            disposal: carbonData.disposal,
            total: carbonData.totalFootprint
          } : null
        };
      });
    } catch (error) {
      throw new Error('Error comparing products');
    }
  }

  static async getCarbonMetricsReport() {
    try {
      const carbonData = await CarbonFootprint.aggregate([
        {
          $group: {
            _id: null,
            totalEmissions: { $sum: '$totalFootprint' },
            avgManufacturing: { $avg: '$manufacturing' },
            avgTransportation: { $avg: '$transportation' },
            avgUsage: { $avg: '$usage' },
            avgDisposal: { $avg: '$disposal' }
          }
        }
      ]);

      const categoryEmissions = await Product.aggregate([
        {
          $lookup: {
            from: 'carbonfootprints',
            localField: '_id',
            foreignField: 'productId',
            as: 'carbonData'
          }
        },
        {
          $group: {
            _id: '$category',
            totalEmissions: { $sum: { $first: '$carbonData.totalFootprint' } },
            avgSustainabilityScore: { $avg: '$sustainabilityScore' }
          }
        }
      ]);

      return {
        overallMetrics: carbonData[0],
        categoryBreakdown: categoryEmissions
      };
    } catch (error) {
      throw new Error('Error generating carbon metrics report');
    }
  }
} 