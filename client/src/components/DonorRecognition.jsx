import React, { useEffect, useState } from "react";
import textbackground from "../assets/text-background.png";

// Dynamically import all images using Vite's import.meta.glob
const images = import.meta.glob('../assets/COLLABORATORS/*.{png,jpg,jpeg,svg}', { eager: true });

const DonorRecognition = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    // Extract the image paths and create an array of donor objects, sorted in descending order
    const donorList = Object.keys(images)
      .map((path) => ({
        logo: images[path].default || images[path],
        name: path.split('/').pop().split('.')[0] // Extract the file name without extension
      }))
      .sort((a, b) => b.name.localeCompare(a.name)); // Sort by name in descending order
    setDonors(donorList);
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-rose-600"
          style={{ backgroundImage: `url(${textbackground})`, backgroundClip: "text", color: 'transparent' }}
        >
          Our Collaborators
        </h2>
        <div className="flex flex-wrap justify-center m-auto gap-4 lg:gap-8 container max-w-6xl">
          {donors.map((donor, index) => (
            <img
              key={index}
              src={donor.logo}
              alt={donor.name}
              className="object-fill mx-2  w-18 h-12 md:w-38 md:h-20 mb-4"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonorRecognition;
