import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Modal, Button, Image } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import OurMission from './components/OurMission';
import Programmes from './components/Programmes';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import CourseRegistrationForm from './components/CourseRegistrationForm';
import EventDetails from './components/EventDetails';
import YesjEchos from './components/YesjEchos';
import Contribute from './components/Contribute';

import 'leaflet/dist/leaflet.css';
import Courses from './pages/Courses';
import EventPage from './pages/Events';

// Admin components
import { AdminProvider } from './contexts/AdminContext';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminHome from './pages/AdminHome';
import AdminCarousel from './pages/AdminCarousel';
import AdminAnnouncements from './pages/AdminAnnouncements';
import AdminCourses from './pages/AdminCourses';
import AdminEvents from './pages/AdminEvents';
import AdminProgrammes from './pages/AdminProgrammes';
import AdminGallery from './pages/AdminGallery';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [firstVisit, setFirstVisit] = useState(false);
  const [courseModalOpened, { open: openCourseModal, close: closeCourseModal }] = useDisclosure(false);

  useEffect(() => {
    const visited = sessionStorage.getItem('visited');
    if (!visited) {
      setFirstVisit(true);
      sessionStorage.setItem('visited', 'true');
    }
  }, []);

  return (
    <AdminProvider>
      <Router>
        <div className="App bg-[#f9fafc]">
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/ourmission" element={<OurMission />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/contactus" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="event/:id" element={<EventDetails />} />
            <Route path="/yesjechoes" element={<YesjEchos />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/courses" element={<Courses />} />
            <Route path='/events' element={<EventPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }>
              <Route index element={<AdminHome />} />
              <Route path="dashboard" element={<AdminHome />} />
              <Route path="carousel" element={<AdminCarousel />} />
              <Route path="announcements" element={<AdminAnnouncements />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="programmes" element={<AdminProgrammes />} />
              <Route path="gallery" element={<AdminGallery />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;