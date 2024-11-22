import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "@mantine/core";
import { Editor } from "react-quill"; // Importing React Quill editor
import "react-quill/dist/quill.snow.css"; // Importing Quill styles

export default function AnnouncementPanel() {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    content: "", // Rich text content
    links: [""],
    poster: "", // Added poster field
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
      const response = await axios.get("https://server.yesj.in/announcements");
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

  const handleContentChange = (content) => {
    if (editingAnnouncement) {
      setEditingAnnouncement({ ...editingAnnouncement, content });
    } else {
      setNewAnnouncement({ ...newAnnouncement, content });
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
      await axios.post("https://server.yesj.in/announcements", newAnnouncement);
      setNewAnnouncement({ title: "", description: "", content: "", links: [""], poster: "" });
      fetchAnnouncements();
      closeModal();
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

  const updateAnnouncement = async () => {
    try {
      await axios.put(`https://server.yesj.in/announcements/${editingAnnouncement._id}`, editingAnnouncement);
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
      setNewAnnouncement({ title: "", description: "", content: "", links: [""], poster: "" });
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
      <Editor
        value={editingAnnouncement ? editingAnnouncement.content : newAnnouncement.content}
        onChange={handleContentChange}
        theme="snow"
        style={{ height: '300px' }}
      />
      <input
        type="text"
        name="poster"
        value={editingAnnouncement ? editingAnnouncement.poster : newAnnouncement.poster}
        onChange={handleInputChange}
        placeholder="Poster Link"
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
        <table className="min-w-full">
          <thead>
            <tr>
              <th className=" p-2">Title</th>
              <th className=" p-2">Description</th>
              <th className=" p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement._id} className="border-t-2 ">
                <td className="text-center p-2">{announcement.title}</td>
                <td className="text-center p-2">{announcement.description}</td>
                <td className="text-center p-2">
                  <button
                    onClick={() => openModal(announcement)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAnnouncement(announcement._id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded ml-3"
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
      <h2 className="text-2xl font-semibold mb-4">Manage Announcements</h2>
      <button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-900 text-white px-4 py-2 mb-4 rounded">
        Create New Announcement
      </button>
      {renderAnnouncements()}
      <Modal opened={modalIsOpen} onClose={closeModal} title="Announcement Form">
        {renderForm()}
      </Modal>
    </div>
  );
}
