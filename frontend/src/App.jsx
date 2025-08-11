import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import { Toaster } from 'react-hot-toast';
import Feed from './pages/Feed';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import "./App.css"; 
export default function App() {
  return (
   
      <AuthProvider>
        <PostProvider>
          <Toaster  position="top-right" />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </PostProvider>
      </AuthProvider>
    
  );
}