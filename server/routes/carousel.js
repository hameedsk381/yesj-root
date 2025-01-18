import express from 'express';
import mongoose from 'mongoose';
import Carousel from '../models/carousel.js';

const router = express.Router();

// Create a new carousel item
router.post('/', async (req, res) => {
  const { title, description, imageUrl, link, active, order } = req.body;

  try {
    const newCarousel = await Carousel.create({
      title,
      description,
      imageUrl,
      link,
      active,
      order,
    });

    res.status(201).json(newCarousel);
  } catch (error) {
    console.error('Error creating carousel:', error);
    res.status(500).json({ error: 'Failed to create carousel' });
  }
});

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
