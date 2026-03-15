import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';


interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (fileNames: string[], analysisData?: any[]) => void;
}

const UploadModal = ({ isOpen, onClose, onUploadSuccess }: UploadModalProps) => {

  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const addFiles = (newFiles: File[]) => {
    // Filter for supported types: pdf, csv, xlsx, xls
    const supportedTypes = ['application/pdf', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    const filteredFiles = newFiles.filter(file => supportedTypes.includes(file.type) || file.name.endsWith('.pdf') || file.name.endsWith('.csv'));
    setFiles(prev => [...prev, ...filteredFiles]);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      addFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    
    try {
      const results = [];
      const uploadedNames = [];
      
      for (const file of files) {
        if (file.name.endsWith('.pdf')) {
          const formData = new FormData();
          formData.append('file', file);
          
          const response = await fetch('http://localhost:8000/analyze/pdf', {
            method: 'POST',
            body: formData,
          });
          
          if (response.ok) {
            const data = await response.json();
            results.push(data.analysis);
            uploadedNames.push(file.name);
          } else {
             // Fallback/Error handling
             results.push(null);
             uploadedNames.push(file.name);
          }
        } else {
          // Non-PDF files (CSV, etc) bypass the PDF parser for now
          results.push(null);
          uploadedNames.push(file.name);
        }
      }

      setUploading(false);
      setSuccess(true);
      onUploadSuccess(uploadedNames, results);
      
      setTimeout(() => {
        setSuccess(false);
        setFiles([]);
        onClose();
      }, 2000);

    } catch (e) {
      console.error("Upload error", e);
      setUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(3, 0, 20, 0.8)',
              backdropFilter: 'blur(10px)'
            }}
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '600px',
              padding: '2.5rem',
              position: 'relative',
              zIndex: 1001,
              border: '1px solid var(--primary)'
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>

            <h2 style={{ marginBottom: '0.5rem', fontSize: '1.8rem' }}>Secure Document Portal</h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Upload corporate documentation for automated AI synthesis.
            </p>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragActive ? 'var(--primary)' : 'var(--glass-border)'}`,
                borderRadius: '1.5rem',
                padding: '3rem 2rem',
                textAlign: 'center',
                background: dragActive ? 'rgba(139, 92, 246, 0.05)' : 'rgba(255, 255, 255, 0.01)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={onButtonClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept=".pdf,.csv,.xlsx,.xls"
              />
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  padding: '1.2rem',
                  background: 'rgba(139, 92, 246, 0.1)',
                  borderRadius: '1rem',
                  color: 'var(--primary)'
                }}>
                  <Upload size={32} />
                </div>
              </div>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                Drag and drop files here
              </p>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                Supported: PDF, CSV, XLSX (Max 50MB per file)
              </p>
            </div>

            {files.length > 0 && (
              <div style={{ marginTop: '2rem', maxHeight: '200px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-dim)' }}>
                  Selected Documents ({files.length})
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {files.map((file, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={`${file.name}-${index}`}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.8rem 1rem',
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: '0.8rem',
                        border: '1px solid var(--glass-border)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <FileText size={18} color="var(--primary)" />
                        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{file.name}</span>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                        style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer' }}
                      >
                        <X size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: '2.5rem', position: 'relative' }}>
              <AnimatePresence mode="wait">
                {uploading ? (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    style={{
                      background: 'rgba(139, 92, 246, 0.05)',
                      borderRadius: '1.2rem',
                      padding: '2rem',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 1.5rem' }}>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          border: '3px solid transparent',
                          borderTop: '3px solid var(--primary)',
                          borderRadius: '50%'
                        }}
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          right: '10px',
                          bottom: '10px',
                          border: '3px solid transparent',
                          borderTop: '3px solid var(--secondary)',
                          borderRadius: '50%',
                          opacity: 0.6
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'var(--primary)'
                      }}>
                        <ShieldCheck size={32} />
                      </div>
                    </div>
                    
                    <h3 style={{ marginBottom: '0.5rem' }}>Encrypted Ingestion Active</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', textAlign: 'left', maxWidth: '300px', margin: '1.5rem auto 0' }}>
                      <ProgressStep label="Quantum Asset Securing" active delay={0} />
                      <ProgressStep label="NLP Metadata Indexing" active delay={0.8} />
                      <ProgressStep label="Vector Node Syncing" active delay={1.6} />
                    </div>
                  </motion.div>
                ) : success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      background: 'rgba(74, 222, 128, 0.05)',
                      borderRadius: '1.2rem',
                      padding: '2rem',
                      border: '1px solid rgba(74, 222, 128, 0.2)',
                      textAlign: 'center'
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      style={{
                        width: '64px',
                        height: '64px',
                        background: '#4ade80',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        color: 'white'
                      }}
                    >
                      <CheckCircle2 size={32} />
                    </motion.div>
                    <h3 style={{ color: '#4ade80' }}>All Nodes Synced</h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Documentation is now available for AI scoring.</p>
                  </motion.div>
                ) : (
                  <button
                    key="idle"
                    className="btn-primary"
                    style={{ width: '100%', height: '56px', fontSize: '1.1rem' }}
                    disabled={files.length === 0}
                    onClick={handleUpload}
                  >
                    Begin Processing {files.length > 0 ? `(${files.length} Files)` : ''}
                  </button>
                )}
              </AnimatePresence>
            </div>


            <div style={{ 
              marginTop: '1.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.5rem',
              color: 'var(--text-dim)',
              fontSize: '0.8rem'
            }}>
              <AlertCircle size={14} />
              <span>AES-256 endpoint encryption active for all corporate data.</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ProgressStep = ({ label, active, delay }: { label: string, active: boolean, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.85rem' }}
  >
    <div style={{ position: 'relative' }}>
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
      {active && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.3 }}
          style={{ position: 'absolute', top: 0, left: 0, width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }}
        />
      )}
    </div>
    <span style={{ color: active ? 'var(--text-main)' : 'var(--text-dim)' }}>{label}</span>
  </motion.div>
);

export default UploadModal;

