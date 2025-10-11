import apiClient from './api';

export const carouselService = {
  // Get all carousel slides
  getAll: async () => {
    try {
      const response = await apiClient.get('/api/slides');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch carousel slides:', error);
      throw new Error(`Failed to fetch carousel slides: ${error.message}`);
    }
  },

  // Get carousel slide by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/api/slides/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch carousel slide ${id}:`, error);
      throw new Error(`Failed to fetch carousel slide: ${error.message}`);
    }
  },

  // Create new carousel slide
  create: async (slideData) => {
    try {
      // Add default createdBy value for admin panel
      const dataWithCreator = {
        ...slideData,
        createdBy: 'admin' // Default value for admin-created content
      };
      const response = await apiClient.post('/api/slides', dataWithCreator);
      return response.data;
    } catch (error) {
      console.error('Failed to create carousel slide:', error);
      throw new Error(`Failed to create carousel slide: ${error.message}`);
    }
  },

  // Update carousel slide
  update: async (id, slideData) => {
    try {
      const response = await apiClient.put(`/api/slides/${id}`, slideData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update carousel slide ${id}:`, error);
      throw new Error(`Failed to update carousel slide: ${error.message}`);
    }
  },

  // Delete carousel slide
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/api/slides/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete carousel slide ${id}:`, error);
      throw new Error(`Failed to delete carousel slide: ${error.message}`);
    }
  }
};