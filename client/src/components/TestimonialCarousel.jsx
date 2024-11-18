import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteRight } from "react-icons/fa";
import { useMediaQuery } from "@mantine/hooks";
import team1 from "../assets/team-1.jpg";
import team2 from "../assets/team-2.jpg";

const testimonials = [
  {
    name: "John Doe",
    quote:
      "Volunteering here has been an amazing experience. Thisorking on self-improvement so that I can complain less and thank more.",
    image: team1,
    role: "Software Developer",
  },
  {
    name: "Jane Smith",
    quote:
      "Volunteering here has been an amazing experience. Thisorking on self-improvement so that I can complain less and thank more.",
    image: team2,
    role: "Software Developer",
  },
  {
    name: "Alice Johnson",
    quote:
      "Volunteering here has been an amazing experience. Thisorking on self-improvement so that I can complain less and thank more.",
    image: team1,
    role: "Software Developer",
  },
  {
    name: "Robert Brown",
    quote:
      "The opportunities provided here have been life-changing. I am incredibly thankful for the experiences and the community.",
    image: team2,
    role: "Software Engineer",
  },
];
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isMobile) {
      const autoplay = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(autoplay);
    }
  }, [isMobile]);

  // if (isMobile) {
  //   return (
  //     <section className="py-16 bg-[#f9fafc]">
  //       <div className="container mx-auto px-4 text-center">
  //         <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-800">
  //           Testimonials
  //         </h2>
  //         <div className="relative overflow-hidden h-64">
  //           <AnimatePresence initial={false}>
  //             {testimonials.map((testimonial, index) => (
  //               <motion.div
  //                 key={index}
  //                 className={
  //                   index === current
  //                     ? "absolute inset-0 flex flex-col items-center bg-gradient-to-r from-blue-400 to-teal-400 p-6 rounded-lg"
  //                     : "hidden"
  //                 }
  //                 initial={{ opacity: 0, scale: 0.8 }}
  //                 animate={{ opacity: 1, scale: 1 }}
  //                 exit={{ opacity: 0, scale: 0.8 }}
  //                 transition={{ duration: 0.5 }}
  //               >
  //                 <FaQuoteRight className="text-indigo-500 text-3xl mb-4" />
  //                 <q className="text-white  mb-6">{testimonial.quote}</q>
  //                 <div className="flex items-center">
  //                   <img
  //                     src={testimonial.image}
  //                     alt={`Participant ${index + 1}`}
  //                     className="w-16 h-16 rounded-full mr-4 object-cover"
  //                   />
  //                   <div>
  //                     <p className="text-indigo-600 font-semibold">
  //                       {testimonial.name}
  //                     </p>
  //                     <p className="text-gray-100 text-sm">
  //                       {testimonial.role}
  //                     </p>
  //                   </div>
  //                 </div>
  //               </motion.div>
  //             ))}
  //           </AnimatePresence>
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <div className="bg-[#f9fafc] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={!isMobile}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative overflow-hidden bg-gray-900 px-6 py-20 shadow-xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20 mb-8"
            >
              <img
                alt={testimonial.name}
                src={testimonial.image}
                className="absolute inset-0 w-full h-full object-cover brightness-100 saturate-1"
              />
              <div className="absolute inset-0 bg-gray-900/90 mix-blend-multiply" />
              <div
                aria-hidden="true"
                className="absolute -left-80 -top-56 transform-gpu blur-3xl"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                  className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-[0.45]"
                />
              </div>
              <div className="relative mx-auto max-w-2xl lg:mx-0">
                <img
                  alt=""
                  src="https://tailwindui.com/plus/img/logos/workcation-logo-white.svg"
                  className="h-12 w-auto"
                />
                <figure>
                  <blockquote className="mt-6 text-lg font-semibold text-white sm:text-xl/8">
                    <p>{testimonial.quote}</p>
                  </blockquote>
                  <figcaption className="mt-6 text-base text-white">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="mt-1">{testimonial.role}</div>
                  </figcaption>
                </figure>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
