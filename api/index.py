import sys
import os

# Add the backend directory to the path so we can import the app
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))

from main import app

# This is the entry point for Vercel
# Vercel handles the uvicorn/gicorn server setup automatically
# we just need to expose the 'app' object.
