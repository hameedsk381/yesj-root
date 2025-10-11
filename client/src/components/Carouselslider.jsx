import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { carouselService } from '../services';

// Default images if no slides are available from the API
const defaultImages = [
  { image: '/website/IMG_5986.JPG', alt: 'Default slide 1' },
  { image: '/website/IMG_5999.JPG', alt: 'Default slide 2' },
  { image: '/website/IMG_6787.JPG', alt: 'Default slide 3' }
];

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
  const [slides, setSlides] = useState(defaultImages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await carouselService.getAll();
        if (data && data.length > 0) {
          // Map the API response to the format expected by the component
          const formattedSlides = data.map(slide => ({
            image: slide.image || slide.imageUrl,
            alt: slide.alt || slide.title || 'Carousel slide'
          }));
          setSlides(formattedSlides);
        }
      } catch (error) {
        console.error('Error fetching carousel slides:', error);
        // Use default images if API call fails
        setSlides(defaultImages);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    const autoplay = setInterval(() => {
      setCurrent(([prev]) => [(prev + 1) % slides.length, 1]);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoplay);
  }, [slides.length]);

  const paginate = (newDirection) => {
    setCurrent([current + newDirection, newDirection]);
  };

  // Function to determine the correct image source
  const getImageSource = (imagePath) => {
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    // If it's a local path, prefix with the base URL
    return imagePath;
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
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
              <img
                src={getImageSource(slide.image)}
                alt={slide.alt}
                className="w-full h-full object-fill"
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