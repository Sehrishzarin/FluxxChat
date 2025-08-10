import { useState } from "react"
import axios from "axios"
import logo from '../assets/logo.png';
import teal from '../assets/teal.avif';

import { useNavigate } from "react-router-dom"

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await axios.post("http://localhost:5000/api/auth/register", form)
      navigate("/login")
    } catch (err) {
      if (err.response?.data?.msg) {
        setError(err.response.data.msg)
      } else {
        setError("Something went wrong.")
      }
    }
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#121212',
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
      }}>
                <img 
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
        <h2 style={{ color: '#008080', marginBottom: '2rem' }}>Register</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
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
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
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
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
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
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#008080',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Register
          </button>
          <button onClick={() => navigate('/login')} style={{
            width: '30%',
            marginTop: '1rem',
            padding: '7px',
            backgroundColor: '#008080',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '1rem'
          }}>
            Login
          </button>
        </form>
        {error && <p style={{ color: '#ff3333', marginTop: '1rem' }}>{error}</p>}
      </div>
    </div>
  )
}

export default Register