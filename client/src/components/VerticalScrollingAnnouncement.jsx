import { IconArrowForward } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { announcementsService } from '../services';

const VerticalScrollingAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for when no announcements are available
  const mockAnnouncements = [
    {
      id: 1,
      text: "Welcome to our platform! Check out our latest features.",
      link: "#",
      isNew: true
    },
    {
      id: 2,
      text: "New updates coming soon. Stay tuned for exciting changes!",
      link: "#",
      isNew: false
    },
    {
      id: 3,
      text: "Join our community events this weekend. Don't miss out!",
      link: "#",
      isNew: true
    }
  ];

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await announcementsService.getAll();
        setAnnouncements(data.length > 0 ? data : mockAnnouncements);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        // Use mock data when API call fails
        setAnnouncements(mockAnnouncements);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-32 flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const AnnouncementCard = ({ announcement, index }) => (
    <div className="text-center px-4">
      <div className="border border-gray-200 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 relative">
        {announcement.isNew && (
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            New
          </span>
        )}
        <p className="text-gray-800 mb-3 font-medium">{announcement.text}</p>
        <a
          href={announcement.link}
          className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors duration-200"
        >
          Read More
          <IconArrowForward className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-full bg-gray-50 overflow-hidden">
      <div className="pt-12 h-full overflow-auto relative">
        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="absolute top-0 w-full h-full animate-verticalScroll flex-col space-y-6">
            {announcements.map((announcement, index) => (
              <AnnouncementCard key={announcement._id || announcement.id || index} announcement={announcement} index={index} />
            ))}
          </div>
          <div className="absolute top-[120%] w-full h-full animate-verticalScroll flex-col space-y-6">
            {announcements.map((announcement, index) => (
              <AnnouncementCard key={`dup-${announcement._id || announcement.id || index}`} announcement={announcement} index={index} />
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <div className="absolute top-0 w-full h-full animate-verticalScroll flex-col space-y-6">
            {announcements.map((announcement, index) => (
              <div key={announcement._id || announcement.id || index} className="text-center px-4 py-2">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  {announcement.isNew && (
                    <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full mb-2">
                      New
                    </span>
                  )}
                  <p className="text-gray-800 mb-2">{announcement.text}</p>
                  <a
                    href={announcement.link}
                    className="inline-flex items-center text-red-600 hover:text-red-700"
                  >
                    Read More
                    <IconArrowForward className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-[120%] w-full h-full animate-verticalScroll flex-col space-y-6">
            {announcements.map((announcement, index) => (
              <div key={`dup-${announcement._id || announcement.id || index}`} className="text-center px-4 py-2">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  {announcement.isNew && (
                    <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full mb-2">
                      New
                    </span>
                  )}
                  <p className="text-gray-800 mb-2">{announcement.text}</p>
                  <a
                    href={announcement.link}
                    className="inline-flex items-center text-red-600 hover:text-red-700"
                  >
                    Read More
                    <IconArrowForward className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalScrollingAnnouncement;