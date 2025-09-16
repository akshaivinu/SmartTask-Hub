import React from 'react'
import Navbar from './components/Navbar'
import './index.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TaskPage from './pages/TaskPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AuthCheck from './components/authCheck'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'



const App = () => {

  const { data:authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await axios.get('/api/v1/auth/authcheck', { withCredentials: true });
        const data = res.data.data;
        if(data.error){
          return null;
        }
        if(res.status !== 200) {
          throw new Error(data.error);
        }
        return data;
      } catch (error) {
        console.log("Error checking authentication", error.message);
        throw error;
      }
    },
    retry: false
  })

  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/tasks" element={authUser ?  <TaskPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" />} />
        <Route path="/signup" element={ !authUser ? <SignupPage /> : <Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App