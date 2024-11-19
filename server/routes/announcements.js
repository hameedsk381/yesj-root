import express from 'express';
import Announcement from '../models/announcements.js';

const router = express.Router();

// Create a new announcement
router.post('/', async (req, res) => {
  try {
    const newAnnouncement = new Announcement({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      links: req.body.links,
      poster: req.body.poster, // Added poster field
    });
    const savedAnnouncement = await newAnnouncement.save();
    res.status(201).json(savedAnnouncement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single announcement by ID
router.get('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an announcement by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        links: req.body.links,
        poster: req.body.poster, // Added poster field
      },
      { new: true }
    );
    if (!updatedAnnouncement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    res.json(updatedAnnouncement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an announcement by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);
    if (!deletedAnnouncement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    res.json({ message: 'Announcement deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
