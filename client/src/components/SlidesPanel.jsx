import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  TextInput,
  Switch,
  NumberInput,
  Table,
  ActionIcon,
  Image,
  Loader,
  Container,
  Title,
  Group,
  FileInput,
} from '@mantine/core';
import { FaEdit } from 'react-icons/fa';
import { FiDelete } from 'react-icons/fi';

export default function SlidesPanel() {
  const [slides, setSlides] = useState([]);
  const [newSlide, setNewSlide] = useState({
    title: '',
    description: '',
    imageFile: null, // Updated to handle file input
    link: '',
    active: true,
    order: 0,
  });
  const [editingSlide, setEditingSlide] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  // Fetch all slides
  const fetchSlides = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/slides');
      setSlides(response.data);
    } catch (err) {
      console.error('Error fetching slides:', err);
      setError('Failed to fetch slides.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingSlide) {
      setEditingSlide({ ...editingSlide, [name]: value });
    } else {
      setNewSlide({ ...newSlide, [name]: value });
    }
  };

  // Handle file input change
  const handleFileChange = (file) => {
    if (editingSlide) {
      setEditingSlide({ ...editingSlide, imageFile: file });
    } else {
      setNewSlide({ ...newSlide, imageFile: file });
    }
  };

  // Add a new slide
  const addSlide = async () => {
    const formData = new FormData();
    formData.append('title', newSlide.title);
    formData.append('description', newSlide.description);
    formData.append('link', newSlide.link);
    formData.append('active', newSlide.active);
    formData.append('order', newSlide.order);
    if (newSlide.imageFile) formData.append('image', newSlide.imageFile);

    try {
      const response = await axios.post('http://localhost:5000/slides', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSlides([...slides, response.data]);
      setNewSlide({
        title: '',
        description: '',
        imageFile: null,
        link: '',
        active: true,
        order: 0,
      });
      setModalOpen(false);
    } catch (err) {
      console.error('Error adding slide:', err);
      setError('Failed to add slide.');
    }
  };

  // Update a slide
  const updateSlide = async () => {
    const formData = new FormData();
    formData.append('title', editingSlide.title);
    formData.append('description', editingSlide.description);
    formData.append('link', editingSlide.link);
    formData.append('active', editingSlide.active);
    formData.append('order', editingSlide.order);
    if (editingSlide.imageFile) formData.append('image', editingSlide.imageFile);

    try {
      const response = await axios.put(`http://localhost:5000/slides/${editingSlide._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSlides(slides.map((slide) => (slide._id === editingSlide._id ? response.data : slide)));
      setEditingSlide(null);
      setModalOpen(false);
    } catch (err) {
      console.error('Error updating slide:', err);
      setError('Failed to update slide.');
    }
  };

  // Delete a slide
  const deleteSlide = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/slides/${id}`);
      setSlides(slides.filter((slide) => slide._id !== id));
    } catch (err) {
      console.error('Error deleting slide:', err);
      setError('Failed to delete slide.');
    }
  };

  const openModal = (slide = null) => {
    if (slide) {
      setEditingSlide(slide);
    } else {
      setNewSlide({
        title: '',
        description: '',
        imageFile: null,
        link: '',
        active: true,
        order: 0,
      });
    }
    setModalOpen(true);
  };

  return (
    <Container>
      <Title order={2} className="mb-4">
        Slides Management
      </Title>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Button onClick={() => openModal()} className="mb-6">
        Add New Slide
      </Button>

      {/* Slides Table */}
      {loading ? (
        <Loader />
      ) : (
        <Table striped highlightOnHover horizontalSpacing={'sm'} withTableBorder withRowBorders withColumnBorders>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Order</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slides.map((slide) => (
              <tr key={slide._id}>
                <td>
                  <Image src={slide.imageUrl} alt={slide.title} width={100} height={60} fit="contain" />
                </td>
                <td>{slide.title}</td>
                <td>{slide.description}</td>
                <td>{slide.order}</td>
                <td>{slide.active ? 'Yes' : 'No'}</td>
                <td>
                  <Group spacing="xs">
                    <ActionIcon color="blue" onClick={() => openModal(slide)} variant="light">
                      <FaEdit />
                    </ActionIcon>
                    <ActionIcon color="red" onClick={() => deleteSlide(slide._id)} variant="light">
                      <FiDelete />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal for Adding/Editing Slides */}
      <Modal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingSlide(null);
        }}
        title={editingSlide ? 'Edit Slide' : 'Add New Slide'}
      >
        <TextInput
          label="Title"
          name="title"
          placeholder="Enter slide title"
          value={editingSlide ? editingSlide.title : newSlide.title}
          onChange={handleInputChange}
          required
          className="mb-4"
        />
        <TextInput
          label="Description"
          name="description"
          placeholder="Enter slide description"
          value={editingSlide ? editingSlide.description : newSlide.description}
          onChange={handleInputChange}
          className="mb-4"
        />
        <FileInput
          label="Upload Image"
          placeholder="Choose an image"
          accept="image/*"
          onChange={handleFileChange}
          required={!editingSlide}
          className="mb-4"
        />
        <TextInput
          label="Link (Optional)"
          name="link"
          placeholder="Enter a link (optional)"
          value={editingSlide ? editingSlide.link : newSlide.link}
          onChange={handleInputChange}
          className="mb-4"
        />
        <Switch
          label="Active"
          checked={editingSlide ? editingSlide.active : newSlide.active}
          onChange={(e) =>
            editingSlide
              ? setEditingSlide({ ...editingSlide, active: e.target.checked })
              : setNewSlide({ ...newSlide, active: e.target.checked })
          }
          className="mb-4"
        />
        <NumberInput
          label="Order"
          name="order"
          placeholder="Enter display order"
          value={editingSlide ? editingSlide.order : newSlide.order}
          onChange={(value) =>
            editingSlide
              ? setEditingSlide({ ...editingSlide, order: value })
              : setNewSlide({ ...newSlide, order: value })
          }
          className="mb-4"
        />
        <div className="flex justify-end">
          <Button
            onClick={editingSlide ? updateSlide : addSlide}
            className="mr-4"
          >
            {editingSlide ? 'Update Slide' : 'Add Slide'}
          </Button>
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </Container>
  );
}
