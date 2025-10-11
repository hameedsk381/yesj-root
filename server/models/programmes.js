import mongoose from 'mongoose';

const programmeSchema = new mongoose.Schema({
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
  category: {
    type: String,
    trim: true,
    maxlength: [50, 'Category cannot exceed 50 characters']
  },
  year: {
    type: String,
    trim: true,
    maxlength: [20, 'Year cannot exceed 20 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Reference to User model for programme creator
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { 
  timestamps: true // This will automatically add createdAt and updatedAt
});

// Add indexes for frequently queried fields
programmeSchema.index({ category: 1 });
programmeSchema.index({ isActive: 1 });
programmeSchema.index({ createdBy: 1 });
programmeSchema.index({ title: 'text', description: 'text' });
programmeSchema.index({ createdAt: -1 });

// Sanitize data before saving
programmeSchema.pre('save', function(next) {
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

const Programme = mongoose.model('Programme', programmeSchema);

export default Programme;