import pdfplumber
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
import json

load_dotenv()

class PDFParser:
    """Parser for unstructured PDF data like Annual Reports and Legal Notices, using Google Gemini."""
    
    def __init__(self, file_path):
        self.file_path = file_path
        # Initialize Gemini LLM
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            temperature=0,
            convert_system_message_to_human=True, # In case of older langchain versions
        )

    def extract_text(self):
        text = ""
        with pdfplumber.open(self.file_path) as pdf:
            # Extract first 5 pages to avoid token limits for demo
            for page in pdf.pages[:5]:
                text += page.extract_text() or ""
        return text

    def analyze_with_llm(self, text):
        prompt = PromptTemplate.from_template(
            "Analyze the following financial or legal document excerpt. "
            "Identify any financial commitments, environmental/ESG goals, and major corporate risks. "
            "Also extract key financial metrics (Revenue, EBITDA, Debt-to-Equity) and a list of Promoters/Directors.\n\n"
            "Respond ONLY with a valid JSON in this format:\n"
            "{{\n"
            "  \"commitments\": [\"commitment 1\", \"commitment 2\"],\n"
            "  \"risks\": [\"risk 1\", \"risk 2\"],\n"
            "  \"metrics\": {{\n"
            "    \"revenue\": \"value\",\n"
            "    \"ebitda\": \"value\",\n"
            "    \"debt_to_equity\": \"value\"\n"
            "  }},\n"
            "  \"promoters\": [\"promoter 1\", \"promoter 2\"]\n"
            "}}\n\n"
            "If none are found, use empty arrays.\n\n"
            "Document Excerpt:\n{text}"
        )
        
        chain = prompt | self.llm | StrOutputParser()
        
        try:
            # We limit text to ~10000 characters to be safe for a simple extraction
            result_str = chain.invoke({"text": text[:10000]})
            # Clean up potential markdown formatting around JSON
            json_str = result_str.replace("```json", "").replace("```", "").strip()
            # Find the first { and last } to avoid extra text
            start = json_str.find('{')
            end = json_str.rfind('}') + 1
            if start != -1 and end != 0:
                json_str = json_str[start:end]
            return json.loads(json_str)
        except Exception as e:
            print(f"LLM Error: {e}")
            return {"commitments": [], "risks": ["Document analysis synthesis failed"]}

    def parse(self):
        text = self.extract_text()
        analysis = self.analyze_with_llm(text)
        
        return {
            "commitments": analysis.get("commitments", []),
            "risks": analysis.get("risks", []),
            "summary_snippet": text[:500] + "..." if len(text) > 500 else text
        }

