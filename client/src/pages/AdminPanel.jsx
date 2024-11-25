import React, { useState } from "react";
import {
  IconArrowLeft,
  IconBell,
  IconClipboardList,
  IconCalendar,
  IconMenu,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import background from "../assets/background-images/action-panel-background.png";

// Importing individual tab components
import AnnouncementsPanel from "../components/AnnouncementsPanel";
import CoursesPanel from "../components/CoursesPanel";
import EventsPanel from "../components/EventsPanel";

const Dashboard = () => (
  <div>
    <p>Welcome to the Admin Panel. Here you can manage announcements, courses, and events.</p>
    <p>Use the sidebar to navigate through different sections.</p>
  </div>
);

export function AdminPanel() {
  const [open, setOpen] = useState(true);
  const [navVisible, setNavVisible] = useState(false); 
  const location = useLocation(); 

  const links = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <IconBell className="text-neutral-900 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Announcements",
      href: "#announcements",
      icon: <IconBell className="text-neutral-900 h-5 w-5 flex-shrink-0" />,
      component: <AnnouncementsPanel />,
    },
    {
      label: "Courses",
      href: "#courses",
      icon: <IconClipboardList className="text-neutral-900 h-5 w-5 flex-shrink-0" />,
      component: <CoursesPanel />,
    },
    {
      label: "Events",
      href: "#events",
      icon: <IconCalendar className="text-neutral-900 h-5 w-5 flex-shrink-0" />,
      component: <EventsPanel />,
    },
    {
      label: "Logout",
      href: "/",
      icon: <IconArrowLeft className="text-neutral-900 h-5 w-5 flex-shrink-0" />,
      component: <Homepage />,
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col m-12 p-8 md:flex-row bg-white w-full flex-1 max-w-7xl mx-auto border border-neutral-300 overflow-hidden",
        "h-[90vh]"
      )}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize:"cover",
        backgroundImage: `url('https://img.freepik.com/free-photo/composition-bright-paper-origami_23-2148120224.jpg?t=st=1732087978~exp=1732091578~hmac=9ea165acd61dcd1c677456c702d55302370bf16f64158bdc6f85f4cb131045ab&w=1060')`,
      }}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div>
              <SidebarLink
                link={{
                  label: "Yesj",
                  href: "#",
                  icon: (
                    <img
                      src="https://yesj.org/assets/YESJ_Logo_Black-eaf43d27.png"
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  onClick={() => handleTabChange(link.label.toLowerCase())}
                />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1 p-4">
        <div className="flex flex-col w-full">
          <h2 className="text-lg font-semibold">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <div className="mt-4">
            <Routes>
              <Route  path="/dashboard" element={<Dashboard />} />
              <Route path="/announcements" element={<AnnouncementsPanel />} />
              <Route path="/courses" element={<CoursesPanel />} />
              <Route path="/events" element={<EventsPanel />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div
        className="h-5 w-6 bg-black rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </a>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div
        className="p-2 md:p-10 rounded-tl-2xl border border-neutral-300 bg-white flex flex-col gap-2 flex-1 w-full h-full"
      >
        <h2 className="text-lg font-semibold">Admin Panel Content</h2>
        <div className="flex gap-2">
          <p>
            Welcome to the Admin Panel. Here you can manage announcements, courses,
            and events.
          </p>
        </div>
        <div className="flex gap-2 flex-1">
          <p>Use the sidebar to navigate through different sections.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;