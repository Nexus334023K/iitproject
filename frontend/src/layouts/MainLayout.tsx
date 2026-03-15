import { ReactNode, useState } from 'react';
import { 
  LayoutDashboard, 
  FileSearch, 
  BarChart3, 
  Settings, 
  Zap, 
  Archive,
  Database,
  Menu,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NeuralLink from '../components/NeuralLink';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="app-wrapper">
      {/* Mobile Header */}
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '64px', 
          background: 'rgba(15, 23, 42, 0.8)', 
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.5rem',
          zIndex: 100,
          justifyContent: 'space-between'
        }}
        className="mobile-header"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Zap size={24} color="var(--primary)" fill="var(--primary)" />
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Intelli-Credit</h2>
        </div>
        <button 
          onClick={toggleSidebar}
          style={{ 
            background: 'rgba(255,255,255,0.05)', 
            border: '1px solid var(--glass-border)', 
            color: 'white', 
            padding: '0.5rem', 
            borderRadius: '0.5rem',
            cursor: 'pointer' 
          }}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 999
            }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`sidebar-nav ${isSidebarOpen ? 'active' : ''}`}>
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
            onClick={closeSidebar}
          />
          <NavItem 
            to="/data-room" 
            icon={<Database size={20} />} 
            label="Data Room" 
            active={location.pathname === '/data-room'} 
            onClick={closeSidebar}
          />
          <NavItem 
            to="/appraisal" 
            icon={<FileSearch size={20} />} 
            label="Appraisal Engine" 
            active={location.pathname === '/appraisal'} 
            onClick={closeSidebar}
          />
          <NavItem 
            to="/market-intelligence" 
            icon={<BarChart3 size={20} />} 
            label="Market Intelligence" 
            active={location.pathname === '/market-intelligence'} 
            onClick={closeSidebar}
          />
          <NavItem 
            to="/archive" 
            icon={<Archive size={20} />} 
            label="CAM Archive" 
            active={location.pathname === '/archive'} 
            onClick={closeSidebar}
          />
          <NavItem 
            to="/settings" 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={location.pathname === '/settings'} 
            onClick={closeSidebar}
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
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, active, onClick }: NavItemProps) => (
  <Link to={to} style={{ textDecoration: 'none' }} onClick={onClick}>
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
