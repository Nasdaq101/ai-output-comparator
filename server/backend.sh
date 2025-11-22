#!/bin/bash

echo "Starting Django backend..."

# Check .env file
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found!"
    echo "Run: cp .env.example .env"
    echo "Then edit .env to add your API keys"
    exit 1
fi

# Check virtual environment
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -q -r requirements.txt

# Start Django server
echo ""
echo "✅ Starting server on http://localhost:3001..."
python manage.py runserver 3001
