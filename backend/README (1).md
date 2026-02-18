# Bee Hive Backend Setup Guide

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- PostgreSQL 12+
- pip

### 1. Database Setup

**Install PostgreSQL:**
```bash
# macOS
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/
```

**Create Database:**
```bash
# Login to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE beehive;
CREATE USER beehive_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE beehive TO beehive_user;
\q
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
nano .env
```

**Update .env file:**
```
DATABASE_URL=postgresql://beehive_user:your_password@localhost:5432/beehive
JWT_SECRET_KEY=generate-a-random-secret-key-here
```

### 3. Run the Backend

```bash
python app.py
```

Server runs on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd ../frontend

# Update api.js if needed (API_BASE_URL)
# Open index.html with Live Server or any web server
```

---

## 📡 API Endpoints

### Public Endpoints

**POST /api/auth/register**
```json
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "User registered successfully",
  "token": "eyJ0eXAiOiJKV1QiLCJh...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-02-16T10:30:00"
  }
}
```

**POST /api/auth/login**
```json
Request:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJ0eXAiOiJKV1QiLCJh...",
  "user": { ... }
}
```

### Protected Endpoints (Require JWT Token)

**GET /api/auth/me**
```bash
Headers:
Authorization: Bearer <token>

Response:
{
  "user": { ... }
}
```

**PUT /api/auth/profile**
```json
Headers:
Authorization: Bearer <token>

Request:
{
  "name": "John Updated",
  "email": "newemail@example.com",
  "bio": "My bio"
}

Response:
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

**PUT /api/auth/change-password**
```json
Headers:
Authorization: Bearer <token>

Request:
{
  "current_password": "oldpass123",
  "new_password": "newpass123"
}

Response:
{
  "message": "Password changed successfully"
}
```

---

## 🔧 Frontend Integration

**Include API helper in your HTML:**
```html
<script src="api.js"></script>
```

**Usage Examples:**
```javascript
// Register
try {
  const data = await API.register('John Doe', 'john@example.com', 'pass123');
  console.log('Registered:', data.user);
  // Redirect to dashboard
  window.location.href = 'dashboard.html';
} catch (error) {
  console.error('Registration failed:', error.message);
}

// Login
try {
  const data = await API.login('john@example.com', 'pass123');
  console.log('Logged in:', data.user);
  window.location.href = 'dashboard.html';
} catch (error) {
  console.error('Login failed:', error.message);
}

// Get current user
try {
  const user = await API.getCurrentUser();
  console.log('Current user:', user);
} catch (error) {
  // Token expired or invalid
  window.location.href = 'index.html';
}

// Update profile
try {
  const user = await API.updateProfile({ name: 'New Name', bio: 'My bio' });
  console.log('Profile updated:', user);
} catch (error) {
  console.error('Update failed:', error.message);
}

// Logout
API.logout();
window.location.href = 'index.html';
```

---

## 🔒 Security Features

✅ **Password Hashing** - Bcrypt with salt
✅ **JWT Tokens** - 7-day expiration
✅ **Input Validation** - All endpoints
✅ **SQL Injection Protection** - SQLAlchemy ORM
✅ **CORS Configuration** - Restricted origins
✅ **Error Handling** - No sensitive data leaks

---

## 📦 Project Structure

```
bee-hive/
├── backend/
│   ├── app.py              # Main Flask app
│   ├── requirements.txt    # Python dependencies
│   ├── .env.example        # Environment template
│   └── .env                # Your config (create this)
│
└── frontend/
    ├── index.html          # Landing pages
    ├── dashboard.html      # Dashboard pages
    └── api.js              # API helper functions
```

---

## 🧪 Testing

**Test the API with curl:**
```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Get current user (replace TOKEN)
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🚀 Deployment

### Heroku
```bash
# Install Heroku CLI
brew install heroku/brew/heroku

# Login
heroku login

# Create app
heroku create bee-hive-backend

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET_KEY=your-secret-key

# Deploy
git push heroku main

# Check logs
heroku logs --tail
```

### DigitalOcean / AWS / GCP
1. Set up PostgreSQL instance
2. Deploy Flask app with gunicorn
3. Configure nginx as reverse proxy
4. Set up SSL with Let's Encrypt

---

## 🐛 Troubleshooting

**Database connection error:**
```
Check DATABASE_URL in .env
Ensure PostgreSQL is running
Verify database exists and user has permissions
```

**CORS error:**
```
Add your frontend URL to CORS_ORIGINS in .env
Or update CORS config in app.py
```

**JWT token expired:**
```
User needs to log in again
Adjust JWT_ACCESS_TOKEN_EXPIRES in app.py
```

**Import errors:**
```
Activate virtual environment
Install all requirements: pip install -r requirements.txt
```

---

## 📝 Next Steps

1. ✅ Set up database
2. ✅ Run backend server
3. ✅ Update frontend with API calls
4. 🔄 Test registration and login
5. 🔄 Deploy to production

---

## 🔐 Production Checklist

- [ ] Change JWT_SECRET_KEY to random string
- [ ] Set FLASK_DEBUG=False
- [ ] Use production database (not localhost)
- [ ] Enable HTTPS
- [ ] Set up logging
- [ ] Configure rate limiting
- [ ] Add email verification
- [ ] Implement password reset
- [ ] Set up monitoring

---

## 📚 Additional Features to Add

- Email verification
- Password reset via email
- OAuth (Google, Facebook login)
- Refresh tokens
- Rate limiting
- User roles (student, instructor, admin)
- Course enrollment API
- Progress tracking API
- Certificate generation API

---

Need help? Check the logs or create an issue!
