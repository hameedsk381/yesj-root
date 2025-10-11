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
  Select, 
  NumberInput, 
  Switch, 
  ActionIcon,
  Modal,
  Alert
} from '@mantine/core';
import { IconPlus, IconEdit, IconTrash, IconAlertCircle } from '@tabler/icons-react';
import { coursesService } from '../services';

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pageLink: '',
    image: '',
    duration: '',
    category: '',
    level: '',
    instructor: '',
    isActive: true
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await coursesService.getAll();
      setCourses(data);
    } catch (err) {
      setError('Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (course = null) => {
    if (course) {
      setCurrentCourse(course);
      setFormData({
        title: course.title || '',
        description: course.description || '',
        pageLink: course.pageLink || '',
        image: course.image || '',
        duration: course.duration || '',
        category: course.category || '',
        level: course.level || '',
        instructor: course.instructor || '',
        isActive: course.isActive !== undefined ? course.isActive : true
      });
    } else {
      setCurrentCourse(null);
      setFormData({
        title: '',
        description: '',
        pageLink: '',
        image: '',
        duration: '',
        category: '',
        level: '',
        instructor: '',
        isActive: true
      });
    }
    setModalOpened(true);
  };

  const handleCloseModal = () => {
    setModalOpened(false);
    setCurrentCourse(null);
  };

  const handleInputChange = (field) => (value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      if (currentCourse) {
        // Update existing course
        await coursesService.update(currentCourse._id, formData);
      } else {
        // Create new course
        await coursesService.create(formData);
      }
      
      // Refresh the list
      fetchCourses();
      handleCloseModal();
    } catch (err) {
      setError('Failed to save course');
      console.error('Error saving course:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await coursesService.delete(id);
      fetchCourses();
    } catch (err) {
      setError('Failed to delete course');
      console.error('Error deleting course:', err);
    }
  };

  if (loading) {
    return (
      <div>
        <Title order={2} mb="xl">Manage Courses</Title>
        <Text>Loading courses...</Text>
      </div>
    );
  }

  return (
    <div>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Manage Courses</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={() => handleOpenModal()}>
          Add Course
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

      {courses.length === 0 ? (
        <Text>No courses found. Add your first course!</Text>
      ) : (
        <div>
          {courses.map((course) => (
            <Card key={course._id} shadow="sm" p="lg" mb="md" withBorder>
              <Group justify="space-between">
                <div style={{ flex: 1 }}>
                  <Text fw={500}>{course.title}</Text>
                  <Text size="sm" color="dimmed" mt="xs">{course.description}</Text>
                  <Text size="sm" mt="xs">Category: {course.category} | Level: {course.level}</Text>
                  <Text size="sm" mt="xs">Duration: {course.duration} | Instructor: {course.instructor}</Text>
                  <Text size="sm" mt="xs">Active: {course.isActive ? 'Yes' : 'No'}</Text>
                </div>
                <div style={{ width: 150, height: 100 }}>
                  <Image 
                    src={course.image} 
                    alt={course.title} 
                    withPlaceholder
                    height={100}
                  />
                </div>
                <Group>
                  <ActionIcon color="blue" onClick={() => handleOpenModal(course)}>
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon color="red" onClick={() => handleDelete(course._id)}>
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
        title={currentCourse ? "Edit Course" : "Add Course"}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            placeholder="Course title"
            value={formData.title}
            onChange={(event) => handleInputChange('title')(event.target.value)}
            required
            mb="sm"
          />
          
          <Textarea
            label="Description"
            placeholder="Course description"
            value={formData.description}
            onChange={(event) => handleInputChange('description')(event.target.value)}
            required
            minRows={3}
            mb="sm"
          />
          
          <TextInput
            label="Page Link"
            placeholder="/courses/course-name"
            value={formData.pageLink}
            onChange={(event) => handleInputChange('pageLink')(event.target.value)}
            required
            mb="sm"
          />
          
          <TextInput
            label="Image URL"
            placeholder="/website/image.jpg or https://example.com/image.jpg"
            value={formData.image}
            onChange={(event) => handleInputChange('image')(event.target.value)}
            required
            mb="sm"
          />
          
          <TextInput
            label="Duration"
            placeholder="e.g., 8 weeks"
            value={formData.duration}
            onChange={(event) => handleInputChange('duration')(event.target.value)}
            required
            mb="sm"
          />
          
          <Select
            label="Category"
            placeholder="Select category"
            value={formData.category}
            onChange={handleInputChange('category')}
            data={[
              { value: 'programming', label: 'Programming' },
              { value: 'design', label: 'Design' },
              { value: 'business', label: 'Business' },
              { value: 'marketing', label: 'Marketing' },
              { value: 'other', label: 'Other' }
            ]}
            required
            mb="sm"
          />
          
          <Select
            label="Level"
            placeholder="Select level"
            value={formData.level}
            onChange={handleInputChange('level')}
            data={[
              { value: 'beginner', label: 'Beginner' },
              { value: 'intermediate', label: 'Intermediate' },
              { value: 'advanced', label: 'Advanced' }
            ]}
            mb="sm"
          />
          
          <TextInput
            label="Instructor"
            placeholder="Instructor name"
            value={formData.instructor}
            onChange={(event) => handleInputChange('instructor')(event.target.value)}
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
              {currentCourse ? "Update Course" : "Add Course"}
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
}

export default AdminCourses;