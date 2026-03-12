import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Shield, 
  Key, 
  Cpu, 
  Bell, 
  Globe, 
  Monitor,
  Database,
  Save,
  RefreshCw,
  LogOut,
  ChevronRight,
  Zap
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="main-content">
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'var(--grad-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Portal Settings
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>Manage your AI nodes, security protocols, and account preferences.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '3rem' }}>
        {/* Navigation Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <SettingsNavItem icon={<User size={18} />} label="Profile & Identity" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
          <SettingsNavItem icon={<Shield size={18} />} label="Security & Access" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
          <SettingsNavItem icon={<Cpu size={18} />} label="Neural Node Config" active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} />
          <SettingsNavItem icon={<Database size={18} />} label="Data Connectivity" active={activeTab === 'data'} onClick={() => setActiveTab('data')} />
          <SettingsNavItem icon={<Bell size={18} />} label="Alert Notifications" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
          <SettingsNavItem icon={<Globe size={18} />} label="Global Standards" active={activeTab === 'global'} onClick={() => setActiveTab('global')} />
        </div>

        {/* Content Area */}
        <div className="glass-panel" style={{ padding: '3rem', minHeight: '600px' }}>
          {activeTab === 'profile' && <ProfileSection />}
          {activeTab === 'ai' && <AIConfigSection />}
          {activeTab === 'security' && <SecuritySection />}
          
          <div style={{ marginTop: 'auto', paddingTop: '3rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button className="glass-panel" style={{ padding: '1rem 2rem', background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}>Cancel Changes</button>
            <button className="btn-primary" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Save size={18} /> Update Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsNavItem = ({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    onClick={onClick}
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '1.2rem 1.5rem', 
      borderRadius: '1rem',
      background: active ? 'var(--grad-main)' : 'rgba(255,255,255,0.02)',
      color: active ? 'white' : 'var(--text-dim)',
      cursor: 'pointer',
      fontWeight: 600,
      border: '1px solid',
      borderColor: active ? 'var(--primary)' : 'transparent',
      boxShadow: active ? '0 10px 20px -5px rgba(139, 92, 246, 0.3)' : 'none'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {icon}
      <span>{label}</span>
    </div>
    <ChevronRight size={16} style={{ opacity: active ? 1 : 0.3 }} />
  </motion.div>
);

const ProfileSection = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <h3 style={{ marginBottom: '2.5rem', fontSize: '1.5rem' }}>Personal Identity</h3>
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
      <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--grad-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <User size={48} color="white" />
      </div>
      <div>
        <button className="btn-primary" style={{ padding: '0.6rem 1.5rem', marginBottom: '0.8rem' }}>Replace Avatar</button>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>JPEG, PNG, or SVG. Max 2MB.</p>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <InputGroup label="Full Name" value="Nexus Administrator" />
      <InputGroup label="Email Address" value="admin@nexus-intelligence.ai" />
      <InputGroup label="Organization" value="Global Credit Swarm" />
      <InputGroup label="Designation" value="Senior Credit Underwriter" />
    </div>
  </motion.div>
);

const AIConfigSection = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
      <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Neural Node Configuration</h3>
      <span style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', borderRadius: '1rem', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', fontWeight: 700 }}>
        Status: High Sync
      </span>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <AIModelCard name="Nexus Global v3" desc="Full-spectrum intelligence with real-time news synthesis." active />
      <AIModelCard name="TaxSleuth Alpha" desc="Specialized in GST vs Bank Statement circular trading detection." />
      <AIModelCard name="LegalSwarm Core" desc="High-speed NCLT and litigation history crawler." />
    </div>
  </motion.div>
);

const SecuritySection = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <h3 style={{ marginBottom: '2.5rem', fontSize: '1.5rem' }}>Access & API Integrity</h3>
    
    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '1.5rem', border: '1px solid var(--glass-border)', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Active API Master Key</h4>
          <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '0.9rem' }}>Used for global intelligence swarm authentication.</p>
        </div>
        <button className="glass-panel" style={{ padding: '0.6rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)' }}>
          <RefreshCw size={14} /> Regenerate
        </button>
      </div>
      <div style={{ background: '#000', padding: '1.2rem', borderRadius: '0.8rem', border: '1px solid var(--glass-border)', fontFamily: 'monospace', color: 'var(--primary)', letterSpacing: '2px' }}>
        NX-SURVEIL-4421-XXXX-REDACTED
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Shield size={20} color="var(--primary)" />
      <span style={{ color: 'var(--text-dim)' }}>Quantum-Resistance Encryption Active</span>
    </div>
  </motion.div>
);

const InputGroup = ({ label, value }: { label: string, value: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
    <label style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>{label}</label>
    <input 
      type="text" 
      value={value} 
      readOnly
      style={{ 
        padding: '1rem', 
        background: 'rgba(255,255,255,0.02)', 
        border: '1px solid var(--glass-border)', 
        borderRadius: '0.8rem', 
        color: 'white',
        outline: 'none'
      }} 
    />
  </div>
);

const AIModelCard = ({ name, desc, active = false }: { name: string, desc: string, active?: boolean }) => (
  <div style={{ 
    padding: '2rem', 
    background: active ? 'rgba(139, 92, 246, 0.05)' : 'rgba(255,255,255,0.02)', 
    borderRadius: '1.5rem', 
    border: '1px solid',
    borderColor: active ? 'var(--primary)' : 'var(--glass-border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <div>
      <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        {name} {active && <Zap size={16} color="var(--primary)" fill="var(--primary)" />}
      </h4>
      <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '0.9rem' }}>{desc}</p>
    </div>
    <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid', borderColor: active ? 'var(--primary)' : 'var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {active && <div style={{ width: 12, height: 12, background: 'var(--primary)', borderRadius: '50%' }} />}
    </div>
  </div>
);

export default Settings;
