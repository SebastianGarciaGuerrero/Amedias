import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Signin' element={<SignIn />} />
        <Route path='/Profile' element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
