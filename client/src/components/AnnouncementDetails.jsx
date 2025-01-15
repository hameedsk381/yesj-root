import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spinner } from "./Spinner"; // Assuming you have a Spinner component

export default function AnnouncementDetails() {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncementById = async (announcementId) => {
      try {
        setLoading(true);
        const response = await axios.get(`https://server.yesj.in/announcements/${announcementId}`);
        setAnnouncement(response.data);
      } catch (err) {
        console.error("Error fetching announcement:", err);
        setError("Announcement not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncementById(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center p-6 text-red-500 text-lg">{error}</div>;
  }

  if (!announcement) {
    return <div className="flex justify-center p-6 text-gray-500 text-lg">No announcement found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <div className="bg-slate-200 border dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">
            {announcement.title}
          </h1>

          {/* Poster */}
          {announcement.poster && (
            <div className="mt-6 flex justify-center">
              <img
                src={announcement.poster}
                alt="Announcement Poster"
                className="rounded-lg shadow-md max-h-96 object-cover object-center"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="mt-8 text-gray-900 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: announcement.content }}
          />

          {/* Related Links */}
          {announcement.links && announcement.links.length > 0 && (
            <div className="mt-10 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-inner">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Related Links
              </h2>
              <ul className="space-y-3">
                {announcement.links.map((link, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 14.828a4 4 0 010-5.656m1.415-1.415a6 6 0 000 8.486m3.757-3.758a8 8 0 000-11.314M21 12.01v.01M2.457 12.001A9.99 9.99 0 0112 2.457m7.071 7.071a10 10 0 01-14.142 0m4.95 4.95a10 10 0 010-14.142"
                      />
                    </svg>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
          <p className="text-center text-gray-500 dark:text-gray-300 text-sm">
            Posted on: {new Date(announcement.date).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
