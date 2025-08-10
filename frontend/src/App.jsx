import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import Profile from './pages/Profile'

const App = () => {
  const isLoggedIn = localStorage.getItem("token")
  return (
    <Routes>
      <Route path="/" element={
        isLoggedIn ? <Navigate to="/feed" /> : <Navigate to="/login" />
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/feed" element={isLoggedIn ? <Feed /> : <Navigate to="/login" />} />
      <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App