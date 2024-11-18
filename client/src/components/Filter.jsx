import React from 'react';

const Filter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-between mb-8">
      <div>
        <label className="block text-gray-700">Year</label>
        <select name="year" onChange={handleChange} className="border border-gray-300 p-2 rounded">
          <option value="">All</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Category</label>
        <select name="category" onChange={handleChange} className="border border-gray-300 p-2 rounded">
          <option value="">All</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Community">Community</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Impact Area</label>
        <select name="impactArea" onChange={handleChange} className="border border-gray-300 p-2 rounded">
          <option value="">All</option>
          <option value="Local">Local</option>
          <option value="National">National</option>
          <option value="International">International</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
