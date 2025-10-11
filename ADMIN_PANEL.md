# Admin Panel Guide

This document explains how to use the YESJ Admin Panel to manage all aspects of the website.

## Accessing the Admin Panel

To access the admin panel, navigate to:
```
http://localhost:3000/admin/login
```

Use the default credentials:
- Username: `admin`
- Password: `admin123`

## Admin Panel Features

The admin panel allows you to manage the following website components:

### 1. Dashboard
The main dashboard provides an overview of all content with quick statistics.

### 2. Carousel Management
Manage the homepage carousel slides:
- Add new slides with images, titles, and links
- Edit existing slides
- Set slide order
- Activate/deactivate slides

### 3. Announcements Management
Manage website announcements:
- Create new announcements with priority levels
- Edit existing announcements
- Activate/deactivate announcements

### 4. Courses Management
Manage educational courses:
- Add new courses with descriptions, images, and categories
- Edit course details
- Set course duration and difficulty level
- Assign instructors
- Activate/deactivate courses

### 5. Events Management
Manage events and activities:
- Create new events with dates, locations, and descriptions
- Edit event details
- Set maximum attendee limits
- Make events public or private
- Activate/deactivate events

### 6. Programmes Management
Manage YESJ programmes:
- Add new programmes with descriptions and images
- Edit programme details
- Categorize programmes by year and type
- Activate/deactivate programmes

### 7. Gallery Management
Manage the image gallery:
- Upload new gallery images
- Add tags and categories for filtering
- Edit image descriptions
- Activate/deactivate images

## Using the Admin Panel

### Adding New Content
1. Navigate to the appropriate section (e.g., "Courses")
2. Click the "Add [Item]" button
3. Fill in all required fields
4. Click "Save" to create the item

### Editing Existing Content
1. Navigate to the appropriate section
2. Find the item you want to edit
3. Click the edit icon (pencil)
4. Make your changes
5. Click "Update" to save changes

### Deleting Content
1. Navigate to the appropriate section
2. Find the item you want to delete
3. Click the delete icon (trash can)
4. Confirm the deletion

## Image Management

All images should be placed in the `client/public/website/` directory and referenced using relative paths:
```
/website/image-name.jpg
```

You can also use external image URLs:
```
https://example.com/image.jpg
```

## Best Practices

1. **Regular Backups**: Regularly export your database to prevent data loss
2. **Image Optimization**: Optimize images for web use to improve loading times
3. **Content Review**: Review content before making it active
4. **Consistent Naming**: Use consistent naming conventions for titles and descriptions
5. **Tagging**: Use relevant tags for better content organization

## Security

- Change the default admin password after first login
- Keep the admin panel URL private
- Regularly update the application to the latest version
- Monitor admin activity logs

## Troubleshooting

### Login Issues
- Ensure you're using the correct credentials
- Check that the server is running
- Clear browser cache and cookies

### Content Not Displaying
- Verify that items are marked as "Active"
- Check that image paths are correct
- Ensure required fields are filled

### Performance Issues
- Optimize large images
- Limit the number of active carousel slides
- Regularly clean up unused content

## API Endpoints

The admin panel communicates with the backend through the following API endpoints:

- Announcements: `/api/announcements`
- Courses: `/api/courses`
- Events: `/api/events`
- Carousel Slides: `/api/slides`
- Programmes: `/api/programmes`
- Gallery Images: `/api/gallery`

All endpoints support standard CRUD operations (Create, Read, Update, Delete).