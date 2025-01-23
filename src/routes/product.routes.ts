import { Router } from 'express';
import * as productController from '../controllers/product.controller';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', [authMiddleware, adminMiddleware], productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', [authMiddleware, adminMiddleware], productController.updateProduct);
router.delete('/:id', [authMiddleware, adminMiddleware], productController.deleteProduct);
router.post('/:id/carbon-footprint', [authMiddleware, adminMiddleware], productController.calculateAndUpdateCarbonFootprint);
router.get('/:id/alternatives', productController.getEcoFriendlyAlternatives);
export default router;