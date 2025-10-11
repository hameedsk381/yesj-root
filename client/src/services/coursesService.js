import apiClient from './api';

export const coursesService = {
  // Get all courses
  getAll: async () => {
    try {
      const response = await apiClient.get('/api/courses');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      throw new Error(`Failed to fetch courses: ${error.message}`);
    }
  },

  // Get course by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/api/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch course ${id}:`, error);
      throw new Error(`Failed to fetch course: ${error.message}`);
    }
  },

  // Create new course
  create: async (courseData) => {
    try {
      // Add default createdBy value for admin panel
      const dataWithCreator = {
        ...courseData,
        createdBy: 'admin' // Default value for admin-created content
      };
      const response = await apiClient.post('/api/courses', dataWithCreator);
      return response.data;
    } catch (error) {
      console.error('Failed to create course:', error);
      throw new Error(`Failed to create course: ${error.message}`);
    }
  },

  // Update course
  update: async (id, courseData) => {
    try {
      const response = await apiClient.put(`/api/courses/${id}`, courseData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update course ${id}:`, error);
      throw new Error(`Failed to update course: ${error.message}`);
    }
  },

  // Delete course
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/api/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete course ${id}:`, error);
      throw new Error(`Failed to delete course: ${error.message}`);
    }
  }
};