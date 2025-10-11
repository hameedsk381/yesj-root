import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin', 'moderator'],
      message: 'Role must be one of: user, admin, moderator'
    },
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  profileImage: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: props => `${props.value} is not a valid image URL!`
    }
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  }
}, { 
  timestamps: true
});

// Add virtual fields for relationships
userSchema.virtual('createdEvents', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'createdBy'
});

userSchema.virtual('createdCourses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'createdBy'
});

userSchema.virtual('createdAnnouncements', {
  ref: 'Announcement',
  localField: '_id',
  foreignField: 'createdBy'
});

userSchema.virtual('createdCarouselSlides', {
  ref: 'Carousel',
  localField: '_id',
  foreignField: 'createdBy'
});

userSchema.virtual('enrolledCourses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'enrolledStudents'
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', {
  virtuals: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Add indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ name: 'text', email: 'text' });

// Sanitize data before saving
userSchema.pre('save', function(next) {
  // Sanitize strings to prevent XSS
  if (this.name) {
    this.name = this.name.replace(/<[^>]*>?/gm, '');
  }
  if (this.bio) {
    this.bio = this.bio.replace(/<[^>]*>?/gm, '');
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;