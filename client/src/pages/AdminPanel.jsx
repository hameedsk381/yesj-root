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
      icon: (
        <IconBell className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: <AnnouncementsPanel />,
    },
    {
      label: "Courses",
      href: "#courses",
      icon: (
        <IconClipboardList className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: <CoursesPanel />,
    },
    {
      label: "Events",
      href: "#events",
      icon: (
        <IconCalendar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: <EventsPanel />,
    },
    {
      label: "Logout",
      href: "/",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: <Homepage />,
    },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col m-12 p-8 md:flex-row bg-transparent dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto dark:border-neutral-700 overflow-hidden",
        "h-[90vh]"
      )}>
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
                      alt="Avatar" />
                  ),
                }} />
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
          <h2 className="text-lg font-semibold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          <div className="mt-4">
            {links.find(link => link.label.toLowerCase() === activeTab)?.component}
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
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div
        className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre">
        Acet Labs
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div
        className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </a>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div
        className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <h2 className="text-lg font-semibold">Admin Panel Content</h2>
        <div className="flex gap-2">
          <p>Welcome to the Admin Panel. Here you can manage announcements, courses, and events.</p>
        </div>
        <div className="flex gap-2 flex-1">
          <p>Use the sidebar to navigate through different sections.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
