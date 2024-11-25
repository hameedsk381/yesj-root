import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, TextInput, Textarea } from "@mantine/core";

const CoursesPanel = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pageLink: "",
    image: "",
    duration: "",
    category: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("https://server.yesj.in/courses");
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching courses. Please try again later.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://server.yesj.in/courses/${id}`);
      fetchCourses(); // Refresh the list after deletion
    } catch (err) {
      console.error("Error deleting course:", err);
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
        await axios.put(
          `https://server.yesj.in/courses/${editingCourse._id}`,
          formData
        );
      } else {
        await axios.post("https://server.yesj.in/courses", formData);
      }
      setModalOpen(false);
      fetchCourses(); // Refresh the list after submission
      setFormData({
        title: "",
        description: "",
        pageLink: "",
        image: "",
        duration: "",
        category: "",
      });
      setEditingCourse(null);
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between sm:flex-row flex-col items-center">
      <h1 className="text-2xl font-semibold mb-6">Courses</h1>
      <button onClick={() => setModalOpen(true)} className="w-fit bg-rose-200 hover:bg-rose-900 text-rose-800 font-semibold hover:text-white px-4 py-2 rounded">
        Add Course
      </button>
      </div>
      
      <table className="min-w-full table-auto border-collapse shadow-lg">
        <thead className="text-gray-700">
          <tr>
            <th className="p-3 text-left text-sm font-semibold">Title</th>
            <th className="p-3 text-left text-sm font-semibold">Description</th>
            <th className="p-3 text-left text-sm font-semibold">Category</th>
            <th className="p-3 text-center text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr
              key={course._id}
              className="hover:bg-gray-50 transition duration-300 ease-in-out border-t"
            >
              <td className="p-2 text-sm text-gray-900">{course.title}</td>
              <td className="p-2 text-sm text-gray-600">
                {course.description}
              </td>
              <td className="p-2 text-sm text-gray-600">{course.category}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => handleEdit(course)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded transition-all duration-200 ease-in-out"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 ml-2 rounded transition-all duration-200 ease-in-out"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCourse ? "Edit Course" : "Add Course"}
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
          <TextInput
            label="Page Link"
            value={formData.pageLink}
            onChange={(e) =>
              setFormData({ ...formData, pageLink: e.target.value })
            }
            required
          />
          <TextInput
            label="Image URL"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            required
          />
          <TextInput
            label="Duration"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            required
          />
          <TextInput
            label="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          />
          <Button type="submit" className="mt-4">
            {editingCourse ? "Update Course" : "Add Course"}
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default CoursesPanel;
