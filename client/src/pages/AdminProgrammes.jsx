import React, { useState, useEffect } from 'react';
import { 
  Title, 
  Button, 
  Group, 
  Card, 
  Image, 
  Text, 
  TextInput, 
  Textarea, 
  Switch, 
  ActionIcon,
  Modal,
  Alert
} from '@mantine/core';
import { IconPlus, IconEdit, IconTrash, IconAlertCircle } from '@tabler/icons-react';
import { programmesService } from '../services';

function AdminProgrammes() {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [currentProgramme, setCurrentProgramme] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: '',
    year: '',
    isActive: true
  });

  useEffect(() => {
    fetchProgrammes();
  }, []);

  const fetchProgrammes = async () => {
    try {
      setLoading(true);
      const data = await programmesService.getAll();
      setProgrammes(data);
    } catch (err) {
      setError('Failed to fetch programmes');
      console.error('Error fetching programmes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (programme = null) => {
    if (programme) {
      setCurrentProgramme(programme);
      setFormData({
        title: programme.title || '',
        description: programme.description || '',
        imageUrl: programme.imageUrl || '',
        category: programme.category || '',
        year: programme.year || '',
        isActive: programme.isActive !== undefined ? programme.isActive : true
      });
    } else {
      setCurrentProgramme(null);
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        category: '',
        year: '',
        isActive: true
      });
    }
    setModalOpened(true);
  };

  const handleCloseModal = () => {
    setModalOpened(false);
    setCurrentProgramme(null);
  };

  const handleInputChange = (field) => (value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      if (currentProgramme) {
        // Update existing programme
        await programmesService.update(currentProgramme._id, formData);
      } else {
        // Create new programme
        await programmesService.create(formData);
      }
      
      // Refresh the list
      fetchProgrammes();
      handleCloseModal();
    } catch (err) {
      setError('Failed to save programme');
      console.error('Error saving programme:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await programmesService.delete(id);
      fetchProgrammes();
    } catch (err) {
      setError('Failed to delete programme');
      console.error('Error deleting programme:', err);
    }
  };

  if (loading) {
    return (
      <div>
        <Title order={2} mb="xl">Manage Programmes</Title>
        <Text>Loading programmes...</Text>
      </div>
    );
  }

  return (
    <div>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Manage Programmes</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={() => handleOpenModal()}>
          Add Programme
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

      {programmes.length === 0 ? (
        <Text>No programmes found. Add your first programme!</Text>
      ) : (
        <div>
          {programmes.map((programme) => (
            <Card key={programme._id} shadow="sm" p="lg" mb="md" withBorder>
              <Group justify="space-between">
                <div style={{ flex: 1 }}>
                  <Text fw={500}>{programme.title}</Text>
                  <Text size="sm" color="dimmed" mt="xs">{programme.description}</Text>
                  <Text size="sm" mt="xs">Category: {programme.category} | Year: {programme.year}</Text>
                  <Text size="sm" mt="xs">Active: {programme.isActive ? 'Yes' : 'No'}</Text>
                </div>
                <div style={{ width: 150, height: 100 }}>
                  <Image 
                    src={programme.imageUrl} 
                    alt={programme.title} 
                    withPlaceholder
                    height={100}
                  />
                </div>
                <Group>
                  <ActionIcon color="blue" onClick={() => handleOpenModal(programme)}>
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon color="red" onClick={() => handleDelete(programme._id)}>
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
        title={currentProgramme ? "Edit Programme" : "Add Programme"}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            placeholder="Programme title"
            value={formData.title}
            onChange={(event) => handleInputChange('title')(event.target.value)}
            required
            mb="sm"
          />
          
          <Textarea
            label="Description"
            placeholder="Programme description"
            value={formData.description}
            onChange={(event) => handleInputChange('description')(event.target.value)}
            required
            minRows={3}
            mb="sm"
          />
          
          <TextInput
            label="Image URL"
            placeholder="/website/image.jpg or https://example.com/image.jpg"
            value={formData.imageUrl}
            onChange={(event) => handleInputChange('imageUrl')(event.target.value)}
            required
            mb="sm"
          />
          
          <TextInput
            label="Category"
            placeholder="Programme category"
            value={formData.category}
            onChange={(event) => handleInputChange('category')(event.target.value)}
            mb="sm"
          />
          
          <TextInput
            label="Year"
            placeholder="Programme year"
            value={formData.year}
            onChange={(event) => handleInputChange('year')(event.target.value)}
            mb="sm"
          />
          
          <Switch
            label="Active"
            checked={formData.isActive}
            onChange={(event) => handleInputChange('isActive')(event.currentTarget.checked)}
            mb="sm"
          />
          
          <Group position="right" mt="xl">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit">
              {currentProgramme ? "Update Programme" : "Add Programme"}
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
}

export default AdminProgrammes;