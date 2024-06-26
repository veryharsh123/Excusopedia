import React, { useState } from 'react';

const CityInput = ({ onCitySubmit }) => {
  const [city, setCity] = useState('');

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) { 
      onCitySubmit(city.trim()); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center my-4">
      <input 
        type="text" 
        value={city} 
        onChange={handleChange} 
        placeholder="Enter your city..." 
        className="border p-2 rounded-md mr-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="mx-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 focus:outline-none">Submit</button>
    </form>
  );
};

export default CityInput;
