import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Appraisal from './pages/Appraisal';
import DataRoom from './pages/DataRoom';
import MarketIntelligence from './pages/MarketIntelligence';
import Archive from './pages/Archive';
import Settings from './pages/Settings';
import { DocumentProvider } from './context/DocumentContext';

import { ChatProvider } from './context/ChatContext';

import './App.css';

function App() {
  return (
    <ChatProvider>
      <DocumentProvider>

      <Router>
        <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Protected/Internal Routes wrapped in Layout */}

        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/data-room" element={<MainLayout><DataRoom /></MainLayout>} />
        <Route path="/appraisal" element={<MainLayout><Appraisal /></MainLayout>} />
        <Route path="/market-intelligence" element={<MainLayout><MarketIntelligence /></MainLayout>} />

        {/* Archive and Settings Routes */}
        <Route path="/archive" element={<MainLayout><Archive /></MainLayout>} />
        <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />


        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Router>
    </DocumentProvider>
    </ChatProvider>
  );
}



export default App;
