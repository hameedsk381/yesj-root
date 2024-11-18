import React from 'react';
import { Avatar } from '@mantine/core';

const EventItem = ({ eventItemDetails }) => {
  const {
    imageUrl,
    title,
    description,
    stats,
    imageList,
    testimonials
  } = eventItemDetails;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <img src={imageUrl} alt={title} className="w-full h-auto object-cover rounded-md shadow-lg mb-4" />
        <p className="text-lg text-gray-700 mb-6">{description}</p>
      </div>

      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map(stat => (
            <div key={stat.id} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-3xl font-bold text-blue-500">{stat.count}</p>
              <p className="text-gray-700">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">Gallery</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {imageList.map(image => (
            <img key={image.id} src={image.imageUrl} alt={title} className="w-full h-auto object-cover rounded-md shadow-lg" />
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">Testimonials</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <p className="italic text-gray-600 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Avatar src={testimonial.avatar} alt={testimonial.participant} className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">{testimonial.participant}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventItem;
