import React from 'react';
import { useParams } from 'react-router-dom';
import events from '../data/events';
import { FaQuoteRight } from 'react-icons/fa';

function EventDetails() {
  const { id } = useParams();
  const event = events.find(event => event.id === parseInt(id));

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div>
     <div className='p-10 lg:px-28'>
     <h1 className="text-xl lg:text-4xl font-bold text-center text-red-500 mb-8">{event.title}</h1>
      <img src={event.imageUrl} alt={event.title} className="w-full h-full lg:h-[450px] object-cover mb-8 rounded-lg shadow-lg" />

      <Section title="Problem" content={event.problem} />
      <Section title="Solution" content={event.solution} />
      <Section title="Vision" content={event.vision} />
      <Section title="Mission" content={event.mission} />
      <Section title="Running of the Programs" content={event.runningOfProgram} />
      <Section title="Outcomes" content={event.outcomes} />

     

     </div>

     <div className="bg-gradient-to-r from-red-500 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-around items-center">
          {event.stats.map((stat, statIndex) => (
            <div key={statIndex} className="text-center px-4 py-6 flex flex-col">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{stat.count}</h3>
              <p className="text-lg md:text-xl text-white">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-red-500">Event Gallery</h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {event.imageList.map((image, imageIndex) => (
              <img
                key={imageIndex}
                src={image.imageUrl}
                alt={`Gallery Image ${imageIndex + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-red-500 to-blue-600 py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">What Our Participants Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {event.testimonials.map((testimonial, testimonialIndex) => (
            <div key={testimonialIndex} className="bg-white p-6 rounded-xl shadow-lg">
              <FaQuoteRight className="text-indigo-500 text-3xl mb-4" />
              <p className="text-gray-700 mb-6">{testimonial.quote}</p>
              <div className="flex items-center">
                <img src={testimonial.avatar} alt={`Participant ${testimonialIndex + 1}`} className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                  <p className="text-indigo-600 font-semibold">{testimonial.participant}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Section = ({ title, content }) => (
  <div className="mb-8 p-6 bg-white  rounded-lg transition-transform transform hover:scale-105">
    <h2 className="text-3xl text-center text-red-500 font-bold mb-4">{title}</h2>
    <ul className="list-disc list-inside space-y-2">
      {content.map((item, index) => (
        <li className="text-lg font-sans text-gray-800" key={index}>{item}</li>
      ))}
    </ul>
  </div>
);




export default EventDetails;
