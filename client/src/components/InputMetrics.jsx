import React from 'react';
import { motion } from 'framer-motion';
import textbackground from "../assets/text-background.png"

const metrics = [
  { id: 1, label: 'Comprehensive Programmes', value: '10+', icon: '👥' },
  { id: 2, label: 'Youth Reached Out', value: '50,000+', icon: '📊' },
  { id: 3, label: 'Youth Leaders Trained', value: '3000+', icon: '💰' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const ImpactMetrics = () => {
  return (
    <section className="py-16 px-2 ">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12" style={{ backgroundImage: `url(${textbackground})`, backgroundClip:"text", color:'transparent'}}>
          Our Impact
        </h2>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
          className="grid grid-cols-3 gap-12"
        >
          {metrics.map((metric) => (
          <motion.div
          key={metric.id}
          variants={cardVariants}
          className="hover:text-rose-400 transform transition duration-300 ease-in-out"
        >
          <div className="text-2xl md:text-4xl  mb-2">{metric.icon}</div>
          <div className=" text-xl md:text-3xl font-extrabold mb-1">
            {metric.value}
          </div>
          <div className="text-sm md:text-lg font-medium">
            {metric.label}
          </div>
        </motion.div>
          
          ))}
        </motion.div>
      </div>
      
    </section>
  );
};

export default ImpactMetrics;
