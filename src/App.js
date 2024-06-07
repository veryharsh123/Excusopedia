import React from 'react';
import Container from '@mui/material/Container';
import ExcuseGrid from './components/ExcuseGrid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
function App() {
  return (
    <>
    <Container className="mx-auto p-4">
    <h1 className="text-center text-3xl font-bold mb-4">Excusopedia.</h1>
      <ExcuseGrid />
    </Container>
    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
