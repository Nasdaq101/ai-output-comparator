# AI Comparator

Compare AI responses side by side

## Features

- Side-by-side AI comparison
- Both APIs completely FREE
- Modern, responsive UI
- Real-time responses
- Simple setup

## Tech Stack

**Frontend:**
- React 19.2.0
- Vite 7.2.2

**Backend:**
- Django 4.2.7
- Python 3.8+
- Groq API (Llama 3.3 70B) 
- Google Generative AI (Gemini)

## Quick Start

### 1. Setup Backend

```bash
cd server
cp .env.example .env
# Edit .env and add your FREE API keys
```

Get your keys:
- ⚡ Groq (fastest): https://console.groq.com/keys
- ✨ Gemini: https://aistudio.google.com/apikey

### 2. Install Frontend

```bash
cd client
npm install
```

### 3. Start Backend

```bash
cd server
./backend.sh
```

### 4. Start Frontend

```bash
cd client
npm run dev
```

Open: http://localhost:5173

## API Endpoints

All endpoints at `http://localhost:3001/api/`:

- `GET /health` - Health check
- `POST /groq` - Groq only (Llama 3.3 70B)
- `POST /gemini` - Gemini only
- `POST /compare` - Compare both
