import React from 'react'
import { Link } from 'react-router-dom';

function ProgramItemCard(props) {
    const {programCardDetails} = props 
    const {id, title, description, imageUrl} = programCardDetails
  return (
   <Link to={`/event/${id}`}>
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
    <img
      src={imageUrl}
      alt={`Event ${id}`}
      className="w-full h-48 object-cover"
    />
    <div className="p-4 flex flex-col items-center justify-center">
      <h3 className="text-xl font-semibold mb-2 text-indigo-700">{title}</h3>
      <p className="text-gray-600 mb-4 text-center">{description}</p>
      <button className="bg-indigo-600 text-white px-8 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300">
        Learn More
      </button>
    </div>
    </div>
   </Link>
  )
}

export default ProgramItemCard
