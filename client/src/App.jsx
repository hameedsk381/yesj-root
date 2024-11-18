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
import AdminPanel from './pages/AdminPanel';
import AnnouncementDetails from './components/AnnouncementDetails';

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
    <Router>
      <Modal opened={firstVisit} onClose={() => setFirstVisit(false)} size="lg">
        <div className="text-center">
          <Image src="yesj_activity.png" alt="Poster" h={400}  style={{objectFit:'fill'}}/>
          <Button
            rightSection={<IconArrowRight size={14} />}
            onClick={() => {
              setFirstVisit(false);
              openCourseModal();
            }}
            className="mt-4"
          >
            Register for a course
          </Button>
        </div>
      </Modal>

      <Modal fullScreen opened={courseModalOpened} onClose={closeCourseModal}>
        <CourseRegistrationForm />
      </Modal>

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
          <Route path="announcement/:id" element={<AnnouncementDetails />} />
          <Route path="/yesjechoes" element={<YesjEchos />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/courses" element={<Courses />} />
          <Route path='/events'  element={<EventPage/>}/>
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
