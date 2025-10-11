import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
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
  pageLink: {
    type: String,
    required: [true, 'Page link is required'],
    validate: {
      validator: function(v) {
        return /^\/.*/.test(v); // Must start with /
      },
      message: props => `${props.value} is not a valid page link! It should start with '/'.`
    }
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
    validate: {
      validator: function(v) {
        // Allow both external URLs and local paths
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v) || 
               /^\/website\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: props => `${props.value} is not a valid image URL or local path!`
    }
  },
  badges: [{
    emoji: {
      type: String,
      trim: true
    },
    label: {
      type: String,
      trim: true,
      maxlength: [50, 'Badge label cannot exceed 50 characters']
    }
  }],
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    enum: {
      values: ['programming', 'design', 'business', 'marketing', 'other'],
      message: 'Category must be one of: programming, design, business, marketing, other'
    }
  },
  instructor: {
    type: String,
    trim: true,
    maxlength: [100, 'Instructor name cannot exceed 100 characters']
  },
  // Reference to User model for course creator
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  level: {
    type: String,
    trim: true,
    enum: {
      values: ['beginner', 'intermediate', 'advanced'],
      message: 'Level must be one of: beginner, intermediate, advanced'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Students enrolled in the course
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { 
  timestamps: true // This will automatically add createdAt and updatedAt
});

// Add indexes for frequently queried fields
courseSchema.index({ category: 1 });
courseSchema.index({ isActive: 1 });
courseSchema.index({ level: 1 });
courseSchema.index({ createdBy: 1 });
courseSchema.index({ title: 'text', description: 'text' });
courseSchema.index({ createdAt: -1 });

// Sanitize data before saving
courseSchema.pre('save', function(next) {
  // Sanitize strings to prevent XSS
  if (this.title) {
    this.title = this.title.replace(/<[^>]*>?/gm, '');
  }
  if (this.description) {
    this.description = this.description.replace(/<[^>]*>?/gm, '');
  }
  if (this.instructor) {
    this.instructor = this.instructor.replace(/<[^>]*>?/gm, '');
  }
  next();
});

const Course = mongoose.model('Course', courseSchema);
export default Course;