import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import Login from './components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        {/* //Navbar */}
      <div>
        <Routes>
          <Route path = "/" element = {<HomePage />}/>
          <Route path = "/Login" element = {<Login />}/>
        </Routes>
        </div>
      </div>
    </>
  )
}

export default App