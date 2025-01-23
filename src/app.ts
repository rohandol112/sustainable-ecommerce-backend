import express from 'express';
import connectDB from './config/database';
import userRoutes from './routes/user.routes';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes';
import { requestLogger } from './middleware/logger.middleware';
import { performanceTracker } from './middleware/performance.middleware';
import healthRoutes from './routes/health.routes';
import { errorHandler } from './middleware/error.middleware';
import dashboardRoutes from './routes/dashboard.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(performanceTracker);

// Database Connection
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/health', healthRoutes);

// Error handling middleware should be last
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});