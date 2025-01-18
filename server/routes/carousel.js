import express from 'express';
import Carousel from '../models/carousel.js';
import multer from 'multer';
import path from 'path';
import * as Minio from 'minio'

const router = express.Router();

// MinIO client configuration
const minioClient = new Minio.Client({
  endPoint: 'minio.yesj.in', // e.g., 'localhost'
  port: 9000, // Default MinIO port
  useSSL: false, // Set to true if SSL is enabled
  accessKey: 'yesj',
  secretKey: 'amdgfeb@19',
});

// Bucket name for storing images
const bucketName = 'carousel-images';

// Check if the bucket exists; create it if it doesn't
minioClient.bucketExists(bucketName, (err, exists) => {
  if (err) {
    console.error('Error checking bucket existence:', err);
    return;
  }
  if (!exists) {
    minioClient.makeBucket(bucketName, 'us-east-1', (err) => {
      if (err) {
        console.error('Error creating bucket:', err);
      } else {
        console.log(`Bucket "${bucketName}" created successfully.`);
      }
    });
  }
});

// Multer setup for handling file uploads
const storage = multer.memoryStorage(); // Use memory storage for direct upload to MinIO
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Images only!'));
    }
  },
});

router.post('/', upload.single('image'), async (req, res) => {
  const { title, description, link, active, order } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  try {
    const fileName = `${Date.now()}-${req.file.originalname}`;
    const metaData = {
      'Content-Type': req.file.mimetype,
    };

    // Upload image to MinIO
    minioClient.putObject(bucketName, fileName, req.file.buffer, metaData, (err) => {
      if (err) {
        console.error('Error uploading file to MinIO:', err);
        return res.status(500).json({ error: 'Failed to upload image' });
      }

      const imageUrl = `${minioClient.protocol}//${minioClient.host}:${minioClient.port}/${bucketName}/${fileName}`;

      // Save carousel data to the database
      Carousel.create({
        title,
        description,
        imageUrl,
        link,
        active,
        order,
      })
        .then((newCarousel) => {
          res.status(201).json(newCarousel);
        })
        .catch((error) => {
          console.error('Error saving carousel to database:', error);
          res.status(500).json({ error: 'Failed to create carousel' });
        });
    });
  } catch (error) {
    console.error('Error creating carousel:', error);
    res.status(500).json({ error: 'Failed to create carousel' });
  }
});

// Other routes remain the same as before...
// Get all active carousel items (sorted by order)
router.get('/', async (req, res) => {
  try {
    const carousels = await Carousel.find({ active: true }).sort({ order: 1 });
    res.status(200).json(carousels);
  } catch (error) {
    console.error('Error fetching carousels:', error);
    res.status(500).json({ error: 'Failed to fetch carousels' });
  }
});

// Get a specific carousel item by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const carousel = await Carousel.findById(id);
    if (!carousel) {
      return res.status(404).json({ error: 'Carousel not found' });
    }
    res.status(200).json(carousel);
  } catch (error) {
    console.error('Error fetching carousel by ID:', error);
    res.status(500).json({ error: 'Failed to fetch carousel' });
  }
});

// Update a carousel item by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCarousel = await Carousel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCarousel) {
      return res.status(404).json({ error: 'Carousel not found' });
    }
    res.status(200).json(updatedCarousel);
  } catch (error) {
    console.error('Error updating carousel:', error);
    res.status(500).json({ error: 'Failed to update carousel' });
  }
});

// Delete a carousel item by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCarousel = await Carousel.findByIdAndDelete(id);

    if (!deletedCarousel) {
      return res.status(404).json({ error: 'Carousel not found' });
    }
    res.status(200).json({ message: 'Carousel deleted successfully' });
  } catch (error) {
    console.error('Error deleting carousel:', error);
    res.status(500).json({ error: 'Failed to delete carousel' });
  }
});

export default router;
