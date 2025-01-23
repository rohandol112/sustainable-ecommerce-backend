import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/sustainability-overview', authMiddleware, DashboardController.getSustainabilityOverview);
router.post('/compare-products', authMiddleware, DashboardController.getProductComparison);
router.get('/carbon-metrics', authMiddleware, DashboardController.getCarbonMetricsReport);

export default router; 