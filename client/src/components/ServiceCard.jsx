import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const ServiceCard = ({ service }) => {
  return (
  <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className=" p-6 transform transition duration-300 ease-in-out hover:text-rose-400"
    >
      <div className="text-6xl mb-4">{service.icon}</div>
      <h3 className="text-2xl font-bold  mb-2">{service.title}</h3>
      <p className='mb-4'>{service.description}</p>
    </motion.div>
  );
};

export default ServiceCard;
