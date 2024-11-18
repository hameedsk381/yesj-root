import React from 'react';

const ProgramCard = ({ program }) => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
      <img src={program.image} alt={program.title} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
      <p className="text-gray-700 mb-4">{program.description}</p>
      <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">{program.category}</span>
      <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full ml-2">{program.year}</span>
    </div>
  );
};

export default ProgramCard;
