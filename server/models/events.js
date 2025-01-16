import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  organizer: {
    type: String
  },
  attendees: [
    {
      type: String
    },
  ],
  category: {
    type: String,
    enum: ['conference', 'meetup', 'workshop', 'social', 'other'],
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Events = mongoose.model('Event', eventSchema);

export default Events;
