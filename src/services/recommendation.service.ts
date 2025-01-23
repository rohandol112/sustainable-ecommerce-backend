import Product from '../models/Product.model';

export class RecommendationService {
  static async getEcoFriendlyAlternatives(productId: string) {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    const alternatives = await Product.find({
      category: product.category,
      sustainabilityScore: { $gt: product.sustainabilityScore },
      price: { 
        $gte: product.price * 0.8, 
        $lte: product.price * 1.2 
      }
    }).limit(5);

    return alternatives;
  }

  static async getTopSustainableProducts(limit: number = 10) {
    return await Product.find()
      .sort({ sustainabilityScore: -1 })
      .limit(limit);
  }
}