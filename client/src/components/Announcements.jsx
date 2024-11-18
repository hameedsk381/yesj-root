import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('/announcements');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading announcements...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Announcements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">{announcement.title}</h2>
            <p className="text-gray-700">{announcement.description}</p>
            <p className="text-gray-500 text-sm">{new Date(announcement.date).toLocaleDateString()}</p>
            <div className="mt-2">
              {announcement.links && announcement.links.map((link, index) => (
                <a key={index} href={link} className="text-blue-500 hover:underline">
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
