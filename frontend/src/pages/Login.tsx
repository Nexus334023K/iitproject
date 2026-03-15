import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, #1e1b4b 0%, #030014 100%)',
      padding: '2rem'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel"
        style={{ width: '100%', maxWidth: '450px', padding: 'min(3rem, 5vw)' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Zap size={48} color="var(--primary)" fill="var(--primary)" />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Nexus Portal</h2>
          <p style={{ color: 'var(--text-dim)' }}>Enterprise Credit Intelligence Login</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Mail style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', zIndex: 10 }} size={18} />
            <input 
              type="email" 
              placeholder="Corporate Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '1.2rem 1.2rem 1.2rem 3.5rem', 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid var(--glass-border)',
                borderRadius: '1rem',
                color: 'white',
                outline: 'none',
                fontSize: '1rem',
                position: 'relative'
              }} 
            />
          </div>

          <div style={{ position: 'relative', width: '100%' }}>
            <Lock style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', zIndex: 10 }} size={18} />
            <input 
              type="password" 
              placeholder="Access Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '1.2rem 1.2rem 1.2rem 3.5rem', 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid var(--glass-border)',
                borderRadius: '1rem',
                color: 'white',
                outline: 'none',
                fontSize: '1rem',
                position: 'relative'
              }} 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0 0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', cursor: 'pointer' }}>
              <input type="checkbox" style={{ accentColor: 'var(--primary)' }} /> Remember access
            </label>
            <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Revoke key?</a>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', height: '60px', fontSize: '1.1rem', marginTop: '0.5rem', borderRadius: '1.2rem' }}
            disabled={isLoading}
          >
            {isLoading ? "Authenticating Session..." : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>Secure Entry <ArrowRight size={20} /></span>
            )}
          </button>
        </form>

        <div style={{ 
          marginTop: '2rem', 
          padding: '1.2rem', 
          background: 'rgba(79, 70, 229, 0.05)', 
          border: '1px dashed var(--primary)',
          borderRadius: '1rem',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: 0 }}>
            Demo Access: <span style={{ color: 'var(--primary)', fontWeight: 800 }}>admin@nexus.ai</span> / <span style={{ color: 'var(--primary)', fontWeight: 800 }}>nexus2026</span>
          </p>
        </div>

        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
            Don't have access? <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 700 }}>Contact Administrator</a>
          </p>
        </div>


        <div style={{ 
          marginTop: '3rem', 
          padding: '1.2rem', 
          background: 'rgba(244, 63, 94, 0.05)', 
          border: '1px solid rgba(244, 63, 94, 0.1)',
          borderRadius: '1rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <ShieldCheck size={20} color="var(--accent)" />
          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', margin: 0, fontWeight: 500 }}>
            End-to-end encrypted node connection active.
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default Login;
