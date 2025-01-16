import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events'); // Replace with your API endpoint
        setEvents(response.data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleViewEvent = (pageLink) => {
    navigate(pageLink);
  };

  if (loading) {
    return (
      <div className="container mx-auto text-center py-20">
        <p className="text-lg font-semibold text-gray-700">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto text-center py-20">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-12 bg-gradient-to-r from-red-500 to-blue-500 lg:mt-16">
      <h1 className="text-4xl font-bold text-white mb-8">Upcoming Events</h1>
      {events.length === 0 ? (
        <p className="text-center text-white">No events available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
            >
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">{event.title}</h3>
              <p className="text-gray-600 mb-1">
                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Location:</strong> {event.location}
              </p>
              {/* <p className="text-gray-700 mb-4">{event.description}</p> */}
              <button
                onClick={() => handleViewEvent(`/events/${event._id}`)}
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
