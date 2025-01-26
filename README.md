# Sustainable E-commerce Backend

## Project Overview
A backend solution for an e-commerce platform focused on sustainability, built using modern web technologies to promote environmentally conscious online shopping.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Stripe for payment processing

## Frontend Integration

### Repository Setup
1. Create a separate frontend repository (recommended React/Next.js)
2. Install axios for API communication:
```bash
npm install axios
```

### API Connection Configuration
Create an `.env` file in frontend project:
```
REACT_APP_BACKEND_URL=http://localhost:5000/api
```

### Frontend-Backend Connection Steps
1. Configure CORS in backend (`app.js`):
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true
}));
```

2. Create API service in frontend:
```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true
});

export const productService = {
  getAllProducts: () => API.get('/products'),
  // Add more API methods
};
```

## Prerequisites
- Node.js (v16+)
- MongoDB
- Stripe account

## Full Project Setup

### Backend Setup
1. Clone backend repository
```bash
git clone https://github.com/rohandol112/sustainable-ecommerce-backend.git
cd sustainable-ecommerce-backend
npm install
```

2. Create `.env` file
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=5000
```

3. Start backend server
```bash
npm start
```

### Frontend Setup
1. Create frontend project (e.g., React)
```bash
npx create-react-app sustainable-ecommerce-frontend
cd sustainable-ecommerce-frontend
npm install axios react-router-dom
```

2. Configure environment and start frontend
```bash
npm start
```

## Running Full Application
1. Start MongoDB
2. Launch backend (port 5000)
3. Launch frontend (port 3000)

## Deployment Considerations
- Use environment-specific configurations
- Implement proper error handling
- Secure API endpoints
- Configure HTTPS
- Use environment variables for sensitive data

## Troubleshooting
- Ensure CORS is correctly configured
- Check network connectivity
- Verify environment variables
- Validate API endpoint URLs

## Contributing
1. Fork repositories
2. Create feature branches
3. Commit changes
4. Open Pull Requests

## Contact
Rohan Dol - rohan45321dol@gmail.com

Project Links:
- Backend: [https://github.com/rohandol112/sustainable-ecommerce-backend](https://github.com/rohandol112/sustainable-ecommerce-backend)
