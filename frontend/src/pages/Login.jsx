import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import teal from '../assets/teal.avif';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userId', res.data.user.id); 
    localStorage.setItem('username', res.data.user.username); 
    setMsg('Login successful!');
    navigate('/feed');
  } catch (err) {
    setMsg(err.response?.data?.msg || 'Login failed');
  }
};

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#0e0f0ff6',
      color: '#e0e0e0'
    }}>
      <div style={{
        flex: 1,
        backgroundImage: `url(${teal})`,
backgroundSize: 'cover',
backgroundPosition: 'center',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>        <img 
          src={logo} 
          alt="Fluxxion Logo" 
          style={{
            width: '80px',
            height: '80px',
            marginRight: '1rem',
            objectFit: 'contain'
          }}
        />
        <h1 style={{ fontSize: '3rem', color: 'white' }}>Fluxxion</h1>
      </div>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem',
        maxWidth: '400px'
      }}>
        <h2 style={{ color: '#008080', marginBottom: '2rem' }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '1rem',
              borderRadius: '4px',
              border: '1px solid #333',
              backgroundColor: '#1e1e1e',
              color: '#e0e0e0'
            }}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '1rem',
              borderRadius: '4px',
              border: '1px solid #333',
              backgroundColor: '#1e1e1e',
              color: '#e0e0e0'
            }}
          />
          <button
            type='submit'
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#008080',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}
          >
            Login
          </button>
          <button onClick={() => navigate('/register')} style={{
            width: '30%',
            padding: '7px',
            backgroundColor: '#008080',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '1rem'
          }}>
            Register
          </button>
        </form>
        <p style={{ color: msg.includes('failed') ? '#ff3333' : '#4caf50' }}>{msg}</p>
      </div>
    </div>
  );
};

export default Login;