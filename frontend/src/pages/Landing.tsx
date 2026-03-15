import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, ArrowRight, Zap, Target, Landmark, BarChart3, Globe, Cpu, Shield, Search, ChevronRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  const nodes = [
    { 
      icon: <Cpu size={40} />, 
      title: "Neural Synthesis", 
      desc: "Cross-references GST, ITR, and Bank Statements to detect circular trading patterns in milliseconds.", 
      color: "var(--primary)",
      details: "Our synthesis engine uses advanced graph neural networks to map financial flows across multiple entities. It automatically flags high-velocity transitions, tax-mismatch patterns, and non-linear bank rotations that often elude manual audits.",
      tech: "GNN Architecture • Bayesian Risk Weights • Real-time OCR Pipeline",
      signal: "Circular Trading Detection • Revenue Leakage Analysis • Multi-Entity Debt Linkage"
    },
    { 
      icon: <Globe size={40} />, 
      title: "Swarm Surveillance", 
      desc: "Autonomous search agents crawl legal, news, and regulatory databases for deep promoter insights.", 
      color: "var(--secondary)",
      details: "The nexus swarm operates 24/7, monitoring E-courts, MCA filings, and global news outlets. It extracts sentiment from board-level announcements and cross-links litigation history to provide a live reputation score for every promoter.",
      tech: "NLP Sentiment Extraction • Distributed Scrapy Cluster • Entity Resolution Engine",
      signal: "Negative News Sentinel • Litigation History Crawl • Promoter Network Mapping"
    },
    { 
      icon: <Shield size={40} />, 
      title: "Explainable Proof", 
      desc: "Every risk score is backed by the Five Cs framework and traceable logic logs for total transparency.", 
      color: "var(--accent)",
      details: "No 'black box' decisions. NEXUS generates a serialized audit trail for every scoring adjustment. Credit officers can drill down into specific data points, seeing exactly which transaction or news event triggered a change in the 5C profile.",
      tech: "SHA-256 Logic Hashing • SHAP Attribution Maps • Automated CAM Synthesis",
      signal: "Audit Ready Evidence • Decision Traceability • 5C Framework Alignment"
    }
  ];

  return (
    <div className="landing-page" style={{ background: 'var(--bg-deep)', color: 'white', overflowX: 'hidden' }}>
      {/* Cinematic Background Particles */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.4 }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: 'var(--primary)',
              borderRadius: '50%',
              filter: 'blur(2px)',
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(2, 1, 10, 0.95)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(20px)'
            }}
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              style={{
                width: '90%',
                maxWidth: '1200px',
                aspectRatio: '16/9',
                background: '#000',
                borderRadius: '2rem',
                overflow: 'hidden',
                boxShadow: '0 0 100px rgba(139, 92, 246, 0.4)',
                position: 'relative',
                border: '1px solid var(--glass-border)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="NEXUS Intelligence Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}

        {selectedNode && (
          <IntelligenceModal node={selectedNode} onClose={() => setSelectedNode(null)} />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1.5rem 2rem',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(2, 1, 10, 0.4)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--glass-border)'
        }}
        className="landing-nav"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Zap size={28} color="var(--primary)" fill="var(--primary)" />
          <span style={{ fontSize: '1.5rem', fontWeight: 900, background: 'var(--grad-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NEXUS</span>
        </div>
        
        {/* Desktop Links */}
        <div className="nav-links-desktop" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['Intelligence', 'Swarm', 'Network', 'Security'].map(item => (
            <Link key={item} to="/" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>{item}</Link>
          ))}
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <motion.button style={{ padding: '0.7rem 1.5rem', borderRadius: '2rem', background: 'var(--grad-main)', border: 'none', color: 'white', fontWeight: 700, cursor: 'pointer' }}>Portal</motion.button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="nav-menu-toggle"
          style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'none' }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: 'fixed',
                top: '64px',
                left: 0,
                right: 0,
                background: 'rgba(2, 1, 10, 0.98)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                borderBottom: '1px solid var(--glass-border)',
                backdropFilter: 'blur(20px)'
              }}
            >
              {['Intelligence', 'Swarm', 'Network', 'Security'].map(item => (
                <Link key={item} to="/" onClick={() => setIsMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: '1.2rem' }}>{item}</Link>
              ))}
              <Link to="/login" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', padding: '1rem', borderRadius: '1rem', background: 'var(--grad-main)', border: 'none', color: 'white', fontWeight: 800 }}>Portal</button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        padding: '0 4rem'
      }}>
        <motion.div
           style={{ y: y1, opacity, scale, textAlign: 'center' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            style={{ 
              background: 'rgba(139, 92, 246, 0.05)', 
              color: 'var(--primary)', 
              padding: '0.6rem 2rem', 
              borderRadius: '3rem', 
              fontSize: '0.85rem', 
              fontWeight: 800,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              marginBottom: '3rem',
              display: 'inline-block'
            }}
          >
            Intelligence Redefined • Version 3.0
          </motion.div>
          
          <h1 
            className="hero-title"
            style={{ 
              fontSize: 'min(15vw, 7.5rem)', 
              lineHeight: 0.9, 
              fontWeight: 900,
              letterSpacing: '-5px',
              marginBottom: '2.5rem',
              background: 'linear-gradient(to bottom, #fff 30%, rgba(255,255,255,0.2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              maxWidth: '1200px'
            }}
          >
            Automate the Human <br/> Element of Risk
          </h1>

          <p style={{ 
            color: 'var(--text-dim)', 
            fontSize: 'min(5vw, 1.6rem)', 
            maxWidth: '850px', 
            margin: '0 auto 4rem auto', 
            lineHeight: 1.4,
            fontWeight: 500
          }}>
            Empower your credit underwriting with a multi-pillar neural swarm that synthesizes raw data into actionable intelligence in seconds.
          </p>

          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <motion.button 
                whileHover={{ y: -5, scale: 1.02 }}
                style={{ 
                  padding: '1.5rem 4rem', 
                  fontSize: '1.2rem', 
                  fontWeight: 800, 
                  borderRadius: '1rem', 
                  background: 'var(--grad-main)', 
                  border: 'none', 
                  color: 'white',
                  boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                Enter Neural Loop <ArrowRight size={24} />
              </motion.button>
            </Link>

            <motion.button 
              onClick={() => setShowVideo(true)}
              whileHover={{ y: -5, background: 'rgba(255,255,255,0.05)' }}
              style={{ 
                background: 'transparent', 
                border: '1px solid var(--glass-border)', 
                padding: '1.5rem 4rem', 
                fontSize: '1.2rem', 
                fontWeight: 700, 
                borderRadius: '1rem',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backdropFilter: 'blur(10px)'
              }}
            >
              Watch Intelligence in Action
            </motion.button>
          </div>
        </motion.div>

        {/* Floating Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', bottom: '3rem', color: 'var(--text-dim)', fontSize: '0.8rem', opacity: 0.5, letterSpacing: '2px', textTransform: 'uppercase' }}
        >
          Scroll to explore the swarm
        </motion.div>
      </section>

      {/* Feature Section with 3D Effect */}
      <section style={{ padding: '15rem 6rem', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
          <h2 style={{ fontSize: '4rem', fontWeight: 900, letterSpacing: '-2px', marginBottom: '1.5rem' }}>Core Intelligence Pillars</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.3rem', maxWidth: '600px', margin: '0 auto' }}>NEXUS leverages four autonomous modules to ensure 360° credit visibility.</p>
        </div>

        <div className="hero-stats" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {nodes.map(node => (
            <IntelligenceNode 
              key={node.title}
              {...node}
              onExplore={() => setSelectedNode(node)}
            />
          ))}
        </div>
      </section>

      {/* Modern Footer */}
      <footer style={{ padding: '6rem 2rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem' }}>
          <div style={{ maxWidth: '400px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <Zap size={32} color="var(--primary)" fill="var(--primary)" />
              <span style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-1.5px' }}>NEXUS</span>
            </div>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, fontSize: '1.1rem' }}>
              The world's most advanced AI-driven credit appraisal infrastructure. Built for high-stakes decisioning.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '4rem', flex: 1 }}>
            <FooterColumn title="Platform" links={['Neural Link', 'Data Room', 'Appraisal', 'Archive']} />
            <FooterColumn title="Security" links={['Encryption', 'Compliance', 'Privacy', 'Nodes']} />
            <FooterColumn title="Company" links={['About', 'Network', 'Support', 'Legal']} />
          </div>
        </div>
        <div style={{ marginTop: '6rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', color: 'var(--text-dim)', fontSize: '0.9rem', textAlign: 'center' }}>
          <p>© 2026 NEXUS Intelligence Swarm. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const IntelligenceModal = ({ node, onClose }: { node: any, onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(2, 1, 10, 0.92)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(30px)',
      padding: '2rem'
    }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 40 }}
      style={{
        width: '100%',
        maxWidth: '850px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
        borderRadius: '3rem',
        padding: '3.5rem',
        border: `1px solid ${node.color}55`,
        boxShadow: `0 0 120px ${node.color}15`,
        position: 'relative',
        overflow: 'hidden'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Animated Neural UI Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.1 }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path 
            d="M0,50 Q25,25 50,50 T100,50" 
            stroke={node.color} 
            strokeWidth="0.5" 
            fill="none"
            animate={{ d: ["M0,50 Q25,20 50,50 T100,50", "M0,50 Q25,80 50,50 T100,50", "M0,50 Q25,20 50,50 T100,50"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '2.5rem', color: node.color, display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.04)', borderRadius: '1.5rem', border: `1px solid ${node.color}33` }}
          >
            {node.icon}
          </motion.div>
          <div>
            <h2 style={{ fontSize: '3rem', margin: 0, letterSpacing: '-2px', fontWeight: 900 }}>{node.title}</h2>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
              <span className="status-badge" style={{ background: `${node.color}22`, color: node.color, fontSize: '0.7rem', border: `1px solid ${node.color}44` }}>ACTIVE_NODE</span>
              <span className="status-badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', fontSize: '0.7rem' }}>SECURE_LOOP</span>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '1.4rem', color: 'white', lineHeight: 1.5, marginBottom: '2.5rem', fontWeight: 700, maxWidth: '90%' }}>
          {node.desc}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.8rem', borderRadius: '1.8rem', border: '1px solid var(--glass-border)' }}>
            <h4 style={{ margin: '0 0 1rem', fontSize: '0.75rem', color: node.color, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800 }}>Technical Architecture</h4>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, fontSize: '0.85rem', margin: 0 }}>{node.tech}</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.8rem', borderRadius: '1.8rem', border: '1px solid var(--glass-border)' }}>
            <h4 style={{ margin: '0 0 1rem', fontSize: '0.75rem', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800 }}>Intelligence Signal</h4>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, fontSize: '0.85rem', margin: 0 }}>{node.signal}</p>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2.5rem', borderRadius: '2rem', border: '1px solid var(--glass-border)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '1.5rem', right: '2rem', opacity: 0.2 }}>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 4 }}>
              <Target size={40} color={node.color} />
            </motion.div>
          </div>
          <h4 style={{ margin: '0 0 1.2rem', fontSize: '0.9rem', color: 'white', fontWeight: 800 }}>Deep Insight Breakdown</h4>
          <p style={{ color: 'var(--text-dim)', lineHeight: 1.8, fontSize: '1.05rem', margin: 0 }}>
            {node.details}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem' }}>
          <button 
            onClick={onClose}
            style={{ 
              flex: 1, 
              padding: '1.4rem', 
              borderRadius: '1.2rem', 
              background: 'var(--grad-main)', 
              border: 'none', 
              color: 'white', 
              fontWeight: 800, 
              cursor: 'pointer',
              letterSpacing: '1px'
            }}
          >
            ACKNOWLEDGE & EXIT
          </button>
          <button 
            style={{ 
              padding: '1.4rem 2.5rem', 
              borderRadius: '1.2rem', 
              background: 'transparent', 
              border: '1px solid var(--glass-border)', 
              color: 'white', 
              fontWeight: 700, 
              cursor: 'pointer'
            }}
          >
            VIEW LOGS
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const IntelligenceNode = ({ icon, title, desc, color, onExplore }: { icon: any, title: string, desc: string, color: string, onExplore: () => void }) => (
  <motion.div 
    whileHover={{ y: -15, boxShadow: `0 30px 60px -12px ${color}33` }}
    className="glass-panel" 
    style={{ 
      textAlign: 'left', 
      padding: '4rem 3rem',
      position: 'relative',
      overflow: 'hidden',
      border: `1px solid var(--glass-border)`
    }}
  >
    <div style={{ 
      position: 'absolute', 
      top: '-2rem', 
      right: '-2rem', 
      width: '120px', 
      height: '120px', 
      background: color, 
      filter: 'blur(80px)', 
      opacity: 0.15 
    }} />
    <div style={{ marginBottom: '2.5rem', color: color }}>{icon}</div>
    <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 800 }}>{title}</h3>
    <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, fontSize: '1.1rem' }}>{desc}</p>
    <div 
      onClick={onExplore}
      style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'white', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
    >
      Explore Module <ChevronRight size={16} />
    </div>
  </motion.div>
);

const FooterColumn = ({ title, links }: { title: string, links: string[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{title}</h4>
    {links.map(link => (
      <Link key={link} to="/" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}>{link}</Link>
    ))}
  </div>
);

export default Landing;
