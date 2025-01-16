import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Modal, Button, TextInput, Checkbox, Select } from '@mantine/core';

export default function EventsPanel() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    organizer: '',
    attendees: [],
    category: '',
    isPublic: true,
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://server.yesj.in/events'); // Replace with your API endpoint
      setEvents(response.data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, [name]: value });
    } else {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  // Handle description input (React Quill)
  const handleDescriptionChange = (value) => {
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, description: value });
    } else {
      setNewEvent({ ...newEvent, description: value });
    }
  };

  // Handle attendees input
  const handleAttendeesChange = (value) => {
    const attendees = value.split(',').map((id) => id.trim());
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, attendees });
    } else {
      setNewEvent({ ...newEvent, attendees });
    }
  };

  // Add a new event
  const addEvent = async () => {
    try {
      const response = await axios.post('https://server.yesj.in/events', newEvent);
      setEvents([...events, response.data]);
      setNewEvent({
        title: '',
        description: '',
        date: '',
        location: '',
        organizer: '',
        attendees: [],
        category: '',
        isPublic: true,
      });
      setModalOpen(false);
    } catch (err) {
      console.error('Error adding event:', err);
      setError('Failed to add event.');
    }
  };

  // Update an event
  const updateEvent = async () => {
    try {
      const response = await axios.put(`https://server.yesj.in/events/${editingEvent._id}`, editingEvent);
      setEvents(events.map((event) => (event._id === editingEvent._id ? response.data : event)));
      setEditingEvent(null);
      setModalOpen(false);
    } catch (err) {
      console.error('Error updating event:', err);
      setError('Failed to update event.');
    }
  };

  // Delete an event
  const deleteEvent = async (id) => {
    try {
      await axios.delete(`https://server.yesj.in/events/${id}`);
      setEvents(events.filter((event) => event._id !== id));
    } catch (err) {
      console.error('Error deleting event:', err);
      setError('Failed to delete event.');
    }
  };

  const openModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
    } else {
      setNewEvent({
        title: '',
        description: '',
        date: '',
        location: '',
        organizer: '',
        attendees: [],
        category: '',
        isPublic: true,
      });
    }
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Events Panel</h1>

      {/* Display Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Button onClick={() => openModal()} className="mb-6">
        Add New Event
      </Button>

      {/* Modal for Adding/Editing Events */}
      <Modal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingEvent(null);
        }}
        title={editingEvent ? 'Edit Event' : 'Add New Event'}
      >
        <div>
          <TextInput
            label="Title"
            name="title"
            placeholder="Enter event title"
            value={editingEvent ? editingEvent.title : newEvent.title}
            onChange={handleInputChange}
            required
            className="mb-4"
          />
          <ReactQuill
            value={editingEvent ? editingEvent.description : newEvent.description}
            onChange={handleDescriptionChange}
            className="mb-4"
            placeholder="Enter description..."
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
                ['clean'],
              ],
            }}
            formats={[
              'header',
              'bold',
              'italic',
              'underline',
              'strike',
              'list',
              'bullet',
              'link',
              'image',
            ]}
          />
          <TextInput
            label="Date"
            type="date"
            name="date"
            value={editingEvent ? editingEvent.date : newEvent.date}
            onChange={handleInputChange}
            required
            className="mb-4"
          />
          <TextInput
            label="Location"
            name="location"
            placeholder="Enter event location"
            value={editingEvent ? editingEvent.location : newEvent.location}
            onChange={handleInputChange}
            required
            className="mb-4"
          />
          <TextInput
            label="Organizer (User ID)"
            name="organizer"
            placeholder="Enter organizer's User ID"
            value={editingEvent ? editingEvent.organizer : newEvent.organizer}
            onChange={handleInputChange}
            className="mb-4"
          />
          <TextInput
            label="Attendees (comma-separated User IDs)"
            name="attendees"
            placeholder="Enter attendee User IDs"
            value={editingEvent ? editingEvent.attendees.join(', ') : newEvent.attendees.join(', ')}
            onChange={(e) => handleAttendeesChange(e.target.value)}
            className="mb-4"
          />
          <Select
            label="Category"
            name="category"
            placeholder="Select a category"
            data={[
              { value: 'conference', label: 'Conference' },
              { value: 'meetup', label: 'Meetup' },
              { value: 'workshop', label: 'Workshop' },
              { value: 'social', label: 'Social' },
              { value: 'other', label: 'Other' },
            ]}
            value={editingEvent ? editingEvent.category : newEvent.category}
            onChange={(value) => {
              if (editingEvent) {
                setEditingEvent({ ...editingEvent, category: value });
              } else {
                setNewEvent({ ...newEvent, category: value });
              }
            }}
            className="mb-4"
          />
          <Checkbox
            label="Public Event"
            checked={editingEvent ? editingEvent.isPublic : newEvent.isPublic}
            onChange={(e) =>
              editingEvent
                ? setEditingEvent({ ...editingEvent, isPublic: e.target.checked })
                : setNewEvent({ ...newEvent, isPublic: e.target.checked })
            }
          />
          <div className="mt-6">
            <Button
              onClick={editingEvent ? updateEvent : addEvent}
              className="mr-4"
            >
              {editingEvent ? 'Update Event' : 'Add Event'}
            </Button>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Event List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Event List</h2>
        {loading ? (
          <p>Loading events...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="border rounded-lg p-4 shadow hover:shadow-md transition duration-300"
              >
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: event.description }} className="text-gray-700"></div>
                <p className="text-gray-600">
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="text-gray-600">
                  <strong>Category:</strong> {event.category}
                </p>
                <p className="text-gray-600">
                  <strong>Organizer:</strong> {event.organizer || 'N/A'}
                </p>
                <p className="text-gray-600">
                  <strong>Attendees:</strong> {event.attendees.join(', ') || 'None'}
                </p>
                <p className="text-gray-600">
                  <strong>Public:</strong> {event.isPublic ? 'Yes' : 'No'}
                </p>
                <div className="mt-4 flex space-x-2">
                  <Button onClick={() => openModal(event)} color="yellow">
                    Edit
                  </Button>
                  <Button onClick={() => deleteEvent(event._id)} color="red">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
