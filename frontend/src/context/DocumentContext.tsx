import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Document {
  name: string;
  category: string;
  status: string;
  confidence: string;
  date: string;
  loading?: boolean;
  analysis?: {
    commitments: string[];
    risks: string[];
    summary_snippet?: string;
  };
}

interface DocumentContextType {
  documents: Document[];
  addDocuments: (fileNames: string[], analysisData?: any[]) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  const [documents, setDocuments] = useState<Document[]>([
    { name: "GSTR-3B Mar 2024.pdf", category: "Structured", status: "Verified", confidence: "98%", date: "2 mins ago" },
    { name: "Annual Report FY23-24.pdf", category: "Unstructured", status: "Extracting", confidence: "--", date: "10 mins ago", loading: true },
    { name: "NCLT Case Filing #421.pdf", category: "Legal", status: "Flagged", confidence: "85%", date: "1 hour ago" },
    { name: "SBI Bank Statement.csv", category: "Structured", status: "Verified", confidence: "99%", date: "2 hours ago" },
  ]);

  const addDocuments = (fileNames: string[], analysisData?: any[]) => {
    const newDocs = fileNames.map((name, index) => ({
      name,
      category: name.toLowerCase().endsWith('.pdf') ? "Unstructured" : "Structured",
      status: analysisData && analysisData[index] ? "Analyzed" : "Synced",
      confidence: analysisData && analysisData[index] ? "95%" : "Pending",
      date: "Just now",
      loading: false,
      analysis: analysisData ? analysisData[index] : undefined
    }));
    setDocuments(prev => [...newDocs, ...prev]);
  };

  return (
    <DocumentContext.Provider value={{ documents, addDocuments }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};
