import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Archive as ArchiveIcon, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  FileText,
  Calendar,
  User,
  MoreVertical,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const Archive = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const historicalCAMs = [
    { id: 'CAM-8821', entity: 'Reliance Industries Ltd', date: '2024-03-10', score: 88, status: 'Approved', limit: '₹1200 Cr', type: 'Annual Review' },
    { id: 'CAM-8819', entity: 'Tata Motors Finance', date: '2024-03-08', score: 72, status: 'Approved', limit: '₹450 Cr', type: 'New Credit' },
    { id: 'CAM-8815', entity: 'Adani Enterprises Ltd', date: '2024-03-05', score: 64, status: 'Flagged', limit: '₹800 Cr', type: 'Renewal' },
    { id: 'CAM-8810', entity: 'HDFC Bank Ltd', date: '2024-02-28', score: 94, status: 'Approved', limit: '₹2500 Cr', type: 'Annual Review' },
    { id: 'CAM-8804', entity: 'Vedanta Resources', date: '2024-02-20', score: 58, status: 'Rejected', limit: '₹300 Cr', type: 'New Credit' },
  ];

  return (
    <div className="main-content">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'var(--grad-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Appraisal Archive
          </h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>Access and manage historical Credit Appraisal Memos.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} color="var(--primary)" />
            <span style={{ fontSize: '0.85rem' }}>Financial Year 2023-24</span>
          </div>
        </div>
      </header>

      <div className="glass-panel" style={{ marginBottom: '2rem', padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} color="var(--text-dim)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Search by entity name or CAM ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.8rem 1rem 0.8rem 3rem', 
              background: 'rgba(255,255,255,0.02)', 
              border: '1px solid var(--glass-border)', 
              borderRadius: '0.8rem',
              color: 'white',
              outline: 'none'
            }}
          />
        </div>
        <button className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', cursor: 'pointer', background: 'rgba(255,255,255,0.05)' }}>
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </div>

      <div className="glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '1.5rem', fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>Entity / CAM ID</th>
              <th style={{ padding: '1.5rem', fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>Appraisal Date</th>
              <th style={{ padding: '1.5rem', fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>Type</th>
              <th style={{ padding: '1.5rem', fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>Risk Score</th>
              <th style={{ padding: '1.5rem', fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>Decision</th>
              <th style={{ padding: '1.5rem', fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {historicalCAMs.map((cam, index) => (
              <motion.tr 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={cam.id} 
                style={{ borderBottom: '1px solid var(--glass-border)', background: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}
              >
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.6rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '0.8rem' }}>
                      <FileText size={20} color="var(--primary)" />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, margin: 0 }}>{cam.entity}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', margin: 0 }}>{cam.id}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1.5rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>{cam.date}</td>
                <td style={{ padding: '1.5rem' }}>
                  <span style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)' }}>
                    {cam.type}
                  </span>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', width: '60px' }}>
                      <div style={{ width: `${cam.score}%`, height: '100%', background: cam.score > 80 ? '#4ade80' : cam.score > 60 ? '#facc15' : '#f87171', borderRadius: '3px' }} />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{cam.score}</span>
                  </div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {cam.status === 'Approved' ? <CheckCircle2 size={16} color="#4ade80" /> : <AlertCircle size={16} color={cam.status === 'Flagged' ? '#facc15' : '#f87171'} />}
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{cam.status}</span>
                  </div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.8rem' }}>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }} title="Download CAM">
                      <Download size={18} />
                    </button>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }} title="View Detailed Analysis">
                      <ExternalLink size={18} />
                    </button>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
        <button className="glass-panel" style={{ padding: '0.8rem 2rem', background: 'rgba(255,255,255,0.02)', color: 'var(--text-dim)', cursor: 'pointer' }}>
          Load More Appraisals
        </button>
      </div>
    </div>
  );
};

export default Archive;
