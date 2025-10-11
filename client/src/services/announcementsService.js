import apiClient from './api';

export const announcementsService = {
  // Get all announcements
  getAll: async () => {
    try {
      const response = await apiClient.get('/api/announcements');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch announcements:', error);
      throw new Error(`Failed to fetch announcements: ${error.message}`);
    }
  },

  // Get announcement by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/api/announcements/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch announcement ${id}:`, error);
      throw new Error(`Failed to fetch announcement: ${error.message}`);
    }
  },

  // Create new announcement
  create: async (announcementData) => {
    try {
      // Add default createdBy value for admin panel
      const dataWithCreator = {
        ...announcementData,
        createdBy: 'admin' // Default value for admin-created content
      };
      const response = await apiClient.post('/api/announcements', dataWithCreator);
      return response.data;
    } catch (error) {
      console.error('Failed to create announcement:', error);
      throw new Error(`Failed to create announcement: ${error.message}`);
    }
  },

  // Update announcement
  update: async (id, announcementData) => {
    try {
      const response = await apiClient.put(`/api/announcements/${id}`, announcementData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update announcement ${id}:`, error);
      throw new Error(`Failed to update announcement: ${error.message}`);
    }
  },

  // Delete announcement
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/api/announcements/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete announcement ${id}:`, error);
      throw new Error(`Failed to delete announcement: ${error.message}`);
    }
  }
};