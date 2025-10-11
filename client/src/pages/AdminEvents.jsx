import React, { useState, useEffect } from 'react';
import { 
  Title, 
  Button, 
  Group, 
  Card, 
  Text, 
  TextInput, 
  Textarea, 
  Select, 
  NumberInput, 
  Switch, 
  ActionIcon,
  Modal,
  Alert
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { IconPlus, IconEdit, IconTrash, IconAlertCircle } from '@tabler/icons-react';
import { eventsService } from '../services';

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date(),
    location: '',
    organizer: '',
    category: '',
    isPublic: true,
    maxAttendees: 100,
    isActive: true
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsService.getAll();
      setEvents(data);
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (event = null) => {
    if (event) {
      setCurrentEvent(event);
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: event.date ? new Date(event.date) : new Date(),
        location: event.location || '',
        organizer: event.organizer || '',
        category: event.category || '',
        isPublic: event.isPublic !== undefined ? event.isPublic : true,
        maxAttendees: event.maxAttendees || 100,
        isActive: event.isActive !== undefined ? event.isActive : true
      });
    } else {
      setCurrentEvent(null);
      setFormData({
        title: '',
        description: '',
        date: new Date(),
        location: '',
        organizer: '',
        category: '',
        isPublic: true,
        maxAttendees: 100,
        isActive: true
      });
    }
    setModalOpened(true);
  };

  const handleCloseModal = () => {
    setModalOpened(false);
    setCurrentEvent(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Format the data for submission
      const submitData = {
        ...formData,
        date: formData.date.toISOString()
      };
      
      if (currentEvent) {
        // Update existing event
        await eventsService.update(currentEvent._id, submitData);
      } else {
        // Create new event
        await eventsService.create(submitData);
      }
      
      // Refresh the list
      fetchEvents();
      handleCloseModal();
    } catch (err) {
      setError('Failed to save event');
      console.error('Error saving event:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await eventsService.delete(id);
      fetchEvents();
    } catch (err) {
      setError('Failed to delete event');
      console.error('Error deleting event:', err);
    }
  };

  if (loading) {
    return (
      <div>
        <Title order={2} mb="xl">Manage Events</Title>
        <Text>Loading events...</Text>
      </div>
    );
  }

  return (
    <div>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Manage Events</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={() => handleOpenModal()}>
          Add Event
        </Button>
      </Group>

      {error && (
        <Alert 
          icon={<IconAlertCircle size="1rem" />} 
          title="Error" 
          color="red" 
          mb="md"
        >
          {error}
        </Alert>
      )}

      {events.length === 0 ? (
        <Text>No events found. Add your first event!</Text>
      ) : (
        <div>
          {events.map((event) => (
            <Card key={event._id} shadow="sm" p="lg" mb="md" withBorder>
              <Group justify="space-between">
                <div style={{ flex: 1 }}>
                  <Text fw={500}>{event.title}</Text>
                  <Text size="sm" color="dimmed" mt="xs">{event.description}</Text>
                  <Text size="sm" mt="xs">
                    Date: {new Date(event.date).toLocaleDateString()} | 
                    Location: {event.location}
                  </Text>
                  <Text size="sm" mt="xs">
                    Category: {event.category} | 
                    Organizer: {event.organizer}
                  </Text>
                  <Text size="sm" mt="xs">
                    Public: {event.isPublic ? 'Yes' : 'No'} | 
                    Max Attendees: {event.maxAttendees} | 
                    Active: {event.isActive ? 'Yes' : 'No'}
                  </Text>
                </div>
                <Group>
                  <ActionIcon color="blue" onClick={() => handleOpenModal(event)}>
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon color="red" onClick={() => handleDelete(event._id)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Group>
            </Card>
          ))}
        </div>
      )}

      <Modal
        opened={modalOpened}
        onClose={handleCloseModal}
        title={currentEvent ? "Edit Event" : "Add Event"}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            placeholder="Event title"
            value={formData.title}
            onChange={(event) => handleInputChange('title', event.target.value)}
            required
            mb="sm"
          />
          
          <Textarea
            label="Description"
            placeholder="Event description"
            value={formData.description}
            onChange={(event) => handleInputChange('description', event.target.value)}
            required
            minRows={3}
            mb="sm"
          />
          
          <DateTimePicker
            label="Date and Time"
            placeholder="Pick date and time"
            value={formData.date}
            onChange={(value) => handleInputChange('date', value)}
            required
            mb="sm"
          />
          
          <TextInput
            label="Location"
            placeholder="Event location"
            value={formData.location}
            onChange={(event) => handleInputChange('location', event.target.value)}
            required
            mb="sm"
          />
          
          <TextInput
            label="Organizer"
            placeholder="Event organizer"
            value={formData.organizer}
            onChange={(event) => handleInputChange('organizer', event.target.value)}
            mb="sm"
          />
          
          <Select
            label="Category"
            placeholder="Select category"
            value={formData.category}
            onChange={(value) => handleInputChange('category', value)}
            data={[
              { value: 'conference', label: 'Conference' },
              { value: 'meetup', label: 'Meetup' },
              { value: 'workshop', label: 'Workshop' },
              { value: 'social', label: 'Social' },
              { value: 'other', label: 'Other' }
            ]}
            mb="sm"
          />
          
          <NumberInput
            label="Maximum Attendees"
            value={formData.maxAttendees}
            onChange={(value) => handleInputChange('maxAttendees', value)}
            min={1}
            mb="sm"
          />
          
          <Switch
            label="Public Event"
            checked={formData.isPublic}
            onChange={(event) => handleInputChange('isPublic', event.currentTarget.checked)}
            mb="sm"
          />
          
          <Switch
            label="Active"
            checked={formData.isActive}
            onChange={(event) => handleInputChange('isActive', event.currentTarget.checked)}
            mb="sm"
          />
          
          <Group justify="flex-end" mt="xl">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit">
              {currentEvent ? "Update Event" : "Add Event"}
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
}

export default AdminEvents;