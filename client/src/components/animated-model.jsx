import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./animated-modal";

export function CourseDetailsModal({ title, description, duration }) {
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center text-white transition duration-500">
            View Course 
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            📚
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-4">
              {title}
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4">
              {description}
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4">
              Duration: {duration}
            </p>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button
              className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
            >
              Cancel
            </button>
            <button
              className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
            >
              Enroll Now
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
