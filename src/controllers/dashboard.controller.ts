import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service';

export class DashboardController {
  static async getSustainabilityOverview(req: Request, res: Response) {
    try {
      const overview = await DashboardService.getSustainabilityOverview();
      res.json(overview);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching sustainability overview' });
    }
  }

  static async getProductComparison(req: Request, res: Response) {
    try {
      const { productIds } = req.body;
      const products = await DashboardService.compareProducts(productIds);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error comparing products' });
    }
  }

  static async getCarbonMetricsReport(req: Request, res: Response) {
    try {
      const report = await DashboardService.getCarbonMetricsReport();
      res.json(report);
    } catch (error) {
      res.status(500).json({ message: 'Error generating carbon metrics report' });
    }
  }
} 