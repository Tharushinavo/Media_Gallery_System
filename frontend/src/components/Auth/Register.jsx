import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!email) {
      alert('Please enter your email first');
      return;
    }
    
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/send-otp', { email });
      setOtpSent(true);
      alert('OTP sent to your email! Check your inbox.');
    } catch (err) {
      alert('Failed to send OTP: ' + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password, otp });
      alert('Registration successful! Please login.');
      window.location.href = '/login';
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.message || err.message));
    }
    setLoading(false);
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
    inputDisabled: {
      backgroundColor: '#e9ecef',
      color: '#6c757d',
      cursor: 'not-allowed'
    },
    button: {
      padding: '14px',
      backgroundColor: '#28a745',
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
    otpButton: {
      padding: '14px',
      backgroundColor: '#17a2b8',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    buttonDisabled: {
      backgroundColor: '#6c757d',
      cursor: 'not-allowed'
    },
    successMessage: {
      padding: '12px 16px',
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb',
      borderRadius: '8px',
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '14px',
      fontWeight: '500'
    },
    stepIndicator: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px',
      gap: '10px'
    },
    step: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      color: 'white'
    },
    stepActive: {
      backgroundColor: '#17a2b8'
    },
    stepCompleted: {
      backgroundColor: '#28a745'
    },
    stepPending: {
      backgroundColor: '#dee2e6',
      color: '#6c757d'
    },
    linkText: {
      textAlign: 'center',
      marginTop: '20px',
      color: '#666',
      fontSize: '14px'
    },
    link: {
      color: '#28a745',
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
        <h2 style={styles.heading}>Create Account</h2>
        
        {/* Step Indicator */}
        <div style={styles.stepIndicator}>
          <div style={{
            ...styles.step,
            ...(otpSent ? styles.stepCompleted : styles.stepActive)
          }}>1</div>
          <div style={{
            ...styles.step,
            ...(otpSent ? styles.stepActive : styles.stepPending)
          }}>2</div>
        </div>

        {otpSent && (
          <div style={styles.successMessage}>
            ✓ OTP sent to {email}! Check your inbox and complete registration.
          </div>
        )}

        <form onSubmit={handleRegister} style={styles.form}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
            disabled={otpSent}
            style={{
              ...styles.input,
              ...(otpSent ? styles.inputDisabled : {})
            }}
            onFocus={(e) => {
              if (!otpSent) {
                e.target.style.borderColor = '#17a2b8';
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.boxShadow = '0 0 0 3px rgba(23, 162, 184, 0.1)';
              }
            }}
            onBlur={(e) => {
              if (!otpSent) {
                e.target.style.borderColor = '#e1e5e9';
                e.target.style.backgroundColor = '#f8f9fa';
                e.target.style.boxShadow = 'none';
              }
            }}
          />
          
          {!otpSent && (
            <button 
              type="button" 
              onClick={sendOtp}
              disabled={loading}
              style={{
                ...styles.otpButton,
                ...(loading ? styles.buttonDisabled : {})
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#138496';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(23, 162, 184, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#17a2b8';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          )}
          
          {otpSent && (
            <>
              <input 
                type="text" 
                placeholder="Enter the 6-digit OTP" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)} 
                required 
                maxLength="6"
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = '#28a745';
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e1e5e9';
                  e.target.style.backgroundColor = '#f8f9fa';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <input 
                type="password" 
                placeholder="Create a strong password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
                minLength="6"
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = '#28a745';
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e1e5e9';
                  e.target.style.backgroundColor = '#f8f9fa';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  ...styles.button,
                  ...(loading ? styles.buttonDisabled : {})
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#218838';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#28a745';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {loading ? 'Creating Account...' : 'Complete Registration'}
              </button>
            </>
          )}
        </form>
        
        <p style={styles.linkText}>
          Already have an account? <a href="/login" style={styles.link}>Sign in here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
