import React from 'react';
import Container from '@mui/material/Container';
import ExcuseGrid from './components/ExcuseGrid';
import './App.css';
function App() {
  return (
    <Container className="mx-auto p-4">
    <h1 className="text-center text-3xl font-bold mb-4">Excusopedia</h1>
      <ExcuseGrid />
    </Container>
  );
}

export default App;
