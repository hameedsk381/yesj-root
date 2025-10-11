import mongoose from 'mongoose';

const carouselSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    validate: {
      validator: function(v) {
        // Allow both external URLs and local paths
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v) || 
               /^\/website\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: props => `${props.value} is not a valid image URL or local path!`
    }
  },
  link: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.*/.test(v) || /^\/.*/.test(v);
      },
      message: props => `${props.value} is not a valid URL! It should be a full URL or start with '/'.`
    }
  },
  active: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0,
    min: [0, 'Order must be a positive number']
  },
  // Reference to User model for carousel slide creator
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { 
  timestamps: true // This will automatically add createdAt and updatedAt
});

// Add indexes for frequently queried fields
carouselSchema.index({ active: 1 });
carouselSchema.index({ order: 1 });
carouselSchema.index({ createdBy: 1 });
carouselSchema.index({ createdAt: -1 });

// Sanitize data before saving
carouselSchema.pre('save', function(next) {
  // Sanitize strings to prevent XSS
  if (this.title) {
    this.title = this.title.replace(/<[^>]*>?/gm, '');
  }
  if (this.description) {
    this.description = this.description.replace(/<[^>]*>?/gm, '');
  }
  next();
});

const Carousel = mongoose.model('Carousel', carouselSchema);

export default Carousel;