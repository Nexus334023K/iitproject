from fpdf import FPDF
import datetime

class CAMGenerator:
    """Generator for the Comprehensive Credit Appraisal Memo (CAM) PDF."""
    
    def __init__(self, company_name, analysis_data):
        self.company_name = company_name
        self.data = analysis_data
        self.pdf = FPDF()

    def generate(self, output_path):
        self.pdf.add_page()
        self.pdf.set_font("Arial", 'B', 16)
        self.pdf.cell(0, 10, "Credit Appraisal Memo (CAM)", ln=True, align='C')
        self.pdf.set_font("Arial", '', 12)
        self.pdf.cell(0, 10, f"Company: {self.company_name}", ln=True)
        self.pdf.cell(0, 10, f"Date: {datetime.date.today()}", ln=True)
        self.pdf.ln(10)

        # 5 Cs Section
        self.pdf.set_font("Arial", 'B', 14)
        self.pdf.cell(0, 10, "1. The Five Cs of Credit", ln=True)
        self.pdf.set_font("Arial", '', 11)
        
        scores = self.data.get("scores", {})
        for c, score in scores.items():
            self.pdf.cell(50, 8, f"{c.capitalize()}:", border=0)
            self.pdf.cell(0, 8, f"{score}/100", ln=True)

        self.pdf.ln(5)
        
        # Decision Section
        self.pdf.set_font("Arial", 'B', 14)
        self.pdf.cell(0, 10, "2. Final Recommendation", ln=True)
        self.pdf.set_font("Arial", '', 11)
        self.pdf.cell(50, 8, "Status:", border=0)
        self.pdf.cell(0, 8, self.data.get("recommendation", "N/A"), ln=True)
        self.pdf.cell(50, 8, "Suggested Limit:", border=0)
        self.pdf.cell(0, 8, f"INR {float(self.data.get('suggested_limit', 0)):,.2f}", ln=True)
        self.pdf.cell(50, 8, "Interest Rate:", border=0)
        self.pdf.cell(0, 8, f"{self.data.get('interest_rate', 'N/A')}% p.a.", ln=True)
        
        self.pdf.ln(5)
        self.pdf.multi_cell(0, 10, f"Rationale: {self.data.get('explanation', '')}")

        self.pdf.output(output_path)
        return output_path
