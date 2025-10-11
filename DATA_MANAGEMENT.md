# Data Management Guide

This document explains how data validation, seeding, and reset functionality work in the YESJ application.

## Data Validation

All Mongoose models in the application have comprehensive validation schemas to ensure data integrity:

### Validation Features

1. **Required Fields**: All essential fields are marked as required with custom error messages
2. **Data Type Validation**: Fields are validated for correct data types
3. **String Length Limits**: Maximum length constraints prevent excessively long strings
4. **Enum Validation**: Fields with predefined values are validated against allowed options
5. **URL Validation**: Link fields are validated to ensure they contain valid URLs
6. **Email Validation**: Email fields are validated using regex patterns
7. **Number Range Validation**: Numeric fields have minimum and maximum value constraints

### Example Validation Schema (Course Model)

```javascript
title: {
  type: String,
  required: [true, 'Title is required'],
  trim: true,
  maxlength: [100, 'Title cannot exceed 100 characters']
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
image: {
  type: String,
  required: [true, 'Image is required'],
  validate: {
    validator: function(v) {
      return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
    },
    message: props => `${props.value} is not a valid image URL!`
  }
}
```

## Data Sanitization

To prevent injection attacks, all string fields are sanitized before saving to the database:

```javascript
// Sanitize data before saving
courseSchema.pre('save', function(next) {
  // Sanitize strings to prevent XSS
  if (this.title) {
    this.title = this.title.replace(/<[^>]*>?/gm, '');
  }
  if (this.description) {
    this.description = this.description.replace(/<[^>]*>?/gm, '');
  }
  next();
});
```

## Data Models Enhancement

All models have been enhanced with the following features:

### Timestamps
All models automatically track creation and update times:
```javascript
{ timestamps: true }
```

### Indexing
Frequently queried fields are indexed for better performance:
```javascript
// Add indexes for frequently queried fields
courseSchema.index({ category: 1 });
courseSchema.index({ isActive: 1 });
courseSchema.index({ level: 1 });
courseSchema.index({ title: 'text', description: 'text' });
```

### Relationships
Models are connected through references:
```javascript
// Reference to User model for course creator
createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
```

## Database Seeding

The application includes comprehensive seed data for development and testing.

### Seed Data Files
- `seedData.js`: Contains sample data for all models
- `seed.js`: Script to populate the database with sample data

### Running the Seed Script
```bash
cd server
npm run seed
```

This will:
1. Connect to the database
2. Clear existing data
3. Insert sample users, announcements, courses, events, and carousel slides

### Sample Data Structure
The seed data includes:
- **Users**: Admin, regular user, and moderator accounts
- **Announcements**: Sample announcements with different priorities
- **Courses**: Various courses across different categories
- **Events**: Sample events with different dates and categories
- **Carousel Slides**: Homepage carousel content

## Database Reset

To reset the database to a clean state:

```bash
cd server
npm run reset
```

This will:
1. Connect to the database
2. Remove all data from all collections
3. Leave the database empty and ready for new data

## Model Relationships

The application uses the following model relationships:

### User Model
- Created events (virtual reference to Event model)
- Created courses (virtual reference to Course model)
- Created announcements (virtual reference to Announcement model)
- Created carousel slides (virtual reference to Carousel model)
- Enrolled courses (virtual reference to Course model)

### Event Model
- Created by user (reference to User model)
- Attendees (references to User model)

### Course Model
- Created by user (reference to User model)
- Enrolled students (references to User model)

### Announcement Model
- Created by user (reference to User model)

### Carousel Model
- Created by user (reference to User model)

## Testing Data Validation

To test data validation:

1. Try to create a document with missing required fields
2. Try to create a document with invalid data types
3. Try to create a document with values outside allowed ranges
4. Check that appropriate error messages are returned

Example of expected validation error:
```json
{
  "errors": {
    "title": {
      "message": "Title is required",
      "name": "ValidatorError",
      "kind": "required"
    }
  }
}
```