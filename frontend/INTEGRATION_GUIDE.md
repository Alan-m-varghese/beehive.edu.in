# Frontend Integration with Backend API

## Changes Required in index.html and dashboard.html

### 1. Add API Script to Both HTML Files

Add this line in the `<head>` section of both `index.html` and `dashboard.html`:

```html
<head>
  ...
  <!-- Add this line -->
  <script src="api.js"></script>
</head>
```

### 2. Update Sign Up Handler (index.html)

**OLD CODE (localStorage):**
```javascript
const handleSignUp = (name, email, password, confirmPassword) => {
  setAuthError('');
  
  // ... validation code ...
  
  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    createdAt: new Date().toISOString()
  };

  existingUsers.push(newUser);
  localStorage.setItem('beeHiveUsers', JSON.stringify(existingUsers));
  localStorage.setItem('beeHiveUser', JSON.stringify(userSession));
  
  window.location.href = 'dashboard.html';
};
```

**NEW CODE (API):**
```javascript
const handleSignUp = async (name, email, password, confirmPassword) => {
  setAuthError('');
  
  // Validation
  if (!name || !email || !password || !confirmPassword) {
    setAuthError('All fields are required');
    return false;
  }

  if (password.length < 6) {
    setAuthError('Password must be at least 6 characters');
    return false;
  }

  if (password !== confirmPassword) {
    setAuthError('Passwords do not match');
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setAuthError('Please enter a valid email');
    return false;
  }

  try {
    // Call API
    const data = await API.register(name, email, password);
    
    // Success - redirect to dashboard
    window.location.href = 'dashboard.html';
    return true;
    
  } catch (error) {
    setAuthError(error.message);
    return false;
  }
};
```

### 3. Update Sign In Handler (index.html)

**OLD CODE:**
```javascript
const handleSignIn = (email, password) => {
  // ... localStorage logic ...
  window.location.href = 'dashboard.html';
};
```

**NEW CODE:**
```javascript
const handleSignIn = async (email, password) => {
  setAuthError('');
  
  if (!email || !password) {
    setAuthError('Email and password are required');
    return false;
  }

  try {
    // Call API
    const data = await API.login(email, password);
    
    // Success - redirect to dashboard
    window.location.href = 'dashboard.html';
    return true;
    
  } catch (error) {
    setAuthError(error.message);
    return false;
  }
};
```

### 4. Update Authentication Check (dashboard.html)

**OLD CODE:**
```javascript
useEffect(() => {
  setIsLoaded(true);
  const loggedInUser = localStorage.getItem('beeHiveUser');
  if (loggedInUser) {
    setCurrentUser(JSON.parse(loggedInUser));
    setIsAuthenticated(true);
  }
}, []);
```

**NEW CODE:**
```javascript
useEffect(() => {
  const checkAuth = async () => {
    const token = localStorage.getItem('beeHiveToken');
    
    if (!token) {
      // No token - redirect to login
      window.location.href = 'index.html';
      return;
    }
    
    try {
      // Verify token and get user
      const user = await API.getCurrentUser();
      setCurrentUser(user);
      setIsAuthenticated(true);
      setIsLoaded(true);
    } catch (error) {
      // Token invalid or expired - redirect to login
      API.logout();
      window.location.href = 'index.html';
    }
  };
  
  checkAuth();
}, []);
```

### 5. Update Logout Handler (dashboard.html)

**OLD CODE:**
```javascript
const handleLogout = () => {
  localStorage.removeItem('beeHiveUser');
  setCurrentUser(null);
  setIsAuthenticated(false);
  setCurrentPage('landing');
};
```

**NEW CODE:**
```javascript
const handleLogout = () => {
  API.logout();
  window.location.href = 'index.html';
};
```

### 6. Update Profile Save Handler (dashboard.html)

Add this function to handle profile updates:

```javascript
const handleSaveProfile = async (updates) => {
  try {
    const updatedUser = await API.updateProfile(updates);
    setCurrentUser(updatedUser);
    alert('Profile updated successfully!');
  } catch (error) {
    alert('Failed to update profile: ' + error.message);
  }
};
```

Use it in your profile form:
```javascript
<button 
  className="btn-primary" 
  onClick={() => handleSaveProfile({ 
    name: nameInputRef.current.value,
    email: emailInputRef.current.value,
    bio: bioInputRef.current.value
  })}
>
  Save Changes
</button>
```

### 7. Update Password Change Handler (dashboard.html)

Add this function:

```javascript
const handleChangePassword = async (currentPassword, newPassword, confirmPassword) => {
  if (newPassword !== confirmPassword) {
    alert('New passwords do not match');
    return;
  }
  
  try {
    await API.changePassword(currentPassword, newPassword);
    alert('Password changed successfully!');
  } catch (error) {
    alert('Failed to change password: ' + error.message);
  }
};
```

---

## Complete Example: Updated Sign Up Form

```javascript
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const success = await handleSignUp(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmPassword
    );
    
    setLoading(false);
  };

  return (
    <div className={`page ${isLoaded ? 'loaded' : ''}`}>
      <Navigation />
      <div className="auth-content">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-title">Sign Up</h2>
          {authError && <div className="auth-error">{authError}</div>}
          
          <input 
            type="text" 
            placeholder="Enter Name" 
            className="auth-input"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            disabled={loading}
          />
          <input 
            type="email" 
            placeholder="Enter email" 
            className="auth-input"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            disabled={loading}
          />
          <input 
            type="password" 
            placeholder="Enter password (min 6 characters)" 
            className="auth-input"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            disabled={loading}
          />
          <input 
            type="password" 
            placeholder="Confirm password" 
            className="auth-input"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            disabled={loading}
          />
          
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <p className="auth-link">
            Already have an account? 
            <button type="button" onClick={() => setCurrentPage('signin')} className="link-button">
              Sign In
            </button>
          </p>
        </form>
        <HoneycombPattern />
      </div>
    </div>
  );
};
```

---

## Testing Checklist

- [ ] Backend server is running on http://localhost:5000
- [ ] Frontend can reach the API (check browser console for CORS errors)
- [ ] Registration creates a user in the database
- [ ] Login returns a JWT token
- [ ] Token is saved to localStorage
- [ ] Dashboard loads user data from API
- [ ] Profile updates work
- [ ] Password change works
- [ ] Logout clears token and redirects

---

## Common Issues

**CORS Error:**
```
Access to fetch at 'http://localhost:5000/api/auth/register' from origin 
'http://localhost:5500' has been blocked by CORS policy
```
**Fix:** Add your frontend URL to CORS origins in `app.py`

**401 Unauthorized:**
```
Token expired or invalid
```
**Fix:** User needs to log in again to get a new token

**Network Error:**
```
Failed to fetch
```
**Fix:** Make sure backend server is running on port 5000

---

## Next Steps

1. Update both HTML files with the new API calls
2. Start the backend server
3. Test registration → login → dashboard flow
4. Verify profile updates work
5. Test logout functionality

Your Bee Hive platform is now using a real backend! 🚀
