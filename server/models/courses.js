import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pageLink: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  badges: [
    {
      emoji: String,
      label: String,
    },
  ],
  duration: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;
