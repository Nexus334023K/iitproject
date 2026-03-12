import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CAMViewerProps {
  data: any;
  onClose: () => void;
}

const CAMViewer = ({ data, onClose }: CAMViewerProps) => {
  const navigate = useNavigate();
  if (!data) return null;


  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="glass-panel"
      style={{ 
        position: 'fixed', 
        top: '10%', 
        left: '10%', 
        right: '10%', 
        bottom: '10%', 
        zIndex: 100,
        background: 'rgba(3, 0, 20, 0.95)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FileText size={32} color="var(--primary)" />
          <h2>Credit Appraisal Memo - Draft</h2>
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Close</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', flex: 1, overflowY: 'auto' }}>
        <div>
          <h3>Decision Metrics</h3>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <MetricItem label="Risk Score" value={`${data.final_score.toFixed(1)}/100`} />
            <MetricItem label="Recommendation" value={data.recommendation} highlight />
            <MetricItem label="Proposed Limit" value={`₹${(data.suggested_limit / 10000000).toFixed(2)} Cr`} />
            <MetricItem label="Interest Rate" value={`${data.interest_rate}%`} />
          </div>
        </div>

        <div>
          <h3>Rationale Summary</h3>
          <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, marginTop: '1.5rem' }}>
            {data.explanation}
          </p>
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <CheckCircle2 size={18} color="#4ade80" /> Verified Data Sources
            </h4>
            <ul style={{ fontSize: '0.9rem', color: 'var(--text-dim)', paddingLeft: '1.2rem' }}>
              <li>GST Filings Synthesis</li>
              <li>Annual Report (PDF) Risks</li>
              <li>MCA Promoter Research</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--glass-border)' }}>
          Edit Parameters
        </button>
        <button className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }} onClick={() => navigate('/market-intelligence')}>
          Global Intelligence Hub <ArrowRight size={18} />
        </button>
        <button className="btn-primary">
          <Download size={20} /> Download PDF
        </button>
      </div>
    </motion.div>
  );
};


const MetricItem = ({ label, value, highlight = false }: { label: string, value: string | number, highlight?: boolean }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.8rem', borderBottom: '1px solid var(--glass-border)' }}>
    <span style={{ color: 'var(--text-dim)' }}>{label}</span>
    <span style={{ fontWeight: 700, color: highlight ? '#4ade80' : 'white' }}>{value}</span>
  </div>
);


export default CAMViewer;
