import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ExcuseCard from './ExcuseCard';
import axios from 'axios';
import Spinner from './spinner';

const ExcuseGrid = () => {
  const [excuses, setExcuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('unbelievable');

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
          onClick={() => handleCategoryChange('children')}
          className="mx-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 focus:outline-none">
          Children
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
    </div>
  );
};

export default ExcuseGrid;
