import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from '@mantine/core';
import ReactQuill from 'react-quill'; // Import Quill
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

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

  const handleContentChange = (value) => {
    if (editingAnnouncement) {
      setEditingAnnouncement({ ...editingAnnouncement, content: value });
    } else {
      setNewAnnouncement({ ...newAnnouncement, content: value });
    }
  };

  const handleLinkChange = (index, value) => {
    const links = editingAnnouncement
      ? [...editingAnnouncement.links]
      : [...newAnnouncement.links];
    links[index] = value;

    if (editingAnnouncement) {
      setEditingAnnouncement({ ...editingAnnouncement, links });
    } else {
      setNewAnnouncement({ ...newAnnouncement, links });
    }
  };

  const addLinkField = () => {
    if (editingAnnouncement) {
      setEditingAnnouncement({
        ...editingAnnouncement,
        links: [...editingAnnouncement.links, ""],
      });
    } else {
      setNewAnnouncement({
        ...newAnnouncement,
        links: [...newAnnouncement.links, ""],
      });
    }
  };

  const removeLinkField = (index) => {
    const links = editingAnnouncement
      ? [...editingAnnouncement.links]
      : [...newAnnouncement.links];
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
  };

  const renderForm = () => (
    <div className="my-4">
      <h3 className="text-lg font-semibold">
        {editingAnnouncement ? "Edit Announcement" : "New Announcement"}
      </h3>
      <input
        type="text"
        name="title"
        value={
          editingAnnouncement
            ? editingAnnouncement.title
            : newAnnouncement.title
        }
        onChange={handleInputChange}
        placeholder="Title"
        className="border p-2 w-full my-2"
      />
      <input
        type="text"
        name="description"
        value={
          editingAnnouncement
            ? editingAnnouncement.description
            : newAnnouncement.description
        }
        onChange={handleInputChange}
        placeholder="Description"
        className="border p-2 w-full my-2"
      />
      <textarea
        name="content"
        value={
          editingAnnouncement
            ? editingAnnouncement.content
            : newAnnouncement.content
        }
        onChange={handleInputChange}
        placeholder="Content"
        className="border p-2 w-full my-2"
      />
      <input
        type="text"
        name="poster"
        value={
          editingAnnouncement
            ? editingAnnouncement.poster
            : newAnnouncement.poster
        }
        onChange={handleInputChange}
        placeholder="Poster Link"
        className="border p-2 w-full my-2"
      />

      <h4 className="mt-4">Links</h4>
      {(editingAnnouncement
        ? editingAnnouncement.links
        : newAnnouncement.links
      ).map((link, index) => (
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
        <div className="relative" style={{height:'100vh'}}>
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(https://img.freepik.com/free-photo/portrait-attractive-couple-denim-jackets-with-motorbike-near-big-glass-building-city-centre_613910-3737.jpg?t=st=1732554437~exp=1732558037~hmac=7155db28023147263520780cd0045b90b24eb673a54567487c5c3820af8c3b81&w=996)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div
          style={{ background:"white" }}
          className="absolute inset-0 animate-pulse z-10"
        />
        <span
          className="font-black absolute inset-0 z-20 text-center bg-clip-text text-transparent pointer-events-none"
          style={{
            backgroundImage: `url(https://img.freepik.com/free-photo/portrait-attractive-couple-denim-jackets-with-motorbike-near-big-glass-building-city-centre_613910-3737.jpg?t=st=1732554437~exp=1732558037~hmac=7155db28023147263520780cd0045b90b24eb673a54567487c5c3820af8c3b81&w=996)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            fontSize: "clamp(3rem, 12vw, 10rem)",
            lineHeight: '100vh',
          }}
        >
          Loading...
        </span>
      </div>
      ) : (
        <table className="w-full table-auto border-collapse shadow-lg">
          <thead className=" text-gray-700">
            <tr>
              <th className="p-4 text-left text-sm font-semibold ">Title</th>
              <th className="p-4 text-left text-sm font-semibold ">
                Description
              </th>
              <th className="p-4 text-center text-sm font-semibold ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr
                key={announcement._id}
                className="hover:bg-gray-50 transition duration-300 ease-in-out border-b"
              >
                <td className="p-4 text-sm text-gray-900">
                  {announcement.title}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {announcement.description}
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => openModal(announcement)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAnnouncement(announcement._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded ml-3 transition-all duration-200 ease-in-out transform hover:scale-105"
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
      <div className="flex flex-col gap-4 lg:flex-row justify-between content-center itemss-center">
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
