import requests
from typing import List, Dict
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
import json

load_dotenv()

class ResearchAgent:
    """Agent for web-scale secondary research on companies and promoters, powered by Gemini."""
    
    def __init__(self, tavily_api_key: str = None):
        self.api_key = tavily_api_key or os.getenv("TAVILY_API_KEY")
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            temperature=0,
        )

    def search_news(self, query: str) -> List[Dict]:
        """Crawl news related to company/promoters."""
        # This would typically use Tavily. Mocking search results for prototype, 
        # but we use LLM later in synthesis.
        return [
            {"title": f"Recent operational expansions for {query}", "source": "Business Portal", "sentiment": "Positive"},
            {"title": f"Regulatory compliance update regarding {query}", "source": "Gov News", "sentiment": "Neutral"}
        ]

    def search_litigation(self, entity_name: str) -> List[Dict]:
        """Search for legal disputes."""
        return [
            {"case_id": "EP-2024-001", "court": "NCLT", "status": "Pending", "details": f"Dispute involving {entity_name}"}
        ]

    def synthesize_findings(self, company_name: str, raw_data: dict) -> dict:
        """Use Gemini to synthesize raw research data into a crisp summary with risk signals."""
        prompt = PromptTemplate.from_template(
            "You are a credit risk analyst. Review the following research data for {company} "
            "and provide a structured synthesis.\n\n"
            "Research Data:\n{data}\n\n"
            "Respond ONLY with a valid JSON object in this format:\n"
            "{{\n"
            "  \"overall_sentiment\": \"Positive/Neutral/Negative\",\n"
            "  \"key_highlights\": [\"highlight 1\", \"highlight 2\"],\n"
            "  \"risk_flags\": [\"risk 1\"]\n"
            "}}"
        )
        chain = prompt | self.llm | StrOutputParser()
        try:
            result_str = chain.invoke({"company": company_name, "data": json.dumps(raw_data)})
            # Clean up potential markdown formatting around JSON
            json_str = result_str.replace("```json", "").replace("```", "").strip()
            # Find the first { and last } to avoid extra text
            start = json_str.find('{')
            end = json_str.rfind('}') + 1
            if start != -1 and end != 0:
                json_str = json_str[start:end]
            return json.loads(json_str)
        except Exception as e:
            print(f"Research LLM Error: {e}")
            return {"overall_sentiment": "Unknown", "key_highlights": ["Synthesis failed - check logs"], "risk_flags": []}

    def perform_research(self, company_name: str, promoter_names: List[str]):
        raw_results = {
            "company_news": self.search_news(f"{company_name} news"),
            "promoter_news": [self.search_news(f"{p} promoter") for p in promoter_names],
            "litigation": self.search_litigation(company_name)
        }
        
        synthesized = self.synthesize_findings(company_name, raw_results)
        
        return {
            "raw_data": raw_results,
            "synthesis": synthesized
        }

