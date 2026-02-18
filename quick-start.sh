#!/bin/bash

echo "🐝 Bee Hive Backend Quick Start"
echo "================================"
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python 3 found"

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL not found. Installing..."
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install postgresql
        brew services start postgresql
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo apt-get update
        sudo apt-get install -y postgresql postgresql-contrib
        sudo systemctl start postgresql
    else
        echo "❌ Please install PostgreSQL manually"
        exit 1
    fi
fi

echo "✅ PostgreSQL found"

# Create database
echo ""
echo "Creating database..."
psql postgres -c "CREATE DATABASE beehive;" 2>/dev/null
psql postgres -c "CREATE USER beehive_user WITH PASSWORD 'beehive123';" 2>/dev/null
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE beehive TO beehive_user;" 2>/dev/null

echo "✅ Database created"

# Create virtual environment
echo ""
echo "Setting up Python virtual environment..."
cd backend
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo ""
echo "Installing dependencies..."
pip install -r requirements.txt

# Create .env file
if [ ! -f .env ]; then
    echo ""
    echo "Creating .env file..."
    cat > .env << EOF
DATABASE_URL=postgresql://beehive_user:beehive123@localhost:5432/beehive
JWT_SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_hex(32))')
FLASK_ENV=development
FLASK_DEBUG=True
CORS_ORIGINS=http://localhost:5500,http://127.0.0.1:5500,http://localhost:3000
EOF
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "================================"
echo "✅ Setup complete!"
echo ""
echo "To start the backend server:"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  python app.py"
echo ""
echo "Server will run on http://localhost:5000"
echo "================================"
