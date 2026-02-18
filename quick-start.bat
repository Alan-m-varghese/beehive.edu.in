@echo off
echo 🐝 Bee Hive Backend Quick Start (Windows)
echo ==========================================
echo.

REM Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

echo ✅ Python found

REM Check PostgreSQL
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL is not installed.
    echo Please download and install from: https://www.postgresql.org/download/windows/
    pause
    exit /b 1
)

echo ✅ PostgreSQL found

REM Create database
echo.
echo Creating database...
psql -U postgres -c "CREATE DATABASE beehive;" 2>nul
psql -U postgres -c "CREATE USER beehive_user WITH PASSWORD 'beehive123';" 2>nul
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE beehive TO beehive_user;" 2>nul

echo ✅ Database created

REM Navigate to backend
cd backend

REM Create virtual environment
echo.
echo Setting up Python virtual environment...
python -m venv venv

REM Activate virtual environment
call venv\Scripts\activate

REM Install dependencies
echo.
echo Installing dependencies...
pip install -r requirements.txt

REM Create .env file
if not exist .env (
    echo.
    echo Creating .env file...
    (
        echo DATABASE_URL=postgresql://beehive_user:beehive123@localhost:5432/beehive
        echo JWT_SECRET_KEY=your-secret-key-change-this-in-production
        echo FLASK_ENV=development
        echo FLASK_DEBUG=True
        echo CORS_ORIGINS=http://localhost:5500,http://127.0.0.1:5500,http://localhost:3000
    ) > .env
    echo ✅ .env file created
) else (
    echo ✅ .env file already exists
)

echo.
echo ==========================================
echo ✅ Setup complete!
echo.
echo To start the backend server:
echo   cd backend
echo   venv\Scripts\activate
echo   python app.py
echo.
echo Server will run on http://localhost:5000
echo ==========================================
pause
