import apiClient from './api';

export const programmesService = {
  // Get all programmes
  getAll: async () => {
    try {
      const response = await apiClient.get('/api/programmes');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch programmes:', error);
      throw new Error(`Failed to fetch programmes: ${error.message}`);
    }
  },

  // Get programme by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/api/programmes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch programme ${id}:`, error);
      throw new Error(`Failed to fetch programme: ${error.message}`);
    }
  },

  // Create new programme
  create: async (programmeData) => {
    try {
      // Add default createdBy value for admin panel
      const dataWithCreator = {
        ...programmeData,
        createdBy: 'admin' // Default value for admin-created content
      };
      const response = await apiClient.post('/api/programmes', dataWithCreator);
      return response.data;
    } catch (error) {
      console.error('Failed to create programme:', error);
      throw new Error(`Failed to create programme: ${error.message}`);
    }
  },

  // Update programme
  update: async (id, programmeData) => {
    try {
      const response = await apiClient.put(`/api/programmes/${id}`, programmeData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update programme ${id}:`, error);
      throw new Error(`Failed to update programme: ${error.message}`);
    }
  },

  // Delete programme
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/api/programmes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete programme ${id}:`, error);
      throw new Error(`Failed to delete programme: ${error.message}`);
    }
  }
};