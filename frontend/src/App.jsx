import React from 'react'
import Navbar from './components/Navbar'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TaskPage from './pages/TaskPage'


const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </>
  )
}

export default App