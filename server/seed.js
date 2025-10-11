import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { users, announcements, courses, events, carouselSlides, programmes, galleryImages } from './seedData.js';
import User from './models/users.js';
import Announcement from './models/announcements.js';
import Course from './models/courses.js';
import Event from './models/events.js';
import Carousel from './models/carousel.js';
import Programme from './models/programmes.js';
import Gallery from './models/gallery.js';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yesj', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedDB = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Announcement.deleteMany({});
    await Course.deleteMany({});
    await Event.deleteMany({});
    await Carousel.deleteMany({});
    await Programme.deleteMany({});
    await Gallery.deleteMany({});
    
    console.log('Existing data cleared...');
    
    // Insert users first to get their IDs
    const createdUsers = await User.insertMany(users);
    console.log(`Inserted ${createdUsers.length} users`);
    
    // Use the first user as the creator for all other content
    const adminUser = createdUsers[0];
    
    // Prepare announcements with createdBy field
    const announcementsWithCreator = announcements.map(announcement => ({
      ...announcement,
      createdBy: adminUser._id
    }));
    
    // Prepare courses with createdBy field
    const coursesWithCreator = courses.map(course => ({
      ...course,
      createdBy: adminUser._id
    }));
    
    // Prepare events with createdBy field
    const eventsWithCreator = events.map(event => ({
      ...event,
      createdBy: adminUser._id
    }));
    
    // Prepare carousel slides with createdBy field
    const carouselSlidesWithCreator = carouselSlides.map(slide => ({
      ...slide,
      createdBy: adminUser._id
    }));
    
    // Prepare programmes with createdBy field
    const programmesWithCreator = programmes.map(programme => ({
      ...programme,
      createdBy: adminUser._id
    }));
    
    // Prepare gallery images with createdBy field
    const galleryImagesWithCreator = galleryImages.map(image => ({
      ...image,
      createdBy: adminUser._id
    }));
    
    // Insert sample data
    await Announcement.insertMany(announcementsWithCreator);
    console.log(`Inserted ${announcements.length} announcements`);
    
    await Course.insertMany(coursesWithCreator);
    console.log(`Inserted ${courses.length} courses`);
    
    await Event.insertMany(eventsWithCreator);
    console.log(`Inserted ${events.length} events`);
    
    await Carousel.insertMany(carouselSlidesWithCreator);
    console.log(`Inserted ${carouselSlides.length} carousel slides`);
    
    await Programme.insertMany(programmesWithCreator);
    console.log(`Inserted ${programmes.length} programmes`);
    
    await Gallery.insertMany(galleryImagesWithCreator);
    console.log(`Inserted ${galleryImages.length} gallery images`);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

const resetDB = async () => {
  try {
    await connectDB();
    
    // Clear all data
    await User.deleteMany({});
    await Announcement.deleteMany({});
    await Course.deleteMany({});
    await Event.deleteMany({});
    await Carousel.deleteMany({});
    await Programme.deleteMany({});
    await Gallery.deleteMany({});
    
    console.log('Database reset successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  }
};

// Run the appropriate function based on command line arguments
if (process.argv[2] === '--import') {
  seedDB();
} else if (process.argv[2] === '--reset') {
  resetDB();
} else {
  console.log('Usage: node seed.js [--import|--reset]');
  process.exit(0);
}