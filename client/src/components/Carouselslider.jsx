import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@mantine/core';
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
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/slides'); // Replace with your API endpoint
        const data = await response.json();
        const formattedSlides = data.map((slide) => ({
          image: slide.imageUrl, // Ensure your API provides an image URL
          title: slide.title, // Title to display on the image
          description: slide.description, // Optional description for the image
          link: slide.link, // Optional button/link
        }));
        setSlides(formattedSlides);
      } catch (err) {
        console.error('Error fetching slides:', err);
        setError('Failed to load slides.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const autoplay = setInterval(() => {
      setCurrent(([prev]) => [(prev + 1) % slides.length, 1]);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoplay);
  }, [slides]);

  const paginate = (newDirection) => {
    setCurrent([current + newDirection, newDirection]);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-full text-red-500">{error}</div>;
  }

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
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover lg:rounded-3xl"
                />
                <div className="absolute inset-1  flex flex-col justify-start items-start  text-center text-white p-6 lg:p-10">
                  <h2 className="text-2xl md:text-4xl font-bold mb-4 bg-gray-700 p-5">{slide.title}</h2>
                  {/* <p className="text-lg md:text-xl mb-6">{slide.description}</p> */}
                  {slide.link && (
                    <a
                      href={slide.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow"
                    >
                      Learn More
                    </a>
                  )}
                </div>
              </div>
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
};

export default Carouselslider;
