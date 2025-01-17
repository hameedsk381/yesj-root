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
 // Start of Selection
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

// Endpoint to list images from the MinIO bucket
app.get('/images', (req, res) => {
  const bucketName = 'yesj-website'; // Replace with your bucket name
  const prefix = ''; // If you have a specific folder, replace with its name

  let images = [];

  // List objects in the specified bucket
  minioClient.listObjects(bucketName, prefix, true, (err, dataStream) => {
    if (err) {
      return res.status(500).send('Failed to fetch images from MinIO');
    }

    dataStream.on('data', (obj) => {
      // Add image URLs to the images array
      images.push(`https://minio.yesj.in/${bucketName}/${obj.name}`);
    });

    dataStream.on('end', () => {
      res.json(images);
    });

    dataStream.on('error', (err) => {
      console.error(err);
      res.status(500).send('Error fetching images');
    });
  });
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
