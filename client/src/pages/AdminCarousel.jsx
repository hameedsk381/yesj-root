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
  NumberInput, 
  Switch, 
  ActionIcon,
  Modal,
  Alert
} from '@mantine/core';
import { IconPlus, IconEdit, IconTrash, IconAlertCircle } from '@tabler/icons-react';
import { carouselService } from '../services';

function AdminCarousel() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    order: 0,
    active: true
  });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const data = await carouselService.getAll();
      setSlides(data);
    } catch (err) {
      setError('Failed to fetch carousel slides');
      console.error('Error fetching slides:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (slide = null) => {
    if (slide) {
      setCurrentSlide(slide);
      setFormData({
        title: slide.title || '',
        description: slide.description || '',
        imageUrl: slide.imageUrl || '',
        link: slide.link || '',
        order: slide.order || 0,
        active: slide.active !== undefined ? slide.active : true
      });
    } else {
      setCurrentSlide(null);
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        link: '',
        order: 0,
        active: true
      });
    }
    setModalOpened(true);
  };

  const handleCloseModal = () => {
    setModalOpened(false);
    setCurrentSlide(null);
  };

  const handleInputChange = (field) => (value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      if (currentSlide) {
        // Update existing slide
        await carouselService.update(currentSlide._id, formData);
      } else {
        // Create new slide
        await carouselService.create(formData);
      }
      
      // Refresh the list
      fetchSlides();
      handleCloseModal();
    } catch (err) {
      setError('Failed to save carousel slide');
      console.error('Error saving slide:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await carouselService.delete(id);
      fetchSlides();
    } catch (err) {
      setError('Failed to delete carousel slide');
      console.error('Error deleting slide:', err);
    }
  };

  if (loading) {
    return (
      <div>
        <Title order={2} mb="xl">Manage Carousel</Title>
        <Text>Loading carousel slides...</Text>
      </div>
    );
  }

  return (
    <div>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Manage Carousel</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={() => handleOpenModal()}>
          Add Slide
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

      {slides.length === 0 ? (
        <Text>No carousel slides found. Add your first slide!</Text>
      ) : (
        <div>
          {slides.map((slide) => (
            <Card key={slide._id} shadow="sm" p="lg" mb="md" withBorder>
              <Group justify="space-between">
                <div style={{ flex: 1 }}>
                  <Text fw={500}>{slide.title}</Text>
                  <Text size="sm" color="dimmed" mt="xs">{slide.description}</Text>
                  <Text size="sm" mt="xs">Order: {slide.order} | Active: {slide.active ? 'Yes' : 'No'}</Text>
                  {slide.link && <Text size="sm" mt="xs">Link: {slide.link}</Text>}
                </div>
                <div style={{ width: 200, height: 120 }}>
                  <Image 
                    src={slide.imageUrl} 
                    alt={slide.title} 
                    withPlaceholder
                    height={120}
                  />
                </div>
                <Group>
                  <ActionIcon color="blue" onClick={() => handleOpenModal(slide)}>
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon color="red" onClick={() => handleDelete(slide._id)}>
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
        title={currentSlide ? "Edit Carousel Slide" : "Add Carousel Slide"}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            placeholder="Slide title"
            value={formData.title}
            onChange={(event) => handleInputChange('title')(event.target.value)}
            required
            mb="sm"
          />
          
          <Textarea
            label="Description"
            placeholder="Slide description"
            value={formData.description}
            onChange={(event) => handleInputChange('description')(event.target.value)}
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
            label="Link"
            placeholder="/page or https://example.com"
            value={formData.link}
            onChange={(event) => handleInputChange('link')(event.target.value)}
            mb="sm"
          />
          
          <NumberInput
            label="Order"
            value={formData.order}
            onChange={handleInputChange('order')}
            min={0}
            mb="sm"
          />
          
          <Switch
            label="Active"
            checked={formData.active}
            onChange={(event) => handleInputChange('active')(event.currentTarget.checked)}
            mb="sm"
          />
          
          <Group justify="flex-end" mt="xl">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit">
              {currentSlide ? "Update Slide" : "Add Slide"}
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
}

export default AdminCarousel;