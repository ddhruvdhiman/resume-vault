import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Navbar loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={() => setLoggedIn(true)} />} />
        <Route
          path="/dashboard"
          element={loggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
