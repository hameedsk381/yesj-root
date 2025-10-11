import apiClient from './api';

export const galleryService = {
  // Get all gallery images
  getAll: async () => {
    try {
      const response = await apiClient.get('/api/gallery');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch gallery images:', error);
      throw new Error(`Failed to fetch gallery images: ${error.message}`);
    }
  },

  // Get gallery image by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/api/gallery/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch gallery image ${id}:`, error);
      throw new Error(`Failed to fetch gallery image: ${error.message}`);
    }
  },

  // Create new gallery image
  create: async (galleryData) => {
    try {
      // Add default createdBy value for admin panel
      const dataWithCreator = {
        ...galleryData,
        createdBy: 'admin' // Default value for admin-created content
      };
      const response = await apiClient.post('/api/gallery', dataWithCreator);
      return response.data;
    } catch (error) {
      console.error('Failed to create gallery image:', error);
      throw new Error(`Failed to create gallery image: ${error.message}`);
    }
  },

  // Update gallery image
  update: async (id, galleryData) => {
    try {
      const response = await apiClient.put(`/api/gallery/${id}`, galleryData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update gallery image ${id}:`, error);
      throw new Error(`Failed to update gallery image: ${error.message}`);
    }
  },

  // Delete gallery image
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/api/gallery/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete gallery image ${id}:`, error);
      throw new Error(`Failed to delete gallery image: ${error.message}`);
    }
  }
};