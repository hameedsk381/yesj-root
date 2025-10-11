import React, { useState, useEffect } from 'react';
import { 
  Title, 
  Button, 
  Group, 
  Card, 
  Text, 
  TextInput, 
  Textarea, 
  NumberInput, 
  Switch, 
  ActionIcon,
  Modal,
  Alert
} from '@mantine/core';
import { IconPlus, IconEdit, IconTrash, IconAlertCircle } from '@tabler/icons-react';
import { announcementsService } from '../services';

function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    priority: 0,
    isActive: true
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await announcementsService.getAll();
      setAnnouncements(data);
    } catch (err) {
      setError('Failed to fetch announcements');
      console.error('Error fetching announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (announcement = null) => {
    if (announcement) {
      setCurrentAnnouncement(announcement);
      setFormData({
        title: announcement.title || '',
        description: announcement.description || '',
        content: announcement.content || '',
        priority: announcement.priority || 0,
        isActive: announcement.isActive !== undefined ? announcement.isActive : true
      });
    } else {
      setCurrentAnnouncement(null);
      setFormData({
        title: '',
        description: '',
        content: '',
        priority: 0,
        isActive: true
      });
    }
    setModalOpened(true);
  };

  const handleCloseModal = () => {
    setModalOpened(false);
    setCurrentAnnouncement(null);
  };

  const handleInputChange = (field) => (value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      if (currentAnnouncement) {
        // Update existing announcement
        await announcementsService.update(currentAnnouncement._id, formData);
      } else {
        // Create new announcement
        await announcementsService.create(formData);
      }
      
      // Refresh the list
      fetchAnnouncements();
      handleCloseModal();
    } catch (err) {
      setError('Failed to save announcement');
      console.error('Error saving announcement:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await announcementsService.delete(id);
      fetchAnnouncements();
    } catch (err) {
      setError('Failed to delete announcement');
      console.error('Error deleting announcement:', err);
    }
  };

  if (loading) {
    return (
      <div>
        <Title order={2} mb="xl">Manage Announcements</Title>
        <Text>Loading announcements...</Text>
      </div>
    );
  }

  return (
    <div>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Manage Announcements</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={() => handleOpenModal()}>
          Add Announcement
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

      {announcements.length === 0 ? (
        <Text>No announcements found. Add your first announcement!</Text>
      ) : (
        <div>
          {announcements.map((announcement) => (
            <Card key={announcement._id} shadow="sm" p="lg" mb="md" withBorder>
              <Group justify="space-between">
                <div style={{ flex: 1 }}>
                  <Text fw={500}>{announcement.title}</Text>
                  <Text size="sm" color="dimmed" mt="xs">{announcement.description}</Text>
                  <Text size="sm" mt="xs">Priority: {announcement.priority} | Active: {announcement.isActive ? 'Yes' : 'No'}</Text>
                </div>
                <Group>
                  <ActionIcon color="blue" onClick={() => handleOpenModal(announcement)}>
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon color="red" onClick={() => handleDelete(announcement._id)}>
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
        title={currentAnnouncement ? "Edit Announcement" : "Add Announcement"}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            placeholder="Announcement title"
            value={formData.title}
            onChange={(event) => handleInputChange('title')(event.target.value)}
            required
            mb="sm"
          />
          
          <TextInput
            label="Description"
            placeholder="Short description"
            value={formData.description}
            onChange={(event) => handleInputChange('description')(event.target.value)}
            required
            mb="sm"
          />
          
          <Textarea
            label="Content"
            placeholder="Full announcement content"
            value={formData.content}
            onChange={(event) => handleInputChange('content')(event.target.value)}
            required
            minRows={4}
            mb="sm"
          />
          
          <NumberInput
            label="Priority"
            value={formData.priority}
            onChange={handleInputChange('priority')}
            min={0}
            mb="sm"
          />
          
          <Switch
            label="Active"
            checked={formData.isActive}
            onChange={(event) => handleInputChange('isActive')(event.currentTarget.checked)}
            mb="sm"
          />
          
          <Group justify="flex-end" mt="xl">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit">
              {currentAnnouncement ? "Update Announcement" : "Add Announcement"}
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
}

export default AdminAnnouncements;