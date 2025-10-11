import express from 'express';
import Slide from '../models/carousel.js';

const router = express.Router();

// Middleware for error handling
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Get all slides
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const slides = await Slide.find();
    res.status(200).json(slides);
  })
);

// Get a slide by ID
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const slide = await Slide.findById(id);

    if (!slide) {
      return res.status(404).json({ error: 'Slide not found' });
    }

    res.status(200).json(slide);
  })
);

// Create a new slide
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const slide = new Slide(req.body);
    const savedSlide = await slide.save();
    res.status(201).json(savedSlide);
  })
);

// Update a slide by ID
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedSlide = await Slide.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSlide) {
      return res.status(404).json({ error: 'Slide not found' });
    }

    res.status(200).json(updatedSlide);
  })
);

// Delete a slide by ID
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedSlide = await Slide.findByIdAndDelete(id);

    if (!deletedSlide) {
      return res.status(404).json({ error: 'Slide not found' });
    }

    res.status(200).json({ message: 'Slide deleted successfully' });
  })
);

// Global error handler
router.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default router;