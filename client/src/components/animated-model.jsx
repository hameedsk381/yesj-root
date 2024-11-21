import React from "react";
import { Modal, Button } from "@mantine/core";

export function CourseDetailsModal({ title, description, duration, courselink }) {
  const [opened, setOpened] = React.useState(false);

  const handleEnrollClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    window.location.href = courselink; // Navigate to the course link
  };

  return (
    <div className="flex items-center justify-center">
      <Button onClick={() => setOpened(true)}  className="flex bg-transparent justify-center group/modal-btn">
        <span className="text-center text-white transition duration-500">
          View Course 
        </span>
      </Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={title}
      >
        <div>
          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-4">
            {title}
          </h4>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4">
            {description}
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4">
            Duration: {duration}
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={() => setOpened(false)} className="w-28">
            Cancel
          </Button>
          <Button onClick={handleEnrollClick} className="bg-black text-white w-28">
            Enroll now
          </Button>
        </div>
      </Modal>
    </div>
  );
}
