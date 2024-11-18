import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BadgeCard } from '../components/BadgeCard';

const Courses = () => {
  const navigate = useNavigate();
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://yesj.in/courses');
      if (Array.isArray(response.data)) {
        organizeCoursesByCategory(response.data);
      } else {
        setError('Invalid data format received.');
      }
      setLoading(false);
    } catch (err) {
      setError('Error fetching courses. Please try again later.');
      setLoading(false);
    }
  };

  const organizeCoursesByCategory = (courses) => {
    // Group courses by their category
    const organizedCourses = courses.reduce((acc, course) => {
      const category = course.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(course);
      return acc;
    }, {});

    // Convert object to an array for easier rendering
    const categoriesArray = Object.keys(organizedCourses).map((category) => ({
      category,
      courses: organizedCourses[category],
    }));

    setCoursesData(categoriesArray);
  };

  const handleViewCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  if (loading) {
    return <div className="container mx-auto p-12 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-12 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-12">
      {coursesData.map((categoryData) => (
        <div key={categoryData.category} className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
            {categoryData.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.isArray(categoryData.courses) && categoryData.courses.map((course) => (
              <BadgeCard
                key={course._id}
                image={course.image}
                title={course.title}
                description={course.description}
                badges={course.badges}
                duration={course.duration}
                onClick={() => handleViewCourse(course._id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Courses;
