import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import FilmsPage from './pages/films/FilmsPage';
import CustomerPage from './pages/customer/CustomerPage';
import Sidebar from './components/SideBar';

function App() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/films" element={<FilmsPage />} />
      </Routes>
    </>
  );
}

export default App;