import express from 'express';
import Programme from '../models/programmes.js';

const router = express.Router();

// Middleware for error handling
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Get all programmes
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const programmes = await Programme.find();
    res.status(200).json(programmes);
  })
);

// Get a programme by ID
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const programme = await Programme.findById(id);

    if (!programme) {
      return res.status(404).json({ error: 'Programme not found' });
    }

    res.status(200).json(programme);
  })
);

// Create a new programme
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const programme = new Programme(req.body);
    const savedProgramme = await programme.save();
    res.status(201).json(savedProgramme);
  })
);

// Update a programme by ID
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedProgramme = await Programme.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProgramme) {
      return res.status(404).json({ error: 'Programme not found' });
    }

    res.status(200).json(updatedProgramme);
  })
);

// Delete a programme by ID
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedProgramme = await Programme.findByIdAndDelete(id);

    if (!deletedProgramme) {
      return res.status(404).json({ error: 'Programme not found' });
    }

    res.status(200).json({ message: 'Programme deleted successfully' });
  })
);

// Global error handler
router.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default router;