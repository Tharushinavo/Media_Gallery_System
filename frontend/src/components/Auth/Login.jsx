import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed: ' + err.response?.data?.message || err.message);
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '40px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      border: '1px solid #e1e5e9'
    },
    heading: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '30px',
      fontSize: '28px',
      fontWeight: '600',
      letterSpacing: '-0.5px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    input: {
      padding: '14px 16px',
      border: '2px solid #e1e5e9',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      outline: 'none',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    },
    button: {
      padding: '14px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '10px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    linkText: {
      textAlign: 'center',
      marginTop: '20px',
      color: '#666',
      fontSize: '14px'
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: '600'
    }
  };

  return (
    <div style={{
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Welcome Back</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={styles.input}
            onFocus={(e) => {
              e.target.style.borderColor = '#007bff';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e1e5e9';
              e.target.style.backgroundColor = '#f8f9fa';
              e.target.style.boxShadow = 'none';
            }}
          />
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={styles.input}
            onFocus={(e) => {
              e.target.style.borderColor = '#007bff';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e1e5e9';
              e.target.style.backgroundColor = '#f8f9fa';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button 
            type="submit" 
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#0056b3';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#007bff';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Sign In
          </button>
        </form>
        <p style={styles.linkText}>
          Don't have an account? <a href="/register" style={styles.link}>Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;