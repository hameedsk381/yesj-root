import React from 'react';
import { motion } from 'framer-motion';

const stories = [
  {
    id: 1,
    title: 'Building Schools in Rural Areas',
    description: 'We built 10 schools in remote areas to provide education to over 500 children.',
    image: 'https://via.placeholder.com/300',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 2,
    title: 'Clean Water Project',
    description: 'We provided clean drinking water to over 2000 households.',
    image: 'https://via.placeholder.com/300',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  // Add more stories here...
];

const FeaturedStories = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {stories.map((story) => (
        <motion.div
          key={story.id}
          className="bg-gray-100 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4">{story.title}</h3>
          <p className="text-gray-700 mb-4">{story.description}</p>
          <img src={story.image} alt={story.title} className="w-full h-64 object-cover rounded-md mb-4" />
          <video className="w-full h-auto rounded-lg" controls>
            <source src={story.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturedStories;
