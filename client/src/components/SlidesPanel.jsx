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
  Title,Group
} from '@mantine/core';
import { FaEdit } from 'react-icons/fa';
import { FiDelete } from 'react-icons/fi';

export default function SlidesPanel() {
  const [slides, setSlides] = useState([]);
  const [newSlide, setNewSlide] = useState({
    title: '',
    description: '',
    imageUrl: '',
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
      const response = await axios.get('https://server.yesj.in/slides');
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

  // Add a new slide
  const addSlide = async () => {
    try {
      const response = await axios.post('https://server.yesj.in/slides', newSlide);
      setSlides([...slides, response.data]);
      setNewSlide({
        title: '',
        description: '',
        imageUrl: '',
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
    try {
      const response = await axios.put(`https://server.yesj.in/slides/${editingSlide._id}`, editingSlide);
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
      await axios.delete(`https://server.yesj.in/slides/${id}`);
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
        imageUrl: '',
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

      <Button  onClick={() => openModal()} className="mb-6">
        Add New Slide
      </Button>

      {/* Slides Table */}
      {loading ? (
        <Loader />
      ) : (
        <Table striped  highlightOnHover horizontalSpacing={'sm'} withTableBorder withRowBorders withColumnBorders>
          <Table.Th>
            <Table.Tr>
              <Table.Th>Image</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Order</Table.Th>
              <Table.Th>Active</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Th>
          <Table.Tbody>
            {slides.map((slide) => (
              <Table.Tr key={slide._id}>
                <Table.Td width={400}>
                 {slide.imageUrl}
                </Table.Td>
                <Table.Td>{slide.title}</Table.Td>
                <Table.Td>{slide.description}</Table.Td>
                <Table.Td>{slide.order}</Table.Td>
                <Table.Td>{slide.active ? 'Yes' : 'No'}</Table.Td>
                <Table.Td>
                  <Group spacing="xs">
                    <ActionIcon
                      color="blue"
                      onClick={() => openModal(slide)}
                      variant="light"
                    >
                     <FaEdit/>
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      onClick={() => deleteSlide(slide._id)}
                      variant="light"
                    >
                    <FiDelete/>
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
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
        <TextInput
          label="Image URL"
          name="imageUrl"
          placeholder="Enter image URL"
          value={editingSlide ? editingSlide.imageUrl : newSlide.imageUrl}
          onChange={handleInputChange}
          required
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
