import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3,
  Database,
  CheckCircle2,
  AlertCircle,
  FileText,
  RefreshCw,
  Globe,
  Cpu,
  ShieldCheck,
  Zap,
  Activity,
  Upload,
  Gavel,
  FileSearch,
  MessageSquarePlus,
  ArrowRight
} from 'lucide-react';

import { useDocuments } from '../context/DocumentContext';
import RiskChart from '../components/RiskChart';
import CAMViewer from '../components/CAMViewer';


const Appraisal = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [showCAM, setShowCAM] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [agentLog, setAgentLog] = useState<string[]>([]);
  
  const { documents } = useDocuments();

  const handleToggleDoc = (name: string) => {
    setSelectedDocs(prev => 
      prev.includes(name) ? prev.filter(d => d !== name) : [...prev, name]
    );
  };


  const handleStartAnalysis = async () => {
    if (selectedDocs.length === 0) return;
    
    setIsAnalyzing(true);
    setAgentLog([]);
    
    const sequence = [
      { agent: "Data Ingestor", msg: "Initializing secure node connection...", icon: <Upload size={16} /> },
      { agent: "Fin-Analyzer", msg: "Parsing P&L and Balance Sheet vectors...", icon: <Cpu size={16} /> },
      { agent: "Tax-Sleuth", msg: "Synthesizing GSTR vs Bank Statement flow...", icon: <Activity size={16} /> },
      { agent: "Legal-Bot", msg: "Web-crawling litigation history & e-courts...", icon: <Gavel size={16} /> },
      { agent: "Sector-Mind", msg: "Benchmarking against energy sector trends...", icon: <Globe size={16} /> },
      { agent: "Scoring-Core", msg: "Calculating 5 Cs explainable risk score...", icon: <BarChart3 size={16} /> }
    ];

    for (const step of sequence) {
      setActiveAgent(step.agent);
      setAgentLog(prev => [`[${step.agent}] ${step.msg}`, ...prev]);
      await new Promise(r => setTimeout(r, 1200));
    }

    try {
      const response = await fetch('http://localhost:8000/generate-cam?company=Reliance');
      const result = await response.json();
      setAnalysisData(result.decision);
    } catch (err) {
      console.error("Analysis failed", err);
    } finally {
      setIsAnalyzing(false);
      setActiveAgent(null);
    }
  };

  return (
    <div className="main-content">
      <AnimatePresence>
        {showCAM && (
          <CAMViewer data={analysisData} onClose={() => setShowCAM(false)} />
        )}
      </AnimatePresence>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.4rem', background: 'var(--grad-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1.5px' }}>
            Neural Appraisal Engine
          </h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1rem', fontWeight: 500 }}>High-intensity synthesis of structured and qualitative credit vectors.</p>
        </div>
        <div className="glass-panel" style={{ padding: '0.6rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', borderColor: 'var(--primary)', background: 'rgba(139, 92, 246, 0.05)', borderRadius: '0.8rem' }}>
          <ShieldCheck size={18} color="var(--primary)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>Secure Neural Node</span>
        </div>
      </header>


      <div className="responsive-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-panel" style={{ minHeight: '500px', position: 'relative', overflow: 'hidden', padding: '2.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{ position: 'relative' }}>
                  <Zap size={24} color="var(--primary)" fill="var(--primary)" />
                  <motion.div 
                    animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--primary)', borderRadius: '50%', filter: 'blur(10px)' }}
                  />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>Neural synthesis console</h3>
              </div>
              {analysisData && (
                <button 
                  onClick={() => setAnalysisData(null)}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '0.8rem', padding: '0.5rem 1rem', borderRadius: '0.6rem', fontWeight: 600 }}
                >
                  DEACTIVATE NODE
                </button>
              )}
            </div>

            <div style={{ height: '380px', position: 'relative' }}>
              {isAnalyzing ? (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'relative', marginBottom: '3rem' }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      style={{
                        width: '160px',
                        height: '160px',
                        border: '2px dashed rgba(139, 92, 246, 0.3)',
                        borderRadius: '50%',
                      }}
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        width: '140px',
                        height: '140px',
                        border: '2px solid transparent',
                        borderTop: '2px solid var(--primary)',
                        borderBottom: '2px solid var(--secondary)',
                        borderRadius: '50%',
                      }}
                    />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                       <Cpu size={40} color="white" />
                    </div>
                  </div>
                  
                  <h4 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>
                    Neural Link: {activeAgent}
                  </h4>
                  
                  <div style={{ 
                    width: '100%', 
                    maxWidth: '500px', 
                    height: '120px', 
                    background: 'rgba(0,0,0,0.5)', 
                    borderRadius: '1.2rem', 
                    padding: '1.5rem',
                    fontSize: '0.85rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    color: '#4ade80',
                    overflow: 'hidden',
                    border: '1px solid var(--glass-border)',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
                  }}>
                    {agentLog.map((log, i) => (
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={i} style={{ marginBottom: '0.4rem' }}>
                        <span style={{ opacity: 0.5 }}>[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span> {log}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : analysisData ? (
                <div className="responsive-grid" style={{ height: 'auto', minHeight: '100%' }}>
                  <div style={{ minHeight: '300px' }}>
                    <RiskChart scores={analysisData.scores} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.2rem', borderRadius: '1rem', borderLeft: '4px solid var(--primary)' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', fontWeight: 700 }}>AI Executive Summary</p>
                      <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.5, color: 'white' }}>{analysisData.explanation}</p>
                    </div>
                    <MetricItem label="Character" score={analysisData.scores.character} />
                    <MetricItem label="Capacity" score={analysisData.scores.capacity} />
                    <MetricItem label="Capital" score={analysisData.scores.capital} />
                    <motion.button 
                      whileHover={{ y: -5, boxShadow: '0 20px 40px -10px rgba(139, 92, 246, 0.5)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowCAM(true)}
                      className="btn-primary" 
                      style={{ marginTop: '2rem', padding: '1.2rem', fontSize: '1rem', fontWeight: 800 }}
                    >
                      EXECUTE CAM DOWNLOAD <CheckCircle2 size={18} />
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div style={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'var(--text-dim)', 
                  border: '1px dashed var(--glass-border)', 
                  borderRadius: '2rem',
                  gap: '2rem',
                  background: 'rgba(255,255,255,0.01)'
                }}>
                  <div style={{ position: 'relative' }}>
                    <FileSearch size={64} strokeWidth={1} style={{ opacity: 0.5 }} />
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ repeat: Infinity, duration: 3 }} style={{ position: 'absolute', top: -10, left: -10, right: -10, bottom: -10, border: '2px solid var(--primary)', borderRadius: '50%' }} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 900, color: 'white', fontSize: '1.5rem' }}>Intelligence Loop Inactive</h3>
                    <p style={{ margin: 0, fontSize: '1rem', fontWeight: 500 }}>Select neural nodes from the sidebar to begin synthesis</p>
                  </div>
                </div>
              )}
            </div>

            {!analysisData && !isAnalyzing && (
              <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                <motion.button 
                  whileHover={selectedDocs.length > 0 ? { y: -5, scale: 1.05 } : {}}
                  onClick={handleStartAnalysis}
                  className="btn-primary" 
                  disabled={selectedDocs.length === 0}
                  style={{ 
                    padding: '1.5rem 5rem', 
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    letterSpacing: '1px',
                    background: selectedDocs.length > 0 ? 'var(--grad-main)' : 'rgba(255,255,255,0.05)',
                    opacity: selectedDocs.length > 0 ? 1 : 0.4,
                    boxShadow: selectedDocs.length > 0 ? '0 20px 40px -10px rgba(139, 92, 246, 0.5)' : 'none'
                  }}
                >
                  ACTIVATE ANALYSIS SWARM
                </motion.button>
              </div>
            )}
          </div>


          <div className="glass-panel" style={{ textAlign: 'left' }}>
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'left' }}>Primary Insights & Qualitative Overlay</h3>
            <div style={{ position: 'relative', textAlign: 'left' }}>
              <textarea 
                placeholder="Enter field observations, management interview notes, and site visit highlights..."
                style={{ 
                  width: '100%', 
                  height: '140px', 
                  background: 'rgba(0,0,0,0.3)', 
                  border: '1px solid var(--glass-border)',
                  borderRadius: '1rem',
                  color: 'white',
                  padding: '1.2rem',
                  resize: 'none',
                  fontSize: '0.95rem',
                  marginBottom: '1rem',
                  outline: 'none'
                }}
              />
              <button className="btn-primary" style={{ position: 'absolute', bottom: '2rem', right: '1rem', padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
                <MessageSquarePlus size={16} /> Save Intel
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div className={`glass-panel ${selectedDocs.length === 0 ? 'pulse-border' : ''}`} style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 800 }}>Neural node selection</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {selectedDocs.length === 0 ? '← ACTIVE NODE REQUIRED' : `${selectedDocs.length} NODES SYNCED`}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {documents.map(doc => (
                <motion.div
                  key={doc.name}
                  onClick={() => handleToggleDoc(doc.name)}
                  whileHover={{ x: 5, background: 'rgba(255,255,255,0.05)' }}
                  style={{
                    padding: '1.2rem',
                    borderRadius: '1.2rem',
                    background: selectedDocs.includes(doc.name) ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255,255,255,0.01)',
                    border: '1px solid',
                    borderColor: selectedDocs.includes(doc.name) ? 'var(--primary)' : 'var(--glass-border)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ height: '40px', width: '40px', borderRadius: '0.8rem', background: selectedDocs.includes(doc.name) ? 'var(--primary)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Activity size={20} color={selectedDocs.includes(doc.name) ? 'white' : 'var(--text-dim)'} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: selectedDocs.includes(doc.name) ? 'white' : 'var(--text-dim)' }}>
                        {doc.name.split('.')[0]}
                      </p>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>{doc.category} Logic</p>
                    </div>
                  </div>
                  <div style={{ 
                    width: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    border: '2px solid', 
                    borderColor: selectedDocs.includes(doc.name) ? 'var(--primary)' : 'var(--glass-border)',
                    background: selectedDocs.includes(doc.name) ? 'var(--primary)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {selectedDocs.includes(doc.name) && <CheckCircle2 size={14} color="white" />}
                  </div>
                </motion.div>
              ))}
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2rem', textAlign: 'center', fontWeight: 600 }}>
              ESTABLISH AT LEAST 1 NEURAL LINK
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 800 }}>Global agent status</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <AgentStatusItem label="Ingestion Node" status="READY" active />
              <AgentStatusItem label="Neural Synthesis" status="SYNCED" active />
              <AgentStatusItem label="Research Swarm" status="CRAWLING" active />
              <AgentStatusItem label="PDF Generator" status="STANDBY" active={false} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const MetricItem = ({ label, score }: { label: string, score: number }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
      <span style={{ color: 'var(--text-dim)', fontWeight: 500 }}>{label} Factor</span>
      <span style={{ fontWeight: 700, color: score > 70 ? '#4ade80' : 'white' }}>{score}%</span>
    </div>
    <div style={{ height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ height: '100%', background: score > 70 ? 'var(--grad-main)' : '#f87171' }}
      />
    </div>
  </div>
);

const AgentStatusItem = ({ label, status, active }: { label: string, status: string, active: boolean }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
    <span style={{ color: 'var(--text-dim)' }}>{label}</span>
    <span style={{ 
      color: active ? '#4ade80' : 'var(--text-dim)', 
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem'
    }}>
      {active && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} className="animate-pulse" />}
      {status}
    </span>
  </div>
);

export default Appraisal;
