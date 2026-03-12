from fpdf import FPDF

def generate_sample_cam():
    pdf = FPDF()
    pdf.add_page()
    
    # Title
    pdf.set_font("Arial", 'B', 24)
    pdf.set_text_color(30, 27, 75)
    pdf.cell(200, 15, "Reliance Industries - Annual Report FY24", ln=True, align='C')
    pdf.ln(10)
    
    # Header Info
    pdf.set_font("Arial", 'B', 12)
    pdf.set_text_color(0, 0, 0)
    pdf.cell(100, 10, "Entity: Reliance Industries Ltd", ln=False)
    pdf.cell(100, 10, "Sector: Energy & Retail", ln=True, align='R')
    pdf.cell(100, 10, "Date: March 2024", ln=False)
    pdf.cell(100, 10, "Doc Type: Financial Extract", ln=True, align='R')
    pdf.ln(10)
    
    # Financial Commitments
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(200, 10, "Financial Commitment Analysis", ln=True)
    pdf.set_font("Arial", '', 12)
    pdf.multi_cell(0, 10, "The company has committed a total of INR 45.2 Cr towards green energy initiatives in the upcoming quarter. "
                         "This includes solar farm expansion and hydrogen storage facilities. Total debt obligations for the next "
                         "cycle stand at INR 12.5 Cr with low default probability signals.")
    pdf.ln(10)
    
    # Risk Indicators
    pdf.set_font("Arial", 'B', 16)
    pdf.set_text_color(200, 0, 0)
    pdf.cell(200, 10, "Risk Intelligence & Litigation", ln=True)
    pdf.set_font("Arial", '', 12)
    pdf.set_text_color(0, 0, 0)
    pdf.multi_cell(0, 10, "NOTICE: A minor litigation conflict was identified in the NCLT filing #421 regarding a land dispute "
                         "in the Gujarat belt. Penalty of INR 0.2 Cr was noted, but the case is under appeal and categorized "
                         "as low-impact. No major defaults in interest payments have been observed across major bank portals.")
    pdf.ln(10)
    
    # Footer
    pdf.set_y(-30)
    pdf.set_font("Arial", 'I', 10)
    pdf.cell(0, 10, "Intelli-Credit AI Ingestion Service - System Generated Test Document", 0, 0, 'C')
    
    pdf.output("Reliance_Annual_Report_FY24_Sample.pdf")
    print("PDF generated successfully: Reliance_Annual_Report_FY24_Sample.pdf")

if __name__ == "__main__":
    generate_sample_cam()
