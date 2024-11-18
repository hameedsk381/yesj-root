import React from 'react';
import ContactForm from './ContactForm';
import Chatbot from './Chatbot';
import LocationMap from './LocationMap';

const ContactSection = () => {
  return (
    <section className=" py-16" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Contact Us</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <LocationMap />
          </div>
        </div>
      </div>
      <Chatbot />
    </section>
  );
};

export default ContactSection;
