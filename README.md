# 🐝 Bee Hive - Full Stack Learning Platform

Complete production-ready learning platform with Flask backend + PostgreSQL database + React frontend.

## 📦 What You Got

```
bee-hive/
├── backend/
│   ├── app.py                 # Flask server with JWT auth
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example          # Environment template
│   └── README.md             # Detailed backend guide
│
├── frontend/
│   ├── index.html            # Landing pages
│   ├── dashboard.html        # Dashboard pages
│   ├── api.js                # API helper functions
│   └── INTEGRATION_GUIDE.md  # Frontend integration steps
│
├── quick-start.sh            # Auto-setup script (Mac/Linux)
├── quick-start.bat           # Auto-setup script (Windows)
└── README.md                 # This file
```

---

## ⚡ Quick Start (3 Steps)

### Step 1: Auto Setup (Easiest)

**On Mac/Linux:**
```bash
chmod +x quick-start.sh
./quick-start.sh
```

**On Windows:**
```bash
quick-start.bat
```

### Step 2: Start Backend

```bash
cd backend
source venv/bin/activate  # Mac/Linux
# OR
venv\Scripts\activate     # Windows

python app.py
```

✅ Server running on `http://localhost:5000`

### Step 3: Start Frontend

```bash
cd frontend

# Open with Live Server in VS Code
# OR open index.html in browser
```

**That's it!** Try signing up and logging in! 🎉

---

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend      │
│  (React/HTML)   │
│                 │
│  - index.html   │
│  - dashboard    │
└────────┬────────┘
         │
         │ HTTP/JSON
         │ JWT Token
         ↓
┌─────────────────┐
│   Backend       │
│   (Flask)       │
│                 │
│  - Auth API     │
│  - JWT verify   │
└────────┬────────┘
         │
         │ SQL
         ↓
┌─────────────────┐
│   Database      │
│  (PostgreSQL)   │
│                 │
│  - Users table  │
└─────────────────┘
```

---

## 🔐 Authentication Flow

1. **User signs up** → Frontend sends POST to `/api/auth/register`
2. **Backend validates** → Hashes password with bcrypt
3. **Creates user** → Saves to PostgreSQL database
4. **Returns JWT token** → Frontend stores in localStorage
5. **User accesses dashboard** → Frontend sends token in Authorization header
6. **Backend verifies** → Decodes JWT, returns user data
7. **User logs out** → Frontend removes token

---

## 📡 API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/health` | No | Health check |
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/auth/me` | Yes | Get current user |
| PUT | `/api/auth/profile` | Yes | Update profile |
| PUT | `/api/auth/change-password` | Yes | Change password |

---

## 🔧 Manual Setup (If Auto-Setup Fails)

### 1. Install PostgreSQL

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Linux:**
```bash
sudo apt-get install postgresql
sudo systemctl start postgresql
```

**Windows:** Download from [postgresql.org](https://www.postgresql.org/download/windows/)

### 2. Create Database

```bash
psql postgres

CREATE DATABASE beehive;
CREATE USER beehive_user WITH PASSWORD 'beehive123';
GRANT ALL PRIVILEGES ON DATABASE beehive TO beehive_user;
\q
```

### 3. Setup Backend

```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
nano .env
```

### 4. Update Frontend

Add this to both `index.html` and `dashboard.html`:

```html
<head>
  ...
  <script src="api.js"></script>
</head>
```

Then follow the `frontend/INTEGRATION_GUIDE.md` to update the authentication code.

---

## 🧪 Testing

### Test Backend API

```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### Test Frontend

1. Open `index.html` in browser
2. Click "Sign Up"
3. Create an account
4. Should redirect to `dashboard.html`
5. See your data loaded from backend
6. Try updating profile
7. Logout and login again

---

## 🚀 Deployment

### Deploy Backend (Heroku)

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create app
heroku create bee-hive-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_hex(32))')

# Deploy
git init
git add .
git commit -m "Initial commit"
git push heroku main

# Verify
heroku open
```

### Deploy Frontend (Netlify/Vercel)

1. Update `API_BASE_URL` in `api.js` to your Heroku URL
2. Drag and drop frontend folder to [Netlify](https://netlify.com)
3. Done! ✅

---

## 📚 Technology Stack

**Backend:**
- Flask 3.0 - Web framework
- SQLAlchemy - ORM
- PostgreSQL - Database
- Flask-JWT-Extended - Authentication
- Flask-Bcrypt - Password hashing
- Flask-CORS - Cross-origin requests

**Frontend:**
- React 18 - UI library
- HTML5/CSS3 - Structure and styling
- JavaScript ES6+ - Logic
- JWT - Token-based auth

---

## 🔒 Security Features

✅ Password hashing with bcrypt
✅ JWT tokens with expiration (7 days)
✅ SQL injection protection (SQLAlchemy ORM)
✅ XSS protection (proper input validation)
✅ CORS configuration
✅ Secure password requirements (min 6 chars)
✅ Email validation
✅ Error handling without data leaks

---

## 🐛 Common Issues

**Port 5000 already in use:**
```bash
# Find process
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill it or change port in app.py
```

**CORS error:**
Add your frontend URL to `CORS()` in `app.py`

**Database connection error:**
Check `DATABASE_URL` in `.env` file

**Import errors:**
Activate virtual environment and reinstall requirements

---

## 📈 Next Steps

- [ ] Email verification
- [ ] Password reset via email
- [ ] OAuth (Google/Facebook login)
- [ ] User roles (student, instructor, admin)
- [ ] Course enrollment API
- [ ] Video upload and streaming
- [ ] Progress tracking
- [ ] Certificate generation
- [ ] Payment integration
- [ ] Admin dashboard

---

## 📖 Documentation

- `backend/README.md` - Detailed backend guide
- `frontend/INTEGRATION_GUIDE.md` - Frontend integration steps
- `AUTHENTICATION_GUIDE.md` - Auth system explanation

---

## 🆘 Need Help?

**Backend not starting:** Check logs for errors
**Frontend not connecting:** Verify API_BASE_URL in api.js
**Database errors:** Make sure PostgreSQL is running
**Token errors:** User needs to login again

---

## ✨ Features

✅ **Secure Authentication** - JWT tokens + bcrypt
✅ **User Management** - Register, login, profile updates
✅ **Protected Routes** - Dashboard requires authentication
✅ **Password Change** - Secure password updates
✅ **Session Persistence** - Stay logged in across refreshes
✅ **Error Handling** - Proper validation and error messages
✅ **Production Ready** - Can deploy immediately

---

Your Bee Hive platform now has a **real backend** with proper authentication! 🎉

All passwords are hashed, tokens are secure, and data is stored in a real database.

**Ready to deploy to production!** 🚀
