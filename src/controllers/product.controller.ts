import { Request, Response } from 'express';
import Product from '../models/Product.model';
import { CarbonFootprintService } from '../services/carbon-calculation.service';
import { RecommendationService } from '../services/recommendation.service';


export const calculateAndUpdateCarbonFootprint = async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;
      const updatedProduct = await CarbonFootprintService.updateProductCarbonFootprint(productId);
      res.json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: 'Carbon footprint calculation failed' });
    }
  };
  
  export const getEcoFriendlyAlternatives = async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;
      const alternatives = await RecommendationService.getEcoFriendlyAlternatives(productId);
      res.json(alternatives);
    } catch (error) {
      res.status(404).json({ message: 'Unable to find alternatives' });
    }
  };
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Product creation failed' });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, minSustainability } = req.query;
    const filter: any = {};

    if (category) filter.category = category;
    if (minSustainability) {
      filter.sustainabilityScore = { $gte: Number(minSustainability) };
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Product update failed' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};