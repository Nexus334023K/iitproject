import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
import json

load_dotenv()

class GSTRParser:
    """Parser and synthesizer for GST filings vs Bank Statements using Gemini."""
    
    def __init__(self, gst_data, bank_data):
        self.gst_data = gst_data
        self.bank_data = bank_data
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            temperature=0,
        )

    def detect_circular_trading(self):
        """
        Use Gemini to identify circular trading risks based on GST vs Bank data.
        """
        prompt = PromptTemplate.from_template(
            "You are an expert forensic accountant. Analyze the following GST and Bank data.\n"
            "Identify any circular trading risk, such as discrepancies between GSTR revenue and Bank inflows.\n\n"
            "GST Data (Sales/Revenue):\n{gst}\n\n"
            "Bank Data (Inflows/Credits):\n{bank}\n\n"
            "Respond ONLY with a valid JSON in this format:\n"
            "{{\n"
            "  \"risk_score_impact\": <integer from 0 to 100>,\n"
            "  \"signals\": [\"signal 1\", \"signal 2\"]\n"
            "}}"
        )
        
        chain = prompt | self.llm | StrOutputParser()
        
        try:
            result_str = chain.invoke({
                "gst": json.dumps(self.gst_data),
                "bank": json.dumps(self.bank_data)
            })
            # Clean up potential markdown formatting around JSON
            json_str = result_str.replace("```json", "").replace("```", "").strip()
            # Find the first { and last } to avoid extra text
            start = json_str.find('{')
            end = json_str.rfind('}') + 1
            if start != -1 and end != 0:
                json_str = json_str[start:end]
                
            data = json.loads(json_str)
            return {
                "risk_score_impact": data.get("risk_score_impact", 0),
                "signals": data.get("signals", []),
                "status": "Analysis Complete"
            }
        except Exception as e:
            print(f"GSTR LLM Error: {e}")
            # Fallback logic
            gst_total = sum(item.get('value', 0) for item in self.gst_data)
            bank_total = sum(item.get('credit', 0) for item in self.bank_data)
            risk_score = 0
            signals = []
            if abs(gst_total - bank_total) / (gst_total or 1) > 0.2:
                signals.append("Significant discrepancy between GSTR revenue and Bank inflows.")
                risk_score += 30
                
            return {
                "risk_score_impact": risk_score,
                "signals": signals,
                "status": "Analysis Complete (Fallback)"
            }

    def summarize(self):
        return self.detect_circular_trading()

