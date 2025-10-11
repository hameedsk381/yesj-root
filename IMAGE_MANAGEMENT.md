# Image Management Guide

This document explains how to use images from the website folder in the YESJ application.

## Image Storage Structure

All images are stored in the `client/public/website/` directory. This allows them to be served statically by the frontend application.

```
client/
  public/
    website/
      ├── image1.jpg
      ├── image2.png
      └── ...
```

## Using Local Images

### In Seed Data

When adding images to seed data, use relative paths from the public directory:

```javascript
// Correct way to reference local images
const carouselSlides = [
  {
    title: "Welcome to YESJ",
    imageUrl: "/website/IMG_5986.JPG",  // Note the leading slash
    link: "/about"
  }
];

const courses = [
  {
    title: "Introduction to JavaScript",
    image: "/website/20241114_153846.jpg",  // Note the leading slash
    pageLink: "/courses/javascript"
  }
];
```

### In Models

The Mongoose models have been updated to accept both external URLs and local paths:

```javascript
// Carousel model validation
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
}

// Course model validation
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
}
```

### In Components

Components automatically handle both external and local images:

```javascript
// Function to determine the correct image source
const getImageSource = (imagePath) => {
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  // If it's a local path, return as is (Vite handles static assets)
  return imagePath;
};

// Usage in JSX
<img src={getImageSource(course.image)} alt={course.title} />
```

## Adding New Images

1. **Place images in the correct directory**:
   ```
   client/public/website/
   ```

2. **Use appropriate file names**:
   - Use descriptive names when possible
   - Maintain consistent file extensions (.jpg, .png, etc.)

3. **Reference in seed data**:
   ```javascript
   {
     title: "New Course",
     image: "/website/new-course-image.jpg"
   }
   ```

4. **Seed the database**:
   ```bash
   cd server
   npm run seed
   ```

## Supported Image Formats

The application supports the following image formats:
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

## Best Practices

1. **Optimize images** for web use to improve loading times
2. **Use consistent naming conventions** for easier management
3. **Keep images organized** in the website folder
4. **Test both external and local images** to ensure proper display
5. **Update seed data** when adding new images to ensure they're used in development

## Troubleshooting

### Images Not Displaying

1. **Check the file path**:
   - Ensure the path starts with `/website/`
   - Verify the file exists in `client/public/website/`

2. **Check the file extension**:
   - Ensure the file has a supported extension
   - Verify the extension matches the actual file format

3. **Restart the development server**:
   ```bash
   # Stop the server (Ctrl+C)
   # Start the server again
   cd client
   npm run dev
   ```

### Validation Errors

If you encounter validation errors when seeding:

1. **Check the image path format**:
   - Local paths should start with `/website/`
   - External URLs should start with `http://` or `https://`

2. **Verify the file extension**:
   - Ensure the path ends with a supported extension

3. **Update the seed data** to use correct paths

## Example Usage

### Carousel Slides
```javascript
const carouselSlides = [
  {
    title: "Welcome to YESJ",
    description: "Empowering youth through education and community service",
    imageUrl: "/website/IMG_5986.JPG",
    link: "/about",
    order: 1
  }
];
```

### Courses
```javascript
const courses = [
  {
    title: "Introduction to JavaScript",
    description: "Learn the fundamentals of JavaScript programming language.",
    pageLink: "/courses/javascript",
    image: "/website/20241114_153846.jpg",
    duration: "8 weeks",
    category: "programming"
  }
];
```