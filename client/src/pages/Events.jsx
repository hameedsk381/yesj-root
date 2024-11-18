import React from 'react';
import { useNavigate } from 'react-router-dom';

const eventsData = [
  {
    id: 1,
    title: 'React Conference 2024',
    date: '2024-12-15',
    location: 'San Francisco, CA',
    description: 'A conference for React enthusiasts to share knowledge and network.',
    pageLink: '/events/react-conference-2024',
  },
  {
    id: 2,
    title: 'Data Science Summit',
    date: '2024-11-20',
    location: 'New York, NY',
    description: 'Join us for talks and workshops on the latest in data science.',
    pageLink: '/events/data-science-summit',
  },
];

const EventPage = () => {
  const navigate = useNavigate();

  const handleViewEvent = (pageLink) => {
    navigate(pageLink);
  };

  return (
    <div className="container mx-auto p-12 bg-gradient-to-r from-red-500 to-blue-500 lg:mt-16">
      <h1 className="text-4xl font-bold text-white mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventsData.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-2 text-gray-900">{event.title}</h3>
            <p className="text-gray-600 mb-1"><strong>Date:</strong> {event.date}</p>
            <p className="text-gray-600 mb-1"><strong>Location:</strong> {event.location}</p>
            <p className="text-gray-700 mb-4">{event.description}</p>
            <button
              onClick={() => handleViewEvent(event.pageLink)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              View Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
