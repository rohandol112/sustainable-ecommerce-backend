export const environment = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/sustainable-ecommerce',
  jwtSecret: process.env.JWT_SECRET || 'your-default-secret',
  geminiApiKey: process.env.GEMINI_API_KEY,
  carbonApiBaseUrl: process.env.CARBON_API_BASE_URL
};
