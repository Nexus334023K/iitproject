import pdfplumber
import os

pdf_path = r"c:\Users\Nexus\Desktop\iit project\Reliance_Annual_Report_FY24_Sample.pdf"

if not os.path.exists(pdf_path):
    print(f"Error: {pdf_path} not found")
else:
    try:
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for i, page in enumerate(pdf.pages):
                text += f"--- Page {i+1} ---\n"
                text += page.extract_text() + "\n"
            print(text)
    except Exception as e:
        print(f"Error: {e}")
