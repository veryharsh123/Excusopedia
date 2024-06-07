import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ExcuseCard from './ExcuseCard';
import axios from 'axios';
import Spinner from './spinner';
import CityInput from './CityInput';
import excusesData from '../data/excusesData'; // Import the excusesData
import { toast } from 'react-toastify';
const ExcuseGrid = () => {
  const [excuse, setExcuse] = useState(null);
  const [excuses, setExcuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('unbelievable');
  // Function to handle city input submission
  const handleCitySubmit = async (city) => {
    try {
      const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
      // Extract latitude and longitude from the response data
      const { latitude, longitude } = geoResponse.data.results[0];
      console.log(latitude, longitude);
      console.log(process.env.REACT_APP_OPENWEATHER_API_KEY);
      // Fetch daily weather forecast using OpenWeatherMap API
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=7&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`);
      console.log(weatherResponse.data.list[0].weather[0].main);
      const weatherForecast = weatherResponse.data.list[0].weather[0].main;

      // Map the weather condition to the corresponding excuses from excusesData
      let selectedExcuses = [];
      switch (weatherForecast) {
        case 'Thunderstorm':
          selectedExcuses = excusesData.Thunderstorm;
          break;
        case 'Drizzle':
        case 'Rain':
          selectedExcuses = excusesData.Rain;
          break;
        case 'Snow':
          selectedExcuses = excusesData.Snow;
          break;
        case 'Clear':
          selectedExcuses = excusesData.Clear;
          break;
        case 'Clouds':
          selectedExcuses = excusesData.Clouds;
          break;
        default:
          selectedExcuses = [];
      }

      // Select a random excuse from the selected set of excuses
      const randomIndex = Math.floor(Math.random() * selectedExcuses.length);
      const randomExcuse = selectedExcuses[randomIndex];

      // Update state with the selected excuse
      setExcuse(randomExcuse);
    } catch (error) {
      toast.error('Error fetching data. Please try again later.', error);
      console.error('Error fetching data:', error);
    }
  };
  const fetchExcuses = async (category, append = false) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://excuser-three.vercel.app/v1/excuse/${category}/4`);
      if (append) {
        setExcuses(prevExcuses => [...prevExcuses, ...response.data]);
      } else {
        setExcuses(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching the excuses', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExcuses(category);
  }, [category]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleRegenerate = () => {
    fetchExcuses(category);
  };
  const handleLoadMore = () => {
    fetchExcuses(category, true);
  };

  if (loading && excuses.length === 0) {
    return <Spinner/>;
  }

  return (
    <div className="text-center">
      <div className="mb-4 flex flex-wrap justify-center gap-2 space-x-2">
      <button
          onClick={() => handleCategoryChange('unbelievable')}
          className="mx-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 focus:outline-none">
          Unbelievable
        </button>
      <button
          onClick={() => handleCategoryChange('family')}
          className="mx-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 focus:outline-none">
          Family
        </button>
        <button
          onClick={() => handleCategoryChange('office')}
          className="mx-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 focus:outline-none">
          Office
        </button>
        <button
          onClick={() => handleCategoryChange('developers')}
          className="mx-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 focus:outline-none">
          Developers
        </button>
        <button
          onClick={() => handleCategoryChange('college')}
          className="mx-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 focus:outline-none">
          College
        </button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleRegenerate}
          className="mb-2">
          Regenerate
        </Button>
      </div>
      <Grid container spacing={3}>
        {excuses.map((excuse, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ExcuseCard excuse={excuse.excuse} excuseNumber={index+1}/>
          </Grid>
        ))}
      </Grid>
      <div className="mt-4">
        <Button variant="contained" color="secondary" onClick={handleLoadMore}>
          Load More
        </Button>
        </div>
        <div>
        <div className="max-w-6xl ml-12 my-4 flex items-center before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
        <p className="text-center mx-2">or</p>
        </div>
        <p>GET A CUSTOM EXCUSE BASED ON YOUR CITY'S WEATHER</p>
      <CityInput onCitySubmit={handleCitySubmit} />
      {excuse && (
        <div>
          <h1 className="font-extrabold text-2xl mb-2">Excuse:</h1>
          <p className="max-w-2xl mx-auto justify-center text-lg text-white mb-4 px-4 py-2 border rounded-lg shadow-md bg-black">{excuse}</p>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default ExcuseGrid;
