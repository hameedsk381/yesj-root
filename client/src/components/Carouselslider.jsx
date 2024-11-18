import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import textbackground from '../assets/text-background.png';

// Dynamically load all images using Vite's import.meta.glob
const images = import.meta.glob('../assets/website/*.{jpg,png,jpeg}', { eager: true });

// Create slides array with images only
const slides = Object.keys(images).map((path) => ({
  image: images[path].default || images[path],
}));

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const Carouselslider = () => {
  const [[current, direction], setCurrent] = useState([0, 0]);

  useEffect(() => {
    const autoplay = setInterval(() => {
      setCurrent(([prev]) => [(prev + 1) % slides.length, 1]);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoplay);
  }, []);

  const paginate = (newDirection) => {
    setCurrent([current + newDirection, newDirection]);
  };

  return (
    <div className="w-full h-full overflow-hidden relative">
      <AnimatePresence initial={false} custom={direction}>
        {slides.map((slide, index) => (
          index === current && (
            <motion.div
              key={index}
              className="w-full h-full absolute top-0 left-0"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-fill lg:rounded-3xl"
              />
            </motion.div>
          )
        ))}
      </AnimatePresence>
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 md:h-4 md:w-4 rounded-full ${index === current ? 'bg-blue-500' : 'bg-gray-400'}`}
            onClick={() => paginate(index - current)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carouselslider;
