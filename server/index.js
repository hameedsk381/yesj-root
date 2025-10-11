import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import announcementRoutes from './routes/announcements.js';
import courseRoutes from './routes/courses.js';
import eventRoutes from './routes/events.js';
import carouselRoutes from './routes/carousel.js';
import programmeRoutes from './routes/programmes.js';
import galleryRoutes from './routes/gallery.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*'
}));
app.use(express.json());

// MongoDB connection with better error handling
const connectDB = async () => {
  try {
    // Use local MongoDB for development
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/yesj';
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Continuing without database connection...');
    // Continue running the server even without database connection
  }
};

// Connect to MongoDB
connectDB();

// Simple API route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express!', timestamp: new Date().toISOString() });
});

// API Routes with /api prefix
app.use('/api/announcements', announcementRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/slides', carouselRoutes);
app.use('/api/programmes', programmeRoutes);
app.use('/api/gallery', galleryRoutes);

// Health check route
app.get('/health', (req, res) => {
  const healthStatus = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  };
  res.json(healthStatus);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});