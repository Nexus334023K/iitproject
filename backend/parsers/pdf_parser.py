import pdfplumber
import re

class PDFParser:
    """Parser for unstructured PDF data like Annual Reports and Legal Notices."""
    
    def __init__(self, file_path):
        self.file_path = file_path

    def extract_text(self):
        text = ""
        with pdfplumber.open(self.file_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""
        return text

    def find_financial_commitments(self, text):
        # Basic regex to find contingent liabilities or commitments
        patterns = [
            r"contingent liabilit\w+",
            r"financial commitment\w+",
            r"guarantee\w* issued",
            r"letter\w* of credit"
        ]
        found = []
        for pattern in patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            if matches:
                found.extend(list(set(matches)))
        return found

    def find_risk_signals(self, text):
        # Basic regex for early warning signals
        patterns = [
            r"litigation",
            r"dispute",
            r"default",
            r"penalty",
            r"qualified opinion",
            r"material uncertainty"
        ]
        found = []
        for pattern in patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            if matches:
                found.extend(list(set(matches)))
        return found

    def parse(self):
        text = self.extract_text()
        return {
            "commitments": self.find_financial_commitments(text),
            "risks": self.find_risk_signals(text),
            "summary_snippet": text[:500] + "..." if len(text) > 500 else text
        }
