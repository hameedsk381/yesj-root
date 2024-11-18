import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, TextInput, Textarea } from '@mantine/core';

const CoursesPanel = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pageLink: '',
    image: '',
    duration: '',
    category: '',
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('https://server.yesj.in/courses');
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching courses. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://server.yesj.in/courses/${id}`);
      fetchCourses(); // Refresh the list after deletion
    } catch (err) {
      console.error('Error deleting course:', err);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData(course);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await axios.put(`https://server.yesj.in/courses/${editingCourse._id}`, formData);
      } else {
        await axios.post('https://server.yesj.in/courses', formData);
      }
      setModalOpen(false);
      fetchCourses(); // Refresh the list after submission
      setFormData({
        title: '',
        description: '',
        pageLink: '',
        image: '',
        duration: '',
        category: '',
      });
      setEditingCourse(null);
    } catch (err) {
      console.error('Error saving course:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-12">
      <h1 className="text-2xl font-semibold mb-6">Courses</h1>
      <Button onClick={() => setModalOpen(true)} className="mb-4">Add Course</Button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id}>
              <td className="border px-4 py-2">{course.title}</td>
              <td className="border px-4 py-2">{course.description}</td>
              <td className="border px-4 py-2">{course.category}</td>
              <td className="border px-4 py-2">
                <Button onClick={() => handleEdit(course)} className="text-blue-500">Edit</Button>
                <Button onClick={() => handleDelete(course._id)} className="text-red-500 ml-4">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title={editingCourse ? 'Edit Course' : 'Add Course'}>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <TextInput
            label="Page Link"
            value={formData.pageLink}
            onChange={(e) => setFormData({ ...formData, pageLink: e.target.value })}
            required
          />
          <TextInput
            label="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            required
          />
          <TextInput
            label="Duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
          <TextInput
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
          <Button type="submit" className="mt-4">{editingCourse ? 'Update Course' : 'Add Course'}</Button>
        </form>
      </Modal>
    </div>
  );
};

export default CoursesPanel;

