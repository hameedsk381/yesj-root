import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  links: {
    type: Array,
  },
  poster: {
    type: String,
    required: false, // Not mandatory
  },
}, { timestamps: true });

const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;
