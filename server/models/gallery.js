import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
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
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  category: {
    type: String,
    trim: true,
    maxlength: [50, 'Category cannot exceed 50 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Reference to User model for gallery image creator
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { 
  timestamps: true // This will automatically add createdAt and updatedAt
});

// Add indexes for frequently queried fields
gallerySchema.index({ category: 1 });
gallerySchema.index({ tags: 1 });
gallerySchema.index({ isActive: 1 });
gallerySchema.index({ createdBy: 1 });
gallerySchema.index({ title: 'text', description: 'text' });
gallerySchema.index({ createdAt: -1 });

// Sanitize data before saving
gallerySchema.pre('save', function(next) {
  // Sanitize strings to prevent XSS
  if (this.title) {
    this.title = this.title.replace(/<[^>]*>?/gm, '');
  }
  if (this.description) {
    this.description = this.description.replace(/<[^>]*>?/gm, '');
  }
  if (this.category) {
    this.category = this.category.replace(/<[^>]*>?/gm, '');
  }
  next();
});

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;