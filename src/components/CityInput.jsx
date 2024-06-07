import React, { useState } from 'react';

const CityInput = ({ onCitySubmit }) => {
  const [city, setCity] = useState('');

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {  // Ensure the city input is not just whitespace
      onCitySubmit(city.trim());  // Call the parent function with the trimmed city name
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
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
    </form>
  );
};

export default CityInput;
