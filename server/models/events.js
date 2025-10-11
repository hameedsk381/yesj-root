import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  organizer: {
    type: String,
    trim: true,
    maxlength: [100, 'Organizer name cannot exceed 100 characters']
  },
  // Reference to User model for event creator
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attendees: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    registrationDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['registered', 'attended', 'cancelled'],
      default: 'registered'
    }
  }],
  category: {
    type: String,
    enum: {
      values: ['conference', 'meetup', 'workshop', 'social', 'other'],
      message: 'Category must be one of: conference, meetup, workshop, social, other'
    }
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  maxAttendees: {
    type: Number,
    min: [1, 'Maximum attendees must be at least 1']
  },
  registrationLink: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.*/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true // This will automatically add createdAt and updatedAt
});

// Add indexes for frequently queried fields
eventSchema.index({ date: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ isPublic: 1 });
eventSchema.index({ isActive: 1 });
eventSchema.index({ createdBy: 1 });
eventSchema.index({ title: 'text', description: 'text' });
eventSchema.index({ createdAt: -1 });

// Sanitize data before saving
eventSchema.pre('save', function(next) {
  // Sanitize strings to prevent XSS
  if (this.title) {
    this.title = this.title.replace(/<[^>]*>?/gm, '');
  }
  if (this.description) {
    this.description = this.description.replace(/<[^>]*>?/gm, '');
  }
  if (this.location) {
    this.location = this.location.replace(/<[^>]*>?/gm, '');
  }
  if (this.organizer) {
    this.organizer = this.organizer.replace(/<[^>]*>?/gm, '');
  }
  next();
});

const Events = mongoose.model('Event', eventSchema);

export default Events;