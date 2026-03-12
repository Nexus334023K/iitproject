import { ReactNode } from 'react';
import { 
  LayoutDashboard, 
  FileSearch, 
  BarChart3, 
  Settings, 
  Zap, 
  Archive,
  Database
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import NeuralLink from '../components/NeuralLink';

interface MainLayoutProps {

  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();

  return (
    <div className="app-wrapper">
      {/* Sidebar */}
      <aside className="sidebar-nav">
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
          <Zap size={32} color="var(--primary)" fill="var(--primary)" />
          <h2 style={{ fontSize: '1.4rem', letterSpacing: '-0.5px' }}>Intelli-Credit</h2>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <NavItem 
            to="/dashboard" 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={location.pathname === '/dashboard'} 
          />
          <NavItem 
            to="/data-room" 
            icon={<Database size={20} />} 
            label="Data Room" 
            active={location.pathname === '/data-room'} 
          />
          <NavItem 
            to="/appraisal" 
            icon={<FileSearch size={20} />} 
            label="Appraisal Engine" 
            active={location.pathname === '/appraisal'} 
          />
          <NavItem 
            to="/market-intelligence" 
            icon={<BarChart3 size={20} />} 
            label="Market Intelligence" 
            active={location.pathname === '/market-intelligence'} 
          />
          <NavItem 
            to="/archive" 
            icon={<Archive size={20} />} 
            label="CAM Archive" 
            active={location.pathname === '/archive'} 
          />
          <NavItem 
            to="/settings" 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={location.pathname === '/settings'} 
          />
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel" 
            style={{ padding: '1.2rem', fontSize: '0.85rem', border: '1px solid var(--primary)' }}
          >
            <p style={{ color: 'var(--text-main)', fontWeight: 600, marginBottom: '0.5rem' }}>Enterprise Node</p>
            <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>Active Connection Secured</p>
            <button className="btn-primary" style={{ width: '100%', padding: '0.6rem' }}>Sync Nodes</button>
          </motion.div>
          
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button 
              className="btn-primary" 
              style={{ 
                width: '100%', 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid var(--glass-border)',
                color: 'var(--text-dim)'
              }}
            >
              Log Out Session
            </button>
          </Link>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="main-viewport">
        {children}
      </main>
      <NeuralLink />
    </div>
  );
};


interface NavItemProps {
  to: string;
  icon: JSX.Element;
  label: string;
  active: boolean;
}

const NavItem = ({ to, icon, label, active }: NavItemProps) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <motion.div 
      whileHover={{ x: 5 }}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem', 
        padding: '1rem 1.2rem', 
        borderRadius: '1rem',
        background: active ? 'var(--grad-main)' : 'transparent',
        color: active ? 'white' : 'var(--text-dim)',
        cursor: 'pointer',
        fontWeight: active ? 700 : 500,
        boxShadow: active ? '0 10px 20px -5px rgba(139, 92, 246, 0.4)' : 'none'
      }}
    >
      {icon}
      <span>{label}</span>
    </motion.div>
  </Link>
);

export default MainLayout;
