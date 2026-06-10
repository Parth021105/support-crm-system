import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './db/database.js';
import ticketsRouter from './routes/tickets.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
const corsOptions = {
  credentials: true,
  // If CLIENT_URL is not set (or when deploying before frontend), allow all origins
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser requests
    if (!process.env.CLIENT_URL) return callback(null, true);
    callback(null, true);
  }
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize database
await initializeDatabase();

// Routes
app.use('/api/tickets', ticketsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Support CRM System API', 
    version: '1.0.0',
    endpoints: {
      tickets: '/api/tickets',
      health: '/api/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Client URL: ${CLIENT_URL}`);
});
