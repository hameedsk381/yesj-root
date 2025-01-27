import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import announcementRoutes from './routes/announcements.js';
import courseRoutes from './routes/courses.js';
import eventRoutes from './routes/events.js';
import carouselRoutes from './routes/carousel.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*'
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Simple API route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});
// Routes
app.use('/announcements', announcementRoutes);
app.use('/courses', courseRoutes);
app.use('/events', eventRoutes);
app.use('/slides', carouselRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
