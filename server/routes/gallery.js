import express from 'express';
import Gallery from '../models/gallery.js';

const router = express.Router();

// Middleware for error handling
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Get all gallery images
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const galleryImages = await Gallery.find();
    res.status(200).json(galleryImages);
  })
);

// Get a gallery image by ID
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const galleryImage = await Gallery.findById(id);

    if (!galleryImage) {
      return res.status(404).json({ error: 'Gallery image not found' });
    }

    res.status(200).json(galleryImage);
  })
);

// Create a new gallery image
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const galleryImage = new Gallery(req.body);
    const savedGalleryImage = await galleryImage.save();
    res.status(201).json(savedGalleryImage);
  })
);

// Update a gallery image by ID
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedGalleryImage = await Gallery.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedGalleryImage) {
      return res.status(404).json({ error: 'Gallery image not found' });
    }

    res.status(200).json(updatedGalleryImage);
  })
);

// Delete a gallery image by ID
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedGalleryImage = await Gallery.findByIdAndDelete(id);

    if (!deletedGalleryImage) {
      return res.status(404).json({ error: 'Gallery image not found' });
    }

    res.status(200).json({ message: 'Gallery image deleted successfully' });
  })
);

// Global error handler
router.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default router;