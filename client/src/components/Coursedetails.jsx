import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "@mantine/core";

const Coursedetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`https://server.yesj.in/courses/${id}`);
      setCourse(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching course details. Please try again later.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">{course.title}</h1>
      <p className="text-gray-600 mb-2"><strong>Description:</strong> {course.description}</p>
      <p className="text-gray-600 mb-2"><strong>Category:</strong> {course.category}</p>
      <p className="text-gray-600 mb-2"><strong>Duration:</strong> {course.duration}</p>
      <p className="text-gray-600 mb-2"><strong>Page Link:</strong> <a href={course.pageLink} target="_blank" rel="noopener noreferrer">{course.pageLink}</a></p>
      <img src={course.image} alt={course.title} className="w-full h-auto mb-4" />
      <Button onClick={() => window.history.back()} className="mt-4">Back to Courses</Button>
    </div>
  );
};

export default Coursedetails;
