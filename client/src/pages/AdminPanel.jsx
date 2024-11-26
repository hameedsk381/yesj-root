import React, { useEffect, useState } from "react";
import {
  IconArrowLeft,
  IconBell,
  IconClipboardList,
  IconCalendar,
  IconMenu,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Link, Routes, Route, useLocation, Navigate } from "react-router-dom"; // Added Navigate for default route
import background from "../assets/background-images/action-panel-background.png";

// Importing individual tab components
import AnnouncementsPanel from "../components/AnnouncementsPanel";
import CoursesPanel from "../components/CoursesPanel";
import EventsPanel from "../components/EventsPanel";
import { VanishList } from "../components/Todo";

const Dashboard = () => (
  <div>
    <p>Welcome to the Admin Panel. Here you can manage announcements, courses, and events.</p>
    <p>Use the sidebar to navigate through different sections.</p>
  </div>
);

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "amdgfeb@19") {
      localStorage.setItem("isLoggedIn", "true"); // Store login state in localStorage
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <button type="submit" className="bg-rose-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export function AdminPanel() {
  const [open, setOpen] = useState(true);
  const [navVisible, setNavVisible] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true"); // Retrieve login state from localStorage
  const location = useLocation(); 

  const links = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <IconBell className="text-neutral-900 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Announcements",
      path: "/admin/announcements",
      icon: <IconBell className="text-neutral-900 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Courses",
      path: "/admin/courses",
      icon: <IconClipboardList className="text-neutral-900 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Events",
      path: "/admin/events",
      icon: <IconCalendar className="text-neutral-900 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Logout",
      path: "/",
      icon: <IconArrowLeft className="text-neutral-900 h-5 w-5 flex-shrink-0" />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login state from localStorage
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div
      className={cn(
        "rounded-md flex flex-col sm:p-8 md:flex-row bg-white w-full flex-1 mx-auto border border-neutral-300 overflow-hidden",
        "h-[100vh]"
      )}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${background})`,
        backgroundPositionX: "-230px",
      }}
    >
      <motion.header
        className="md:hidden sticky top-0 w-full p-3 border-b border-neutral-800 flex justify-between items-center"
      >
        <motion.div layout className="flex items-center gap-2">
          <img
            src="https://yesj.org/assets/YESJ_Logo_Black-eaf43d27.png"
            alt="Logo"
            className="h-10 w-10 rounded-full"
          />
        </motion.div>
        <button
          className="text-rose-800 p-2 rounded"
          onClick={() => setNavVisible(!navVisible)} 
        >
          <IconMenu className="h-6 w-6" />
        </button>
      </motion.header>

      {navVisible && (
        <motion.nav
          className="md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 shadow-lg p-4 space-y-4"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3 }}
        >
          {links.map((link, idx) => (
            <Link key={idx} to={link.path}>
              <motion.button
                layout
                className={`flex items-center p-2 w-full text-slate-500 hover:bg-slate-100 ${
                  location.pathname === link.path ? 'bg-rose-100 text-rose-800 font-bold' : ''
                }`}
                onClick={() => {
                  if (link.label === "Logout") handleLogout(); // Handle logout
                  setNavVisible(false); // Close nav when a tab is clicked
                }}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </motion.button>
            </Link>
          ))}
        </motion.nav>
      )}

      <motion.nav
        layout
        className="md:sticky top-0 md:h-screen md:shrink-0 md:border-r md:border-slate-900 md:p-2 hidden md:block"
        style={{
          width: open ? "225px" : "fit-content",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <motion.div layout className="flex items-center gap-2">
            <img
              src="https://yesj.org/assets/YESJ_Logo_Black-eaf43d27.png"
              alt="Logo"
              className="h-10 w-10 rounded-full"
            />
            {open && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
              >
                <span className="block text-xs font-semibold">YESJ Admin</span>
                <span className="block text-xs text-slate-500">Pro Plan</span>
              </motion.div>
            )}
          </motion.div>
        </div>
        <div className="space-y-2">
          {links.map((link, idx) => (
            <Link key={idx} to={link.path}>
              <motion.button
                layout
                className={`flex items-center p-2 w-full ${
                  location.pathname === link.path ? 'bg-rose-100 rounded text-rose-800' : ''
                }`}
              >
                {link.icon}
                {open && <span className="ml-2">{link.label}</span>}
              </motion.button>
            </Link>
          ))}
        </div>
        <button
            className="text-xs mt-5 bg-rose-200 text-rose-800 hover:bg-rose-800 hover:text-white px-2 py-1 rounded"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? "Close" : "Open"}
          </button>
      </motion.nav>

      <div className="flex flex-1 p-4">
        <div className="flex flex-col w-full">
          <h2 className="text-lg font-semibold">
            {window.location.pathname.split("/").pop().charAt(0).toUpperCase() + window.location.pathname.split("/").pop().slice(1)}
          </h2>
          <div className="mt-4">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/announcements" element={<AnnouncementsPanel />} />
              <Route path="/courses" element={<CoursesPanel />} />
              <Route path="/events" element={<EventsPanel />} />
              <Route path="/admin" element={<VanishList />} />
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} /> {/* Default route */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;