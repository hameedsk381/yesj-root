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
    <div className="max-w-5xl mx-auto">
      <div className="container overflow-hidden flex flex-col md:flex-row">
        <div className="p-6 md:p-10 flex-1 flex flex-col items-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 text-center">{announcement.title}</h2>
          {announcement.poster && (
            <img
              src={announcement.poster}
              alt="Announcement Poster"
              className="rounded-lg shadow-lg w-[300px] h-[400px]  mb-6 object-cover object-center transition-transform duration-300 hover:scale-105"
            />
          )}
          <div
            className="mt-12 mb-6 text-black text-lg   font-thin"
            dangerouslySetInnerHTML={{ __html: announcement.content }}
          />
         {announcement.links && announcement.links.length > 0 && (
            <div className="bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 mt-8 w-full shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-neutral-100 mb-3">
                Related Links
              </h4>
              <ul className="list-inside space-y-3">
                {announcement.links.map((link, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0"
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
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline transition duration-300 ease-in-out"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
 
      <div className="bg-gray-50 dark:bg-neutral-800 border-t border-gray-200 dark:border-neutral-700 px-6 py-4 mt-6 rounded-b-lg shadow-lg">
        <div className="text-gray-500 dark:text-neutral-300 text-sm text-center">
          <span>Posted on: {new Date(announcement.date).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
