import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Upload, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import UploadModal from '../components/UploadModal';


const DataRoom = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { documents, addDocuments } = useDocuments();

  const handleUploadSuccess = (fileNames: string[]) => {
    addDocuments(fileNames);
  };

  return (
    <div className="main-content">
      <UploadModal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
        onUploadSuccess={handleUploadSuccess}
      />
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem', background: 'var(--grad-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-2px' }}>
            Secure Data Vault
          </h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', fontWeight: 500 }}>High-fidelity repository for multi-pillar corporate intelligence.</p>
        </div>
        <motion.button 
          whileHover={{ y: -5, boxShadow: '0 20px 40px -10px rgba(139, 92, 246, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary" 
          onClick={() => setShowUploadModal(true)}
          style={{ padding: '1.2rem 2.5rem', fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.8rem' }}
        >
          <Upload size={20} /> INGEST NEW VECTORS
        </motion.button>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
        <DataCategory title="Structured Vectors" count={24 + documents.filter(d => d.category === 'Structured').length - 2} icon={<Database color="var(--primary)" />} gradient="var(--primary)" />
        <DataCategory title="Neural Reports" count={12 + documents.filter(d => d.category === 'Unstructured').length - 1} icon={<FileText color="var(--secondary)" />} gradient="var(--secondary)" />
        <DataCategory title="Swarm Filings" count={8} icon={<CheckCircle2 color="var(--accent)" />} gradient="var(--accent)" />
      </section>

      <div className="glass-panel" style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)' }}>
        <h3 style={{ marginBottom: '2.5rem', fontSize: '1.5rem', fontWeight: 800 }}>Neural Ingestion History</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--text-dim)', fontSize: '0.85rem', borderBottom: '1px solid var(--glass-border)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <th style={{ padding: '1.5rem 1rem' }}>Vector Identity</th>
              <th>Intelligence Category</th>
              <th>Neural Status</th>
              <th>Sync Confidence</th>
              <th>Ingestion Date</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <TableRow key={index} {...doc} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DataCategory = ({ title, count, icon, gradient }: { title: string, count: number, icon: any, gradient: string }) => (
  <motion.div 
    whileHover={{ y: -5, background: 'rgba(255,255,255,0.03)' }}
    className="glass-panel" 
    style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '2rem 2.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden' }}
  >
    <div style={{ position: 'absolute', top: '-1rem', right: '-1rem', width: '60px', height: '60px', background: gradient, filter: 'blur(40px)', opacity: 0.1 }} />
    <div style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1.2rem', border: '1px solid var(--glass-border)' }}>
      {icon}
    </div>
    <div>
      <h3 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.2rem', letterSpacing: '-1px' }}>{count}</h3>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</p>
    </div>
  </motion.div>
);

const TableRow = ({ name, category, status, confidence, date, warning = false, loading = false }: any) => (
  <motion.tr 
    whileHover={{ background: 'rgba(255,255,255,0.02)' }}
    style={{ borderBottom: '1px solid var(--glass-border)', fontSize: '1rem', transition: 'background 0.2s ease' }}
  >
    <td style={{ padding: '1.8rem 1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ padding: '0.6rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.6rem' }}>
        <FileText size={18} color="var(--primary)" />
      </div>
      <span style={{ fontWeight: 800 }}>{name}</span>
    </td>
    <td style={{ color: 'var(--text-dim)', fontWeight: 600 }}>{category}</td>
    <td>
      <span style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.6rem',
        fontWeight: 800,
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        color: warning ? 'var(--accent)' : loading ? 'var(--primary)' : '#4ade80'
      }}>
        {loading ? <Clock size={16} className="animate-spin" /> : warning ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
        {status}
      </span>
    </td>
    <td style={{ fontWeight: 900, fontSize: '1.1rem', color: parseInt(confidence) > 90 ? '#4ade80' : 'white' }}>{confidence}</td>
    <td style={{ color: 'var(--text-dim)', fontWeight: 500 }}>{date}</td>
  </motion.tr>
);


export default DataRoom;
