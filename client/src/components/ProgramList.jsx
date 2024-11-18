import React from 'react';
import { FaEnvelope, FaRegFileAlt, FaQuoteRight } from 'react-icons/fa';
import EventDetails from './EventDetails';
import { Link } from 'react-router-dom';
import ProgramItemCard from './ProgramItemCard';
import ProgramsGrid from './ProgramsGrid';
import { Container } from '@mantine/core';
import bannerprogrammes from "../assets/banner-programmes.jpg"

const programsList = [
    {
      "id": 1,
      "imageUrl": "https://res.cloudinary.com/dwlbneeh4/image/upload/v1721121486/little-children-trick-treating-halloween_53876-49128_kxwrgn.jpg",
      "title": "PEP",
      "description": "Personal Enhancement Programme"
    },
    {
      "id": 2,
      "imageUrl": "https://res.cloudinary.com/dwlbneeh4/image/upload/v1721121486/little-children-trick-treating-halloween_53876-49128_kxwrgn.jpg",
      "title": "MAGIC",
      "description": "Men & Women Aiming Greater Initiative for Change"
    },
    {
      "id": 3,
      "imageUrl": "https://res.cloudinary.com/dwlbneeh4/image/upload/v1721121486/little-children-trick-treating-halloween_53876-49128_kxwrgn.jpg",
      "title": "MuST",
      "description": "Multi SKill Training"
    },
    {
      "id": 4,
      "imageUrl": "https://res.cloudinary.com/dwlbneeh4/image/upload/v1721121486/little-children-trick-treating-halloween_53876-49128_kxwrgn.jpg",
      "title": "SS",
      "description": "Summer Shapes"
    },
    {
      "id": 5,
      "imageUrl": "https://res.cloudinary.com/dwlbneeh4/image/upload/v1721121486/little-children-trick-treating-halloween_53876-49128_kxwrgn.jpg",
      "title": "Yuvotsavaalu",
      "description": "TES-J's Youth Festival"
    },
    {
      "id": 6,
      "imageUrl": "https://res.cloudinary.com/dwlbneeh4/image/upload/v1721121486/little-children-trick-treating-halloween_53876-49128_kxwrgn.jpg",
      "title": "VIP",
      "description": "Voluntary Immersion Programme"
    },
    {
      "id": 7,
      "imageUrl": "https://res.cloudinary.com/dwlbneeh4/image/upload/v1721121486/little-children-trick-treating-halloween_53876-49128_kxwrgn.jpg",
      "title": "SSP",
      "description": "Scholar Support Programme"
    },
    {
      "id": 8,
      "imageUrl": "https://res.cloudinary.com/dwlbneeh4/image/upload/v1721121486/little-children-trick-treating-halloween_53876-49128_kxwrgn.jpg",
      "title": "ET",
      "description": "Each One Teach Ten"
    },{
      "id": 9,
      "imageUrl": "https://res.cloudinary.com/dwlbneeh4/image/upload/v1721121486/little-children-trick-treating-halloween_53876-49128_kxwrgn.jpg",
      "title": "ET",
      "description": "Each One Teach Ten"
    }

  ]
  

const ProgramList = () => {
  return (
    <div className="bg-[#f9fafc] min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[100px] lg:h-full">
        <img src={bannerprogrammes} alt="Event" className="w-full h-full object-cover" />
       
      </div>

      {/* Event Cards */}

 <Container size={'xl'} py={'5%'}  >
 <ProgramsGrid/>
 </Container>

      {/* Newsletter Section */}
      {/* <div className="bg-gradient-to-r from-red-500 to-blue-600 py-16">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6 text-white">Stay Updated</h2>
          <form className="space-y-4">
            <input type="email" className="w-full p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="Enter your email" />
            <button type="submit" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-100 transition-colors duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </div> */}
    </div>
  );
};

export default ProgramList;