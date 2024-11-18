import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from '@mantine/core';

export default function AnnouncementPanel() {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    content: "",
    links: [""],
  });
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/announcements");
      setAnnouncements(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingAnnouncement) {
      setEditingAnnouncement({ ...editingAnnouncement, [name]: value });
    } else {
      setNewAnnouncement({ ...newAnnouncement, [name]: value });
    }
  };

  const handleLinkChange = (index, value) => {
    const links = editingAnnouncement ? [...editingAnnouncement.links] : [...newAnnouncement.links];
    links[index] = value;

    if (editingAnnouncement) {
      setEditingAnnouncement({ ...editingAnnouncement, links });
    } else {
      setNewAnnouncement({ ...newAnnouncement, links });
    }
  };

  const addLinkField = () => {
    if (editingAnnouncement) {
      setEditingAnnouncement({ ...editingAnnouncement, links: [...editingAnnouncement.links, ""] });
    } else {
      setNewAnnouncement({ ...newAnnouncement, links: [...newAnnouncement.links, ""] });
    }
  };

  const removeLinkField = (index) => {
    const links = editingAnnouncement ? [...editingAnnouncement.links] : [...newAnnouncement.links];
    links.splice(index, 1);

    if (editingAnnouncement) {
      setEditingAnnouncement({ ...editingAnnouncement, links });
    } else {
      setNewAnnouncement({ ...newAnnouncement, links });
    }
  };

  const createAnnouncement = async () => {
    try {
      await axios.post("http://localhost:5000/announcements", newAnnouncement);
      setNewAnnouncement({ title: "", description: "", content: "", links: [""] });
      fetchAnnouncements();
      closeModal();
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

  const updateAnnouncement = async () => {
    try {
      await axios.put(`http://localhost:5000/announcements/${editingAnnouncement._id}`, editingAnnouncement);
      setEditingAnnouncement(null);
      fetchAnnouncements();
      closeModal();
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/announcements/${id}`);
      fetchAnnouncements();
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const openModal = (announcement = null) => {
    if (announcement) {
      setEditingAnnouncement(announcement);
    } else {
      setNewAnnouncement({ title: "", description: "", content: "", links: [""] });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingAnnouncement(null);
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
        className="border p-2 w-full my-2"
      />
      <input
        type="text"
        name="description"
        value={editingAnnouncement ? editingAnnouncement.description : newAnnouncement.description}
        onChange={handleInputChange}
        placeholder="Description"
        className="border p-2 w-full my-2"
      />
      <textarea
        name="content"
        value={editingAnnouncement ? editingAnnouncement.content : newAnnouncement.content}
        onChange={handleInputChange}
        placeholder="Content"
        className="border p-2 w-full my-2"
      />

      <h4 className="mt-4">Links</h4>
      {(editingAnnouncement ? editingAnnouncement.links : newAnnouncement.links).map((link, index) => (
        <div key={index} className="flex items-center my-2">
          <input
            type="text"
            value={link}
            onChange={(e) => handleLinkChange(index, e.target.value)}
            placeholder={`Link #${index + 1}`}
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
      <button onClick={addLinkField} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
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
        <p>Loading announcements...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement._id} className="border border-gray-300">
                <td className="border border-gray-300 p-2">{announcement.title}</td>
                <td className="border border-gray-300 p-2">{announcement.description}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => openModal(announcement)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAnnouncement(announcement._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded ml-2"
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
    <div className="p-6 bg-white dark:bg-neutral-900 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-semibold mb-4">Manage Announcements</h2>
      <button onClick={() => openModal()} className="bg-blue-500 text-white px-4 py-2 mb-4 rounded">
        Create New Announcement
      </button>
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
