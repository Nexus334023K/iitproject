# Intelli-Credit Engine

An advanced intelligence and credit monitoring application built with React, Vite, and Python.

## Features

- **Cross-Platform**: Support for Web (PWA), Android, and iOS (via Capacitor).
- **Intelligent Insight**: Automated document parsing and intelligence generation.
- **Premium UI**: Modern design with responsive layouts and smooth animations.
- **Data Privacy**: Local processing and secure backend logic.

## Project Structure

- `/frontend`: React application using Vite and Framer Motion.
- `/backend`: Python-based API for handling intelligence logic and document processing.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python 3.10+

### Installation

1. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Backend**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python main.py
   ```

## Cross-Platform Usage

### PWA
The app is configured as a Progressive Web App. When deployed, you can install it directly from your browser on desktop or mobile.

### Mobile (Android/iOS)
Using Capacitor, you can build native versions of this app:
```bash
cd frontend
npm run build
npx cap sync
npx cap open android  # To open in Android Studio
```

## Deployment

The frontend is optimized for deployment on Netlify/Vercel, and the backend is ready for Render/Railway.
