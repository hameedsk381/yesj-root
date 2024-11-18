import React from 'react';
import Header from './Header';

const HeroSection = () => {
  return (
    <div className="relative h-screen overflow-hidden">
 
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://static.vecteezy.com/system/resources/previews/016/465/804/mp4/silhouettes-flock-of-seagulls-over-the-sea-during-amazing-sky-video.mp4"
        autoPlay
        loop
        muted
        poster="YESJ_Logo_Black.png"
      >
        <source src="https://static.vecteezy.com/system/resources/previews/016/465/804/mp4/silhouettes-flock-of-seagulls-over-the-sea-during-amazing-sky-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-white text-3xl md:text-5xl lg:text-7xl font-extrabold drop-shadow-lg">
          Empowering Communities, Changing Lives
        </h1>
        <p className="text-white mt-4 max-w-xl text-base md:text-lg lg:text-2xl drop-shadow-md">
          Join us in our mission to create a better world for everyone.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="/donate" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full text-sm md:text-lg lg:text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition duration-300">
            Donate
          </a>
          <a href="/volunteer" className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full text-sm md:text-lg lg:text-lg font-semibold hover:from-green-600 hover:to-green-700 transition duration-300">
            Volunteer
          </a>
          <a href="/learn-more" className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full text-sm md:text-lg lg:text-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition duration-300">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
