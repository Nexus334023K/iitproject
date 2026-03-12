import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  Search, 
  Landmark, 
  AlertTriangle,
  Globe,
  PieChart as PieIcon,
  BarChart as BarIcon,
  Layout
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from 'recharts';

const sectorData = [
  { name: 'Manufacturing', value: 450, color: 'var(--primary)' },
  { name: 'Infrastructure', value: 300, color: 'var(--secondary)' },
  { name: 'Tech Services', value: 250, color: '#6366f1' },
  { name: 'Retail', value: 150, color: 'var(--accent)' },
  { name: 'Others', value: 90, color: 'var(--text-dim)' },
];

const riskTrends = [
  { month: 'Oct', risk: 65, limit: 1100 },
  { month: 'Nov', risk: 62, limit: 1150 },
  { month: 'Dec', risk: 68, limit: 1200 },
  { month: 'Jan', risk: 72, limit: 1210 },
  { month: 'Feb', risk: 70, limit: 1230 },
  { month: 'Mar', risk: 74, limit: 1240 },
];

const Dashboard = () => {
  return (
    <div className="main-content">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.4rem', background: 'var(--grad-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1.5px' }}
          >
            Executive Command
          </motion.h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1rem', fontWeight: 500 }}>Global credit surveillance and neural portfolio intelligence.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass-panel" style={{ padding: '0.6rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', borderRadius: '0.8rem', background: 'rgba(255,255,255,0.02)' }}>
            <Search size={16} color="var(--text-dim)" />
            <input 
              placeholder="Search Intelligence Swarm..." 
              style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '200px', fontSize: '0.85rem' }}
            />
          </div>
        </div>
      </header>

      <section className="hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <StatCard title="Total Swarm Exposure" value="₹1,240 Cr" delta="+8.4%" icon={<Landmark color="var(--primary)" />} gradient="var(--primary)" />
        <StatCard title="System Health" value="98.2%" delta="Prime" icon={<ShieldCheck color="var(--secondary)" />} gradient="var(--secondary)" />
        <StatCard title="Priority Alerts" value="03" delta="+1" icon={<AlertTriangle color="var(--accent)" />} warning gradient="var(--accent)" />
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ minHeight: '500px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <PieIcon size={24} color="var(--primary)" />
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Sector Exposure</h3>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Real-time Distribution</span>
          </div>
          <div style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={90}
                  outerRadius={130}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: 'rgba(2, 1, 10, 0.95)', border: '1px solid var(--glass-border)', borderRadius: '1rem', backdropFilter: 'blur(20px)' }}
                  itemStyle={{ color: '#fff', fontWeight: 700 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel" style={{ minHeight: '500px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <TrendingUp size={24} color="var(--secondary)" />
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Risk Trajectory</h3>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
               <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '0.5rem', padding: '0.4rem 1rem', fontSize: '0.8rem', fontWeight: 600 }}>6 Months</button>
            </div>
          </div>
          <div style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskTrends}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="var(--text-dim)" fontSize={12} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} />
                <YAxis stroke="var(--text-dim)" fontSize={12} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(2, 1, 10, 0.95)', border: '1px solid var(--glass-border)', borderRadius: '1rem', backdropFilter: 'blur(20px)' }}
                />
                <Area type="monotone" dataKey="risk" stroke="var(--primary)" fillOpacity={1} fill="url(#colorRisk)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Activity size={24} color="var(--primary)" />
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Neural Swarm Feed</h3>
            </div>
            <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', padding: '0.6rem 1.2rem', borderRadius: '0.8rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>Global Alerts</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <AlertItem 
              type="danger" 
              title="Liquidity Conflict Detected" 
              entity="TATA Motors Logistics"
              desc="Circular trading patterns identified in GSTR-3B filings across 4 separate SBI accounts within the same cluster."
              time="12m ago"
            />
            <AlertItem 
              type="warning" 
              title="Risk Profile Escalated" 
              entity="Adani Green Energy"
              desc="CRISIL outlook revision from Stable to Negative. Swarm crawl detected board-level litigation filings."
              time="1h ago"
            />
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 800 }}>Hot Surveillance</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <SurveillanceItem name="Hindustan Steel" score={62} status="High Risk" />
            <SurveillanceItem name="Infosys Global" score={94} status="Optimal" />
            <SurveillanceItem name="Bharat Electronics" score={78} status="Stable" />
            <SurveillanceItem name="Nexus AI Corp" score={98} status="Optimal" />
          </div>
          <button className="btn-primary" style={{ width: '100%', marginTop: '3rem', padding: '1.2rem', fontSize: '1rem', fontWeight: 800 }}>Manage Neural Watchlist</button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, delta, icon, warning = false, gradient }: any) => (
  <motion.div 
    whileHover={{ y: -5, boxShadow: `0 20px 40px -10px ${gradient}33` }}
    className="glass-panel" 
    style={{ 
      padding: '2rem',
      border: `1px solid ${warning ? 'rgba(244, 63, 94, 0.3)' : 'var(--glass-border)'}`,
      background: 'rgba(255,255,255,0.02)',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <div style={{ position: 'absolute', top: '-1rem', right: '-1rem', width: '80px', height: '80px', background: gradient, filter: 'blur(50px)', opacity: 0.1 }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</p>
      <div style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem' }}>{icon}</div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <h2 style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-2px', margin: 0 }}>{value}</h2>
      <span style={{ 
        color: delta.startsWith('+') ? '#4ade80' : warning ? 'var(--accent)' : '#888', 
        fontSize: '0.85rem', 
        fontWeight: 800,
        padding: '0.4rem 0.8rem',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '2rem',
        border: '1px solid var(--glass-border)'
      }}>{delta}</span>
    </div>
  </motion.div>
);

const AlertItem = ({ type, title, entity, desc, time }: any) => (
  <div style={{ 
    padding: '1.5rem', 
    background: 'rgba(255,255,255,0.02)', 
    borderRadius: '1.2rem', 
    borderLeft: `5px solid ${type === 'danger' ? 'var(--accent)' : type === 'warning' ? '#f59e0b' : '#4ade80'}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    border: '1px solid var(--glass-border)'
  }}>
    <div style={{ maxWidth: '85%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
        <p style={{ margin: 0, fontWeight: 900, fontSize: '1.1rem' }}>{title}</p>
        <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', fontWeight: 700 }}>{entity}</span>
      </div>
      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{desc}</p>
    </div>
    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', whiteSpace: 'nowrap', fontWeight: 700 }}>{time}</span>
  </div>
);

const SurveillanceItem = ({ name, score, status }: any) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
      <span style={{ fontWeight: 800, fontSize: '1rem' }}>{name}</span>
      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: status === 'High Risk' ? 'var(--accent)' : status === 'Optimal' ? '#4ade80' : 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{status}</span>
    </div>
    <div style={{ textAlign: 'right' }}>
      <span style={{ fontSize: '1.3rem', fontWeight: 900, color: score < 70 ? 'var(--accent)' : '#4ade80' }}>{score}</span>
      <div style={{ width: '80px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', marginTop: '6px', border: '1px solid var(--glass-border)' }}>
        <div style={{ width: `${score}%`, height: '100%', background: score < 70 ? 'var(--accent)' : '#4ade80', borderRadius: '3px', boxShadow: `0 0 10px ${score < 70 ? 'var(--accent)' : '#4ade80'}66` }}></div>
      </div>
    </div>
  </div>
);


export default Dashboard;
