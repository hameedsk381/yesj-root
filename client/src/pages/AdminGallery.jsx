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
  TagsInput, 
  Switch, 
  ActionIcon,
  Modal,
  Alert
} from '@mantine/core';
import { IconPlus, IconEdit, IconTrash, IconAlertCircle } from '@tabler/icons-react';
import { galleryService } from '../services';

function AdminGallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    tags: [],
    category: '',
    isActive: true
  });

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      const data = await galleryService.getAll();
      setGalleryImages(data);
    } catch (err) {
      setError('Failed to fetch gallery images');
      console.error('Error fetching gallery images:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (image = null) => {
    if (image) {
      setCurrentImage(image);
      setFormData({
        title: image.title || '',
        description: image.description || '',
        imageUrl: image.imageUrl || '',
        tags: image.tags || [],
        category: image.category || '',
        isActive: image.isActive !== undefined ? image.isActive : true
      });
    } else {
      setCurrentImage(null);
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        tags: [],
        category: '',
        isActive: true
      });
    }
    setModalOpened(true);
  };

  const handleCloseModal = () => {
    setModalOpened(false);
    setCurrentImage(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      if (currentImage) {
        // Update existing gallery image
        await galleryService.update(currentImage._id, formData);
      } else {
        // Create new gallery image
        await galleryService.create(formData);
      }
      
      // Refresh the list
      fetchGalleryImages();
      handleCloseModal();
    } catch (err) {
      setError('Failed to save gallery image');
      console.error('Error saving gallery image:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await galleryService.delete(id);
      fetchGalleryImages();
    } catch (err) {
      setError('Failed to delete gallery image');
      console.error('Error deleting gallery image:', err);
    }
  };

  if (loading) {
    return (
      <div>
        <Title order={2} mb="xl">Manage Gallery</Title>
        <Text>Loading gallery images...</Text>
      </div>
    );
  }

  return (
    <div>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Manage Gallery</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={() => handleOpenModal()}>
          Add Image
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

      {galleryImages.length === 0 ? (
        <Text>No gallery images found. Add your first image!</Text>
      ) : (
        <div>
          {galleryImages.map((image) => (
            <Card key={image._id} shadow="sm" p="lg" mb="md" withBorder>
              <Group justify="space-between">
                <div style={{ flex: 1 }}>
                  <Text fw={500}>{image.title}</Text>
                  <Text size="sm" color="dimmed" mt="xs">{image.description}</Text>
                  <Text size="sm" mt="xs">Category: {image.category}</Text>
                  <Text size="sm" mt="xs">
                    Tags: {image.tags && image.tags.length > 0 ? image.tags.join(', ') : 'None'}
                  </Text>
                  <Text size="sm" mt="xs">Active: {image.isActive ? 'Yes' : 'No'}</Text>
                </div>
                <div style={{ width: 150, height: 100 }}>
                  <Image 
                    src={image.imageUrl} 
                    alt={image.title} 
                    withPlaceholder
                    height={100}
                  />
                </div>
                <Group>
                  <ActionIcon color="blue" onClick={() => handleOpenModal(image)}>
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon color="red" onClick={() => handleDelete(image._id)}>
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
        title={currentImage ? "Edit Gallery Image" : "Add Gallery Image"}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            placeholder="Image title"
            value={formData.title}
            onChange={(event) => handleInputChange('title', event.target.value)}
            required
            mb="sm"
          />
          
          <Textarea
            label="Description"
            placeholder="Image description"
            value={formData.description}
            onChange={(event) => handleInputChange('description', event.target.value)}
            minRows={3}
            mb="sm"
          />
          
          <TextInput
            label="Image URL"
            placeholder="/website/image.jpg or https://example.com/image.jpg"
            value={formData.imageUrl}
            onChange={(event) => handleInputChange('imageUrl', event.target.value)}
            required
            mb="sm"
          />
          
          <TagsInput
            label="Tags"
            placeholder="Press Enter to add tags"
            value={formData.tags}
            onChange={(value) => handleInputChange('tags', value)}
            mb="sm"
          />
          
          <TextInput
            label="Category"
            placeholder="Image category"
            value={formData.category}
            onChange={(event) => handleInputChange('category', event.target.value)}
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
              {currentImage ? "Update Image" : "Add Image"}
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
}

export default AdminGallery;