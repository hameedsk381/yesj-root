import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AnnouncementDetails() {
  const { id } = useParams(); // Get the announcement ID from the URL
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnnouncementById(id);
  }, [id]);

  const fetchAnnouncementById = async (announcementId) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://yesj.in/announcements/${announcementId}`);
      setAnnouncement(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching announcement:", err);
      setError("Announcement not found or an error occurred.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!announcement) {
    return <div className="p-6">No announcement found.</div>;
  }

  return (
    <div className="p-6 bg-white dark:bg-neutral-900 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-semibold mb-4">{announcement.title}</h2>
      <p className="text-lg mb-2"><strong>Description:</strong> {announcement.description}</p>
      <p className="mb-4"><strong>Content:</strong> {announcement.content}</p>
      {announcement.links && announcement.links.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Links:</h4>
          <ul className="list-disc ml-6">
            {announcement.links.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <small className="text-gray-500">
        Posted on: {new Date(announcement.date).toLocaleString()}
      </small>
    </div>
  );
}
