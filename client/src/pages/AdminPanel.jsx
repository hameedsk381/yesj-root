import React, { useState } from "react";
import {
  IconArrowLeft,
  IconBell,
  IconClipboardList,
  IconCalendar,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from '../lib/utils';
import { Sidebar, SidebarBody, SidebarLink } from "../components/Sidebar";

// Importing individual tab components
import AnnouncementsPanel from "../components/AnnouncementsPanel";
import CoursesPanel from "../components/CoursesPanel";
import EventsPanel from "../components/EventsPanel";
import Homepage from "./Homepage";

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState("announcements");
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Announcements",
      href: "#announcements",
      icon: <IconBell className="text-neutral-900 h-5 w-5" />,
      component: <AnnouncementsPanel />,
    },
    {
      label: "Courses",
      href: "#courses",
      icon: <IconClipboardList className="text-neutral-900 h-5 w-5" />,
      component: <CoursesPanel />,
    },
    {
      label: "Events",
      href: "#events",
      icon: <IconCalendar className="text-neutral-900 h-5 w-5" />,
      component: <EventsPanel />,
    },
    {
      label: "Logout",
      href: "/",
      icon: <IconArrowLeft className="text-neutral-900 h-5 w-5" />,
      component: <Homepage />,
    },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={cn("flex flex-col md:flex-row m-4 md:m-8 bg-white rounded-lg shadow-lg w-full max-w-7xl mx-auto h-[90vh] overflow-hidden")}>
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="flex flex-col justify-between gap-4">
          <div className="flex flex-col flex-1 overflow-y-auto">
            <SidebarLink
              link={{
                label: "Yesj",
                href: "#",
                icon: (
                  <img
                    src="https://yesj.org/assets/YESJ_Logo_Black-eaf43d27.png"
                    className="h-8 w-8 rounded-full"
                    alt="Avatar"
                  />
                ),
              }}
            />
            <div className="mt-4 flex flex-col gap-2">
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
          <h2 className="text-xl font-bold text-gray-800">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <div className="mt-4">
            {links.find((link) => link.label.toLowerCase() === activeTab)?.component}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <a href="#" className="flex items-center space-x-2 text-sm text-black py-1">
      <div className="h-5 w-6 bg-black rounded-lg flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black"
      >
        Acet Labs
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a href="#" className="flex items-center space-x-2 text-sm text-black py-1">
      <div className="h-5 w-6 bg-black rounded-lg flex-shrink-0" />
    </a>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-4 md:p-8 rounded-lg border border-neutral-300 bg-white flex flex-col gap-4 flex-1 w-full h-full">
        <h2 className="text-lg font-semibold">Admin Panel Content</h2>
        <p>Welcome to the Admin Panel. Here you can manage announcements, courses, and events.</p>
        <p>Use the sidebar to navigate through different sections.</p>
      </div>
    </div>
  );
};

export default AdminPanel;
