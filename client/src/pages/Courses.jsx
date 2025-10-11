import React, { useEffect, useState } from 'react';
import { coursesService } from '../services';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await coursesService.getAll();
        setCourses(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Function to determine the correct image source
  const getImageSource = (imagePath) => {
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    // If it's a local path, prefix with the base URL
    return imagePath;
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Courses</h1>
      {courses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-700">No Courses Available</h3>
          <p className="text-gray-600 mt-2">Check back later for new courses.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src={getImageSource(course.image)} 
                alt={course.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h2>
                <p className="text-gray-700 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {course.category || 'General'}
                  </span>
                  <span className="text-gray-600 text-sm">
                    Duration: {course.duration || 'Not specified'}
                  </span>
                </div>
                {course.instructor && (
                  <p className="mt-3 text-gray-600">
                    <strong>Instructor:</strong> {course.instructor}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;