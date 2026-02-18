// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get token from localStorage
const getToken = () => localStorage.getItem('beeHiveToken');

// Helper function to set token
const setToken = (token) => localStorage.setItem('beeHiveToken', token);

// Helper function to remove token
const removeToken = () => localStorage.removeItem('beeHiveToken');

// API Functions
const API = {
  // Register new user
  register: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    
    // Save token
    setToken(data.token);
    localStorage.setItem('beeHiveUser', JSON.stringify(data.user));
    
    return data;
  },

  // Login user
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    
    // Save token
    setToken(data.token);
    localStorage.setItem('beeHiveUser', JSON.stringify(data.user));
    
    return data;
  },

  // Get current user
  getCurrentUser: async () => {
    const token = getToken();
    
    if (!token) {
      throw new Error('No token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to get user');
    }
    
    localStorage.setItem('beeHiveUser', JSON.stringify(data.user));
    
    return data.user;
  },

  // Update user profile
  updateProfile: async (updates) => {
    const token = getToken();
    
    if (!token) {
      throw new Error('No token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update profile');
    }
    
    localStorage.setItem('beeHiveUser', JSON.stringify(data.user));
    
    return data.user;
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    const token = getToken();
    
    if (!token) {
      throw new Error('No token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        current_password: currentPassword, 
        new_password: newPassword 
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to change password');
    }
    
    return data;
  },

  // Logout
  logout: () => {
    removeToken();
    localStorage.removeItem('beeHiveUser');
  }
};

// Export for use in HTML files
window.API = API;
