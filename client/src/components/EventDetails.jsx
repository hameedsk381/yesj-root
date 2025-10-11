import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { eventsService } from '../services';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await eventsService.getById(id);
        setEvent(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching event:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Event Not Found </strong>
          <span className="block sm:inline">The requested event could not be found.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
          <div className="mb-6">
            <p className="text-gray-700 mb-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-2"><strong>Location:</strong> {event.location}</p>
            <p className="text-gray-700 mb-2"><strong>Organizer:</strong> {event.organizer || 'Not specified'}</p>
            <p className="text-gray-700 mb-2"><strong>Category:</strong> {event.category || 'Not specified'}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-700">{event.description}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Attendees</h2>
            {event.attendees && event.attendees.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-700">
                {event.attendees.map((attendee, index) => (
                  <li key={index}>{attendee}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No attendees listed yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;