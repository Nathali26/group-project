import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './components/HomePage'
import Login from './components/Login'

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hotels from './components/Hotels';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        {/* //Navbar */}
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/hotels" element={<Hotels />} />
            
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App