
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from '@mantine/core';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AnnouncementPanel() {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    content: "",
    links: [""],
    poster: "",
  });
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://server.yesj.in/announcements");
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };
  const validateForm = () => {
    const announcement = editingAnnouncement || newAnnouncement; // Validate based on the current announcement
    const newErrors = {};
    
    if (!announcement.title) newErrors.title = "Title is required.";
    if (!announcement.description) newErrors.description = "Description is required.";
    if (!announcement.content) newErrors.content = "Content is required.";
    if (announcement.links.some(link => link && !link.trim())) newErrors.links = "All links must be valid if provided.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const announcement = editingAnnouncement || newAnnouncement;
    const updatedAnnouncement = { ...announcement, [name]: value };
    editingAnnouncement ? setEditingAnnouncement(updatedAnnouncement) : setNewAnnouncement(updatedAnnouncement);
  };

  const handleContentChange = (value) => {
    const announcement = editingAnnouncement || newAnnouncement;
    const updatedAnnouncement = { ...announcement, content: value };
    editingAnnouncement ? setEditingAnnouncement(updatedAnnouncement) : setNewAnnouncement(updatedAnnouncement);
  };

  const handleLinkChange = (index, value) => {
    const announcement = editingAnnouncement || newAnnouncement;
    const links = [...announcement.links];
    links[index] = value;
    const updatedAnnouncement = { ...announcement, links };
    editingAnnouncement ? setEditingAnnouncement(updatedAnnouncement) : setNewAnnouncement(updatedAnnouncement);
  };

  const addLinkField = () => {
    const announcement = editingAnnouncement || newAnnouncement;
    const updatedAnnouncement = { ...announcement, links: [...announcement.links, ""] };
    editingAnnouncement ? setEditingAnnouncement(updatedAnnouncement) : setNewAnnouncement(updatedAnnouncement);
  };

  const removeLinkField = (index) => {
    const announcement = editingAnnouncement || newAnnouncement;
    const links = [...announcement.links];
    links.splice(index, 1);
    const updatedAnnouncement = { ...announcement, links };
    editingAnnouncement ? setEditingAnnouncement(updatedAnnouncement) : setNewAnnouncement(updatedAnnouncement);
  };

  const createAnnouncement = async () => {
    if (!validateForm()) return;

    try {
      await axios.post("https://server.yesj.in/announcements", newAnnouncement);
      setNewAnnouncement({
        title: "",
        description: "",
        content: "",
        links: [""],
        poster: "",
      });
      fetchAnnouncements();
      closeModal();
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

  const updateAnnouncement = async () => {
    if (!validateForm()) return;

    try {
      await axios.put(
        `https://server.yesj.in/announcements/${editingAnnouncement._id}`,
        editingAnnouncement
      );
      setEditingAnnouncement(null);
      fetchAnnouncements();
      closeModal();
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      await axios.delete(`https://server.yesj.in/announcements/${id}`);
      fetchAnnouncements();
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const openModal = (announcement = null) => {
    if (announcement) {
      setEditingAnnouncement(announcement);
    } else {
      setNewAnnouncement({
        title: "",
        description: "",
        content: "",
        links: [""],
        poster: "",
      });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingAnnouncement(null);
    setErrors({});
  };

  const renderForm = () => (
    <div className="my-4">
      <h3 className="text-lg font-semibold">
        {editingAnnouncement ? "Edit Announcement" : "New Announcement"}
      </h3>
      <input
        type="text"
        name="title"
        value={editingAnnouncement ? editingAnnouncement.title : newAnnouncement.title}
        onChange={handleInputChange}
        placeholder="Title"
        className={`border p-2 w-full my-2 ${errors.title ? 'border-red-500' : ''}`}
      />
      {errors.title && <p className="text-red-500">{errors.title}</p>}

      <input
        type="text"
        name="description"
        value={editingAnnouncement ? editingAnnouncement.description : newAnnouncement.description}
        onChange={handleInputChange}
        placeholder="Description"
        className={`border p-2 w-full my-2 ${errors.description ? 'border-red-500' : ''}`}
      />
      {errors.description && <p className="text-red-500">{errors.description}</p>}

      <ReactQuill
        value={editingAnnouncement ? editingAnnouncement.content : newAnnouncement.content}
        onChange={handleContentChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["code-block"],
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "list",
          "bullet",
          "align",
          "link",
          "image",
          "video",
          "code-block",
        ]}
        placeholder="Content"
        className={`border p-2 w-full my-2 ${errors.content ? 'border-red-500' : ''}`}
      />
      {errors.content && <p className="text-red-500">{errors.content}</p>}

      <input
  type="text"
  name="poster"
  value={editingAnnouncement ? editingAnnouncement.poster : newAnnouncement.poster}
  onChange={handleInputChange}
  placeholder="Poster Link (optional)"
  className="border p-2 w-full my-2"
/>


      <h4 className="mt-4">Links (optional)</h4>
      {(editingAnnouncement?.links || newAnnouncement.links).map((link, index) => (
        <div key={index} className="flex items-center my-2">
          <input
            type="text"
            value={link}
            onChange={(e) => handleLinkChange(index, e.target.value)}
            placeholder={`Link #${index + 1} (optional)`}
            className="border p-2 w-full"
          />
          <button
            onClick={() => removeLinkField(index)}
            className="ml-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      {errors.links && <p className="text-red-500">{errors.links}</p>}

      <button
        onClick={addLinkField}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        Add Link
      </button>
      <button
        onClick={editingAnnouncement ? updateAnnouncement : createAnnouncement}
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
      >
        {editingAnnouncement ? "Update Announcement" : "Create Announcement"}
      </button>
      {editingAnnouncement && (
        <button
          onClick={() => setEditingAnnouncement(null)}
          className="bg-red-500 text-white px-4 py-2 mt-2 ml-2 rounded"
        >
          Cancel
        </button>
      )}
    </div>
  );

  const renderAnnouncements = () => (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Announcements</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full table-auto border-collapse shadow-lg">
          <thead className="text-gray-700">
            <tr>
              <th className="p-4 text-left text-sm font-semibold">Title</th>
              <th className="p-4 text-left text-sm font-semibold">Description</th>
              <th className="p-4 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr
                key={announcement._id}
                className="hover:bg-gray-50 transition duration-300 ease-in-out border-b"
              >
                <td className="p-4 text-sm text-gray-900">{announcement.title}</td>
                <td className="p-4 text-sm text-gray-600">{announcement.description}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => openModal(announcement)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAnnouncement(announcement._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded ml-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div className="py-6 w-full">
      <div className="flex flex-col gap-4 lg:flex-row justify-between content-center items-center">
        <h2 className="text-2xl font-semibold">Manage Announcements</h2>
        <button
          onClick={() => openModal()}
          className="w-fit bg-rose-200 hover:bg-rose-900 text-rose-800 font-semibold hover:text-white px-4 py-2 rounded"
        >
          Create New Announcement
        </button>
      </div>

      {renderAnnouncements()}
      <Modal
        opened={modalIsOpen}
        onClose={closeModal}
        title="Announcement Form" 
      >
        {renderForm()}
      </Modal>
    </div>
  );
}
