import apiClient from './api';

export const eventsService = {
  // Get all events
  getAll: async () => {
    try {
      const response = await apiClient.get('/api/events');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch events:', error);
      throw new Error(`Failed to fetch events: ${error.message}`);
    }
  },

  // Get event by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/api/events/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch event ${id}:`, error);
      throw new Error(`Failed to fetch event: ${error.message}`);
    }
  },

  // Create new event
  create: async (eventData) => {
    try {
      // Add default createdBy value for admin panel
      const dataWithCreator = {
        ...eventData,
        createdBy: 'admin' // Default value for admin-created content
      };
      const response = await apiClient.post('/api/events', dataWithCreator);
      return response.data;
    } catch (error) {
      console.error('Failed to create event:', error);
      throw new Error(`Failed to create event: ${error.message}`);
    }
  },

  // Update event
  update: async (id, eventData) => {
    try {
      const response = await apiClient.put(`/api/events/${id}`, eventData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update event ${id}:`, error);
      throw new Error(`Failed to update event: ${error.message}`);
    }
  },

  // Delete event
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/api/events/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete event ${id}:`, error);
      throw new Error(`Failed to delete event: ${error.message}`);
    }
  }
};