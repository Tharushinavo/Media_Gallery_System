// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import MediaGallery from './components/Gallery/MediaGallery';
import ImageUpload from './components/Gallery/ImageUpload';
import ImageDetail from './components/Gallery/ImageDetail';
import ZipDownload from './components/Gallery/ZipDownload';
import Profile from './components/User/Profile';
import UserManagement from './components/User/UserManagement';
import ContactForm from './components/Contact/ContactForm';
import AdminMessages from './components/Contact/AdminMessages';
import NotFound from './components/NotFound';
import Unauthorized from './components/Unauthorized';
import Navbar from './components/Navbar';

// Simple Error Boundary to catch errors in UI
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20 }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const isAuthenticated = () => !!localStorage.getItem('token');

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <ErrorBoundary>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
          <Route
            path="/gallery"
            element={<PrivateRoute><MediaGallery /></PrivateRoute>}
          />
          <Route
            path="/upload"
            element={<PrivateRoute><ImageUpload /></PrivateRoute>}
          />
          <Route
            path="/image/:id"
            element={<PrivateRoute><ImageDetail /></PrivateRoute>}
          />
          <Route
            path="/download"
            element={<PrivateRoute><ZipDownload /></PrivateRoute>}
          />
          <Route
            path="/profile"
            element={<PrivateRoute><Profile /></PrivateRoute>}
          />
          <Route
            path="/admin/users"
            element={<PrivateRoute><UserManagement /></PrivateRoute>}
          />
          <Route
            path="/contact"
            element={<PrivateRoute><ContactForm /></PrivateRoute>}
          />
          <Route
            path="/admin/messages"
            element={<PrivateRoute><AdminMessages /></PrivateRoute>}
          />

          {/* Error Pages */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
