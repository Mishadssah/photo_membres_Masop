@echo off
cd /d "c:\Users\Admin\Documents\photo_membres_Masop"
echo Starting local server on port 8000...
echo Access your files at: http://localhost:8000/
echo Press Ctrl+C to stop the server
python -m http.server 8000