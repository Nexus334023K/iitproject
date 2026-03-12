from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from parsers.pdf_parser import PDFParser
from parsers.gstr_parser import GSTRParser
from agents.research_agent import ResearchAgent
from logic.scoring_engine import ScoringEngine
from logic.cam_generator import CAMGenerator
import os
import shutil
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Intelli-Credit Engine API")



# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
async def root():
    return {"message": "Welcome to the Intelli-Credit Engine API"}

@app.post("/analyze/gst")
async def analyze_gst(file: UploadFile = File(...)):
    # Mock data for synthesis demonstration
    mock_gst = [{"value": 1000}, {"value": 5000}]
    mock_bank = [{"credit": 4000}]
    
    parser = GSTRParser(mock_gst, mock_bank)
    result = parser.summarize()
    return {"filename": file.filename, "analysis": result}

@app.post("/analyze/pdf")
async def analyze_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    parser = PDFParser(file_path)
    result = parser.parse()
    return {"filename": file.filename, "analysis": result}

@app.get("/research")
async def perform_research(company: str):
    agent = ResearchAgent()
    results = agent.perform_research(company, [])
    return {"company": company, "research": results}

class CreditNote(BaseModel):
    company_name: str
    officer_name: str
    note: str

@app.post("/submit-notes")
async def submit_notes(note: CreditNote):
    # In a real app, save to DB. For prototype, we'll return confirmation.
    # The scoring engine should technically pick this up.
    return {"status": "Note integrated into risk profile", "note": note}

@app.post("/generate-cam")
async def generate_cam(company: str):
    # 1. Gather all data (GST, Research, Notes) - Mocking the aggregation
    data = {
        "capacity_score": 75,
        "character_score": 85,
        "capital_score": 70,
        "asset_value": 50000000,
    }
    
    # 2. Score
    scorer = ScoringEngine()
    decision = scorer.calculate_score(data)
    
    # 3. Generate PDF
    cam_file = f"{company}_CAM.pdf"
    cam_path = os.path.join(UPLOAD_DIR, cam_file)
    generator = CAMGenerator(company, decision)
    generator.generate(cam_path)
    
    return {
        "company": company,
        "decision": decision,
        "cam_url": f"/download/{cam_file}"
    }

from fastapi.responses import FileResponse
@app.get("/download/{filename}")
async def download_file(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    return FileResponse(file_path)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
