import React from 'react';
import ServiceCard from './ServiceCard';
import textbackground from "../assets/text-background.png"


const services = [
  {
    id: 1,
    title: 'Internships',
    description: 'We provide internships to help individuals gain practical experience in their field of interest.',
    icon: '💼',
  },
  {
    id: 2,
    title: 'Training for Trainers',
    description: 'Our program equips trainers with the necessary skills to effectively teach and mentor others.',
    icon: '🎓',
  },
  {
    id: 3,
    title: 'Computer Trainings',
    description: 'Offering courses on various computer skills to enhance digital literacy.',
    icon: '💻',
  },
  {
    id: 4,
    title: 'Language Courses',
    description: 'Providing language courses to help individuals communicate effectively in different languages.',
    icon: '🗣️',
  },
  {
    id: 5,
    title: 'Workshops & Seminars',
    description: 'Organizing workshops and seminars on various topics to foster learning and development.',
    icon: '📅',
  },
  {
    id: 6,
    title: 'Vocational Training',
    description: 'Providing vocational training to equip individuals with the skills needed for specific trades.',
    icon: '🔧',
  },
  {
    id: 7,
    title: 'Community Development',
    description: 'Working on community development projects to improve the quality of life for local communities.',
    icon: '🏘️',
  },
  {
    id: 8,
    title: 'Placement Assistance',
    description: 'Offering placement assistance to help individuals find suitable job opportunities.',
    icon: '📈',
  },
  {
    id: 9,
    title: 'Counseling Services',
    description: 'Providing counseling services to support mental health and well-being.',
    icon: '🧠',
  },
  {
    id: 10,
    title: 'Abroad Consultancy',
    description: 'Offering consultancy services for individuals seeking to study or work abroad.',
    icon: '🌍',
  },
];

const ServicesOverview = () => {
  return (
    <section className="py-16 px-8 ">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-800" style={{ backgroundImage: `url(${textbackground})`, backgroundClip:"text", color:'transparent'}}>
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
