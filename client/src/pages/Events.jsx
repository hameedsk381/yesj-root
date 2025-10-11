import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventsService } from '../services';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await eventsService.getAll();
        setEvents(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleViewEvent = (pageLink) => {
    navigate(pageLink);
  };

  // Function to determine the correct image source (for future use)
  const getImageSource = (imagePath) => {
    // If it's already a full URL, return as is
    if (imagePath && imagePath.startsWith('http')) {
      return imagePath;
    }
    // If it's a local path, prefix with the base URL
    return imagePath;
  };

  if (loading) {
    return (
      <div className="container mx-auto p-12 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-12 bg-gradient-to-r from-red-500 to-blue-500 lg:mt-16">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Events</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-12 bg-gradient-to-r from-red-500 to-blue-500 lg:mt-16">
      <h1 className="text-4xl font-bold text-white mb-8">Upcoming Events</h1>
      {events.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-700">No Events Available</h3>
          <p className="text-gray-600 mt-2">Check back later for upcoming events.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">{event.title}</h3>
              <p className="text-gray-600 mb-1"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-600 mb-1"><strong>Location:</strong> {event.location}</p>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <button
                onClick={() => handleViewEvent(`/event/${event._id}`)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                View Event
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventPage;