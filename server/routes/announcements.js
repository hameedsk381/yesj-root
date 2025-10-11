import express from 'express';
import Announcement from '../models/announcements.js';

const router = express.Router();

// Middleware for error handling
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Get all announcements
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  })
);

// Get an announcement by ID
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const announcement = await Announcement.findById(id);

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    res.status(200).json(announcement);
  })
);

// Create a new announcement
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const announcement = new Announcement(req.body);
    const savedAnnouncement = await announcement.save();
    res.status(201).json(savedAnnouncement);
  })
);

// Update an announcement by ID
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedAnnouncement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    res.status(200).json(updatedAnnouncement);
  })
);

// Delete an announcement by ID
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    res.status(200).json({ message: 'Announcement deleted successfully' });
  })
);

// Global error handler
router.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default router;