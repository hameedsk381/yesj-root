import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Image, Text, Button, Badge } from '@mantine/core';

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
      const response = await axios.get('https://server.yesj.in/courses');
      if (response.data && Array.isArray(response.data)) {
        organizeCoursesByCategory(response.data);
      } else {
        setError('Invalid response format from server.');
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Error fetching courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const organizeCoursesByCategory = (courses) => {
    const organizedCourses = courses.reduce((acc, course) => {
      const category = course.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(course);
      return acc;
    }, {});

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
            {categoryData.courses.map((course) => (
              <Card key={course._id} shadow="sm" padding="lg" radius="md" withBorder >
                <Card.Section>
                  <Image
                    src={course.image || 'default-image.png'}
                    alt={course.title || 'Course Image'}
                    height={200} // Fixed height
                    width="100%" // Full width
                    style={{ objectFit: 'fill' ,maxHeight:180 }} // Maintain aspect ratio and fill space
                  />
                </Card.Section>

                <Text weight={500} size="lg" mt="md">
                  {course.title || 'No Title'}
                </Text>

                {/* Description limited to two lines */}
                <Text
                  size="sm"
                  color="dimmed"
                  mt="sm"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    WebkitLineClamp: 2,
                    textOverflow: 'ellipsis',
                  }}
                >
                  {course.description || 'No Description'}
                </Text>

                <div className="mt-4">
                  {course.badges?.map((badge, index) => (
                    <Badge key={index} variant="outline" size="sm" color="blue" mr="xs">
                      {badge}
                    </Badge>
                  ))}
                </div>

                <Text size="sm" color="gray" mt="md">
                  Duration: {course.duration || 'N/A'}
                </Text>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  onClick={() => handleViewCourse(course._id)}
                >
                  View Course
                </Button>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Courses;
