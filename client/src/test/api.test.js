// Simple test to verify API connectivity
import { checkBackendHealth } from '../services/api';
import { announcementsService } from '../services';

export const testApiConnection = async () => {
  console.log('Testing API connection...');
  
  try {
    // Test health check
    const health = await checkBackendHealth();
    console.log('Backend health check:', health);
    
    // Test fetching announcements
    const announcements = await announcementsService.getAll();
    console.log('Announcements fetched:', announcements);
    
    console.log('API connection test completed successfully!');
    return true;
  } catch (error) {
    console.error('API connection test failed:', error.message);
    return false;
  }
};

// Run the test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testApiConnection();
}