import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Modal, Button, Image } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import ErrorPage from './pages/ErrorPage';
import OurMission from './components/OurMission';
import Programmes from './components/Programmes';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import EventDetails from './components/EventDetails';
import YesjEchos from './components/YesjEchos';
import Contribute from './components/Contribute';
import Courses from './pages/Courses';
import EventPage from './pages/Events';
import AdminPanel from './pages/AdminPanel';
import AnnouncementDetails from './components/AnnouncementDetails';
import Coursedetails from './components/Coursedetails';
import Event from './components/Event';

function AppWrapper() {
  const [firstVisit, setFirstVisit] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const visited = sessionStorage.getItem('visited');
    if (!visited) {
      setFirstVisit(true);
      sessionStorage.setItem('visited', 'true');
    }
  }, []);

  // Get current location to conditionally render Header and Footer
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App bg-[#f9fafc ]">
      <Modal opened={firstVisit} onClose={() => setFirstVisit(false)} size="lg">
        <div className="text-center">
          <Image src="yesj_activity.png" alt="Poster" h={400} style={{ objectFit: 'fill' }} />
          <Button
            rightSection={<IconArrowRight size={14} />}
            onClick={() => {
              setFirstVisit(false);
              navigate('/courses'); // Navigate to /courses when clicked
            }}
            className="mt-4"
          >
            Register for a course
          </Button>
        </div>
      </Modal>

      {/* Render Header and Footer only if not on the Admin route */}
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/ourmission" element={<OurMission />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="event/:id" element={<EventDetails />} />
        <Route path="events/:id" element={<Event />} />
        <Route path="announcement/:id" element={<AnnouncementDetails />} />
        <Route path="/yesjechoes" element={<YesjEchos />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/courses/:id" element={<Coursedetails />} />
        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminPanel />} /> {/* Use /* to handle nested routes */}
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;