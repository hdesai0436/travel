import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import { Outlet } from "react-router-dom";
import Hero from './components/Hero';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <Hero/>
      
    </>
  )
}

export default App
