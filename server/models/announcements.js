import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  date: {
    type: Date,
    default: Date.now
  },
  links: [{
    url: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/.*/.test(v);
        },
        message: props => `${props.value} is not a valid URL!`
      }
    },
    text: {
      type: String,
      trim: true
    }
  }],
  poster: {
    type: String,
    trim: true
  },
  // Reference to User model for announcement creator
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  priority: {
    type: Number,
    default: 0,
    min: [0, 'Priority must be a positive number']
  }
}, { 
  timestamps: true // This will automatically add createdAt and updatedAt
});

// Add indexes for frequently queried fields
announcementSchema.index({ date: -1 });
announcementSchema.index({ isActive: 1 });
announcementSchema.index({ priority: -1 });
announcementSchema.index({ createdBy: 1 });
announcementSchema.index({ title: 'text', description: 'text', content: 'text' });

// Sanitize data before saving
announcementSchema.pre('save', function(next) {
  // Sanitize strings to prevent XSS
  if (this.title) {
    this.title = this.title.replace(/<[^>]*>?/gm, '');
  }
  if (this.description) {
    this.description = this.description.replace(/<[^>]*>?/gm, '');
  }
  if (this.content) {
    this.content = this.content.replace(/<[^>]*>?/gm, '');
  }
  next();
});

const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;