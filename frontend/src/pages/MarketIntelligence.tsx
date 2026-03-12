import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  TrendingUp, 
  Newspaper, 
  AlertTriangle, 
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Search,
  MessageSquare,
  Cpu
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const MarketIntelligence = () => {
  const [activeSector, setActiveSector] = useState('Energy');
  const [selectedSectorDetails, setSelectedSectorDetails] = useState<any>(null);
  const [selectedNews, setSelectedNews] = useState<any>(null);

  const sectorMetrics = [
    { 
      name: 'Energy', 
      health: 82, 
      trend: 'stable', 
      risk: 'Medium',
      metrics: {
        volatility: 'Low',
        confidence: 88,
        sentiment: 'Stable'
      },
      insights: [
        "Inventory levels rising due to decreased industrial demand.",
        "Refining margins under pressure from high input costs.",
        "Renewable transition slowing down in Tier 2 sectors."
      ]
    },
    { 
      name: 'Financials', 
      health: 65, 
      trend: 'down', 
      risk: 'High',
      metrics: {
        volatility: 'High',
        confidence: 72,
        sentiment: 'Bearish'
      },
      insights: [
        "NPA ratios creeping up in the mid-size retail segment.",
        "Cost of funds rising following central bank intervention.",
        "Liquidity coverage ratios remaining above regulatory minimums."
      ]
    },
    { 
      name: 'TMT', 
      health: 91, 
      trend: 'up', 
      risk: 'Low',
      metrics: {
        volatility: 'Medium',
        confidence: 94,
        sentiment: 'Bullish'
      },
      insights: [
        "Strong ARR growth in SaaS exports to North America.",
        "Hardware supply chain localized to prevent future shocks.",
        "Talent retention costs stabilizing after 18-month spike."
      ]
    },
    { 
      name: 'Manufacturing', 
      health: 74, 
      trend: 'stable', 
      risk: 'Medium',
      metrics: {
        volatility: 'Medium',
        confidence: 81,
        sentiment: 'Neutral'
      },
      insights: [
        "Power costs impacting heavy industrial clusters.",
        "Export orders showing resilience despite global head-winds.",
        "CapEx cycle picking up in the automotive ancillary niche."
      ]
    },
    { 
      name: 'Retail', 
      health: 58, 
      trend: 'down', 
      risk: 'High',
      metrics: {
        volatility: 'High',
        confidence: 64,
        sentiment: 'Negative'
      },
      insights: [
        "Discretionary spending down 12% in Q3 vs last year.",
        "Inventory turnover rates declining in fashion segment.",
        "Omni-channel transition costs weighing on EBITDA margins."
      ]
    },
  ];

  const newsFeeds = [
    { 
      id: 1, 
      title: "Rising crude prices impacting chemical sector margins", 
      sentiment: 'Negative', 
      score: -0.65, 
      time: '12 mins ago',
      impact: 'Sector Wide',
      breakdown: "Our NLP swarm detected negative sentiment clusters specifically relating to 'feedstock' and 'price pass-through'. 42 entities in the chemical cluster are flagged for margin compression."
    },
    { 
      id: 2, 
      title: "Adani Green secures $1.2B for solar projects expansion", 
      sentiment: 'Positive', 
      score: 0.82, 
      time: '1 hour ago',
      impact: 'Entity Specific',
      breakdown: "Major positive spike in 'capital commitment' and 'institutional confidence'. This event offsets the previous legal headwinds for the parent entity by 15% in our risk tracker."
    },
    { 
      id: 3, 
      title: "RBI signals potential rate hike in next policy cycle", 
      sentiment: 'Neutral', 
      score: -0.12, 
      time: '3 hours ago',
      impact: 'Macro',
      breakdown: "Sentiment is slightly weighted towards caution. Markets had already priced in a 25bps hike, but the commentary on 'prolonged tightening' is causing subtle panic in highly-leveraged mid-caps."
    },
  ];

  const macroData = [
    { month: 'Jan', gdp: 6.8, inflation: 5.2 },
    { month: 'Feb', gdp: 7.1, inflation: 5.4 },
    { month: 'Mar', gdp: 6.9, inflation: 5.8 },
    { month: 'Apr', gdp: 7.2, inflation: 5.5 },
    { month: 'May', gdp: 7.0, inflation: 5.3 },
  ];

  return (
    <div className="main-content">
      <AnimatePresence>
        {selectedSectorDetails && (
          <SectorModal sector={selectedSectorDetails} onClose={() => setSelectedSectorDetails(null)} />
        )}
        {selectedNews && (
          <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
        )}
      </AnimatePresence>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'var(--grad-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            NEXUS Market Intelligence
          </h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>Global macro surveillance & sector-specific sentiment analysis.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={18} color="var(--primary)" />
            <span style={{ fontSize: '0.85rem' }}>24/7 Global Crawl Active</span>
          </div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
        <IntelligenceCard title="Global Risk Index" value="4.2" trend="-0.3" icon={<Activity color="var(--primary)" />} />
        <IntelligenceCard title="Sentiment Pulse" value="Neutral" trend="+12%" icon={<TrendingUp color="var(--secondary)" />} />
        <IntelligenceCard title="Critical Alerts" value="03" trend="Sector: Fin" icon={<AlertTriangle color="var(--accent)" />} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ minHeight: '400px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3>Strategic Sector Heatmap</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="status-badge" style={{ padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}>Real-time</button>
              <button className="status-badge" style={{ padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}>Forecast</button>
            </div>
          </div>
          
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(3, 0, 20, 0.9)', border: '1px solid var(--glass-border)', borderRadius: '0.8rem', cursor: 'pointer' }}
                  itemStyle={{ color: 'white' }}
                />
                <Bar dataKey="health" radius={[6, 6, 0, 0]} onClick={(data) => setSelectedSectorDetails(data)}>
                  {sectorMetrics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.health > 80 ? 'var(--primary)' : entry.health > 60 ? 'var(--secondary)' : 'var(--accent)'} fillOpacity={0.8} style={{ cursor: 'pointer' }} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
            {sectorMetrics.map(s => (
              <div 
                key={s.name}
                onClick={() => {
                  setActiveSector(s.name);
                  setSelectedSectorDetails(s);
                }}
                style={{ 
                  padding: '1rem 0.5rem', 
                  textAlign: 'center', 
                  background: activeSector === s.name ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255,255,255,0.02)',
                  borderRadius: '0.8rem',
                  border: '1px solid',
                  borderColor: activeSector === s.name ? 'var(--primary)' : 'var(--glass-border)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, color: activeSector === s.name ? 'white' : 'var(--text-dim)' }}>{s.name}</p>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.9rem', fontWeight: 700 }}>{s.health}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3>AI Logic Logs: Feed</h3>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Live Crawler</div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {newsFeeds.map(news => (
              <motion.div 
                whileHover={{ x: 5 }}
                onClick={() => setSelectedNews(news)}
                key={news.id} 
                style={{ 
                  padding: '1.2rem', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderRadius: '1rem', 
                  border: '1px solid var(--glass-border)',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 700, 
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '1rem',
                    background: news.sentiment === 'Positive' ? 'rgba(74, 222, 128, 0.1)' : news.sentiment === 'Negative' ? 'rgba(248, 113, 113, 0.1)' : 'rgba(255,255,255,0.1)',
                    color: news.sentiment === 'Positive' ? '#4ade80' : news.sentiment === 'Negative' ? '#f87171' : 'white'
                  }}>
                    {news.sentiment} ({news.score})
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{news.time}</span>
                </div>
                <p style={{ fontSize: '0.95rem', fontWeight: 500, margin: '0 0 0.8rem', lineHeight: 1.4 }}>{news.title}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  <Eye size={12} /> {news.impact}
                </div>
              </motion.div>
            ))}
          </div>
          
          <button className="btn-primary" style={{ width: '100%', marginTop: '2rem', background: 'transparent', border: '1px solid var(--glass-border)' }}>
            <Search size={18} /> Deep-Dive Entity Intel
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem', marginTop: '2rem' }}>
        <div className="glass-panel">
          <h3>Macro Contextual Risks</h3>
          <div style={{ height: '220px', marginTop: '1.5rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={macroData}>
                <defs>
                  <linearGradient id="colorGdp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ background: 'rgba(3, 0, 20, 0.9)', border: '1px solid var(--glass-border)', borderRadius: '0.8rem' }}
                />
                <Area type="monotone" dataKey="gdp" stroke="var(--primary)" fillOpacity={1} fill="url(#colorGdp)" />
                <Area type="monotone" dataKey="inflation" stroke="var(--secondary)" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: 8, height: 8, background: 'var(--primary)', borderRadius: '50%' }}></div> GDP Growth
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: 8, height: 8, background: 'var(--secondary)', borderRadius: '50%' }}></div> Inflation CPI
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: 'rgba(139, 92, 246, 0.1)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 1.5rem',
              color: 'var(--primary)'
            }}>
              <MessageSquare size={32} />
            </div>
            <h2 style={{ marginBottom: '1rem' }}>Global Intelligence Chat</h2>
            <p style={{ color: 'var(--text-dim)', maxWidth: '450px', margin: '0 auto 2rem' }}>
              Query the NEXUS intelligence swarm about any sector, entity, or global event.
            </p>
            <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
              <input 
                type="text" 
                placeholder="Ask about 'Reliance margins vs sector' or 'Impact of FED rate hike'..."
                style={{ 
                  width: '100%', 
                  padding: '1.2rem 1.5rem', 
                  background: 'rgba(0,0,0,0.3)', 
                  border: '1px solid var(--glass-border)', 
                  borderRadius: '1.5rem',
                  color: 'white',
                  outline: 'none',
                  fontSize: '1rem'
                }}
              />
              <button 
                className="btn-primary" 
                style={{ 
                  position: 'absolute', 
                  right: '0.5rem', 
                  top: '0.5rem', 
                  bottom: '0.5rem',
                  padding: '0 1.5rem',
                  borderRadius: '1.2rem'
                }}
              >
                Query Swarm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectorModal = ({ sector, onClose }: { sector: any, onClose: () => void }) => (
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
      background: 'rgba(2, 1, 10, 0.96)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(35px)',
      padding: '2rem'
    }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 30 }}
      style={{
        width: '100%',
        maxWidth: '750px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
        borderRadius: '2.5rem',
        padding: '3.5rem',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 0 120px rgba(0,0,0,0.6)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Neural Background Shimmer */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, opacity: 0.05, pointerEvents: 'none' }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.circle 
            cx="50" cy="50" r="40" 
            stroke="var(--primary)" 
            strokeWidth="0.1" 
            fill="none"
            animate={{ r: [30, 45, 30], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </svg>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 900, background: 'var(--grad-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{sector.name} Dynamics</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '1rem', marginTop: '0.5rem' }}>Automated sector surveillance synthesis.</p>
          </div>
          <div className="status-badge" style={{ 
            background: sector.health > 80 ? 'rgba(74, 222, 128, 0.1)' : sector.health > 60 ? 'rgba(251, 191, 36, 0.1)' : 'rgba(248, 113, 113, 0.1)', 
            color: sector.health > 80 ? '#4ade80' : sector.health > 60 ? '#fbbf24' : '#f87171',
            fontSize: '0.8rem',
            padding: '0.6rem 1.2rem'
          }}>
            {sector.risk} RISK PROFILE
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1.5rem', border: '1px solid var(--glass-border)' }}>
            <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>AI Confidence</p>
            <p style={{ margin: '0.5rem 0 0', fontSize: '1.8rem', fontWeight: 800 }}>{sector.metrics.confidence}%</p>
          </div>
          <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1.5rem', border: '1px solid var(--glass-border)' }}>
            <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Volatility</p>
            <p style={{ margin: '0.5rem 0 0', fontSize: '1.8rem', fontWeight: 800 }}>{sector.metrics.volatility}</p>
          </div>
          <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1.5rem', border: '1px solid var(--glass-border)' }}>
            <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Sentiment</p>
            <p style={{ margin: '0.5rem 0 0', fontSize: '1.5rem', fontWeight: 800, color: sector.metrics.sentiment === 'Bullish' ? '#4ade80' : sector.metrics.sentiment === 'Bearish' ? '#f87171' : 'white' }}>{sector.metrics.sentiment}</p>
          </div>
        </div>

        <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 800 }}>
          <Activity size={20} color="var(--primary)" /> 
          Neural Insights Breakdown
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '3rem' }}>
          {sector.insights?.map((insight: string, idx: number) => (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              style={{ 
                padding: '1.5rem', 
                background: 'rgba(255,255,255,0.01)', 
                borderRadius: '1.2rem', 
                borderLeft: '4px solid var(--primary)', 
                fontSize: '0.95rem', 
                color: 'var(--text-dim)', 
                lineHeight: 1.6 
              }}
            >
              {insight}
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <button onClick={onClose} style={{ flex: 2, padding: '1.4rem', borderRadius: '1.2rem', background: 'var(--grad-main)', border: 'none', color: 'white', fontWeight: 800, cursor: 'pointer', letterSpacing: '1px' }}>
            ACKNOWLEDGE & STORE INTEL
          </button>
          <button style={{ flex: 1, padding: '1.4rem', borderRadius: '1.2rem', background: 'transparent', border: '1px solid var(--glass-border)', color: 'white', fontWeight: 700, cursor: 'pointer' }}>
            FULL REPORT
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const NewsModal = ({ news, onClose }: { news: any, onClose: () => void }) => (
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
      background: 'rgba(2, 1, 10, 0.96)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(35px)',
      padding: '2rem'
    }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 30 }}
      style={{
        width: '100%',
        maxWidth: '700px',
        background: 'linear-gradient(135deg, rgba(30, 30, 40, 0.6) 0%, rgba(10, 10, 20, 0.8) 100%)',
        borderRadius: '2.5rem',
        padding: '3.5rem',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 0 120px rgba(0,0,0,0.8)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Decorative Gradient Glow */}
      <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: `radial-gradient(circle, ${news.sentiment === 'Positive' ? 'rgba(74, 222, 128, 0.05)' : 'rgba(248, 113, 113, 0.05)'} 0%, transparent 60%)`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: 900, 
              padding: '0.5rem 1.2rem', 
              borderRadius: '2rem',
              background: news.sentiment === 'Positive' ? 'rgba(74, 222, 128, 0.1)' : news.sentiment === 'Negative' ? 'rgba(248, 113, 113, 0.1)' : 'rgba(255,255,255,0.05)',
              color: news.sentiment === 'Positive' ? '#4ade80' : news.sentiment === 'Negative' ? '#f87171' : 'white',
              letterSpacing: '1.5px',
              border: '1px solid currentColor',
            }}>
              {news.sentiment.toUpperCase()} SIGNAL
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>CRAWLED {news.time.toUpperCase()}</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', lineHeight: 1.2, margin: 0, fontWeight: 900, letterSpacing: '-1px' }}>{news.title}</h2>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2.5rem', borderRadius: '2rem', border: '1px solid var(--glass-border)', marginBottom: '2.5rem', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
            <Cpu size={18} color="var(--primary)" />
            <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800 }}>Neural Swarm Breakdown</h4>
          </div>
          <p style={{ color: 'white', lineHeight: 1.9, fontSize: '1.1rem', margin: 0, opacity: 0.9 }}>
            {news.breakdown}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <p style={{ margin: '0 0 0.8rem', color: 'var(--text-dim)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>AI Confidence Score</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1.5, ease: "easeOut" }} style={{ height: '100%', background: 'var(--grad-main)' }} />
              </div>
              <span style={{ fontWeight: 800, color: 'var(--primary)' }}>92%</span>
            </div>
          </div>
          <div>
            <p style={{ margin: '0 0 0.8rem', color: 'var(--text-dim)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Propagation Impact</p>
            <p style={{ margin: 0, fontWeight: 800, fontSize: '1.1rem' }}>{news.impact}</p>
          </div>
        </div>

        <button onClick={onClose} style={{ width: '100%', padding: '1.4rem', borderRadius: '1.5rem', background: 'transparent', border: '1px solid var(--glass-border)', color: 'white', fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s ease', letterSpacing: '1px' }}>
          DISMISS FEED LOG
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const IntelligenceCard = ({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: any }) => (
  <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
    <div style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem' }}>
      {icon}
    </div>
    <div>
      <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '0.85rem' }}>{title}</p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{value}</h3>
        <span style={{ 
          fontSize: '0.75rem', 
          fontWeight: 700, 
          color: trend.startsWith('+') ? '#4ade80' : trend.startsWith('-') ? '#f87171' : 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.2rem'
        }}>
          {trend.startsWith('+') ? <ArrowUpRight size={12} /> : trend.startsWith('-') ? <ArrowDownRight size={12} /> : null}
          {trend}
        </span>
      </div>
    </div>
  </div>
);

export default MarketIntelligence;
